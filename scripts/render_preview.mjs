#!/usr/bin/env node
/**
 * render_preview.mjs
 * Procedural 3D Signed Distance Field (SDF) Raymarching Studio Renderer
 * for Roblox-style blocky characters, turnaround sheets, anti-drift comparisons,
 * 9:16 storyboard keyframes, and animated GIF/MP4 short video previews.
 *
 * Uses zero external npm packages (Node.js standard library + zlib PNG encoder).
 */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ---------- Math & Vector Helpers ----------
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

// ---------- 3D Signed Distance Primitives ----------
function sdRoundBox(p, b, r) {
  const qx = Math.abs(p.x) - b.x;
  const qy = Math.abs(p.y) - b.y;
  const qz = Math.abs(p.z) - b.z;
  const ox = Math.max(qx, 0);
  const oy = Math.max(qy, 0);
  const oz = Math.max(qz, 0);
  const outside = Math.hypot(ox, oy, oz);
  const inside = Math.min(Math.max(qx, qy, qz), 0);
  return outside + inside - r;
}

function sdRoundedCylinder(p, ra, rb, h) {
  const dx = Math.hypot(p.x, p.z) - ra + rb;
  const dy = Math.abs(p.y) - h + rb;
  const ox = Math.max(dx, 0);
  const oy = Math.max(dy, 0);
  return Math.min(Math.max(dx, dy), 0) + Math.hypot(ox, oy) - rb;
}

// Fingerless C-shaped Roblox claw hand around local origin (opening downward -Y)
function sdCClawHand(p, scale = 1.0) {
  const q = mul3(p, 1 / scale);
  const qRot = rotX(q, Math.PI / 2);
  const dOuter = sdRoundedCylinder(qRot, 0.19, 0.035, 0.12);
  const dInnerHole = sdRoundedCylinder(qRot, 0.095, 0.01, 0.22);
  const dSlot = sdRoundBox(sub3(q, v3(0, -0.15, 0)), v3(0.082, 0.14, 0.22), 0.015);
  const dCut = Math.min(dInnerHole, dSlot);
  return Math.max(dOuter, -dCut) * scale;
}

// ---------- 2D Face Decal Texture Evaluator ----------
function evalFaceDecal(u, v, expression = "happy") {
  // u in [-1, 1] across front of head, v in [-1, 1] vertically
  if (Math.abs(u) > 0.85 || Math.abs(v) > 0.85) return null;

  // Blush ovals
  if (expression === "happy" || expression === "shocked" || expression === "tears") {
    const bL = Math.hypot((u + 0.42) / 0.13, (v + 0.12) / 0.075);
    const bR = Math.hypot((u - 0.42) / 0.13, (v + 0.12) / 0.075);
    if (bL < 1.0 || bR < 1.0) {
      return [251, 113, 133]; // soft rose blush decal
    }
  }

  // Waterfall tear strips for "tears"
  if (expression === "tears") {
    const inTearL = Math.abs(u + 0.28) < 0.085 && v < 0.08 && v > -0.68;
    const inTearR = Math.abs(u - 0.28) < 0.085 && v < 0.08 && v > -0.68;
    if (inTearL || inTearR) {
      const stripe = Math.sin(v * 35) > 0 ? [56, 189, 248] : [125, 211, 252];
      return stripe;
    }
  }

  // Eyes
  const ex = Math.abs(u) - 0.27;
  const ey = v - 0.16;

  if (expression === "deadpan" || expression === "slam") {
    // Horizontal flat line eyes (-_-)
    if (Math.abs(ex) < 0.13 && Math.abs(ey) < 0.038) {
      return [15, 23, 42];
    }
    // Brow
    if (expression === "slam" && Math.abs(ex) < 0.14 && Math.abs(ey - 0.11 + ex * 0.35) < 0.03) {
      return [15, 23, 42];
    }
  } else if (expression === "dizzy") {
    // @ _ @ spiral rings
    const r = Math.hypot(ex, ey);
    if (r < 0.145 && (Math.abs(r - 0.12) < 0.028 || Math.abs(r - 0.055) < 0.025)) {
      return [15, 23, 42];
    }
  } else if (expression === "shocked") {
    // Hollow ring eyes O_O
    const r = Math.hypot(ex, ey * 0.85);
    if (r < 0.145 && r > 0.075) return [15, 23, 42];
    if (r < 0.035) return [15, 23, 42];
  } else {
    // Glossy oval ink eyes with star/circle specular highlight
    const r = Math.hypot(ex / 0.095, ey / 0.135);
    if (r < 1.0) {
      const hl1 = Math.hypot((ex + 0.03) / 0.032, (ey - 0.04) / 0.038);
      const hl2 = Math.hypot((ex - 0.025) / 0.018, (ey + 0.035) / 0.022);
      if (hl1 < 1.0 || hl2 < 1.0) return [255, 255, 255];
      return [15, 23, 42];
    }
  }

  // Mouth
  const my = v + 0.22;
  if (expression === "shocked" || expression === "tears") {
    // Rounded rectangular gasp/wail mouth
    if (Math.abs(u) < 0.15 && Math.abs(my) < 0.095) {
      if (Math.abs(u) > 0.11 || Math.abs(my) > 0.065) return [15, 23, 42];
      return my > 0.02 ? [255, 255, 255] : [225, 29, 72];
    }
  } else if (expression === "deadpan" || expression === "dizzy") {
    if (Math.abs(u) < 0.13 && Math.abs(my) < 0.028) return [15, 23, 42];
  } else {
    // Classic curved smile or smirk
    const curve = u * u * 1.1;
    if (Math.abs(u) < 0.22 && Math.abs(my - curve + 0.04) < 0.034) {
      return [15, 23, 42];
    }
  }

  return null;
}

// ---------- Scene Material Palette (Official Roblox BrickColors) ----------
function getPalette(theme = "momo") {
  if (theme === "noob") {
    return {
      head: [245, 205, 48], // Bright yellow
      torso: [13, 105, 172], // Bright blue
      shirtAccent: [56, 189, 248],
      arms: [245, 205, 48], // Bare Bright yellow arms
      FullBareArms: true,
      legs: [164, 189, 71], // Br. yellowish green
      legCuff: [142, 168, 56],
      hair: null,
      hat: null,
      bag: null
    };
  }
  if (theme === "y2k") {
    return {
      head: [248, 217, 109], // Warm yellowish orange
      torso: [24, 30, 44], // Really black puffer
      shirtAccent: [192, 132, 252], // Electric purple graphic
      arms: [24, 30, 44],
      FullBareArms: false,
      legs: [147, 197, 253], // Pastel blue denim blocks
      legCuff: [30, 41, 59],
      hair: [244, 114, 182], // Pastel pink 3D UGC hair
      hat: [251, 207, 232],
      bag: [168, 85, 247]
    };
  }
  if (theme === "obby") {
    return {
      head: [245, 205, 48], // Bright yellow
      torso: [0, 170, 228], // Cyan jersey
      shirtAccent: [255, 255, 255], // Classic Roblox R stripe
      arms: [245, 205, 48], // Bare yellow R6 arms with Speed Coil
      FullBareArms: true,
      legs: [255, 85, 163], // Hot pink blocky legs
      legCuff: [163, 230, 53],
      hair: null,
      hat: [218, 38, 38], // Classic Red Roblox Visor
      bag: [241, 245, 249]
    };
  }
  // Default: "momo" (Matcha cardigan worker / student on canonical Roblox blocky rig)
  return {
    head: [253, 234, 141], // Cool yellow
    torso: [110, 231, 183], // Mint / Matcha cardigan
    shirtAccent: [244, 63, 94], // Red tie
    arms: [110, 231, 183], // Matcha sleeves with yellow blocky hands at bottom
    FullBareArms: false,
    legs: [71, 85, 105], // Dark stone grey blocky trousers
    legCuff: [51, 65, 85],
    hair: [68, 44, 32], // 3D Espresso brown UGC bob hair with bangs
    hat: [248, 250, 252], // White Roblox headphones
    bag: [56, 189, 248]
  };
}

// ---------- Canonical Roblox R6 / Blocky Avatar SDF Evaluator ----------
// Exact Roblox Stud Scale (1 stud = 0.38 units):
// - Torso: 2.0 x 2.0 x 1.0 studs -> half-extents (0.38, 0.38, 0.19)
// - Legs:  1.0 x 2.0 x 1.0 studs each -> half-extents (0.185, 0.38, 0.19) FLUSH at x = +/-0.192
// - Arms:  1.0 x 2.0 x 1.0 studs each -> half-extents (0.185, 0.38, 0.19) FLUSH at x = +/-0.578
// - Head:  1.2 x 1.2 x 1.2 studs barrel cylinder -> radius 0.245, half-height 0.24, barrel fillet 0.088
export function evalAvatarSDF(pWorld, cfg = {}) {
  const {
    pos = v3(0, 0, 0),
    yaw = 0,
    roll = 0,
    waistPitch = 0,
    headYaw = 0,
    headPitch = 0,
    armLPitch = -0.12,
    armRPitch = -0.2,
    legLPitch = 0,
    legRPitch = 0,
    expression = "happy",
    theme = "momo",
    driftMode = "none", // "none" | "human-fingers" | "lego-studs" | "minecraft-voxel"
    hasBeanie = true,
    hasBackpack = true,
    hasMug = false
  } = cfg;

  const pal = getPalette(theme);
  let p = sub3(pWorld, pos);
  if (roll !== 0) {
    p = add3(rotZ(sub3(p, v3(0, -0.78, 0)), -roll), v3(0, -0.78, 0));
  }
  p = rotY(p, -yaw);

  // Bounding sphere fast reject
  const dBound = len3(p) - 2.25;
  if (dBound > 0.25) {
    return { d: dBound, color: [0, 0, 0], roughness: 0.5, id: 0 };
  }

  let bestD = 1e9;
  let bestColor = pal.torso;
  let bestRough = 0.18;
  let bestId = 1;

  const addPart = (d, color, rough = 0.18, id = 1) => {
    if (d < bestD) {
      bestD = d;
      bestColor = color;
      bestRough = rough;
      bestId = id;
    }
  };

  const bevel = driftMode === "minecraft-voxel" ? 0.002 : 0.028;

  // Upper body pivot at waist (y = -0.18)
  const pWaist = rotX(sub3(p, v3(0, -0.18, 0)), -waistPitch);
  const pUpper = add3(pWaist, v3(0, -0.18, 0));

  // 1. Canonical 2x2x1 Roblox Torso (centered at y = 0.20)
  const pTorso = sub3(pUpper, v3(0, 0.20, 0));
  const dTorso = sdRoundBox(pTorso, v3(0.36, 0.36, 0.175), bevel);
  if (dTorso < bestD) {
    let col = pal.torso;
    if (pTorso.z > 0.14) {
      if (theme === "momo") {
        // Crisp white V-collar shirt, red tie, dark cardigan lapels & blue Roblox badge
        if (Math.abs(pTorso.x) < 0.11 && pTorso.y > 0.08) col = [255, 255, 255];
        if (Math.abs(pTorso.x) < 0.048 && pTorso.y > -0.22 && pTorso.y < 0.18) col = pal.shirtAccent;
        if (Math.abs(Math.abs(pTorso.x) - 0.115) < 0.022) col = [52, 211, 153];
        if (pTorso.x > 0.14 && pTorso.x < 0.29 && Math.abs(pTorso.y - 0.04) < 0.095) col = [56, 189, 248];
      } else if (theme === "y2k") {
        // Cropped jacket waist band + Y2K star/square graphic emblem
        if (pTorso.y < -0.24) col = [248, 217, 109];
        else if (Math.abs(pTorso.x) < 0.14 && Math.abs(pTorso.y - 0.04) < 0.14) col = pal.shirtAccent;
      } else if (theme === "obby") {
        // Classic tilted white/red Roblox [R] emblem on chest
        const rx = pTorso.x * 0.96 - (pTorso.y - 0.04) * 0.26;
        const ry = pTorso.x * 0.26 + (pTorso.y - 0.04) * 0.96;
        if (Math.abs(rx) < 0.13 && Math.abs(ry) < 0.13) {
          col = Math.abs(rx) < 0.045 && Math.abs(ry) < 0.045 ? [0, 170, 228] : [255, 255, 255];
        }
      }
    }
    addPart(dTorso, col, 0.18, 2);
  }

  // 2. Optional Backpack / Jetpack on back (-Z)
  if (hasBackpack && pal.bag) {
    const pBag = sub3(pUpper, v3(0, 0.20, -0.27));
    const dBag = sdRoundBox(pBag, v3(0.25, 0.26, 0.10), 0.03);
    addPart(dBag, pal.bag, 0.18, 3);
  }

  // 3. Canonical 1.2x1.2x1.2 Roblox Barrel-Beveled Head (centered at y = 0.83)
  const pHeadLocal = rotY(rotX(sub3(pUpper, v3(0, 0.83, 0)), -headPitch), -headYaw);
  let dHead;
  if (driftMode === "minecraft-voxel") {
    dHead = sdRoundBox(pHeadLocal, v3(0.28, 0.28, 0.28), 0.002);
  } else {
    // Authentic 1:1 Roblox SpecialMesh barrel cylinder with generous curved top & bottom bevels
    dHead = sdRoundedCylinder(pHeadLocal, 0.255, 0.088, 0.245);
  }

  if (dHead < bestD) {
    let hCol = pal.head;
    if (driftMode === "minecraft-voxel") {
      const vx = Math.floor((pHeadLocal.x + 2) * 9);
      const vy = Math.floor((pHeadLocal.y + 2) * 9);
      const vz = Math.floor((pHeadLocal.z + 2) * 9);
      if ((vx + vy + vz) % 2 === 0) {
        hCol = [hCol[0] - 32, hCol[1] - 36, hCol[2] - 24];
      }
    }
    if (pHeadLocal.z > 0.12) {
      const u = pHeadLocal.x / 0.22;
      const v = pHeadLocal.y / 0.20;
      const decal = evalFaceDecal(u, v, expression);
      if (decal) hCol = decal;
    }
    addPart(dHead, hCol, 0.14, 4);
  }

  // Drift failure visualizations (ONLY active in drift comparison panels)
  if (driftMode === "human-fingers") {
    const pNose = sub3(pHeadLocal, v3(0, 0.01, 0.29));
    const dNose = sdRoundBox(pNose, v3(0.045, 0.065, 0.085), 0.025);
    addPart(dNose, [242, 170, 135], 0.35, 4);
  }

  if (driftMode === "lego-studs") {
    // Unmistakable Lego cylindrical top stud on head + Lego shoulder studs
    const pStud = sub3(pHeadLocal, v3(0, 0.29, 0));
    const dStud = sdRoundedCylinder(pStud, 0.14, 0.015, 0.09);
    const pShL = sub3(pUpper, v3(-0.56, 0.62, 0));
    const pShR = sub3(pUpper, v3(0.56, 0.62, 0));
    const dStuds = Math.min(
      dStud,
      sdRoundedCylinder(pShL, 0.085, 0.012, 0.06),
      sdRoundedCylinder(pShR, 0.085, 0.012, 0.06)
    );
    addPart(dStuds, [250, 204, 21], 0.14, 4);
  }

  // 4. Sculpted 3D Roblox UGC Hair, Visor & Headphones (when driftMode === "none")
  if (driftMode === "none") {
    if (pal.hair) {
      // 3D UGC blocky hair cap + front fringe bangs + side hair locks framing the Roblox barrel head
      const pTopHair = sub3(pHeadLocal, v3(0, 0.19, -0.02));
      const dTopHair = sdRoundBox(pTopHair, v3(0.265, 0.09, 0.265), 0.055);
      const pBackHair = sub3(pHeadLocal, v3(0, 0.02, -0.21));
      const dBackHair = sdRoundBox(pBackHair, v3(0.255, 0.21, 0.065), 0.04);
      const pSideL = sub3(pHeadLocal, v3(-0.24, 0.03, 0.02));
      const pSideR = sub3(pHeadLocal, v3(0.24, 0.03, 0.02));
      const dSides = Math.min(
        sdRoundBox(pSideL, v3(0.045, 0.19, 0.18), 0.03),
        sdRoundBox(pSideR, v3(0.045, 0.19, 0.18), 0.03)
      );
      const pBangs = sub3(pHeadLocal, v3(0.03, 0.17, 0.22));
      const dBangs = sdRoundBox(rotZ(pBangs, -0.12), v3(0.21, 0.055, 0.045), 0.025);
      addPart(Math.min(dTopHair, dBackHair, dSides, dBangs), pal.hair, 0.28, 5);
    }

    if (hasBeanie && pal.hat) {
      if (theme === "obby") {
        // Classic Red Roblox Visor Cap
        const pBand = sub3(pHeadLocal, v3(0, 0.16, 0));
        const dBand = sdRoundedCylinder(pBand, 0.275, 0.025, 0.065);
        const pBill = sub3(pHeadLocal, v3(0, 0.14, 0.22));
        const dBill = sdRoundBox(pBill, v3(0.21, 0.02, 0.14), 0.015);
        addPart(Math.min(dBand, dBill), pal.hat, 0.18, 5);
      } else if (theme === "momo") {
        // White Roblox Headphones on ears + headband
        const pCupL = sub3(pHeadLocal, v3(-0.285, 0.02, 0.02));
        const pCupR = sub3(pHeadLocal, v3(0.285, 0.02, 0.02));
        const dCups = Math.min(
          sdRoundBox(pCupL, v3(0.045, 0.11, 0.095), 0.025),
          sdRoundBox(pCupR, v3(0.045, 0.11, 0.095), 0.025)
        );
        const pArch = sub3(pHeadLocal, v3(0, 0.295, 0.0));
        const dArch = sdRoundBox(pArch, v3(0.26, 0.025, 0.05), 0.015);
        addPart(Math.min(dCups, dArch), pal.hat, 0.16, 5);
      } else if (theme === "y2k") {
        // Cat-ear beanie + star visor glasses on forehead
        const pHat = sub3(pHeadLocal, v3(0, 0.24, 0));
        const dCap = sdRoundedCylinder(pHat, 0.285, 0.045, 0.09);
        const pEarL = sub3(pHeadLocal, v3(-0.18, 0.35, 0.02));
        const pEarR = sub3(pHeadLocal, v3(0.18, 0.35, 0.02));
        const dEars = Math.min(
          sdRoundBox(rotZ(pEarL, 0.25), v3(0.065, 0.08, 0.05), 0.02),
          sdRoundBox(rotZ(pEarR, -0.25), v3(0.065, 0.08, 0.05), 0.02)
        );
        addPart(Math.min(dCap, dEars), pal.hat, 0.24, 5);
      }
    }
  }

  // 5. Canonical 1x2x1 Left & Right Arms (FLUSH against the 2x2x1 torso at x = +/-0.555)
  for (const side of [-1, 1]) {
    const pitch = side < 0 ? armLPitch : armRPitch;
    const pShoulder = sub3(pUpper, v3(side * 0.555, 0.42, 0));
    const pArmLocal = rotX(pShoulder, pitch);
    // Solid 1x2x1 rectangular block arm (center at y = -0.22 from shoulder pivot)
    const pArmBlock = sub3(pArmLocal, v3(0, -0.22, 0));
    const dArm = sdRoundBox(pArmBlock, v3(0.155, 0.36, 0.175), bevel * 0.85);
    if (dArm < bestD) {
      // Bottom 30% of the solid 1x2x1 block is the skin-colored blocky hand!
      const isHandZone = !pal.FullBareArms && pArmBlock.y < -0.15;
      const armCol = isHandZone ? pal.head : pal.arms;
      addPart(dArm, armCol, 0.18, 6);
    }

    // Glowing Red Roblox Speed Coil around right arm for Obby Runner
    if (theme === "obby" && side === 1 && driftMode === "none") {
      for (const cy of [-0.08, -0.22, -0.36]) {
        const pCoil = sub3(pArmLocal, v3(0, cy, 0));
        const dCoilRing = Math.max(
          sdRoundedCylinder(pCoil, 0.215, 0.02, 0.032),
          -sdRoundedCylinder(pCoil, 0.165, 0.01, 0.06)
        );
        addPart(dCoilRing, [255, 50, 70], 0.05, 8);
      }
    }

    // Hand drift comparisons (ONLY active in drift comparison panels)
    const pHandEnd = sub3(pArmLocal, v3(0, -0.62, 0));
    if (driftMode === "human-fingers") {
      const dPalm = sdRoundBox(pHandEnd, v3(0.11, 0.07, 0.06), 0.02);
      let dFingers = dPalm;
      for (let f = -2; f <= 2; f++) {
        const pf = sub3(pHandEnd, v3(f * 0.044, -0.12, 0));
        dFingers = Math.min(dFingers, sdRoundBox(pf, v3(0.015, 0.075, 0.016), 0.008));
      }
      addPart(dFingers, [242, 170, 135], 0.35, 7);
    } else if (driftMode === "lego-studs") {
      // Show C-shaped Lego claw hook as part of the Lego contamination FAIL case!
      const dLegoClaw = sdCClawHand(sub3(pArmLocal, v3(0, -0.66, 0)), 0.85);
      addPart(dLegoClaw, [250, 204, 21], 0.16, 7);
    }

    // Optional Bloxy Cola / Coffee Mug attached cleanly to right blocky hand
    if (hasMug && side === 1 && driftMode === "none") {
      const pMug = sub3(pArmLocal, v3(0, -0.52, 0.24));
      const dMug = sdRoundedCylinder(pMug, 0.115, 0.02, 0.15);
      addPart(dMug, [245, 158, 11], 0.14, 8);
    }
  }

  // 6. Canonical 1x2x1 Left & Right Legs (sitting FLUSH side-by-side matching torso width!)
  for (const side of [-1, 1]) {
    const pitch = side < 0 ? legLPitch : legRPitch;
    const pHip = sub3(p, v3(side * 0.184, -0.18, 0));
    const pLegLocal = rotX(pHip, pitch);
    const pLeg = sub3(pLegLocal, v3(0, -0.36, 0));
    const dLeg = sdRoundBox(pLeg, v3(0.155, 0.36, 0.175), bevel * 0.85);
    if (dLeg < bestD) {
      const legCol = pLeg.y < -0.26 ? pal.legCuff : pal.legs;
      addPart(dLeg, legCol, 0.22, 9);
    }
  }

  return { d: bestD, color: bestColor, roughness: bestRough, id: bestId };
}

// ---------- Raymarcher & Studio Shader ----------
export function render3DViewport(width, height, sceneFn, camCfg = {}) {
  const buf = new Uint8Array(width * height * 4);
  const ro = camCfg.ro || v3(0, 0.45, 4.2);
  const ta = camCfg.ta || v3(0, 0.2, 0);
  const fov = camCfg.fov || 1.85;
  const bgTop = camCfg.bgTop || [15, 23, 42];
  const bgBot = camCfg.bgBot || [30, 41, 59];
  const floorY = camCfg.floorY ?? -0.98;
  const floorColor1 = camCfg.floorColor1 || [30, 41, 59];
  const floorColor2 = camCfg.floorColor2 || [22, 32, 50];

  const fw = norm3(sub3(ta, ro));
  const rt = norm3(cross3(fw, v3(0, 1, 0)));
  const up = cross3(rt, fw);

  const keyLight = norm3(v3(0.65, 0.85, 0.72));
  const rimLight = norm3(v3(-0.75, 0.45, -0.6));

  const calcNormal = (p, centerDist) => {
    const e = 0.003;
    const d0 = centerDist ?? sceneFn(p).d;
    const dx = sceneFn(v3(p.x + e, p.y, p.z)).d - d0;
    const dy = sceneFn(v3(p.x, p.y + e, p.z)).d - d0;
    const dz = sceneFn(v3(p.x, p.y, p.z + e)).d - d0;
    return norm3(v3(dx, dy, dz));
  };

  for (let py = 0; py < height; py++) {
    const ny = 1 - (2 * (py + 0.5)) / height;
    const vGrad = py / height;
    for (let px = 0; px < width; px++) {
      const nx = ((2 * (px + 0.5)) / width - 1) * (width / height);
      const rd = norm3(add3(add3(mul3(rt, nx), mul3(up, ny)), mul3(fw, fov)));

      // Background studio gradient
      let r = mix(bgTop[0], bgBot[0], vGrad);
      let g = mix(bgTop[1], bgBot[1], vGrad);
      let b = mix(bgTop[2], bgBot[2], vGrad);

      // Fast ray-sphere bounding check around scene center (0, 0.1, 0) with radius 2.55
      const ocx = ro.x;
      const ocy = ro.y - 0.1;
      const ocz = ro.z;
      const bSphere = ocx * rd.x + ocy * rd.y + ocz * rd.z;
      const cSphere = ocx * ocx + ocy * ocy + ocz * ocz - 2.55 * 2.55;
      const disc = bSphere * bSphere - cSphere;

      // Raymarch scene only when ray intersects the scene bounding sphere
      let t = disc > 0 ? Math.max(0.2, -bSphere - Math.sqrt(disc)) : 99.0;
      const tMax = disc > 0 ? Math.min(8.5, -bSphere + Math.sqrt(disc)) : 0.0;
      let hit = null;
      if (disc > 0 && tMax > 0.2) {
        for (let step = 0; step < 34; step++) {
          if (t > tMax) break;
          const pos = add3(ro, mul3(rd, t));
          const res = sceneFn(pos);
          if (res.d < 0.0035) {
            hit = { pos, res, t };
            break;
          }
          t += res.d;
        }
      }

      if (hit) {
        const N = calcNormal(hit.pos, hit.res.d);
        const V = mul3(rd, -1);
        const ndotl = Math.max(0, dot3(N, keyLight));
        // Soft subsurface wrap lighting for blind-box vinyl look
        const wrapDiff = 0.42 + 0.58 * clamp((dot3(N, keyLight) + 0.35) / 1.35, 0, 1);
        // Quick 2-sample ambient occlusion
        const aoSample = sceneFn(add3(hit.pos, mul3(N, 0.08))).d / 0.08;
        const ao = clamp(0.62 + 0.38 * aoSample, 0.55, 1.0);

        // Specular highlight (Blinn-Phong softbox)
        const H = norm3(add3(keyLight, V));
        const rough = hit.res.roughness ?? 0.2;
        const specPow = rough < 0.2 ? 42 : 20;
        const specStrength = rough < 0.2 ? 0.52 : 0.24;
        const spec = Math.pow(Math.max(0, dot3(N, H)), specPow) * specStrength;

        // Rim light
        const fresnel = Math.pow(1 - Math.max(0, dot3(N, V)), 3.2);
        const rim = fresnel * Math.max(0, dot3(N, rimLight)) * 0.45;

        const base = hit.res.color;
        r = clamp(base[0] * wrapDiff * ao + 255 * spec + 120 * rim, 0, 255);
        g = clamp(base[1] * wrapDiff * ao + 250 * spec + 210 * rim, 0, 255);
        b = clamp(base[2] * wrapDiff * ao + 240 * spec + 255 * rim, 0, 255);
      } else if (rd.y < -0.001 && floorY !== null) {
        // Intersect Roblox Studded Baseplate & SpawnLocation pad at y = floorY
        const tf = (floorY - ro.y) / rd.y;
        if (tf > 0 && tf < 14.0) {
          const fp = add3(ro, mul3(rd, tf));
          const cellSize = 0.38;
          const gx = Math.floor(fp.x / cellSize);
          const gz = Math.floor(fp.z / cellSize);
          const fx = (fp.x / cellSize - gx) - 0.5;
          const fz = (fp.z / cellSize - gz) - 0.5;

          let tileCol = (gx + gz) & 1 ? [...floorColor1] : [...floorColor2];

          // Roblox 1x1 square tile grid line + raised circular Baseplate Stud bump
          const isGridBorder = Math.abs(fx) > 0.45 || Math.abs(fz) > 0.45;
          const studR = Math.hypot(fx, fz);
          if (isGridBorder) {
            tileCol = [tileCol[0] * 0.78, tileCol[1] * 0.78, tileCol[2] * 0.78];
          } else if (studR < 0.23 && studR > 0.17) {
            // Directional bevel highlight/shadow on the Roblox Baseplate stud rim
            const bump = (fx + fz) > 0 ? 1.18 : 0.76;
            tileCol = [
              clamp(tileCol[0] * bump, 0, 255),
              clamp(tileCol[1] * bump, 0, 255),
              clamp(tileCol[2] * bump, 0, 255)
            ];
          } else if (studR <= 0.17) {
            tileCol = [
              clamp(tileCol[0] * 1.07, 0, 255),
              clamp(tileCol[1] * 1.07, 0, 255),
              clamp(tileCol[2] * 1.07, 0, 255)
            ];
          }

          // Classic Roblox SpawnLocation emblem ring under character origin
          const spawnR = Math.hypot(fp.x, fp.z);
          if (spawnR < 0.92 && Math.abs(fp.x) < 0.98 && Math.abs(fp.z) < 0.98) {
            if (Math.abs(spawnR - 0.74) < 0.045 || Math.abs(spawnR - 0.44) < 0.035) {
              tileCol = [226, 232, 240];
            }
          }

          // Soft contact shadow under character
          const shadowProbe = sceneFn(v3(fp.x, floorY + 0.24, fp.z)).d;
          const shadow = clamp(shadowProbe * 2.4, 0.34, 1.0);
          const fade = Math.exp(-0.075 * tf * tf);
          r = mix(r, tileCol[0] * shadow, fade);
          g = mix(g, tileCol[1] * shadow, fade);
          b = mix(b, tileCol[2] * shadow, fade);
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

// ---------- Pure Node PNG Encoder (Zero Dependencies) ----------
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
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type 0
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

// ---------- Scene Builders for Keyframes & Animations ----------
export function buildAlarmMeltdownScene(shotIndex, phase = 0.5) {
  // Shot 1: Hook (vibrating red alarm clock + shocked head pop-up)
  if (shotIndex === 0) {
    const shake = Math.sin(phase * Math.PI * 8) * 0.06;
    const popY = mix(-0.35, 0.05, smoothstep(0, 0.65, phase));
    return {
      cam: {
        ro: v3(0.15 + shake * 0.4, 0.55, 2.85 - phase * 0.25),
        ta: v3(0, 0.35, 0.2),
        fov: 1.9,
        bgTop: [24, 24, 48],
        bgBot: [45, 28, 58]
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0.18, popY, -0.15),
          yaw: -0.15,
          armLPitch: -0.9,
          armRPitch: -0.9,
          expression: "shocked",
          theme: "momo"
        });
        if (p.y > 0.45 && av.d < p.y - 0.28) return av;
        // Desk surface
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.42, 0.45)), v3(1.6, 0.08, 0.85), 0.02);
        // Red blocky alarm clock on desk
        const pClock = rotZ(sub3(p, v3(-0.32, -0.05 + Math.abs(shake) * 1.4, 0.55)), shake * 2.2);
        const dClockBody = sdRoundBox(pClock, v3(0.24, 0.22, 0.14), 0.04);
        const dClockFace = sdRoundBox(sub3(pClock, v3(0, 0, 0.06)), v3(0.18, 0.15, 0.1), 0.02);
        const dBellL = sdRoundedCylinder(sub3(pClock, v3(-0.18, 0.28, 0)), 0.08, 0.02, 0.05);
        const dBellR = sdRoundedCylinder(sub3(pClock, v3(0.18, 0.28, 0)), 0.08, 0.02, 0.05);

        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [120, 82, 56], roughness: 0.35, id: 20 };
        if (dClockBody < best.d) best = { d: dClockBody, color: [244, 63, 94], roughness: 0.15, id: 21 };
        if (dClockFace < best.d) best = { d: dClockFace, color: [254, 249, 195], roughness: 0.2, id: 22 };
        if (Math.min(dBellL, dBellR) < best.d) {
          best = { d: Math.min(dBellL, dBellR), color: [250, 204, 21], roughness: 0.12, id: 23 };
        }
        return best;
      }
    };
  }

  // Shot 2: Slamming the alarm clock with C-shaped hand
  if (shotIndex === 1) {
    const slamT = smoothstep(0.1, 0.65, phase);
    const armAngle = mix(-2.1, -0.85, slamT);
    const clockSquash = mix(0.22, 0.08, slamT);
    return {
      cam: {
        ro: v3(1.15, 0.42, 3.2),
        ta: v3(-0.05, 0.12, 0.2),
        fov: 1.85,
        bgTop: [17, 34, 51],
        bgBot: [30, 58, 76]
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0.25, 0.0, 0.0),
          yaw: -0.45,
          waistPitch: slamT * 0.22,
          armRPitch: armAngle,
          armLPitch: -0.3,
          expression: "slam",
          theme: "momo"
        });
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.48, 0.45)), v3(1.6, 0.08, 0.85), 0.02);
        const pClock = sub3(p, v3(-0.22, -0.38 + clockSquash, 0.48));
        const dClock = sdRoundBox(pClock, v3(0.28, clockSquash, 0.18), 0.03);
        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [120, 82, 56], roughness: 0.35, id: 20 };
        if (dClock < best.d) best = { d: dClock, color: [244, 63, 94], roughness: 0.15, id: 21 };
        return best;
      }
    };
  }

  // Shot 3: Crying 2D waterfall tears in front of glowing laptop
  if (shotIndex === 2) {
    return {
      cam: {
        ro: v3(Math.sin(phase * 0.6 - 0.3) * 0.55, 0.52, 2.95),
        ta: v3(0, 0.28, 0.15),
        fov: 1.9,
        bgTop: [12, 22, 46],
        bgBot: [20, 42, 78]
      },
      sceneFn: (p) => {
        const av = evalAvatarSDF(p, {
          pos: v3(0, -0.02, -0.1),
          yaw: 0,
          headPitch: Math.sin(phase * Math.PI * 4) * 0.05,
          armLPitch: -0.85,
          armRPitch: -0.85,
          expression: "tears",
          theme: "momo"
        });
        const dDesk = sdRoundBox(sub3(p, v3(0, -0.48, 0.45)), v3(1.6, 0.08, 0.85), 0.02);
        // Laptop base & screen
        const dLapBase = sdRoundBox(sub3(p, v3(0, -0.37, 0.45)), v3(0.36, 0.025, 0.24), 0.015);
        const pScreen = rotX(sub3(p, v3(0, -0.12, 0.64)), -0.25);
        const dLapScreen = sdRoundBox(pScreen, v3(0.36, 0.24, 0.02), 0.015);
        let best = av;
        if (dDesk < best.d) best = { d: dDesk, color: [100, 72, 52], roughness: 0.35, id: 20 };
        if (dLapBase < best.d) best = { d: dLapBase, color: [203, 213, 225], roughness: 0.2, id: 24 };
        if (dLapScreen < best.d) best = { d: dLapScreen, color: [125, 211, 252], roughness: 0.08, id: 25 };
        return best;
      }
    };
  }

  // Shot 4: 90-degree rigid waist face-plant onto keyboard
  const dropT = smoothstep(0.05, 0.55, phase);
  const bounce = phase > 0.55 ? Math.abs(Math.sin((phase - 0.55) * Math.PI * 5)) * 0.12 * (1 - phase) : 0;
  const pitch90 = mix(0.1, 1.32, dropT) - bounce;
  return {
    cam: {
      ro: v3(1.25, 1.35, 3.1),
      ta: v3(0, 0.05, 0.25),
      fov: 1.85,
      bgTop: [22, 24, 42],
      bgBot: [38, 32, 56]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(0, -0.02, -0.12),
        yaw: 0,
        waistPitch: pitch90,
        armLPitch: -0.4,
        armRPitch: -0.4,
        expression: "dizzy",
        theme: "momo"
      });
      const dDesk = sdRoundBox(sub3(p, v3(0, -0.48, 0.45)), v3(1.6, 0.08, 0.85), 0.02);
      const dKeyb = sdRoundBox(sub3(p, v3(0, -0.37, 0.42)), v3(0.38, 0.03, 0.18), 0.015);
      let best = av;
      if (dDesk < best.d) best = { d: dDesk, color: [120, 82, 56], roughness: 0.35, id: 20 };
      if (dKeyb < best.d) best = { d: dKeyb, color: [241, 245, 249], roughness: 0.2, id: 24 };
      return best;
    }
  };
}

export function buildObbySkyScene(shotIndex, phase = 0.5) {
  const jumpArc = Math.sin(phase * Math.PI) * 0.48;
  const runSwing = Math.sin(phase * Math.PI * 2) * 0.72;
  return {
    cam: {
      ro: v3(shotIndex === 1 ? 1.55 : -0.65, 0.65 + shotIndex * 0.08, 3.15),
      ta: v3(0, 0.08, 0),
      fov: 1.85,
      bgTop: [14, 165, 233],
      bgBot: [186, 230, 253],
      floorY: -1.35,
      floorColor1: [241, 245, 249],
      floorColor2: [226, 232, 240]
    },
    sceneFn: (p) => {
      const av = evalAvatarSDF(p, {
        pos: v3(mix(-0.38, 0.38, phase), jumpArc, 0),
        yaw: 0.52,
        armLPitch: runSwing,
        armRPitch: -runSwing,
        legLPitch: -runSwing,
        legRPitch: runSwing,
        expression: shotIndex === 2 ? "shocked" : "happy",
        theme: "obby",
        hasBeanie: true,
        hasBackpack: true
      });
      // Floating Roblox Studded Obby blocks + Glowing Red Neon Killbrick
      const dPad1 = sdRoundBox(sub3(p, v3(-0.58, -0.88, 0)), v3(0.52, 0.12, 0.52), 0.03);
      const dPad2 = sdRoundBox(sub3(p, v3(0.58, -0.72, 0)), v3(0.52, 0.12, 0.52), 0.03);
      const dKillBrick = sdRoundBox(sub3(p, v3(0.18, -0.57, 0)), v3(0.08, 0.04, 0.48), 0.015);
      let best = av;
      if (dPad1 < best.d) best = { d: dPad1, color: [244, 114, 182], roughness: 0.18, id: 30 };
      if (dPad2 < best.d) {
        const c2 = shotIndex === 3 ? [56, 189, 248] : [74, 222, 128];
        best = { d: dPad2, color: c2, roughness: 0.18, id: 31 };
      }
      if (shotIndex === 2 && dKillBrick < best.d) {
        best = { d: dKillBrick, color: [255, 45, 65], roughness: 0.04, id: 32 };
      }
      return best;
    }
  };
}

export function buildDuoComedyScene(shotIndex, phase = 0.5) {
  const spinY = shotIndex === 1 ? phase * Math.PI * 2 : 0.22;
  return {
    cam: {
      ro: v3(0, 0.32, 3.65),
      ta: v3(0, 0.08, 0),
      fov: 1.88,
      bgTop: [30, 27, 75],
      bgBot: [59, 7, 100],
      floorY: -0.92,
      floorColor1: [76, 29, 149],
      floorColor2: [59, 7, 100]
    },
    sceneFn: (p) => {
      // Left: Y2K Streetwear Avatar
      const leftAv = evalAvatarSDF(p, {
        pos: v3(-0.62, 0, 0),
        yaw: spinY,
        armLPitch: -0.42,
        armRPitch: -0.68,
        expression: shotIndex === 2 ? "shocked" : shotIndex === 3 ? "deadpan" : "happy",
        theme: "y2k",
        hasBeanie: true,
        hasBackpack: true,
        hasMug: true
      });
      // Right: Authentic Classic Rigid R6 Noob (Bright Yellow / Bright Blue / Yellowish Green)
      const rightAv = evalAvatarSDF(p, {
        pos: v3(0.54, 0, 0),
        yaw: -0.22,
        roll: shotIndex === 2 ? -0.24 : shotIndex === 3 ? -0.18 : 0,
        headYaw: shotIndex === 3 ? 0.22 : 0,
        armLPitch: 0,
        armRPitch: 0,
        legLPitch: 0,
        legRPitch: 0,
        expression: shotIndex === 3 ? "deadpan" : "happy",
        theme: "noob",
        hasBeanie: false,
        hasBackpack: false
      });
      return leftAv.d < rightAv.d ? leftAv : rightAv;
    }
  };
}

export function renderRawPanelSet(tmpDir, force = false) {
  fs.mkdirSync(tmpDir, { recursive: true });
  const writePng = (name, w, h, computeFn) => {
    const outPath = path.join(tmpDir, name);
    if (!force && fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) return;
    const buf = computeFn();
    fs.writeFileSync(outPath, encodePNG(w, h, buf));
  };

  // 1. 3-View Turnaround panels (420x520 each)
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
        (p) => evalAvatarSDF(p, { yaw, hasMug: mug, theme: "momo", expression: "happy" }),
        { ro: v3(0, 0.24, 3.05), ta: v3(0, 0.06, 0), fov: 1.9, floorY: -0.92 }
      )
    );
  }

  // 2. 4-Way Anti-Drift Comparison panels (320x420 each)
  const driftModes = [
    ["drift_1_fingers.png", "human-fingers", "shocked"],
    ["drift_2_lego.png", "lego-studs", "deadpan"],
    ["drift_3_voxel.png", "minecraft-voxel", "deadpan"],
    ["drift_4_locked.png", "none", "happy"]
  ];
  for (const [fname, dMode, expr] of driftModes) {
    writePng(fname, 320, 420, () =>
      render3DViewport(
        320,
        420,
        (p) =>
          evalAvatarSDF(p, {
            yaw: 0.38,
            headPitch: dMode === "lego-studs" ? 0.16 : 0,
            armLPitch: -0.52,
            armRPitch: -0.62,
            driftMode: dMode,
            expression: expr,
            theme: "momo",
            hasBeanie: dMode === "none"
          }),
        { ro: v3(0, 0.30, 2.95), ta: v3(0, 0.10, 0), fov: 1.9, floorY: -0.92 }
      )
    );
  }

  // 3. Keyframes & 24-frame animation loops for the 3 cases
  const suites = [
    ["alarm", buildAlarmMeltdownScene],
    ["obby", buildObbySkyScene],
    ["duo", buildDuoComedyScene]
  ];

  for (const [prefix, builder] of suites) {
    // 4 high-res 9:16 keyframes (360x640)
    for (let s = 0; s < 4; s++) {
      writePng(`${prefix}_shot_${s}.png`, 360, 640, () => {
        const { cam, sceneFn } = builder(s, 0.55);
        return render3DViewport(360, 640, sceneFn, cam);
      });
    }
    // 24 animation frames (6 frames per shot, 270x480)
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
  for (const d of [showcaseDir, alarmDir, obbyDir, duoDir]) {
    fs.mkdirSync(d, { recursive: true });
  }

  return {
    rootDir: ROOT,
    rawDir,
    turnaround: {
      title: "Authentic Roblox R6/Blocky 3-View Turnaround Sheet · 角色三视图设定卡 (@Momo)",
      subtitle:
        "Canonical 2x2x1 Torso + Flush 1x2x1 Solid Block Limbs + 1:1 Barrel Head + 3D UGC Hair & Headphones + Roblox Studs Baseplate",
      outPaths: [
        path.join(showcaseDir, "momo_turnaround_sheet.png"),
        path.join(alarmDir, "momo_turnaround_sheet.png")
      ],
      views: [
        {
          file: "turn_front.png",
          label: "01 · FRONT VIEW (0° 正面视图)",
          note: "2x2x1宽扁躯干 + 并拢齐平1x2x1方柱双腿 + 3D刘海短发与耳机"
        },
        {
          file: "turn_3q.png",
          label: "02 · 3/4 VIEW (45° 斜侧视图)",
          note: "1x2x1实心平头方块手(无手指/无乐高C爪) + 琥珀咖啡杯 + Studs底板"
        },
        {
          file: "turn_side.png",
          label: "03 · SIDE PROFILE (90° 正侧视图)",
          note: "1:1经典上下圆角桶状圆柱头 + 侧脸零3D鼻子凸起 + 方盒背包"
        }
      ],
      swatches: [
        { label: "Cool yellow #FDEA8D", r: 253, g: 234, b: 141 },
        { label: "Mint #86EFAC Torso", r: 110, g: 231, b: 183 },
        { label: "Dark grey #475569 Legs", r: 71, g: 85, b: 105 },
        { label: "Bright red #F43F5E Tie", r: 244, g: 63, b: 94 },
        { label: "Cyan #38BDF8 Backpack", r: 56, g: 189, b: 248 }
      ]
    },
    drift: {
      title: "Anti-Drift Geometry Gates · 普通提示词三大翻车重灾区 vs. 纯正 Roblox 几何锁定",
      subtitle: "Diagnosed & repaired automatically via: node scripts/drift_check.mjs --engine kling --mode i2v",
      outPath: path.join(showcaseDir, "drift_rescue_comparison.png"),
      panels: [
        {
          file: "drift_1_fingers.png",
          status: "FAIL · 人类化变异",
          title: "长出真人五指与3D高鼻梁",
          desc: "未锁 solid 1x2x1 block hands 与 flat 2D decal face",
          r: 244,
          g: 63,
          b: 94
        },
        {
          file: "drift_2_lego.png",
          status: "FAIL · 乐高串味",
          title: "头顶圆颗粒 + 乐高C型钩爪",
          desc: "误用 C-shaped claws 变成乐高小人而非 Roblox 实心方手",
          r: 245,
          g: 158,
          b: 11
        },
        {
          file: "drift_3_voxel.png",
          status: "FAIL · MC像素串味",
          title: "锋利直角立方头与像素块",
          desc: "未锁 1:1 barrel-cylinder head 与 SmoothPlastic",
          r: 168,
          g: 85,
          b: 247
        },
        {
          file: "drift_4_locked.png",
          status: "PASS · 纯正 Roblox",
          title: "2x2x1躯干 + 齐平1x2x1实心四肢",
          desc: "1:1桶状圆角头 + 3D UGC发型耳机 + 实心平头方块手",
          r: 16,
          g: 185,
          b: 129
        }
      ]
    },
    cases: [
      {
        prefix: "alarm",
        title: "Case 01 · 周一早八闹钟破防记 (Monday 8 AM Alarm Meltdown · Kling 9:16 I2V)",
        subtitle:
          "Compiled via: node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky",
        sheetPath: path.join(alarmDir, "storyboard_contact_sheet.png"),
        gifPath: path.join(alarmDir, "monday_alarm_meltdown.gif"),
        mp4Path: path.join(alarmDir, "monday_alarm_meltdown.mp4"),
        shots: [
          {
            badge: "SHOT 01 · 0.0s-3.8s",
            role: "Hook · 黄金前3秒",
            camera: "[Kling I2V] Extreme Close-Up Push-In",
            action: "1:1桶状圆柱脑袋从剧烈震动的红色方块闹钟后猛地探出，头顶弹出Roblox聊天气泡",
            caption: "早八人的痛，谁懂？",
            chatBubble: "7:59 AM?!",
            displayName: "@Momo",
            bubbleX: 185,
            bubbleY: 56,
            savePath: path.join(alarmDir, "shot_01_hook.png")
          },
          {
            badge: "SHOT 02 · 3.8s-7.5s",
            role: "Escalation 1 · 动作推进",
            camera: "[Kling I2V] 50mm f/2.8 Side Macro",
            action: "右侧1x2x1实心平头方柱手臂沿肩部Motor6D转轴挥落，一巴掌拍扁红色闹钟",
            caption: "再睡五分钟…就五分钟",
            chatBubble: "5 more mins...",
            displayName: "@Momo",
            bubbleX: 180,
            bubbleY: 58,
            savePath: path.join(alarmDir, "shot_02_slam.png")
          },
          {
            badge: "SHOT 03 · 7.5s-11.3s",
            role: "Escalation 2 · 情绪升级",
            camera: "[Kling I2V] OTS Arc to Front Close-Up",
            action: "僵硬坐在发光微缩电脑前，双颊浮现蓝色2D瀑布流泪贴图条",
            caption: "打开电脑：99+ 未读消息",
            chatBubble: "99+ pings?!",
            displayName: "@Momo",
            bubbleX: 165,
            bubbleY: 48,
            savePath: path.join(alarmDir, "shot_03_tears.png")
          },
          {
            badge: "SHOT 04 · 11.3s-15.0s",
            role: "Payoff & Loop · 反转收尾",
            camera: "[Kling I2V] 45° Isometric Lock-Off",
            action: "2x2x1长方体躯干沿腰部转轴前倾90度，脑袋啪地平拍在键盘上触发Oof!",
            caption: "已老实，申请重启人生",
            chatBubble: "oof.",
            displayName: "@Momo [HP 1/100]",
            bubbleX: 145,
            bubbleY: 118,
            savePath: path.join(alarmDir, "shot_04_faceplant.png")
          }
        ]
      },
      {
        prefix: "obby",
        title: "Case 02 · 多巴胺天空跑酷闯关剧场 (Pastel Sky Obby Speedrun · Hailuo Director 9:16)",
        subtitle:
          "Compiled via: node scripts/shot_compiler.mjs --template obby-storytime --duration 15 --engine hailuo --rig r6",
        sheetPath: path.join(obbyDir, "obby_storyboard_sheet.png"),
        gifPath: path.join(obbyDir, "obby_sky_run.gif"),
        mp4Path: path.join(obbyDir, "obby_sky_run.mp4"),
        shots: [
          {
            badge: "SHOT 01 · 0.0s-3.8s",
            role: "Hook · 高空起跳",
            camera: "[Push in, Tilt up] 3rd-Person Follow",
            action: "戴红遮阳帽与右臂红色加速弹簧(Speed Coil)的R6小人跃过马卡龙粉Studs跳台",
            caption: "千万别往脚下看！",
            chatBubble: "Speed Coil ON!",
            displayName: "@SkyHop",
            bubbleX: 155,
            bubbleY: 58
          },
          {
            badge: "SHOT 02 · 3.8s-7.5s",
            role: "Escalation 1 · 连续闯关",
            camera: "[Pan right] Side Tracking Shot",
            action: "保持膝盖笔直的R6并拢1x2x1方腿姿态，在薄荷绿浮空跳台上连续干脆跳步",
            caption: "这波操作打几分？",
            chatBubble: "ez jumps",
            displayName: "@SkyHop",
            bubbleX: 160,
            bubbleY: 62
          },
          {
            badge: "SHOT 03 · 7.5s-11.3s",
            role: "Escalation 2 · 岩浆块急停",
            camera: "[Tilt down] High-Angle Abyss View",
            action: "前方出现发光红色Neon死亡激光条(Killbrick)，小人急停挥动实心方臂维持平衡",
            caption: "差点踩中红色激光块",
            chatBubble: "WAIT KILLBRICK!",
            displayName: "@SkyHop",
            bubbleX: 162,
            bubbleY: 64
          },
          {
            badge: "SHOT 04 · 11.3s-15.0s",
            role: "Payoff & Loop · 存档通关",
            camera: "[Push in] Seamless Loop Return",
            action: "稳稳降落蓝色存档点(Checkpoint)平台，姿态与首镜完全重合实现无缝循环",
            caption: "丝滑通关，再来亿遍",
            chatBubble: "Stage Cleared!",
            displayName: "@SkyHop",
            bubbleX: 162,
            bubbleY: 60
          }
        ]
      },
      {
        prefix: "duo",
        title: "Case 03 · 精修潮人 vs 呆萌黄皮新手 (Y2K UGC vs Classic Noob · Seedance/即梦 9:16)",
        subtitle:
          "Compiled via: node scripts/shot_compiler.mjs --template duo-comedy --duration 15 --engine seedance --rig r15",
        sheetPath: path.join(duoDir, "duo_storyboard_sheet.png"),
        gifPath: path.join(duoDir, "duo_bestie_contrast.gif"),
        mp4Path: path.join(duoDir, "duo_bestie_contrast.mp4"),
        shots: [
          {
            badge: "SHOT 01 · 0.0s-3.8s",
            role: "Hook · 双人同框反差",
            camera: "[Seedance I2V] Fast Snap-Zoom 2-Shot",
            action: "左侧Y2K粉发潮人端咖啡摆造型，右侧经典黄头蓝衣绿腿R6新手如木板般笔直僵立",
            caption: "出门逛街：精修闺蜜 vs 我",
            chatBubble: "slay!!",
            displayName: "@Nova_Y2K & @Noob_06",
            bubbleX: 92,
            bubbleY: 52
          },
          {
            badge: "SHOT 02 · 3.8s-7.5s",
            role: "Escalation 1 · 转身误伤",
            camera: "[Seedance I2V] Low-Angle Tracking",
            action: "左侧潮人原地华丽转身180度，背后紫色方盒背包不小心撞到右侧黄皮新手",
            caption: "试图配合演出的我",
            chatBubble: "watch out!",
            displayName: "@Nova_Y2K & @Noob_06",
            bubbleX: 98,
            bubbleY: 62
          },
          {
            badge: "SHOT 03 · 7.5s-11.3s",
            role: "Escalation 2 · 刚体倒地",
            camera: "[Seedance I2V] Static Tripod + Shake",
            action: "右侧经典R6新手不弯膝盖不弯手肘，全身呈刚体直挺挺向侧方倾倒，头顶冒出oof",
            caption: "物理引擎：直接罢工",
            chatBubble: "oof",
            displayName: "@Noob_06",
            bubbleX: 215,
            bubbleY: 78
          },
          {
            badge: "SHOT 04 · 11.3s-15.0s",
            role: "Payoff & Loop · 同步盯镜头",
            camera: "[Seedance I2V] Slow Dolly Pull-Out",
            action: "两个小人身体静止，仅1:1圆角桶状脑袋同步转正切换为沉默死鱼眼(-_-)贴图",
            caption: "确认过眼神，是亲闺蜜",
            chatBubble: "bruh...",
            displayName: "@Nova_Y2K & @Noob_06",
            bubbleX: 160,
            bubbleY: 64
          }
        ]
      }
    ]
  };
}

const isMain = process.argv[1] && process.argv[1].endsWith("render_preview.mjs");
if (isMain) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(`Usage: node scripts/render_preview.mjs [--raw-dir <dir>] [--force]

Render procedural 3D SDF Roblox-style character turnaround sheets, anti-drift comparison cards,
9:16 storyboard contact sheets, and animated GIF/MP4 previews.`);
    process.exit(0);
  }
  const rawIdx = process.argv.indexOf("--raw-dir");
  const rawDir =
    rawIdx !== -1 && process.argv[rawIdx + 1]
      ? path.resolve(process.argv[rawIdx + 1])
      : path.join(ROOT, "tmp", "raw_3d");
  const force = process.argv.includes("--force");

  renderRawPanelSet(rawDir, force);
  console.log(`Rendered raw 3D panel set into ${rawDir}`);

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
