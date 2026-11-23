<div align="center">

<img src="../../assets/icon.svg" alt="roblox-style-skill" width="112" />

# roblox-style-skill

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · **Русский**

Создание коротких вертикальных видео 9:16 с блочными аватарами в стиле Roblox R6, точными пропорциями stud, раскадровками и промптами под конкретные видеомодели.

</div>

Если просто запросить у видеомодели «милого персонажа Roblox с кофе» или указать `C-shaped claw hands`, генерация обычно уходит в одну из четырёх ошибок: появляются пять человеческих пальцев, руки-клешни и верхний штырёк как у Lego, угловатые воксели Minecraft или раздельные ноги в кроссовках. `roblox-style-skill` фиксирует стандартную геометрию Roblox Studio до анимации: прямоугольный торс `2x2x1`, две плотно прижатые ноги-блока `1x2x1` по ширине торса, цельные блочные руки `1x2x1` без пальцев и клешней, цилиндрическая голова `1:1` со скруглёнными фасками и плоским 2D-лицом, материал `SmoothPlastic` на плите `Studs` и облачка чата `BillboardGui`.

![Схема пайплайна](../pipeline.svg)

## Визуальное превью и 6 примеров 9:16 роликов

| Лист 3 ракурсов R6 (`0° / 45° / 90°`) | Проверка геометрии (`FAIL` vs. `PASS`) |
| :---: | :---: |
| <img src="../../assets/showcase/momo_turnaround_sheet.en.png" width="410" alt="Turnaround" /> | <img src="../../assets/showcase/drift_rescue_comparison.en.png" width="410" alt="Drift check" /> |

Шесть вертикальных 9:16 пакетов для всех 6 сюжетных шаблонов и 6 видеомоделей:

| 01 · Будильник (`Kling`) | 02 · Sky Obby (`Hailuo`) | 03 · Y2K vs. Нуб (`Seedance`) |
| :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.gif" width="165" alt="Case 01" /> | <img src="../../examples/obby-sky-run/assets/obby_sky_run.gif" width="165" alt="Case 02" /> | <img src="../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.gif" width="165" alt="Case 03" /> |
| [Раскадровка](../../examples/monday-alarm-meltdown/assets/storyboard_contact_sheet.en.png) · [MP4](../../examples/monday-alarm-meltdown/assets/monday_alarm_meltdown.mp4) · [Пакет](../../examples/monday-alarm-meltdown/) | [Раскадровка](../../examples/obby-sky-run/assets/obby_storyboard_sheet.en.png) · [MP4](../../examples/obby-sky-run/assets/obby_sky_run.mp4) · [Пакет](../../examples/obby-sky-run/) | [Раскадровка](../../examples/duo-bestie-contrast/assets/duo_storyboard_sheet.en.png) · [MP4](../../examples/duo-bestie-contrast/assets/duo_bestie_contrast.mp4) · [Пакет](../../examples/duo-bestie-contrast/) |
| **04 · Кафе-тайкун (`Wan`)** | **05 · Подиум Y2K (`Sora`)** | **06 · Сгоревшая пицца (`Runway`)** |
| <img src="../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.gif" width="165" alt="Case 04" /> | <img src="../../examples/runway-outfit-drop/assets/runway_outfit_drop.gif" width="165" alt="Case 05" /> | <img src="../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.gif" width="165" alt="Case 06" /> |
| [Раскадровка](../../examples/cozy-cafe-tycoon/assets/cafe_storyboard_sheet.en.png) · [MP4](../../examples/cozy-cafe-tycoon/assets/cozy_cafe_tycoon.mp4) · [Пакет](../../examples/cozy-cafe-tycoon/) | [Раскадровка](../../examples/runway-outfit-drop/assets/runway_storyboard_sheet.en.png) · [MP4](../../examples/runway-outfit-drop/assets/runway_outfit_drop.mp4) · [Пакет](../../examples/runway-outfit-drop/) | [Раскадровка](../../examples/burnt-pizza-slapstick/assets/pizza_storyboard_sheet.en.png) · [MP4](../../examples/burnt-pizza-slapstick/assets/burnt_pizza_slapstick.mp4) · [Пакет](../../examples/burnt-pizza-slapstick/) |

## Классическая библиотека аватаров, одежды и лиц Roblox

Отрендерена в [`assets/library/`](../../assets/library/catalog.json) и [`references/classic-roblox-catalog.md`](../../references/classic-roblox-catalog.md) ([лист аватаров](../../assets/showcase/classic_avatars_lineup.en.png) · [лист эмоций](../../assets/showcase/classic_faces_atlas.en.png)):

| Classic Noob | Classic Guest | Bacon Hair | Builderman | Speedrunner | Story Hoodie |
| :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/avatars/avatar_noob.png" width="115" alt="Noob" /> | <img src="../../assets/library/avatars/avatar_guest.png" width="115" alt="Guest" /> | <img src="../../assets/library/avatars/avatar_bacon.png" width="115" alt="Bacon" /> | <img src="../../assets/library/avatars/avatar_builderman.png" width="115" alt="Builderman" /> | <img src="../../assets/library/avatars/avatar_obby.png" width="115" alt="Speedrunner" /> | <img src="../../assets/library/avatars/avatar_theo.png" width="115" alt="Story Hoodie" /> |

| `Smile :)` | `Chill -_-` | `Check It` | `Grin :D` | `Shocked` | `Tears` | `Bloxxer` | `KO X_X` |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| <img src="../../assets/library/faces/face_smile.png" width="82" alt="Smile" /> | <img src="../../assets/library/faces/face_deadpan.png" width="82" alt="Chill" /> | <img src="../../assets/library/faces/face_smirk.png" width="82" alt="Check It" /> | <img src="../../assets/library/faces/face_grin.png" width="82" alt="Grin" /> | <img src="../../assets/library/faces/face_shocked.png" width="82" alt="Shocked" /> | <img src="../../assets/library/faces/face_tears.png" width="82" alt="Tears" /> | <img src="../../assets/library/faces/face_angry.png" width="82" alt="Bloxxer" /> | <img src="../../assets/library/faces/face_dizzy.png" width="82" alt="KO" /> |

## Быстрый старт

Клонируйте репозиторий в локальную папку Skills (поддерживаются Claude Code, Codex, Cursor и GitHub Copilot):

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-skill.git ~/.codex/skills/roblox-style-skill
```

Вызовите `$roblox-style-skill` в чате с агентом:

```text
Используй $roblox-style-skill, чтобы спланировать 15-секундный ролик 9:16 о двух друзьях на шопинге:
стильный Y2K-аватар и классический жёлтый Noob. Сделай карточки персонажей, промпты на 3 проекции и раскадровку из 4 кадров для Kling I2V.
```

## CLI-инструменты

Все четыре скрипта работают на Node.js 18+ только со стандартной библиотекой:

| Скрипт | Назначение |
| --- | --- |
| [`scripts/avatar_spec.mjs`](../../scripts/avatar_spec.mjs) | Генерирует карточку ДНК персонажа (палитра `BrickColor`, пропорции `2x2x1`/`1x2x1`) и промпт 3 проекций |
| [`scripts/shot_compiler.mjs`](../../scripts/shot_compiler.mjs) | Компилирует раскадровки 9:16 и I2V/T2V промпты для `kling`, `seedance`, `hailuo`, `wan`, `sora` и `runway` |
| [`scripts/drift_check.mjs`](../../scripts/drift_check.mjs) | Проверяет промпты на пальцы, клешни Lego, воксели и перегрузку действиями; выдаёт исправленный промпт |
| [`scripts/render_preview.mjs`](../../scripts/render_preview.mjs) | Локально рендерит 3D-листы проекций, таблицы сравнения, раскадровки и превью `.gif` / `.mp4` |

```bash
node scripts/avatar_spec.mjs --archetype corporate-worker --rig chibi-blocky --material smooth-plastic --name "Momo" --lang ru
node scripts/shot_compiler.mjs --template daily-meltdown --duration 15 --engine kling --rig chibi-blocky --lang ru
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang ru
```

## Документация и поддерживаемые языки

Ответы агента и флаг `--lang` в CLI поддерживают 10 языков: `en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt` и `ru`. Оставляйте одно основное действие на клип 4-5 секунд и создавайте лист 3 проекций перед многокадровым I2V. Независимый open-source проект, не связанный с Roblox Corporation.

- [Основной процесс (`SKILL.md`)](../../SKILL.md)
- [Геометрия аватаров, 2D-лица и материалы (`references/avatar-geometry-and-materials.md`)](../../references/avatar-geometry-and-materials.md)
- [Справочник промптов по моделям (`references/model-prompt-playbook.md`)](../../references/model-prompt-playbook.md)
- [Диагностика искажений и исправления (`references/rescue-and-anti-drift.md`)](../../references/rescue-and-anti-drift.md)
- [Ритм 9:16, свет и звук (`references/short-video-beats-and-audio.md`)](../../references/short-video-beats-and-audio.md)
- [Шесть шаблонов коротких видео (`references/viral-archetypes-catalog.md`)](../../references/viral-archetypes-catalog.md)
