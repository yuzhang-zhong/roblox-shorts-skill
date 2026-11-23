# 02 · Pastel Sky Obby Speedrun / 多巴胺天空跑酷闯关

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template obby-storytime --engine hailuo --rig r6`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/obby_sky_run.gif" width="185" alt="Pastel Sky Obby Speedrun 9:16 preview" /> | <img src="assets/obby_storyboard_sheet.en.png" width="520" alt="Pastel Sky Obby Speedrun 4-shot contact sheet" /> |

## Package contents

- [`assets/obby_sky_run.mp4`](assets/obby_sky_run.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/obby_storyboard_sheet.en.png`](assets/obby_storyboard_sheet.en.png) · [`zh`](assets/obby_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`obby-runner`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `hailuo` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype obby-runner --rig r6 --material smooth-plastic --name "SkyHop" --lang en > examples/obby-sky-run/character_card.md
node scripts/shot_compiler.mjs --template obby-storytime --duration 15 --engine hailuo --rig r6 --lang en > examples/obby-sky-run/storyboard.md
```
