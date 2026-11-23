#!/usr/bin/env node
/**
 * validate_skill.mjs
 * Zero-dependency package validator for roblox-style-video.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function fail(message) {
  console.error(`VALIDATION FAILED: ${message}`);
  process.exit(1);
}

function readUtf8(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) {
    fail(`Missing required file: ${relPath}`);
  }
  return fs.readFileSync(full, "utf8");
}

const requiredFiles = [
  "SKILL.md",
  "README.md",
  "README.zh-CN.md",
  "docs/i18n/README.zh-TW.md",
  "docs/i18n/README.ja.md",
  "docs/i18n/README.ko.md",
  "docs/i18n/README.es.md",
  "docs/i18n/README.fr.md",
  "docs/i18n/README.de.md",
  "docs/i18n/README.pt-BR.md",
  "docs/i18n/README.ru.md",
  "LICENSE",
  "CHANGELOG.md",
  "package.json",
  "agents/openai.yaml",
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".cursor-plugin/plugin.json",
  "assets/icon.svg",
  "docs/pipeline.svg",
  "references/avatar-geometry-and-materials.md",
  "references/model-prompt-playbook.md",
  "references/rescue-and-anti-drift.md",
  "references/short-video-beats-and-audio.md",
  "references/viral-archetypes-catalog.md",
  "templates/character_card_template.md",
  "templates/storyboard_template.md",
  "templates/shot_prompt_template.md",
  "scripts/avatar_spec.mjs",
  "scripts/shot_compiler.mjs",
  "scripts/drift_check.mjs",
  "scripts/render_preview.mjs",
  "assets/showcase/momo_turnaround_sheet.zh.png",
  "assets/showcase/momo_turnaround_sheet.en.png",
  "assets/showcase/drift_rescue_comparison.zh.png",
  "assets/showcase/drift_rescue_comparison.en.png",
  "assets/showcase/classic_avatars_lineup.zh.png",
  "assets/showcase/classic_avatars_lineup.en.png",
  "assets/showcase/classic_faces_atlas.zh.png",
  "assets/showcase/classic_faces_atlas.en.png",
  "assets/library/catalog.json",
  "references/classic-roblox-catalog.md",
  "examples/monday-alarm-meltdown/README.md",
  "examples/monday-alarm-meltdown/character_card.md",
  "examples/monday-alarm-meltdown/storyboard.md",
  "examples/monday-alarm-meltdown/prompts.json",
  "examples/monday-alarm-meltdown/drift_report.md",
  "examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.zh.png",
  "examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.en.png",
  "examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif",
  "examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4",
  "examples/obby-sky-run/README.md",
  "examples/obby-sky-run/character_card.md",
  "examples/obby-sky-run/storyboard.md",
  "examples/obby-sky-run/prompts.json",
  "examples/obby-sky-run/assets/obby_storyboard_sheet.zh.png",
  "examples/obby-sky-run/assets/obby_storyboard_sheet.en.png",
  "examples/obby-sky-run/assets/obby_sky_run.gif",
  "examples/obby-sky-run/assets/obby_sky_run.mp4",
  "examples/duo-bestie-contrast/README.md",
  "examples/duo-bestie-contrast/character_card.md",
  "examples/duo-bestie-contrast/storyboard.md",
  "examples/duo-bestie-contrast/prompts.json",
  "examples/duo-bestie-contrast/assets/duo_storyboard_sheet.zh.png",
  "examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png",
  "examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif",
  "examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4",
  "examples/cozy-cafe-tycoon/README.md",
  "examples/cozy-cafe-tycoon/character_card.md",
  "examples/cozy-cafe-tycoon/storyboard.md",
  "examples/cozy-cafe-tycoon/prompts.json",
  "examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.zh.png",
  "examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.en.png",
  "examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif",
  "examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4",
  "examples/runway-outfit-drop/README.md",
  "examples/runway-outfit-drop/character_card.md",
  "examples/runway-outfit-drop/storyboard.md",
  "examples/runway-outfit-drop/prompts.json",
  "examples/runway-outfit-drop/assets/runway_storyboard_sheet.zh.png",
  "examples/runway-outfit-drop/assets/runway_storyboard_sheet.en.png",
  "examples/runway-outfit-drop/assets/runway_outfit_drop.gif",
  "examples/runway-outfit-drop/assets/runway_outfit_drop.mp4",
  "examples/burnt-pizza-slapstick/README.md",
  "examples/burnt-pizza-slapstick/character_card.md",
  "examples/burnt-pizza-slapstick/storyboard.md",
  "examples/burnt-pizza-slapstick/prompts.json",
  "examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.zh.png",
  "examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.en.png",
  "examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif",
  "examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4"
];

for (const rel of requiredFiles) {
  readUtf8(rel);
}

const skillText = readUtf8("SKILL.md");
const fmMatch = skillText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
if (!fmMatch) {
  fail("SKILL.md must begin with YAML frontmatter");
}
const fm = fmMatch[1];
if (!/^name:\s*roblox-style-video\s*$/m.test(fm)) {
  fail("SKILL.md YAML frontmatter must declare name: roblox-style-video");
}

const verMatch = fm.match(/^\s+version:\s*["']?([0-9]+\.[0-9]+\.[0-9]+)["']?\s*$/m);
if (!verMatch) {
  fail("SKILL.md metadata.version must be a three-part semver string");
}
const skillVersion = verMatch[1];

const pkg = JSON.parse(readUtf8("package.json"));
const claudePlugin = JSON.parse(readUtf8(".claude-plugin/plugin.json"));
const cursorPlugin = JSON.parse(readUtf8(".cursor-plugin/plugin.json"));
const marketplace = JSON.parse(readUtf8(".claude-plugin/marketplace.json"));
const changelog = readUtf8("CHANGELOG.md");

const changelogMatch = changelog.match(/^## ([0-9]+\.[0-9]+\.[0-9]+)\s*$/m);
if (!changelogMatch) {
  fail("CHANGELOG.md must include a ## x.y.z version heading");
}

const versions = new Set([
  skillVersion,
  pkg.version,
  claudePlugin.version,
  cursorPlugin.version,
  changelogMatch[1]
]);
if (versions.size !== 1) {
  fail(`Version mismatch across files: ${Array.from(versions).join(", ")}`);
}

const firstSentence =
  "Generate Roblox-style R6 and blocky avatar short videos with locked stud proportions, 9:16 storyboards, and model-specific prompts.";
for (const [label, desc] of [
  ["package.json", pkg.description],
  [".claude-plugin/plugin.json", claudePlugin.description],
  [".cursor-plugin/plugin.json", cursorPlugin.description],
  [".claude-plugin/marketplace.json", marketplace.plugins?.[0]?.description]
]) {
  if (desc !== firstSentence) {
    fail(`Description mismatch in ${label}: ${desc}`);
  }
}

const skillWords = skillText.split(/\s+/).filter(Boolean).length;
if (skillWords > 5500) {
  fail(`Keep SKILL.md at 5,500 words or fewer; found ${skillWords}`);
}

console.log(`roblox-style-video v${skillVersion} package is valid (${requiredFiles.length} files checked, ${skillWords} words in SKILL.md)`);
