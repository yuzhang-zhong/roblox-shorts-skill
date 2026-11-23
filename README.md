<div align="center">

<img src="assets/icon.svg" width="104" height="104" alt="" />

# Roblox Style Video

Plan a 9:16 short: lock your avatar's proportions, write prompts for each shot, and preview the cut locally.

[![Node.js 18+ for the CLI](https://img.shields.io/badge/Node.js-18%2B-268354?style=flat-square)](#quick-start)
[![MIT license](https://img.shields.io/badge/License-MIT-2563eb?style=flat-square)](LICENSE)

**[Watch examples](#video-examples)** · [Quick start](#quick-start) · [Skill guide](SKILL.md)

**English** · [简体中文](README.zh-CN.md) · [More languages](#languages)

</div>

[![Four storyboard frames: a Y2K streetwear avatar poses beside a Classic Noob, bumps them, and both end with a deadpan stare](examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png)](examples/duo-bestie-contrast/)

<a name="examples-and-local-3d-previews"></a>

## Video examples

Each storyboard plans a 15-second, four-shot short. The **4-second MP4s** and GIFs are local 3D previews for checking framing, avatar proportions, and `BillboardGui` chat bubbles. The model names indicate the prompt format. To generate finished clips, run those prompts in a separate video model.

<p align="center">
  <a href="examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4"><img src="examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="90" alt="Play Monday Alarm: Momo slaps the alarm clock" /></a>
  <a href="examples/obby-sky-run/assets/obby_sky_run.mp4"><img src="examples/obby-sky-run/assets/obby_sky_run.gif" width="90" alt="Play Sky Obby: a runner jumps between floating platforms" /></a>
  <a href="examples/runway-outfit-drop/assets/runway_outfit_drop.mp4"><img src="examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="90" alt="Play Runway Drop: an avatar changes outfits on the beat" /></a>
</p>
<p align="center">Select a clip to open its MP4.</p>

| Short and prompt format | What to watch for |
| --- | --- |
| [Monday Alarm](examples/monday-alarm-meltdown/) · Kling<br>[MP4](examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [Storyboard](examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.en.png) | Momo slaps an alarm clock. The last shot returns to the opening desk framing. |
| [Sky Obby](examples/obby-sky-run/) · Hailuo<br>[MP4](examples/obby-sky-run/assets/obby_sky_run.mp4) · [Storyboard](examples/obby-sky-run/assets/obby_storyboard_sheet.en.png) | A runner crosses floating platforms. Compare the camera angles at the jump and checkpoint landing. |
| [Y2K vs. Noob](examples/duo-bestie-contrast/) · Seedance<br>[MP4](examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [Storyboard](examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png) | A streetwear avatar's spin knocks their rigid R6 friend off balance. |
| [Cozy Cafe](examples/cozy-cafe-tycoon/) · Wan<br>[MP4](examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [Storyboard](examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.en.png) | A miniature bakery goes from a croissant close-up to a latte sliding across the counter. |
| [Runway Drop](examples/runway-outfit-drop/) · Sora<br>[MP4](examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [Storyboard](examples/runway-outfit-drop/assets/runway_storyboard_sheet.en.png) | An outfit changes from plain gray to neon pink on the landing beat. |
| [Burnt Pizza](examples/burnt-pizza-slapstick/) · Runway<br>[MP4](examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [Storyboard](examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.en.png) | A burnt pizza reveal ends with a stiff sideways fall. |

## Quick start

### Use the Agent Skill

Clone into your agent host's skills directory. This path is for Codex; for GitHub Copilot, use `~/.copilot/skills/roblox-style-video`. Use the configured skills directory for Claude Code or Cursor.

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-video.git ~/.codex/skills/roblox-style-video
```

Ask your agent to use `roblox-style-video`. In Codex, for example:

```text
Use $roblox-style-video to plan a 15-second 9:16 short about two friends shopping:
a Y2K streetwear avatar and a yellow Classic Noob. Give me the character cards,
3-view turnaround prompts, and a 4-shot Kling I2V storyboard.
```

### Use the CLI

From a regular checkout, run these from the repository root. The three commands use Node.js 18+ and need neither `npm install` nor API keys.

```bash
node scripts/avatar_spec.mjs --archetype corporate-worker --rig chibi-blocky --material smooth-plastic --name "Momo" --lang en
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang en
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang en
```

The commands produce a character card and turnaround prompt, a four-shot storyboard, and a corrected prompt for the intentionally flawed hand description.

## CLI scripts, limits, and references

For R6, lock the `2x2x1` torso, flush `1x2x1` legs, solid block hands, and `1:1` barrel head with a flat face decal. Use studded baseplates for the scene, not studs on the avatar's head. Start multi-shot image-to-video (I2V) with a [three-view turnaround](assets/showcase/momo_turnaround_sheet.en.png) and give each 4–5 second clip one main action. The [drift comparison](assets/showcase/drift_rescue_comparison.en.png) shows what goes wrong with human fingers, C-shaped claws, and voxel heads.

| Script | Output |
| --- | --- |
| [`avatar_spec.mjs`](scripts/avatar_spec.mjs) | Character card with a `BrickColor` palette, stud proportions, and a three-view prompt. |
| [`shot_compiler.mjs`](scripts/shot_compiler.mjs) | A 9:16 beat sheet and image-to-video (I2V) or text-to-video (T2V) prompts for Kling, Seedance, Hailuo, Wan, Sora, and Runway. |
| [`drift_check.mjs`](scripts/drift_check.mjs) | A report and prompt patch for geometry drift or too many actions in a shot. |
| [`render_preview.mjs`](scripts/render_preview.mjs) | Local turnarounds, comparison boards, contact sheets, GIFs, and MP4s. Windows composition uses PowerShell `System.Drawing` and `ffmpeg`. |

[Avatar geometry and materials](references/avatar-geometry-and-materials.md) · [Model prompt playbook](references/model-prompt-playbook.md) · [Drift fixes](references/rescue-and-anti-drift.md) · [Pacing and audio](references/short-video-beats-and-audio.md) · [Story templates](references/viral-archetypes-catalog.md)

## Languages

Agent replies and CLI `--lang` output support `en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, and `ru`.

**English** · [简体中文](README.zh-CN.md) · [繁體中文](docs/i18n/README.zh-TW.md) · [日本語](docs/i18n/README.ja.md) · [한국어](docs/i18n/README.ko.md) · [Español](docs/i18n/README.es.md) · [Français](docs/i18n/README.fr.md) · [Deutsch](docs/i18n/README.de.md) · [Português](docs/i18n/README.pt-BR.md) · [Русский](docs/i18n/README.ru.md)

[MIT License](LICENSE). An independent project, not affiliated with or endorsed by Roblox Corporation.
