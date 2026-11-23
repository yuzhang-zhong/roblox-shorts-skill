# Example 6: Burnt Pizza Kitchen Slapstick / 烤焦披萨厨房翻车

This folder contains a 15-second (`9:16` vertical, 4 shots) R6 slapstick comedy short-video package compiled for Runway (`runway`) featuring a classic Bacon Hair avatar (`"Baco"`).

![Burnt Pizza Slapstick Storyboard Contact Sheet (ZH)](assets/pizza_storyboard_sheet.zh.png)

## Files in this package

| File | Description |
| --- | --- |
| [`assets/burnt_pizza_slapstick.gif`](assets/burnt_pizza_slapstick.gif) | 4-shot 9:16 vertical animation loop |
| [`assets/burnt_pizza_slapstick.mp4`](assets/burnt_pizza_slapstick.mp4) | H.264 `.mp4` with smoke alarm, fire extinguisher, and `"Oof!"` audio |
| [`assets/pizza_storyboard_sheet.zh.png`](assets/pizza_storyboard_sheet.zh.png) · [`en`](assets/pizza_storyboard_sheet.en.png) | 4-shot contact sheet with timecodes and Runway I2V prompts |
| [`character_card.md`](character_card.md) | `"Baco"` (`bacon-hair`, `r6`, `smooth-plastic`) |
| [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json) | Bilingual first-frame and Runway motion prompts |

<p align="center">
  <img src="assets/burnt_pizza_slapstick.gif" alt="Burnt Pizza Slapstick 9:16 preview" width="240" />
</p>

## Reproduce from the repository root

```bash
node scripts/avatar_spec.mjs --archetype bacon-hair --rig r6 --material smooth-plastic --name "Baco" --lang zh-en > examples/burnt-pizza-slapstick/character_card.md
node scripts/shot_compiler.mjs --template meme-slapstick --duration 15 --engine runway --rig r6 --lang zh-en > examples/burnt-pizza-slapstick/storyboard.md
```
