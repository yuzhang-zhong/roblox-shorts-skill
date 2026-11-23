# 09 · Doors Hotel Flashlight Hallway / 惊悚酒店 50 号门闪灯走廊

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template doors-horror --engine sora --rig r6`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/doors_flashlight_hallway.gif" width="185" alt="Doors Hotel Flashlight Hallway 9:16 preview" /> | <img src="assets/doors_storyboard_sheet.en.png" width="520" alt="Doors Hotel Flashlight Hallway 4-shot contact sheet" /> |

## Package contents

- [`assets/doors_flashlight_hallway.mp4`](assets/doors_flashlight_hallway.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/doors_storyboard_sheet.en.png`](assets/doors_storyboard_sheet.en.png) · [`zh`](assets/doors_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`chibi-plush`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `sora` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype chibi-plush --rig r6 --material smooth-plastic --name "Theo" --lang en > examples/doors-flashlight-hallway/character_card.md
node scripts/shot_compiler.mjs --template doors-horror --duration 15 --engine sora --rig r6 --lang en > examples/doors-flashlight-hallway/storyboard.md
```
