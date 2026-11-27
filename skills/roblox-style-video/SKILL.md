---
name: roblox-style-video
description: |
  Roblox video generation for R6/R15 blocky avatars: generate 9:16 shorts, storyboards, offline MP4/GIF animatics, I2V/T2V prompts, and anti-drift checks.
  Use when the user wants Roblox AI videos, Roblox-style avatar animation, blocky 3D character shorts, machinima, Obby skits, Douyin/Xiaohongshu/TikTok or YouTube Shorts, character turnaround sheets, or prompts for Kling (可灵), Seedance/Jimeng (即梦), Hailuo MiniMax (海螺), Wan (通义万相), Sora, or Runway. Also use for fixing inconsistent Roblox characters, human fingers, Lego C-claws/studs, Minecraft voxels, realistic faces, or rubbery limbs.
  中文触发词包括 Roblox 视频生成、方块人短视频、R6/R15 动画、竖屏剧情、角色一致性与 AI 视频防串味。
license: MIT
metadata:
  version: "1.6.3"
---

# Roblox Style Video Skill

## Core Objective / 核心目标

An Agent Skill (`SKILL.md` + references + zero-dependency Node.js 3D video engine & CLI scripts) that **directly generates complete 9:16 Roblox-style blocky avatar short videos (`.mp4` + `.gif` + 3-view turnaround `.png` + multi-shot storyboard `.png`) offline on the local machine**—with zero external platforms, no Kling/Seedance/Sora accounts, and no API keys required—while also compiling optional I2V/T2V prompt packs when requested.

Respond in the user's language (`en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, `ru`). When the user requests bilingual output or uses domestic Chinese video engines (Kling 可灵, Seedance/Jimeng 即梦, Hailuo 海螺, Wan 通义万相), provide localized explanations alongside English generation prompts and Chinese prompt equivalents.

General video diffusion models default to human anatomy, Lego minifigures, or Minecraft voxels when prompted vaguely with "Roblox character." This skill prevents style drift by locking **eight authentic Roblox visual invariants** before writing motion prompts:

1. **Canonical Stud Proportions (`2×2×1` Torso + Four Flush `1×2×1` Limbs)**:
   - Torso is a wide, flat-chested `2.0 × 2.0 × 1.0` stud chamfered rectangular block.
   - Left and Right Legs are `1.0 × 2.0 × 1.0` stud rectangular blocks sitting **flush side-by-side** directly under the torso (`1 + 1 = 2` studs wide, matching the exact torso width with zero thigh gap and no separate protruding sneakers).
   - Left and Right Arms are `1.0 × 2.0 × 1.0` stud rectangular blocks hanging **flush** against the left and right sides of the torso (`4` studs total shoulder span).
2. **Solid Blocky Hands (No Human Fingers AND No Lego C-Claws)**:
   - Standard Roblox Blocky (`R6` / `R15` / `Chibi-Plushie`) arms end in **solid chamfered `1×2×1` rectangular block tips** (`fingerless and clawless solid beveled rectangular block hands, zero human fingers, zero Lego C-shaped hook claws`). C-shaped claw hooks belong to Lego minifigures and must be blocked.
3. **Classic Roblox Barrel-Beveled Head (`SpecialMesh Head`)**:
   - A `1.2 × 1.2 × 1.2` stud (`1:1` aspect ratio) barrel cylinder with **deep curved top and bottom fillets** and a smooth studless top surface (never a tall narrow cylinder, never a Lego stud on top, never a sharp Minecraft cube).
4. **Flat 2D Roblox Face Decal**:
   - Iconic screen-printed 2D face decal (`Classic Smile :)`, `Check It`, `Chill`, `Shocked Ring Eyes`, `Waterfall Tears`, or `Blush Anime UGC Decal`) painted flat on the front of the head (`no 3D protruding human nose, no realistic eyeballs, no mouth cavity`).
5. **Authentic Roblox Studio Materials & Multi-Part Props (Zero Lego Floor Bumps)**:
   - Character limbs and torso use satin-gloss `SmoothPlastic` with crisp edge bevels. Environments use authentic smooth Roblox Studio materials (`SmoothPlastic`, `WoodPlanks`, `Concrete`, `Slate`, `Grass`, `Neon`, `Glass`) with flat architectural seams—**never** prompt `studded floor` or `raised studs`, which triggers circular LEGO bumps in diffusion models. Build props as recognizable multi-part Roblox Studio assemblies (e.g., twin-bell alarm clock with white dial and hands, Linked Sword with golden crossguard, espresso machine with portafilter, DOORS `050` brass-plaque door) rather than featureless single-box primitives.
6. **Roblox UI & Gear Signatures (`BillboardGui`, `Speed Coil`, `Bloxy Cola`, `Highlight`)**:
   - Use recognizable Roblox visual shorthands: overhead white rounded-rectangle `BillboardGui` chat bubbles, `@DisplayName` overhead tags, 3D UGC hair (`Bacon Hair`, fluffy anime bob/twin-tails), glowing red `Speed Coil` around the arm block, or a red `Highlight` damage outline flash on slapstick impacts.
7. **Motor6D Joint Physics & Single-Action Clip Budget**:
   - Strict mechanical hinge rotation at shoulders, hips, and neck for `R6` (or clean segmented bends for `R15`), with at most **one primary body action and one camera move** per 4 to 5 second generation clip.
8. **First-Frame I2V Anchor**:
   - Generate or render a static character turnaround sheet and shot keyframes before running video diffusion whenever multi-shot clothing or face consistency is required.

## Six Production Modes / 六种工作模式

Select the mode that matches the user's current stage, or chain them end-to-end for a full episode:

1. **Avatar · 捏人设定**: build an authentic Roblox Character DNA card (`BrickColor` codes, `2×2×1` / `1×2×1` stud lock, 3D UGC hair/gear) and a 3-view turnaround image prompt (`scripts/avatar_spec.mjs`).
2. **Storyboard · 黄金分镜**: break a 15s, 30s, or 45s vertical 9:16 idea into a 0 to 3s hook, escalation shots, overhead Roblox chat bubble lines, and a payoff or seamless loop (`references/short-video-beats-and-audio.md`).
3. **Prompt-Compile · 提示词编译**: compile each shot into positive prompts, negative anti-drift tokens, and camera commands for Kling, Seedance/Jimeng, Hailuo, Wan, Sora, or Runway (`scripts/shot_compiler.mjs`).
4. **Rescue · 翻车救场**: lint a failing prompt or diagnose rendered video defects such as human fingers, Lego C-claws/studs, separated non-Roblox legs, face morphing, foot sliding, or outfit drift (`scripts/drift_check.mjs` and `references/rescue-and-anti-drift.md`).
5. **Remix · 爆款拆解与二创**: adapt one of six viral short-video formats from Douyin, Xiaohongshu, and TikTok (`references/viral-archetypes-catalog.md`).
6. **Render & Package · 3D预览渲染与归档**: render 3D Roblox turnaround sheets, 9:16 storyboard contact sheets, and animated `.gif` / `.mp4` animatics (`scripts/render_preview.mjs`), and write a reproducible episode folder (`examples/`).

## Intake Checklist / 需求确认清单

Ask only for details that change the character geometry, shot timing, or target video engine. If the user asks for an immediate draft, apply the defaults below and state them briefly.

Key inputs:

- **Topic or scenario / 剧情脑洞**: e.g., Monday morning alarm meltdown, bestie outfit contrast, obby parkour storytime, cozy miniature café tycoon.
- **Avatar style / 小人风格**:
  - `chibi-plush`: rounded blind-box vinyl proportions, oversized UGC hair/headwear, Octane studio lighting (most popular on Xiaohongshu and Douyin).
  - `classic-noob`: iconic yellow cylindrical head, blue torso, green legs, rigid R6 blocky charm.
  - `ugc-streetwear`: R15 blocky body with puffy jacket, headphones, beanie, or layered Y2K accessories.
  - `corporate-worker` / `cozy-chef` / `obby-runner`: role-specific outfits on a blocky base.
- **Target video model / 目标生成工具**: Kling (可灵), Seedance/Jimeng (即梦), Hailuo MiniMax (海螺), Wan (通义万相), Sora, or Runway.
- **Workflow mode / 生成路径**: First-Frame Image-to-Video (`I2V`, default for multi-shot consistency) or direct Text-to-Video (`T2V`).
- **Duration and aspect ratio / 时长与画幅**: default `15s` (4 shots) or `30s` (8 shots) in `9:16` vertical format (`1080x1920`).

Default assumptions when unspecified:

- **Primary execution path (`local3d` — Direct Video Generation)**: Whenever the user asks to create, test, or generate a Roblox-style short video, **always render the actual `.mp4` + `.gif` + storyboard `.png` + turnaround `.png` video package directly** using `node scripts/render_preview.mjs --spec <episode.json> --out-dir <dir>`! Do **not** stop at text-only prompts or claim an external platform (Kling/快手, Seedance/即梦, Hailuo, Wan, Sora, Runway) is required. Include external engine prompts via `shot_compiler.mjs --spec <episode.json>` only as a companion file or when explicitly requested.
- **UTF-8 file safety**: Always pass `--out <file>` to `avatar_spec.mjs`, `shot_compiler.mjs`, and `drift_check.mjs` instead of shell `>` redirection (which writes UTF-16 LE BOM in Windows PowerShell).
- **Aspect ratio & pacing**: `9:16` vertical (`540x960` local H.264 `24fps` MP4 + synthesized multi-shot WAV audio), `4` shots (`15s` story) or `8` unique shots (`30s` story, zero repeated beats).

## End-to-End Direct Video Workflow / 本地直出成片标准工作流

### Step 1: Lock Cast & Companion DNA (`avatar_spec.mjs`)

Read `references/avatar-geometry-and-materials.md` and run `scripts/avatar_spec.mjs` with `--out` (supports single avatars, `--cast` multi-character ensembles, `--face` overrides, `--no-accessories` / `--replace-accessory`, and `--companion` non-human blocky pets):

```bash
node scripts/avatar_spec.mjs --cast "chibi-plush:Mo:chibi-blocky:sleepy,classic-noob:Noob:r6:deadpan" --lang zh-en --out ./my-episode/character_card.md
```

### Step 2: Author a Custom Episode Spec JSON (`episode.json`)

Copy or adapt `templates/custom_story_spec.json` to define any custom story, multi-character cast, props, custom 3D blocks, camera moves, English `BillboardGui` chat bubbles, and retro SFX cues:

- **`slug`**: output filename prefix (renders `<slug>.mp4` and `<slug>.gif`).
- **`backdrop`** (per episode or per shot): `subway_car` | `adoption_plaza` | `convenience_store` | `supermarket_aisle` | `neon_tower` | `bedroom` | `obby_sky` | `plaza` | `cafe` | `runway` | `kitchen` | `watchtower` | `street` | `hotel_corridor` | `lava_bridge` | `classroom` | `sand_court` | `studio`.
- **`cast[]`**: `{ "id": "mo", "name": "Mo", "archetype": "chibi-plush", "theme3d": "commuter", "face": "deadpan", "backProp": "backpack_cyan", "customPalette": { "top": [244,142,178], "pants": [241,245,249] } }`.
  - Built-in `theme3d` values: `theo` | `commuter` | `noob` | `guest` | `bacon` | `builderman` | `obby` | `y2k` | `chef` | `police` | `clerk` | `zombie` | `base-gray`.
- **`shots[]`** (`4` shots for 15s, `8` unique shots for 30s — 1 primary action per shot):
  - **`camera`**: `{ "preset": "push_in" | "pull_out" | "close_up" | "hero_low" | "side_track" | "high_iso" | "wide_two_shot" | "wide_aisle" | "fall_follow", "shake": 0.04 }` (or explicit `"fromRo": [x,y,z], "toRo": [x,y,z], "ta": [x,y,z]`).
  - **`actors[]`**: `{ "castId": "mo", "fromPos": [-0.6, 0, 0.1], "toPos": [0.2, 0, 0.1], "yaw": 0.4, "pose": "run", "expression": "shocked", "handPropR": "kettle" }`.
    - Supported `pose`: `idle` | `walk` | `run` | `sprint` | `jump` | `hop` | `cheer` | `wave` | `swat` | `slam` | `pour` | `recoil` | `sit` | `ride_cart` | `push_cart` | `zombie_walk` | `hang_strap` | `fall_rigid` | `faceplant` | `plank_fall` | `one_leg_freeze` | `head_turn` | `sword_slash`.
    - Supported `expression`: `smile` | `deadpan` | `smirk` | `grin` | `shocked` | `tears` | `angry` | `dizzy` | `slam`.
    - Supported `handPropL` / `handPropR`: `mug` | `cola` | `boba` | `flashlight` | `sword` | `pencil` | `kettle` | `ramen_cup` | `mystery_egg` | `soda_pack` | `price_tag`.
    - Supported `backProp`: `backpack_purple` | `backpack_cyan` | `jetpack`.
  - **`props[]`**: `{ "type": "mystery_egg" | "neon_dragon" | "trade_popup" | "shopping_cart" | "ramen_cup" | "laser_bar" | "glass_pad" | "checkout_gate" | "alarm_clock" | "laptop", "pos": [x,y,z], "moveTo": [x2,y2,z2] }`.
  - **`blocks[]`**: custom 3D rounded primitives `{ "shape": "box" | "cylinder" | "sphere", "pos": [x,y,z], "moveTo": [x2,y2,z2], "size": [hx,hy,hz], "color": [r,g,b], "roughness": 0.25 }`.
  - **`chatEn`**: crisp English `BillboardGui` overhead speech bubble (`1–3` words, e.g. `"MYTHIC PET!!"`), plus `"sfxCue"`: `chime` | `boing` | `clack` | `siren` | `buzz` | `drop` | `win`.

### Step 3: Compile Storyboard & Lint with 8-Gate Anti-Drift Checker

Compile the structured storyboard and verify all 8 gates (`Hand Lock`, `2D Face`, `Studless/Non-Voxel`, `Single-Action Budget`, `Rigid Physics`, `Trademark Cleanliness`, `Pet/Prop Topology`, `UI/Engine Guard`) pass with zero duplicate shots:

```bash
node scripts/shot_compiler.mjs --spec ./my-episode/episode.json --engine local3d --lang zh-en --out ./my-episode/storyboard.md
node scripts/shot_compiler.mjs --spec ./my-episode/episode.json --engine local3d --json --out ./my-episode/prompts.json
node scripts/drift_check.mjs --pack ./my-episode/prompts.json --engine local3d --out ./my-episode/drift_report.md
```

### Step 4: Render the Complete 9:16 Video Package Locally (`render_preview.mjs --spec`)

Render the 3-view turnaround sheet, shot keyframes, bilingual storyboard contact sheets, animated `.gif`, and `540x960` H.264 `.mp4` video with synthesized multi-shot audio directly into `--out-dir`:

```bash
node scripts/render_preview.mjs --spec ./my-episode/episode.json --out-dir ./my-episode/assets --force
```

## Quality and Honesty Boundaries / 质量与边界说明

- **Self-contained local 3D video generation first.** `scripts/render_preview.mjs --spec <episode.json> --out-dir <dir>` directly renders real playable `.mp4` (H.264 + AAC audio) and `.gif` blocky 3D animations offline with zero external accounts or APIs. Optional prompt compilation (`shot_compiler.mjs`) is also included for users who wish to feed first-frame keyframes into external I2V models.
- **Zero external npm dependencies.** All Node.js scripts use standard library modules only (`fs`, `path`, `zlib`, `child_process`), paired with Windows PowerShell `System.Drawing` and `ffmpeg` for board composition and H.264 MP4 encoding.
- **Trademark clarity & zero brand logos.** "Roblox-style" describes a blocky 3D character aesthetic (`R6`/`R15`/chibi blocky rigs). Never place official Roblox Corporation trademarks, wordmarks, `[R]` badges, or Roblox Tilt tilted-square logos onto generated outfits, caps, icons, UI, or thumbnails; use a clean geometric triangle emblem instead and keep official brand logos in the negative prompt. This project is an independent open-source Agent Skill and is not affiliated with or endorsed by Roblox Corporation.

## Reference Navigation / 参考文档索引

- [`references/avatar-geometry-and-materials.md`](references/avatar-geometry-and-materials.md): Canonical `2×2×1` / `1×2×1` stud proportions, BrickColor palettes, solid blocky hands vs. Lego claws, and Roblox UI/world props.
- [`references/model-prompt-playbook.md`](references/model-prompt-playbook.md): prompt structures, camera syntax, and motion settings for Kling, Seedance/Jimeng, Hailuo, Wan, Sora, and Runway.
- [`references/rescue-and-anti-drift.md`](references/rescue-and-anti-drift.md): diagnostic matrix and prompt patches for the 8 most common Roblox AI video generation failures.
- [`references/short-video-beats-and-audio.md`](references/short-video-beats-and-audio.md): 0 to 3s hook patterns, shot pacing, camera transitions, SFX cues, and caption placement for 9:16 vertical shorts.
- [`references/viral-archetypes-catalog.md`](references/viral-archetypes-catalog.md): 12 reusable short-video templates with shot-by-shot breakdowns.
- [`references/classic-roblox-catalog.md`](references/classic-roblox-catalog.md): classic Roblox avatars, outfits, gear, and 2D face decals.
- [`templates/`](templates/): blank markdown templates for character cards, storyboards, and shot prompts.
- [`examples/`](https://github.com/yuzhang-zhong/roblox-style-video/tree/main/examples): 12 complete checked-in short-video packages (`monday-alarm-meltdown`, `obby-sky-run`, `duo-bestie-contrast`, `cozy-cafe-tycoon`, `runway-outfit-drop`, `burnt-pizza-slapstick`, `disaster-tower-tornado`, `brookhaven-police-chase`, `doors-flashlight-hallway`, `crossroads-sword-duel`, `classroom-exam-panic`, `red-light-freeze`) with rendered PNG sheets, GIFs, and MP4 videos.
