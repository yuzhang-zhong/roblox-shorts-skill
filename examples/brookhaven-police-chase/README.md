# 08 · Brookhaven Street Police Chase / 小镇街头警匪追逐记

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template brookhaven-chase --engine hailuo --rig r6`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/brookhaven_police_chase.gif" width="185" alt="Brookhaven Street Police Chase 9:16 preview" /> | <img src="assets/chase_storyboard_sheet.en.png" width="520" alt="Brookhaven Street Police Chase 4-shot contact sheet" /> |

## Package contents

- [`assets/brookhaven_police_chase.mp4`](assets/brookhaven_police_chase.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/chase_storyboard_sheet.en.png`](assets/chase_storyboard_sheet.en.png) · [`zh`](assets/chase_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`classic-noob`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `hailuo` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype classic-noob --rig r6 --material smooth-plastic --name "NoobRunner" --lang en > examples/brookhaven-police-chase/character_card.md
node scripts/shot_compiler.mjs --template brookhaven-chase --duration 15 --engine hailuo --rig r6 --lang en > examples/brookhaven-police-chase/storyboard.md
```
