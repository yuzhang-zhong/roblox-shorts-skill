---
name: roblox-shorts-skill
description: |
  Plan, prompt, render, and debug authentic Roblox-style blocky avatar AI short videos with canonical 2x2x1/1x2x1 stud geometry, viral 9:16 storyboards, model-tuned I2V/T2V prompts, and 3D preview rendering.
  Use when the user wants to generate Roblox-style avatar videos, blocky 3D character shorts, Douyin/Xiaohongshu/TikTok Roblox skits, R6/R15/chibi-plush character turnaround sheets, or prompts for Kling (可灵), Seedance/Jimeng (即梦), Hailuo MiniMax (海螺), Wan (通义万相), Sora, or Runway, or when fixing AI video defects such as human fingers, Lego C-claws/studs, Minecraft voxels, realistic faces, or rubbery limbs.
license: MIT
metadata:
  version: "1.1.0"
---

# Roblox Shorts Skill / 方块片场

## Core Objective / 核心目标

Help creators turn a short-video idea into a geometry-consistent Roblox-style blocky avatar video package: a locked Character DNA card, a 3-view reference sheet prompt, a 9:16 beat-timed storyboard, model-specific Image-to-Video (I2V) or Text-to-Video (T2V) prompts, and prompt patches when a video clip drifts.

Respond in the user's language. When the user requests bilingual output, provide Chinese explanations alongside English generation prompts and Chinese prompt equivalents for domestic engines (Kling 可灵, Seedance/Jimeng 即梦, Hailuo 海螺, Wan 通义万相).

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
5. **Authentic Roblox Material Contrast (`SmoothPlastic` + `Studs` + `Neon`)**:
   - Character limbs and torso use satin-gloss `SmoothPlastic` with crisp edge bevels; ground baseplates and Obby platforms use classic Roblox `1×1` square tile grids with raised/recessed square `Studs`, paired with glowing `Neon` obstacle bricks or `SpawnLocation` decals.
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

- Style: `chibi-plush` (`chibi-blocky` rig with `glossy-vinyl` shader), since this matches the high-appeal blind-box Roblox aesthetic on short-video platforms.
- Workflow: `I2V` (generate image keyframes first, then animate).
- Aspect ratio: `9:16` vertical, `15s` total duration (4 shots of 3.5 to 4.0 seconds each).
- Engine output: bilingual prompts suitable for Kling / Seedance / Wan and English prompts for Sora / Runway / Hailuo.

## End-to-End Workflow / 标准工作流

### Step 1: Lock Character DNA and Turnaround Sheet

Read `references/avatar-geometry-and-materials.md` and run `scripts/avatar_spec.mjs` to lock the avatar's silhouette, hand shape, face decal, and material shader before drafting any scene prompts:

```bash
node scripts/avatar_spec.mjs --archetype chibi-plush --rig chibi-blocky --material glossy-vinyl --name "Momo" --lang zh-en
```

Give the user:
- The Character DNA table (rig, head, face decal, hand lock, material, accessories, color palette).
- A copy-pasteable 3-View Turnaround Image Prompt (`front view, 45-degree three-quarter view, side profile view on a clean neutral studio backdrop`).
- The anti-drift negative prompt block.

### Step 2: Plan the 9:16 Short-Video Beat Sheet

Read `references/short-video-beats-and-audio.md` and `references/viral-archetypes-catalog.md`. Structure the short into three retention zones:

- **Shot 1 (0.0s–3.5s) · Hook / 黄金前3秒**: immediate visual contrast, exaggerated 2D decal expression change, rapid push-in, or rigid blocky slapstick impact. Never open with a slow empty establishing shot.
- **Shots 2 to N-1 · Escalation / 推进镜头**: 3.5s to 4.0s per shot. Each shot gets **one clear physical verb** (e.g., "slams the blocky alarm clock with a C-shaped hand" or "rigidly hops across neon pastel platforms").
- **Final Shot · Payoff or Loop / 反转或无缝循环**: deadpan freeze-frame, sudden lighting shift, ragdoll flop, or a pose that matches Frame 1 for infinite replay on TikTok/Douyin.

### Step 3: Compile Model-Tuned Prompts

Read `references/model-prompt-playbook.md` and run `scripts/shot_compiler.mjs` to generate shot-by-shot prompts tailored to the user's video engine:

```bash
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang zh-en
```

Every compiled shot must include:
1. **First-Frame Image Prompt (首帧画面提示词)**: geometry-locked static composition for Midjourney, Flux, Jimeng Image, or GPT-4o Image.
2. **I2V / T2V Motion Prompt (视频动态提示词)**: subject anchor + single action + physical secondary motion (hair/accessory bounce, rigid limb swing) + engine-specific camera command.
3. **Negative Prompt (负向防串味词)**: explicit exclusions for human anatomy, Lego studs, and voxel blocks.
4. **Audio and Caption Cue (音效与花字卡点)**: classic plastic click, cartoon spring, bass drop, or dialogue subtitle timing.

### Step 4: Lint for Style Drift and Rescue Failures

Before handing off custom prompts, or whenever the user reports a broken generation, run `scripts/drift_check.mjs`:

```bash
node scripts/drift_check.mjs --prompt "A cute Roblox character walking in a room and drinking coffee then waving" --engine kling --mode t2v --lang zh-en
```

Read `references/rescue-and-anti-drift.md` when troubleshooting specific defects:
- `human-fingers`: inject `fingerless and clawless solid 1x2x1 beveled rectangular block hands, no human fingers, no five fingers`.
- `lego-studs`: inject `solid 1x2x1 rectangular block hands (no Lego C-shaped hook claws), smooth studless barrel-beveled Roblox head, no cylindrical Lego studs on head`.
- `minecraft-voxels`: inject `classic Roblox 1:1 barrel-cylinder head with deep curved top and bottom bevels, SmoothPlastic shader, non-voxel, no pixelated cube textures`.
- `limb-gap`: inject `canonical Roblox 2x2x1 rectangular torso with two 1x2x1 rectangular leg blocks sitting flush side-by-side matching exact torso width`.
- `face-morph`: inject `flat 2D screen-printed Roblox decal face on smooth cylindrical surface, no 3D nose, no realistic mouth cavity`.
- `noodle-limbs`: inject `rigid Motor6D mechanical hinge joints, stiff 1x2x1 rectangular arms and legs, pivot rotation only, no rubbery limb bending`.
- `outfit-drift`: switch from T2V to First-Frame I2V anchored by the 3-view character turnaround sheet.
- `overload`: split any clip containing more than two sequential verbs into separate shots.

### Step 5: Render 3D Turnaround Sheets, Contact Sheets, and Animated Previews

Run `scripts/render_preview.mjs` to render authentic 3D Roblox R6/Chibi turnaround sheets, 4-way anti-drift comparison boards, 9:16 storyboard contact sheets, and animated `.gif` / `.mp4` short video previews:

```bash
node scripts/render_preview.mjs
```

## Quality and Honesty Boundaries / 质量与边界说明

- **Prompts, storyboards, and local 3D preview renderer.** This skill and its four CLI scripts (`avatar_spec.mjs`, `shot_compiler.mjs`, `drift_check.mjs`, `render_preview.mjs`) generate structured character cards, storyboards, anti-drift diagnostics, and local 3D Roblox studio preview renders. Generating diffusion videos requires an external model (Kling, Seedance/Jimeng, Hailuo, Wan, Sora, Runway).
- **Zero external runtime dependencies.** All scripts in `scripts/` use the Node.js standard library only and run offline without API keys.
- **Trademark clarity.** "Roblox-style" describes a blocky 3D character aesthetic (`R6`/`R15`/chibi blocky rigs) for creative prompt engineering. This project is an independent open-source skill and is not affiliated with or endorsed by Roblox Corporation.

## Reference Navigation / 参考文档索引

- [`references/avatar-geometry-and-materials.md`](references/avatar-geometry-and-materials.md): Canonical `2×2×1` / `1×2×1` stud proportions, BrickColor palettes, solid blocky hands vs. Lego claws, and Roblox UI/world props.
- [`references/model-prompt-playbook.md`](references/model-prompt-playbook.md): prompt structures, camera syntax, and motion settings for Kling, Seedance/Jimeng, Hailuo, Wan, Sora, and Runway.
- [`references/rescue-and-anti-drift.md`](references/rescue-and-anti-drift.md): diagnostic matrix and prompt patches for the 8 most common Roblox AI video generation failures.
- [`references/short-video-beats-and-audio.md`](references/short-video-beats-and-audio.md): 0 to 3s hook patterns, shot pacing, camera transitions, SFX cues, and caption placement for 9:16 vertical shorts.
- [`references/viral-archetypes-catalog.md`](references/viral-archetypes-catalog.md): 6 reusable short-video templates with shot-by-shot breakdowns.
- [`templates/`](templates/): blank markdown templates for character cards, storyboards, and shot prompts.
- [`examples/`](examples/): 3 complete checked-in short-video packages (`monday-alarm-meltdown`, `obby-sky-run`, `duo-bestie-contrast`) with rendered PNG sheets, GIFs, and MP4 videos.
