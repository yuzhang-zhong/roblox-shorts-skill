<div align="center">

# Roblox Style Video Skill

Claude Code・Cursor・GitHub Copilot・Codex 向けの **Agent Skill**（`SKILL.md` + リファレンスガイド + 依存関係ゼロの CLI ツール）。R6 ブロックアバターの比率固定、9:16 縦型ショート動画の 4 カット構成、モデル別プロンプト生成、ローカル 3D プレビューを一貫して行います。

[![Agent Skill](https://img.shields.io/badge/Agent_Skill-SKILL.md-0f172a?style=flat-square)](../../skills/roblox-style-video/SKILL.md)
[![CLI は Node.js 18+ 対応](https://img.shields.io/badge/Node.js-18%2B-268354?style=flat-square)](#skill-ワークフローとクイックスタート)
[![MIT License](https://img.shields.io/badge/License-MIT-2563eb?style=flat-square)](../../LICENSE)

**[動画サンプル](#動画サンプル)** · [シーンボードと尺配分](#シーンボードとカット割り) · [ワークフローと導入](#skill-ワークフローとクイックスタート) · [Skill ガイド](../../skills/roblox-style-video/SKILL.md)

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

</div>

## 動画サンプル

AI コーディングエージェントから呼び出すと、アイデアを 12 種類の定番ストーリーフォーマットに沿った 15 秒・4 カットの縦型（`9:16`）パッケージへ変換します。以下の **4 秒 MP4** と GIF は同梱の `scripts/render_preview.mjs` でオフライン描画した 3D アニマティクスで、外部の動画生成モデルでクレジットを消費する前に R6 比率・マルチパーツ小物・カメラワーク・頭上の `BillboardGui` チャット吹き出しを確認できます。

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

## シーンボードとカット割り

4〜5 秒の単一クリップに複数の連続動作を詰め込むと、ブロック状の剛体手足がゴムのように曲がりやすくなります。各ショート動画は「1 カット 1 アクション」の 4 ビート（`0–3.5s` フック、展開 2 カット、`11.5–15s` オチまたはループ復帰）に分割しています：

| Shot 01 · フック (`0–3.5s`) | Shot 02 · アクション (`3.5–7.5s`) | Shot 03 · 展開 (`7.5–11.5s`) | Shot 04 · ループ (`11.5–15s`) |
| :---: | :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/shot_01_hook.png" width="196" alt="Shot 01: alarm clock hook" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_02_slam.png" width="196" alt="Shot 02: right block arm slams clock" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_03_tears.png" width="196" alt="Shot 03: waterfall tears before laptop" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_04_faceplant.png" width="196" alt="Shot 04: 90-degree rigid waist flop" /> |

6 つの定番ゲームジャンル別の 4 カット絵コンテシート（カメラ切り替えと英語チャット吹き出し付き）：

| 02 · Sky Obby (`Hailuo` · Speed Coil & Killbrick) | 08 · Brookhaven Police Chase (`Hailuo` · ストリート追跡) |
| :---: | :---: |
| <a href="../../examples/obby-sky-run/"><img src="../../examples/obby-sky-run/assets/obby_storyboard_sheet.en.png" width="410" alt="Sky Obby 4-shot storyboard sheet" /></a> | <a href="../../examples/brookhaven-police-chase/"><img src="../../examples/brookhaven-police-chase/assets/chase_storyboard_sheet.en.png" width="410" alt="Brookhaven Police Chase 4-shot storyboard sheet" /></a> |
| **07 · Natural Disaster Tower (`Kling` · 竜巻サバイバル)** | **09 · Doors Hotel Hallway (`Sora` · 懐中電灯と点滅廊下)** |
| <a href="../../examples/disaster-tower-tornado/"><img src="../../examples/disaster-tower-tornado/assets/tornado_storyboard_sheet.en.png" width="410" alt="Natural Disaster Tornado Tower 4-shot storyboard sheet" /></a> | <a href="../../examples/doors-flashlight-hallway/"><img src="../../examples/doors-flashlight-hallway/assets/doors_storyboard_sheet.en.png" width="410" alt="Doors Hotel Hallway 4-shot storyboard sheet" /></a> |
| **10 · Crossroads Sword Duel (`Seedance` · 溶岩石橋の剣対決)** | **12 · Red Light Freeze (`Runway` · だるまさんがころんだ)** |
| <a href="../../examples/crossroads-sword-duel/"><img src="../../examples/crossroads-sword-duel/assets/sword_storyboard_sheet.en.png" width="410" alt="Crossroads Sword Duel 4-shot storyboard sheet" /></a> | <a href="../../examples/red-light-freeze/"><img src="../../examples/red-light-freeze/assets/redlight_storyboard_sheet.en.png" width="410" alt="Red Light Freeze 4-shot storyboard sheet" /></a> |

## Skill ワークフローとクイックスタート

<p align="center">
  <img src="../../docs/pipeline.en.svg" width="860" alt="Five-step Roblox Style Video Skill workflow" />
</p>

### Agent Skill として導入する

GitHub の公式 Skill コマンドでインストールできます。自己完結型パッケージは [`skills/roblox-style-video/`](../../skills/roblox-style-video/) にあり、エントリポイントは [`SKILL.md`](../../skills/roblox-style-video/SKILL.md) です。

```bash
gh skill install yuzhang-zhong/roblox-style-video roblox-style-video
```

チャットから `roblox-style-video` スキルを呼び出します：

```text
$roblox-style-video を使って、薄暗いホテル廊下（doors-horror）を舞台にした 15 秒・9:16 のショート動画を設計して：
青いパーカーの R6 アバターが懐中電灯で 050 号室のドアを照らした瞬間に照明が点滅し、背後に白い目が現れてクローゼットに隠れる構成。
キャラクター形状ロック、4 カットの絵コンテ、Sora / Kling 用の I2V プロンプトを出して。
```

### 同梱 CLI ツールを直接実行する

リポジトリ直下から Node.js 18+ 標準ライブラリのみで実行できます（`npm install` や API キーは不要です）。

```bash
node scripts/shot_compiler.mjs --template brookhaven-chase --duration 15 --engine hailuo --rig r6 --lang ja
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang ja
node scripts/render_preview.mjs --only tornado,chase,doors
```

## Skill スクリプト・形状崩れチェック・リファレンス

曖昧なプロンプトでは、人間の 5 本指、レゴ風の C 字ハンドや床の丸ポッチ、マイクラ風のボクセル頭が混入しがちです。本 Skill は標準的なブロック R6 比率（`2x2x1` 胴体、隙間なく並ぶ `1x2x1` 脚、指のない角柱ハンド、`1:1` バレル頭部、フラットな床材とマルチパーツ小物）を固定し、`drift_check.mjs` で生成前にスタイル崩れを検出します：

<p align="center">
  <img src="../../assets/showcase/drift_rescue_comparison.en.png" width="760" alt="Geometry check comparing human fingers, Lego C-claws, and voxel heads against locked blocky R6 proportions" />
</p>

| Skill コンポーネント | 出力内容 |
| --- | --- |
| [`SKILL.md`](../../skills/roblox-style-video/SKILL.md) | Agent Skill のエントリ定義。6 つの制作モード（`Avatar` / `Storyboard` / `Prompt-Compile` / `Rescue` / `Remix` / `Render`）と 8 つの形状ルールを規定。 |
| [`shot_compiler.mjs`](../../scripts/shot_compiler.mjs) | 12 種類のストーリーテンプレートから、Kling・Seedance・Hailuo・Wan・Sora・Runway 向けの 9:16 絵コンテと I2V/T2V プロンプトを生成。 |
| [`avatar_spec.mjs`](../../scripts/avatar_spec.mjs) | `BrickColor` コード・比率ロック付きのキャラクター DNA カードと、[三面図シート](../../assets/showcase/momo_turnaround_sheet.en.png)用プロンプトを生成。 |
| [`drift_check.mjs`](../../scripts/drift_check.mjs) | 5 本指の生成、レゴ風パーツ、ブランドロゴ混入、1 カット内の動作過多を診断し、修正済みプロンプトを出力。 |
| [`render_preview.mjs`](../../scripts/render_preview.mjs) | 3D 絵コンテシート、比較ボード、GIF、MP4 アニマティクスをオフライン描画（Windows 合成は PowerShell `System.Drawing` と `ffmpeg` を使用）。 |

[アバター形状とマテリアル](../../references/avatar-geometry-and-materials.md) · [定番ギア・小物カタログ](../../references/classic-roblox-catalog.md) · [モデル別プロンプト集](../../references/model-prompt-playbook.md) · [スタイル崩れ対策](../../references/rescue-and-anti-drift.md) · [カット割りと効果音](../../references/short-video-beats-and-audio.md) · [12 種類のストーリーテンプレート](../../references/viral-archetypes-catalog.md)

## 対応言語

Agent Skill の応答および CLI の `--lang` オプションは `en`・`zh`・`zh-tw`・`ja`・`ko`・`es`・`fr`・`de`・`pt`・`ru` の 10 言語に対応しています。

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

[MIT License](../../LICENSE)。独自の三角形エンブレムを使用した独立オープンソースの Agent Skill であり、Roblox Corporation とは提携・関係していません。
