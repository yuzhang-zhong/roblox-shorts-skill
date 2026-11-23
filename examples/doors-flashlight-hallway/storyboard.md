# 9:16 Storyboard & Prompt Pack: 惊悚酒店手电筒走廊 / Doors Hotel Flashlight Hallway (`lang: zh-en`)

- **Template**: `doors-horror`
- **Target Engine**: `sora` (First-Frame I2V (首帧图生视频))
- **Rig & Material**: `r6` · `smooth-plastic`
- **Format & Duration**: `9:16` · `15s` (`4` shots, 1 primary action per clip)

## Beat Sheet Overview

| Shot | Time | Beat Role | Single Action | Camera | SFX & Caption |
| --- | --- | --- | --- | --- | --- |
| 01 | 0.0s–3.8s | Hook / 黄金前3秒 | 举着亮黄色光束手电筒，迈着僵硬小步小心翼翼靠近标号050的木质房门 | 越肩机位顺着幽暗走廊缓慢推近 | 木地板吱呀声 + 低频心跳 · 「第50号门…千万别闪灯」 |
| 02 | 3.8s–7.5s | Escalation 1 / 动作推进 | 头顶暖色壁灯突然滋啦闪烁两下骤然熄灭，小人全身僵直停在半步姿态 | 仅靠手电筒反光照亮的正面中近景特写 | 灯泡电流滋啦爆闪声 · 「完了，灯真的闪了？！」 |
| 03 | 7.5s–11.3s | Escalation 2 / 情绪升级 | 身体不敢动，仅1:1桶状圆角脑袋缓慢向后转头，身后黑暗深处亮起两颗惨白发光眼睛 | 背景浮现发光白眼的希区柯克变焦镜头 | 深渊低吼渐强音效 · 「别回头！快找柜子！」 |
| 04 | 11.3s–15.0s | Payoff & Loop / 反转收尾 | 180度原地干脆转身，直挺挺扎进棕色木质衣柜并啪地合上百叶柜门 | 快速摇镜对准剧烈震动的木衣柜 | 衣柜砰地关门声 + 怪物呼啸掠过 · 「极限躲柜，差点重开」 |

## Compiled Shot Prompts

### Shot 01 (0.0s–3.8s) · Hook / 黄金前3秒

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Over-the-shoulder eerie slow push-in down the dark corridor. an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway positioned at the start of the action (steps cautiously toward a numbered wooden hotel door (050) while sweeping a bright yellow flashlight cone forward), displaying nervous worried brows and tiny sweat drop decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SORA · EN)**:
  ```text
  Camera (9:16): Over-the-shoulder eerie slow push-in down the dark corridor. Subject (r6): an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway. Action: The figure steps cautiously toward a numbered wooden hotel door (050) while sweeping a bright yellow flashlight cone forward while maintaining nervous worried brows and tiny sweat drop decal. Physics: Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。越肩机位顺着幽暗走廊缓慢推近。身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒处于动作起始位（举着亮黄色光束手电筒，迈着僵硬小步小心翼翼靠近标号050的木质房门），面部呈现紧张八字眉配额角汗珠2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SORA · ZH)**:
  ```text
  机位（9:16）：越肩机位顺着幽暗走廊缓慢推近。主体（r6）：身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒。动作：小人举着亮黄色光束手电筒，迈着僵硬小步小心翼翼靠近标号050的木质房门，紧张八字眉配额角汗珠2D贴图。物理约束：纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 02 (3.8s–7.5s) · Escalation 1 / 动作推进

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Frontal medium close-up lit only by the upward flashlight bounce. an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway positioned at the start of the action (freezes mid-step as the warm wall lamps overhead violently flicker twice and plunge the room into deep blue shadow), displaying wide white ring eyes shrinking in terror. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SORA · EN)**:
  ```text
  Camera (9:16): Frontal medium close-up lit only by the upward flashlight bounce. Subject (r6): an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway. Action: The figure freezes mid-step as the warm wall lamps overhead violently flicker twice and plunge the room into deep blue shadow while maintaining wide white ring eyes shrinking in terror. Physics: Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。仅靠手电筒反光照亮的正面中近景特写。身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒处于动作起始位（头顶暖色壁灯突然滋啦闪烁两下骤然熄灭，小人全身僵直停在半步姿态），面部呈现瞳孔骤缩的惊恐白圈眼贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SORA · ZH)**:
  ```text
  机位（9:16）：仅靠手电筒反光照亮的正面中近景特写。主体（r6）：身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒。动作：小人头顶暖色壁灯突然滋啦闪烁两下骤然熄灭，小人全身僵直停在半步姿态，瞳孔骤缩的惊恐白圈眼贴图。物理约束：纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 03 (7.5s–11.3s) · Escalation 2 / 情绪升级

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Rack-focus dolly zoom revealing the glowing eyes in the background. an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway positioned at the start of the action (rotates only its 1:1 barrel head 90 degrees backward as two glowing white eyes materialize in the dark hallway behind), displaying open silent scream mouth decal. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SORA · EN)**:
  ```text
  Camera (9:16): Rack-focus dolly zoom revealing the glowing eyes in the background. Subject (r6): an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway. Action: The figure rotates only its 1:1 barrel head 90 degrees backward as two glowing white eyes materialize in the dark hallway behind while maintaining open silent scream mouth decal. Physics: Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。背景浮现发光白眼的希区柯克变焦镜头。身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒处于动作起始位（身体不敢动，仅1:1桶状圆角脑袋缓慢向后转头，身后黑暗深处亮起两颗惨白发光眼睛），面部呈现无声张嘴呐喊2D贴图。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SORA · ZH)**:
  ```text
  机位（9:16）：背景浮现发光白眼的希区柯克变焦镜头。主体（r6）：身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒。动作：小人身体不敢动，仅1:1桶状圆角脑袋缓慢向后转头，身后黑暗深处亮起两颗惨白发光眼睛，无声张嘴呐喊2D贴图。物理约束：纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

### Shot 04 (11.3s–15.0s) · Payoff & Loop / 反转收尾

- **First-Frame Image Prompt (EN)**:
  ```text
  9:16 vertical keyframe still. Fast whip-pan to the rattling wooden closet. an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway positioned at the start of the action (pivots 180 degrees and dives stiffly into a brown wooden wardrobe closet, slamming the slatted doors shut), displaying eyes peeking through wardrobe slats. Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **Video Motion Prompt (SORA · EN)**:
  ```text
  Camera (9:16): Fast whip-pan to the rattling wooden closet. Subject (r6): an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway. Action: The figure pivots 180 degrees and dives stiffly into a brown wooden wardrobe closet, slamming the slatted doors shut while maintaining eyes peeking through wardrobe slats. Physics: Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.
  ```
- **首帧静态图提示词 (ZH)**:
  ```text
  9:16竖屏首帧关键帧静帧。快速摇镜对准剧烈震动的木衣柜。身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒处于动作起始位（180度原地干脆转身，直挺挺扎进棕色木质衣柜并啪地合上百叶柜门），面部呈现透过百叶门缝惊恐偷看的墨点眼。纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```
- **图生视频动态提示词 (SORA · ZH)**:
  ```text
  机位（9:16）：快速摇镜对准剧烈震动的木衣柜。主体（r6）：身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒。动作：小人180度原地干脆转身，直挺挺扎进棕色木质衣柜并啪地合上百叶柜门，透过百叶门缝惊恐偷看的墨点眼。物理约束：纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。
  ```

## Shared Anti-Drift Negative Prompt

```text
human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark
人类五指，真实人手，乐高C型夹爪手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字
```
