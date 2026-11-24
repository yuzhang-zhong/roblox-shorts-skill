<div align="center">

# Roblox Style Video Skill

Un **Agent Skill** (`SKILL.md` + guides de référence + outils CLI hors ligne sans dépendances) pour Claude Code, Cursor, GitHub Copilot et Codex permettant de planifier des shorts verticaux `9:16` d'avatars blocky de style Roblox, verrouiller les proportions R6, compiler les prompts plan par plan et prévisualiser le montage 3D localement.

[![Agent Skill](https://img.shields.io/badge/Agent_Skill-SKILL.md-0f172a?style=flat-square)](../../SKILL.md)
[![Node.js 18+ pour la CLI](https://img.shields.io/badge/Node.js-18%2B-268354?style=flat-square)](#flux-du-skill-et-démarrage-rapide)
[![Licence MIT](https://img.shields.io/badge/License-MIT-2563eb?style=flat-square)](../../LICENSE)

**[Exemples vidéo](#exemples-vidéo)** · [Planches de scènes](#planches-de-scènes-et-rythme-des-plans) · [Flux du Skill et démarrage rapide](#flux-du-skill-et-démarrage-rapide) · [Guide du Skill](../../SKILL.md)

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

</div>

## Exemples vidéo

Lorsqu'il est appelé dans un agent de code IA, ce Skill transforme une idée de vidéo courte en un dossier vertical (`9:16`) de 15 secondes en quatre plans, décliné sur 12 formats classiques d'histoires blocky. Les **MP4 de 4 secondes** et les GIF ci-dessous sont des animatiques 3D hors ligne générées par `scripts/render_preview.mjs` afin de vérifier les proportions R6, les accessoires multi-pièces, les mouvements de caméra et les bulles `BillboardGui` avant de dépenser des crédits sur un modèle vidéo externe.

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

## Planches de scènes et rythme des plans

Les modèles vidéo déforment les membres rigides lorsqu'un seul prompt de 4 à 5 secondes enchaîne trois ou quatre verbes successifs. Chaque short découpe l'histoire en quatre temps à action unique (`0–3.5s` accroche, deux plans de montée et `11.5–15s` chute ou retour en boucle) :

| Plan 01 · Accroche (`0–3.5s`) | Plan 02 · Action (`3.5–7.5s`) | Plan 03 · Rebondissement (`7.5–11.5s`) | Plan 04 · Boucle (`11.5–15s`) |
| :---: | :---: | :---: | :---: |
| <img src="../../examples/monday-alarm-meltdown/assets/shot_01_hook.png" width="196" alt="Shot 01: alarm clock hook" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_02_slam.png" width="196" alt="Shot 02: right block arm slams clock" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_03_tears.png" width="196" alt="Shot 03: waterfall tears before laptop" /> | <img src="../../examples/monday-alarm-meltdown/assets/shot_04_faceplant.png" width="196" alt="Shot 04: 90-degree rigid waist flop" /> |

Planches contacts de quatre plans sur six genres de jeux, associant changements d'angle de caméra et bulles de dialogue en anglais :

| 02 · Sky Obby (`Hailuo` · Speed Coil et Killbrick) | 08 · Brookhaven Police Chase (`Hailuo` · Poursuite urbaine) |
| :---: | :---: |
| <a href="../../examples/obby-sky-run/"><img src="../../examples/obby-sky-run/assets/obby_storyboard_sheet.en.png" width="410" alt="Sky Obby 4-shot storyboard sheet" /></a> | <a href="../../examples/brookhaven-police-chase/"><img src="../../examples/brookhaven-police-chase/assets/chase_storyboard_sheet.en.png" width="410" alt="Brookhaven Police Chase 4-shot storyboard sheet" /></a> |
| **07 · Natural Disaster Tower (`Kling` · Survie à la tornade)** | **09 · Doors Hotel Hallway (`Sora` · Lampe torche et couloir)** |
| <a href="../../examples/disaster-tower-tornado/"><img src="../../examples/disaster-tower-tornado/assets/tornado_storyboard_sheet.en.png" width="410" alt="Natural Disaster Tornado Tower 4-shot storyboard sheet" /></a> | <a href="../../examples/doors-flashlight-hallway/"><img src="../../examples/doors-flashlight-hallway/assets/doors_storyboard_sheet.en.png" width="410" alt="Doors Hotel Hallway 4-shot storyboard sheet" /></a> |
| **10 · Crossroads Sword Duel (`Seedance` · Duel d'épées 1v1)** | **12 · Red Light Freeze (`Runway` · 1, 2, 3, Soleil)** |
| <a href="../../examples/crossroads-sword-duel/"><img src="../../examples/crossroads-sword-duel/assets/sword_storyboard_sheet.en.png" width="410" alt="Crossroads Sword Duel 4-shot storyboard sheet" /></a> | <a href="../../examples/red-light-freeze/"><img src="../../examples/red-light-freeze/assets/redlight_storyboard_sheet.en.png" width="410" alt="Red Light Freeze 4-shot storyboard sheet" /></a> |

## Flux du Skill et démarrage rapide

<p align="center">
  <img src="../../docs/pipeline.en.svg" width="860" alt="Five-step Roblox Style Video Skill workflow" />
</p>

### Installer comme Agent Skill

Clonez ce dépôt dans le répertoire skills de votre agent. Une fois installé, l'agent lit [`SKILL.md`](../../SKILL.md), charge les guides dans [`references/`](../../references/) et exécute automatiquement les scripts Node.js. Ce chemin correspond à Codex ; utilisez `~/.copilot/skills/roblox-style-video` pour GitHub Copilot, ou le dossier skills configuré dans Claude Code et Cursor.

```bash
git clone https://github.com/yuzhang-zhong/roblox-style-video.git ~/.codex/skills/roblox-style-video
```

Appelez le skill `roblox-style-video` dans la conversation de votre agent :

```text
Utilise $roblox-style-video pour planifier un short vertical 9:16 de 15 secondes dans un couloir d'hôtel sombre (doors-horror) :
un avatar R6 en sweat bleu éclaire la porte 050 avec une lampe torche quand les lumières clignotent, puis se cache dans l'armoire.
Donne-moi le verrouillage géométrique du personnage, un storyboard en 4 plans et des prompts I2V pour Sora / Kling.
```

### Exécuter directement les outils CLI du Skill

Chaque script inclus fonctionne de manière autonome depuis la racine du dépôt avec Node.js 18+ et la bibliothèque standard uniquement (sans `npm install` ni clé API).

```bash
node scripts/shot_compiler.mjs --template brookhaven-chase --duration 15 --engine hailuo --rig r6 --lang fr
node scripts/drift_check.mjs --prompt "A cute Roblox girl with C-shaped claw hands drinks coffee with five fingers" --engine kling --mode t2v --lang fr
node scripts/render_preview.mjs --only tornado,chase,doors
```

## Scripts du Skill, contrôle anti-dérive et références

Les prompts génériques produisent souvent des doigts humains, des pinces en C ou des tenons circulaires Lego au sol et des cubes voxels façon Minecraft au lieu d'une géométrie blocky R6 propre (`torse 2x2x1`, jambes `1x2x1` jointives, mains pleines sans doigts, tête cylindrique biseautée `1:1`, sols lisses et accessoires multi-pièces). Le linter `drift_check.mjs` détecte ces dérives avant la génération :

<p align="center">
  <img src="../../assets/showcase/drift_rescue_comparison.en.png" width="760" alt="Geometry check comparing human fingers, Lego C-claws, and voxel heads against locked blocky R6 proportions" />
</p>

| Composant du Skill | Sortie |
| --- | --- |
| [`SKILL.md`](../../SKILL.md) | Point d'entrée principal de l'Agent Skill définissant les 6 modes de production (`Avatar`, `Storyboard`, `Prompt-Compile`, `Rescue`, `Remix`, `Render`) et les 8 invariants géométriques. |
| [`shot_compiler.mjs`](../../scripts/shot_compiler.mjs) | Découpage `9:16` et prompts I2V/T2V sur 12 modèles d'histoires pour Kling, Seedance, Hailuo, Wan, Sora et Runway. |
| [`avatar_spec.mjs`](../../scripts/avatar_spec.mjs) | Fiche ADN du personnage avec codes `BrickColor`, proportions verrouillées et prompt de [planche turnaround à trois vues](../../assets/showcase/momo_turnaround_sheet.en.png). |
| [`drift_check.mjs`](../../scripts/drift_check.mjs) | Rapport de diagnostic et prompt corrigé en cas de doigts humains, pinces/tenons Lego, logos de marque ou surcharge d'actions. |
| [`render_preview.mjs`](../../scripts/render_preview.mjs) | Rendu 3D hors ligne de planches contacts, comparatifs, GIF et MP4 (la composition sous Windows utilise PowerShell `System.Drawing` et `ffmpeg`). |

[Géométrie et matériaux](../../references/avatar-geometry-and-materials.md) · [Accessoires et objets classiques](../../references/classic-roblox-catalog.md) · [Guide de prompts par modèle](../../references/model-prompt-playbook.md) · [Corrections anti-dérive](../../references/rescue-and-anti-drift.md) · [Rythme et audio](../../references/short-video-beats-and-audio.md) · [12 modèles d'histoires](../../references/viral-archetypes-catalog.md)

## Langues

Les réponses de l'Agent Skill et l'option CLI `--lang` prennent en charge `en`, `zh`, `zh-tw`, `ja`, `ko`, `es`, `fr`, `de`, `pt` et `ru`.

[English](../../README.md) · [简体中文](../../README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt-BR.md) · [Русский](README.ru.md)

[Licence MIT](../../LICENSE). Agent Skill open-source indépendant utilisant des emblèmes géométriques triangulaires originaux ; non affilié ni approuvé par Roblox Corporation.
