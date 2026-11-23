# 9:16 Short-Video Storyboard & Prompt Pack: 多巴胺天空跑酷闯关剧场 / Pastel Sky Obby Parkour Storytime

- **Template / 模板**: `obby-storytime`
- **Target Engine / 目标模型**: `hailuo` (First-Frame I2V (首帧图生视频))
- **Rig & Material / 骨架与材质**: `r6` · `matte-abs`
- **Format & Duration / 画幅与时长**: `9:16` · `15s` (`4` shots, 1 primary action per clip)

## Beat Sheet Overview / 黄金分镜节奏表

| Shot | Time | Beat Role | Single Action / 单一刚体动作 | Camera / 运镜 | SFX & Caption / 音效与花字 |
| --- | --- | --- | --- | --- | --- |
| 01 | 0.0s–3.8s | Hook / 黄金前3秒 | 摆动笔直的倒角方柱四肢，在云海之上的两块马卡龙粉浮空倒角方块平台间干脆利落地跃过 | 第三人称跟随镜头紧贴小人后方高速推进 | 清脆跳跃弹簧音 (Boing!) · 「千万别往脚下看！」 |
| 02 | 3.8s–7.5s | Escalation 1 / 动作推进 | 保持膝盖笔直的R6刚体姿态，在三个旋转的薄荷绿圆柱滚筒上连续轻快跳步通过 | 侧面平行跟拍镜头，展现浮空闯关纵深感 | 连续三声塑料踏步清脆哒哒声 · 「这波操作打几分？」 |
| 03 | 7.5s–11.3s | Escalation 2 / 情绪升级 | 在半透明玻璃方块边缘急停，前方平台闪烁红光，双侧笔直方柱手臂像风车一样前后摆动维持平衡 | 高角度俯拍大景深，展现脚下云海深渊反差 | 急刹车音效 + 警报滴滴声 · 「差点触发经典自由落体」 |
| 04 | 11.3s–15.0s | Payoff & Loop / 反转收尾 | 背后微缩喷气包喷出两团圆环状方块白烟，稳稳降落在粉色存档点平台上，落地姿态与第一镜完全重合 | 机位平滑归位至开场第三人称跟拍视角实现无缝循环 | 通关叮咚音效 (Checkpoint Ding!) · 「丝滑通关，无缝再来亿遍」 |

## Compiled Shot Prompts / 分镜首帧与动态提示词

### Shot 01 (0.0s–3.8s) · Hook / 黄金前3秒

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Dynamic third-person follow camera closely trailing the blocky runner. a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack positioned at the start of the action (leaps with stiff swinging rectangular arms and legs across two floating pastel-pink beveled platforms high above a sea of clouds), displaying determined wide 2D ink eyes and energetic open grin decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Push in, Tilt up] (9:16 vertical, r6 rig) Featuring a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack. The character leaps with stiff swinging rectangular arms and legs across two floating pastel-pink beveled platforms high above a sea of clouds, showing determined wide 2D ink eyes and energetic open grin decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。第三人称跟随镜头紧贴小人后方高速推进。经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）处于动作起始位（摆动笔直的倒角方柱四肢，在云海之上的两块马卡龙粉浮空倒角方块平台间干脆利落地跃过），面部呈现专注大眼与充满活力的2D印刷笑脸贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Push in, Tilt up]（9:16竖屏，r6骨架）画面主体为经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）。小人摆动笔直的倒角方柱四肢，在云海之上的两块马卡龙粉浮空倒角方块平台间干脆利落地跃过，专注大眼与充满活力的2D印刷笑脸贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 02 (3.8s–7.5s) · Escalation 1 / 动作推进

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Side-profile tracking shot moving parallel to the floating obstacle course. a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack positioned at the start of the action (hops rhythmically across three rotating mint-green cylindrical rollers without bending its knees), displaying focused eyes with a single painted sweat drop on the temple. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Pan right] (9:16 vertical, r6 rig) Featuring a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack. The character hops rhythmically across three rotating mint-green cylindrical rollers without bending its knees, showing focused eyes with a single painted sweat drop on the temple. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。侧面平行跟拍镜头，展现浮空闯关纵深感。经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）处于动作起始位（保持膝盖笔直的R6刚体姿态，在三个旋转的薄荷绿圆柱滚筒上连续轻快跳步通过），面部呈现眼神紧盯前方，额角带一滴2D绘制汗珠贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Pan right]（9:16竖屏，r6骨架）画面主体为经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）。小人保持膝盖笔直的R6刚体姿态，在三个旋转的薄荷绿圆柱滚筒上连续轻快跳步通过，眼神紧盯前方，额角带一滴2D绘制汗珠贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 03 (7.5s–11.3s) · Escalation 2 / 情绪升级

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. High-angle dramatic crane shot looking down into the pastel cloud abyss. a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack positioned at the start of the action (skids to a halt at the edge of a translucent glass block as the platform ahead flashes red, waving both stiff blocky arms for balance), displaying wide panicked ring eyes and wavy mouth decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Tilt down] (9:16 vertical, r6 rig) Featuring a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack. The character skids to a halt at the edge of a translucent glass block as the platform ahead flashes red, waving both stiff blocky arms for balance, showing wide panicked ring eyes and wavy mouth decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。高角度俯拍大景深，展现脚下云海深渊反差。经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）处于动作起始位（在半透明玻璃方块边缘急停，前方平台闪烁红光，双侧笔直方柱手臂像风车一样前后摆动维持平衡），面部呈现惊慌圆圈眼与波浪嘴2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Tilt down]（9:16竖屏，r6骨架）画面主体为经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）。小人在半透明玻璃方块边缘急停，前方平台闪烁红光，双侧笔直方柱手臂像风车一样前后摆动维持平衡，惊慌圆圈眼与波浪嘴2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 04 (11.3s–15.0s) · Payoff & Loop / 反转收尾

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Return to third-person follow framing for seamless loop replay. a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack positioned at the start of the action (fires a puff of blocky white cloud rings from its mini jetpack and lands cleanly on the pink checkpoint pad in the exact pose of Shot 1), displaying cheerful star-eyed victory grin decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Push in] (9:16 vertical, r6 rig) Featuring a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack. The character fires a puff of blocky white cloud rings from its mini jetpack and lands cleanly on the pink checkpoint pad in the exact pose of Shot 1, showing cheerful star-eyed victory grin decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。机位平滑归位至开场第三人称跟拍视角实现无缝循环。经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）处于动作起始位（背后微缩喷气包喷出两团圆环状方块白烟，稳稳降落在粉色存档点平台上，落地姿态与第一镜完全重合），面部呈现星星眼胜利微笑2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Push in]（9:16竖屏，r6骨架）画面主体为经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）。小人背后微缩喷气包喷出两团圆环状方块白烟，稳稳降落在粉色存档点平台上，落地姿态与第一镜完全重合，星星眼胜利微笑2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

## Shared Anti-Drift Negative Prompt / 统一负向防串味词

```text
human fingers, five-fingered hand, Lego solid 1x2x1 rectangular block hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark
人类五指，真实人手，乐高1x2x1实心平头方柱手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字
```
