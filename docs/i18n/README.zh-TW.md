<div align="center">

# Roblox Style Video

規劃 9:16 Roblox 直式短片：鎖定方塊比例、逐鏡編譯提示詞，先在本機預覽動態分鏡。

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · **繁體中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

</div>

## 短片範例（12 支 9:16 動畫預覽）

<p align="center">
  <a href="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4"><img src="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="134" alt="Monday Alarm 9:16 animated preview" /></a>
  <a href="../../examples/obby-sky-run/assets/obby_sky_run.mp4"><img src="../../examples/obby-sky-run/assets/obby_sky_run.gif" width="134" alt="Sky Obby 9:16 animated preview" /></a>
  <a href="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4"><img src="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="134" alt="Y2K vs. Noob 9:16 animated preview" /></a>
  <a href="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4"><img src="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="134" alt="Cozy Cafe 9:16 animated preview" /></a>
  <a href="../../examples/runway-outfit-drop/assets/runway_outfit_drop.mp4"><img src="../../examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="134" alt="Runway Drop 9:16 animated preview" /></a>
  <a href="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4"><img src="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="134" alt="Burnt Pizza 9:16 animated preview" /></a>
  <br />
  <a href="../../examples/disaster-tower-tornado/assets/disaster_tower_tornado.mp4"><img src="../../examples/disaster-tower-tornado/assets/disaster_tower_tornado.gif" width="134" alt="Tornado Tower 9:16 animated preview" /></a>
  <a href="../../examples/brookhaven-police-chase/assets/brookhaven_police_chase.mp4"><img src="../../examples/brookhaven-police-chase/assets/brookhaven_police_chase.gif" width="134" alt="Police Chase 9:16 animated preview" /></a>
  <a href="../../examples/doors-flashlight-hallway/assets/doors_flashlight_hallway.mp4"><img src="../../examples/doors-flashlight-hallway/assets/doors_flashlight_hallway.gif" width="134" alt="Doors Hallway 9:16 animated preview" /></a>
  <a href="../../examples/crossroads-sword-duel/assets/crossroads_sword_duel.mp4"><img src="../../examples/crossroads-sword-duel/assets/crossroads_sword_duel.gif" width="134" alt="Sword Duel 9:16 animated preview" /></a>
  <a href="../../examples/classroom-exam-panic/assets/classroom_exam_panic.mp4"><img src="../../examples/classroom-exam-panic/assets/classroom_exam_panic.gif" width="134" alt="Exam Panic 9:16 animated preview" /></a>
  <a href="../../examples/red-light-freeze/assets/red_light_freeze.mp4"><img src="../../examples/red-light-freeze/assets/red_light_freeze.gif" width="134" alt="Red Light Freeze 9:16 animated preview" /></a>
</p>

## 分鏡拆解與多題材場景表

| Shot 01 (`0–3.5s`) | Shot 02 (`3.5–7.5s`) | Shot 03 (`7.5–11.5s`) | Shot 04 (`11.5–15s`) |
| :---: | :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/shot_01_hook.png" width="196" alt="Shot 01" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_02_slam.png" width="196" alt="Shot 02" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_03_tears.png" width="196" alt="Shot 03" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_04_faceplant.png" width="196" alt="Shot 04" /> |

| 02 · Sky Obby (`Hailuo`) | 08 · Brookhaven Police Chase (`Hailuo`) |
| :---: | :---: |
| <a href="../../examples/obby-sky-run/"><img src="../../examples/obby-sky-run/assets/obby_storyboard_sheet.zh.png" width="410" alt="Sky Obby" /></a> | <a href="../../examples/brookhaven-police-chase/"><img src="../../examples/brookhaven-police-chase/assets/chase_storyboard_sheet.zh.png" width="410" alt="Police Chase" /></a> |
| **07 · Natural Disaster Tower (`Kling`)** | **09 · Doors Hotel Hallway (`Sora`)** |
| <a href="../../examples/disaster-tower-tornado/"><img src="../../examples/disaster-tower-tornado/assets/tornado_storyboard_sheet.zh.png" width="410" alt="Tornado Tower" /></a> | <a href="../../examples/doors-flashlight-hallway/"><img src="../../examples/doors-flashlight-hallway/assets/doors_storyboard_sheet.zh.png" width="410" alt="Doors Hallway" /></a> |
| **10 · Crossroads Sword Duel (`Seedance`)** | **12 · Red Light Freeze (`Runway`)** |
| <a href="../../examples/crossroads-sword-duel/"><img src="../../examples/crossroads-sword-duel/assets/sword_storyboard_sheet.zh.png" width="410" alt="Sword Duel" /></a> | <a href="../../examples/red-light-freeze/"><img src="../../examples/red-light-freeze/assets/redlight_storyboard_sheet.zh.png" width="410" alt="Red Light Freeze" /></a> |

## 安裝與開始

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-video.git ~/.codex/skills/roblox-style-video
```

```bash
node scripts/shot_compiler.mjs --template brookhaven-chase --duration 15 --engine hailuo --rig r6 --lang zh-tw
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang zh-tw
node scripts/render_preview.mjs --only tornado,chase,doors
```

## 命令列腳本、防走樣檢查與參考文件

<p align="center">
  <img src="../../assets/showcase/drift_rescue_comparison.zh.png" width="760" alt="Geometry drift check" />
</p>

- [`SKILL.md`](../../SKILL.md) · [`scripts/shot_compiler.mjs`](../../scripts/shot_compiler.mjs) · [`scripts/avatar_spec.mjs`](../../scripts/avatar_spec.mjs) · [`scripts/drift_check.mjs`](../../scripts/drift_check.mjs) · [`scripts/render_preview.mjs`](../../scripts/render_preview.mjs)
- [`references/avatar-geometry-and-materials.md`](../../references/avatar-geometry-and-materials.md) · [`references/model-prompt-playbook.md`](../../references/model-prompt-playbook.md) · [`references/rescue-and-anti-drift.md`](../../references/rescue-and-anti-drift.md) · [`references/viral-archetypes-catalog.md`](../../references/viral-archetypes-catalog.md) · [`LICENSE`](../../LICENSE)
