#!/usr/bin/env node
/**
 * shot_compiler.mjs
 * Zero-dependency CLI storyboard planner and engine-specific I2V/T2V prompt compiler
 * for 9:16 Roblox-style blocky short videos.
 */

const TEMPLATES = {
  "daily-meltdown": {
    titleZh: "周一早八闹钟破防记",
    titleEn: "Monday 8 AM Alarm Meltdown",
    defaultRig: "chibi-blocky",
    defaultMaterial: "glossy-vinyl",
    subjectEn: "a 2.4-head chibi blocky Roblox-style toy figure with a smooth studless cream cylindrical head, flat 2D screen-printed face decal, fingerless and clawless solid 1x2x1 rectangular block hands, and a pastel matcha hoodie",
    subjectZh: "2.4头身盲盒高光PVC材质的Roblox方块小人（平滑无颗粒圆柱头、纯平2D丝网印刷五官贴图、1x2x1实心平头倒角方柱手、穿抹茶绿倒角方柱卫衣）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "pops its cylindrical blocky head rapidly up from behind a vibrating miniature red blocky alarm clock on the desk",
        actionZh: "从桌面剧烈震动的红色微缩方块闹钟后方猛地探出圆柱体方块脑袋",
        faceEn: "wide hollow ring eyes and an open rectangular gasp mouth painted flat on the face decal",
        faceZh: "脸部2D贴图呈现空心圆圈震惊眼与长方形张嘴倒吸凉气表情",
        cameraEn: "Extreme close-up, rapid dolly push-in with subtle handheld impact shake",
        cameraZh: "大特写机位极速推近，伴随闹钟震动的轻微镜头抖动",
        hailuoTag: "[Push in, Shake]",
        sfx: "刺耳电子闹钟声 + 塑料弹跳音",
        caption: "早八人的痛，谁懂？"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "pivots its rigid right rectangular arm downward at the shoulder hinge to slam the red alarm clock flat",
        actionZh: "右侧刚性倒角方柱手臂沿肩部转轴干脆利落地向下挥落，用1x2x1实心平头方柱手一巴掌拍扁闹钟",
        faceEn: "grumpy squinted line eyes (-_-) and a tiny wavy frown decal",
        faceZh: "2D贴图切换为起床气眯眯眼(-_-)与波浪小撇嘴",
        cameraEn: "Medium side-angle macro shot, 50mm f/2.8 shallow depth of field",
        cameraZh: "中景侧面微距机位，50mm f/2.8浅景深虚化背景",
        hailuoTag: "[Static shot]",
        sfx: "清脆ABS塑料拍击声 (Clack!)",
        caption: "再睡五分钟…就五分钟"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "sits stiffly in front of a glowing miniature blocky laptop as blue 2D waterfall tear strips appear on its cheeks",
        actionZh: "笔直僵硬地坐在发光的微缩方块笔记本电脑前，脸颊两侧浮现出蓝色2D瀑布流泪贴图条",
        faceEn: "streaming blue painted tear bands and a wailing rectangular mouth decal",
        faceZh: "双颊蓝色印刷宽面条眼泪贴图与委屈长方嘴",
        cameraEn: "Over-the-shoulder dolly arc to front medium close-up under cool screen light",
        cameraZh: "越肩镜头平滑环绕至正面中近景，电脑屏幕冷光打亮圆润塑料倒角",
        hailuoTag: "[Pan right, Push in]",
        sfx: "密集的消息提示音 + 委屈气泡音",
        caption: "打开电脑：99+ 未读消息"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "tilts its rigid rectangular torso forward 90 degrees at the waist hinge and face-plants flat onto the miniature keyboard with a slight plastic bounce",
        actionZh: "长方体躯干沿腰部机械转轴直挺挺向前倾倒90度，平滑圆柱脑袋啪地平拍在微缩键盘上并轻微回弹一下",
        faceEn: "dizzy spiral eyes (@_@) painted flat on the side of the head",
        faceZh: "2D贴图定格为蚊香眩晕眼(@_@)",
        cameraEn: "High-angle isometric lock-off shot matching the desk geometry of Shot 1",
        cameraZh: "45度高角度微缩模型固定俯拍，与第一镜桌面构图衔接形成循环",
        hailuoTag: "[Tilt down, Static shot]",
        sfx: "经典闷响 (Oof!) + 键盘清脆塑料声",
        caption: "已老实，申请重启人生"
      }
    ]
  },
  "duo-comedy": {
    titleZh: "精致潮人与黄皮新手的闺蜜反差",
    titleEn: "Fashion UGC vs Classic Noob Bestie Contrast",
    defaultRig: "r15",
    defaultMaterial: "matte-abs",
    subjectEn: "two contrasting Roblox-style blocky figures: on the left, a glossy Y2K streetwear blocky avatar with star sunglasses; on the right, a classic yellow-head blue-torso R6 Noob with fingerless and clawless solid 1x2x1 rectangular block hands",
    subjectZh: "同框反差双人Roblox方块小人：左侧为戴星星墨镜的Y2K高光潮牌方块小人，右侧为经典黄头蓝衣绿腿的R6刚性新手小人（均为1x2x1实心平头方柱手与2D印刷五官）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "strike contrasting poses side by side: the Y2K avatar poses with solid 1x2x1 rectangular block hands on hips while the Classic Noob stands completely stiff like a wooden plank",
        actionZh: "并排反差亮相：左侧潮人小人1x2x1实心方柱手叉腰摆出时尚造型，右侧经典黄皮新手像木板一样笔直僵立一动不动",
        faceEn: "left avatar has a confident smirk decal; right Noob has the unchanging classic black line smile",
        faceZh: "左侧自信歪嘴笑2D贴图，右侧永恒不变的经典呆萌线条笑脸",
        cameraEn: "Fast snap-zoom into a two-shot medium framing on a pastel studio stage",
        cameraZh: "中景双人同框极速推镜，马卡龙色摄影棚舞台背景",
        hailuoTag: "[Push in]",
        sfx: "时尚快门声 + 滑稽木鱼声",
        caption: "出门逛街：精修闺蜜 vs 我"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "the Y2K avatar performs a flashy 180-degree spin and accidentally bumps the Classic Noob with its boxy purple backpack",
        actionZh: "左侧潮人小人原地华丽转身180度，背上的紫色微缩方盒背包不小心撞了一下右侧新手小人",
        faceEn: "left avatar winks; right Noob keeps the exact same blank smile while getting bumped",
        faceZh: "左侧眨眼放电贴图，右侧被撞瞬间依然保持一模一样的呆萌微笑",
        cameraEn: "Low-angle tracking shot capturing the backpack collision",
        cameraZh: "低角度微仰拍平移，清晰捕捉方块背包碰撞瞬间",
        hailuoTag: "[Pan left]",
        sfx: "清脆塑料撞击声 (Bonk!)",
        caption: "试图配合演出的我"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "the Classic Noob tips sideways at a rigid 45-degree angle without bending knees or elbows and lands flat on a pastel beanbag",
        actionZh: "右侧经典新手小人不弯膝盖不弯手肘，全身保持笔直刚体状态呈45度直挺挺向侧后方倒进懒人沙发里",
        faceEn: "unchanging painted smile on the Noob; shocked hollow eyes on the Y2K avatar",
        faceZh: "倒地的新手依旧保持默认微笑，潮人小人切换为震惊圆圈眼贴图",
        cameraEn: "Medium wide static tripod shot with subtle impact shake",
        cameraZh: "中全景固定机位，落地瞬间轻微震动反馈",
        hailuoTag: "[Shake, Static shot]",
        sfx: "经典倒地闷响 + 弹簧音",
        caption: "物理引擎：直接罢工"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "both blocky avatars slowly rotate only their cylindrical heads 45 degrees to stare directly into the camera lens",
        actionZh: "两个方块小人身体完全静止，仅圆柱体脑袋同时缓慢转动45度直勾勾盯向镜头",
        faceEn: "synchronized deadpan horizontal line eyes (-_-) on both avatars",
        faceZh: "两人同步切换为沉默死鱼眼(-_-)2D贴图",
        cameraEn: "Slow dolly pull-back to the opening two-shot composition",
        cameraZh: "镜头缓慢拉远回到开场双人构图",
        hailuoTag: "[Pull out]",
        sfx: "轻微塑料转轴摩擦声 + 乌鸦飞过",
        caption: "确认过眼神，是亲闺蜜"
      }
    ]
  },
  "obby-storytime": {
    titleZh: "多巴胺天空跑酷闯关剧场",
    titleEn: "Pastel Sky Obby Parkour Storytime",
    defaultRig: "r6",
    defaultMaterial: "matte-abs",
    subjectEn: "a classic R6 Roblox-style blocky runner with a smooth yellow cylindrical head, cyan blocky jersey, fingerless and clawless solid 1x2x1 rectangular block hands, and a miniature twin jetpack",
    subjectZh: "经典R6刚性比例Roblox跑酷方块小人（平滑亮黄圆柱头、青色运动方柱上衣、1x2x1实心平头方柱手、背微缩双联方块喷气包）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "leaps with stiff swinging rectangular arms and legs across two floating pastel-pink beveled platforms high above a sea of clouds",
        actionZh: "摆动笔直的倒角方柱四肢，在云海之上的两块马卡龙粉浮空倒角方块平台间干脆利落地跃过",
        faceEn: "determined wide 2D ink eyes and energetic open grin decal",
        faceZh: "专注大眼与充满活力的2D印刷笑脸贴图",
        cameraEn: "Dynamic third-person follow camera closely trailing the blocky runner",
        cameraZh: "第三人称跟随镜头紧贴小人后方高速推进",
        hailuoTag: "[Push in, Tilt up]",
        sfx: "清脆跳跃弹簧音 (Boing!)",
        caption: "千万别往脚下看！"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "hops rhythmically across three rotating mint-green cylindrical rollers without bending its knees",
        actionZh: "保持膝盖笔直的R6刚体姿态，在三个旋转的薄荷绿圆柱滚筒上连续轻快跳步通过",
        faceEn: "focused eyes with a single painted sweat drop on the temple",
        faceZh: "眼神紧盯前方，额角带一滴2D绘制汗珠贴图",
        cameraEn: "Side-profile tracking shot moving parallel to the floating obstacle course",
        cameraZh: "侧面平行跟拍镜头，展现浮空闯关纵深感",
        hailuoTag: "[Pan right]",
        sfx: "连续三声塑料踏步清脆哒哒声",
        caption: "这波操作打几分？"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "skids to a halt at the edge of a translucent glass block as the platform ahead flashes red, waving both stiff blocky arms for balance",
        actionZh: "在半透明玻璃方块边缘急停，前方平台闪烁红光，双侧笔直方柱手臂像风车一样前后摆动维持平衡",
        faceEn: "wide panicked ring eyes and wavy mouth decal",
        faceZh: "惊慌圆圈眼与波浪嘴2D贴图",
        cameraEn: "High-angle dramatic crane shot looking down into the pastel cloud abyss",
        cameraZh: "高角度俯拍大景深，展现脚下云海深渊反差",
        hailuoTag: "[Tilt down]",
        sfx: "急刹车音效 + 警报滴滴声",
        caption: "差点触发经典自由落体"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "fires a puff of blocky white cloud rings from its mini jetpack and lands cleanly on the pink checkpoint pad in the exact pose of Shot 1",
        actionZh: "背后微缩喷气包喷出两团圆环状方块白烟，稳稳降落在粉色存档点平台上，落地姿态与第一镜完全重合",
        faceEn: "cheerful star-eyed victory grin decal",
        faceZh: "星星眼胜利微笑2D贴图",
        cameraEn: "Return to third-person follow framing for seamless loop replay",
        cameraZh: "机位平滑归位至开场第三人称跟拍视角实现无缝循环",
        hailuoTag: "[Push in]",
        sfx: "通关叮咚音效 (Checkpoint Ding!)",
        caption: "丝滑通关，无缝再来亿遍"
      }
    ]
  },
  "mini-tycoon": {
    titleZh: "治愈系微缩羊角包咖啡馆",
    titleEn: "Cozy Miniature Croissant Café Tycoon",
    defaultRig: "chibi-blocky",
    defaultMaterial: "clay-soft",
    subjectEn: "a 2.4-head chibi blocky bakery chef with a soft-touch clay-plastic finish, puffy white blocky chef hat, caramel apron, flat 2D happy face decal, and fingerless and clawless solid 1x2x1 rectangular block hands",
    subjectZh: "2.4头身柔感黏土塑料材质的Roblox甜点师方块小人（戴圆角方块白厨师帽、焦糖棕围裙、纯平2D弯弯笑眼贴图、1x2x1实心平头方柱手）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "pops cheerfully up from behind a sunlit miniature wooden bakery display case filled with glossy blocky pastries",
        actionZh: "从洒满晨光的微缩木质甜点展示柜后方轻快地弹起亮相，柜内摆满圆角方块可颂与蛋糕",
        faceEn: "warm curved happy eyes (^^) and rosy cheek decals",
        faceZh: "弯弯笑眼(^^)配暖粉腮红2D贴图",
        cameraEn: "45-degree isometric macro tilt-shift view pushing gently toward the counter",
        cameraZh: "45度微缩模型移轴微距俯拍，镜头轻柔推向吧台",
        hailuoTag: "[Push in]",
        sfx: "治愈风铃声 + 烤箱叮声",
        caption: "欢迎光临微缩方块烘焙屋"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "uses its fingerless and clawless solid 1x2x1 rectangular block hands to clamp a golden blocky croissant onto a pastel tray with a crisp snap",
        actionZh: "用1x2x1实心平头倒角方柱手稳稳夹起一个金黄圆角方块可颂，啪嗒一声精准卡入马卡龙色托盘槽位中",
        faceEn: "focused cute tongue-blep decal on the smooth cylindrical head",
        faceZh: "专注可爱的微吐舌头2D贴图",
        cameraEn: "Extreme macro close-up on the solid 1x2x1 rectangular block hands and tray",
        cameraZh: "手部C型夹爪与托盘微距大特写，展现细腻倒角质感",
        hailuoTag: "[Static shot]",
        sfx: "清脆积木卡扣声 (ASMR Snap!)",
        caption: "强迫症极度舒适的摆盘"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "slides a steaming miniature blocky latte cup across the counter toward a tiny blocky customer wearing a cat-ear beanie",
        actionZh: "将一杯冒着方块感热气的微缩拿铁沿桌面稳稳推向戴猫耳帽的方块小顾客",
        faceEn: "sparkling star-eyed decals on both blocky characters",
        faceZh: "店员与小顾客同时亮起星星眼2D贴图",
        cameraEn: "Side-profile counter tracking shot following the sliding latte cup",
        cameraZh: "沿吧台侧面平行跟拍拿铁杯滑行轨迹",
        hailuoTag: "[Pan left]",
        sfx: "杯底轻滑声 + 可爱气泡音",
        caption: "今日份开心已出品"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "waves one stiff rectangular arm happily as three glossy golden coin blocks pop upward above the cash register",
        actionZh: "单侧倒角方柱手臂轻快挥动，收银机上方弹起三枚高光金色圆角方块金币",
        faceEn: "beaming happy smile decal under warm pendant lamp light",
        faceZh: "暖光吊灯下的治愈笑脸2D贴图",
        cameraEn: "Gentle pull-back to the opening 45-degree isometric bakery diorama view",
        cameraZh: "镜头轻柔拉回开场45度微缩甜点屋全景，实现丝滑循环",
        hailuoTag: "[Pull out]",
        sfx: "清脆金币收集音 (Coin Chime!)",
        caption: "金币+999，明天继续营业"
      }
    ]
  },
  "outfit-drop": {
    titleZh: "T台卡点潮玩变装秀",
    titleEn: "Runway Beat-Drop UGC Outfit Transition",
    defaultRig: "r15",
    defaultMaterial: "glossy-vinyl",
    subjectEn: "an R15 Roblox-style blocky fashion avatar with a smooth cylindrical head, flat 2D decal face, and fingerless and clawless solid 1x2x1 rectangular block hands on a glowing runway podium",
    subjectZh: "站在发光T台上的R15分段比例Roblox穿搭方块小人（平滑圆柱头、纯平2D印刷五官、1x2x1实心平头方柱手、高光盲盒PVC材质）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "stands shyly in a plain matte-gray blocky base outfit under a single flickering white spotlight, looking down at its blocky feet",
        actionZh: "身穿朴素浅灰基础款方块服装站在闪烁的单一白光聚光灯下，圆柱脑袋微微低垂看向自己的方块脚尖",
        faceEn: "shy sweat-drop decal with small oval ink eyes",
        faceZh: "害羞汗珠2D贴图与小巧墨点眼",
        cameraEn: "High-angle medium shot slowly pushing down toward the podium",
        cameraZh: "高角度中景缓慢下推，营造变装前蓄力感",
        hailuoTag: "[Push in, Tilt down]",
        sfx: "倒计时心跳节拍声",
        caption: "变装前：平平无奇小方块"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "leaps straight upward with rigid blocky legs as a glowing ring of neon star blocks swirls around its torso",
        actionZh: "双侧方柱腿干脆发力垂直起跳，一圈发光霓虹五角星方块环绕躯干高速旋转",
        faceEn: "eyes closed in concentration before the beat drop",
        faceZh: "闭眼蓄力2D贴图，迎接卡点重音",
        cameraEn: "Rapid upward tilt following the jump into the light ring",
        cameraZh: "镜头随起跳动作快速上摇并切入高光光环",
        hailuoTag: "[Tilt up]",
        sfx: "合成器升调蓄力音 (Riser)",
        caption: "3、2、1，准备卡点！"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "lands firmly on the neon podium now dressed in a glossy cyber-pink puffer jacket, oversized cream headphones, and fluffy leg warmers",
        actionZh: "重音落地瞬间完成换装：身穿高光赛博粉方块羽绒服、颈挂奶油白大号耳机配毛绒方块腿套稳稳踏在霓虹T台上",
        faceEn: "confident star-eyed wink and glossy smirk decal",
        faceZh: "自信星星眼单眼Wink与歪嘴笑2D贴图",
        cameraEn: "Low-angle hero shot with impact camera shake and neon rim light burst",
        cameraZh: "低角度仰拍英雄机位，配合落地轻震与霓虹边缘轮廓光爆发",
        hailuoTag: "[Shake, Tilt up]",
        sfx: "重低音卡点爆发 (Bass Drop + Flash!)",
        caption: "全场焦点已就位"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "raises its right fingerless solid 1x2x1 rectangular block hand to tilt its star-framed sunglasses on its forehead while camera flashes pop in the background",
        actionZh: "抬起右侧1x2x1实心平头方柱手轻扶额头五角星墨镜，背景亮起密集的T台闪光灯",
        faceEn: "cool unbothered idol smile decal",
        faceZh: "酷飒偶像微笑2D贴图",
        cameraEn: "Smooth 30-degree orbit around the glossy blocky figure",
        cameraZh: "围绕高光方块小人平滑环绕30度定格",
        hailuoTag: "[Pan right]",
        sfx: "连续相机快门闪光声",
        caption: "这套穿搭给几星？"
      }
    ]
  },
  "meme-slapstick": {
    titleZh: "黑暗料理与刚体倒地梗图",
    titleEn: "Burnt Pizza Deadpan R6 Ragdoll Slapstick",
    defaultRig: "r6",
    defaultMaterial: "glossy-vinyl",
    subjectEn: "a classic R6 Roblox-style blocky figure with a bright yellow cylindrical head, blue blocky torso, green blocky legs, white chef hat, and fingerless and clawless solid 1x2x1 rectangular block hands",
    subjectZh: "戴白色方块厨师帽的经典R6黄头蓝衣Roblox方块小人（1x2x1实心平头方柱手、纯平2D默认微笑贴图、刚性不弯曲四肢）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "proudly holds up a completely charred, pitch-black blocky pizza on a silver tray using both fingerless and clawless solid 1x2x1 rectangular block hands",
        actionZh: "用双侧1x2x1实心平头方柱手骄傲地端起托盘，上面放着一块烤得乌黑发亮的圆角方块黑暗料理披萨",
        faceEn: "cheerful unchanging default black-line smile decal despite the disaster",
        faceZh: "面对灾难现场依然保持毫无波澜的经典2D默认微笑贴图",
        cameraEn: "Fast crash-zoom from medium shot to close-up in a bright kitchen",
        cameraZh: "明亮微缩厨房内从中景极速推至特写",
        hailuoTag: "[Push in]",
        sfx: "欢快小号声突然走调",
        caption: "耗时三小时的诚意大作"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "stands completely motionless as the kitchen lights abruptly cut out, leaving only a harsh white top spotlight on its smiling yellow head",
        actionZh: "全身保持绝对静止，厨房灯光骤然熄灭，仅剩一束冷白顶光直直打在微笑的黄色圆柱头上",
        faceEn: "the exact same painted smile staring into the void under harsh top shadows",
        faceZh: "冷酷顶光阴影下一模一样的2D印刷微笑",
        cameraEn: "Locked-off frontal close-up, zero camera motion",
        cameraZh: "正脸特写死死固定机位，零运镜强化荒诞感",
        hailuoTag: "[Static shot]",
        sfx: "电闸拉下咔哒声 + 悬疑低音弦乐",
        caption: "空气突然安静"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "a puff of gray blocky smoke rises from the burnt pizza while the avatar's left yellow rectangular arm block detaches cleanly and clatters onto the table",
        actionZh: "焦黑披萨升起一朵灰色方块烟雾，同时小人左侧黄色方柱手臂沿肩部接缝干脆脱落，啪嗒掉在餐桌上",
        faceEn: "still smiling without blinking",
        faceZh: "依然眨都不眨地保持默认微笑贴图",
        cameraEn: "Medium shot with a subtle downward tilt toward the detached blocky arm",
        cameraZh: "中景轻微下摇看向掉落桌面的方柱手臂",
        hailuoTag: "[Tilt down]",
        sfx: "清脆乐高/积木散架声 (Plastic Clatter!)",
        caption: "心态与胳膊一起崩了"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "tips sideways at a strict 90-degree angle onto the kitchen floor like a solid statue without bending a single joint",
        actionZh: "全身不弯曲任何一个关节，像一块完整的积木雕像一样呈90度直挺挺向侧面拍倒在厨房地板上",
        faceEn: "sideways default smile decal facing the camera from the floor",
        faceZh: "倒在地板上依然侧着脸对镜头保持微笑贴图",
        cameraEn: "Wide locked-off diorama shot with a tiny floor-impact shake",
        cameraZh: "微缩厨房全景固定机位，倒地瞬间轻微震动",
        hailuoTag: "[Shake, Static shot]",
        sfx: "经典闷响 (Oof!) + 结束定格鼓点",
        caption: "厨神生涯，到此为止"
      }
    ]
  }
};

const NEGATIVE_GUARD =
  "human fingers, five-fingered hand, Lego solid 1x2x1 rectangular block hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark";

const NEGATIVE_GUARD_ZH =
  "人类五指，真实人手，乐高1x2x1实心平头方柱手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形，水印文字";

function printHelp() {
  console.log(`Usage: node scripts/shot_compiler.mjs [options]

Compile a 9:16 Roblox-style short-video storyboard and engine-tuned I2V/T2V prompts.

Options:
  --template <id>    Template: daily-meltdown | duo-comedy | obby-storytime |
                     mini-tycoon | outfit-drop | meme-slapstick (default: daily-meltdown)
  --duration <sec>   Target duration: 15 | 30 | 45 (default: 15)
  --engine <id>      Target engine: kling | seedance | hailuo | wan | sora | runway (default: kling)
  --rig <id>         Override rig: chibi-blocky | r6 | r15
  --aspect <ratio>   Aspect ratio: 9:16 | 16:9 | 1:1 (default: 9:16)
  --topic <string>   Optional custom topic subtitle override
  --lang <mode>      Output language: zh-en | zh | en (default: zh-en)
  --json             Output structured JSON
  --help             Show this help message`);
}

export function parseArgs(argv) {
  const opts = {
    template: "daily-meltdown",
    duration: 15,
    engine: "kling",
    rig: "",
    aspect: "9:16",
    topic: "",
    lang: "zh-en",
    json: false,
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--template" && argv[i + 1]) opts.template = argv[++i];
    else if (arg === "--duration" && argv[i + 1]) opts.duration = Number(argv[++i]) || 15;
    else if (arg === "--engine" && argv[i + 1]) opts.engine = argv[++i].toLowerCase();
    else if (arg === "--rig" && argv[i + 1]) opts.rig = argv[++i].toLowerCase();
    else if (arg === "--aspect" && argv[i + 1]) opts.aspect = argv[++i];
    else if (arg === "--topic" && argv[i + 1]) opts.topic = argv[++i];
    else if (arg === "--lang" && argv[i + 1]) opts.lang = argv[++i];
  }
  return opts;
}

function formatEnginePrompt(shot, tpl, engine, aspect, rig) {
  const geometryTailEn =
    "Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, SmoothPlastic shader on a classic Roblox studded baseplate, Motor6D rigid hinge joints.";
  const geometryTailZh =
    "纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料配经典Roblox方格Studs底板，Motor6D刚性转轴关节。";

  let i2vPromptEn = "";
  let i2vPromptZh = "";

  switch (engine) {
    case "hailuo":
      i2vPromptEn = `${shot.hailuoTag} (${aspect} vertical, ${rig} rig) Featuring ${tpl.subjectEn}. The character ${shot.actionEn}, showing ${shot.faceEn}. ${geometryTailEn}`;
      i2vPromptZh = `${shot.hailuoTag}（${aspect}竖屏，${rig}骨架）画面主体为${tpl.subjectZh}。小人${shot.actionZh}，${shot.faceZh}。${geometryTailZh}`;
      break;
    case "seedance":
      i2vPromptEn = `[Seedance I2V · ${aspect}] ${shot.cameraEn}. ${tpl.subjectEn} ${shot.actionEn} with crisp Roblox Motor6D timing; ${shot.faceEn}. ${geometryTailEn}`;
      i2vPromptZh = `【即梦/Seedance首帧I2V · ${aspect}】${shot.cameraZh}。${tpl.subjectZh}${shot.actionZh}，${shot.faceZh}。动作干脆利落有Roblox刚体节奏感，${geometryTailZh}`;
      break;
    case "wan":
      i2vPromptEn = `${aspect} vertical 3D Roblox SmoothPlastic render. ${shot.cameraEn}. Subject: ${tpl.subjectEn} ${shot.actionEn}. Expression: ${shot.faceEn}. ${geometryTailEn}`;
      i2vPromptZh = `${aspect}竖屏3D纯正Roblox渲染，${shot.cameraZh}。主体：${tpl.subjectZh}${shot.actionZh}，${shot.faceZh}。${geometryTailZh}`;
      break;
    case "sora":
    case "runway":
      i2vPromptEn = `Camera (${aspect}): ${shot.cameraEn}. Subject (${rig}): ${tpl.subjectEn}. Action: The figure ${shot.actionEn} while maintaining ${shot.faceEn}. Physics: ${geometryTailEn}`;
      i2vPromptZh = `机位（${aspect}）：${shot.cameraZh}。主体（${rig}）：${tpl.subjectZh}。动作：小人${shot.actionZh}，${shot.faceZh}。物理约束：${geometryTailZh}`;
      break;
    case "kling":
    default:
      i2vPromptEn = `[Kling I2V · ${aspect}] ${tpl.subjectEn} ${shot.actionEn}. Facial decal: ${shot.faceEn}. Camera: ${shot.cameraEn}. ${geometryTailEn}`;
      i2vPromptZh = `【可灵I2V · ${aspect}】${tpl.subjectZh}${shot.actionZh}，${shot.faceZh}。运镜：${shot.cameraZh}。${geometryTailZh}`;
      break;
  }

  const firstFramePromptEn = `${aspect} vertical keyframe still. ${shot.cameraEn}. ${tpl.subjectEn} positioned at the start of the action (${shot.actionEn}), displaying ${shot.faceEn}. ${geometryTailEn}`;
  const firstFramePromptZh = `${aspect}竖屏首帧关键帧静帧。${shot.cameraZh}。${tpl.subjectZh}处于动作起始位（${shot.actionZh}），面部呈现${shot.faceZh}。${geometryTailZh}`;

  return {
    firstFramePromptEn,
    firstFramePromptZh,
    i2vPromptEn,
    i2vPromptZh
  };
}

export function compileStoryboard(rawOpts = {}) {
  const templateKey = TEMPLATES[rawOpts.template] ? rawOpts.template : "daily-meltdown";
  const tpl = TEMPLATES[templateKey];
  const duration = [15, 30, 45].includes(Number(rawOpts.duration)) ? Number(rawOpts.duration) : 15;
  const engine = ["kling", "seedance", "hailuo", "wan", "sora", "runway"].includes(rawOpts.engine)
    ? rawOpts.engine
    : "kling";
  const rig = rawOpts.rig || tpl.defaultRig;
  const aspect = rawOpts.aspect || "9:16";
  const topicNote = rawOpts.topic ? ` (${rawOpts.topic})` : "";

  const baseShots = tpl.shots;
  const targetShotCount = duration === 15 ? 4 : duration === 30 ? 8 : 12;
  const slotSeconds = Number((duration / targetShotCount).toFixed(2));

  const compiledShots = [];
  for (let i = 0; i < targetShotCount; i++) {
    const sourceShot = baseShots[i % baseShots.length];
    const cycleIndex = Math.floor(i / baseShots.length);
    const startSec = (i * slotSeconds).toFixed(1);
    const endSec = (i === targetShotCount - 1 ? duration : (i + 1) * slotSeconds).toFixed(1);
    const prompts = formatEnginePrompt(sourceShot, tpl, engine, aspect, rig);

    compiledShots.push({
      shotNumber: i + 1,
      timeWindow: `${startSec}s–${endSec}s`,
      role: cycleIndex === 0 ? sourceShot.role : `${sourceShot.role} (Beat Cycle ${cycleIndex + 1})`,
      actionZh: sourceShot.actionZh,
      actionEn: sourceShot.actionEn,
      faceZh: sourceShot.faceZh,
      faceEn: sourceShot.faceEn,
      cameraZh: sourceShot.cameraZh,
      cameraEn: sourceShot.cameraEn,
      sfx: sourceShot.sfx,
      caption: sourceShot.caption,
      ...prompts,
      negativePromptEn: NEGATIVE_GUARD,
      negativePromptZh: NEGATIVE_GUARD_ZH
    });
  }

  return {
    template: templateKey,
    title: `${tpl.titleZh} / ${tpl.titleEn}${topicNote}`,
    engine,
    rig,
    material: tpl.defaultMaterial,
    aspect,
    durationSeconds: duration,
    shotCount: compiledShots.length,
    workflowMode: "First-Frame I2V (首帧图生视频)",
    shots: compiledShots
  };
}

export function formatStoryboardMarkdown(plan, lang = "zh-en") {
  const lines = [];
  lines.push(`# 9:16 Short-Video Storyboard & Prompt Pack: ${plan.title}`);
  lines.push("");
  lines.push(`- **Template / 模板**: \`${plan.template}\``);
  lines.push(`- **Target Engine / 目标模型**: \`${plan.engine}\` (${plan.workflowMode})`);
  lines.push(`- **Rig & Material / 骨架与材质**: \`${plan.rig}\` · \`${plan.material}\``);
  lines.push(`- **Format & Duration / 画幅与时长**: \`${plan.aspect}\` · \`${plan.durationSeconds}s\` (\`${plan.shotCount}\` shots, 1 primary action per clip)`);
  lines.push("");
  lines.push("## Beat Sheet Overview / 黄金分镜节奏表");
  lines.push("");
  lines.push("| Shot | Time | Beat Role | Single Action / 单一刚体动作 | Camera / 运镜 | SFX & Caption / 音效与花字 |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const s of plan.shots) {
    const actionText = lang === "en" ? s.actionEn : s.actionZh;
    const cameraText = lang === "en" ? s.cameraEn : s.cameraZh;
    lines.push(
      `| ${String(s.shotNumber).padStart(2, "0")} | ${s.timeWindow} | ${s.role} | ${actionText} | ${cameraText} | ${s.sfx} · 「${s.caption}」 |`
    );
  }
  lines.push("");
  lines.push("## Compiled Shot Prompts / 分镜首帧与动态提示词");
  lines.push("");

  for (const s of plan.shots) {
    lines.push(`### Shot ${String(s.shotNumber).padStart(2, "0")} (${s.timeWindow}) · ${s.role}`);
    lines.push("");
    if (lang !== "zh") {
      lines.push("- **First-Frame Image Prompt (EN)**:");
      lines.push("  ```text");
      lines.push(`  ${s.firstFramePromptEn}`);
      lines.push("  ```");
      lines.push(`- **Video Motion Prompt (${plan.engine.toUpperCase()} · EN)**:`);
      lines.push("  ```text");
      lines.push(`  ${s.i2vPromptEn}`);
      lines.push("  ```");
    }
    if (lang !== "en") {
      lines.push("- **首帧静态图提示词 (ZH)**:");
      lines.push("  ```text");
      lines.push(`  ${s.firstFramePromptZh}`);
      lines.push("  ```");
      lines.push(`- **图生视频动态提示词 (${plan.engine.toUpperCase()} · ZH)**:`);
      lines.push("  ```text");
      lines.push(`  ${s.i2vPromptZh}`);
      lines.push("  ```");
    }
    lines.push("");
  }

  lines.push("## Shared Anti-Drift Negative Prompt / 统一负向防串味词");
  lines.push("");
  lines.push("```text");
  lines.push(lang === "zh" ? NEGATIVE_GUARD_ZH : `${NEGATIVE_GUARD}\n${NEGATIVE_GUARD_ZH}`);
  lines.push("```");

  return lines.join("\n");
}

const isMain = process.argv[1] && process.argv[1].endsWith("shot_compiler.mjs");
if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    process.exit(0);
  }
  const plan = compileStoryboard(opts);
  if (opts.json) {
    console.log(JSON.stringify(plan, null, 2));
  } else {
    console.log(formatStoryboardMarkdown(plan, opts.lang));
  }
}
