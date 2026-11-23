#!/usr/bin/env node
/**
 * avatar_spec.mjs
 * Zero-dependency CLI generator for Roblox-style blocky character DNA cards
 * and 3-view turnaround sheet prompts (Midjourney / Flux / Jimeng / GPT-4o Image).
 */

const ARCHETYPES = {
  "chibi-plush": {
    labelZh: "盲盒潮玩风小人",
    labelEn: "Chibi Blind-Box Blocky Avatar",
    defaultRig: "chibi-blocky",
    defaultMaterial: "glossy-vinyl",
    headColor: "#FEF3C7 (Warm Cream)",
    primaryColor: "#FDA4AF (Pastel Rose)",
    secondaryColor: "#F8FAFC (Milk White)",
    accentColor: "#38BDF8 (Sky Blue)",
    outfitEn: "oversized pastel rose hoodie with chamfered blocky sleeves, milk-white blocky shorts, chunky miniature sneakers",
    outfitZh: "奶油蜜桃粉倒角方柱连帽卫衣、奶白色方柱短裤、微缩厚底方块运动鞋",
    accessoriesEn: "oversized cream matte headphones around neck, fluffy white cat-ear beanie, mini boxy sky-blue backpack",
    accessoriesZh: "颈挂大号奶油白哑光耳机、白色毛绒猫耳针织帽、天蓝色微缩方盒双肩包",
    faceEn: "flat 2D screen-printed decal face with big glossy ink eyes, star highlights, and a tiny painted cat smile (:3)",
    faceZh: "纯平2D丝网印刷五官贴图，带星光高点的大号墨点眼睛与小巧绘制猫猫嘴(:3)"
  },
  "classic-noob": {
    labelZh: "经典复古黄皮新手",
    labelEn: "Classic Retro Yellow Noob",
    defaultRig: "r6",
    defaultMaterial: "matte-abs",
    headColor: "#FACC15 (Classic Yellow)",
    primaryColor: "#2563EB (Royal Blue)",
    secondaryColor: "#65A30D (Leaf Green)",
    accentColor: "#F43F5E (Bloxy Cola Red)",
    outfitEn: "untextured royal-blue rectangular torso block, bright yellow arm blocks, leaf-green rectangular leg blocks",
    outfitZh: "经典宝蓝色倒角长方体躯干、亮黄色方柱双臂、草绿色长方体双腿",
    accessoriesEn: "miniature red cylindrical Bloxy Cola can clamped in right C-shaped claw hand",
    accessoriesZh: "右手C型夹爪中卡着一罐红色微缩方块可乐罐",
    faceEn: "iconic classic 2D painted decal face with two simple black oval eyes and a curved black line smile",
    faceZh: "标志性2D简约印刷笑脸贴图（两个黑色椭圆墨点眼与单线条上扬嘴角）"
  },
  "ugc-streetwear": {
    labelZh: "Y2K千禧穿搭潮人",
    labelEn: "Y2K UGC Streetwear Avatar",
    defaultRig: "r15",
    defaultMaterial: "glossy-vinyl",
    headColor: "#FDE68A (Light Gold)",
    primaryColor: "#1E293B (Charcoal Black)",
    secondaryColor: "#93C5FD (Washed Denim Blue)",
    accentColor: "#A855F7 (Electric Purple)",
    outfitEn: "cropped charcoal glossy puffer jacket with blocky baffles, wide-leg washed-denim blocky cargo pants",
    outfitZh: "炭黑色高光充气感方块短款羽绒服、水洗牛仔蓝宽腿方柱工装裤",
    accessoriesEn: "silver star-shaped frame sunglasses on forehead, purple crossbody boxy cassette bag, chunky blocky boots",
    accessoriesZh: "额头银色五角星框墨镜、电光紫方盒斜挎包、厚底方头潮靴",
    faceEn: "flat 2D painted decal face with half-lidded cool eyes, asymmetrical raised brow, and confident smirk",
    faceZh: "纯平2D印刷酷感半眯眼贴图、单侧挑眉与自信歪嘴笑"
  },
  "corporate-worker": {
    labelZh: "破防早八打工人",
    labelEn: "Exhausted Office Worker Blocky",
    defaultRig: "chibi-blocky",
    defaultMaterial: "matte-abs",
    headColor: "#FEF9C3 (Pale Ivory)",
    primaryColor: "#86EFAC (Matcha Cardigan)",
    secondaryColor: "#475569 (Slate Trousers)",
    accentColor: "#F59E0B (Amber Coffee Mug)",
    outfitEn: "wrinkle-free matcha-green blocky cardigan over white collar shirt, neat red pixel-free tie, slate-gray blocky trousers",
    outfitZh: "抹茶绿倒角方柱针织开衫内搭白衬衫、简约红领带、深灰方柱西裤",
    accessoriesEn: "blue ID lanyard printed flat on torso, miniature amber coffee mug in C-shaped hand, dark-circle eye decal",
    accessoriesZh: "胸前平整贴合的蓝色工牌挂绳、C型手握琥珀色微缩咖啡杯、眼下淡淡印刷黑眼圈",
    faceEn: "flat 2D screen-printed decal face with tired horizontal line eyes (-_-) and a tiny flat mouth",
    faceZh: "纯平2D印刷疲惫死鱼眼(-_-)贴图与平直小嘴线"
  },
  "cozy-chef": {
    labelZh: "治愈系微缩甜点师",
    labelEn: "Cozy Miniature Bakery Chef",
    defaultRig: "chibi-blocky",
    defaultMaterial: "clay-soft",
    headColor: "#FEF3C7 (Warm Cream)",
    primaryColor: "#FFFBEB (Butter White)",
    secondaryColor: "#D97706 (Caramel Apron)",
    accentColor: "#FB7185 (Strawberry Pink)",
    outfitEn: "butter-white blocky double-breasted chef coat, caramel-brown rectangular apron, strawberry-pink neckerchief",
    outfitZh: "奶油白双排扣方柱厨师服、焦糖棕长方体围裙、草莓粉三角领巾",
    accessoriesEn: "puffy rounded-blocky white chef toque hat, miniature wooden whisk in C-shaped hand",
    accessoriesZh: "饱满圆角方块白色厨师高帽、C型夹爪手握微缩木质打蛋器",
    faceEn: "flat 2D painted decal face with warm curved happy eyes (^^) and rosy oval cheek decals",
    faceZh: "纯平2D印刷弯弯笑眼(^^)与暖粉椭圆腮红贴图"
  },
  "obby-runner": {
    labelZh: "多巴胺跑酷闯关手",
    labelEn: "Pastel Obby Parkour Runner",
    defaultRig: "r6",
    defaultMaterial: "matte-abs",
    headColor: "#FDE047 (Bright Yellow)",
    primaryColor: "#38BDF8 (Cyan Jersey)",
    secondaryColor: "#F472B6 (Magenta Shorts)",
    accentColor: "#A3E635 (Lime Visor)",
    outfitEn: "sporty cyan blocky track jersey with white stripe, magenta rectangular shorts, lime-green blocky sneakers",
    outfitZh: "亮青色运动条纹方柱球衣、品红长方体短裤、青柠绿方块跑鞋",
    accessoriesEn: "translucent lime-green sport visor on cylindrical head, white sweatband, twin blocky jetpack",
    accessoriesZh: "圆柱头佩戴半透明青柠绿遮阳帽檐、白色发带、背后双联装微缩方块喷气背包",
    faceEn: "flat 2D screen-printed decal face with determined wide eyes and an energetic open grin",
    faceZh: "纯平2D印刷专注大眼与充满活力的露齿笑贴图（纯平面无3D牙齿深度）"
  }
};

const RIGS = {
  "chibi-blocky": {
    label: "Chibi-Blocky (2.4-head miniature blind-box rig / 2.4头身微缩盲盒方块骨架)",
    geometryEn: "2.4-heads-tall chibi blocky proportions, smooth cylindrical head with rounded top bevel, stubby chamfered rectangular limbs, 3mm edge bevels, fingerless C-shaped claw hands",
    geometryZh: "2.4头身微缩盲盒方块比例，顶部圆润倒角的平滑圆柱头，短粗倒角长方体四肢，3毫米圆润边缘倒角，无手指C型夹爪手"
  },
  "r6": {
    label: "Classic R6 (6-part rigid blocky rig / 经典6部件刚性直臂直腿骨架)",
    geometryEn: "classic Roblox R6 6-part rigid blocky rig, cylindrical yellow/pastel head, solid rectangular torso, unsegmented straight rectangular arms and legs, strict shoulder/hip hinge pivots only, fingerless C-shaped hands",
    geometryZh: "经典Roblox R6六部件刚性方块骨架，平滑圆柱头，一体式长方体躯干，无肘膝分段的笔直长方体四肢，仅肩髋机械转轴可动，无手指C型夹爪手"
  },
  "r15": {
    label: "Expressive R15 (15-part segmented blocky rig / 15部件分段可动方块骨架)",
    geometryEn: "Roblox R15 15-part segmented blocky rig, chamfered rectangular upper and lower limbs with clean mechanical elbow and knee hinges, smooth cylindrical head, fingerless C-shaped claw hands",
    geometryZh: "Roblox R15十五部件分段方块骨架，带清晰机械肘膝铰链的倒角长方体上下肢，平滑圆柱头，无手指C型夹爪手"
  }
};

const MATERIALS = {
  "glossy-vinyl": {
    label: "Glossy Blind-Box Vinyl (高光潮玩PVC/盲盒材质)",
    shaderEn: "glossy blind-box PVC vinyl toy material, smooth studless surface, crisp oval specular highlights, subtle subsurface scattering, Octane render studio three-point lighting",
    shaderZh: "高光潮玩盲盒PVC材质，无凸起颗粒的平滑表面，清脆椭圆高光反射，柔和次表面散射，Octane渲染级三点摄影棚布光"
  },
  "matte-abs": {
    label: "Satin Matte ABS Plastic (哑光精密ABS塑料材质)",
    shaderEn: "satin matte injection-molded ABS plastic, smooth studless blocky surfaces, 2mm chamfered edges, soft ambient occlusion in joint seams, clean studio lighting",
    shaderZh: "绸感哑光注塑ABS塑料材质，无乐高颗粒的平滑方块表面，2毫米精密倒角边缘，关节接缝柔和环境光遮蔽"
  },
  "clay-soft": {
    label: "Soft-Touch Clay-Plastic (微缩柔感黏土塑料材质)",
    shaderEn: "soft-touch matte polymer clay-plastic shader over rigid blocky geometry, warm miniature tabletop diorama lighting, 50mm macro f/2.8 shallow depth of field",
    shaderZh: "刚性方块几何体表面覆盖柔感哑光微缩黏土涂层，暖调桌面微缩模型布光，50mm微距镜头f/2.8浅景深"
  },
  "neon-cyber": {
    label: "Cyber Polycarbonate & Neon (赛博高光聚碳酸酯材质)",
    shaderEn: "glossy dark polycarbonate blocky shell with emissive neon edge strips, high-contrast cyan and magenta rim lighting, studio reflective floor",
    shaderZh: "高光深色聚碳酸酯方块外壳配自发光霓虹边条，高反差青紫双色轮廓边缘光，摄影棚微反射地面"
  }
};

const NEGATIVE_PROMPT_EN =
  "human fingers, five fingers, realistic human hands, knuckles, fingernails, realistic human face, 3D protruding nose, skin pores, realistic eyeballs, Lego top studs, cylindrical brick pegs, Minecraft voxel cubes, pixelated block texture, rubbery noodle limbs, blurry decal, extra limbs, watermark";

const NEGATIVE_PROMPT_ZH =
  "人类五指，真实人手，手指关节，指甲，真实人类面部骨骼，3D凸起高鼻梁，皮肤毛孔，真实眼球，乐高顶部圆柱凸起颗粒，我的世界像素方块贴图，橡胶面条状弯曲四肢，五官贴图模糊，多手多脚，水印文字";

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
      handsEn: "Fingerless C-shaped plastic claw hands, zero human fingers",
      handsZh: "无手指C型塑料夹爪手，零人类手指",
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
