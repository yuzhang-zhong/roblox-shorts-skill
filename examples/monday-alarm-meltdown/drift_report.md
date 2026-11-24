# Prompt Drift & Rescue Report: `FAIL` (`lang: en`)

- **Engine & Mode**: `kling` · `T2V`
- **Input Prompt**: `A cute Roblox worker walks to the desk, drinks coffee with five fingers, then slams his head on the keyboard`

| Gate | Status | Diagnosis & Fix |
| --- | :---: | --- |
| Hand Geometry Lock / 手部防长手指与防乐高爪锁 | **FAIL** | Prompt triggers human finger generation without a fingerless solid 1x2x1 rectangular block hand lock. |
| 2D Face Decal Lock / 面部2D贴图锁 | **WARN** | Add `smooth cylindrical head, flat 2D screen-printed decal face` to prevent 3D nose protrusion. |
| Studless & Non-Voxel Guard / 乐高凸粒与MC防串味锁 | **WARN** | Missing `smooth studless SmoothPlastic, 2mm chamfered edges, zero raised Lego studs, non-voxel`; model may add Lego bumps or voxel cubes. |
| Single-Action Clip Budget / 单镜头动作容量 | **FAIL** | Detected multi-step action chain (3 verbs, 1 sequence connectors). A 4–5s clip can reliably execute only ONE primary action. |
| Rigid Physics & I2V Anchor / 刚体关节与首帧锚定 | **WARN** | Using raw T2V risks cross-shot outfit drift and rubbery limbs; prefer First-Frame I2V with `rigid mechanical hinge joints`. |

## Rescued Prompt (English · Geometry-Locked Single Action)

```text
[KLING I2V · 9:16] An authentic Roblox R6/Blocky figure built on canonical stud proportions (1:1 barrel-beveled cylindrical head, flat 2D screen-printed Roblox decal face, 2x2x1 SmoothPlastic rectangular torso, two 1x2x1 rectangular leg blocks sitting flush side-by-side matching torso width, and two 1x2x1 solid rectangular arm blocks with fingerless and clawless flat beveled block hands). Single action: A cute Roblox worker walks to the desk, drinks coffee with five fingers,. Rigid Motor6D mechanical hinge joints at shoulders and hips, smooth flat Roblox SmoothPlastic / WoodPlanks environment with detailed multi-part Roblox Studio props, zero human fingers, zero Lego C-claws or raised circular Lego floor/head studs, non-voxel.
```

## Required Negative Prompt

```text
official Roblox logo, tilted square Roblox trademark emblem, Roblox R badge, brand watermarks, human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, raised circular Lego floor studs, studded Lego baseplate, Minecraft sharp voxel cube head, featureless blank cube props, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes / 官方Roblox倾斜方框商标Logo，R字品牌徽标，品牌水印，人类五指，真实人脸，乐高C型夹爪手，乐高头顶与地面凸起圆颗粒，我的世界直角像素块，简陋无细节单一方块道具，双腿分叉穿真人运动鞋，3D高鼻梁，面条状弯曲手臂，脚底打滑
```
