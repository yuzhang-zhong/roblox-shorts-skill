<p><img src="../../assets/icon.svg" width="80" height="80" alt="" /></p>

# roblox-style-video

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

9:16 세로형 Roblox 스타일 쇼츠 영상을 설계하기 위한 Agent Skill 및 Node.js CLI 도구입니다. 비디오 모델에 막연히 'Roblox 캐릭터'라고만 입력하거나 `C-shaped claw hands`를 넣으면 사람 손가락 다섯 개, 레고 C자 집게손과 머리 스터드, 마인크래프트 복셀 큐브, 벌어진 다리와 운동화로 왜곡되기 쉽습니다. `roblox-style-video`는 표준 Roblox Studio 비율(`2x2x1` 몸통, 밀착된 `1x2x1` 다리, 손가락 없는 통짜 블록 손, `1:1` 둥근 원통형 머리와 평면 2D 데칼 얼굴, `Studs` 바닥판)을 고정하고 Kling, Seedance, Hailuo, Wan, Sora, Runway용 프롬프트와 로컬 3D 프리뷰를 생성합니다.

## 빠른 시작

로컬 Skills 디렉터리에 클론합니다 (Codex, Claude Code, Cursor, GitHub Copilot 호환):

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-video.git ~/.codex/skills/roblox-style-video
```

에이전트에서 `$roblox-style-video` 호출:

```text
$roblox-style-video 를 사용해 Y2K 스트릿 패션 아바타와 노란 Classic Noob 친구가 쇼핑하는
15초 분량 9:16 쇼츠를 기획해 줘. 캐릭터 카드, 3면도 프롬프트, 4컷 Kling I2V 콘티를 만들어 줘.
```

일반 클론 후 CLI 스크립트를 바로 실행할 수도 있습니다 (Node.js 18+ 표준 라이브러리만 사용, `npm install` 및 API 키 불필요):

```bash
node scripts/avatar_spec.mjs --archetype corporate-worker --rig chibi-blocky --material smooth-plastic --name "Momo" --lang ko
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang ko
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang ko
```

## 예제 및 로컬 3D 프리뷰

저장소의 `.png`, `.gif`, `.mp4` 파일은 외부 비디오 모델 크레딧을 쓰기 전에 R6 비율과 구도, 머리 위 채팅 말풍선을 확인하기 위해 `scripts/render_preview.mjs`로 로컬 렌더링한 3D 프리뷰입니다.

| 3면도 R6 시트 (`0° / 45° / 90°`) | 기하 왜곡 점검 (`FAIL` vs. `PASS`) |
| :---: | :---: |
| <img src="../../assets/showcase/momo_turnaround_sheet.en.png" width="380" alt="Turnaround sheet" /> | <img src="../../assets/showcase/drift_rescue_comparison.en.png" width="380" alt="Geometry drift check" /> |

6가지 스토리 템플릿과 비디오 엔진의 예제입니다. 스토리보드는 15초(`9:16`, 4컷) 분량이며, 각 MP4는 4초짜리 로컬 미리보기입니다.

| 01 · 월요일 알람 (`Kling`) | 02 · 스카이 오비 (`Hailuo`) | 03 · Y2K vs. 뉴비 (`Seedance`) |
| :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="155" alt="Case 01" /> | <img src="../../examples/obby-sky-run/assets/obby_sky_run.gif" width="155" alt="Case 02" /> | <img src="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="155" alt="Case 03" /> |
| [콘티](../../examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.en.png) · [MP4](../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [파일](../../examples/monday-alarm-meltdown/) | [콘티](../../examples/obby-sky-run/assets/obby_storyboard_sheet.en.png) · [MP4](../../examples/obby-sky-run/assets/obby_sky_run.mp4) · [파일](../../examples/obby-sky-run/) | [콘티](../../examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png) · [MP4](../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [파일](../../examples/duo-bestie-contrast/) |
| **04 · 미니 카페 (`Wan`)** | **05 · 런웨이 변신 (`Sora`)** | **06 · 탄 피자 (`Runway`)** |
| <img src="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="155" alt="Case 04" /> | <img src="../../examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="155" alt="Case 05" /> | <img src="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="155" alt="Case 06" /> |
| [콘티](../../examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.en.png) · [MP4](../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [파일](../../examples/cozy-cafe-tycoon/) | [콘티](../../examples/runway-outfit-drop/assets/runway_storyboard_sheet.en.png) · [MP4](../../examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [파일](../../examples/runway-outfit-drop/) | [콘티](../../examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.en.png) · [MP4](../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [파일](../../examples/burnt-pizza-slapstick/) |

## CLI 스크립트, 제약 사항 및 문서

- [`scripts/avatar_spec.mjs`](../../scripts/avatar_spec.mjs): 캐릭터 DNA 카드(`BrickColor` 팔레트, `2x2x1` / `1x2x1` 비율 잠금) 및 3면도 프롬프트 생성.
- [`scripts/shot_compiler.mjs`](../../scripts/shot_compiler.mjs): `kling`, `seedance`, `hailuo`, `wan`, `sora`, `runway`용 9:16 콘티와 I2V/T2V 프롬프트 컴파일.
- [`scripts/drift_check.mjs`](../../scripts/drift_check.mjs): 사람 손가락, 레고 집게손, 복셀 머리, 동작 과부하를 점검하고 수정 프롬프트 출력.
- [`scripts/render_preview.mjs`](../../scripts/render_preview.mjs): 로컬 3D 3면도, 비교 보드, 콘티 시트 및 `.gif` / `.mp4` 프리뷰 렌더링.

4~5초 클립당 주요 동작은 1개로 제한하고, 다중 컷 I2V 제작 전 3면도로 첫 프레임을 고정하세요. 에이전트 응답과 `--lang` 옵션은 10개 언어(`en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt`, `ru`)를 지원합니다. [MIT License](../../LICENSE) 기반 독립 오픈소스이며 Roblox Corporation과 무관합니다.

- [`SKILL.md`](../../SKILL.md)
- [`references/avatar-geometry-and-materials.md`](../../references/avatar-geometry-and-materials.md)
- [`references/model-prompt-playbook.md`](../../references/model-prompt-playbook.md)
- [`references/rescue-and-anti-drift.md`](../../references/rescue-and-anti-drift.md)
- [`references/short-video-beats-and-audio.md`](../../references/short-video-beats-and-audio.md) · [`references/viral-archetypes-catalog.md`](../../references/viral-archetypes-catalog.md)
