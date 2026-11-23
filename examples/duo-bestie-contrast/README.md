# Example 3: Y2K Streetwear vs. Classic Noob / 潮人搭子与黄皮新手

This folder contains a 15-second (`9:16` vertical, 4 shots) two-character short compiled for Seedance / Jimeng (即梦视频), pairing an `R15` Y2K streetwear avatar (`"Nova"`) with a rigid `R6` yellow, blue, and green Classic Noob.

![Duo Bestie Contrast Storyboard Contact Sheet (ZH)](assets/duo_storyboard_sheet.zh.png)

## Files in this package

| File | Description |
| --- | --- |
| [`assets/duo_bestie_contrast.gif`](assets/duo_bestie_contrast.gif) | 4-shot 9:16 vertical animation loop |
| [`assets/duo_bestie_contrast.mp4`](assets/duo_bestie_contrast.mp4) | H.264 `.mp4` with camera shutter, plastic bonk, and plank-fall audio |
| [`assets/duo_storyboard_sheet.zh.png`](assets/duo_storyboard_sheet.zh.png) · [`en`](assets/duo_storyboard_sheet.en.png) | 4-shot contact sheet showing two-character framing and R6 ragdoll physics |
| [`character_card.md`](character_card.md) | `"Nova"` (`ugc-streetwear`, `r15`, `glossy-vinyl`) + Classic Noob partner specification |
| [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json) | Bilingual first-frame and Seedance/Jimeng motion prompts |

<p align="center">
  <img src="assets/duo_bestie_contrast.gif" alt="Y2K vs Classic Noob 9:16 preview" width="300" />
</p>

## Reproduce from the repository root

```bash
node scripts/avatar_spec.mjs --archetype ugc-streetwear --rig r15 --material glossy-vinyl --name "Nova" --lang zh-en > examples/duo-bestie-contrast/character_card.md
node scripts/shot_compiler.mjs --template duo-comedy --duration 15 --engine seedance --rig r15 --lang zh-en > examples/duo-bestie-contrast/storyboard.md
```
