# 9:16 Short-Video Storyboard & Prompt Pack: 周一早八闹钟破防记 / Monday 8 AM Alarm Meltdown

- **Template / 模板**: `daily-meltdown`
- **Target Engine / 目标模型**: `kling` (First-Frame I2V (首帧图生视频))
- **Rig & Material / 骨架与材质**: `chibi-blocky` · `glossy-vinyl`
- **Format & Duration / 画幅与时长**: `9:16` · `15s` (`4` shots, 1 primary action per clip)

## Beat Sheet Overview / 黄金分镜节奏表

| Shot | Time | Beat Role | Single Action / 单一刚体动作 | Camera / 运镜 | SFX & Caption / 音效与花字 |
| --- | --- | --- | --- | --- | --- |
| 01 | 0.0s–3.8s | Hook / 黄金前3秒 | 从桌面剧烈震动的红色微缩方块闹钟后方猛地探出圆柱体方块脑袋 | 大特写机位极速推近，伴随闹钟震动的轻微镜头抖动 | 刺耳电子闹钟声 + 塑料弹跳音 · 「早八人的痛，谁懂？」 |
| 02 | 3.8s–7.5s | Escalation 1 / 动作推进 | 右侧刚性倒角方柱手臂沿肩部转轴干脆利落地向下挥落，用C型夹爪手一巴掌拍扁闹钟 | 中景侧面微距机位，50mm f/2.8浅景深虚化背景 | 清脆ABS塑料拍击声 (Clack!) · 「再睡五分钟…就五分钟」 |
| 03 | 7.5s–11.3s | Escalation 2 / 情绪升级 | 笔直僵硬地坐在发光的微缩方块笔记本电脑前，脸颊两侧浮现出蓝色2D瀑布流泪贴图条 | 越肩镜头平滑环绕至正面中近景，电脑屏幕冷光打亮圆润塑料倒角 | 密集的消息提示音 + 委屈气泡音 · 「打开电脑：99+ 未读消息」 |
| 04 | 11.3s–15.0s | Payoff & Loop / 反转收尾 | 长方体躯干沿腰部机械转轴直挺挺向前倾倒90度，平滑圆柱脑袋啪地平拍在微缩键盘上并轻微回弹一下 | 45度高角度微缩模型固定俯拍，与第一镜桌面构图衔接形成循环 | 经典闷响 (Oof!) + 键盘清脆塑料声 · 「已老实，申请重启人生」 |

## Compiled Shot Prompts / 分镜首帧与动态提示词

### Shot 01 (0.0s–3.8s) · Hook / 黄金前3秒

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Extreme close-up, rapid dolly push-in with subtle handheld impact shake. a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie positioned at the start of the action (pops its cylindrical blocky head rapidly up from behind a vibrating miniature red blocky alarm clock on the desk), displaying wide hollow ring eyes and an open rectangular gasp mouth painted flat on the face decal. Smooth studless beveled plastic blocks, fingerless C-shaped claw hands, shallow macro depth of field, zero Lego studs, zero human fingers.
  ```
- **Video Motion Prompt (KLING · EN)**:
  ```text
  [Kling I2V · 9:16] a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie pops its cylindrical blocky head rapidly up from behind a vibrating miniature red blocky alarm clock on the desk. Facial decal: wide hollow ring eyes and an open rectangular gasp mouth painted flat on the face decal. Camera: Extreme close-up, rapid dolly push-in with subtle handheld impact shake. Rigid mechanical hinge joints, fingerless C-shaped claw hands, smooth studless ABS/vinyl plastic, Octane miniature studio lighting, no human fingers, no Lego top studs.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。大特写机位极速推近，伴随闹钟震动的轻微镜头抖动。2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）处于动作起始位（从桌面剧烈震动的红色微缩方块闹钟后方猛地探出圆柱体方块脑袋），面部呈现脸部2D贴图呈现空心圆圈震惊眼与长方形张嘴倒吸凉气表情。平滑无颗粒倒角方块，无手指C型夹爪手，微距浅景深摄影棚布光。
  ```
- **图生视频动态提示词 (KLING · ZH)**:
  ```text
  【可灵I2V · 9:16】2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）从桌面剧烈震动的红色微缩方块闹钟后方猛地探出圆柱体方块脑袋，脸部2D贴图呈现空心圆圈震惊眼与长方形张嘴倒吸凉气表情。运镜：大特写机位极速推近，伴随闹钟震动的轻微镜头抖动。刚性机械转轴关节，无手指C型夹爪手，平滑无乐高颗粒的高光盲盒塑料质感，Octane微缩摄影棚布光，严禁出现人类五指或真人鼻子。
  ```

### Shot 02 (3.8s–7.5s) · Escalation 1 / 动作推进

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Medium side-angle macro shot, 50mm f/2.8 shallow depth of field. a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie positioned at the start of the action (pivots its rigid right rectangular arm downward at the shoulder hinge to slam the red alarm clock flat), displaying grumpy squinted line eyes (-_-) and a tiny wavy frown decal. Smooth studless beveled plastic blocks, fingerless C-shaped claw hands, shallow macro depth of field, zero Lego studs, zero human fingers.
  ```
- **Video Motion Prompt (KLING · EN)**:
  ```text
  [Kling I2V · 9:16] a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie pivots its rigid right rectangular arm downward at the shoulder hinge to slam the red alarm clock flat. Facial decal: grumpy squinted line eyes (-_-) and a tiny wavy frown decal. Camera: Medium side-angle macro shot, 50mm f/2.8 shallow depth of field. Rigid mechanical hinge joints, fingerless C-shaped claw hands, smooth studless ABS/vinyl plastic, Octane miniature studio lighting, no human fingers, no Lego top studs.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。中景侧面微距机位，50mm f/2.8浅景深虚化背景。2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）处于动作起始位（右侧刚性倒角方柱手臂沿肩部转轴干脆利落地向下挥落，用C型夹爪手一巴掌拍扁闹钟），面部呈现2D贴图切换为起床气眯眯眼(-_-)与波浪小撇嘴。平滑无颗粒倒角方块，无手指C型夹爪手，微距浅景深摄影棚布光。
  ```
- **图生视频动态提示词 (KLING · ZH)**:
  ```text
  【可灵I2V · 9:16】2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）右侧刚性倒角方柱手臂沿肩部转轴干脆利落地向下挥落，用C型夹爪手一巴掌拍扁闹钟，2D贴图切换为起床气眯眯眼(-_-)与波浪小撇嘴。运镜：中景侧面微距机位，50mm f/2.8浅景深虚化背景。刚性机械转轴关节，无手指C型夹爪手，平滑无乐高颗粒的高光盲盒塑料质感，Octane微缩摄影棚布光，严禁出现人类五指或真人鼻子。
  ```

### Shot 03 (7.5s–11.3s) · Escalation 2 / 情绪升级

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Over-the-shoulder dolly arc to front medium close-up under cool screen light. a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie positioned at the start of the action (sits stiffly in front of a glowing miniature blocky laptop as blue 2D waterfall tear strips appear on its cheeks), displaying streaming blue painted tear bands and a wailing rectangular mouth decal. Smooth studless beveled plastic blocks, fingerless C-shaped claw hands, shallow macro depth of field, zero Lego studs, zero human fingers.
  ```
- **Video Motion Prompt (KLING · EN)**:
  ```text
  [Kling I2V · 9:16] a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie sits stiffly in front of a glowing miniature blocky laptop as blue 2D waterfall tear strips appear on its cheeks. Facial decal: streaming blue painted tear bands and a wailing rectangular mouth decal. Camera: Over-the-shoulder dolly arc to front medium close-up under cool screen light. Rigid mechanical hinge joints, fingerless C-shaped claw hands, smooth studless ABS/vinyl plastic, Octane miniature studio lighting, no human fingers, no Lego top studs.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。越肩镜头平滑环绕至正面中近景，电脑屏幕冷光打亮圆润塑料倒角。2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）处于动作起始位（笔直僵硬地坐在发光的微缩方块笔记本电脑前，脸颊两侧浮现出蓝色2D瀑布流泪贴图条），面部呈现双颊蓝色印刷宽面条眼泪贴图与委屈长方嘴。平滑无颗粒倒角方块，无手指C型夹爪手，微距浅景深摄影棚布光。
  ```
- **图生视频动态提示词 (KLING · ZH)**:
  ```text
  【可灵I2V · 9:16】2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）笔直僵硬地坐在发光的微缩方块笔记本电脑前，脸颊两侧浮现出蓝色2D瀑布流泪贴图条，双颊蓝色印刷宽面条眼泪贴图与委屈长方嘴。运镜：越肩镜头平滑环绕至正面中近景，电脑屏幕冷光打亮圆润塑料倒角。刚性机械转轴关节，无手指C型夹爪手，平滑无乐高颗粒的高光盲盒塑料质感，Octane微缩摄影棚布光，严禁出现人类五指或真人鼻子。
  ```

### Shot 04 (11.3s–15.0s) · Payoff & Loop / 反转收尾

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. High-angle isometric lock-off shot matching the desk geometry of Shot 1. a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie positioned at the start of the action (tilts its rigid rectangular torso forward 90 degrees at the waist hinge and face-plants flat onto the miniature keyboard with a slight plastic bounce), displaying dizzy spiral eyes (@_@) painted flat on the side of the head. Smooth studless beveled plastic blocks, fingerless C-shaped claw hands, shallow macro depth of field, zero Lego studs, zero human fingers.
  ```
- **Video Motion Prompt (KLING · EN)**:
  ```text
  [Kling I2V · 9:16] a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless C-shaped claw hands, and a pastel matcha hoodie tilts its rigid rectangular torso forward 90 degrees at the waist hinge and face-plants flat onto the miniature keyboard with a slight plastic bounce. Facial decal: dizzy spiral eyes (@_@) painted flat on the side of the head. Camera: High-angle isometric lock-off shot matching the desk geometry of Shot 1. Rigid mechanical hinge joints, fingerless C-shaped claw hands, smooth studless ABS/vinyl plastic, Octane miniature studio lighting, no human fingers, no Lego top studs.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。45度高角度微缩模型固定俯拍，与第一镜桌面构图衔接形成循环。2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）处于动作起始位（长方体躯干沿腰部机械转轴直挺挺向前倾倒90度，平滑圆柱脑袋啪地平拍在微缩键盘上并轻微回弹一下），面部呈现2D贴图定格为蚊香眩晕眼(@_@)。平滑无颗粒倒角方块，无手指C型夹爪手，微距浅景深摄影棚布光。
  ```
- **图生视频动态提示词 (KLING · ZH)**:
  ```text
  【可灵I2V · 9:16】2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、无手指C型夹爪手、穿抹茶绿倒角方柱卫衣）长方体躯干沿腰部机械转轴直挺挺向前倾倒90度，平滑圆柱脑袋啪地平拍在微缩键盘上并轻微回弹一下，2D贴图定格为蚊香眩晕眼(@_@)。运镜：45度高角度微缩模型固定俯拍，与第一镜桌面构图衔接形成循环。刚性机械转轴关节，无手指C型夹爪手，平滑无乐高颗粒的高光盲盒塑料质感，Octane微缩摄影棚布光，严禁出现人类五指或真人鼻子。
  ```

## Shared Anti-Drift Negative Prompt / 统一负向防串味词

```text
human fingers, five-fingered hand, realistic human face, 3D protruding nose, skin pores, Lego top studs, Minecraft voxel blocks, rubbery noodle limbs, foot sliding, morphing clothes, watermark
人类五指，真实人手，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，乐高顶部凸起圆颗粒，我的世界像素方块，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字
```
