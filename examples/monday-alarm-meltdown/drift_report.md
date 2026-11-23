# Prompt Drift & Rescue Report / 提示词防串味体检报告: `FAIL`

- **Engine & Mode / 模型与路径**: `kling` · `T2V`
- **Input Prompt / 原始提示词**: `A cute Roblox girl with C-shaped claw hands walks into the room then sits down and drinks coffee with five fingers`

| Gate / 检查项 | Status | Diagnosis & Fix / 诊断与修复建议 |
| --- | :---: | --- |
| Hand Geometry Lock / 手部防长手指与防乐高爪锁 | **FAIL** | 提示词易触发真人五指生成，缺少「无手指1x2x1实心平头方块手」几何锁定。 (Prompt triggers human finger generation without a fingerless solid 1x2x1 rectangular block hand lock.) |
| 2D Face Decal Lock / 面部2D贴图锁 | **WARN** | 包含拟人词或情绪动词但未锁定「平滑圆柱头 + 纯平2D丝网印刷五官贴图 + 无3D真人鼻子」，极易出现五官立体真人化。 (Expressive or human-gendered nouns without `flat 2D screen-printed face decal, smooth cylindrical head, no 3D nose` risk morphing into a realistic human face.) |
| Studless & Non-Voxel Guard / 乐高与MC防串味锁 | **WARN** | 缺少「无乐高凸起颗粒、2毫米倒角、非像素方块」描述，模型可能混入乐高颗粒或MC像素块。 (Missing `smooth studless plastic, 2mm chamfered edges, non-voxel`; model may add Lego studs or voxel cubes.) |
| Single-Action Clip Budget / 单镜头动作容量 | **FAIL** | 检测到单镜头动作超载（识别到 3 个动作词、1 处先后连接词）。4~5秒生成片段应只保留 1 个核心动作并拆分其余分镜。 (Detected multi-step action chain (3 verbs, 1 sequence connectors). A 4–5s clip can reliably execute only ONE primary action.) |
| Rigid Physics & I2V Anchor / 刚体关节与首帧锚定 | **WARN** | 当前为纯文生视频(T2V)，多镜头易换装变脸；建议改用首帧I2V并声明「刚性机械转轴关节」。 (Using raw T2V risks cross-shot outfit drift and rubbery limbs; prefer First-Frame I2V with `rigid mechanical hinge joints`.) |

## Rescued Prompt (English · Geometry-Locked Single Action)

```text
[KLING I2V · 9:16] An authentic Roblox R6/Blocky figure built on canonical stud proportions (1:1 barrel-beveled cylindrical head, flat 2D screen-printed Roblox decal face, 2x2x1 SmoothPlastic rectangular torso, two 1x2x1 rectangular leg blocks sitting flush side-by-side matching torso width, and two 1x2x1 solid rectangular arm blocks with fingerless and clawless flat beveled block hands). Single action: A cute Roblox girl with C-shaped claw hands walks into the room. Rigid Motor6D mechanical hinge joints at shoulders and hips, classic Roblox studded baseplate, zero human fingers, zero Lego C-claws or top studs, non-voxel.
```

## 救场重写提示词 (中文 · 已锁定几何防串味与单镜头单动作)

```text
【KLING 首帧I2V · 9:16竖屏】纯正Roblox Studio SmoothPlastic材质的方块小人（1:1上下大圆角桶状圆柱头、纯平2D丝网印刷五官贴图、2x2x1宽扁长方体躯干、两条并拢齐平与躯干同宽的1x2x1方柱腿、两条紧贴两侧的1x2x1实心平头倒角方柱手臂，Motor6D刚性转轴关节）。单一核心动作：A cute Roblox girl with C-shaped claw hands walks into the room。配合经典Roblox方格Studs底板，严禁出现人类五指、乐高C型钩爪、乐高头顶圆颗粒或3D真人鼻子。
```

## Required Negative Prompt / 必配负向防漂移词

```text
human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark / 人类五指，真实人脸，乐高C型夹爪手，乐高头顶圆颗粒，我的世界直角像素块，双腿分叉穿真人运动鞋，3D高鼻梁，面条状弯曲手臂，脚底打滑
```
