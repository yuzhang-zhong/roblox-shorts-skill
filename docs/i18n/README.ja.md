<div align="center">

<img src="../../assets/icon.svg" alt="roblox-style-skill" width="112" />

# roblox-style-skill

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

Roblox R6・ブロッキーアバターの比率を固定し、9:16 縦型ショート動画の絵コンテとモデル別プロンプトを生成するスキル。

</div>

動画生成 AI に「かわいい Roblox キャラ」とだけ指示したり、`C-shaped claw hands` と書いたりすると、人間の5本指、レゴのC字フック手や頭頂部ポッチ、マインクラフト風ボクセル、隙間のある細い脚とスニーカーに崩れがちです。`roblox-style-skill` は動画化の前段階で Roblox Studio の標準比率（`2x2x1` の胴体、隙間なく並ぶ `1x2x1` の脚、指や爪のない `1x2x1` のブロック手、`1:1` の丸みのある円筒ヘッドと平面 2D デカール顔、`SmoothPlastic` 素材と `Studs` ベースプレート、頭上の `BillboardGui` チャット吹き出し）を固定します。

![ワークフロー概要](../pipeline.svg)

## ビジュアルプレビュー & 6つのショート動画例

| 3面図リファレンス (`0° / 45° / 90°`) | 形状崩れチェック (`FAIL` vs. `PASS`) |
| :---: | :---: |
| <img src="../../assets/showcase/momo_turnaround_sheet.en.png" width="410" alt="Turnaround" /> | <img src="../../assets/showcase/drift_rescue_comparison.en.png" width="410" alt="Drift check" /> |

6種類のテンプレートと6つの動画生成モデルに対応する 9:16 ショート動画パッケージ：

| 01 · 月曜アラーム (`Kling`) | 02 · スカイアスレ (`Hailuo`) | 03 · Y2K vs. Noob (`Seedance`) |
| :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="165" alt="Case 01" /> | <img src="../../examples/obby-sky-run/assets/obby_sky_run.gif" width="165" alt="Case 02" /> | <img src="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="165" alt="Case 03" /> |
| [絵コンテ](../../examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.en.png) · [MP4](../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [構成](../../examples/monday-alarm-meltdown/) | [絵コンテ](../../examples/obby-sky-run/assets/obby_storyboard_sheet.en.png) · [MP4](../../examples/obby-sky-run/assets/obby_sky_run.mp4) · [構成](../../examples/obby-sky-run/) | [絵コンテ](../../examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png) · [MP4](../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [構成](../../examples/duo-bestie-contrast/) |
| **04 · カフェ経営 (`Wan`)** | **05 · ランウェイ変身 (`Sora`)** | **06 · 黒焦げピザ (`Runway`)** |
| <img src="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="165" alt="Case 04" /> | <img src="../../examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="165" alt="Case 05" /> | <img src="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="165" alt="Case 06" /> |
| [絵コンテ](../../examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.en.png) · [MP4](../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [構成](../../examples/cozy-cafe-tycoon/) | [絵コンテ](../../examples/runway-outfit-drop/assets/runway_storyboard_sheet.en.png) · [MP4](../../examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [構成](../../examples/runway-outfit-drop/) | [絵コンテ](../../examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.en.png) · [MP4](../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [構成](../../examples/burnt-pizza-slapstick/) |

## 定番 Roblox アバター・衣装・表情ライブラリ

[`assets/library/`](../../assets/library/catalog.json) と [`references/classic-roblox-catalog.md`](../../references/classic-roblox-catalog.md) に収録（[アバター一覧](../../assets/showcase/classic_avatars_lineup.en.png) · [表情一覧](../../assets/showcase/classic_faces_atlas.en.png)）：

| Classic Noob | Classic Guest | Bacon Hair | Builderman | Speedrunner | Story Hoodie |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/avatars/avatar_noob.png" width="115" alt="Noob" /> | <img src="../../assets/library/avatars/avatar_guest.png" width="115" alt="Guest" /> | <img src="../../assets/library/avatars/avatar_bacon.png" width="115" alt="Bacon" /> | <img src="../../assets/library/avatars/avatar_builderman.png" width="115" alt="Builderman" /> | <img src="../../assets/library/avatars/avatar_obby.png" width="115" alt="Speedrunner" /> | <img src="../../assets/library/avatars/avatar_theo.png" width="115" alt="Story Hoodie" /> |

| `Smile :)` | `Chill -_-` | `Check It` | `Grin :D` | `Shocked` | `Tears` | `Bloxxer` | `KO X_X` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/faces/face_smile.png" width="82" alt="Smile" /> | <img src="../../assets/library/faces/face_deadpan.png" width="82" alt="Chill" /> | <img src="../../assets/library/faces/face_smirk.png" width="82" alt="Check It" /> | <img src="../../assets/library/faces/face_grin.png" width="82" alt="Grin" /> | <img src="../../assets/library/faces/face_shocked.png" width="82" alt="Shocked" /> | <img src="../../assets/library/faces/face_tears.png" width="82" alt="Tears" /> | <img src="../../assets/library/faces/face_angry.png" width="82" alt="Bloxxer" /> | <img src="../../assets/library/faces/face_dizzy.png" width="82" alt="KO" /> |

## クイックスタート

ローカルの Skills ディレクトリにクローンします（Claude Code、Codex、Cursor、GitHub Copilot 対応）：

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-skill.git ~/.codex/skills/roblox-style-skill
```

エージェントで `$roblox-style-skill` を呼び出します：

```text
$roblox-style-skill を使って、Y2K ストリート系アバターとクラシック Noob が買い物に行く
15秒の 9:16 ショート動画を企画して。キャラ設定カード、三面図プロンプト、Kling I2V 用の4カット絵コンテを出して。
```

## CLI ツール

4 つのスクリプトは Node.js 18+ 標準ライブラリのみで動作します：

| スクリプト | 役割 |
| --- | --- |
| [`scripts/avatar_spec.mjs`](../../scripts/avatar_spec.mjs) | キャラクター DNA カード（`BrickColor`、`2x2x1`/`1x2x1` 比率）と三面図プロンプトを生成 |
| [`scripts/shot_compiler.mjs`](../../scripts/shot_compiler.mjs) | 9:16 絵コンテと `kling`、`seedance`、`hailuo`、`wan`、`sora`、`runway` 向けプロンプトを出力 |
| [`scripts/drift_check.mjs`](../../scripts/drift_check.mjs) | 人間の指・レゴ爪・ボクセル化・動作過多を検査し、修正プロンプトを出力 |
| [`scripts/render_preview.mjs`](../../scripts/render_preview.mjs) | 三面図、比較ボード、絵コンテシート、`.gif` / `.mp4` プレビューをローカル描画 |

```bash
node scripts/avatar_spec.mjs --archetype corporate-worker --rig chibi-blocky --material smooth-plastic --name "Momo" --lang ja
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang ja
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang ja
```

## ドキュメントと対応言語

エージェント応答と CLI の `--lang` オプションは 10 言語（`en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, `ru`）に対応しています。4〜5秒のクリップにつき主要アクションは1つに絞り、マルチショット制作時は三面図から開始フレームを固定してください。本プロジェクトは独立したオープンソースツールであり、Roblox Corporation とは無関係です。

- [コアワークフロー (`SKILL.md`)](../../SKILL.md)
- [アバター比率・顔デカール・マテリアル (`references/avatar-geometry-and-materials.md`)](../../references/avatar-geometry-and-materials.md)
- [モデル別プロンプトガイド (`references/model-prompt-playbook.md`)](../../references/model-prompt-playbook.md)
- [破綻診断と修正パッチ (`references/rescue-and-anti-drift.md`)](../../references/rescue-and-anti-drift.md)
- [9:16 テンポ・照明・効果音 (`references/short-video-beats-and-audio.md`)](../../references/short-video-beats-and-audio.md)
- [ショート動画テンプレート集 (`references/viral-archetypes-catalog.md`)](../../references/viral-archetypes-catalog.md)
