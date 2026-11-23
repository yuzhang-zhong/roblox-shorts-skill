# 10 · Crossroads Linked Sword 1v1 / 十字路口经典长剑对决

15-second (`9:16`, 4-shot) Roblox-style short-video package compiled with `--template sword-duel --engine seedance --rig r6`.

| 9:16 Animated Preview | 4-Shot Storyboard Contact Sheet |
| :---: | :---: |
| <img src="assets/crossroads_sword_duel.gif" width="185" alt="Crossroads Linked Sword 1v1 9:16 preview" /> | <img src="assets/sword_storyboard_sheet.en.png" width="520" alt="Crossroads Linked Sword 1v1 4-shot contact sheet" /> |

## Package contents

- [`assets/crossroads_sword_duel.mp4`](assets/crossroads_sword_duel.mp4): offline 3D preview video (`H.264 MP4`)
- [`assets/sword_storyboard_sheet.en.png`](assets/sword_storyboard_sheet.en.png) · [`zh`](assets/sword_storyboard_sheet.zh.png): English and Chinese 4-shot contact sheets
- [`character_card.md`](character_card.md): Character DNA card and 3-view turnaround prompt (`builderman`)
- [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json): shot-by-shot first-frame and `seedance` motion prompts

## Reproduce

```bash
node scripts/avatar_spec.mjs --archetype builderman --rig r6 --material smooth-plastic --name "Builder" --lang en > examples/crossroads-sword-duel/character_card.md
node scripts/shot_compiler.mjs --template sword-duel --duration 15 --engine seedance --rig r6 --lang en > examples/crossroads-sword-duel/storyboard.md
```
