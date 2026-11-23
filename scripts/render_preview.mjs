#!/usr/bin/env node
/**
 * render_preview.mjs
 * Authentic Roblox R6 / Blocky 3D Studio & Brookhaven Set Renderer.
 *
 * Implements canonical Roblox R6 proportions (1 stud = 0.34 world units):
 * - Torso: 2.0 x 2.0 x 1.0 studs with 0.08 stud bevel + 3D collar/hoodie/pocket/cuffs
 * - Neck:  0.55 x 0.20 x 0.55 studs
 * - Head:  Classic Roblox SpecialMesh barrel cylinder (R=0.64, H=1.24 studs, 0.30 stud deep bevel)
 * - Hair:  Tapered 3D NURBS-style capsule strand clumps (messy swept bangs, pigtails, cap, crown)
 * - Limbs: Flush 0.98 x 2.0 x 0.98 stud solid rectangular arms & legs with short-sleeve/shoe steps
 * - World: Bright Brookhaven/Studio daytime lighting, 3D studded baseplate, and soft sun shadows.
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

function v3(x = 0, y = 0, z = 0) {
  return { x, y, z };
}
const add3 = (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const sub3 = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const mul3 = (a, s) => ({ x: a.x * s, y: a.y * s, z: a.z * s });
const dot3 = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const len3 = (a) => Math.hypot(a.x, a.y, a.z);
const norm3 = (a) => {
  const l = len3(a) || 1;
  return { x: a.x / l, y: a.y / l, z: a.z / l };
};
const cross3 = (a, b) => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});

function rotY(p, ang) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: c * p.x + s * p.z, y: p.y, z: -s * p.x + c * p.z };
}
function rotX(p, ang) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: p.x, y: c * p.y - s * p.z, z: s * p.y + c * p.z };
}
function rotZ(p, ang) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return { x: c * p.x - s * p.y, y: s * p.x + c * p.y, z: p.z };
}

function sdRoundBox(p, b, r) {
  const qx = Math.abs(p.x) - b.x + r;
  const qy = Math.abs(p.y) - b.y + r;
  const qz = Math.abs(p.z) - b.z + r;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const oz = Math.max(qz, 0);
  return Math.hypot(ox, oy, oz) + Math.min(Math.max(qx, qy, qz), 0) - r;
}

function sdRoundedCylinder(p, ra, rb, h) {
  const dx = Math.hypot(p.x, p.z) - ra + rb;
  const dy = Math.abs(p.y) - h + rb;
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  return Math.min(Math.max(dx, dy), 0) + Math.hypot(ox, oy) - rb;
}

function sdSphere(p, r) {
  return len3(p) - r;
}

function sdTaperedCapsule(p, a, b, r1, r2) {
  const pa = sub3(p, a);
  const ba = sub3(b, a);
  const baba = dot3(ba, ba) || 1e-6;
  const h = clamp(dot3(pa, ba) / baba, 0, 1);
  const r = r1 + (r2 - r1) * h;
  return len3(sub3(pa, mul3(ba, h))) - r;
}

function sdLegoCClaw(p, scale = 1.0) {
  const q = mul3(p, 1 / scale);
  const qRot = rotX(q, Math.PI / 2);
  const dOuter = sdRoundedCylinder(qRot, 0.16, 0.03, 0.10);
  const dInner = sdRoundedCylinder(qRot, 0.08, 0.01, 0.18);
  const dSlot = sdRoundBox(sub3(q, v3(0, -0.12, 0)), v3(0.07, 0.12, 0.18), 0.01);
  return Math.max(dOuter, -Math.min(dInner, dSlot)) * scale;
}

// ---------- Roblox Face Atlas Evaluator ----------
function evalFaceDecal(u, v, expression = "smile") {
  if (Math.abs(u) > 0.44 || Math.abs(v) > 0.44) return null;

  const ink = [16, 20, 28];
  const white = [255, 255, 255];
  const mouthIn = [82, 18, 24];
  const tongue = [244, 102, 112];
  const tear = [96, 195, 255];

  const ex = Math.abs(u) - 0.125;
  const ey = v - 0.085;

  if (expression === "slam" || expression === "angry") {
    const by = ey - (0.095 - (0.14 - Math.abs(u)) * 0.35);
    if (Math.abs(ex) < 0.075 && Math.abs(by) < 0.018) return ink;
  } else if (expression === "shocked" || expression === "tears") {
    const by = ey - (0.105 + (0.14 - Math.abs(u)) * 0.25);
    if (Math.abs(ex) < 0.075 && Math.abs(by) < 0.016) return ink;
  } else if (expression === "smirk") {
    const slope = u > 0 ? 0.25 : -0.1;
    const by = ey - (0.095 + ex * slope);
    if (Math.abs(ex) < 0.072 && Math.abs(by) < 0.016) return ink;
  }

  if (expression === "tears") {
    if (Math.abs(ex) < 0.036 && v < 0.03 && v > -0.34) {
      return tear;
    }
  }

  if (expression === "deadpan") {
    if (Math.abs(ex) < 0.068 && Math.abs(ey) < 0.018) return ink;
  } else if (expression === "dizzy") {
    const d1 = Math.abs(ex - ey);
    const d2 = Math.abs(ex + ey);
    if (Math.abs(ex) < 0.062 && Math.abs(ey) < 0.062 && (d1 < 0.02 || d2 < 0.02)) return ink;
  } else if (expression === "shocked") {
    const rOut = Math.hypot(ex / 0.072, ey / 0.082);
    if (rOut < 1.0) {
      if (rOut > 0.82) return ink;
      const rPupil = Math.hypot(ex / 0.028, ey / 0.032);
      if (rPupil < 1.0) return ink;
      return white;
    }
  } else {
    const rEye = Math.hypot(ex / 0.044, ey / 0.078);
    if (rEye < 1.0) {
      const hl = Math.hypot((ex + 0.012) / 0.015, (ey - 0.028) / 0.021);
      if (hl < 1.0) return white;
      return ink;
    }
  }

  const my = v + 0.115;
  if (expression === "shocked" || expression === "tears" || expression === "grin") {
    const rx = expression === "shocked" ? 0.075 : 0.125;
    const ry = 0.085;
    if (expression === "shocked") {
      const rM = Math.hypot(u / rx, my / ry);
      if (rM < 1.0) {
        if (rM > 0.78) return ink;
        if (my > 0.025) return white;
        if (my < -0.025) return tongue;
        return mouthIn;
      }
    } else {
      const inTop = my <= 0.035 && my >= -ry;
      const rArc = Math.hypot(u / rx, (my - 0.035) / (ry + 0.035));
      if (inTop && rArc < 1.0) {
        if (rArc > 0.84 || my > 0.018) return ink;
        if (my > -0.012) return white;
        if (my < -0.045 && Math.abs(u) < rx * 0.55) return tongue;
        return mouthIn;
      }
    }
  } else if (expression === "deadpan" || expression === "dizzy") {
    if (Math.abs(u) < 0.075 && Math.abs(my) < 0.016) return ink;
  } else if (expression === "slam" || expression === "smirk") {
    const sy = my - u * 0.18 - u * u * 0.45;
    if (u > -0.10 && u < 0.12 && Math.abs(sy) < 0.018) return ink;
  } else {
    const curve = u * u * 1.65;
    if (Math.abs(u) < 0.135 && Math.abs(my - curve + 0.026) < 0.019) {
      return ink;
    }
  }

  return null;
}

function getCastPreset(theme = "theo") {
  if (theme === "noob") {
    return {
      skin: [245, 205, 48],
      top: [13, 105, 172],
      trim: [10, 85, 142],
      accent: [255, 255, 255],
      pants: [164, 189, 71],
      shoes: null,
      sleeves: "none",
      hairStyle: "bald",
      hairColor: null,
      hat: null,
      details: []
    };
  }
  if (theme === "guest") {
    return {
      skin: [242, 243, 243],
      top: [22, 26, 34],
      trim: [15, 18, 24],
      accent: [239, 68, 68],
      pants: [24, 30, 40],
      shoes: [248, 250, 252],
      sleeves: "long",
      hairStyle: "bald",
      hairColor: null,
      hat: "cap_red",
      details: ["roblox_r", "cuffs"]
    };
  }
  if (theme === "bacon") {
    return {
      skin: [229, 228, 223],
      top: [99, 95, 98],
      trim: [13, 105, 172],
      accent: [255, 255, 255],
      pants: [27, 42, 53],
      shoes: [241, 245, 249],
      sleeves: "long",
      hairStyle: "messy",
      hairColor: [124, 62, 28],
      hat: null,
      details: ["kangaroo", "cuffs"]
    };
  }
  if (theme === "builderman") {
    return {
      skin: [245, 205, 48],
      top: [249, 115, 22],
      trim: [194, 65, 12],
      accent: [255, 255, 255],
      pants: [30, 58, 138],
      shoes: [71, 85, 105],
      sleeves: "long",
      hairStyle: "bald",
      hairColor: null,
      hat: "hardhat_yellow",
      details: ["hood", "kangaroo", "cuffs"]
    };
  }
  if (theme === "obby") {
    return {
      skin: [245, 205, 48],
      top: [0, 162, 232],
      trim: [2, 132, 199],
      accent: [255, 255, 255],
      pants: [30, 41, 59],
      shoes: [248, 250, 252],
      sleeves: "short",
      hairStyle: "under_cap",
      hairColor: [72, 42, 24],
      hat: "cap_red",
      details: ["roblox_r", "speed_coil"]
    };
  }
  if (theme === "y2k") {
    return {
      skin: [255, 214, 170],
      top: [244, 114, 182],
      trim: [236, 72, 153],
      accent: [255, 255, 255],
      pants: [125, 178, 248],
      shoes: [255, 255, 255],
      sleeves: "long",
      hairStyle: "pigtails",
      hairColor: [68, 36, 24],
      hat: "crown",
      details: ["hood", "kangaroo", "heart"]
    };
  }
  if (theme === "chef") {
    return {
      skin: [252, 208, 162],
      top: [255, 251, 235],
      trim: [217, 119, 6],
      accent: [251, 113, 133],
      pants: [71, 85, 105],
      shoes: [248, 250, 252],
      sleeves: "long",
      hairStyle: "bald",
      hairColor: null,
      hat: "toque_white",
      details: ["kangaroo", "cuffs"]
    };
  }
  if (theme === "base-gray") {
    return {
      skin: [203, 213, 225],
      top: [148, 163, 184],
      trim: [100, 116, 139],
      accent: [226, 232, 240],
      pants: [100, 116, 139],
      shoes: null,
      sleeves: "none",
      hairStyle: "bald",
      hairColor: null,
      hat: null,
      details: []
    };
  }
  if (theme === "police") {
    return {
      skin: [252, 208, 162],
      top: [30, 58, 138],
      trim: [23, 37, 84],
      accent: [250, 204, 21],
      pants: [23, 37, 84],
      shoes: [15, 23, 42],
      sleeves: "long",
      hairStyle: "bald",
      hairColor: null,
      hat: "cap_navy",
      details: ["cuffs", "moon"]
    };
  }
  return {
    skin: [252, 208, 162],
    top: [56, 152, 242],
    trim: [37, 122, 212],
    accent: [255, 255, 255],
    pants: [45, 55, 72],
    shoes: [248, 250, 252],
    sleeves: "long",
    hairStyle: "messy",
    hairColor: [115, 56, 26],
    hat: null,
    details: ["hood", "kangaroo", "cuffs", "moon"]
  };
}

function evalHairSDF(pHead, style, driftMode) {
  if (!style || style === "bald" || driftMode !== "none") return 1e9;
  const dBound = len3(pHead) - 0.38;
  if (dBound > 0.08) return dBound;

  // Solid hair cap covering the entire upper dome of the barrel head (up to y = 0.248)
  const qCap = { x: pHead.x / 0.242, y: (pHead.y - 0.11) / 0.142, z: (pHead.z + 0.01) / 0.242 };
  let d = (len3(qCap) - 1.0) * 0.16;
  d = Math.max(d, -(pHead.y - 0.05 + pHead.z * 0.18));

  if (style === "messy") {
    const strands = [
      [v3(-0.13, 0.22, 0.04), v3(-0.15, 0.13, 0.235), 0.064, 0.032],
      [v3(-0.04, 0.23, 0.05), v3(-0.05, 0.12, 0.245), 0.068, 0.034],
      [v3(0.05, 0.23, 0.05), v3(0.07, 0.12, 0.245), 0.068, 0.034],
      [v3(0.14, 0.21, 0.04), v3(0.17, 0.14, 0.225), 0.062, 0.030],
      [v3(-0.08, 0.22, -0.02), v3(-0.13, 0.27, -0.05), 0.065, 0.032],
      [v3(0.05, 0.22, -0.02), v3(0.10, 0.28, -0.04), 0.068, 0.032],
      [v3(-0.21, 0.14, 0.02), v3(-0.235, 0.01, 0.05), 0.052, 0.026],
      [v3(0.21, 0.14, 0.02), v3(0.235, 0.01, 0.05), 0.052, 0.026]
    ];
    for (const [a, b, r1, r2] of strands) {
      d = Math.min(d, sdTaperedCapsule(pHead, a, b, r1, r2));
    }
  } else if (style === "pigtails") {
    const strands = [
      [v3(-0.11, 0.21, 0.06), v3(-0.12, 0.13, 0.24), 0.056, 0.032],
      [v3(0.0, 0.22, 0.06), v3(0.0, 0.13, 0.245), 0.060, 0.034],
      [v3(0.11, 0.21, 0.06), v3(0.12, 0.13, 0.24), 0.056, 0.032],
      [v3(-0.23, 0.12, -0.02), v3(-0.35, -0.14, -0.04), 0.075, 0.035],
      [v3(0.23, 0.12, -0.02), v3(0.35, -0.14, -0.04), 0.075, 0.035]
    ];
    for (const [a, b, r1, r2] of strands) {
      d = Math.min(d, sdTaperedCapsule(pHead, a, b, r1, r2));
    }
  }
  return d;
}

export function evalAvatarSDF(pWorld, cfg = {}) {
  const {
    pos = v3(0, 0, 0),
    yaw = 0,
    roll = 0,
    waistPitch = 0,
    headYaw = 0,
    headPitch = 0,
    armLPitch = -0.1,
    armRPitch = -0.15,
    legLPitch = 0,
    legRPitch = 0,
    expression = "smile",
    theme = "theo",
    driftMode = "none",
    hasMug = false
  } = cfg;

  const pal = getCastPreset(theme);
  let p = sub3(pWorld, pos);
  if (roll !== 0) {
    p = add3(rotZ(sub3(p, v3(0, -0.82, 0)), -roll), v3(0, -0.82, 0));
  }
  p = rotY(p, -yaw);

  const dBound = len3(p) - 2.15;
  if (dBound > 0.2) {
    return { d: dBound, color: [0, 0, 0], roughness: 0.5, id: 0 };
  }

  let bestD = 1e9;
  let bestColor = pal.top;
  let bestRough = 0.32;
  let bestId = 1;

  const addPart = (d, color, rough = 0.32, id = 1) => {
    if (d < bestD) {
      bestD = d;
      bestColor = color;
      bestRough = rough;
      bestId = id;
    }
  };

  const bevel = driftMode === "minecraft-voxel" ? 0.002 : 0.028;

  const pWaist = rotX(sub3(p, v3(0, -0.16, 0)), -waistPitch);
  const pUpper = add3(pWaist, v3(0, -0.16, 0));

  // 1. Torso (2.0 x 2.0 x 1.0 studs)
  const pTorso = sub3(pUpper, v3(0, 0.18, 0));
  const dTorso = sdRoundBox(pTorso, v3(0.34, 0.34, 0.17), bevel);
  if (dTorso < bestD) {
    let col = pal.top;
    if (pal.details.includes("roblox_r") && pTorso.z > 0.13) {
      const rx = pTorso.x * 0.96 - (pTorso.y - 0.04) * 0.26;
      const ry = pTorso.x * 0.26 + (pTorso.y - 0.04) * 0.96;
      if (Math.abs(rx) < 0.115 && Math.abs(ry) < 0.115) {
        col = Math.abs(rx) < 0.04 && Math.abs(ry) < 0.04 ? pal.top : [255, 255, 255];
      }
    }
    if (pal.details.includes("heart") && pTorso.z > 0.13) {
      const hx = pTorso.x / 0.095;
      const hy = (pTorso.y - 0.07) / 0.095;
      if (Math.hypot(hx, hy - Math.sqrt(Math.abs(hx)) * 0.55) < 0.85) {
        col = [255, 255, 255];
      }
    }
    if (pal.details.includes("moon") && pTorso.z > 0.13) {
      const d1 = Math.hypot(pTorso.x + 0.16, pTorso.y - 0.12);
      const d2 = Math.hypot(pTorso.x + 0.135, pTorso.y - 0.135);
      if (d1 < 0.068 && d2 > 0.052) {
        col = [253, 224, 71];
      }
    }
    addPart(dTorso, col, 0.42, 2);
  }

  if (pal.details.includes("hood")) {
    const dHood = sdRoundBox(sub3(pUpper, v3(0, 0.51, -0.06)), v3(0.24, 0.065, 0.14), 0.035);
    addPart(dHood, pal.trim, 0.45, 2);
    const dStrL = sdRoundedCylinder(sub3(pUpper, v3(-0.065, 0.39, 0.175)), 0.014, 0.005, 0.095);
    const dStrR = sdRoundedCylinder(sub3(pUpper, v3(0.065, 0.39, 0.175)), 0.014, 0.005, 0.095);
    addPart(Math.min(dStrL, dStrR), pal.accent, 0.35, 3);
  }
  if (pal.details.includes("kangaroo")) {
    const dKanga = sdRoundBox(sub3(pUpper, v3(0, -0.02, 0.165)), v3(0.20, 0.085, 0.022), 0.015);
    addPart(dKanga, pal.trim, 0.48, 2);
  }

  // 2. Neck
  const dNeck = sdRoundedCylinder(sub3(pUpper, v3(0, 0.53, 0)), 0.095, 0.015, 0.045);
  addPart(dNeck, pal.skin, 0.35, 4);

  // 3. Head
  const pHeadLocal = rotY(rotX(sub3(pUpper, v3(0, 0.75, 0)), -headPitch), -headYaw);
  let dHead;
  if (driftMode === "minecraft-voxel") {
    dHead = sdRoundBox(pHeadLocal, v3(0.24, 0.24, 0.24), 0.002);
  } else {
    dHead = sdRoundedCylinder(pHeadLocal, 0.222, 0.082, 0.212);
  }

  if (dHead < bestD) {
    let hCol = pal.skin;
    if (driftMode === "minecraft-voxel") {
      const vx = Math.floor((pHeadLocal.x + 2) * 10);
      const vy = Math.floor((pHeadLocal.y + 2) * 10);
      const vz = Math.floor((pHeadLocal.z + 2) * 10);
      if ((vx + vy + vz) % 2 === 0) {
        hCol = [hCol[0] - 32, hCol[1] - 32, hCol[2] - 24];
      }
    }
    if (pHeadLocal.z > 0.08) {
      const u = pHeadLocal.x / 0.44;
      const v = pHeadLocal.y / 0.42;
      const decal = evalFaceDecal(u, v, expression);
      if (decal) hCol = decal;
    }
    addPart(dHead, hCol, 0.28, 4);
  }

  if (driftMode === "human-fingers") {
    const dNose = sdRoundBox(sub3(pHeadLocal, v3(0, 0.0, 0.25)), v3(0.038, 0.058, 0.075), 0.02);
    addPart(dNose, [235, 165, 130], 0.35, 4);
  }
  if (driftMode === "lego-studs") {
    const dStud = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.255, 0)), 0.115, 0.012, 0.065);
    const dShL = sdRoundedCylinder(sub3(pUpper, v3(-0.51, 0.56, 0)), 0.075, 0.01, 0.05);
    const dShR = sdRoundedCylinder(sub3(pUpper, v3(0.51, 0.56, 0)), 0.075, 0.01, 0.05);
    addPart(Math.min(dStud, dShL, dShR), [250, 204, 21], 0.18, 4);
  }

  if (driftMode === "none") {
    if (pal.hairColor) {
      const dHair = evalHairSDF(pHeadLocal, pal.hairStyle, driftMode);
      addPart(dHair, pal.hairColor, 0.34, 5);
    }
    if (pal.hat === "cap_red") {
      const dDome = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.15, 0)), 0.238, 0.065, 0.085);
      const dBrim = sdRoundBox(rotX(sub3(pHeadLocal, v3(0, 0.11, 0.19)), 0.12), v3(0.18, 0.018, 0.12), 0.012);
      addPart(Math.min(dDome, dBrim), [225, 38, 38], 0.32, 5);
    } else if (pal.hat === "hardhat_yellow") {
      const dDome = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.16, 0)), 0.248, 0.08, 0.095);
      const dRidge = sdRoundBox(sub3(pHeadLocal, v3(0, 0.25, 0)), v3(0.035, 0.025, 0.22), 0.01);
      const dBrim = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.10, 0.03)), 0.275, 0.015, 0.018);
      addPart(Math.min(dDome, dRidge, dBrim), [250, 204, 21], 0.20, 5);
    } else if (pal.hat === "crown") {
      const dRing = Math.max(
        sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.23, 0)), 0.155, 0.015, 0.055),
        -sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.24, 0)), 0.12, 0.01, 0.08)
      );
      addPart(dRing, [250, 204, 21], 0.16, 5);
    } else if (pal.hat === "toque_white") {
      const dBand = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.19, 0)), 0.225, 0.02, 0.055);
      const dPuff = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.30, 0)), 0.26, 0.075, 0.11);
      addPart(Math.min(dBand, dPuff), [255, 255, 255], 0.28, 5);
    } else if (pal.hat === "cap_navy") {
      const dDome = sdRoundedCylinder(sub3(pHeadLocal, v3(0, 0.16, 0)), 0.242, 0.055, 0.09);
      const dBrim = sdRoundBox(rotX(sub3(pHeadLocal, v3(0, 0.10, 0.19)), 0.14), v3(0.18, 0.018, 0.12), 0.012);
      addPart(dDome, [30, 58, 138], 0.32, 5);
      addPart(dBrim, [15, 23, 42], 0.20, 5);
    }
  }

  // 5. Left & Right Arms
  for (const side of [-1, 1]) {
    const pitch = side < 0 ? armLPitch : armRPitch;
    const pShoulder = sub3(pUpper, v3(side * 0.51, 0.38, 0));
    const pArmLocal = rotX(pShoulder, pitch);
    const pArm = sub3(pArmLocal, v3(0, -0.20, 0));

    if (pal.sleeves === "long") {
      const dSleeve = sdRoundBox(sub3(pArm, v3(0, 0.05, 0)), v3(0.164, 0.28, 0.164), bevel * 0.85);
      addPart(dSleeve, pal.top, 0.42, 6);
      const dCuff = sdRoundBox(sub3(pArm, v3(0, -0.21, 0)), v3(0.168, 0.032, 0.168), 0.012);
      addPart(dCuff, pal.trim, 0.45, 6);
      const dHand = sdRoundBox(sub3(pArm, v3(0, -0.28, 0)), v3(0.158, 0.065, 0.158), bevel * 0.8);
      addPart(dHand, pal.skin, 0.32, 7);
    } else if (pal.sleeves === "short") {
      const dShortSleeve = sdRoundBox(sub3(pArm, v3(0, 0.22, 0)), v3(0.172, 0.135, 0.172), bevel * 0.85);
      addPart(dShortSleeve, pal.top, 0.42, 6);
      const dBareArm = sdRoundBox(sub3(pArm, v3(0, -0.02, 0)), v3(0.162, 0.32, 0.162), bevel * 0.85);
      addPart(dBareArm, pal.skin, 0.32, 6);
    } else {
      const dBareArm = sdRoundBox(pArm, v3(0.162, 0.34, 0.162), bevel * 0.85);
      addPart(dBareArm, pal.skin, 0.32, 6);
    }

    if (pal.details.includes("speed_coil") && side === 1 && driftMode === "none") {
      for (const cy of [-0.08, -0.20, -0.32]) {
        const pCoil = sub3(pArmLocal, v3(0, cy, 0));
        const dCoil = Math.max(
          sdRoundedCylinder(pCoil, 0.195, 0.018, 0.026),
          -sdRoundedCylinder(pCoil, 0.155, 0.01, 0.05)
        );
        addPart(dCoil, [255, 45, 65], 0.08, 8);
      }
    }

    const pHandEnd = sub3(pArmLocal, v3(0, -0.56, 0));
    if (driftMode === "human-fingers") {
      let dFingers = sdRoundBox(pHandEnd, v3(0.10, 0.06, 0.055), 0.015);
      for (let f = -2; f <= 2; f++) {
        const pf = sub3(pHandEnd, v3(f * 0.04, -0.11, 0));
        dFingers = Math.min(dFingers, sdRoundBox(pf, v3(0.014, 0.07, 0.015), 0.007));
      }
      addPart(dFingers, [235, 165, 130], 0.35, 7);
    } else if (driftMode === "lego-studs") {
      const dClaw = sdLegoCClaw(sub3(pArmLocal, v3(0, -0.60, 0)), 0.85);
      addPart(dClaw, [250, 204, 21], 0.18, 7);
    }

    if (hasMug && side === 1 && driftMode === "none") {
      const pMug = sub3(pArmLocal, v3(0, -0.46, 0.22));
      const dMug = sdRoundedCylinder(pMug, 0.105, 0.018, 0.135);
      addPart(dMug, [239, 68, 68], 0.18, 8);
    }
  }

  // 6. Left & Right Legs
  for (const side of [-1, 1]) {
    const pitch = side < 0 ? legLPitch : legRPitch;
    const pHip = sub3(p, v3(side * 0.172, -0.16, 0));
    const pLegLocal = rotX(pHip, pitch);
    const pLeg = sub3(pLegLocal, v3(0, -0.34, 0));
    const dLeg = sdRoundBox(pLeg, v3(0.165, 0.34, 0.168), bevel * 0.85);
    addPart(dLeg, pal.pants, 0.45, 9);

    if (pal.shoes) {
      const pShoe = sub3(pLegLocal, v3(0, -0.63, 0.012));
      const dShoe = sdRoundBox(pShoe, v3(0.172, 0.058, 0.182), 0.022);
      addPart(dShoe, pal.shoes, 0.32, 10);
    }
  }

  return { d: bestD, color: bestColor, roughness: bestRough, id: bestId };
}

export function render3DViewport(width, height, sceneFn, camCfg = {}) {
  const buf = new Uint8Array(width * height * 4);
  const ro = camCfg.ro || v3(0, 0.32, 3.15);
  const ta = camCfg.ta || v3(0, 0.08, 0);
  const fov = camCfg.fov || 1.9;
  const bgTop = camCfg.bgTop || [125, 198, 252];
  const bgBot = camCfg.bgBot || [224, 242, 254];
  const floorY = camCfg.floorY ?? -0.86;
  const floorColor1 = camCfg.floorColor1 || [148, 163, 184];
  const floorColor2 = camCfg.floorColor2 || [132, 148, 170];

  const fw = norm3(sub3(ta, ro));
  const rt = norm3(cross3(fw, v3(0, 1, 0)));
  const up = cross3(rt, fw);

  const keyLight = norm3(v3(0.58, 0.82, 0.68));
  const fillLight = norm3(v3(-0.65, 0.35, 0.55));
  const rimLight = norm3(v3(-0.55, 0.55, -0.75));

  const calcNormal = (p, centerDist) => {
    const e = 0.0025;
    const d0 = centerDist ?? sceneFn(p).d;
    const dx = sceneFn(v3(p.x + e, p.y, p.z)).d - d0;
    const dy = sceneFn(v3(p.x, p.y + e, p.z)).d - d0;
    const dz = sceneFn(v3(p.x, p.y, p.z + e)).d - d0;
    return norm3(v3(dx, dy, dz));
  };

  const calcSoftShadow = (orig, dir) => {
    const h1 = sceneFn(add3(orig, mul3(dir, 0.12))).d;
    const h2 = sceneFn(add3(orig, mul3(dir, 0.28))).d;
    return clamp(0.55 + 0.45 * Math.min(h1 * 8.0, h2 * 4.5), 0.55, 1.0);
  };

  for (let py = 0; py < height; py++) {
    const ny = 1 - (2 * (py + 0.5)) / height;
    const vGrad = py / height;
    for (let px = 0; px < width; px++) {
      const nx = ((2 * (px + 0.5)) / width - 1) * (width / height);
      const rd = norm3(add3(add3(mul3(rt, nx), mul3(up, ny)), mul3(fw, fov)));

      let r = mix(bgTop[0], bgBot[0], vGrad);
      let g = mix(bgTop[1], bgBot[1], vGrad);
      let b = mix(bgTop[2], bgBot[2], vGrad);

      const ocx = ro.x;
      const ocy = ro.y - 0.05;
      const ocz = ro.z;
      const bSphere = ocx * rd.x + ocy * rd.y + ocz * rd.z;
      const cSphere = ocx * ocx + ocy * ocy + ocz * ocz - 2.45 * 2.45;
      const disc = bSphere * bSphere - cSphere;

      let t = disc > 0 ? Math.max(0.2, -bSphere - Math.sqrt(disc)) : 99.0;
      const tMax = disc > 0 ? Math.min(8.0, -bSphere + Math.sqrt(disc)) : 0.0;
      let hit = null;
      if (disc > 0 && tMax > 0.2) {
        for (let step = 0; step < 36; step++) {
          if (t > tMax) break;
          const pos = add3(ro, mul3(rd, t));
          const res = sceneFn(pos);
          if (res.d < 0.003) {
            hit = { pos, res, t };
            break;
          }
          t += res.d;
        }
      }

      if (hit) {
        const N = calcNormal(hit.pos, hit.res.d);
        const V = mul3(rd, -1);
        const sh = dot3(N, keyLight) > 0 ? calcSoftShadow(add3(hit.pos, mul3(N, 0.015)), keyLight) : 0.55;
        const keyDiff = Math.max(0, dot3(N, keyLight)) * sh;
        const fillDiff = Math.max(0, dot3(N, fillLight)) * 0.28;
        const skyAmb = 0.36 + 0.14 * (0.5 + 0.5 * N.y);
        const aoSample = sceneFn(add3(hit.pos, mul3(N, 0.065))).d / 0.065;
        const ao = clamp(0.68 + 0.32 * aoSample, 0.62, 1.0);

        const lighting = (skyAmb + keyDiff * 0.62 + fillDiff) * ao;

        const H = norm3(add3(keyLight, V));
        const rough = hit.res.roughness ?? 0.32;
        const specPow = rough < 0.25 ? 36 : 18;
        const specStrength = (rough < 0.25 ? 0.38 : 0.16) * sh;
        const spec = Math.pow(Math.max(0, dot3(N, H)), specPow) * specStrength;

        const fresnel = Math.pow(1 - Math.max(0, dot3(N, V)), 3.0);
        const rim = fresnel * Math.max(0, dot3(N, rimLight)) * 0.28;

        const base = hit.res.color;
        r = clamp(base[0] * lighting + 255 * spec + 245 * rim, 0, 255);
        g = clamp(base[1] * lighting + 252 * spec + 248 * rim, 0, 255);
        b = clamp(base[2] * lighting + 245 * spec + 255 * rim, 0, 255);
      } else if (rd.y < -0.001 && floorY !== null) {
        const tf = (floorY - ro.y) / rd.y;
        if (tf > 0 && tf < 14.0) {
          const fp = add3(ro, mul3(rd, tf));
          const cellSize = 0.34;
          const gx = Math.floor(fp.x / cellSize);
          const gz = Math.floor(fp.z / cellSize);
          const fx = fp.x / cellSize - gx - 0.5;
          const fz = fp.z / cellSize - gz - 0.5;

          let tileCol = (gx + gz) & 1 ? [...floorColor1] : [...floorColor2];

          const isGridBorder = Math.abs(fx) > 0.45 || Math.abs(fz) > 0.45;
          const studR = Math.hypot(fx, fz);
          if (isGridBorder) {
            tileCol = [tileCol[0] * 0.84, tileCol[1] * 0.84, tileCol[2] * 0.84];
          } else if (studR < 0.23 && studR > 0.17) {
            const bump = fx + fz > 0 ? 1.14 : 0.82;
            tileCol = [tileCol[0] * bump, tileCol[1] * bump, tileCol[2] * bump];
          } else if (studR <= 0.17) {
            tileCol = [tileCol[0] * 1.05, tileCol[1] * 1.05, tileCol[2] * 1.05];
          }

          const floorShadow =
            Math.abs(fp.x) < 1.35 && Math.abs(fp.z) < 1.35
              ? calcSoftShadow(v3(fp.x, floorY + 0.02, fp.z), keyLight)
              : 1.0;
          const fade = Math.exp(-0.065 * tf * tf);
          r = mix(r, clamp(tileCol[0] * floorShadow, 0, 255), fade);
          g = mix(g, clamp(tileCol[1] * floorShadow, 0, 255), fade);
          b = mix(b, clamp(tileCol[2] * floorShadow, 0, 255), fade);
        }
      }

      const idx = (py * width + px) * 4;
      buf[idx] = r;
      buf[idx + 1] = g;
      buf[idx + 2] = b;
      buf[idx + 3] = 255;
    }
  }
  return buf;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

export function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, rowStart + 1);
  }
  const idat = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}

export function buildAlarmMeltdownScene(shotIndex, phase = 0.5) {
  const bedroomBgTop = [147, 197, 253];
  const bedroomBgBot = [241, 245, 249];
  const woodFloor1 = [194, 142, 92];
  const woodFloor2 = [178, 126, 78];

  const evalAlarmClock = (p, center, squash = 1.0, tilt = 0.0) => {
    const q = rotZ(sub3(p, center), tilt);
    const rBody = 0.17;
    const qCyl = rotX(v3(q.x, q.y / squash, q.z), Math.PI / 2);
    const dBody = sdRoundedCylinder(qCyl, rBody, 0.025, 0.075);
    const dDial = sdRoundedCylinder(sub3(qCyl, v3(0, 0.02, 0)), rBody * 0.78, 0.01, 0.078);
    const dBellL = sdSphere(sub3(q, v3(-0.12, 0.19 * squash, 0)), 0.055);
    const dBellR = sdSphere(sub3(q, v3(0.12, 0.19 * squash, 0)), 0.055);
    let best = { d: dBody, color: [239, 68, 68], roughness: 0.22, id: 21 };
    if (dDial < best.d) best = { d: dDial, color: [255, 255, 255], roughness: 0.2, id: 22 };
    if (Math.min(dBellL, dBellR) < best.d) {
      best = { d: Math.min(dBellL, dBellR), color: [250, 204, 21], roughness: 0.12, id: 23 };
    }
    return best;
  };

  if (shotIndex === 0) {
    const shake = Math.sin(phase * Math.PI * 8) * 0.05;
    const popY = mix(-0.18, 0.04, smoothstep(0, 0.65, phase));
    return {
      cam: {
        ro: v3(0.12 + shake * 0.3, 0.52, 2.35 - phase * 0.18),
        ta: v3(0, 0.34, 0.15),
        fov: 1.95,
        bgTop: bedroomBgTop,
        bgBot: bedroomBgBot,
        floorY: -0.86,
        floorColor1: woodFloor1,
        floorColor2: woodFloor2
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0.14, popY, -0.12),
          yaw: -0.14,
          armLPitch: -0.85,
          armRPitch: -0.85,
          expression: "shocked",
          theme: "theo"
        });
        if (p.y > 0.38 && av.d < p.y - 0.22) return av;
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.36, 0.42)), v3(1.35, 0.06, 0.65), 0.02);
        const clk = evalAlarmClock(p, v3(-0.28, -0.11 + Math.abs(shake) * 1.1, 0.48), 1.0, shake * 2.0);
        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [161, 108, 68], roughness: 0.42, id: 20 };
        if (clk.d < best.d) best = clk;
        return best;
      }
    };
  }

  if (shotIndex === 1) {
    const slamT = smoothstep(0.1, 0.65, phase);
    const armAngle = mix(-2.0, -0.82, slamT);
    const squash = mix(1.0, 0.42, slamT);
    return {
      cam: {
        ro: v3(0.95, 0.42, 2.55),
        ta: v3(-0.04, 0.16, 0.18),
        fov: 1.9,
        bgTop: bedroomBgTop,
        bgBot: bedroomBgBot,
        floorY: -0.86,
        floorColor1: woodFloor1,
        floorColor2: woodFloor2
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0.22, 0.0, 0.0),
          yaw: -0.42,
          waistPitch: slamT * 0.18,
          armRPitch: armAngle,
          armLPitch: -0.25,
          expression: "slam",
          theme: "theo"
        });
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.42, 0.42)), v3(1.35, 0.06, 0.65), 0.02);
        const clk = evalAlarmClock(p, v3(-0.22, -0.24, 0.45), squash, 0);
        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [161, 108, 68], roughness: 0.42, id: 20 };
        if (clk.d < best.d) best = clk;
        return best;
      }
    };
  }

  if (shotIndex === 2) {
    return {
      cam: {
        ro: v3(Math.sin(phase * 0.6 - 0.3) * 0.42, 0.48, 2.38),
        ta: v3(0, 0.28, 0.12),
        fov: 1.95,
        bgTop: bedroomBgTop,
        bgBot: bedroomBgBot,
        floorY: -0.86,
        floorColor1: woodFloor1,
        floorColor2: woodFloor2
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0, -0.02, -0.08),
          yaw: 0,
          headPitch: Math.sin(phase * Math.PI * 4) * 0.04,
          armLPitch: -0.78,
          armRPitch: -0.78,
          expression: "tears",
          theme: "theo"
        });
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.42, 0.42)), v3(1.35, 0.06, 0.65), 0.02);
        const dLapBase = sdRoundBox(sub3(p, v3(0, -0.33, 0.40)), v3(0.32, 0.022, 0.22), 0.012);
        const pScreen = rotX(sub3(p, v3(0, -0.11, 0.56)), -0.24);
        const dLapScreen = sdRoundBox(pScreen, v3(0.32, 0.21, 0.018), 0.012);
        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [161, 108, 68], roughness: 0.42, id: 20 };
        if (dLapBase < best.d) best = { d: dLapBase, color: [226, 232, 240], roughness: 0.22, id: 24 };
        if (dLapScreen < best.d) best = { d: dLapScreen, color: [56, 189, 248], roughness: 0.12, id: 25 };
        return best;
      }
    };
  }

  const dropT = smoothstep(0.05, 0.55, phase);
  const bounce = phase > 0.55 ? Math.abs(Math.sin((phase - 0.55) * Math.PI * 5)) * 0.1 * (1 - phase) : 0;
  const pitch90 = mix(0.1, 1.25, dropT) - bounce;
  return {
    cam: {
      ro: v3(1.05, 1.15, 2.55),
      ta: v3(0, 0.06, 0.20),
      fov: 1.9,
      bgTop: bedroomBgTop,
      bgBot: bedroomBgBot,
      floorY: -0.86,
      floorColor1: woodFloor1,
      floorColor2: woodFloor2
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(0, -0.02, -0.10),
        yaw: 0,
        waistPitch: pitch90,
        armLPitch: -0.38,
        armRPitch: -0.38,
        expression: "dizzy",
        theme: "theo"
      });
      const dDesk = sdRoundBox(sub3(p, v3(0, -0.42, 0.42)), v3(1.35, 0.06, 0.65), 0.02);
      const dKeyb = sdRoundBox(sub3(p, v3(0, -0.33, 0.38)), v3(0.34, 0.025, 0.16), 0.012);
      let best = av;
      if (dDesk < best.d) best = { d: dDesk, color: [161, 108, 68], roughness: 0.42, id: 20 };
      if (dKeyb < best.d) best = { d: dKeyb, color: [248, 250, 252], roughness: 0.22, id: 24 };
      return best;
    }
  };
}

export function buildObbySkyScene(shotIndex, phase = 0.5) {
  const jumpArc = Math.sin(phase * Math.PI) * 0.42;
  const runSwing = Math.sin(phase * Math.PI * 2) * 0.68;
  return {
    cam: {
      ro: v3(shotIndex === 1 ? 1.35 : -0.58, 0.55 + shotIndex * 0.06, 2.75),
      ta: v3(0, 0.06, 0),
      fov: 1.9,
      bgTop: [56, 189, 248],
      bgBot: [224, 242, 254],
      floorY: -1.28,
      floorColor1: [241, 245, 249],
      floorColor2: [226, 232, 240]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(mix(-0.34, 0.34, phase), jumpArc, 0),
        yaw: 0.48,
        armLPitch: runSwing,
        armRPitch: -runSwing,
        legLPitch: -runSwing,
        legRPitch: runSwing,
        expression: shotIndex === 2 ? "shocked" : "grin",
        theme: "obby"
      });
      const dPad1 = sdRoundBox(sub3(p, v3(-0.52, -0.84, 0)), v3(0.48, 0.11, 0.48), 0.03);
      const dPad2 = sdRoundBox(sub3(p, v3(0.52, -0.68, 0)), v3(0.48, 0.11, 0.48), 0.03);
      const dKillBrick = sdRoundBox(sub3(p, v3(0.16, -0.54, 0)), v3(0.075, 0.038, 0.44), 0.012);
      let best = av;
      if (dPad1 < best.d) best = { d: dPad1, color: [244, 114, 182], roughness: 0.22, id: 30 };
      if (dPad2 < best.d) {
        const c2 = shotIndex === 3 ? [56, 189, 248] : [74, 222, 128];
        best = { d: dPad2, color: c2, roughness: 0.22, id: 31 };
      }
      if (shotIndex === 2 && dKillBrick < best.d) {
        best = { d: dKillBrick, color: [255, 42, 62], roughness: 0.05, id: 32 };
      }
      return best;
    }
  };
}

export function buildDuoComedyScene(shotIndex, phase = 0.5) {
  const spinY = shotIndex === 1 ? phase * Math.PI * 2 : 0.20;
  return {
    cam: {
      ro: v3(0, 0.28, 3.15),
      ta: v3(0, 0.06, 0),
      fov: 1.92,
      bgTop: [165, 180, 252],
      bgBot: [238, 242, 255],
      floorY: -0.86,
      floorColor1: [148, 163, 184],
      floorColor2: [128, 144, 168]
    },
    sceneFn: (p) => {
      const leftAv = evalAvatarSDF(p, {
        pos: v3(-0.54, 0, 0),
        yaw: spinY,
        armLPitch: -0.38,
        armRPitch: -0.62,
        expression: shotIndex === 2 ? "shocked" : shotIndex === 3 ? "deadpan" : "smirk",
        theme: "y2k",
        hasMug: true
      });
      const rightAv = evalAvatarSDF(p, {
        pos: v3(0.48, 0, 0),
        yaw: -0.20,
        roll: shotIndex === 2 ? -0.22 : shotIndex === 3 ? -0.16 : 0,
        headYaw: shotIndex === 3 ? 0.20 : 0,
        armLPitch: 0,
        armRPitch: 0,
        legLPitch: 0,
        legRPitch: 0,
        expression: shotIndex === 3 ? "deadpan" : "smile",
        theme: "noob"
      });
      return leftAv.d < rightAv.d ? leftAv : rightAv;
    }
  };
}

export function buildCozyCafeScene(shotIndex, phase = 0.5) {
  const popY = shotIndex === 0 ? mix(-0.15, 0.02, smoothstep(0, 0.65, phase)) : 0.0;
  const armWave = shotIndex === 3 ? -0.95 - Math.sin(phase * Math.PI * 4) * 0.25 : -0.72;
  return {
    cam: {
      ro: v3(shotIndex === 1 ? 0.55 : -0.35, 0.52, 2.55),
      ta: v3(0, 0.18, 0.15),
      fov: 1.92,
      bgTop: [254, 243, 199],
      bgBot: [255, 251, 235],
      floorY: -0.86,
      floorColor1: [214, 178, 138],
      floorColor2: [196, 158, 118]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(0, popY, -0.10),
        yaw: shotIndex === 1 ? -0.25 : 0.12,
        armLPitch: -0.55,
        armRPitch: armWave,
        expression: shotIndex === 3 ? "grin" : "smile",
        theme: "chef",
        hasMug: shotIndex === 2
      });
      // Bakery counter + Pastel tray + Golden croissant block + Floating gold coins
      const dCounter = sdRoundBox(sub3(p, v3(0, -0.44, 0.42)), v3(1.25, 0.14, 0.45), 0.025);
      const dTray = sdRoundBox(sub3(p, v3(-0.08, -0.28, 0.42)), v3(0.32, 0.02, 0.22), 0.012);
      const dCroissant = sdRoundBox(rotY(sub3(p, v3(-0.08, -0.21, 0.42)), 0.35), v3(0.14, 0.055, 0.085), 0.035);
      let best = av;
      if (dCounter < best.d) best = { d: dCounter, color: [180, 124, 82], roughness: 0.38, id: 40 };
      if (dTray < best.d) best = { d: dTray, color: [251, 207, 232], roughness: 0.22, id: 41 };
      if (dCroissant < best.d) best = { d: dCroissant, color: [245, 158, 11], roughness: 0.24, id: 42 };
      if (shotIndex === 3) {
        for (const cx of [-0.32, 0.0, 0.32]) {
          const dCoin = sdRoundedCylinder(rotX(sub3(p, v3(cx, 1.08 + Math.sin(phase * 6 + cx) * 0.06, 0.1)), Math.PI / 2), 0.085, 0.015, 0.025);
          if (dCoin < best.d) best = { d: dCoin, color: [250, 204, 21], roughness: 0.12, id: 43 };
        }
      }
      return best;
    }
  };
}

export function buildRunwayDropScene(shotIndex, phase = 0.5) {
  const isTransformed = shotIndex >= 2;
  const jumpY = shotIndex === 1 ? Math.sin(phase * Math.PI) * 0.45 : 0.0;
  return {
    cam: {
      ro: v3(shotIndex === 3 ? 0.65 : 0, shotIndex === 2 ? 0.08 : 0.28, 2.75),
      ta: v3(0, 0.12, 0),
      fov: 1.92,
      bgTop: isTransformed ? [192, 132, 252] : [203, 213, 225],
      bgBot: isTransformed ? [244, 114, 182] : [241, 245, 249],
      floorY: -0.86,
      floorColor1: isTransformed ? [216, 180, 254] : [148, 163, 184],
      floorColor2: isTransformed ? [192, 132, 252] : [128, 144, 168]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(0, jumpY, 0),
        yaw: shotIndex === 1 ? phase * Math.PI * 2 : shotIndex === 3 ? 0.35 : 0,
        headPitch: shotIndex === 0 ? 0.18 : 0,
        armLPitch: isTransformed ? -0.45 : 0,
        armRPitch: isTransformed ? -0.85 : 0,
        expression: shotIndex === 0 ? "deadpan" : shotIndex === 1 ? "shocked" : "smirk",
        theme: isTransformed ? "y2k" : "base-gray"
      });
      const dPodium = sdRoundedCylinder(sub3(p, v3(0, -0.78, 0)), 0.72, 0.03, 0.08);
      let best = av;
      if (dPodium < best.d) {
        best = { d: dPodium, color: isTransformed ? [244, 114, 182] : [226, 232, 240], roughness: 0.18, id: 50 };
      }
      return best;
    }
  };
}

export function buildBurntPizzaScene(shotIndex, phase = 0.5) {
  const fallRoll = shotIndex === 3 ? smoothstep(0, 0.65, phase) * 1.38 : 0;
  return {
    cam: {
      ro: v3(shotIndex === 3 ? -0.35 : 0, shotIndex === 1 ? 0.45 : shotIndex === 3 ? 0.55 : 0.32, shotIndex === 1 ? 2.15 : shotIndex === 3 ? 3.45 : 2.85),
      ta: v3(shotIndex === 3 ? -0.38 : 0, shotIndex === 3 ? -0.22 : 0.16, 0.1),
      fov: 1.92,
      bgTop: shotIndex === 1 ? [100, 116, 139] : [186, 230, 253],
      bgBot: shotIndex === 1 ? [148, 163, 184] : [241, 245, 249],
      floorY: -0.86,
      floorColor1: [203, 213, 225],
      floorColor2: [178, 190, 206]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(shotIndex === 3 ? 0.65 : 0, 0, -0.05),
        yaw: 0,
        roll: fallRoll,
        armLPitch: shotIndex >= 2 ? 0.45 : -0.85,
        armRPitch: -0.85,
        expression: "smile",
        theme: "bacon"
      });
      // Kitchen table + Silver tray + Charred pitch-black blocky pizza
      const dTable = sdRoundBox(sub3(p, v3(0, -0.44, 0.48)), v3(1.15, 0.06, 0.45), 0.02);
      const dTray = sdRoundedCylinder(sub3(p, v3(0, -0.35, 0.45)), 0.28, 0.015, 0.02);
      const dPizza = sdRoundedCylinder(sub3(p, v3(0, -0.32, 0.45)), 0.23, 0.02, 0.032);
      let best = av;
      if (dTable < best.d) best = { d: dTable, color: [226, 232, 240], roughness: 0.32, id: 60 };
      if (dTray < best.d) best = { d: dTray, color: [148, 163, 184], roughness: 0.18, id: 61 };
      if (dPizza < best.d) best = { d: dPizza, color: [28, 25, 23], roughness: 0.65, id: 62 };
      return best;
    }
  };
}

export function buildTornadoTowerScene(shotIndex, phase = 0.5) {
  const sway = shotIndex === 3 ? 0 : Math.sin(phase * Math.PI * 4) * 0.08;
  const hopY = shotIndex === 2 ? Math.sin(phase * Math.PI) * 0.38 : 0;
  return {
    cam: {
      ro: v3(shotIndex === 1 ? 0.65 : -0.35, 0.48, 2.95),
      ta: v3(0, 0.12, 0),
      fov: 1.9,
      bgTop: shotIndex === 3 ? [56, 189, 248] : [71, 85, 105],
      bgBot: shotIndex === 3 ? [224, 242, 254] : [148, 163, 184],
      floorY: -1.25,
      floorColor1: [74, 222, 128],
      floorColor2: [34, 197, 94]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(sway, hopY + 0.05, 0),
        yaw: shotIndex === 0 ? -0.35 : 0.15,
        armLPitch: shotIndex === 3 ? -2.4 : -0.65,
        armRPitch: shotIndex === 0 ? -1.45 : -0.85,
        legLPitch: shotIndex === 2 ? -0.45 : 0,
        legRPitch: shotIndex === 2 ? 0.45 : 0,
        expression: shotIndex === 3 ? "grin" : shotIndex === 2 ? "tears" : "shocked",
        theme: "guest"
      });
      // Green Disaster Survival Tower Platform + Yellow Railing + Background Spinning Tornado Funnel
      const dTower = sdRoundBox(sub3(p, v3(sway * 0.5, -0.82, 0)), v3(0.68, 0.22, 0.62), 0.025);
      const dRail = sdRoundBox(sub3(p, v3(sway * 0.5, -0.45, 0.52)), v3(0.62, 0.05, 0.05), 0.015);
      let best = av;
      if (dTower < best.d) best = { d: dTower, color: [34, 197, 94], roughness: 0.32, id: 70 };
      if (shotIndex < 2 && dRail < best.d) best = { d: dRail, color: [250, 204, 21], roughness: 0.24, id: 71 };
      if (shotIndex < 3) {
        const funnelR = clamp(0.12 + (p.y + 0.9) * 0.24, 0.08, 0.58);
        const pFunnel = sub3(p, v3(-0.95 + Math.sin(p.y * 5 + phase * 10) * 0.08, 0.25, -1.15));
        const dTornado = sdRoundedCylinder(pFunnel, funnelR, 0.04, 1.35);
        if (dTornado < best.d) best = { d: dTornado, color: [51, 65, 85], roughness: 0.6, id: 72 };
      }
      return best;
    }
  };
}

export function buildPoliceChaseScene(shotIndex, phase = 0.5) {
  const runSwing = Math.sin(phase * Math.PI * 4) * 0.78;
  const tripPitch = shotIndex === 2 ? smoothstep(0.1, 0.7, phase) * 1.15 : shotIndex === 3 ? 1.45 : 0;
  const sirenFlash = Math.sin(phase * Math.PI * 6) > 0;
  return {
    cam: {
      ro: v3(shotIndex === 1 ? 0.2 : 0, 0.34, 3.25),
      ta: v3(0, 0.04, 0),
      fov: 1.9,
      bgTop: sirenFlash && shotIndex < 3 ? [96, 165, 250] : [147, 197, 253],
      bgBot: [226, 232, 240],
      floorY: -0.86,
      floorColor1: [71, 85, 105],
      floorColor2: [51, 65, 85]
    },
    sceneFn: (p) => {
      // Right: Classic Noob fleeing with green cash block
      const noob = evalAvatarSDF(p, {
        pos: v3(0.46, shotIndex === 3 ? -0.35 : 0, 0.12),
        yaw: shotIndex === 3 ? 0 : 0.45,
        waistPitch: tripPitch,
        armLPitch: shotIndex >= 2 ? -0.5 : runSwing,
        armRPitch: -0.95,
        legLPitch: shotIndex >= 2 ? 0 : -runSwing,
        legRPitch: shotIndex >= 2 ? 0 : runSwing,
        expression: shotIndex === 0 ? "smirk" : shotIndex === 3 ? "deadpan" : "shocked",
        theme: "noob"
      });
      // Left: Police Officer chasing
      const cop = evalAvatarSDF(p, {
        pos: v3(-0.52, 0, -0.08),
        yaw: 0.38,
        armLPitch: shotIndex === 3 ? 0 : -runSwing,
        armRPitch: shotIndex === 3 ? -0.4 : runSwing,
        legLPitch: shotIndex === 3 ? 0 : runSwing,
        legRPitch: shotIndex === 3 ? 0 : -runSwing,
        expression: "angry",
        theme: "police"
      });
      // Green cash bag block + Yellow fire hydrant in Shot 2
      const cashY = shotIndex === 2 ? 0.55 + phase * 0.35 : 0.05;
      const dCash = sdRoundBox(sub3(p, v3(0.66, cashY, 0.36)), v3(0.15, 0.12, 0.12), 0.025);
      let best = noob.d < cop.d ? noob : cop;
      if (shotIndex < 3 && dCash < best.d) best = { d: dCash, color: [34, 197, 94], roughness: 0.28, id: 80 };
      if (shotIndex === 2) {
        const dHydrant = sdRoundedCylinder(sub3(p, v3(0.82, -0.62, 0.25)), 0.11, 0.02, 0.22);
        if (dHydrant < best.d) best = { d: dHydrant, color: [250, 204, 21], roughness: 0.22, id: 81 };
      }
      return best;
    }
  };
}

export function buildDoorsHallwayScene(shotIndex, phase = 0.5) {
  const flickerDark = shotIndex === 1 && Math.sin(phase * Math.PI * 6) < 0;
  return {
    cam: {
      ro: v3(0.15, 0.32, 2.72),
      ta: v3(0, 0.12, 0),
      fov: 1.92,
      bgTop: flickerDark || shotIndex >= 2 ? [15, 23, 42] : [51, 38, 32],
      bgBot: flickerDark || shotIndex >= 2 ? [30, 41, 59] : [92, 64, 51],
      floorY: -0.86,
      floorColor1: [120, 53, 15],
      floorColor2: [96, 42, 12]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(shotIndex === 3 ? 0.32 : -0.12, 0, 0.08),
        yaw: shotIndex === 3 ? 2.8 : -0.15,
        headYaw: shotIndex === 2 ? -0.65 : 0,
        armLPitch: -0.25,
        armRPitch: -1.25,
        expression: shotIndex >= 1 ? "shocked" : "deadpan",
        theme: "theo"
      });
      // Wooden Door / Wardrobe in background + Glowing Flashlight Cylinder + Scary Eyes in Shot 2
      const dDoor = sdRoundBox(sub3(p, v3(0.38, 0.05, -0.58)), v3(0.46, 0.88, 0.08), 0.02);
      const dKnob = sdSphere(sub3(p, v3(0.68, 0.0, -0.48)), 0.05);
      const dFlash = sdRoundedCylinder(rotX(sub3(p, v3(-0.62, 0.22, 0.42)), Math.PI / 2), 0.065, 0.01, 0.14);
      let best = av;
      if (dDoor < best.d) best = { d: dDoor, color: [120, 72, 42], roughness: 0.45, id: 90 };
      if (dKnob < best.d) best = { d: dKnob, color: [250, 204, 21], roughness: 0.15, id: 91 };
      if (shotIndex < 3 && dFlash < best.d) best = { d: dFlash, color: [253, 224, 71], roughness: 0.08, id: 92 };
      if (shotIndex === 2) {
        const dEyeL = sdSphere(sub3(p, v3(0.38, 0.62, -0.35)), 0.048);
        const dEyeR = sdSphere(sub3(p, v3(0.58, 0.62, -0.35)), 0.048);
        if (Math.min(dEyeL, dEyeR) < best.d) best = { d: Math.min(dEyeL, dEyeR), color: [255, 255, 255], roughness: 0.02, id: 93 };
      }
      return best;
    }
  };
}

export function buildSwordDuelScene(shotIndex, phase = 0.5) {
  const jumpY = shotIndex === 1 ? Math.sin(phase * Math.PI) * 0.36 : 0;
  const slashPitch = shotIndex === 1 ? -1.85 + Math.sin(phase * Math.PI * 2) * 0.55 : shotIndex === 3 ? -1.1 : -1.45;
  return {
    cam: {
      ro: v3(0, 0.32, 3.25),
      ta: v3(0, 0.08, 0),
      fov: 1.9,
      bgTop: [251, 146, 60],
      bgBot: [254, 215, 170],
      floorY: -0.96,
      floorColor1: [239, 68, 68],
      floorColor2: [249, 115, 22]
    },
    sceneFn: (p) => {
      const leftX = shotIndex === 1 ? -0.34 : -0.56;
      const rightX = shotIndex === 1 ? 0.34 : shotIndex === 2 ? 0.72 : 0.56;
      const leftAv = evalAvatarSDF(p, {
        pos: v3(leftX, jumpY, 0),
        yaw: 0.65,
        armRPitch: slashPitch,
        expression: shotIndex === 3 ? "smile" : shotIndex === 1 ? "angry" : "smirk",
        theme: "builderman",
        hasMug: shotIndex === 3
      });
      const rightAv = evalAvatarSDF(p, {
        pos: v3(rightX, jumpY, 0),
        yaw: -0.65,
        roll: shotIndex === 2 ? -0.18 : 0,
        armLPitch: slashPitch,
        expression: shotIndex === 2 ? "shocked" : shotIndex === 3 ? "smile" : "grin",
        theme: "noob",
        hasMug: shotIndex === 3
      });
      // Studded Stone Bridge Slab + Two Metallic Linked Swords
      const dBridge = sdRoundBox(sub3(p, v3(0, -0.82, 0)), v3(1.15, 0.12, 0.52), 0.02);
      let best = leftAv.d < rightAv.d ? leftAv : rightAv;
      if (dBridge < best.d) best = { d: dBridge, color: [148, 163, 184], roughness: 0.38, id: 100 };
      if (shotIndex < 3) {
        const dBlade1 = sdRoundBox(rotZ(sub3(p, v3(leftX + 0.38, 0.35 + jumpY, 0.18)), -0.55), v3(0.03, 0.34, 0.015), 0.008);
        const dBlade2 = sdRoundBox(rotZ(sub3(p, v3(rightX - 0.38, 0.35 + jumpY, 0.18)), 0.55), v3(0.03, 0.34, 0.015), 0.008);
        const dSwords = Math.min(dBlade1, dBlade2);
        if (dSwords < best.d) best = { d: dSwords, color: [226, 232, 240], roughness: 0.12, id: 101 };
      }
      return best;
    }
  };
}

export function buildExamPanicScene(shotIndex, phase = 0.5) {
  const scribble = shotIndex === 2 ? Math.sin(phase * Math.PI * 8) * 0.25 : 0;
  const slumpPitch = shotIndex === 3 ? -0.38 : 0.08;
  return {
    cam: {
      ro: v3(shotIndex === 2 ? 0.65 : 0, 0.48, 2.55),
      ta: v3(0, 0.18, 0.12),
      fov: 1.92,
      bgTop: [186, 230, 253],
      bgBot: [254, 249, 195],
      floorY: -0.86,
      floorColor1: [203, 213, 225],
      floorColor2: [186, 198, 214]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(0, -0.02, -0.08),
        yaw: scribble * 0.3,
        waistPitch: slumpPitch,
        armLPitch: shotIndex === 1 ? -2.2 : shotIndex === 3 ? 0 : -0.85,
        armRPitch: shotIndex === 1 ? -2.2 : shotIndex === 3 ? 0 : -0.85 + scribble,
        expression: shotIndex === 0 ? "smile" : shotIndex === 1 ? "shocked" : shotIndex === 2 ? "angry" : "dizzy",
        theme: "bacon"
      });
      const dDesk = sdRoundBox(sub3(p, v3(0, -0.40, 0.42)), v3(1.15, 0.055, 0.52), 0.02);
      const dPaper = sdRoundBox(sub3(p, v3(0, -0.335, 0.40)), v3(0.26, 0.008, 0.32), 0.004);
      const dClock = sdRoundedCylinder(rotX(sub3(p, v3(0.55, 0.82, -0.55)), Math.PI / 2), 0.18, 0.015, 0.03);
      const dClockDial = sdRoundedCylinder(rotX(sub3(p, v3(0.55, 0.82, -0.53)), Math.PI / 2), 0.135, 0.01, 0.032);
      let best = av;
      if (dDesk < best.d) best = { d: dDesk, color: [180, 124, 78], roughness: 0.38, id: 110 };
      if (dPaper < best.d) best = { d: dPaper, color: [255, 255, 255], roughness: 0.25, id: 111 };
      if (dClock < best.d) best = { d: dClock, color: [239, 68, 68], roughness: 0.22, id: 112 };
      if (dClockDial < best.d) best = { d: dClockDial, color: [255, 255, 255], roughness: 0.2, id: 113 };
      return best;
    }
  };
}

export function buildRedLightScene(shotIndex, phase = 0.5) {
  const isRed = shotIndex === 1 || shotIndex === 2;
  const stride = isRed ? 0.68 : Math.sin(phase * Math.PI * 4) * 0.65;
  const wobble = shotIndex === 2 ? Math.sin(phase * Math.PI * 6) * 0.09 : 0;
  return {
    cam: {
      ro: v3(0, 0.32, 3.18),
      ta: v3(0, 0.06, 0),
      fov: 1.9,
      bgTop: isRed ? [244, 63, 94] : [52, 211, 153],
      bgBot: [254, 243, 199],
      floorY: -0.86,
      floorColor1: [234, 198, 138],
      floorColor2: [218, 180, 118]
    },
    sceneFn: (p) => {
      const runner1 = evalAvatarSDF(p, {
        pos: v3(-0.48, isRed ? 0.14 : 0, 0),
        yaw: 0.18,
        waistPitch: shotIndex === 3 ? 0.45 : 0,
        armLPitch: -stride,
        armRPitch: stride,
        legLPitch: stride,
        legRPitch: -stride * 0.5,
        expression: isRed ? "shocked" : "grin",
        theme: "obby"
      });
      const runner2 = evalAvatarSDF(p, {
        pos: v3(0.48, isRed ? 0.12 : 0, 0),
        yaw: -0.15,
        roll: wobble,
        waistPitch: shotIndex === 3 ? 0.45 : 0,
        armLPitch: stride,
        armRPitch: -stride,
        legLPitch: -stride * 0.5,
        legRPitch: stride,
        expression: isRed ? "shocked" : "grin",
        theme: "noob"
      });
      const dFinish = sdRoundBox(sub3(p, v3(0, -0.84, 0.55)), v3(1.35, 0.02, 0.12), 0.008);
      let best = runner1.d < runner2.d ? runner1 : runner2;
      if (dFinish < best.d) best = { d: dFinish, color: [225, 29, 72], roughness: 0.22, id: 120 };
      return best;
    }
  };
}

export function renderRawPanelSet(tmpDir, force = false, shardIdx = 0, shardCount = 1, onlyPrefixes = null) {
  fs.mkdirSync(tmpDir, { recursive: true });
  let taskCounter = 0;
  const writePng = (name, w, h, computeFn) => {
    if (onlyPrefixes && !onlyPrefixes.some((p) => name.startsWith(p + "_"))) return;
    const myTask = taskCounter++;
    if (myTask % shardCount !== shardIdx) return;
    const outPath = path.join(tmpDir, name);
    if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) return;
    const buf = computeFn();
    fs.writeFileSync(outPath, encodePNG(w, h, buf));
  };

  const studioCam = {
    ro: v3(0, 0.22, 2.75),
    ta: v3(0, 0.04, 0),
    fov: 1.95,
    bgTop: [219, 234, 254],
    bgBot: [241, 245, 249],
    floorY: -0.86,
    floorColor1: [162, 174, 192],
    floorColor2: [144, 158, 178]
  };

  const turnAngles = [
    ["turn_front.png", 0.0, true],
    ["turn_3q.png", 0.68, true],
    ["turn_side.png", 1.52, true]
  ];
  for (const [fname, yaw, mug] of turnAngles) {
    writePng(fname, 420, 520, () =>
      render3DViewport(
        420,
        520,
        (p) => evalAvatarSDF(p, { yaw, hasMug: mug, theme: "theo", expression: "smile" }),
        studioCam
      )
    );
  }

  const driftModes = [
    ["drift_1_fingers.png", "human-fingers", "shocked"],
    ["drift_2_lego.png", "lego-studs", "deadpan"],
    ["drift_3_voxel.png", "minecraft-voxel", "deadpan"],
    ["drift_4_locked.png", "none", "smile"]
  ];
  for (const [fname, dMode, expr] of driftModes) {
    writePng(fname, 320, 420, () =>
      render3DViewport(
        320,
        420,
        (p) =>
          evalAvatarSDF(p, {
            yaw: 0.36,
            headPitch: dMode === "lego-studs" ? 0.14 : 0,
            armLPitch: -0.48,
            armRPitch: -0.58,
            driftMode: dMode,
            expression: expr,
            theme: "theo"
          }),
        { ...studioCam, ro: v3(0, 0.26, 2.68), ta: v3(0, 0.08, 0) }
      )
    );
  }

  // Classic Roblox Avatars Lineup (6 iconic characters, 260x340 each)
  const classicAvatars = [
    ["avatar_noob.png", "noob", "smile", false],
    ["avatar_guest.png", "guest", "grin", false],
    ["avatar_bacon.png", "bacon", "smile", false],
    ["avatar_builderman.png", "builderman", "smirk", false],
    ["avatar_obby.png", "obby", "grin", false],
    ["avatar_theo.png", "theo", "smile", true]
  ];
  for (const [fname, thm, expr, mug] of classicAvatars) {
    writePng(fname, 260, 340, () =>
      render3DViewport(
        260,
        340,
        (p) => evalAvatarSDF(p, { yaw: 0.32, armLPitch: -0.22, armRPitch: -0.42, theme: thm, expression: expr, hasMug: mug }),
        { ...studioCam, ro: v3(0, 0.24, 2.72), ta: v3(0, 0.05, 0) }
      )
    );
  }

  // Classic Roblox Face Decal Atlas (8 iconic expressions close-up on Bright Yellow head, 220x220 each)
  const classicFaces = [
    ["face_smile.png", "smile"],
    ["face_deadpan.png", "deadpan"],
    ["face_smirk.png", "smirk"],
    ["face_grin.png", "grin"],
    ["face_shocked.png", "shocked"],
    ["face_tears.png", "tears"],
    ["face_angry.png", "angry"],
    ["face_dizzy.png", "dizzy"]
  ];
  for (const [fname, expr] of classicFaces) {
    writePng(fname, 220, 220, () =>
      render3DViewport(
        220,
        220,
        (p) => evalAvatarSDF(p, { yaw: 0.12, theme: "noob", expression: expr }),
        { ...studioCam, ro: v3(0, 0.76, 1.28), ta: v3(0, 0.74, 0), floorY: null }
      )
    );
  }

  const suites = [
    ["alarm", buildAlarmMeltdownScene],
    ["obby", buildObbySkyScene],
    ["duo", buildDuoComedyScene],
    ["cafe", buildCozyCafeScene],
    ["runway", buildRunwayDropScene],
    ["pizza", buildBurntPizzaScene],
    ["tornado", buildTornadoTowerScene],
    ["chase", buildPoliceChaseScene],
    ["doors", buildDoorsHallwayScene],
    ["sword", buildSwordDuelScene],
    ["exam", buildExamPanicScene],
    ["redlight", buildRedLightScene]
  ];

  for (const [prefix, builder] of suites) {
    for (let s = 0; s < 4; s++) {
      writePng(`${prefix}_shot_${s}.png`, 360, 640, () => {
        const { cam, sceneFn } = builder(s, 0.55);
        return render3DViewport(360, 640, sceneFn, cam);
      });
    }
    let frameIdx = 0;
    for (let s = 0; s < 4; s++) {
      for (let f = 0; f < 6; f++) {
        const phase = (f + 0.5) / 6;
        const idx = frameIdx++;
        writePng(`${prefix}_anim_${String(idx).padStart(2, "0")}.png`, 270, 480, () => {
          const { cam, sceneFn } = builder(s, phase);
          return render3DViewport(270, 480, sceneFn, cam);
        });
      }
    }
  }
}

export function buildBoardsManifest(rawDir) {
  const showcaseDir = path.join(ROOT, "assets", "showcase");
  const alarmDir = path.join(ROOT, "examples", "monday-alarm-meltdown", "assets");
  const obbyDir = path.join(ROOT, "examples", "obby-sky-run", "assets");
  const duoDir = path.join(ROOT, "examples", "duo-bestie-contrast", "assets");
  const cafeDir = path.join(ROOT, "examples", "cozy-cafe-tycoon", "assets");
  const runwayDir = path.join(ROOT, "examples", "runway-outfit-drop", "assets");
  const pizzaDir = path.join(ROOT, "examples", "burnt-pizza-slapstick", "assets");
  const tornadoDir = path.join(ROOT, "examples", "disaster-tower-tornado", "assets");
  const chaseDir = path.join(ROOT, "examples", "brookhaven-police-chase", "assets");
  const doorsDir = path.join(ROOT, "examples", "doors-flashlight-hallway", "assets");
  const swordDir = path.join(ROOT, "examples", "crossroads-sword-duel", "assets");
  const examDir = path.join(ROOT, "examples", "classroom-exam-panic", "assets");
  const redlightDir = path.join(ROOT, "examples", "red-light-freeze", "assets");
  for (const d of [showcaseDir, alarmDir, obbyDir, duoDir, cafeDir, runwayDir, pizzaDir, tornadoDir, chaseDir, doorsDir, swordDir, examDir, redlightDir]) {
    fs.mkdirSync(d, { recursive: true });
  }

  return {
    rootDir: ROOT,
    rawDir,
    turnaround: {
      outZh: path.join(showcaseDir, "momo_turnaround_sheet.zh.png"),
      outEn: path.join(showcaseDir, "momo_turnaround_sheet.en.png"),
      outDefault: [
        path.join(showcaseDir, "momo_turnaround_sheet.png"),
        path.join(alarmDir, "momo_turnaround_sheet.png")
      ],
      views: [
        { file: "turn_front.png", labelZh: "正面 0°", labelEn: "Front 0°" },
        { file: "turn_3q.png", labelZh: "斜侧 45°", labelEn: "3/4 View 45°" },
        { file: "turn_side.png", labelZh: "侧面 90°", labelEn: "Profile 90°" }
      ]
    },
    drift: {
      outZh: path.join(showcaseDir, "drift_rescue_comparison.zh.png"),
      outEn: path.join(showcaseDir, "drift_rescue_comparison.en.png"),
      outDefault: path.join(showcaseDir, "drift_rescue_comparison.png"),
      panels: [
        { file: "drift_1_fingers.png", labelZh: "× 真人手指 / 鼻子", labelEn: "× Human Fingers / Nose", r: 225, g: 29, b: 72 },
        { file: "drift_2_lego.png", labelZh: "× 乐高圆粒 / C型爪", labelEn: "× Lego Studs / C-Claw", r: 217, g: 119, b: 6 },
        { file: "drift_3_voxel.png", labelZh: "× MC 直角像素块", labelEn: "× Voxel Cube Head", r: 124, g: 58, b: 237 },
        { file: "drift_4_locked.png", labelZh: "✓ 标准 Roblox R6", labelEn: "✓ Roblox R6 Blocky", r: 5, g: 150, b: 105 }
      ]
    },
    classicAssetSheet: {
      avatarsOutZh: path.join(showcaseDir, "classic_avatars_lineup.zh.png"),
      avatarsOutEn: path.join(showcaseDir, "classic_avatars_lineup.en.png"),
      avatarsOutDefault: path.join(showcaseDir, "classic_avatars_lineup.png"),
      facesOutZh: path.join(showcaseDir, "classic_faces_atlas.zh.png"),
      facesOutEn: path.join(showcaseDir, "classic_faces_atlas.en.png"),
      facesOutDefault: path.join(showcaseDir, "classic_faces_atlas.png"),
      avatars: [
        { file: "avatar_noob.png", labelZh: "Classic Noob · 经典新手", labelEn: "Classic Noob (2006)" },
        { file: "avatar_guest.png", labelZh: "Classic Guest · 经典游客", labelEn: "Classic Guest (2008)" },
        { file: "avatar_bacon.png", labelZh: "Bacon Hair · 培根头", labelEn: "Bacon Hair (2014)" },
        { file: "avatar_builderman.png", labelZh: "Builderman · 安全帽", labelEn: "Builder's Club Hat" },
        { file: "avatar_obby.png", labelZh: "Speedrunner · 加速弹簧", labelEn: "Obby + Speed Coil" },
        { file: "avatar_theo.png", labelZh: "Story Hero · 连帽卫衣", labelEn: "Storytime Hoodie" }
      ],
      faces: [
        { file: "face_smile.png", labelZh: "Default Smile · 默认笑脸", labelEn: "Default Smile :)" },
        { file: "face_deadpan.png", labelZh: "Chill · 死鱼眼", labelEn: "Chill -_-" },
        { file: "face_smirk.png", labelZh: "Check It · 挑眉坏笑", labelEn: "Check It Smirk" },
        { file: "face_grin.png", labelZh: "Winning Grin · 露齿笑", labelEn: "Winning Grin :D" },
        { file: "face_shocked.png", labelZh: "Shocked · 震惊大眼", labelEn: "Shocked O_O" },
        { file: "face_tears.png", labelZh: "Crying · 瀑布流泪", labelEn: "Waterfall Tears" },
        { file: "face_angry.png", labelZh: "Bloxxer · 愤怒皱眉", labelEn: "Angry Bloxxer" },
        { file: "face_dizzy.png", labelZh: "KO Dizzy · 眩晕击败", labelEn: "KO Dizzy X_X" }
      ]
    },
    cases: [
      {
        prefix: "alarm",
        sheetZh: path.join(alarmDir, "storyboard_contact_sheet.zh.png"),
        sheetEn: path.join(alarmDir, "storyboard_contact_sheet.en.png"),
        sheetDefault: path.join(alarmDir, "storyboard_contact_sheet.png"),
        gifPath: path.join(alarmDir, "monday_alarm_meltdown.gif"),
        mp4Path: path.join(alarmDir, "monday_alarm_meltdown.mp4"),
        shots: [
          {
            labelZh: "01 · 闹钟惊醒 (0–3.5s)",
            labelEn: "01 · 7:59 AM Hook (0–3.5s)",
            chatZh: "7:59?!",
            chatEn: "7:59?!",
            bubbleX: 182,
            bubbleY: 36,
            savePath: path.join(alarmDir, "shot_01_hook.png")
          },
          {
            labelZh: "02 · 拍停闹钟 (3.5–7.5s)",
            labelEn: "02 · Snooze Slam (3.5–7.5s)",
            chatZh: "再睡5分钟",
            chatEn: "5 more mins",
            bubbleX: 180,
            bubbleY: 38,
            savePath: path.join(alarmDir, "shot_02_slam.png")
          },
          {
            labelZh: "03 · 消息刷屏 (7.5–11.5s)",
            labelEn: "03 · 99+ Pings (7.5–11.5s)",
            chatZh: "99+ 未读?!",
            chatEn: "99+ pings?!",
            bubbleX: 165,
            bubbleY: 36,
            savePath: path.join(alarmDir, "shot_03_tears.png")
          },
          {
            labelZh: "04 · 扑倒键盘 (11.5–15s)",
            labelEn: "04 · Faceplant Loop (11.5–15s)",
            chatZh: "oof.",
            chatEn: "oof.",
            bubbleX: 152,
            bubbleY: 88,
            savePath: path.join(alarmDir, "shot_04_faceplant.png")
          }
        ]
      },
      {
        prefix: "obby",
        sheetZh: path.join(obbyDir, "obby_storyboard_sheet.zh.png"),
        sheetEn: path.join(obbyDir, "obby_storyboard_sheet.en.png"),
        sheetDefault: path.join(obbyDir, "obby_storyboard_sheet.png"),
        gifPath: path.join(obbyDir, "obby_sky_run.gif"),
        mp4Path: path.join(obbyDir, "obby_sky_run.mp4"),
        shots: [
          { labelZh: "01 · 加速弹簧起跳", labelEn: "01 · Speed Coil Jump", chatZh: "加速起飞!", chatEn: "Speed Coil!", bubbleX: 155, bubbleY: 36 },
          { labelZh: "02 · 连续方格跳台", labelEn: "02 · Rhythm Hops", chatZh: "稳住!", chatEn: "ez jumps", bubbleX: 160, bubbleY: 38 },
          { labelZh: "03 · 激光块前急停", labelEn: "03 · Killbrick Stop", chatZh: "红砖别踩!", chatEn: "KILLBRICK!", bubbleX: 162, bubbleY: 38 },
          { labelZh: "04 · 存档点无缝循环", labelEn: "04 · Checkpoint Loop", chatZh: "通关 GG!", chatEn: "GG!", bubbleX: 162, bubbleY: 36 }
        ]
      },
      {
        prefix: "duo",
        sheetZh: path.join(duoDir, "duo_storyboard_sheet.zh.png"),
        sheetEn: path.join(duoDir, "duo_storyboard_sheet.en.png"),
        sheetDefault: path.join(duoDir, "duo_storyboard_sheet.png"),
        gifPath: path.join(duoDir, "duo_bestie_contrast.gif"),
        mp4Path: path.join(duoDir, "duo_bestie_contrast.mp4"),
        shots: [
          { labelZh: "01 · 潮人闺蜜 vs 新手", labelEn: "01 · Y2K vs. Classic Noob", chatZh: "看镜头!", chatEn: "pose!", bubbleX: 98, bubbleY: 38 },
          { labelZh: "02 · 转身误撞新手", labelEn: "02 · 180° Spin Bump", chatZh: "哎呀!", chatEn: "oops!", bubbleX: 102, bubbleY: 38 },
          { labelZh: "03 · R6 刚体直挺侧倒", labelEn: "03 · Rigid Plank Tilt", chatZh: "oof", chatEn: "oof", bubbleX: 215, bubbleY: 56 },
          { labelZh: "04 · 同步死鱼眼盯镜", labelEn: "04 · Deadpan Stare", chatZh: "...", chatEn: "bruh...", bubbleX: 160, bubbleY: 40 }
        ]
      },
      {
        prefix: "cafe",
        sheetZh: path.join(cafeDir, "cafe_storyboard_sheet.zh.png"),
        sheetEn: path.join(cafeDir, "cafe_storyboard_sheet.en.png"),
        sheetDefault: path.join(cafeDir, "cafe_storyboard_sheet.png"),
        gifPath: path.join(cafeDir, "cozy_cafe_tycoon.gif"),
        mp4Path: path.join(cafeDir, "cozy_cafe_tycoon.mp4"),
        shots: [
          { labelZh: "01 · 甜点柜台登场", labelEn: "01 · Counter Pop-Up", chatZh: "欢迎光临!", chatEn: "Fresh croissants!", bubbleX: 160, bubbleY: 36 },
          { labelZh: "02 · 羊角包摆盘", labelEn: "02 · Croissant Snap", chatZh: "刚出炉!", chatEn: "Hot & crispy", bubbleX: 160, bubbleY: 38 },
          { labelZh: "03 · 递出热拿铁", labelEn: "03 · Latte Slide", chatZh: "您的拿铁!", chatEn: "One latte!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "04 · 金币弹出循环", labelEn: "04 · +999 Coins Loop", chatZh: "+999 金币!", chatEn: "+999 Coins!", bubbleX: 160, bubbleY: 36 }
        ]
      },
      {
        prefix: "runway",
        sheetZh: path.join(runwayDir, "runway_storyboard_sheet.zh.png"),
        sheetEn: path.join(runwayDir, "runway_storyboard_sheet.en.png"),
        sheetDefault: path.join(runwayDir, "runway_storyboard_sheet.png"),
        gifPath: path.join(runwayDir, "runway_outfit_drop.gif"),
        mp4Path: path.join(runwayDir, "runway_outfit_drop.mp4"),
        shots: [
          { labelZh: "01 · 灰模初始状态", labelEn: "01 · Plain Base Avatar", chatZh: "还没穿搭...", chatEn: "0 stars...", bubbleX: 160, bubbleY: 38 },
          { labelZh: "02 · 蓄力旋转起跳", labelEn: "02 · Beat-Drop Spin", chatZh: "3, 2, 1!", chatEn: "Wait for it!", bubbleX: 160, bubbleY: 34 },
          { labelZh: "03 · 重音落地换装", labelEn: "03 · Y2K Crown Reveal", chatZh: "全套换装!", chatEn: "5 Stars!!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "04 · T台定格循环", labelEn: "04 · Runway Pose", chatZh: "拿下全场!", chatEn: "Top Model!", bubbleX: 160, bubbleY: 38 }
        ]
      },
      {
        prefix: "pizza",
        sheetZh: path.join(pizzaDir, "pizza_storyboard_sheet.zh.png"),
        sheetEn: path.join(pizzaDir, "pizza_storyboard_sheet.en.png"),
        sheetDefault: path.join(pizzaDir, "pizza_storyboard_sheet.png"),
        gifPath: path.join(pizzaDir, "burnt_pizza_slapstick.gif"),
        mp4Path: path.join(pizzaDir, "burnt_pizza_slapstick.mp4"),
        shots: [
          { labelZh: "01 · 端出焦黑披萨", labelEn: "01 · Burnt Black Pizza", chatZh: "我烤好了!", chatEn: "Dinner is ready!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "02 · 顶光呆滞微笑", labelEn: "02 · Deadpan Spotlight", chatZh: ":)", chatEn: ":)", bubbleX: 160, bubbleY: 38 },
          { labelZh: "03 · 方柱手臂脱落", labelEn: "03 · Arm Detaches", chatZh: "胳膊掉了?", chatEn: "my arm...", bubbleX: 160, bubbleY: 38 },
          { labelZh: "04 · 90°刚体拍地", labelEn: "04 · 90° Statue Flop", chatZh: "oof.", chatEn: "oof.", bubbleX: 160, bubbleY: 76 }
        ]
      },
      {
        prefix: "tornado",
        sheetZh: path.join(tornadoDir, "tornado_storyboard_sheet.zh.png"),
        sheetEn: path.join(tornadoDir, "tornado_storyboard_sheet.en.png"),
        sheetDefault: path.join(tornadoDir, "tornado_storyboard_sheet.png"),
        gifPath: path.join(tornadoDir, "disaster_tower_tornado.gif"),
        mp4Path: path.join(tornadoDir, "disaster_tower_tornado.mp4"),
        shots: [
          { labelZh: "01 · 龙卷风逼近", labelEn: "01 · Tornado Spotted", chatZh: "龙卷风!!", chatEn: "TORNADO!!", bubbleX: 160, bubbleY: 36 },
          { labelZh: "02 · 抓紧护栏", labelEn: "02 · Hold the Rail", chatZh: "塔要塌了!", chatEn: "Hold on!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "03 · 极限跳柱", labelEn: "03 · Last Pillar Jump", chatZh: "救命!!", chatEn: "JUMP!!", bubbleX: 160, bubbleY: 36 },
          { labelZh: "04 · 孤柱存活", labelEn: "04 · Survived!", chatZh: "成功存活!", chatEn: "Survived!", bubbleX: 160, bubbleY: 36 }
        ]
      },
      {
        prefix: "chase",
        sheetZh: path.join(chaseDir, "chase_storyboard_sheet.zh.png"),
        sheetEn: path.join(chaseDir, "chase_storyboard_sheet.en.png"),
        sheetDefault: path.join(chaseDir, "chase_storyboard_sheet.png"),
        gifPath: path.join(chaseDir, "brookhaven_police_chase.gif"),
        mp4Path: path.join(chaseDir, "brookhaven_police_chase.mp4"),
        shots: [
          { labelZh: "01 · 抱钱袋狂奔", labelEn: "01 · Bank Heist Dash", chatZh: "溜了溜了!", chatEn: "Catch me!", bubbleX: 195, bubbleY: 38 },
          { labelZh: "02 · 警灯追击", labelEn: "02 · Siren Pursuit", chatZh: "站住!!", chatEn: "STOP!!", bubbleX: 105, bubbleY: 38 },
          { labelZh: "03 · 绊倒飞扑", labelEn: "03 · Hydrant Trip", chatZh: "哎哟!", chatEn: "WHOA!", bubbleX: 185, bubbleY: 38 },
          { labelZh: "04 · 当场拿下", labelEn: "04 · Busted!", chatZh: "已老实...", chatEn: "busted...", bubbleX: 190, bubbleY: 64 }
        ]
      },
      {
        prefix: "doors",
        sheetZh: path.join(doorsDir, "doors_storyboard_sheet.zh.png"),
        sheetEn: path.join(doorsDir, "doors_storyboard_sheet.en.png"),
        sheetDefault: path.join(doorsDir, "doors_storyboard_sheet.png"),
        gifPath: path.join(doorsDir, "doors_flashlight_hallway.gif"),
        mp4Path: path.join(doorsDir, "doors_flashlight_hallway.mp4"),
        shots: [
          { labelZh: "01 · 50号门探索", labelEn: "01 · Door 050 Check", chatZh: "第50号门...", chatEn: "Door 50...", bubbleX: 145, bubbleY: 38 },
          { labelZh: "02 · 走廊闪灯", labelEn: "02 · Lights Flicker", chatZh: "灯闪了?!", chatEn: "Flicker?!", bubbleX: 145, bubbleY: 38 },
          { labelZh: "03 · 身后白眼", labelEn: "03 · Eyes Behind", chatZh: "身后有东西!", chatEn: "BEHIND ME!", bubbleX: 145, bubbleY: 38 },
          { labelZh: "04 · 极限躲柜", labelEn: "04 · Closet Hide", chatZh: "快躲衣柜!", chatEn: "HIDE!!", bubbleX: 175, bubbleY: 38 }
        ]
      },
      {
        prefix: "sword",
        sheetZh: path.join(swordDir, "sword_storyboard_sheet.zh.png"),
        sheetEn: path.join(swordDir, "sword_storyboard_sheet.en.png"),
        sheetDefault: path.join(swordDir, "sword_storyboard_sheet.png"),
        gifPath: path.join(swordDir, "crossroads_sword_duel.gif"),
        mp4Path: path.join(swordDir, "crossroads_sword_duel.mp4"),
        shots: [
          { labelZh: "01 · 石桥拔剑", labelEn: "01 · Bridge Standoff", chatZh: "来1v1!", chatEn: "1v1 SFOTH!", bubbleX: 110, bubbleY: 38 },
          { labelZh: "02 · 空中拼刀", labelEn: "02 · Mid-Air Clash", chatZh: "当!!", chatEn: "CLANG!!", bubbleX: 160, bubbleY: 32 },
          { labelZh: "03 · 悬崖险情", labelEn: "03 · Ledge Knockback", chatZh: "要掉岩浆了!", chatEn: "WHOA!", bubbleX: 215, bubbleY: 38 },
          { labelZh: "04 · 可乐言和", labelEn: "04 · Bloxy Cola Truce", chatZh: "干杯 GG!", chatEn: "GG Truce!", bubbleX: 160, bubbleY: 38 }
        ]
      },
      {
        prefix: "exam",
        sheetZh: path.join(examDir, "exam_storyboard_sheet.zh.png"),
        sheetEn: path.join(examDir, "exam_storyboard_sheet.en.png"),
        sheetDefault: path.join(examDir, "exam_storyboard_sheet.png"),
        gifPath: path.join(examDir, "classroom_exam_panic.gif"),
        mp4Path: path.join(examDir, "classroom_exam_panic.mp4"),
        shots: [
          { labelZh: "01 · 自信接卷", labelEn: "01 · Confident Start", chatZh: "稳拿满分!", chatEn: "Easy A+!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "02 · 看题傻眼", labelEn: "02 · Question 1 Shock", chatZh: "这考的啥?!", chatEn: "WHAT IS THIS?!", bubbleX: 160, bubbleY: 36 },
          { labelZh: "03 · 疯狂疾书", labelEn: "03 · 2x Speed Scribble", chatZh: "先写个解!", chatEn: "2 mins left!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "04 · 交卷宕机", labelEn: "04 · Brain KO", chatZh: "大脑已空...", chatEn: "brain empty", bubbleX: 160, bubbleY: 42 }
        ]
      },
      {
        prefix: "redlight",
        sheetZh: path.join(redlightDir, "redlight_storyboard_sheet.zh.png"),
        sheetEn: path.join(redlightDir, "redlight_storyboard_sheet.en.png"),
        sheetDefault: path.join(redlightDir, "redlight_storyboard_sheet.png"),
        gifPath: path.join(redlightDir, "red_light_freeze.gif"),
        mp4Path: path.join(redlightDir, "red_light_freeze.mp4"),
        shots: [
          { labelZh: "01 · 绿灯冲刺", labelEn: "01 · Green Light Sprint", chatZh: "绿灯快冲!", chatEn: "Green Light!", bubbleX: 160, bubbleY: 38 },
          { labelZh: "02 · 红灯急停", labelEn: "02 · Red Light Freeze", chatZh: "别动!!", chatEn: "RED LIGHT!!", bubbleX: 160, bubbleY: 34 },
          { labelZh: "03 · 单腿摇晃", labelEn: "03 · One-Leg Wobble", chatZh: "你别晃啊!", chatEn: "don't move...", bubbleX: 195, bubbleY: 36 },
          { labelZh: "04 · 飞扑过线", labelEn: "04 · Finish Dive", chatZh: "压线过关!", chatEn: "SAFE!!", bubbleX: 160, bubbleY: 42 }
        ]
      }
    ]
  };
}

const isMain = process.argv[1] && process.argv[1].endsWith("render_preview.mjs");
if (isMain) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`Usage: node scripts/render_preview.mjs [--raw-dir <dir>] [--force]`);
    process.exit(0);
  }
  const rawIdx = process.argv.indexOf("--raw-dir");
  const rawDir =
    rawIdx !== -1 && process.argv[rawIdx + 1]
      ? path.resolve(process.argv[rawIdx + 1])
      : path.join(ROOT, "tmp", "raw_3d");
  const force = process.argv.includes("--force");

  const onlyIdx = process.argv.indexOf("--only");
  const onlyPrefixes = onlyIdx !== -1 && process.argv[onlyIdx + 1] ? process.argv[onlyIdx + 1].split(",") : null;

  const shardArgIdx = process.argv.indexOf("--shard");
  if (shardArgIdx !== -1 && process.argv[shardArgIdx + 1]) {
    const [sIdx, sTotal] = process.argv[shardArgIdx + 1].split("/").map(Number);
    renderRawPanelSet(rawDir, force, sIdx, sTotal, onlyPrefixes);
    process.exit(0);
  }

  // Spawn 6 parallel shard workers to render all 3D panels rapidly
  fs.mkdirSync(rawDir, { recursive: true });
  const workers = 6;
  await Promise.all(
    Array.from({ length: workers }, (_, i) => {
      return new Promise((resolve, reject) => {
        const args = [process.argv[1], "--raw-dir", rawDir, "--shard", `${i}/${workers}`];
        if (force) args.push("--force");
        if (onlyPrefixes) args.push("--only", onlyPrefixes.join(","));
        const child = spawn(process.execPath, args, { stdio: "inherit" });
        child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`Shard ${i} exited ${code}`))));
      });
    })
  );
  console.log(`Rendered raw 3D panel set into ${rawDir} using ${workers} parallel workers`);

  if (process.platform === "win32") {
    const manifestPath = path.join(ROOT, "tmp", "boards_manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(buildBoardsManifest(rawDir), null, 2), "utf8");
    const ps1Path = path.join(ROOT, "scripts", "compose_boards.ps1");
    if (fs.existsSync(ps1Path)) {
      execFileSync("powershell", ["-ExecutionPolicy", "Bypass", "-File", ps1Path, "-ManifestPath", manifestPath], {
        stdio: "inherit"
      });
    }
  }
}
