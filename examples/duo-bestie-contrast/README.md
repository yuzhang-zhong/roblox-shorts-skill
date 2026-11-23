# Worked Example 3: Y2K Streetwear vs. Classic Noob / 精修潮人与黄皮新手的闺蜜反差

This package demonstrates a 15-second (`9:16` vertical, 4 shots) **Two-Character Contrast Comedy** short compiled for **Seedance / Jimeng (即梦视频)**, pairing an expressive `R15` Y2K streetwear avatar (`"Nova"`) with a rigid `R6` yellow/blue/green Classic Noob.

![Duo Bestie Contrast Storyboard Contact Sheet](assets/duo_storyboard_sheet.png)

## Rendered Assets & Results / 实际渲染素材与视频结果

| Asset | Preview / File | Description |
| --- | --- | --- |
| **Animated 9:16 Short (GIF)** | [`assets/duo_bestie_contrast.gif`](assets/duo_bestie_contrast.gif) | 4-shot continuous 9:16 vertical animation loop |
| **Rendered Short Video (MP4)** | [`assets/duo_bestie_contrast.mp4`](assets/duo_bestie_contrast.mp4) | H.264 `.mp4` short video with synthesized shutter, plastic bonk, and plank-fall SFX |
| **Storyboard Contact Sheet** | [`assets/duo_storyboard_sheet.png`](assets/duo_storyboard_sheet.png) | 4-shot director's contact sheet showing two-character framing and R6 ragdoll physics |
| **Character DNA Card** | [`character_card.md`](character_card.md) | `"Nova"` (`ugc-streetwear`, `r15`, `glossy-vinyl`) + Classic Noob partner rules |
| **Storyboard & Prompts** | [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json) | Bilingual First-Frame + Seedance/Jimeng motion prompts |

## 9:16 Animated Result Preview / 动态成片预览

<p align="center">
  <img src="assets/duo_bestie_contrast.gif" alt="Y2K vs Classic Noob 9:16 Animated Preview" width="320" />
</p>

## Reproduce Commands / 复现命令

```bash
node scripts/avatar_spec.mjs \
  --archetype ugc-streetwear --rig r15 --material glossy-vinyl \
  --name "Nova" --lang zh-en > examples/duo-bestie-contrast/character_card.md

node scripts/shot_compiler.mjs \
  --template duo-comedy --duration 15 --engine seedance \
  --rig r15 --lang zh-en > examples/duo-bestie-contrast/storyboard.md
```
