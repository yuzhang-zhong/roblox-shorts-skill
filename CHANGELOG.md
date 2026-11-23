# Changelog

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
