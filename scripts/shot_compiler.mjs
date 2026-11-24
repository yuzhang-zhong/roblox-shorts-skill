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
        cameraEn: "Extreme macro close-up on the solid 1x2x1 rectangular block hands, flaky golden croissant, and espresso machine behind the counter",
        cameraZh: "1x2x1实心平头方柱手、多层金黄羊角包与身后意式咖啡机的微距大特写",
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
        sfx: "清脆Roblox部件散落声 (Motor6D Clatter!)",
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
  },
  "disaster-survival": {
    titleZh: "自然灾害模拟器：高塔龙卷风",
    titleEn: "Natural Disaster Survival: Tornado Tower",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "an authentic R6 blocky Classic Guest-style avatar wearing a plain unbranded red baseball cap and black jacket with a white geometric triangle chest emblem and flush 1x2x1 blocky legs (zero brand logos)",
    subjectZh: "头戴纯色无标红棒球帽、身穿黑底白色几何三角形胸章2x2x1夹克与并拢1x2x1方柱长裤的R6游客风小人（无任何品牌商标Logo）",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "stands atop a multi-pillar green and wooden observation watchtower with yellow guardrails, pointing rigidly at a swirling dark-gray tornado funnel whipping flying planks across the grass island",
        actionZh: "站在带黄色护栏与木梁支架的绿色瞭望高塔顶端，抬起右侧1x2x1实心方柱手指向远处卷着木板碎片席卷草地岛屿的深灰龙卷风漏斗",
        faceEn: "wide white shocked ring eyes and open gasp mouth decal",
        faceZh: "震惊白圈眼与张嘴倒吸凉气2D贴图",
        cameraEn: "Low-angle dramatic push-in with wind camera shake",
        cameraZh: "低角度仰拍极速推近，伴随狂风镜头震动",
        hailuoTag: "[Push in, Shake]",
        sfx: "警报蜂鸣声 + 呼啸风声",
        caption: "警报：黑色龙卷风来袭！"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "clings stiffly to a yellow guardrail block as loose green roof bricks rip away and whirl upward around the tower",
        actionZh: "用实心平头方块手死死抵住黄色方块护栏，头顶绿色屋顶积木块被狂风掀飞在空中旋转",
        faceEn: "upturned panicked brows and clenched teeth decal",
        faceZh: "慌张八字眉与咬牙2D贴图",
        cameraEn: "Medium tracking shot orbiting the swaying tower top",
        cameraZh: "围绕摇晃塔顶的中景环绕跟拍",
        hailuoTag: "[Pan right, Shake]",
        sfx: "积木崩裂清脆声 + 强风音",
        caption: "塔顶要塌了！抓紧！"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "hops desperately from a falling green floor plate onto the last remaining central pillar block",
        actionZh: "在脚下绿色底板坠落瞬间，保持R6直腿姿态猛地跳向中间最后一根幸存方柱",
        faceEn: "streaming cyan waterfall tear bands decal",
        faceZh: "双颊蓝色瀑布流泪2D贴图",
        cameraEn: "High-angle crane shot looking down at falling blocks",
        cameraZh: "高角度俯拍坠落的方块碎片",
        hailuoTag: "[Tilt down]",
        sfx: "连续弹簧跳跃声",
        caption: "只剩最后一块砖了！"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "stands victorious under sudden clear blue sky on the lone pillar as a green survival popup badge appears overhead",
        actionZh: "天空瞬间放晴，小人孤零零站在唯一一根柱子顶端高举单侧方柱手臂庆祝存活",
        faceEn: "classic Winning Grin (:D) decal",
        faceZh: "经典露齿大笑(:D)贴图",
        cameraEn: "Smooth pull-back to wide island framing",
        cameraZh: "平稳拉远展示荒诞孤柱全景",
        hailuoTag: "[Pull out]",
        sfx: "通关胜利欢呼音效",
        caption: "成功存活！毫发无损"
      }
    ]
  },
  "brookhaven-chase": {
    titleZh: "小镇警匪街头追逐",
    titleEn: "Brookhaven Street Police Chase",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "two authentic Roblox R6 avatars on an asphalt street: a Classic Noob sprinting ahead with a green money bag and an R6 Police Officer in a navy cap chasing behind",
    subjectZh: "小镇柏油路上的双人Roblox R6追逐：前方经典黄皮新手抱绿色钱袋狂奔，后方深蓝警帽R6警官紧追不舍",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "the yellow R6 Noob bursts out onto the striped asphalt street clutching a green cash block while red and blue siren lights flash behind",
        actionZh: "经典黄皮R6新手抱着绿色钞票方块冲上白线马路，身后红蓝警灯交替爆闪",
        faceEn: "mischievous Check-It smirk decal on the Noob",
        faceZh: "黄皮新手脸上印着挑眉坏笑(Check It)贴图",
        cameraEn: "Low front tracking shot pulling backward ahead of the runner",
        cameraZh: "贴地正前方倒退跟拍奔跑镜头",
        hailuoTag: "[Pull out, Shake]",
        sfx: "急促警笛声 (Wee-Woo!)",
        caption: "刚抢完小镇银行就遇熟人"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "the navy-uniformed R6 Police Officer swings stiff 1x2x1 arms rapidly in high-speed pursuit under flashing siren rim lights",
        actionZh: "身穿深蓝制服戴警帽的R6警官迈着高速摆动的1x2x1笔直方腿全力追赶",
        faceEn: "angry Bloxxer scowling brow decal on the officer",
        faceZh: "警官满脸严肃的愤怒皱眉2D贴图",
        cameraEn: "Side-profile parallel speed pan along the street",
        cameraZh: "沿街道侧面高速平行横移跟拍",
        hailuoTag: "[Pan left]",
        sfx: "密集塑料脚步声 + 哨声",
        caption: "前面那个黄方块站住！"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "the Noob trips over a yellow fire hydrant block and launches into a stiff horizontal R6 dive",
        actionZh: "黄皮新手脚下绊到路边黄色方块消防栓，整个人保持笔直刚体呈水平飞扑出去",
        faceEn: "wide shocked O_O eyes decal",
        faceZh: "瞬间切换为震惊圆圈眼贴图",
        cameraEn: "Medium close-up with impact shake as the cash block flies upward",
        cameraZh: "中近景碰撞震动，绿色钱袋高高抛起",
        hailuoTag: "[Shake]",
        sfx: "滑稽绊倒弹簧音 + Oof!",
        caption: "平地摔触发物理起飞"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "the officer stands calmly next to the sideways-toppled Noob as gray prison bar blocks drop into frame",
        actionZh: "警官淡定站在侧翻倒地的新手旁，画面前景落下灰色方块铁栏杆",
        faceEn: "deadpan Chill (-_-) face decal on the Noob",
        faceZh: "倒地新手切换为安详死鱼眼(-_-)贴图",
        cameraEn: "Locked-off frontal two-shot",
        cameraZh: "正面双人定格固定镜头",
        hailuoTag: "[Static shot]",
        sfx: "铁门咔嚓落锁声",
        caption: "小镇一日游到此结束"
      }
    ]
  },
  "doors-horror": {
    titleZh: "惊悚酒店手电筒走廊",
    titleEn: "Doors Hotel Flashlight Hallway",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "an authentic Roblox R6 avatar in a sky-blue hoodie holding a glowing cylindrical flashlight inside a dim wooden hotel hallway",
    subjectZh: "身穿天蓝连帽卫衣的Roblox R6主角在昏暗木质酒店走廊中举着发光圆筒手电筒",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "steps cautiously toward a numbered wooden hotel door (050) while sweeping a bright yellow flashlight cone forward",
        actionZh: "举着亮黄色光束手电筒，迈着僵硬小步小心翼翼靠近标号050的木质房门",
        faceEn: "nervous worried brows and tiny sweat drop decal",
        faceZh: "紧张八字眉配额角汗珠2D贴图",
        cameraEn: "Over-the-shoulder eerie slow push-in down the dark corridor",
        cameraZh: "越肩机位顺着幽暗走廊缓慢推近",
        hailuoTag: "[Push in]",
        sfx: "木地板吱呀声 + 低频心跳",
        caption: "第50号门…千万别闪灯"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "freezes mid-step as the warm wall lamps overhead violently flicker twice and plunge the room into deep blue shadow",
        actionZh: "头顶暖色壁灯突然滋啦闪烁两下骤然熄灭，小人全身僵直停在半步姿态",
        faceEn: "wide white ring eyes shrinking in terror",
        faceZh: "瞳孔骤缩的惊恐白圈眼贴图",
        cameraEn: "Frontal medium close-up lit only by the upward flashlight bounce",
        cameraZh: "仅靠手电筒反光照亮的正面中近景特写",
        hailuoTag: "[Static shot]",
        sfx: "灯泡电流滋啦爆闪声",
        caption: "完了，灯真的闪了？！"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "rotates only its 1:1 barrel head 90 degrees backward as two glowing white eyes materialize in the dark hallway behind",
        actionZh: "身体不敢动，仅1:1桶状圆角脑袋缓慢向后转头，身后黑暗深处亮起两颗惨白发光眼睛",
        faceEn: "open silent scream mouth decal",
        faceZh: "无声张嘴呐喊2D贴图",
        cameraEn: "Rack-focus dolly zoom revealing the glowing eyes in the background",
        cameraZh: "背景浮现发光白眼的希区柯克变焦镜头",
        hailuoTag: "[Zoom in, Shake]",
        sfx: "深渊低吼渐强音效",
        caption: "别回头！快找柜子！"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "pivots 180 degrees and dives stiffly into a brown wooden wardrobe closet, slamming the slatted doors shut",
        actionZh: "180度原地干脆转身，直挺挺扎进棕色木质衣柜并啪地合上百叶柜门",
        faceEn: "eyes peeking through wardrobe slats",
        faceZh: "透过百叶门缝惊恐偷看的墨点眼",
        cameraEn: "Fast whip-pan to the rattling wooden closet",
        cameraZh: "快速摇镜对准剧烈震动的木衣柜",
        hailuoTag: "[Pan right, Shake]",
        sfx: "衣柜砰地关门声 + 怪物呼啸掠过",
        caption: "极限躲柜，差点重开"
      }
    ]
  },
  "sword-duel": {
    titleZh: "十字路口经典长剑对决",
    titleEn: "Crossroads Linked Sword 1v1 Duel",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "two classic Roblox R6 fighters on a stone bridge: Builderman in a yellow hard hat and orange hoodie vs. a Classic Noob, both wielding metallic Linked Swords",
    subjectZh: "石桥上的双人经典Roblox R6对决：戴黄色安全帽穿橙卫衣的建造者 vs 经典黄皮新手，均手持金属十字长剑(Linked Sword)",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "both R6 fighters raise their metallic Linked Swords (with golden crossguards and blue grips) upright between stone castle battlements on opposite ends of a SmoothPlastic slate bridge over glowing molten orange lava",
        actionZh: "滚烫熔岩河上方的平滑石桥与城堡垛口之间，两名R6剑客同时高举金护手蓝握柄的经典金属十字长剑摆出迎战姿态",
        faceEn: "confident smirk on Builderman; determined grin on the Noob",
        faceZh: "安全帽小人挑眉自信笑，黄皮新手露齿战意贴图",
        cameraEn: "Wide side-profile arcade fighting framing pushing in",
        cameraZh: "横版格斗式侧面全景推镜",
        hailuoTag: "[Push in]",
        sfx: "经典Roblox拔剑清脆金属音 (Unsheathe!)",
        caption: "经典十字剑1v1，谁赢？"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "both avatars lunge forward in a stiff R6 double-jump and clash swords mid-air with bright yellow blocky sparks",
        actionZh: "两人同时跃起使出经典R6空中劈砍，两把十字长剑在半空碰撞迸出亮黄色方块火花",
        faceEn: "intense angry Bloxxer brows on both fighters",
        faceZh: "双方同步切换为用力皱眉2D贴图",
        cameraEn: "Low-angle hero shot tilting upward into the mid-air clash",
        cameraZh: "低角度仰拍定格半空交剑瞬间",
        hailuoTag: "[Tilt up, Shake]",
        sfx: "清脆金属交击声 (Clang!)",
        caption: "空中拼刀！火花拉满"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "Builderman lands a clean lunge Spin-slash that knocks the Noob sliding backward to the very edge of the stone bridge",
        actionZh: "安全帽小人落地顺势一记转身横劈，将黄皮新手击退滑行至石桥悬崖最边缘",
        faceEn: "shocked O_O decal on the Noob teetering on one leg",
        faceZh: "黄皮新手单腿悬空呈现震惊圆圈眼贴图",
        cameraEn: "Dynamic tracking shot following the knockback to the ledge",
        cameraZh: "高速跟拍新手滑向石桥边缘",
        hailuoTag: "[Pan right]",
        sfx: "重击音效 + 悬崖碎石掉落",
        caption: "差一毫米掉岩浆！"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "both avatars stop fighting and raise Bloxy Cola cans together in a friendly truce pose",
        actionZh: "两人突然收剑停手，默契举起红色Bloxy Cola可乐罐碰杯言和",
        faceEn: "synchronized cheerful Default Smile :) decals",
        faceZh: "两人同步恢复经典默认微笑(:))贴图",
        cameraEn: "Pull-out to balanced two-shot on the bridge",
        cameraZh: "拉远定格在石桥友谊双人构图",
        hailuoTag: "[Pull out]",
        sfx: "可乐开罐嗤啦声 (Tss-Ahhh!)",
        caption: "打累了，先干一罐可乐"
      }
    ]
  },
  "school-panic": {
    titleZh: "考场发卷大脑宕机记",
    titleEn: "Classroom Pop-Quiz Brain Meltdown",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "an authentic Roblox R6 Bacon Hair student avatar seated at a sunlit wooden classroom desk with a white exam sheet",
    subjectZh: "坐在洒满阳光的木质课桌前、头顶3D棕色培根发型的Roblox R6学生小人",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "stares down at a crisp white exam sheet landing flat on the wooden desk while a red wall clock ticks behind",
        actionZh: "低头盯向啪地拍在木课桌上的白色试卷，背景墙上的红框圆挂钟滴答走字",
        faceEn: "confident Default Smile :) decal before reading Question 1",
        faceZh: "看题前信心满满的默认微笑贴图",
        cameraEn: "High-angle close-up tilting from the exam sheet up to the avatar's face",
        cameraZh: "从桌面试卷快速上摇至脸部特写",
        hailuoTag: "[Tilt up]",
        sfx: "试卷拍桌声 + 秒针滴答声",
        caption: "考前：这把稳拿满分"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "raises both solid 1x2x1 blocky hands to the sides of its barrel head as floating question-mark blocks pop up around it",
        actionZh: "看清第一题瞬间，双侧1x2x1实心方柱手猛地抱住桶状脑袋，头顶冒出三个立体问号方块",
        faceEn: "wide white shocked ring eyes and wavy mouth decal",
        faceZh: "瞳孔地震的白圈震惊眼与波浪嘴贴图",
        cameraEn: "Fast crash-zoom into the panicked 2D decal face",
        cameraZh: "极速推镜聚焦慌张2D贴图脸",
        hailuoTag: "[Push in, Shake]",
        sfx: "系统报错叮咚声 (Windows Error vibe)",
        caption: "第一题：完全没见过？！"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "scribbles frantically across the exam paper with a yellow blocky pencil at 2x speed while sweat drops fly",
        actionZh: "右手吸附黄色方块铅笔在试卷上疯狂左右疾书，额角汗珠贴图狂飙",
        faceEn: "gritted teeth and squinted eyes decal",
        faceZh: "咬牙切齿奋笔疾书贴图",
        cameraEn: "Side desk macro shot with frantic handheld vibration",
        cameraZh: "课桌侧面微距镜头配合紧张高频微震",
        hailuoTag: "[Shake]",
        sfx: "高速沙沙写字声 + 急促倒计时铃",
        caption: "不管了，先把解字写满"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "slumps flat backward against the classroom chair with both arms hanging straight down as the bell rings",
        actionZh: "下课铃响，小人全身僵直向后靠倒在椅背上，两条方柱手臂笔直垂落进入放空状态",
        faceEn: "crossed KO dizzy eyes (X_X) decal",
        faceZh: "大脑宕机的叉叉眼(X_X)贴图",
        cameraEn: "Slow overhead pull-back above the desk",
        cameraZh: "课桌正上方俯拍缓慢拉远",
        hailuoTag: "[Pull out]",
        sfx: "下课铃声 + 灵魂出窍风声",
        caption: "交卷那一刻，重获平静"
      }
    ]
  },
  "red-light-game": {
    titleZh: "一二三木头人极限急停",
    titleEn: "Red Light Green Light Freeze Challenge",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    subjectEn: "two authentic Roblox R6 runners (Cyan Obby Speedrunner and Classic Yellow Noob) racing across a sandy arena toward a red finish line",
    subjectZh: "沙地赛场上的两名Roblox R6参赛者（青色跑酷手与经典黄皮新手）冲向红色终点线",
    shots: [
      {
        role: "Hook / 黄金前3秒",
        actionEn: "both R6 avatars sprint joyfully forward across the bright sandy court under a glowing green traffic sign",
        actionZh: "绿灯亮起，两名R6方块小人在明亮沙地赛场上迈着大步欢快向前冲刺",
        faceEn: "excited Winning Grin (:D) decals on both runners",
        faceZh: "两人脸上均印着兴奋露齿笑(:D)贴图",
        cameraEn: "Low-angle tracking shot running alongside both avatars",
        cameraZh: "低角度侧面跟拍双人冲刺步伐",
        hailuoTag: "[Pan right]",
        sfx: "轻快口令声 + 沙地踏步音",
        caption: "绿灯冲刺！终点就在眼前"
      },
      {
        role: "Escalation 1 / 动作推进",
        actionEn: "the arena light abruptly flashes crimson red; both avatars freeze instantly mid-air on one 1x2x1 blocky leg",
        actionZh: "赛场骤然亮起红光警报，两个小人瞬间在半步金鸡独立姿态死死定格一动不动",
        faceEn: "wide frozen shocked O_O eyes with a single sweat drop",
        faceZh: "不敢眨眼的震惊圆圈眼配冷汗贴图",
        cameraEn: "Snap-zoom freeze-frame into the absurd one-legged R6 pose",
        cameraZh: "急推镜头定格滑稽的单腿僵直造型",
        hailuoTag: "[Push in]",
        sfx: "刺耳红灯急停蜂鸣声 (BZZT!)",
        caption: "红灯！！连呼吸都停了"
      },
      {
        role: "Escalation 2 / 情绪升级",
        actionEn: "the Classic Noob wobbles 5 degrees sideways while trying to hold the pose as the Cyan runner side-eyes it nervously",
        actionZh: "右侧黄皮新手单腿重心不稳轻微晃动了5度，左侧青衣小人眼珠斜瞥吓得冷汗直冒",
        faceEn: "side-eye panic decal on Cyan runner; clenched nervous smile on Noob",
        faceZh: "左侧惊恐斜眼贴图，右侧强装镇定僵笑贴图",
        cameraEn: "Extreme close-up two-shot under tense red rim light",
        cameraZh: "红色轮廓光下的双脸近景紧张对峙",
        hailuoTag: "[Static shot]",
        sfx: "紧绷弦乐拔高 + 塑料嘎吱微响",
        caption: "兄弟你别晃啊！会连坐的！"
      },
      {
        role: "Payoff & Loop / 反转收尾",
        actionEn: "the light switches back to bright green and both avatars dive stiffly across the red checkered finish pad together",
        actionZh: "绿灯重新亮起，两人同时向前刚体飞扑压过红白格子终点线",
        faceEn: "cheerful victory grin decals",
        faceZh: "劫后余生的胜利大笑贴图",
        cameraEn: "High-angle finish-line celebration shot",
        cameraZh: "终点线高角度俯拍庆祝镜头",
        hailuoTag: "[Tilt down]",
        sfx: "通关礼花砰响声 + 欢呼声",
        caption: "压线过关！全员存活"
      }
    ]
  }
};

const NEGATIVE_GUARD =
  "official Roblox logo, tilted square Roblox trademark emblem, Roblox R badge, brand logos, watermarks, human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, raised circular Lego floor studs, studded Lego baseplate, cylindrical brick pegs, Minecraft sharp voxel cube head, featureless blank single-box props, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes";

const NEGATIVE_GUARD_ZH =
  "官方Roblox商标Logo，倾斜方框标志，R字品牌徽标，任何品牌水印，人类五指，真实人手，乐高C型夹爪手，乐高钩子手，乐高头顶圆柱凸起颗粒，乐高地面凸起圆粒，乐高积木凸点底板，我的世界直角像素方块头，简陋无细节纯色单一方块道具，双腿分叉有空隙，外凸真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，脚底打滑，服装中途变形";

function printHelp() {
  console.log(`Usage: node scripts/shot_compiler.mjs [options]

Compile a 9:16 Roblox-style short-video storyboard and engine-tuned I2V/T2V prompts.

Options:
  --template <id>    Template: daily-meltdown | duo-comedy | obby-storytime |
                     mini-tycoon | outfit-drop | meme-slapstick | disaster-survival |
                     brookhaven-chase | doors-horror | sword-duel | school-panic |
                     red-light-game (default: daily-meltdown)
  --duration <sec>   Target duration: 15 | 30 | 45 (default: 15)
  --engine <id>      Target engine: kling | seedance | hailuo | wan | sora | runway (default: kling)
  --rig <id>         Override rig: chibi-blocky | r6 | r15
  --aspect <ratio>   Aspect ratio: 9:16 | 16:9 | 1:1 (default: 9:16)
  --topic <string>   Optional custom topic subtitle override
  --lang <code>      Output language: en | zh | zh-tw | ja | ko | es | fr | de | pt | ru | zh-en (default: en)
  --json             Output structured JSON
  --help             Show this help message`);
}

const SUPPORTED_LANGS = new Set(["en", "zh", "zh-tw", "ja", "ko", "es", "fr", "de", "pt", "ru", "zh-en"]);

export function normalizeLang(code = "en") {
  const clean = String(code || "en").toLowerCase().trim();
  if (clean === "zh-cn") return "zh";
  if (clean === "pt-br") return "pt";
  return SUPPORTED_LANGS.has(clean) ? clean : "en";
}

export function parseArgs(argv) {
  const opts = {
    template: "daily-meltdown",
    duration: 15,
    engine: "kling",
    rig: "",
    aspect: "9:16",
    topic: "",
    lang: "en",
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
    else if (arg === "--lang" && argv[i + 1]) opts.lang = normalizeLang(argv[++i]);
  }
  return opts;
}

function formatEnginePrompt(shot, tpl, engine, aspect, rig) {
  const geometryTailEn =
    "Canonical Roblox 2x2x1 torso and flush 1x2x1 solid rectangular limbs, fingerless and clawless flat beveled block hands (no human fingers, no Lego C-claws), 1:1 barrel-beveled cylindrical head, smooth Roblox SmoothPlastic / WoodPlanks / Concrete surfaces (zero raised circular Lego floor studs or brick pegs), detailed multi-part Roblox Studio props, Motor6D rigid hinge joints.";
  const geometryTailZh =
    "纯正Roblox 2x2x1长方体躯干配并拢齐平的1x2x1实心平头方柱四肢（无人类五指、无乐高C型钩爪），1:1上下大圆角桶状圆柱头，平整无圆粒凸起的Roblox SmoothPlastic/木板/混凝土表面（严禁乐高地面凸点颗粒），多部件精致Roblox场景道具，Motor6D刚性转轴关节。";

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

export function formatStoryboardMarkdown(plan, rawLang = "en") {
  const lang = normalizeLang(rawLang);
  const useZhText = lang === "zh" || lang === "zh-tw" || lang === "zh-en";
  const lines = [];
  lines.push(`# 9:16 Storyboard & Prompt Pack: ${plan.title} (\`lang: ${lang}\`)`);
  lines.push("");
  lines.push(`- **Template**: \`${plan.template}\``);
  lines.push(`- **Target Engine**: \`${plan.engine}\` (${plan.workflowMode})`);
  lines.push(`- **Rig & Material**: \`${plan.rig}\` · \`${plan.material}\``);
  lines.push(`- **Format & Duration**: \`${plan.aspect}\` · \`${plan.durationSeconds}s\` (\`${plan.shotCount}\` shots, 1 primary action per clip)`);
  lines.push("");
  lines.push("## Beat Sheet Overview");
  lines.push("");
  lines.push("| Shot | Time | Beat Role | Single Action | Camera | SFX & Caption |");
  lines.push("| --- | --- | --- | --- | --- | --- |");

  for (const s of plan.shots) {
    const actionText = useZhText ? s.actionZh : s.actionEn;
    const cameraText = useZhText ? s.cameraZh : s.cameraEn;
    lines.push(
      `| ${String(s.shotNumber).padStart(2, "0")} | ${s.timeWindow} | ${s.role} | ${actionText} | ${cameraText} | ${s.sfx} · 「${s.caption}」 |`
    );
  }
  lines.push("");
  lines.push("## Compiled Shot Prompts");
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
    if (useZhText) {
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

  lines.push("## Shared Anti-Drift Negative Prompt");
  lines.push("");
  lines.push("```text");
  lines.push(lang === "zh" ? NEGATIVE_GUARD_ZH : useZhText ? `${NEGATIVE_GUARD}\n${NEGATIVE_GUARD_ZH}` : NEGATIVE_GUARD);
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
