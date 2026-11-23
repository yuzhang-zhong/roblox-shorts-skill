# Worked Example 2: Pastel Sky Obby Parkour / 多巴胺天空跑酷闯关剧场

This package demonstrates a 15-second (`9:16` vertical, 4 shots) **Classic R6 Obby Parkour** short video package compiled for **Hailuo MiniMax (`I2V-01-Director`)** with bracketed camera commands (`[Push in, Tilt up]`, `[Pan right]`, `[Tilt down]`).

![Pastel Sky Obby Storyboard Contact Sheet](assets/obby_storyboard_sheet.png)

## Rendered Assets & Results / 实际渲染素材与视频结果

| Asset | Preview / File | Description |
| --- | --- | --- |
| **Animated 9:16 Short (GIF)** | [`assets/obby_sky_run.gif`](assets/obby_sky_run.gif) | 4-shot continuous 9:16 vertical animation loop |
| **Rendered Short Video (MP4)** | [`assets/obby_sky_run.mp4`](assets/obby_sky_run.mp4) | H.264 `.mp4` short video with synthesized jump spring & checkpoint chime SFX |
| **Storyboard Contact Sheet** | [`assets/obby_storyboard_sheet.png`](assets/obby_storyboard_sheet.png) | 4-shot director's contact sheet with timecodes and Hailuo camera tags |
| **Character DNA Card** | [`character_card.md`](character_card.md) | R6 blocky runner `"SkyHop"` with cyan jersey, magenta shorts, and twin mini jetpack |
| **Storyboard & Prompts** | [`storyboard.md`](storyboard.md) · [`prompts.json`](prompts.json) | Bilingual First-Frame + Hailuo Director motion prompts |

## 9:16 Animated Result Preview / 动态成片预览

<p align="center">
  <img src="assets/obby_sky_run.gif" alt="Pastel Sky Obby Parkour 9:16 Animated Preview" width="320" />
</p>

## Reproduce Commands / 复现命令

```bash
node scripts/avatar_spec.mjs \
  --archetype obby-runner --rig r6 --material matte-abs \
  --name "SkyHop" --lang zh-en > examples/obby-sky-run/character_card.md

node scripts/shot_compiler.mjs \
  --template obby-storytime --duration 15 --engine hailuo \
  --rig r6 --lang zh-en > examples/obby-sky-run/storyboard.md
```
