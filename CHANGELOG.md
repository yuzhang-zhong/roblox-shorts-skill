# Changelog

## 1.6.1

- Added a synchronized, self-contained `skills/roblox-style-video/` distribution package so GitHub Skill search, preview, install, and publish can discover the project without changing the existing root workflow.
- Reworked Agent-facing descriptions, README quick answers, install commands, and package keywords around concrete search intents such as Roblox video generation, R6/R15 animation, machinima, 9:16 shorts, offline MP4/GIF output, I2V/T2V prompts, and anti-drift checks.
- Added `scripts/sync_skill_bundle.mjs` and package validation so the installable Skill bundle stays byte-for-byte aligned with the repository source.

## 1.6.0

- Added a self-contained declarative 3D episode video engine (`node scripts/render_preview.mjs --spec <episode.json> --out-dir <dir>`) that directly renders custom multi-shot `540x960` H.264 `.mp4` videos (with synthesized retro Roblox audio), `.gif`s, bilingual 4/8-shot storyboard sheets, and 3-view character turnaround sheets for any custom story without requiring external video platforms.
- Upgraded `scripts/shot_compiler.mjs` with `--spec <episode.json>`, multi-character `cast[]` identity injection, true 8-shot (`30s`) and 12-shot (`45s`) progressive beat expansion (zero modulo shot recycling), Seedance `lastFramePrompt` loop bridges, dedicated Sora vs. Runway formatters, strict CLI flag validation, and `--out <path>` UTF-8 output.
- Upgraded `scripts/drift_check.mjs` from 5 coarse gates to an 8-gate Unicode-safe linter and `--pack` batch auditor (fixing Chinese `\b` boundary false negatives, `close-up`/`next to`/`zero fingers` false positives, R15 soft-body contradictions, trademark leak checks, blocky pet/prop weld checks, and rig-aware rescue rewrites).
- Expanded `scripts/avatar_spec.mjs` with `zombie-r6`, `--face`, `--no-accessories` / `--replace-accessory`, `--companion` blocky pet DNA (`neon-dragon`, `blocky-shiba`, `floating-slime`, `cyber-drone`), and `--cast` multi-character sheets.

## 1.5.0

- Replaced all tilted-square emblems in `assets/icon.svg`, character presets, prompt templates, and 3D renders with an original trademark-free geometric triangle badge, and removed the top-left `9:16 R6` HUD label from `assets/icon.svg`.
- Eliminated circular Lego floor stud patterns across all 3D preview scenes and prompt tails, adding smooth per-scene architectural surfaces (`WoodPlanks`, `CheckerTile`, `Asphalt`, `HotelCarpet`, `Lava`, `Grass`, `Runway`, `SandCourt`) and rich multi-part 3D props across all 12 animated shorts.
- Added dedicated English (`docs/pipeline.en.svg`) and Chinese (`docs/pipeline.zh.svg`) Agent Skill workflow diagrams, and updated all 10 READMEs under the **Roblox Style Video Skill** title with explicit Agent Skill documentation.

## 1.4.0

- Added 6 new Roblox short-video story templates and 3D animated scene packages (`disaster-survival`, `brookhaven-chase`, `doors-horror`, `sword-duel`, `school-panic`, `red-light-game`), bringing the showcase to 12 animated 9:16 examples.
- Updated all 10 language READMEs to remove static character/face grids and top banners, featuring a dense 6x2 animated video gallery and concrete scene-by-scene shot strips.

## 1.3.0

- Renamed repository and skill identifier to `roblox-style-video`.
- Rewrote `README.md`, `README.zh-CN.md`, and all 8 `docs/i18n/` translations using `readme-editorial` layout rules (left-aligned top screen, immediate quick start, explicit separation of offline 3D previews from external diffusion video models, mobile-safe 3-column and 4-column visual grids, and clean link lists).

## 1.2.0

- Renamed package and skill identifier to `roblox-style-skill`.
- Set English as the default `README.md`, added `README.zh-CN.md` and 8 translated READMEs in `docs/i18n/` (`zh-TW`, `ja`, `ko`, `es`, `fr`, `de`, `pt-BR`, `ru`), and added 10-language `--lang` support across CLI scripts.
- Added localized Chinese (`.zh.png`) and English (`.en.png`) turnaround, anti-drift comparison, and storyboard contact sheets, and redesigned `docs/pipeline.svg` with a light neutral studio palette.

## 1.1.0

- Upgraded core Roblox geometry system to canonical `2×2×1` torso + four flush `1×2×1` solid rectangular limb blocks and `1:1` barrel-beveled cylindrical head (`SpecialMesh`), explicitly distinguishing authentic Roblox solid blocky hands from Lego minifigure C-shaped claw hooks.
- Added official Roblox `BrickColor` palettes, `bacon-hair` preset, `SmoothPlastic` + `Studs` baseplate grid rules, `Speed Coil` / `SpawnLocation` / `Killbrick` props, and overhead `BillboardGui` chat bubbles.
- Added `scripts/render_preview.mjs` (procedural 3D SDF Roblox Studio renderer) and `scripts/compose_boards.ps1` to render 3-view turnaround sheets, 4-way anti-drift comparison boards, 9:16 storyboard contact sheets, and animated `.gif` / `.mp4` short videos with audio.
- Added three complete visual case packages under `examples/` (`monday-alarm-meltdown`, `obby-sky-run`, `duo-bestie-contrast`).

## 1.0.0

- Initial release of `roblox-shorts-skill` (方块片场 · Roblox Shorts Skill).
- Added `SKILL.md` with 6 production modes (`Avatar`, `Storyboard`, `Prompt-Compile`, `Rescue`, `Remix`, `Package`), anti-humanization geometry locks, and bilingual Chinese/English workflow rules.
- Added 3 zero-dependency Node.js CLI tools: `scripts/avatar_spec.mjs`, `scripts/shot_compiler.mjs`, and `scripts/drift_check.mjs`.
- Added 5 domain reference guides covering R6/R15/Chibi-Blocky geometry & materials, multi-model I2V/T2V syntax (Kling, Seedance/Jimeng, Hailuo, Wan, Sora, Runway), 8 failure rescue patterns, viral short-video beat structures, and 6 short-video archetypes.
- Added reusable templates and a complete worked example (`examples/monday-alarm-meltdown/`).
