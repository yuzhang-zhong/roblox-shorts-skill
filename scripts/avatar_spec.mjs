#!/usr/bin/env node
/**
 * avatar_spec.mjs
 * Zero-dependency CLI generator for Roblox-style blocky character DNA cards
 * and 3-view turnaround sheet prompts (Midjourney / Flux / Jimeng / GPT-4o Image).
 */

const ARCHETYPES = {
  "chibi-plush": {
    labelZh: "小红书爆款Plushie盲盒风小人",
    labelEn: "Roblox Plushie / Chibi-Blocky Avatar",
    defaultRig: "chibi-blocky",
    defaultMaterial: "glossy-vinyl",
    headColor: "Cool yellow #FDEA8D",
    primaryColor: "Pastel Pink #F4A2B8",
    secondaryColor: "Institutional white #F8F8F8",
    accentColor: "Cyan #00AAE4",
    outfitEn: "oversized pastel-pink blocky sweater on a 2x2x1 torso, flush 1x2x1 milk-white blocky legs with zero thigh gap",
    outfitZh: "蜜桃粉倒角方柱卫衣（2x2x1宽扁躯干）、并拢齐平的奶白色1x2x1方柱双腿（无分叉间隙）",
    accessoriesEn: "3D UGC fluffy bob hair with side bangs, cream cat-ear headphones on head, sky-blue boxy backpack",
    accessoriesZh: "3D立体刘海波波头UGC发型、头戴奶油白猫耳大耳机、天蓝色方盒双肩包",
    faceEn: "flat 2D screen-printed Roblox decal face with glossy ink eyes, star highlights, blush ovals, and a tiny cat smile (:3)",
    faceZh: "纯平2D丝网印刷五官贴图，带星光高点的墨点眼、椭圆粉腮红与猫猫嘴(:3)"
  },
  "classic-noob": {
    labelZh: "经典复古黄皮新手 (Official Noob)",
    labelEn: "Authentic Classic Roblox Noob (R6)",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    headColor: "Bright yellow #F5CD30",
    primaryColor: "Bright blue #0D69AC",
    secondaryColor: "Br. yellowish green #A4BD47",
    accentColor: "Bright red #C4281C (Bloxy Cola)",
    outfitEn: "untextured Bright blue (#0D69AC) 2x2x1 rectangular torso block, Bright yellow (#F5CD30) 1x2x1 solid rectangular arm blocks flush at sides, Br. yellowish green (#A4BD47) 1x2x1 rectangular leg blocks flush side-by-side",
    outfitZh: "经典亮蓝色(#0D69AC) 2x2x1长方体躯干、亮黄色(#F5CD30) 1x2x1实心方柱双臂紧贴两侧、黄绿色(#A4BD47) 1x2x1方柱双腿并拢齐平",
    accessoriesEn: "red cylindrical Bloxy Cola can attached to right flat rectangular block hand, standing on a classic Roblox SpawnLocation pad",
    accessoriesZh: "右侧平头实心方块手吸附一罐红色Bloxy Cola可乐罐，脚踩经典Roblox重生点(SpawnLocation)底板",
    faceEn: "iconic classic Roblox Default Smile 2D decal face with two black oval eyes and a curved black line smile",
    faceZh: "标志性Roblox经典默认笑脸2D贴图（两个黑色椭圆眼点与上扬弧线嘴）"
  },
  "bacon-hair": {
    labelZh: "经典培根头新手 (Pal Hair / Bacon)",
    labelEn: "Iconic Roblox Bacon Hair Avatar",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    headColor: "Light stone grey #E5E4DF",
    primaryColor: "Dark stone grey #635F62",
    secondaryColor: "Black #1B2A35",
    accentColor: "Bright blue #0D69AC",
    outfitEn: "dark stone grey open blocky moto jacket over a bright blue inner shirt on a 2x2x1 torso, black 1x2x1 flush blocky jeans legs with white bottom trim",
    outfitZh: "深灰开襟机车方块夹克内搭蓝T恤（2x2x1躯干）、纯黑并拢齐平1x2x1方柱牛仔裤腿",
    accessoriesEn: "iconic brown strip-textured 3D Pal Hair (Bacon Hair) on top of the barrel-cylinder head",
    accessoriesZh: "头顶标志性棕褐色条状3D培根发型（Pal Hair / Bacon Hair）",
    faceEn: "classic Roblox 2D Default Smile decal printed flat on the light grey barrel-cylinder head",
    faceZh: "浅灰桶状圆角圆柱头正面印有经典Roblox 2D默认微笑贴图"
  },
  "ugc-streetwear": {
    labelZh: "Y2K千禧穿搭潮人 (Dress-to-Impress)",
    labelEn: "Y2K UGC Streetwear Blocky Avatar",
    defaultRig: "r15",
    defaultMaterial: "glossy-vinyl",
    headColor: "Warm yellowish orange #F8D96D",
    primaryColor: "Really black #111827",
    secondaryColor: "Pastel blue #93C5FD",
    accentColor: "Alder / Electric Purple #A855F7",
    outfitEn: "cropped charcoal-black glossy puffer jacket with purple graphic badge on a 2x2x1 torso, washed-denim 1x2x1 blocky legs sitting flush side-by-side",
    outfitZh: "炭黑高光短款方块羽绒服配紫色胸章（2x2x1躯干）、水洗牛仔蓝并拢齐平1x2x1方柱裤腿",
    accessoriesEn: "3D pastel-pink layered UGC hair with cat-ear beanie, silver star sunglasses, purple boxy backpack",
    accessoriesZh: "3D粉色层次感UGC长发配猫耳针织帽、银色五角星墨镜、电光紫方盒双肩包",
    faceEn: "flat 2D painted Roblox Check-It / Smirk decal face with asymmetrical raised brow and confident sideways grin",
    faceZh: "纯平2D印刷Roblox经典挑眉坏笑(Check It / Smirk)贴图"
  },
  "corporate-worker": {
    labelZh: "破防早八打工人",
    labelEn: "Exhausted Office Worker Roblox Blocky",
    defaultRig: "chibi-blocky",
    defaultMaterial: "smooth-plastic",
    headColor: "Cool yellow #FDEA8D",
    primaryColor: "Mint #86EFAC (Matcha Cardigan)",
    secondaryColor: "Dark stone grey #475569",
    accentColor: "Bright red #F43F5E (Tie & Alarm)",
    outfitEn: "matcha-green blocky cardigan over white shirt collar and red tie decal on a 2x2x1 torso, slate-grey 1x2x1 blocky trousers sitting flush side-by-side",
    outfitZh: "抹茶绿2x2x1方柱开衫内搭白衬衫领与红领带贴图、深灰并拢齐平1x2x1方柱西裤",
    accessoriesEn: "3D brown side-parted blocky hair, white headphones around neck, blue ID badge decal, amber coffee mug attached to right flat block hand",
    accessoriesZh: "3D深棕偏分方块短发、头戴/颈挂白色方块耳机、胸前蓝色工牌贴图、右侧实心平头方块手吸附琥珀咖啡杯",
    faceEn: "flat 2D screen-printed Roblox decal face with tired horizontal line eyes (-_-) or shocked hollow ring eyes",
    faceZh: "纯平2D印刷疲惫死鱼眼(-_-)或震惊圆圈眼贴图"
  },
  "cozy-chef": {
    labelZh: "治愈系微缩甜点师",
    labelEn: "Cozy Miniature Bakery Chef Blocky",
    defaultRig: "chibi-blocky",
    defaultMaterial: "clay-soft",
    headColor: "Cool yellow #FDEA8D",
    primaryColor: "Institutional white #FFFBEB",
    secondaryColor: "CGA brown #D97706 (Apron)",
    accentColor: "Carnation pink #FB7185",
    outfitEn: "butter-white blocky double-breasted chef coat on a 2x2x1 torso, caramel apron decal, flush 1x2x1 blocky legs",
    outfitZh: "奶油白双排扣2x2x1方柱厨师服、焦糖围裙贴图、并拢齐平1x2x1方柱双腿",
    accessoriesEn: "puffy rounded-blocky white chef toque hat, golden blocky croissant on tray",
    accessoriesZh: "饱满圆角方块白色厨师高帽、托盘上的金黄方块可颂",
    faceEn: "flat 2D painted Roblox decal face with warm curved happy eyes (^^) and rosy oval cheek decals",
    faceZh: "纯平2D印刷弯弯笑眼(^^)与暖粉椭圆腮红贴图"
  },
  "obby-runner": {
    labelZh: "多巴胺跑酷闯关手 (Speedrunner)",
    labelEn: "Pastel Obby Parkour Speedrunner (R6)",
    defaultRig: "r6",
    defaultMaterial: "smooth-plastic",
    headColor: "Bright yellow #F5CD30",
    primaryColor: "Cyan #00AAE4",
    secondaryColor: "Hot pink #FF55A3",
    accentColor: "Bright red #EF4444 (Speed Coil)",
    outfitEn: "sporty cyan 2x2x1 blocky jersey with classic white Roblox R emblem, hot-pink 1x2x1 rectangular leg blocks sitting flush side-by-side",
    outfitZh: "亮青色2x2x1运动方柱球衣（胸前经典白色R字徽标）、亮粉色并拢齐平1x2x1长方体双腿",
    accessoriesEn: "classic red Roblox sport visor cap on head, glowing red Speed Coil wrapped around the right 1x2x1 solid rectangular arm block, twin white blocky jetpack",
    accessoriesZh: "头戴经典红色Roblox运动遮阳帽、右侧1x2x1实心方柱手臂缠绕发光红色加速弹簧(Speed Coil)、背后白色双联方块喷气包",
    faceEn: "flat 2D screen-printed Roblox Winning/Energetic grin decal with determined wide eyes",
    faceZh: "纯平2D印刷专注大眼与活力露齿笑贴图（纯平面无3D深度）"
  }
};

const RIGS = {
  "chibi-blocky": {
    label: "Chibi-Blocky / Plushie UGC (Canonical flush blocky limbs + 3D UGC hair / 萌系Plushie齐平方块骨架)",
    geometryEn:
      "canonical Roblox blocky proportions (1:1 classic Roblox barrel-cylinder head with deep curved top and bottom bevels, 2x2x1 rectangular torso block, two 1x2x1 rectangular leg blocks sitting flush side-by-side matching exact torso width with zero thigh gap, two 1x2x1 solid rectangular arm blocks flush at shoulders, fingerless and clawless solid beveled rectangular block hands)",
    geometryZh:
      "纯正Roblox标准方块比例（1:1上下大圆角桶状圆柱头，2x2x1宽扁倒角长方体躯干，两条1x2x1方柱腿并拢紧贴且总宽度与躯干完全齐平无分叉，两条1x2x1一体式实心方柱手臂紧贴肩侧，平头倒角实心方块手部【严禁人类五指、严禁乐高C型钩爪】）"
  },
  "r6": {
    label: "Classic R6 (6-part canonical 2x2x1 & 1x2x1 stud rig / 经典R6六部件标准Stud比例骨架)",
    geometryEn:
      "authentic Roblox R6 6-part rigid blocky rig built on exact stud ratios (1.2x1.2x1.2 barrel-beveled cylindrical head, 2x2x1 rectangular torso, two 1x2x1 unsegmented straight rectangular arm blocks flush at sides, two 1x2x1 unsegmented straight rectangular leg blocks flush side-by-side matching torso width, strict Motor6D shoulder/hip hinge pivots only, fingerless and clawless solid flat block hands)",
    geometryZh:
      "正统Roblox R6六部件刚性Stud比例骨架（1.2x1.2x1.2上下圆角桶状圆柱头，2x2x1长方体躯干，两条1x2x1无肘膝分段的笔直实心方柱手臂紧贴两侧，两条1x2x1笔直方柱双腿并拢齐平与躯干同宽，仅肩髋Motor6D机械转轴可动，平头实心方块手【无人类手指、无乐高C型爪】）"
  },
  "r15": {
    label: "Expressive R15 (15-part segmented blocky rig / R15分段可动标准方块骨架)",
    geometryEn:
      "Roblox R15 segmented blocky rig retaining canonical 2x2x1 torso and flush 1x2x1 rectangular limb silhouette with clean mechanical elbow and knee hinges, 1:1 barrel-beveled cylindrical head, fingerless and clawless solid rectangular block hands",
    geometryZh:
      "Roblox R15分段方块骨架（保持2x2x1躯干与并拢齐平1x2x1方柱四肢轮廓，带清晰机械肘膝铰链，1:1桶状圆角圆柱头，无手指且无乐高C型爪的实心平头方块手）"
  }
};

const MATERIALS = {
  "smooth-plastic": {
    label: "Roblox SmoothPlastic + Studs Baseplate (官方SmoothPlastic塑料与方格Studs底板)",
    shaderEn:
      "authentic Roblox Studio SmoothPlastic shader with crisp 2mm edge bevels on the avatar, standing on a classic Roblox 1x1 square tile baseplate with raised square studs, clean ambient occlusion and bright skybox lighting",
    shaderZh:
      "纯正Roblox Studio SmoothPlastic平滑塑料材质（角色身体带2毫米利落倒角高光），脚踩带1x1方格凸起纹理的经典Roblox Studs底板，清晰环境光遮蔽与明亮天空盒布光"
  },
  "glossy-vinyl": {
    label: "Glossy Blind-Box SmoothPlastic (高光潮玩级SmoothPlastic材质)",
    shaderEn:
      "glossy collectible Roblox SmoothPlastic & PVC shader, smooth studless character surfaces, crisp specular highlights, subtle subsurface scattering, standing on a Roblox studded baseplate under three-point studio lighting",
    shaderZh:
      "高光潮玩级Roblox SmoothPlastic材质，角色表面平滑无凸起颗粒，清脆高光反射与次表面散射，配合经典Roblox方格底板与三点摄影棚布光"
  },
  "matte-abs": {
    label: "Satin Matte SmoothPlastic (绸感哑光SmoothPlastic材质)",
    shaderEn:
      "satin matte Roblox SmoothPlastic blocks, 2mm chamfered edges, studless character body, clean ambient occlusion in Motor6D joint seams, studio lighting",
    shaderZh:
      "绸感哑光Roblox SmoothPlastic方块材质，2毫米精密倒角边缘，Motor6D关节接缝柔和环境光遮蔽"
  },
  "clay-soft": {
    label: "Soft Miniature Diorama Plastic (微缩柔感模型塑料材质)",
    shaderEn:
      "soft-touch matte diorama shader over canonical Roblox 2x2x1/1x2x1 blocky geometry, warm tabletop lighting, 50mm f/2.8 shallow depth of field",
    shaderZh:
      "标准Roblox 2x2x1/1x2x1方块几何体配微缩柔感哑光材质，暖调桌面布光，50mm微距浅景深"
  },
  "neon-cyber": {
    label: "Roblox Neon + ForceField Cyber Shader (Roblox自发光Neon与高光材质)",
    shaderEn:
      "Roblox SmoothPlastic dark shell paired with glowing Roblox Neon material accents, high-contrast cyan and magenta rim lighting, reflective studded floor",
    shaderZh:
      "深色Roblox SmoothPlastic方块外壳配高亮度Roblox Neon自发光材质边条，高反差轮廓光与微反射方格地面"
  }
};

const NEGATIVE_PROMPT_EN =
  "human fingers, five fingers, realistic human hands, knuckles, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, cylindrical Lego pegs, Minecraft sharp voxel cube head, 8x8 pixel texture, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, blurry decal, watermark";

const NEGATIVE_PROMPT_ZH =
  "人类五指，真实人手，乐高C型夹爪手，乐高钩子手，乐高头顶圆柱凸起颗粒，我的世界直角像素方块头，双腿分叉有空隙，凸出真人运动鞋，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，橡胶面条状弯曲四肢，五官贴图模糊，水印文字";

function printHelp() {
  console.log(`Usage: node scripts/avatar_spec.mjs [options]

Generate a geometry-locked Roblox-style Character DNA card and 3-view turnaround prompts.

Options:
  --archetype <id>   Character preset: chibi-plush | classic-noob | ugc-streetwear |
                     corporate-worker | cozy-chef | obby-runner (default: chibi-plush)
  --rig <id>         Rig proportion: chibi-blocky | r6 | r15 (default: preset default)
  --material <id>    Surface shader: glossy-vinyl | matte-abs | clay-soft | neon-cyber
  --name <string>    Character name (default: "Bloxy")
  --accessory <str>  Optional extra UGC accessory to append
  --lang <mode>      Output language: zh-en | zh | en (default: zh-en)
  --json             Output structured JSON
  --help             Show this help message`);
}

export function parseArgs(argv) {
  const opts = {
    archetype: "chibi-plush",
    rig: "",
    material: "",
    name: "Bloxy",
    accessory: "",
    lang: "zh-en",
    json: false,
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--archetype" && argv[i + 1]) opts.archetype = argv[++i];
    else if (arg === "--rig" && argv[i + 1]) opts.rig = argv[++i];
    else if (arg === "--material" && argv[i + 1]) opts.material = argv[++i];
    else if (arg === "--name" && argv[i + 1]) opts.name = argv[++i];
    else if (arg === "--accessory" && argv[i + 1]) opts.accessory = argv[++i];
    else if (arg === "--lang" && argv[i + 1]) opts.lang = argv[++i];
  }
  return opts;
}

export function buildAvatarSpec(rawOpts = {}) {
  const archetypeKey = ARCHETYPES[rawOpts.archetype] ? rawOpts.archetype : "chibi-plush";
  const preset = ARCHETYPES[archetypeKey];
  const rigKey = RIGS[rawOpts.rig] ? rawOpts.rig : preset.defaultRig;
  const materialKey = MATERIALS[rawOpts.material] ? rawOpts.material : preset.defaultMaterial;
  const rig = RIGS[rigKey];
  const material = MATERIALS[materialKey];
  const name = rawOpts.name || "Bloxy";
  const extraAccessory = rawOpts.accessory ? `, ${rawOpts.accessory}` : "";

  const turnaroundPromptEn = [
    `Character turnaround reference sheet of "${name}", a Roblox-style 3D blocky figure shown in three full-body views side by side: front view, 45-degree three-quarter view, and side profile view.`,
    `Geometry lock: ${rig.geometryEn}, studless top head, zero Lego pegs, non-voxel.`,
    `Face lock: ${preset.faceEn}, no 3D human nose.`,
    `Outfit & UGC accessories: ${preset.outfitEn}, wearing ${preset.accessoriesEn}${extraAccessory}.`,
    `Material & lighting: ${material.shaderEn}, standing on a clean neutral warm-gray studio cyclorama background, 8k product render, consistent scale across all three views.`
  ].join(" ");

  const turnaroundPromptZh = [
    `角色三视图设定卡（"${name}"），同一个Roblox风格3D方块小人并排展示全身正面视图、45度斜侧面视图与正侧面视图。`,
    `几何锁定：${rig.geometryZh}，头顶平滑无乐高凸起颗粒，非我的世界像素方块。`,
    `面部锁定：${preset.faceZh}，严禁3D凸起真人鼻子。`,
    `穿搭与UGC配饰：${preset.outfitZh}，佩戴${preset.accessoriesZh}${extraAccessory}。`,
    `材质与布光：${material.shaderZh}，纯色浅暖灰摄影棚无缝背景，三视图身高比例与衣着细节完全一致。`
  ].join("");

  return {
    name,
    archetype: archetypeKey,
    archetypeLabel: `${preset.labelZh} / ${preset.labelEn}`,
    rig: rigKey,
    rigLabel: rig.label,
    material: materialKey,
    materialLabel: material.label,
    palette: {
      head: preset.headColor,
      primary: preset.primaryColor,
      secondary: preset.secondaryColor,
      accent: preset.accentColor
    },
    locks: {
      headAndFaceEn: preset.faceEn,
      headAndFaceZh: preset.faceZh,
      handsEn: "Fingerless and clawless solid 1x2x1 beveled rectangular block hands (zero human fingers, zero Lego C-shaped hooks)",
      handsZh: "平头倒角1x2x1实心方块手（严禁人类五指、严禁乐高C型钩子手）",
      outfitEn: preset.outfitEn,
      outfitZh: preset.outfitZh,
      accessoriesEn: `${preset.accessoriesEn}${extraAccessory}`,
      accessoriesZh: `${preset.accessoriesZh}${extraAccessory}`
    },
    turnaroundPromptEn,
    turnaroundPromptZh,
    negativePromptEn: NEGATIVE_PROMPT_EN,
    negativePromptZh: NEGATIVE_PROMPT_ZH
  };
}

export function formatAvatarSpecMarkdown(spec, lang = "zh-en") {
  const lines = [];
  lines.push(`# Character DNA Card / 角色设定卡: ${spec.name}`);
  lines.push("");
  lines.push("| Field / 字段 | Specification / 锁定参数 |");
  lines.push("| --- | --- |");
  lines.push(`| Archetype / 角色原型 | \`${spec.archetype}\` (${spec.archetypeLabel}) |`);
  lines.push(`| Rig / 骨架比例 | \`${spec.rig}\` (${spec.rigLabel}) |`);
  lines.push(`| Material / 表面材质 | \`${spec.material}\` (${spec.materialLabel}) |`);
  lines.push(`| Hand Lock / 手部几何锁 | ${lang === "en" ? spec.locks.handsEn : `${spec.locks.handsZh} / ${spec.locks.handsEn}`} |`);
  lines.push(`| Face Lock / 面部贴图锁 | ${lang === "en" ? spec.locks.headAndFaceEn : spec.locks.headAndFaceZh} |`);
  lines.push(`| Outfit / 服装结构 | ${lang === "en" ? spec.locks.outfitEn : spec.locks.outfitZh} |`);
  lines.push(`| UGC Accessories / 配饰锚点 | ${lang === "en" ? spec.locks.accessoriesEn : spec.locks.accessoriesZh} |`);
  lines.push(`| Color Palette / 配色色板 | Head \`${spec.palette.head}\` · Primary \`${spec.palette.primary}\` · Secondary \`${spec.palette.secondary}\` · Accent \`${spec.palette.accent}\` |`);
  lines.push("");

  if (lang !== "zh") {
    lines.push("## 3-View Turnaround Image Prompt (English · Midjourney / Flux / GPT-4o)");
    lines.push("");
    lines.push("```text");
    lines.push(spec.turnaroundPromptEn);
    lines.push("```");
    lines.push("");
  }

  if (lang !== "en") {
    lines.push("## 角色三视图生成提示词 (中文 · 即梦 / 可灵参考图 / 万相)");
    lines.push("");
    lines.push("```text");
    lines.push(spec.turnaroundPromptZh);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Anti-Drift Negative Prompt / 负向防串味词");
  lines.push("");
  lines.push("```text");
  lines.push(lang === "zh" ? spec.negativePromptZh : `${spec.negativePromptEn}\n${spec.negativePromptZh}`);
  lines.push("```");

  return lines.join("\n");
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));
if (isMain || (process.argv[1] && process.argv[1].endsWith("avatar_spec.mjs"))) {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    process.exit(0);
  }
  const spec = buildAvatarSpec(opts);
  if (opts.json) {
    console.log(JSON.stringify(spec, null, 2));
  } else {
    console.log(formatAvatarSpecMarkdown(spec, opts.lang));
  }
}
