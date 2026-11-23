<div align="center">

<img src="../../assets/icon.svg" alt="roblox-style-skill" width="112" />

# roblox-style-skill

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · **繁體中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

產生標準 Roblox R6 與盲盒方塊比例的 9:16 直式短影音分鏡、角色三視圖設定與多模型提示詞。

</div>

直接讓影片模型產生「可愛的 Roblox 小人」，或在提示詞寫入 `C-shaped claw hands`，畫面常出現四種走樣：長出五根真人手指、變成帶 C 型鉤爪與頭頂圓凸粒的樂高小人、退化成《Minecraft》直角像素塊，或雙腿分開穿上運動鞋。`roblox-style-skill` 在產生動畫前先鎖定標準 Roblox Studio 幾何比例：`2×2×1` 寬扁軀幹、並攏且與軀幹同寬的 `1×2×1` 實心方腿、無手指無鉤爪的 `1×2×1` 平頭方手、`1:1` 上下圓角桶狀頭、腳下 `Studs` 方格底板與頭頂 `BillboardGui` 對話氣泡。

![工作流概覽](../pipeline.svg)

## 效果預覽與 6 組短片範例

| 角色三視圖設定卡 (`0° / 45° / 90°`) | 防走樣幾何對比 (`× 走樣` vs. `✓ 標準 R6`) |
| :---: | :---: |
| <img src="../../assets/showcase/momo_turnaround_sheet.zh.png" width="410" alt="Turnaround" /> | <img src="../../assets/showcase/drift_rescue_comparison.zh.png" width="410" alt="Drift check" /> |

儲存庫腳本產生的 6 組 9:16 直式短片範例（涵蓋 6 種劇場模板與 6 款影片模型）：

| 01 · 週一鬧鐘破防 (`Kling`) | 02 · 天空跑酷闖關 (`Hailuo`) | 03 · 潮人與新手 (`Seedance`) |
| :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="165" alt="Case 01" /> | <img src="../../examples/obby-sky-run/assets/obby_sky_run.gif" width="165" alt="Case 02" /> | <img src="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="165" alt="Case 03" /> |
| [分鏡表](../../examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.zh.png) · [MP4](../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [目錄](../../examples/monday-alarm-meltdown/) | [分鏡表](../../examples/obby-sky-run/assets/obby_storyboard_sheet.zh.png) · [MP4](../../examples/obby-sky-run/assets/obby_sky_run.mp4) · [目錄](../../examples/obby-sky-run/) | [分鏡表](../../examples/duo-bestie-contrast/assets/duo_storyboard_sheet.zh.png) · [MP4](../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [目錄](../../examples/duo-bestie-contrast/) |
| **04 · 微縮甜點小店 (`Wan`)** | **05 · 走秀卡點換裝 (`Sora`)** | **06 · 烤焦披薩翻車 (`Runway`)** |
| <img src="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="165" alt="Case 04" /> | <img src="../../examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="165" alt="Case 05" /> | <img src="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="165" alt="Case 06" /> |
| [分鏡表](../../examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.zh.png) · [MP4](../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [目錄](../../examples/cozy-cafe-tycoon/) | [分鏡表](../../examples/runway-outfit-drop/assets/runway_storyboard_sheet.zh.png) · [MP4](../../examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [目錄](../../examples/runway-outfit-drop/) | [分鏡表](../../examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.zh.png) · [MP4](../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [目錄](../../examples/burnt-pizza-slapstick/) |

## Roblox 經典角色、服飾與表情素材庫

內建於 [`assets/library/`](../../assets/library/catalog.json) 與 [`references/classic-roblox-catalog.md`](../../references/classic-roblox-catalog.md)（[角色全覽](../../assets/showcase/classic_avatars_lineup.zh.png) · [表情全覽](../../assets/showcase/classic_faces_atlas.zh.png)）：

| Classic Noob | Classic Guest | Bacon Hair | Builderman | Speedrunner | Story Hoodie |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/avatars/avatar_noob.png" width="115" alt="Noob" /> | <img src="../../assets/library/avatars/avatar_guest.png" width="115" alt="Guest" /> | <img src="../../assets/library/avatars/avatar_bacon.png" width="115" alt="Bacon" /> | <img src="../../assets/library/avatars/avatar_builderman.png" width="115" alt="Builderman" /> | <img src="../../assets/library/avatars/avatar_obby.png" width="115" alt="Speedrunner" /> | <img src="../../assets/library/avatars/avatar_theo.png" width="115" alt="Story Hoodie" /> |

| `Smile :)` | `Chill -_-` | `Check It` | `Grin :D` | `Shocked` | `Tears` | `Bloxxer` | `KO X_X` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/faces/face_smile.png" width="82" alt="Smile" /> | <img src="../../assets/library/faces/face_deadpan.png" width="82" alt="Chill" /> | <img src="../../assets/library/faces/face_smirk.png" width="82" alt="Check It" /> | <img src="../../assets/library/faces/face_grin.png" width="82" alt="Grin" /> | <img src="../../assets/library/faces/face_shocked.png" width="82" alt="Shocked" /> | <img src="../../assets/library/faces/face_tears.png" width="82" alt="Tears" /> | <img src="../../assets/library/faces/face_angry.png" width="82" alt="Bloxxer" /> | <img src="../../assets/library/faces/face_dizzy.png" width="82" alt="KO" /> |

## 快速開始

複製到本機 Skills 目錄（支援 Claude Code、Codex、Cursor 與 GitHub Copilot）：

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-skill.git ~/.codex/skills/roblox-style-skill
```

在對話中呼叫 `$roblox-style-skill`：

```text
使用 $roblox-style-skill 規劃一支 15 秒 9:16 直式短片，主題是「和好友逛街：Y2K 潮人 vs 呆萌黃皮新手」，
請提供雙人角色設定卡、三視圖提示詞與 4 鏡頭 Kling I2V 分鏡表。
```

## 命令列工具

四個腳本皆基於 Node.js 18+ 標準庫執行，無第三方相依套件：

| 腳本 | 用途 |
| --- | --- |
| [`scripts/avatar_spec.mjs`](../../scripts/avatar_spec.mjs) | 產生角色 DNA 設定卡（`BrickColor` 色號、`2×2×1`/`1×2×1` 比例鎖）與三視圖提示詞 |
| [`scripts/shot_compiler.mjs`](../../scripts/shot_compiler.mjs) | 編譯 9:16 分鏡表與對應 `kling`、`seedance`、`hailuo`、`wan`、`sora`、`runway` 的提示詞 |
| [`scripts/drift_check.mjs`](../../scripts/drift_check.mjs) | 檢查真人五指、樂高鉤爪、頭頂凸粒與單鏡多動作超載問題，輸出修正提示詞 |
| [`scripts/render_preview.mjs`](../../scripts/render_preview.mjs) | 本機算繪 3D 角色三視圖、對比圖、分鏡表與 `.gif` / `.mp4` 預覽短片 |

```bash
node scripts/avatar_spec.mjs --archetype corporate-worker --rig chibi-blocky --material smooth-plastic --name "Momo" --lang zh-tw
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang zh-tw
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang zh-tw
```

## 文件與多語言支援

Agent 回覆與命令列 `--lang` 參數支援 10 種語言：`en`、`zh`、`zh-tw`、`ja`、`ko`、`es`、`fr`、`de`、`pt`、`ru`。每個 4 至 5 秒片段只安排一個核心動作，多鏡頭短片請先以三視圖固定首幀。獨立開源專案，與 Roblox Corporation 無關。

- [Skill 工作流說明 (`SKILL.md`)](../../SKILL.md)
- [方塊比例、貼圖五官與材質規範 (`references/avatar-geometry-and-materials.md`)](../../references/avatar-geometry-and-materials.md)
- [多模型提示詞寫法 (`references/model-prompt-playbook.md`)](../../references/model-prompt-playbook.md)
- [常見走樣問題與修補清單 (`references/rescue-and-anti-drift.md`)](../../references/rescue-and-anti-drift.md)
- [9:16 直式節奏、布光與音效卡點 (`references/short-video-beats-and-audio.md`)](../../references/short-video-beats-and-audio.md)
- [六組短片分鏡模板 (`references/viral-archetypes-catalog.md`)](../../references/viral-archetypes-catalog.md)
