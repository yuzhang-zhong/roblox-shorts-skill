<div align="center">

<img src="assets/icon.svg" alt="Roblox Shorts Skill icon" width="144" />

# 方块片场 · Roblox Shorts Skill

<a id="english"></a>
**Lock fingerless C-shaped hands, cylindrical heads, and blind-box vinyl shaders before generating multi-shot Roblox-style AI videos.**

A bilingual Agent Skill and CLI toolkit for Roblox-style blocky avatar AI short videos.

**English** · [简体中文](README.md)

[![Agent Skill](https://img.shields.io/badge/Agent-Codex_%2F_Claude_%2F_Cursor_Skill-e11d48)](SKILL.md)
[![Node CLI](https://img.shields.io/badge/3_CLI_Tools-Node.js_Stdlib-0f766e)](#three-standalone-cli-tools)
[![License](https://img.shields.io/badge/License-MIT-2563eb)](LICENSE)

[Quick start](#start-in-three-steps) · [Sample output](#a-storyboard-and-prompt-compilation-example) · [Six modes](#six-modes-one-studio) · [Standalone tools](#three-standalone-cli-tools) · [Worked example](#checked-in-example-package) · [Boundaries](#scope-and-boundaries)

</div>

Prompting a video model with "a cute Roblox character drinking coffee" usually fails in four predictable ways: the character grows five human fingers, develops a 3D human nose, sprouts Lego studs on its head, or changes outfits between shots. **Roblox Shorts Skill** combines [`SKILL.md`](SKILL.md), five domain reference guides, and three zero-dependency Node.js CLI tools to turn a one-line video idea into a geometry-locked 3-view character sheet, a 9:16 retention beat sheet, and model-tuned Image-to-Video (I2V) prompts for Kling, Seedance/Jimeng, Hailuo MiniMax, Wan, Sora, and Runway.

![Roblox Shorts Skill 5-step pipeline: Avatar DNA lock, 3-view turnaround sheet, 9:16 beat sheet, model prompt compiler, and drift check](docs/pipeline.svg)

<a id="a-storyboard-and-prompt-compilation-example"></a>
## A storyboard and prompt compilation example

**Inputs: 15-second vertical short (`9:16`), Monday alarm meltdown template (`daily-meltdown`), glossy blind-box chibi rig (`chibi-blocky`), target engine `kling`.** The table below comes directly from running the repository script:

| Shot | Time | Beat Role | Single Rigid Action (1 Primary Verb per Clip) | Camera Move | Audio & Caption Cue |
| :---: | :---: | --- | --- | --- | --- |
| 01 | `0.0s–3.8s` | Hook (0–3s) | Pops its cylindrical blocky head up from behind a vibrating miniature red blocky alarm clock | Extreme close-up, rapid dolly push-in with subtle impact shake | Alarm buzz · `"Monday 8 AM pain"` |
| 02 | `3.8s–7.5s` | Escalation 1 | Pivots its rigid right rectangular arm downward at the shoulder hinge to slam the clock flat | Medium side-angle macro shot, 50mm f/2.8 shallow depth of field | Crisp ABS plastic clack · `"Five more minutes..."` |
| 03 | `7.5s–11.3s` | Escalation 2 | Sits stiffly before a glowing miniature laptop as blue 2D waterfall tear strips appear on cheeks | Over-the-shoulder dolly arc to front medium close-up | Notification ping · `"99+ unread messages"` |
| 04 | `11.3s–15.0s` | Payoff & Loop | Tilts its rigid rectangular torso forward 90 degrees at the waist hinge and face-plants onto the keyboard | High-angle isometric lock-off matching Shot 1 desk geometry | Classic Oof! + plastic clatter · `"Requesting reboot"` |

```bash
node scripts/shot_compiler.mjs \
  --template daily-meltdown --duration 15 --engine kling \
  --rig chibi-blocky --lang en
```

The script outputs First-Frame keyframe image prompts, engine-specific I2V motion prompts, and a shared anti-drift negative prompt block. It compiles deterministically from geometry and pacing templates without calling external paid APIs.

<a id="start-in-three-steps"></a>
## Start in three steps

### 1. Install in your Agent or clone locally

Clone the repository into your local Skills directory (compatible with Codex, Claude Code, Cursor, and GitHub Copilot):

```bash
git clone https://github.com/yuzhang-zhong/roblox-shorts-skill.git ~/.codex/skills/roblox-shorts-skill
```

If that directory already exists, update it with `git pull` instead of cloning over it. To run the three CLI tools standalone:

```bash
git clone https://github.com/yuzhang-zhong/roblox-shorts-skill.git
cd roblox-shorts-skill
node scripts/shot_compiler.mjs --help
```

Requires Node.js 18+. All three scripts use only the Node.js standard library and require no `npm install` or API keys.

### 2. Start with a concrete short-video premise

```text
Use $roblox-shorts-skill. I want a 15-second vertical 9:16 Roblox-style short about
two best friends shopping: a hyper-styled Y2K streetwear avatar vs. a deadpan yellow
Classic Noob. Generate the Character DNA cards, 3-view turnaround prompts, and a 4-shot
Kling I2V storyboard.
```

### 3. Rescue a broken video clip when style drift happens

```text
My Kling clip of a Roblox character holding an iced coffee grew five human fingers and a
realistic 3D nose. Diagnose what went wrong in my prompt and rewrite the first-frame prompt,
motion prompt, and negative prompt.
```

<a id="six-modes-one-studio"></a>
## Six modes, one studio

| Mode | When to use | Output delivered |
| --- | --- | --- |
| **Avatar · 捏人设定** | Locking character look before animating | Character DNA card, hex palette, UGC accessory lock, and 3-view turnaround image prompt |
| **Storyboard · 黄金分镜** | Turning a raw idea or script into shots | 9:16 beat sheet (`0–3s` hook, single-action escalation clips, payoff or seamless loop) |
| **Prompt-Compile · 提示词编译** | Formatting prompts for a specific video generator | First-frame prompts, I2V motion prompts, camera tags, and negative prompts for 6 engines |
| **Rescue · 翻车救场** | Fixing human fingers, Lego studs, foot skating, or face morphing | 5-gate `PASS / WARN / FAIL` diagnosis plus a geometry-locked prompt rewrite |
| **Remix · 爆款拆解与二创** | Adapting proven Douyin / Xiaohongshu / TikTok formats | 6 ready-to-shoot templates (`daily-meltdown`, `duo-comedy`, `obby-storytime`, `mini-tycoon`, `outfit-drop`, `meme-slapstick`) |
| **Package · 交付归档** | Saving a reusable episode bundle | Folder with `character_card.md`, `storyboard.md`, and `prompts.json` |

<a id="three-standalone-cli-tools"></a>
## Three standalone CLI tools

| Tool | What it does | What it does not do |
| --- | --- | --- |
| [`avatar_spec.mjs`](scripts/avatar_spec.mjs) | Generates Character DNA cards and 3-view turnaround sheet prompts by archetype, rig, and shader | Does not render images directly or export `.rbxm` / `.blend` meshes |
| [`shot_compiler.mjs`](scripts/shot_compiler.mjs) | Compiles 9:16 beat sheets and engine-tuned I2V/T2V prompts across 6 templates and 6 video engines | Does not call cloud video APIs or spend generation credits |
| [`drift_check.mjs`](scripts/drift_check.mjs) | Lints draft prompts for humanization, Lego/Minecraft drift, and multi-verb overload; outputs a rescued prompt | Does not inspect rendered MP4 files frame-by-frame |

<details>
<summary>Expand to view Character DNA and Drift Linter CLI examples</summary>

Generate a glossy blind-box chibi character card and 3-view turnaround prompt:

```bash
node scripts/avatar_spec.mjs \
  --archetype chibi-plush --rig chibi-blocky --material glossy-vinyl \
  --name "Momo" --lang en
```

Run the drift linter on an overloaded draft prompt that risks human fingers and limb clipping:

```bash
node scripts/drift_check.mjs \
  --prompt "A cute Roblox girl walks into the room then sits down and drinks coffee with five fingers" \
  --engine kling --mode t2v --lang en
```

Validate package structure and run the automated test suite:

```bash
node scripts/validate_skill.mjs
node --test tests/run_tests.mjs
```

</details>

<a id="checked-in-example-package"></a>
## Checked-in example package

[`examples/monday-alarm-meltdown/`](examples/monday-alarm-meltdown/) contains a complete 15-second vertical short package generated by the repository scripts:

- [Character DNA and 3-View Turnaround Card (`character_card.md`)](examples/monday-alarm-meltdown/character_card.md)
- [4-Shot 15s Beat Sheet and Kling I2V Prompts (`storyboard.md`)](examples/monday-alarm-meltdown/storyboard.md)
- [Machine-Readable Prompt Bundle (`prompts.json`)](examples/monday-alarm-meltdown/prompts.json)

<a id="scope-and-boundaries"></a>
## Scope and boundaries

- **First-Frame I2V over raw T2V.** Keeping the same outfit, hat, and 2D face decal across multiple shots requires generating a 3-view turnaround sheet and per-shot static keyframes before running video diffusion.
- **One primary action per 4 to 5 second clip.** Video diffusion models break rigid blocky joints when given three or more sequential verbs in one prompt. Split multi-step actions across separate shots.
- **Independent open-source skill.** "Roblox-style" refers to a blocky 3D character aesthetic (`R6`/`R15`/chibi blocky rigs) for prompt engineering. This project is not affiliated with or endorsed by Roblox Corporation.

## Reference guides

- [Core Skill Workflow (`SKILL.md`)](SKILL.md)
- [Avatar Geometry, Face Decals, and Surface Shaders (`references/avatar-geometry-and-materials.md`)](references/avatar-geometry-and-materials.md)
- [Multi-Model I2V/T2V Prompt Playbook (`references/model-prompt-playbook.md`)](references/model-prompt-playbook.md)
- [Rescue Guide for 8 Common Generation Failures (`references/rescue-and-anti-drift.md`)](references/rescue-and-anti-drift.md)
- [9:16 Pacing, Macro Toy Lighting, and Audio Cues (`references/short-video-beats-and-audio.md`)](references/short-video-beats-and-audio.md)
- [Six Viral Short-Video Archetypes (`references/viral-archetypes-catalog.md`)](references/viral-archetypes-catalog.md)
