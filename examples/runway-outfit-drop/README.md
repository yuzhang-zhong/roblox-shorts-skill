# 05 · Dress-to-Impress Runway Drop / T 台重音卡点变装秀

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template outfit-drop --engine sora --rig r15`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/runway_outfit_drop.gif" width="185" alt="Dress-to-Impress Runway Drop 9:16 preview" /> | <img src="assets/runway_storyboard_sheet.en.png" width="520" alt="Dress-to-Impress Runway Drop 4-shot contact sheet" /> |

## Package contents

- [`assets/runway_outfit_drop.mp4`](assets/runway_outfit_drop.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/runway_storyboard_sheet.en.png`](assets/runway_storyboard_sheet.en.png) · [`zh`](assets/runway_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`ugc-streetwear`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `sora` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype ugc-streetwear --rig r15 --material glossy-vinyl --name "Lumi" --lang en > examples/runway-outfit-drop/character_card.md
node scripts/shot_compiler.mjs --template outfit-drop --duration 15 --engine sora --rig r15 --lang en > examples/runway-outfit-drop/storyboard.md
```
