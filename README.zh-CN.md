<div align="center">

# Roblox Style Video

做一支 9:16 竖屏短片：锁住 Roblox 方块比例，逐镜编译提示词，先在本地看一遍动态分镜。

[![命令行需要 Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-268354?style=flat-square)](#安装与开始)
[![MIT 许可证](https://img.shields.io/badge/License-MIT-2563eb?style=flat-square)](LICENSE)

**[短片示例](#短片示例)** · [分镜与场景图](#分镜拆解与多题材场景表) · [安装与开始](#安装与开始) · [Skill 指南](SKILL.md)

[English](README.md) · **简体中文** · [更多语言](#语言)

</div>

<a name="示例与本地-3d-预览"></a>

## 短片示例

仓库内置 12 套经典 Roblox 短视频模板，每份分镜按 15 秒、4 镜头（`9:16` 竖屏）规划。下方的 **4 秒 MP4** 与动图均由 `scripts/render_preview.mjs` 在本地离线渲染，用来在调用外部付费视频模型前检查 R6 比例、运镜切换和头顶 `BillboardGui` 聊天气泡。

<p align="center">
  <a href="examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4"><img src="examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="134" alt="Monday Alarm 9:16 animated preview" /></a>
  <a href="examples/obby-sky-run/assets/obby_sky_run.mp4"><img src="examples/obby-sky-run/assets/obby_sky_run.gif" width="134" alt="Sky Obby 9:16 animated preview" /></a>
  <a href="examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4"><img src="examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="134" alt="Y2K vs. Noob 9:16 animated preview" /></a>
  <a href="examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4"><img src="examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="134" alt="Cozy Cafe 9:16 animated preview" /></a>
  <a href="examples/runway-outfit-drop/assets/runway_outfit_drop.mp4"><img src="examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="134" alt="Runway Drop 9:16 animated preview" /></a>
  <a href="examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4"><img src="examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="134" alt="Burnt Pizza 9:16 animated preview" /></a>
  <br />
  <a href="examples/disaster-tower-tornado/assets/disaster_tower_tornado.mp4"><img src="examples/disaster-tower-tornado/assets/disaster_tower_tornado.gif" width="134" alt="Tornado Tower 9:16 animated preview" /></a>
  <a href="examples/brookhaven-police-chase/assets/brookhaven_police_chase.mp4"><img src="examples/brookhaven-police-chase/assets/brookhaven_police_chase.gif" width="134" alt="Police Chase 9:16 animated preview" /></a>
  <a href="examples/doors-flashlight-hallway/assets/doors_flashlight_hallway.mp4"><img src="examples/doors-flashlight-hallway/assets/doors_flashlight_hallway.gif" width="134" alt="Doors Hallway 9:16 animated preview" /></a>
  <a href="examples/crossroads-sword-duel/assets/crossroads_sword_duel.mp4"><img src="examples/crossroads-sword-duel/assets/crossroads_sword_duel.gif" width="134" alt="Sword Duel 9:16 animated preview" /></a>
  <a href="examples/classroom-exam-panic/assets/classroom_exam_panic.mp4"><img src="examples/classroom-exam-panic/assets/classroom_exam_panic.gif" width="134" alt="Exam Panic 9:16 animated preview" /></a>
  <a href="examples/red-light-freeze/assets/red_light_freeze.mp4"><img src="examples/red-light-freeze/assets/red_light_freeze.gif" width="134" alt="Red Light Freeze 9:16 animated preview" /></a>
</p>
<p align="center"><sub>点击任意动图可直接打开对应的 H.264 MP4 预览短片。</sub></p>

| 短片与适配模型 | 看点 | 短片与适配模型 | 看点 |
| --- | --- | --- | --- |
| **[01 · 早八闹钟破防](examples/monday-alarm-meltdown/)** · 可灵<br>[MP4](examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [分镜图](examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.zh.png) | 拍扁闹钟、面对 99+ 消息流泪，最后 90 度直挺挺扑倒在键盘上。 | **[07 · 高塔龙卷风](examples/disaster-tower-tornado/)** · 可灵<br>[MP4](examples/disaster-tower-tornado/assets/disaster_tower_tornado.mp4) · [分镜图](examples/disaster-tower-tornado/assets/tornado_storyboard_sheet.zh.png) | 经典红帽游客在高塔遭遇黑色龙卷风，护栏掀飞后跳上孤柱存活。 |
| **[02 · 天空跑酷闯关](examples/obby-sky-run/)** · 海螺<br>[MP4](examples/obby-sky-run/assets/obby_sky_run.mp4) · [分镜图](examples/obby-sky-run/assets/obby_storyboard_sheet.zh.png) | 佩戴红色加速弹簧跃过浮空跳台，在红色激光砖前急停并落向存档点。 | **[08 · 小镇警匪追逐](examples/brookhaven-police-chase/)** · 海螺<br>[MP4](examples/brookhaven-police-chase/assets/brookhaven_police_chase.mp4) · [分镜图](examples/brookhaven-police-chase/assets/chase_storyboard_sheet.zh.png) | 抱绿色钱袋狂奔的黄皮新手被警官追击，绊到黄色消防栓平地飞扑。 |
| **[03 · 潮人与黄皮新手](examples/duo-bestie-contrast/)** · 即梦<br>[MP4](examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [分镜图](examples/duo-bestie-contrast/assets/duo_storyboard_sheet.zh.png) | Y2K 潮人转身时误撞经典黄皮 R6 新手，新手保持笔直刚体侧倾。 | **[09 · 惊悚酒店闪灯](examples/doors-flashlight-hallway/)** · Sora<br>[MP4](examples/doors-flashlight-hallway/assets/doors_flashlight_hallway.mp4) · [分镜图](examples/doors-flashlight-hallway/assets/doors_storyboard_sheet.zh.png) | 50 号木门前壁灯骤灭，回头撞见黑暗中白眼，转身躲进木衣柜。 |
| **[04 · 微缩甜品小店](examples/cozy-cafe-tycoon/)** · 通义万相<br>[MP4](examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [分镜图](examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.zh.png) | 可颂摆盘特写切到热拿铁滑过吧台，收银台弹出金币完成循环。 | **[10 · 十字剑石桥对决](examples/crossroads-sword-duel/)** · 即梦<br>[MP4](examples/crossroads-sword-duel/assets/crossroads_sword_duel.mp4) · [分镜图](examples/crossroads-sword-duel/assets/sword_storyboard_sheet.zh.png) | 岩浆石桥上双人跃起拼剑，险些坠崖后举起可乐罐碰杯言和。 |
| **[05 · 走秀卡点换装](examples/runway-outfit-drop/)** · Sora<br>[MP4](examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [分镜图](examples/runway-outfit-drop/assets/runway_storyboard_sheet.zh.png) | 灰色基础模起跳蓄力，踩中重音落地瞬间切换粉色皇冠穿搭。 | **[11 · 考场发卷宕机](examples/classroom-exam-panic/)** · 通义万相<br>[MP4](examples/classroom-exam-panic/assets/classroom_exam_panic.mp4) · [分镜图](examples/classroom-exam-panic/assets/exam_storyboard_sheet.zh.png) | 发卷前自信微笑，看清第一题抱头震惊，狂写后响铃进入 X_X 宕机。 |
| **[06 · 烤焦披萨翻车](examples/burnt-pizza-slapstick/)** · Runway<br>[MP4](examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [分镜图](examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.zh.png) | 端出乌黑披萨遭遇冷白顶光，左臂脱落并直挺挺侧倒拍地。 | **[12 · 木头人急停](examples/red-light-freeze/)** · Runway<br>[MP4](examples/red-light-freeze/assets/red_light_freeze.mp4) · [分镜图](examples/red-light-freeze/assets/redlight_storyboard_sheet.zh.png) | 绿灯双人冲刺、红灯瞬间单腿金鸡独立定格，最后飞扑压过终点线。 |

## 分镜拆解与多题材场景表

视频生成模型在单个 4 至 5 秒片段里如果塞入三四个连续动作，很容易出现关节软化或穿模。每支 15 秒短片固定拆成四个单动作片段（`0–3.5s` 开场钩子、两镜动作推进、`11.5–15s` 反转或循环收尾）：

| 镜头 01 · 开场钩子 (`0–3.5s`) | 镜头 02 · 动作推进 (`3.5–7.5s`) | 镜头 03 · 情绪升级 (`7.5–11.5s`) | 镜头 04 · 循环收尾 (`11.5–15s`) |
| :---: | :---: | :---: | :---: |
| <img src="examples/monday-alarm-meltdown/assets/shot_01_hook.png" width="196" alt="镜头 01：红闹钟狂响与惊醒特写" /> | <img src="examples/monday-alarm-meltdown/assets/shot_02_slam.png" width="196" alt="镜头 02：右侧实心方臂挥落拍停闹钟" /> | <img src="examples/monday-alarm-meltdown/assets/shot_03_tears.png" width="196" alt="镜头 03：电脑前瀑布流泪贴图" /> | <img src="examples/monday-alarm-meltdown/assets/shot_04_faceplant.png" width="196" alt="镜头 04：90度腰部刚体折弯扑倒键盘" /> |

六种常见 Roblox 游戏与短剧题材的四格分镜联系表：

| 02 · 天空跑酷闯关 (`海螺` · 加速弹簧与红砖急停) | 08 · 小镇警匪追逐 (`海螺` · 警灯追击与消防栓平地摔) |
| :---: | :---: |
| <a href="examples/obby-sky-run/"><img src="examples/obby-sky-run/assets/obby_storyboard_sheet.zh.png" width="410" alt="天空跑酷闯关四镜头分镜表" /></a> | <a href="examples/brookhaven-police-chase/"><img src="examples/brookhaven-police-chase/assets/chase_storyboard_sheet.zh.png" width="410" alt="小镇警匪追逐四镜头分镜表" /></a> |
| **07 · 自然灾害高塔龙卷风 (`可灵` · 护栏掀飞与孤柱存活)** | **09 · 惊悚酒店闪灯走廊 (`Sora` · 手电筒扫光与躲柜)** |
| <a href="examples/disaster-tower-tornado/"><img src="examples/disaster-tower-tornado/assets/tornado_storyboard_sheet.zh.png" width="410" alt="高塔龙卷风四镜头分镜表" /></a> | <a href="examples/doors-flashlight-hallway/"><img src="examples/doors-flashlight-hallway/assets/doors_storyboard_sheet.zh.png" width="410" alt="惊悚酒店闪灯走廊四镜头分镜表" /></a> |
| **10 · 十字路口长剑对决 (`即梦` · 岩浆石桥拼刀与可乐言和)** | **12 · 木头人极限急停 (`Runway` · 红绿灯单腿定格)** |
| <a href="examples/crossroads-sword-duel/"><img src="examples/crossroads-sword-duel/assets/sword_storyboard_sheet.zh.png" width="410" alt="十字剑石桥对决四镜头分镜表" /></a> | <a href="examples/red-light-freeze/"><img src="examples/red-light-freeze/assets/redlight_storyboard_sheet.zh.png" width="410" alt="木头人极限急停四镜头分镜表" /></a> |

## 安装与开始

### 作为 Agent Skill 使用

克隆到宿主的 Skills 目录。下方路径用于 Codex；GitHub Copilot 用 `~/.copilot/skills/roblox-style-video`，Claude Code 和 Cursor 用各自配置的 Skills 目录。

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-video.git ~/.codex/skills/roblox-style-video
```

在对话里调用 `roblox-style-video`：

```text
使用 $roblox-style-video 规划一支 15 秒 9:16 竖屏短片，场景用惊悚酒店走廊（doors-horror）：
穿蓝卫衣的 R6 小人举着手电筒走过 050 号木门时壁灯突然闪烁，身后出现白眼，最后躲进木衣柜。
请给出角色比例锁、4 镜头分镜表和可灵 / Sora 图生视频提示词。
```

### 直接使用命令行

在普通克隆的仓库根目录运行。脚本基于 Node.js 18+ 标准库，无需 `npm install` 或 API Key。

```bash
node scripts/shot_compiler.mjs --template brookhaven-chase --duration 15 --engine hailuo --rig r6 --lang zh
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang zh
node scripts/render_preview.mjs --only tornado,chase,doors
```

## 命令行脚本、防跑偏检查与参考文档

直接写「Roblox 小人」常会长出真人五指、乐高 C 型钩爪/头顶凸粒，或退化成直角体素方头。标准 R6 比例锁住 `2×2×1` 躯干、并拢同宽 `1×2×1` 方腿、实心平头方手与 `1:1` 圆角桶状头，凸粒只放在地面 `Studs` 底板。`drift_check.mjs` 会在生成前拦截这些跑偏项：

<p align="center">
  <img src="assets/showcase/drift_rescue_comparison.zh.png" width="760" alt="真人五指、乐高C型爪、MC像素方头与标准 Roblox R6 几何对比图" />
</p>

| 脚本 | 输出 |
| --- | --- |
| [`shot_compiler.mjs`](scripts/shot_compiler.mjs) | 内置 12 套短片模板，编译适配可灵、即梦、海螺、通义万相、Sora 和 Runway 的 9:16 分镜与 I2V/T2V 提示词。 |
| [`avatar_spec.mjs`](scripts/avatar_spec.mjs) | 角色设定卡、`BrickColor` 色号、方块比例锁与首帧[三视图参考卡](assets/showcase/momo_turnaround_sheet.zh.png)提示词。 |
| [`drift_check.mjs`](scripts/drift_check.mjs) | 检查真人手指、乐高钩爪与单镜多动作超载，输出修补后的提示词。 |
| [`render_preview.mjs`](scripts/render_preview.mjs) | 本地渲染分镜联系表、对比图、GIF 和 MP4 预览（Windows 合成使用 PowerShell `System.Drawing` 与 `ffmpeg`）。 |

[角色比例与材质](references/avatar-geometry-and-materials.md) · [经典道具词库](references/classic-roblox-catalog.md) · [各模型提示词](references/model-prompt-playbook.md) · [跑偏修复](references/rescue-and-anti-drift.md) · [镜头节奏与音效](references/short-video-beats-and-audio.md) · [12 套分镜模板](references/viral-archetypes-catalog.md)

## 语言

Agent 回复与命令行 `--lang` 支持 `en`、`zh`、`zh-tw`、`ja`、`ko`、`es`、`fr`、`de`、`pt`、`ru`。

[English](README.md) · **简体中文** · [繁體中文](docs/i18n/README.zh-TW.md) · [日本語](docs/i18n/README.ja.md) · [한국어](docs/i18n/README.ko.md) · [Español](docs/i18n/README.es.md) · [Français](docs/i18n/README.fr.md) · [Deutsch](docs/i18n/README.de.md) · [Português](docs/i18n/README.pt-BR.md) · [Русский](docs/i18n/README.ru.md)

[MIT 许可证](LICENSE)。独立开源项目，与 Roblox Corporation 无隶属或背书关系。
