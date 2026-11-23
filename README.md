<div align="center">

<img src="assets/icon.svg" alt="方块片场 Roblox Shorts Skill 图标" width="144" />

# 方块片场 · Roblox Shorts Skill

**简体中文** · [English (full README)](README.en.md)

**先锁住无手指 C 型手、圆柱头和盲盒材质，再生成多镜头一致的 Roblox 小人短视频。**

A bilingual Agent Skill and CLI toolkit for Roblox-style blocky avatar AI short videos.

[![Agent Skill](https://img.shields.io/badge/Agent-Codex_%2F_Claude_%2F_Cursor_Skill-e11d48)](SKILL.md)
[![Node CLI](https://img.shields.io/badge/3_个独立工具-Node.js_标准库-0f766e)](#三个可以独立运行的小工具)
[![License](https://img.shields.io/badge/License-MIT-2563eb)](LICENSE)

[开始使用](#三步开始) · [实际输出](#一分钟看懂分镜与防串味编译) · [六种模式](#六种模式一套片场) · [独立工具](#三个可以独立运行的小工具) · [完整样例](#检入仓库的完整样例包) · [生成边界](#生成边界与说明) · [English](#english)

</div>

直接对视频模型写一句「生成一个可爱的 Roblox 小人喝咖啡」，通常会遇到四种翻车：长出真人五指、脸部突起长出真人鼻子、头顶冒出乐高颗粒，或者切一个镜头衣服就全变了。**方块片场（Roblox Shorts Skill）**由 [`SKILL.md`](SKILL.md)、五份参考手册和三个零依赖 Node.js 小工具组成，把一句话脑洞拆解为几何锁定的角色三视图、9:16 黄金分镜表和适配可灵（Kling）、即梦（Seedance）、海螺（Hailuo）、万相（Wan）、Sora 与 Runway 的图生视频（I2V）提示词包。

![方块片场 5 步工作流：捏人几何锁定、首帧与三视图、9:16 黄金分镜、多模型提示词、防串味与救场](docs/pipeline.svg)

## 一分钟看懂分镜与防串味编译

**示例条件：15 秒竖屏（9:16）、打工人早八闹钟破防模板（`daily-meltdown`）、盲盒高光 PVC 小人（`chibi-blocky`）、目标模型为可灵（`kling`）。** 下表来自仓库脚本实际运行输出：

| 镜头 | 时间段 | 叙事功能 | 单一核心刚体动作（每镜限 1 个动词） | 运镜指令 | 音效与花字卡点 |
| :---: | :---: | --- | --- | --- | --- |
| 01 | `0.0s–3.8s` | Hook / 黄金前3秒 | 从剧烈震动的红色微缩方块闹钟后方猛地探出圆柱体脑袋 | 大特写极速推近 + 轻微震动 | 电子闹钟声 ·「早八人的痛，谁懂？」 |
| 02 | `3.8s–7.5s` | Escalation 1 / 推进 | 右侧刚性方柱手臂沿肩部转轴挥落，C 型夹爪手一巴掌拍扁闹钟 | 中景侧面微距，50mm 浅景深 | 清脆塑料拍击声 ·「再睡五分钟…」 |
| 03 | `7.5s–11.3s` | Escalation 2 / 升级 | 僵硬坐在发光微缩电脑前，双颊浮现蓝色 2D 瀑布流泪贴图条 | 越肩环绕至正面中近景 | 消息提示音 ·「打开电脑：99+ 未读」 |
| 04 | `11.3s–15.0s` | Payoff / 反转收尾 | 躯干沿腰部转轴直挺挺前倾 90 度，圆柱脑袋平拍在微缩键盘上回弹 | 45 度微缩模型固定俯拍（衔接首镜循环） | 经典闷响 Oof! ·「已老实，申请重启」 |

```bash
node scripts/shot_compiler.mjs \
  --template daily-meltdown --duration 15 --engine kling \
  --rig chibi-blocky --lang zh-en
```

脚本同时为每个镜头生成**首帧静态图提示词**、**对应视频模型的动态提示词**与**统一负向防漂移词**。它根据预置的刚体几何锁与短视频留存节奏做确定性编译，不直接调用外部付费视频 API。

## 三步开始

### 1. 安装到 Agent 或克隆运行

将仓库放入本地 Skills 目录（支持 Codex、Claude Code、Cursor 与 GitHub Copilot）：

```bash
git clone https://github.com/yuzhang-zhong/roblox-shorts-skill.git ~/.codex/skills/roblox-shorts-skill
```

若该目录已存在，请在原目录执行 `git pull` 更新。仅试用三个命令行工具时，普通克隆即可：

```bash
git clone https://github.com/yuzhang-zhong/roblox-shorts-skill.git
cd roblox-shorts-skill
node scripts/shot_compiler.mjs --help
```

需要 Node.js 18+；三个脚本仅使用 Node.js 标准库，无需 `npm install` 或 API Key。

### 2. 用一句话脑洞开场

```text
使用 $roblox-shorts-skill。我想做一个 15 秒的小红书爆款风 Roblox 小人短视频，
主题是「和闺蜜出门逛街：精修潮人 vs 呆萌黄皮新手」，打算用即梦生成首帧图、可灵跑图生视频。
请先给我双人角色设定与三视图提示词，再出 4 个镜头的分镜表和中英提示词。
```

### 3. 生成翻车了，直接救场

```text
我刚用可灵跑了一镜「小人端起冰美式喝咖啡」，结果手部长出了五根真人手指，嘴唇也变成了 3D 真人嘴。
帮我定位原因并重写这镜的首帧提示词、动态提示词和负向词。
```

```text
小人走路时脚底一直在地板上打滑像太空步，而且胳膊弯曲得像面条一样，怎么改提示词和机位？
```

## 六种模式，一套片场

| 模式 | 适合什么时候 | 输出什么产物 |
| --- | --- | --- |
| **Avatar · 捏人设定** | 开拍前固定角色外观与材质 | 角色 DNA 设定卡、配色色板、UGC 配饰锁与正/侧/45° 三视图提示词 |
| **Storyboard · 黄金分镜** | 只有主题或文案，还没拆镜头 | 9:16 竖屏三段式分镜表（0–3s 钩子、单动作推进、反转或无缝循环） |
| **Prompt-Compile · 提示词编译** | 需要适配特定视频工具语法 | 针对可灵、即梦、海螺、万相、Sora、Runway 的首帧词 + I2V 动态词 + 负向词 |
| **Rescue · 翻车救场** | 长手指、像乐高、滑步、换装变形 | 5 项防漂移闸门诊断（PASS / WARN / FAIL）与可直接替换的救场提示词 |
| **Remix · 爆款拆解与二创** | 想套用短视频平台高赞剧场结构 | 6 套验证过的短视频剧场模板（打工人破防、双人反差、跑酷故事会、微缩经营等） |
| **Package · 交付归档** | 需要沉淀可复用的剧集资产包 | 包含 `character_card.md`、`storyboard.md` 与 `prompts.json` 的标准目录 |

## 三个可以独立运行的小工具

| 工具 | 做什么 | 不做什么 |
| --- | --- | --- |
| [`avatar_spec.mjs`](scripts/avatar_spec.mjs) | 按角色原型、骨架比例（`r6` / `r15` / `chibi-blocky`）和材质生成角色设定卡与三视图提示词 | 不直接渲染图片或导出 `.rbxm` / `.blend` 模型文件 |
| [`shot_compiler.mjs`](scripts/shot_compiler.mjs) | 按 6 种剧场模板、时长与目标视频模型编译分镜表和首帧 I2V 提示词 | 不连接云端视频平台自动扣费生成视频 |
| [`drift_check.mjs`](scripts/drift_check.mjs) | 检查提示词中的长手指、3D 真人五官、乐高/MC 串味与单镜头动作超载风险并输出重写版 | 不对已渲染的 MP4 视频文件做计算机视觉逐帧检测 |

<details>
<summary>展开查看捏人三视图生成与翻车体检命令演示</summary>

生成盲盒潮玩风角色设定卡与三视图提示词（支持 Midjourney / Flux / 即梦 / GPT-4o Image）：

```bash
node scripts/avatar_spec.mjs \
  --archetype chibi-plush --rig chibi-blocky --material glossy-vinyl \
  --name "Momo" --lang zh-en
```

对容易翻车的草稿提示词做防串味体检（故意包含 `girl`、`five fingers` 与连续多个动作词）：

```bash
node scripts/drift_check.mjs \
  --prompt "A cute Roblox girl walks into the room then sits down and drinks coffee with five fingers" \
  --engine kling --mode t2v --lang zh-en
```

运行仓库完整性校验与自动化测试：

```bash
node scripts/validate_skill.mjs
node --test tests/run_tests.mjs
```

</details>

## 检入仓库的完整样例包

[`examples/monday-alarm-meltdown/`](examples/monday-alarm-meltdown/) 检入了一套由本仓库脚本实际生成的 15 秒竖屏短片产物包《周一早八闹钟破防记》：

- [角色 DNA 与三视图设定卡 (`character_card.md`)](examples/monday-alarm-meltdown/character_card.md)
- [4 镜头黄金分镜与可灵 I2V 提示词 (`storyboard.md`)](examples/monday-alarm-meltdown/storyboard.md)
- [结构化提示词数据 (`prompts.json`)](examples/monday-alarm-meltdown/prompts.json)

## 生成边界与说明

- **首帧图生视频（I2V）优先于纯文生视频（T2V）。** 多镜头短视频如果要保持同一个 Roblox 小人的衣服、帽子和 2D 贴图五官不变，应先用 `avatar_spec.mjs` 生成角色三视图，固定各镜头首帧图片后再送入视频模型。
- **单镜头单动作限制。** 当前主流视频生成模型在单个 4 至 5 秒片段内只能稳定完成 1 个主要肢体动作和 1 次运镜。连续动作请拆分为多个分镜。
- **独立开源提示词工程工具。** 本仓库提供提示词工程规范、分镜模板与本地命令行辅助脚本，与 Roblox Corporation 无官方隶属或背书关系。

## 按需要阅读

- [Skill 核心规则与六种模式 (`SKILL.md`)](SKILL.md)
- [骨架比例、C 型手与四类潮玩材质规范 (`references/avatar-geometry-and-materials.md`)](references/avatar-geometry-and-materials.md)
- [可灵、即梦、海螺、万相、Sora、Runway 提示词手册 (`references/model-prompt-playbook.md`)](references/model-prompt-playbook.md)
- [八大翻车症状（长手指/乐高颗粒/滑步/面条手）救场指南 (`references/rescue-and-anti-drift.md`)](references/rescue-and-anti-drift.md)
- [竖屏黄金前 3 秒钩子、微距布光与音效卡点 (`references/short-video-beats-and-audio.md`)](references/short-video-beats-and-audio.md)
- [六大短视频平台爆款剧场模板库 (`references/viral-archetypes-catalog.md`)](references/viral-archetypes-catalog.md)

## English

Roblox Shorts Skill (`roblox-shorts-skill`) helps creators build viral 9:16 Roblox-style blocky character shorts without anatomy drift. Naive video prompts often cause diffusion models to generate human fingers, realistic noses, Lego top studs, or Minecraft voxel blocks. This skill locks seven geometric invariants (rig proportions, fingerless C-shaped hands, flat 2D decal faces, studless chamfered plastic shaders, rigid hinge joints, single-action clip budgets, and First-Frame I2V anchors) across six production modes and three zero-dependency Node.js CLI tools. See the [full English README](README.en.md).
