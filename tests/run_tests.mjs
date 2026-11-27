import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildAvatarSpec, buildCastSpec, formatAvatarSpecMarkdown, normalizeLang } from "../scripts/avatar_spec.mjs";
import { compileStoryboard, formatStoryboardMarkdown } from "../scripts/shot_compiler.mjs";
import { inspectPrompt, inspectPackageFile, formatDriftCheckMarkdown } from "../scripts/drift_check.mjs";
import { computeEpisodeTimingPlan, buildEpisodeWavBuffer } from "../scripts/render_preview.mjs";
import { auditLocalDiscovery } from "../scripts/discovery_audit.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

test("avatar_spec locks canonical 2x2x1/1x2x1 stud geometry, solid block hands, and 2D decal face", () => {
  const spec = buildAvatarSpec({
    archetype: "chibi-plush",
    rig: "chibi-blocky",
    material: "glossy-vinyl",
    name: "Momo"
  });
  assert.equal(spec.name, "Momo");
  assert.equal(spec.rig, "chibi-blocky");
  assert.equal(spec.material, "glossy-vinyl");
  assert.match(spec.turnaroundPromptEn, /2x2x1 rectangular torso/);
  assert.match(spec.turnaroundPromptEn, /fingerless and clawless solid beveled rectangular block hands/);
  assert.match(spec.turnaroundPromptEn, /flat 2D screen-printed Roblox decal face/);
  assert.match(spec.negativePromptEn, /Lego C-shaped claw hands/);
  assert.match(spec.negativePromptEn, /Minecraft sharp voxel/);
});

test("shot_compiler generates 4 shots for 15s and 8 shots for 30s with engine tags", () => {
  const klingPlan = compileStoryboard({
    template: "daily-meltdown",
    duration: 15,
    engine: "kling",
    rig: "chibi-blocky"
  });
  assert.equal(klingPlan.shotCount, 4);
  assert.equal(klingPlan.shots[0].timeWindow, "0.0s–3.8s");
  assert.match(klingPlan.shots[0].i2vPromptZh, /可灵I2V/);

  const hailuoPlan = compileStoryboard({
    template: "obby-storytime",
    duration: 30,
    engine: "hailuo",
    rig: "r6"
  });
  assert.equal(hailuoPlan.shotCount, 8);
  assert.equal(new Set(hailuoPlan.shots.map((s) => s.actionEn)).size, 8);
  assert.equal(hailuoPlan.shots[0].exactTimeWindow, "0.00s–3.75s");
  assert.match(hailuoPlan.shots[0].i2vPromptEn, /^\[Push in, Tilt up\]/);

  const customPlan = compileStoryboard({
    spec: path.join(ROOT, "templates", "custom_story_spec.json"),
    engine: "local3d"
  });
  assert.equal(customPlan.shotCount, 4);
  assert.equal(customPlan.cast.length, 2);
  assert.match(customPlan.shots[3].actionEn, /plastic keychain/);
});

test("drift_check catches Chinese finger/overload bugs, R15 contradictions, trademarks, and organic pets without false positives", () => {
  // 1. Chinese five-finger + overload must FAIL (fixes JS ASCII \b bug)
  const zhBad = inspectPrompt({
    prompt: "早高峰地铁里，用五根手指紧紧抓住水壶的通勤小人跑向座位，然后跳起，接着坐下，再挥手。",
    engine: "kling",
    mode: "i2v"
  });
  assert.equal(zhBad.overallStatus, "FAIL");
  assert.equal(zhBad.checks[0].status, "FAIL");
  assert.equal(zhBad.checks[3].status, "FAIL");

  // 2. Contradictory R15 soft-body noodle arm must FAIL
  const r15Bad = inspectPrompt({
    prompt:
      "Roblox R15 avatar with 1:1 barrel head, flat 2D decal face, fingerless solid 1x2x1 block hands, smooth studless SmoothPlastic floor softly bends and twists its noodle-like arm.",
    engine: "hailuo",
    mode: "i2v"
  });
  assert.equal(r15Bad.overallStatus, "FAIL");

  // 3. Official trademark leak or organic scaly dragon must FAIL
  const tmPetBad = inspectPrompt({
    prompt:
      "SmoothPlastic R6 avatar with 1:1 cylindrical head, flat 2D decal face, rigid Motor6D hinges, fingerless solid 1x2x1 block hands stands beside a realistic scaly dragon with sharp claws under an official Roblox tilted-square R logo.",
    engine: "seedance",
    mode: "i2v"
  });
  assert.equal(tmPetBad.overallStatus, "FAIL");
  assert.equal(tmPetBad.checks.find((c) => c.gate.startsWith("Trademark")).status, "FAIL");
  assert.equal(tmPetBad.checks.find((c) => c.gate.startsWith("Pet & Prop")).status, "FAIL");

  // 4. "medium close-up", "pull-back", "cat-ear headphones", "open jacket", "open gasp mouth", "sweat drop", "right next to", and "zero fingers" must NOT false-positive
  const cleanCloseUp = inspectPrompt({
    prompt:
      "Medium-close pull-back right next to the counter: an authentic Roblox R15 figure in an open jacket and cat-ear headphones with a smooth studless cylindrical head, flat 2D screen-printed face decal with open gasp mouth and sweat drop, 2x2x1 SmoothPlastic torso, and solid 1x2x1 block hands (zero fingers, clawless) pivots its rigid mechanical elbow hinge to wave.",
    engine: "local3d",
    mode: "local3d"
  });
  assert.equal(cleanCloseUp.overallStatus, "PASS");

  // 5. Companion pet + multi-character cast spec + theme3d->archetype sync
  const petAvatar = buildAvatarSpec({ archetype: "chibi-plush", companion: "neon-dragon", noAccessories: true });
  assert.equal(petAvatar.companion.id, "neon-dragon");
  assert.match(petAvatar.locks.accessoriesEn, /^none/);
  const castSheet = buildCastSpec("classic-noob:Noob:r6,zombie-r6:Zombie:r6");
  assert.equal(castSheet.castCount, 2);

  const zombieSpecPlan = compileStoryboard({
    specObject: {
      titleEn: "Zombie Cart Test",
      durationSeconds: 15,
      constraints: { noCheckpoints: true },
      cast: [
        { id: "builder", theme3d: "builderman", name: "Builder" },
        { id: "zed", theme3d: "zombie", name: "Zed" }
      ],
      shots: [{ durationSec: 3.5, actionEn: "pushes the cart forward", faceEn: "open gasp mouth decal", cameraEn: "Medium-close tracking" }]
    },
    engine: "local3d"
  });
  assert.equal(zombieSpecPlan.cast[0].archetype, "builderman");
  assert.equal(zombieSpecPlan.cast[1].archetype, "zombie-r6");

  // 6. Batch package audit on custom_story_spec.json + exact per-shot video/WAV timing plan
  const packAudit = inspectPackageFile(path.join(ROOT, "templates", "custom_story_spec.json"), { engine: "local3d" });
  assert.equal(packAudit.uniqueActionCount, 4);
  assert.equal(packAudit.overallStatus, "PASS");

  const timing15 = computeEpisodeTimingPlan({
    durationSeconds: 15,
    shots: [{ durationSec: 3.5 }, { durationSec: 4.0 }, { durationSec: 4.0 }, { durationSec: 3.5 }]
  });
  assert.equal(timing15.totalDurationSec, 15);
  assert.ok(Math.abs(timing15.totalFrames / timing15.inFps - 15) < 0.02);
  const wav15 = buildEpisodeWavBuffer([{}, {}, {}, {}], timing15.shotDurations);
  assert.equal(wav15.length, 44 + Math.floor(22050 * 15) * 2);

  const timing30 = computeEpisodeTimingPlan({
    durationSeconds: 30,
    shots: Array.from({ length: 8 }, () => ({ durationSec: 3.75 }))
  });
  assert.equal(timing30.totalDurationSec, 30);
  assert.ok(Math.abs(timing30.totalFrames / timing30.inFps - 30) < 0.05);
});

test("drift_check flags human fingers and multi-verb overload as FAIL, and passes locked prompts", () => {
  const badReport = inspectPrompt({
    prompt: "A cute Roblox girl walks into the room then sits down and drinks coffee with five fingers",
    engine: "kling",
    mode: "t2v"
  });
  assert.equal(badReport.overallStatus, "FAIL");
  const handGate = badReport.checks.find((c) => c.gate.startsWith("Hand Geometry"));
  const budgetGate = badReport.checks.find((c) => c.gate.startsWith("Single-Action"));
  assert.equal(handGate.status, "FAIL");
  assert.equal(budgetGate.status, "FAIL");

  const goodReport = inspectPrompt({
    prompt:
      "An authentic Roblox chibi-blocky figure with a smooth studless cylindrical head, flat 2D screen-printed face decal, fingerless and clawless solid 1x2x1 beveled rectangular block hands, and 2x2x1 torso pivots its rigid shoulder hinge to wave.",
    engine: "kling",
    mode: "i2v"
  });
  assert.equal(goodReport.overallStatus, "PASS");
});

test("CLI formatters support 10 languages plus zh-en backward compatibility", () => {
  const spec = buildAvatarSpec({ archetype: "chibi-plush", name: "Momo" });
  const plan = compileStoryboard({ template: "daily-meltdown", duration: 15, engine: "kling" });
  const report = inspectPrompt({ prompt: "Roblox R6 character waves", engine: "kling", mode: "i2v" });

  for (const code of ["en", "zh", "zh-tw", "ja", "ko", "es", "fr", "de", "pt", "ru", "zh-en"]) {
    assert.equal(normalizeLang(code), code);
    assert.match(formatAvatarSpecMarkdown(spec, code), new RegExp(`lang: ${code}`));
    assert.match(formatStoryboardMarkdown(plan, code), new RegExp(`lang: ${code}`));
    assert.match(formatDriftCheckMarkdown(report, code), new RegExp(`lang: ${code}`));
  }
});

test("discovery audit covers fixed multilingual query intents and install surfaces", () => {
  const report = auditLocalDiscovery(ROOT);
  assert.equal(report.expectedSkill, "roblox-style-video");
  assert.ok(report.checks.length >= 10);
  assert.equal(report.passed, true, JSON.stringify(report.checks.filter((check) => !check.passed)));
});

test("render_preview produces a valid PNG from the documented custom episode spec without ffmpeg", { timeout: 60_000 }, () => {
  const rawDir = fs.mkdtempSync(path.join(os.tmpdir(), "roblox-style-video-render-"));
  try {
    execFileSync(
      process.execPath,
      [
        path.join(ROOT, "scripts", "render_preview.mjs"),
        "--spec",
        path.join(ROOT, "templates", "custom_story_spec.json"),
        "--raw-dir",
        rawDir,
        "--shard",
        "0/1000",
        "--force"
      ],
      { cwd: ROOT, encoding: "utf8", timeout: 55_000 }
    );

    const png = fs.readFileSync(path.join(rawDir, "turn_front.png"));
    assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
    assert.ok(png.length > 1_000);
  } finally {
    fs.rmSync(rawDir, { recursive: true, force: true });
  }
});

test("validate_skill CLI verifies repository files, versions, and manifests", () => {
  const out = execFileSync(process.execPath, [path.join(ROOT, "scripts", "validate_skill.mjs")], {
    cwd: ROOT,
    encoding: "utf8"
  });
  assert.match(out, /roblox-style-video v1\.6\.2 package is valid/);
});
