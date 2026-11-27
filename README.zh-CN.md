<div align="center">

# Roblox Style Video Skill

一套面向 Claude Code、Cursor、GitHub Copilot 与 Codex 的可安装 **Agent Skill**：围绕 **Roblox 视频生成**，锁住 R6/R15 方块角色一致性，制作 9:16 竖屏分镜，在本地直接输出 MP4/GIF 动态成片，并可按需编译可灵、即梦、海螺、万相、Sora 或 Runway 的图生/文生视频提示词。

[![Agent Skill](https://img.shields.io/badge/Agent_Skill-SKILL.md-0f172a?style=flat-square)](skills/roblox-style-video/SKILL.md)
[![Skill validation](https://github.com/yuzhang-zhong/roblox-style-video/actions/workflows/skill-validation.yml/badge.svg)](https://github.com/yuzhang-zhong/roblox-style-video/actions/workflows/skill-validation.yml)
[![命令行需要 Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-268354?style=flat-square)](#skill-工作流与安装使用)
[![MIT 许可证](https://img.shields.io/badge/License-MIT-2563eb?style=flat-square)](LICENSE)

**[安装](#作为-agent-skill-安装调用)** · [短片示例](#短片示例) · [分镜与场景图](#分镜拆解与多题材场景表) · [Skill 指南](skills/roblox-style-video/SKILL.md)

[English](README.md) · **简体中文** · [繁體中文](docs/i18n/README.zh-TW.md) · [日本語](docs/i18n/README.ja.md) · [한국어](docs/i18n/README.ko.md) · [Español](docs/i18n/README.es.md) · [Français](docs/i18n/README.fr.md) · [Deutsch](docs/i18n/README.de.md) · [Português](docs/i18n/README.pt-BR.md) · [Русский](docs/i18n/README.ru.md)

</div>

> **一句话结论：** `roblox-style-video` 是面向 Roblox 风格 9:16 短视频的 Agent Skill，不只是提示词合集。它可以直接在本地生成 MP4/GIF 动态预演、角色三视图、分镜图、角色防串味报告和可选的多模型视频提示词，不需要视频平台账号或 API Key。

<a name="示例与本地-3d-预览"></a>

## 短片示例

作为可挂载的 Agent Skill，本项目在对话中可直接将创意拆解为 15 秒、4 镜头（`9:16` 竖屏）的完整短片包，内置 12 套高频短剧模板。下方的 **4 秒 MP4** 与动图均由本 Skill 自带的 `scripts/render_preview.mjs` 在本地离线渲染，用来在调用外部付费视频模型前验证 R6 比例、多部件场景道具、运镜切换和头顶 `BillboardGui` 聊天气泡。

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

## Skill 工作流与安装使用

<p align="center">
  <img src="docs/pipeline.zh.svg" width="860" alt="Roblox Style Video Skill 五步工作流：锁定角色比例、三视图与本地预演、9:16 竖屏分镜、多模型提示词、防串味检查" />
</p>

### 作为 Agent Skill 安装调用

推荐使用 GitHub 官方 Skill 命令安装：

```bash
gh skill install yuzhang-zhong/roblox-style-video roblox-style-video
```

也可以使用跨 Agent 的 Skills CLI：

```bash
npx skills add https://github.com/yuzhang-zhong/roblox-style-video --skill roblox-style-video
```

安装器会读取自包含的 [`skills/roblox-style-video/`](skills/roblox-style-video/) 目录。如果宿主暂不支持安装器，请把整个目录复制到宿主的 Skills 文件夹，保留其中的 `SKILL.md`、`scripts/`、`references/`、`templates/` 与 `assets/`。

在 Agent 对话中直接调用 `roblox-style-video` Skill：

```text
使用 $roblox-style-video 生成一支 15 秒 9:16 竖屏短片，场景用惊悚酒店走廊（doors-horror）：
穿蓝卫衣的 R6 小人举着手电筒走过 050 号木门时壁灯突然闪烁，身后出现白眼，最后躲进木衣柜。
请直接输出本地 MP4/GIF、角色比例锁、4 镜头分镜表，以及可选的可灵 / Sora 图生视频提示词。
```

### 直接运行 Skill 内置命令行脚本

Skill 内附的四支脚本也可在普通克隆的仓库根目录独立运行，基于 Node.js 18+ 标准库，无需 `npm install` 或 API Key。

```bash
node scripts/render_preview.mjs --spec templates/custom_story_spec.json --out-dir out/subway-demo --force
node scripts/shot_compiler.mjs --spec templates/custom_story_spec.json --engine local3d --lang zh
node scripts/drift_check.mjs --pack templates/custom_story_spec.json --engine local3d --lang zh
```

## Skill 脚本、防跑偏检查与参考文档

直接写「Roblox 小人」常会长出真人五指、乐高 C 型钩爪、地面/头顶乐高圆粒凸起，或退化成直角体素方头。本 Skill 锁住标准 R6 方块比例（`2×2×1` 躯干、并拢同宽 `1×2×1` 方腿、实心平头方手、`1:1` 圆角桶状头）以及平整无凸粒的木板/地砖/柏油材质与多部件场景道具。`drift_check.mjs` 会在生成前拦截这些跑偏项：

<p align="center">
  <img src="assets/showcase/drift_rescue_comparison.zh.png" width="760" alt="真人五指、乐高圆粒与C型爪、MC像素方头与标准 R6 方块比例几何对比图" />
</p>

| Skill 组件 | 输出 |
| --- | --- |
| [`SKILL.md`](skills/roblox-style-video/SKILL.md) | Agent Skill 主入口说明，定义 6 种工作模式（角色设定、分镜、提示词编译、翻车修复、二创、3D 预演）与 8 项几何防变形约束。 |
| [`shot_compiler.mjs`](scripts/shot_compiler.mjs) | 按表演优先级组织提示词（瞬间动机 -> 瞳孔视线 -> 朝向镜头的手部道具交互 -> 角色双层 DNA -> 单动作运镜 -> 几何负向锁），支持 `--spec <episode.json>` 与 12 套模板。 |
| [`avatar_spec.mjs`](scripts/avatar_spec.mjs) | 双层角色设定（`Visual DNA` 外观比例 + `Performance DNA` 表演习惯）、`--cast` 同图角色瞬间表演设定板提示词、`--companion` 方块神宠与首帧[三视图参考卡](assets/showcase/momo_turnaround_sheet.zh.png)。 |
| [`drift_check.mjs`](scripts/drift_check.mjs) | 10 门中英防跑偏与可读性审查器，独立汇报 **几何门（1–8）** 与 **表演可读性门（9–10：视线目标、可见面交互、竖屏安全区与 `--assets-dir` 64×64 缩略图对比度）**。 |
| [`render_preview.mjs`](scripts/render_preview.mjs) | 本地 3D 视频直出引擎（`--spec <episode.json> --out-dir <dir>`），支持一等公民瞳孔追踪、不对称高低眉、角色表演设定板、256×256 头像裁切图与精确分镜时长合成（含[单变量 A/B 表演对照实验](examples/subway-acting-versus-baseline/)）。 |

[角色比例与材质](references/avatar-geometry-and-materials.md) · [经典道具词库](references/classic-roblox-catalog.md) · [各模型提示词](references/model-prompt-playbook.md) · [跑偏修复](references/rescue-and-anti-drift.md) · [镜头节奏与音效](references/short-video-beats-and-audio.md) · [12 套分镜模板](references/viral-archetypes-catalog.md)

## 常见问题

- **这只是提示词合集吗？** 不是。本地 3D 渲染器会输出 9:16 MP4/GIF、分镜图、角色三视图与合成音频；外部视频模型提示词是可选增强。
- **它匹配哪些需求？** Roblox 视频生成、R6/R15 或方块角色动画、机摄短片（machinima）、跑酷剧情、搞笑/恐怖/动作短片、抖音/小红书/TikTok/YouTube Shorts 分镜与角色一致性修复。
- **本地生成需要 API Key 吗？** 不需要视频模型账号或 API Key。命令行需要 Node.js 18+，MP4/GIF 打包还需要 `ffmpeg`。
- **支持哪些 Agent 和模型？** 支持 GitHub Copilot、Codex、Claude Code、Cursor、Gemini CLI 等 Agent Skills 宿主；提示词覆盖可灵、即梦/Seedance、海螺、万相、Sora 与 Runway。

## 验证与可复现性

| 检查项 | 当前证据 | 最近验证 |
| --- | --- | --- |
| 包结构与测试 | `npm run validate` 与 8/8 项 Node 测试通过，包含一次真实 PNG 渲染冒烟测试 | 2026-11-27 |
| GitHub 标准 Skill 安装 | `gh skill publish --dry-run`、远端预览及固定 `@v1.6.1` 安装通过 | 2026-11-27 |
| Linux / Windows 兼容 | CI 将在 Node 18 与 Node 22 上分别验证 | 每次 push / pull request |
| Agent UI 推荐结果 | 已提供固定查询手工协议；没有记录结果前不宣称通过 | 每次发布 |
| 网页模型可发现性 | 月度测量流程已定义；不会用本地元数据测试推断真实搜索排名 | 每月 / 外部收录变化后 |

运行本地确定性发现预检：

```bash
npm run test:discovery
```

Release 索引刷新后运行 GitHub 实时审计：

```bash
npm run test:discovery:remote -- --out discovery-report.json
```

详细步骤见 [发现效果评估协议](docs/discovery-evaluation.md) 与 [固定测试查询](tests/discovery_queries.json)。远端审计会在结果缺失、限流或爬虫尚未刷新时明确失败，不会把“未验证”写成通过。

## 语言

Agent Skill 回复与命令行 `--lang` 支持 `en`、`zh`、`zh-tw`、`ja`、`ko`、`es`、`fr`、`de`、`pt`、`ru`。

[English](README.md) · **简体中文** · [繁體中文](docs/i18n/README.zh-TW.md) · [日本語](docs/i18n/README.ja.md) · [한국어](docs/i18n/README.ko.md) · [Español](docs/i18n/README.es.md) · [Français](docs/i18n/README.fr.md) · [Deutsch](docs/i18n/README.de.md) · [Português](docs/i18n/README.pt-BR.md) · [Русский](docs/i18n/README.ru.md)

[MIT 许可证](LICENSE)。独立开源 Agent Skill 项目，内置原创几何三角形徽章，不使用官方商标，与 Roblox Corporation 无隶属或背书关系。
