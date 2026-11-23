# 07 · Natural Disaster Tornado Tower / 自然灾害模拟器：高塔龙卷风

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template disaster-survival --engine kling --rig r6`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/disaster_tower_tornado.gif" width="185" alt="Natural Disaster Tornado Tower 9:16 preview" /> | <img src="assets/tornado_storyboard_sheet.en.png" width="520" alt="Natural Disaster Tornado Tower 4-shot contact sheet" /> |

## Package contents

- [`assets/disaster_tower_tornado.mp4`](assets/disaster_tower_tornado.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/tornado_storyboard_sheet.en.png`](assets/tornado_storyboard_sheet.en.png) · [`zh`](assets/tornado_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`classic-guest`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `kling` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype classic-guest --rig r6 --material smooth-plastic --name "Guest666" --lang en > examples/disaster-tower-tornado/character_card.md
node scripts/shot_compiler.mjs --template disaster-survival --duration 15 --engine kling --rig r6 --lang en > examples/disaster-tower-tornado/storyboard.md
```
