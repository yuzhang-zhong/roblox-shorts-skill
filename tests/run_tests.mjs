import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildAvatarSpec, formatAvatarSpecMarkdown, normalizeLang } from "../scripts/avatar_spec.mjs";
import { compileStoryboard, formatStoryboardMarkdown } from "../scripts/shot_compiler.mjs";
import { inspectPrompt, formatDriftCheckMarkdown } from "../scripts/drift_check.mjs";

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
  assert.match(hailuoPlan.shots[0].i2vPromptEn, /^\[Push in, Tilt up\]/);
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

test("validate_skill CLI verifies repository files, versions, and manifests", () => {
  const out = execFileSync(process.execPath, [path.join(ROOT, "scripts", "validate_skill.mjs")], {
    cwd: ROOT,
    encoding: "utf8"
  });
  assert.match(out, /roblox-style-skill v1\.2\.0 package is valid/);
});
