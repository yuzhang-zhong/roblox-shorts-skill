# 9:16 Short-Video Storyboard & Prompt Pack: 精致潮人与黄皮新手的闺蜜反差 / Fashion UGC vs Classic Noob Bestie Contrast

- **Template / 模板**: `duo-comedy`
- **Target Engine / 目标模型**: `seedance` (First-Frame I2V (首帧图生视频))
- **Rig & Material / 骨架与材质**: `r15` · `matte-abs`
- **Format & Duration / 画幅与时长**: `9:16` · `15s` (`4` shots, 1 primary action per clip)

## Beat Sheet Overview / 黄金分镜节奏表

| Shot | Time | Beat Role | Single Action / 单一刚体动作 | Camera / 运镜 | SFX & Caption / 音效与花字 |
| --- | --- | --- | --- | --- | --- |
| 01 | 0.0s–3.8s | Hook / 黄金前3秒 | 并排反差亮相：左侧潮人小人1x2x1实心方柱手叉腰摆出时尚造型，右侧经典黄皮新手像木板一样笔直僵立一动不动 | 中景双人同框极速推镜，马卡龙色摄影棚舞台背景 | 时尚快门声 + 滑稽木鱼声 · 「出门逛街：精修闺蜜 vs 我」 |
| 02 | 3.8s–7.5s | Escalation 1 / 动作推进 | 左侧潮人小人原地华丽转身180度，背上的紫色微缩方盒背包不小心撞了一下右侧新手小人 | 低角度微仰拍平移，清晰捕捉方块背包碰撞瞬间 | 清脆塑料撞击声 (Bonk!) · 「试图配合演出的我」 |
| 03 | 7.5s–11.3s | Escalation 2 / 情绪升级 | 右侧经典新手小人不弯膝盖不弯手肘，全身保持笔直刚体状态呈45度直挺挺向侧后方倒进懒人沙发里 | 中全景固定机位，落地瞬间轻微震动反馈 | 经典倒地闷响 + 弹簧音 · 「物理引擎：直接罢工」 |
| 04 | 11.3s–15.0s | Payoff & Loop / 反转收尾 | 两个方块小人身体完全静止，仅圆柱体脑袋同时缓慢转动45度直勾勾盯向镜头 | 镜头缓慢拉远回到开场双人构图 | 轻微塑料转轴摩擦声 + 乌鸦飞过 · 「确认过眼神，是亲闺蜜」 |

## Compiled Shot Prompts / 分镜首帧与动态提示词

### Shot 01 (0.0s–3.8s) · Hook / 黄金前3秒

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Fast snap-zoom into a two-shot medium framing on a pastel studio stage. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands positioned at the start of the action (strike contrasting poses side by side: the Y2K avatar poses with solid 1x2x1 rectangular block hands on hips while the Classic Noob stands completely stiff like a wooden plank), displaying left avatar has a confident smirk decal; right Noob has the unchanging classic black line smile. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SEEDANCE · EN)**:
  ```text
  [Seedance I2V · 9:16] Fast snap-zoom into a two-shot medium framing on a pastel studio stage. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands strike contrasting poses side by side: the Y2K avatar poses with solid 1x2x1 rectangular block hands on hips while the Classic Noob stands completely stiff like a wooden plank with crisp Roblox Motor6D timing; left avatar has a confident smirk decal; right Noob has the unchanging classic black line smile. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。中景双人同框极速推镜，马卡龙色摄影棚舞台背景。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）处于动作起始位（并排反差亮相：左侧潮人小人1x2x1实心方柱手叉腰摆出时尚造型，右侧经典黄皮新手像木板一样笔直僵立一动不动），面部呈现左侧自信歪嘴笑2D贴图，右侧永恒不变的经典呆萌线条笑脸。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SEEDANCE · ZH)**:
  ```text
  【即梦/Seedance首帧I2V · 9:16】中景双人同框极速推镜，马卡龙色摄影棚舞台背景。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）并排反差亮相：左侧潮人小人1x2x1实心方柱手叉腰摆出时尚造型，右侧经典黄皮新手像木板一样笔直僵立一动不动，左侧自信歪嘴笑2D贴图，右侧永恒不变的经典呆萌线条笑脸。动作干脆利落有Roblox刚体节奏感，纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 02 (3.8s–7.5s) · Escalation 1 / 动作推进

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Low-angle tracking shot capturing the backpack collision. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands positioned at the start of the action (the Y2K avatar performs a flashy 180-degree spin and accidentally bumps the Classic Noob with its boxy purple backpack), displaying left avatar winks; right Noob keeps the exact same blank smile while getting bumped. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SEEDANCE · EN)**:
  ```text
  [Seedance I2V · 9:16] Low-angle tracking shot capturing the backpack collision. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands the Y2K avatar performs a flashy 180-degree spin and accidentally bumps the Classic Noob with its boxy purple backpack with crisp Roblox Motor6D timing; left avatar winks; right Noob keeps the exact same blank smile while getting bumped. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。低角度微仰拍平移，清晰捕捉方块背包碰撞瞬间。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）处于动作起始位（左侧潮人小人原地华丽转身180度，背上的紫色微缩方盒背包不小心撞了一下右侧新手小人），面部呈现左侧眨眼放电贴图，右侧被撞瞬间依然保持一模一样的呆萌微笑。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SEEDANCE · ZH)**:
  ```text
  【即梦/Seedance首帧I2V · 9:16】低角度微仰拍平移，清晰捕捉方块背包碰撞瞬间。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）左侧潮人小人原地华丽转身180度，背上的紫色微缩方盒背包不小心撞了一下右侧新手小人，左侧眨眼放电贴图，右侧被撞瞬间依然保持一模一样的呆萌微笑。动作干脆利落有Roblox刚体节奏感，纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 03 (7.5s–11.3s) · Escalation 2 / 情绪升级

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Medium wide static tripod shot with subtle impact shake. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands positioned at the start of the action (the Classic Noob tips sideways at a rigid 45-degree angle without bending knees or elbows and lands flat on a pastel beanbag), displaying unchanging painted smile on the Noob; shocked hollow eyes on the Y2K avatar. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SEEDANCE · EN)**:
  ```text
  [Seedance I2V · 9:16] Medium wide static tripod shot with subtle impact shake. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands the Classic Noob tips sideways at a rigid 45-degree angle without bending knees or elbows and lands flat on a pastel beanbag with crisp Roblox Motor6D timing; unchanging painted smile on the Noob; shocked hollow eyes on the Y2K avatar. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。中全景固定机位，落地瞬间轻微震动反馈。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）处于动作起始位（右侧经典新手小人不弯膝盖不弯手肘，全身保持笔直刚体状态呈45度直挺挺向侧后方倒进懒人沙发里），面部呈现倒地的新手依旧保持默认微笑，潮人小人切换为震惊圆圈眼贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SEEDANCE · ZH)**:
  ```text
  【即梦/Seedance首帧I2V · 9:16】中全景固定机位，落地瞬间轻微震动反馈。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）右侧经典新手小人不弯膝盖不弯手肘，全身保持笔直刚体状态呈45度直挺挺向侧后方倒进懒人沙发里，倒地的新手依旧保持默认微笑，潮人小人切换为震惊圆圈眼贴图。动作干脆利落有Roblox刚体节奏感，纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 04 (11.3s–15.0s) · Payoff & Loop / 反转收尾

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Slow dolly pull-back to the opening two-shot composition. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands positioned at the start of the action (both blocky avatars slowly rotate only their cylindrical heads 45 degrees to stare directly into the camera lens), displaying synchronized deadpan horizontal line eyes (-_-) on both avatars. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SEEDANCE · EN)**:
  ```text
  [Seedance I2V · 9:16] Slow dolly pull-back to the opening two-shot composition. two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands both blocky avatars slowly rotate only their cylindrical heads 45 degrees to stare directly into the camera lens with crisp Roblox Motor6D timing; synchronized deadpan horizontal line eyes (-_-) on both avatars. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。镜头缓慢拉远回到开场双人构图。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）处于动作起始位（两个方块小人身体完全静止，仅圆柱体脑袋同时缓慢转动45度直勾勾盯向镜头），面部呈现两人同步切换为沉默死鱼眼(-_-)2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SEEDANCE · ZH)**:
  ```text
  【即梦/Seedance首帧I2V · 9:16】镜头缓慢拉远回到开场双人构图。同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）两个方块小人身体完全静止，仅圆柱体脑袋同时缓慢转动45度直勾勾盯向镜头，两人同步切换为沉默死鱼眼(-_-)2D贴图。动作干脆利落有Roblox刚体节奏感，纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

## Shared Anti-Drift Negative Prompt / 统一负向防串味词

```text
human fingers, five-fingered hand, Lego solid 1x2x1 rectangular block hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark
人类五指，真实人手，乐高1x2x1实心平头方柱手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字
```
