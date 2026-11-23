# 9:16 Storyboard & Prompt Pack: 小镇警匪街头追逐 / Brookhaven Street Police Chase (`lang: zh-en`)

- **Template**: `brookhaven-chase`
- **Target Engine**: `hailuo` (First-Frame I2V (首帧图生视频))
- **Rig & Material**: `r6` · `smooth-plastic`
- **Format & Duration**: `9:16` · `15s` (`4` shots, 1 primary action per clip)

## Beat Sheet Overview

| Shot | Time | Beat Role | Single Action | Camera | SFX & Caption |
| --- | --- | --- | --- | --- | --- |
| 01 | 0.0s–3.8s | Hook / 黄金前3秒 | 经典黄皮R6新手抱着绿色钞票方块冲上白线马路，身后红蓝警灯交替爆闪 | 贴地正前方倒退跟拍奔跑镜头 | 急促警笛声 (Wee-Woo!) · 「刚抢完小镇银行就遇熟人」 |
| 02 | 3.8s–7.5s | Escalation 1 / 动作推进 | 身穿深蓝制服戴警帽的R6警官迈着高速摆动的1x2x1笔直方腿全力追赶 | 沿街道侧面高速平行横移跟拍 | 密集塑料脚步声 + 哨声 · 「前面那个黄方块站住！」 |
| 03 | 7.5s–11.3s | Escalation 2 / 情绪升级 | 黄皮新手脚下绊到路边黄色方块消防栓，整个人保持笔直刚体呈水平飞扑出去 | 中近景碰撞震动，绿色钱袋高高抛起 | 滑稽绊倒弹簧音 + Oof! · 「平地摔触发物理起飞」 |
| 04 | 11.3s–15.0s | Payoff & Loop / 反转收尾 | 警官淡定站在侧翻倒地的新手旁，画面前景落下灰色方块铁栏杆 | 正面双人定格固定镜头 | 铁门咔嚓落锁声 · 「小镇一日游到此结束」 |

## Compiled Shot Prompts

### Shot 01 (0.0s–3.8s) · Hook / 黄金前3秒

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Low front tracking shot pulling backward ahead of the runner. two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind positioned at the start of the action (the yellow R6 Noob bursts out onto the striped asphalt street clutching a green cash block while red and blue siren lights flash behind), displaying mischievous Check-It smirk decal on the Noob. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Pull out, Shake] (9:16 vertical, r6 rig) Featuring two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind. The character the yellow R6 Noob bursts out onto the striped asphalt street clutching a green cash block while red and blue siren lights flash behind, showing mischievous Check-It smirk decal on the Noob. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。贴地正前方倒退跟拍奔跑镜头。小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍处于动作起始位（经典黄皮R6新手抱着绿色钞票方块冲上白线马路，身后红蓝警灯交替爆闪），面部呈现黄皮新手脸上印着挑眉坏笑(Check It)贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Pull out, Shake]（9:16竖屏，r6骨架）画面主体为小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍。小人经典黄皮R6新手抱着绿色钞票方块冲上白线马路，身后红蓝警灯交替爆闪，黄皮新手脸上印着挑眉坏笑(Check It)贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 02 (3.8s–7.5s) · Escalation 1 / 动作推进

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Side-profile parallel speed pan along the street. two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind positioned at the start of the action (the navy-uniformed R6 Police Officer swings stiff 1x2x1 arms rapidly in high-speed pursuit under flashing siren rim lights), displaying angry Bloxxer scowling brow decal on the officer. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Pan left] (9:16 vertical, r6 rig) Featuring two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind. The character the navy-uniformed R6 Police Officer swings stiff 1x2x1 arms rapidly in high-speed pursuit under flashing siren rim lights, showing angry Bloxxer scowling brow decal on the officer. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。沿街道侧面高速平行横移跟拍。小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍处于动作起始位（身穿深蓝制服戴警帽的R6警官迈着高速摆动的1x2x1笔直方腿全力追赶），面部呈现警官满脸严肃的愤怒皱眉2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Pan left]（9:16竖屏，r6骨架）画面主体为小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍。小人身穿深蓝制服戴警帽的R6警官迈着高速摆动的1x2x1笔直方腿全力追赶，警官满脸严肃的愤怒皱眉2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 03 (7.5s–11.3s) · Escalation 2 / 情绪升级

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Medium close-up with impact shake as the cash block flies upward. two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind positioned at the start of the action (the Noob trips over a yellow fire hydrant block and launches into a stiff horizontal R6 dive), displaying wide shocked O_O eyes decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Shake] (9:16 vertical, r6 rig) Featuring two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind. The character the Noob trips over a yellow fire hydrant block and launches into a stiff horizontal R6 dive, showing wide shocked O_O eyes decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。中近景碰撞震动，绿色钱袋高高抛起。小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍处于动作起始位（黄皮新手脚下绊到路边黄色方块消防栓，整个人保持笔直刚体呈水平飞扑出去），面部呈现瞬间切换为震惊圆圈眼贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Shake]（9:16竖屏，r6骨架）画面主体为小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍。小人黄皮新手脚下绊到路边黄色方块消防栓，整个人保持笔直刚体呈水平飞扑出去，瞬间切换为震惊圆圈眼贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 04 (11.3s–15.0s) · Payoff & Loop / 反转收尾

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Locked-off frontal two-shot. two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind positioned at the start of the action (the officer stands calmly next to the sideways-toppled Noob as gray prison bar blocks drop into frame), displaying deadpan Chill (-_-) face decal on the Noob. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (HAILUO · EN)**:
  ```text
  [Static shot] (9:16 vertical, r6 rig) Featuring two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind. The character the officer stands calmly next to the sideways-toppled Noob as gray prison bar blocks drop into frame, showing deadpan Chill (-_-) face decal on the Noob. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。正面双人定格固定镜头。小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍处于动作起始位（警官淡定站在侧翻倒地的新手旁，画面前景落下灰色方块铁栏杆），面部呈现倒地新手切换为安详死鱼眼(-_-)贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (HAILUO · ZH)**:
  ```text
  [Static shot]（9:16竖屏，r6骨架）画面主体为小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍。小人警官淡定站在侧翻倒地的新手旁，画面前景落下灰色方块铁栏杆，倒地新手切换为安详死鱼眼(-_-)贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

## Shared Anti-Drift Negative Prompt

```text
human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark
人类五指，真实人手，乐高C型夹爪手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字
```
