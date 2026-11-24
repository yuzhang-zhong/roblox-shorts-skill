#!/usr/bin/env node
/**
 * drift_check.mjs
 * Zero-dependency Unicode-safe linter, package auditor, and rescue rewriter
 * for Roblox-style blocky short-video specs and prompts.
 *
 * Enforces 8 quality gates:
 * 1. Hand Geometry Lock (no human fingers, no Lego C-claws, no contradictory negations)
 * 2. 2D Face Decal Lock (1:1 barrel head, flat 2D decal, no 3D nose)
 * 3. Studless & Non-Voxel Guard (smooth floors/props, zero Lego floor/head bumps, non-voxel)
 * 4. Single-Action Clip Budget (Unicode-safe EN+ZH verb & sequence-connector parser)
 * 5. Rigid Physics & I2V Anchor (catches rubbery/noodle contradictions on R6 & R15)
 * 6. Trademark & Brand Cleanliness (fails official Roblox Tilt / [R] logo leaks)
 * 7. Pet & Prop Topology Lock (blocks scaly/clawed organic pets & finger-pinched props)
 * 8. UI & Engine Compatibility Guard (flags dense garble-prone UI text & unknown engines)
 */

import fs from "node:fs";
import path from "node:path";

const VALID_ENGINES = new Set(["local3d", "kling", "seedance", "hailuo", "wan", "sora", "runway"]);

const ISSUE_PATCHES = {
  "human-fingers": {
    titleZh: "长出人类五指 (Human Finger Growth)",
    fixEn: "fingerless and clawless solid 1x2x1 beveled rectangular block hands, zero human fingers, no knuckles",
    fixZh: "平头倒角1x2x1实心方块手部，严禁出现人类五指或手部关节纹"
  },
  "lego-studs": {
    titleZh: "出现乐高头顶/地面圆颗粒或乐高C型夹爪手 (Lego Stud & C-Claw Contamination)",
    fixEn: "smooth studless 1:1 barrel-beveled Roblox head, flat SmoothPlastic / WoodPlanks / Concrete floor surfaces (zero raised circular Lego floor studs or cylindrical brick pegs), solid 1x2x1 rectangular block hands (no Lego C-shaped hook claws)",
    fixZh: "头顶完全平滑的1:1桶状圆角Roblox头部，平滑无凸起圆粒的Roblox SmoothPlastic/木纹/柏油地面（严禁乐高地面凸点底板），1x2x1实心平头方柱手（严禁乐高C型钩子爪）"
  },
  "minecraft-voxels": {
    titleZh: "串味成我的世界像素方块 (Minecraft Voxel Drift)",
    fixEn: "classic Roblox 1:1 barrel-cylinder head with deep curved top/bottom bevels, SmoothPlastic shader, non-voxel, no pixel texture",
    fixZh: "经典Roblox 1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料材质，非像素马赛克方块"
  },
  "limb-gap": {
    titleZh: "双腿分叉有空隙或穿分体运动鞋 (Non-Roblox Separated Legs)",
    fixEn: "canonical Roblox 2x2x1 rectangular torso with two 1x2x1 rectangular leg blocks sitting flush side-by-side matching exact torso width, zero thigh gap",
    fixZh: "标准Roblox 2x2x1宽扁长方体躯干配两条并拢齐平的1x2x1方柱双腿（与躯干完全同宽，无腿缝、无外凸真人运动鞋）"
  },
  "face-morph": {
    titleZh: "五官突起长出真人鼻子/嘴唇 (3D Human Face Morphing)",
    fixEn: "flat 2D screen-printed Roblox face decal on smooth cylindrical surface, painted ink eyes and mouth, zero 3D nose protrusion",
    fixZh: "纯平2D丝网印刷五官贴图，绘制墨点眼与平面嘴型，零3D鼻子凸起，无真实皮肤纹理"
  },
  "noodle-limbs": {
    titleZh: "四肢像面条一样弯曲软化 (Rubbery Noodle Limbs)",
    fixEn: "rigid 1x2x1 rectangular blocky arms and legs, strict Motor6D mechanical hinge rotation only, zero rubbery soft-body bending",
    fixZh: "刚性1x2x1长方体四肢，仅在Motor6D机械转轴处转动，严禁橡胶面条状软体弯曲形变"
  },
  "foot-sliding": {
    titleZh: "走路脚底打滑/太空步 (Foot Skating / Sliding)",
    fixEn: "medium three-quarter framing, crisp bouncy R6 hop landing firmly on a flat smooth Roblox SmoothPlastic or WoodPlanks floor",
    fixZh: "改用中景或七分景机位，将连续碎步走改为干脆的R6方块跳步落地，强化与平整地面的接触阴影"
  },
  "outfit-drift": {
    titleZh: "切镜头后衣服与配饰变形 (Cross-Shot Outfit Drift)",
    fixEn: "Anchor multi-shot episodes with a locked Cast Spec JSON (`render_preview.mjs --spec`) or First-Frame I2V from a 3-view turnaround sheet",
    fixZh: "通过结构化角色设定JSON（`render_preview.mjs --spec`本地3D直出）或3视图首帧I2V锁定跨镜头穿搭"
  },
  "trademark-leak": {
    titleZh: "混入官方商标或品牌水印 (Official Trademark Leak)",
    fixEn: "unbranded outfits and UI badges using clean geometric triangle emblems only, zero official Roblox logos or tilted-square badges",
    fixZh: "纯色无标服饰与UI卡片，仅使用原创几何三角形徽章，严禁任何官方Roblox倾斜方框商标或R字徽标"
  },
  overload: {
    titleZh: "单镜头动作过多导致穿模卡死 (Single-Clip Action Overload)",
    fixEn: "Split sequential verbs so each 3.5–4s shot executes only ONE primary physical action and ONE camera move",
    fixZh: "遵循单镜头单动作铁律：将多个连续动词拆分为独立的3.5~4秒分镜，每镜只保留1个核心动作"
  }
};

function printHelp() {
  console.log(`Usage:
  node scripts/drift_check.mjs --prompt "<prompt text>" [options]
  node scripts/drift_check.mjs --pack <prompts.json | episode.json> [options]

Run 8-gate deterministic PASS/WARN/FAIL checks on a Roblox-style video prompt or full episode spec.

Options:
  --prompt <text>    Draft prompt to inspect
  --pack <file>      Inspect all shots inside a compiled prompts.json or custom episode spec JSON
  --engine <id>      Target engine: local3d | kling | seedance | hailuo | wan | sora | runway (default: local3d)
  --rig <id>         Optional rig hint: r6 | r15 | chibi-blocky
  --mode <id>        Workflow mode: i2v | t2v | local3d (default: i2v)
  --issue <code>     Optional observed failure code: ${Object.keys(ISSUE_PATCHES).join(" | ")}
  --lang <code>      Output language: en | zh | zh-tw | ja | ko | es | fr | de | pt | ru | zh-en (default: en)
  --out <path>       Write UTF-8 report directly to file
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
    prompt: "",
    pack: "",
    engine: "kling",
    rig: "",
    mode: "i2v",
    issue: "",
    out: "",
    lang: "en",
    json: false,
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--prompt" && argv[i + 1]) opts.prompt = argv[++i];
    else if ((arg === "--pack" || arg === "--spec") && argv[i + 1]) opts.pack = argv[++i];
    else if (arg === "--engine" && argv[i + 1]) opts.engine = argv[++i].toLowerCase();
    else if (arg === "--rig" && argv[i + 1]) opts.rig = argv[++i].toLowerCase();
    else if (arg === "--mode" && argv[i + 1]) opts.mode = argv[++i].toLowerCase();
    else if (arg === "--issue" && argv[i + 1]) opts.issue = argv[++i].toLowerCase();
    else if (arg === "--out" && argv[i + 1]) opts.out = argv[++i];
    else if (arg === "--lang" && argv[i + 1]) opts.lang = normalizeLang(argv[++i]);
  }
  return opts;
}

/**
 * Strip negated clauses locally so we can distinguish positive risk mentions
 * ("with five fingers") from negations ("zero fingers", "无人类五指"), AND
 * detect contradictions when BOTH appear in the same prompt!
 */
function stripNegatedSpans(text) {
  return text
    .replace(/\b(?:no|zero|without|never|free of|avoid|ban|excluding)\s+[^.,;()\n]{1,55}/gi, " ")
    .replace(/(?:严禁|禁止|不带|不含|没有|无|零)[^，。；、（）()\n]{1,26}/g, " ");
}

function countActionVerbsAndConnectors(prompt) {
  // Neutralize camera framing, static outfit/decal adjectives, and spatial prepositions ("close-up", "medium-close", "pull-back", "open jacket", "open gasp mouth", "sweat drop", "next to")
  const scrubbed = prompt
    .replace(/\b(?:extreme\s+|medium[-\s]+)?close[-\s]?ups?\b/gi, "closeup_lens")
    .replace(/\bmedium-close\b/gi, "medium_lens")
    .replace(/\bpop-ups?\b/gi, "popup_ui")
    .replace(/\bpush-in\b/gi, "dolly_in")
    .replace(/\bpull-(?:out|back)\b/gi, "dolly_out")
    .replace(/\bnext\s+to\b/gi, "beside")
    .replace(/\bstand-in\b/gi, "substitute")
    .replace(/\bopen\s+(?:jacket|hoodie|coat|collar|shirt|vest|(?:silent\s+)?gasp(?:\s+mouth)?|mouth|grin|smile)\b/gi, "styled_feature")
    .replace(/\bsweat\s+drops?\b/gi, "sweat_decal")
    .replace(/\bteardrops?\b/gi, "tear_decal")
    .replace(/\[[^\]]*\]/g, " "); // ignore bracketed camera tags like [Push in, Shake]

  const enConnectors =
    scrubbed.match(/\b(?:then|and then|after that|afterwards|subsequently|while simultaneously|followed by)\b/gi) || [];
  const zhConnectors = scrubbed.match(/(?:接着|然后|随后|紧接着|再转身|再跑|再跳|再坐|再挥|再拍|一边[^，。]{1,10}一边)/g) || [];
  const chainConnectors = enConnectors.length + zhConnectors.length;

  const enVerbs =
    scrubbed.match(
      /\b(?:walks?|walking|runs?|running|sprints?|sprinting|dashes?|dashing|jumps?|jumping|hops?|hopping|leaps?|leaping|sits?\s+down|sitting\s+down|stands?\s+up|standing\s+up|drinks?|drinking|pours?|pouring|spills?|spilling|eats?|eating|opens?|opening|closes?|closing|slams?|slamming|slaps?|slapping|swats?|swatting|taps?|tapping|clicks?|clicking|waves?|waving|cries|crying|dances?|dancing|spins?|spinning|falls?|falling|trips?|tripping|dives?|diving|plunges?|plunging|plummets?|plummeting|climbs?|climbing|dodges?|dodging|hesitates?|hesitating|misses|missing|pushes|pushing|pulls?|pulling|grabs?|grabbing|snatches|snatching|throws?|throwing|drops?|dropping|cracks?|cracking|hatches|hatching|crashes|crashing|recoils?|recoiling)\b/gi
    ) || [];

  const zhVerbs =
    scrubbed.match(
      /(?:跑向|奔跑|狂奔|冲刺|冲向|走过|走进|跳到|跳起|跳跃|跃起|跃过|坐下|落座|站起|喝水|喝咖啡|倒水|洒出|打开|合上|关上|拍扁|拍停|拍下|拍在|挥手|挥开|挥动|抱头|哭泣|跳舞|转身|旋转|摔倒|绊倒|飞扑|坠落|跌落|爬上|躲避|闪避|推着|推动|拉动|抓起|抢走|扔出|掉回|撞开|冲撞|裂开|破壳)/g
    ) || [];

  return {
    chainConnectors,
    verbCount: enVerbs.length + zhVerbs.length,
    matchedVerbs: [...enVerbs, ...zhVerbs]
  };
}

export function inspectPrompt(rawOpts = {}) {
  const prompt = (rawOpts.prompt || "").trim();
  const lower = prompt.toLowerCase();
  const positiveOnly = stripNegatedSpans(prompt);
  const posLower = positiveOnly.toLowerCase();

  const mode = rawOpts.mode === "t2v" ? "t2v" : rawOpts.mode === "local3d" ? "local3d" : "i2v";
  const rawEngine = (rawOpts.engine || "kling").toLowerCase();
  const isKnownEngine = VALID_ENGINES.has(rawEngine);
  const engine = rawEngine;
  const issue = rawOpts.issue && ISSUE_PATCHES[rawOpts.issue] ? rawOpts.issue : "";

  const detectedRig =
    rawOpts.rig === "r15" || /\br15\b/i.test(prompt)
      ? "r15"
      : rawOpts.rig === "r6" || /\br6\b/i.test(prompt)
      ? "r6"
      : "chibi-blocky";

  const checks = [];

  // 1. Hand Geometry Lock (Unicode-safe for both EN & ZH, catches contradictions!)
  const hasHandLock =
    /fingerless|zero(?:\s+human)?\s+fingers|no(?:\s+human)?\s+fingers|without\s+fingers|solid[^.,;]{0,30}block\s+hands?|1x2x1[^.,;]{0,30}(?:arms?|hands?)|blocky\s+hands?/.test(
      lower
    ) || /(?:无手指|无人类五指|零手指|实心[^，。；]{0,12}方[块柱][^，。；]{0,6}手|1x2x1[^，。；]{0,12}手|平头[^，。；]{0,8}方[块柱]?手)/.test(prompt);

  const positiveMentionsFingers =
    /\b(?:five\s+fingers|human\s+fingers|human\s+hands|fingers|knuckles|thumb)\b/i.test(posLower) ||
    /(?:五根手指|人类五指|五指|手指|指关节|拇指)/.test(positiveOnly);

  const positiveMentionsLegoClaws =
    /\b(?:c-shaped|claw\s+hands?|lego\s+claws?|lego\s+hooks?)\b/i.test(posLower) ||
    /(?:c型手|c型夹爪|c型钩爪|乐高爪|乐高钩子)/i.test(positiveOnly);

  if (positiveMentionsFingers || issue === "human-fingers") {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "FAIL",
      reasonEn: hasHandLock
        ? "Contradictory hand prompt: positive clause mentions fingers/thumbs even though a fingerless lock appears later."
        : "Prompt triggers human finger generation without a fingerless solid 1x2x1 rectangular block hand lock.",
      reasonZh: hasHandLock
        ? "手部描述自相矛盾：前文正向出现了手指/五指动作，后文又声明无手指。"
        : "提示词正文中出现五指/手指描述且缺少「无手指1x2x1实心平头方块手」几何锁定。"
    });
  } else if (positiveMentionsLegoClaws) {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "FAIL",
      reasonEn: "C-shaped claw hooks belong to Lego minifigures; use `fingerless and clawless solid 1x2x1 beveled rectangular block hands`.",
      reasonZh: "C型夹爪属于乐高小人特征，必须改为「无手指且无乐高C型爪的1x2x1实心平头倒角方柱手」。"
    });
  } else if (!hasHandLock) {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "WARN",
      reasonEn: "Missing explicit `fingerless and clawless solid 1x2x1 rectangular block hands` token; models may invent human fingers or Lego hooks.",
      reasonZh: "未显式声明「1x2x1实心平头方块手」，运动时易长出人类手指或乐高钩爪。"
    });
  } else {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "PASS",
      reasonEn: "Solid fingerless & clawless blocky hand lock verified.",
      reasonZh: "已包含无指无爪的实心平头方块手锁定。"
    });
  }

  // 2. 2D Face Decal Lock
  const hasFaceLock =
    /2d[^.,;]{0,25}(?:decal|face|eyes|smile|grin)|(?:decal|screen-printed|painted)\s+face|(?:barrel|cylindrical)\s+head/.test(lower) ||
    /(?:2d[^，。；]{0,12}(?:五官|贴图|笑脸|死鱼眼|圆圈眼)|印刷[^，。；]{0,8}(?:五官|贴图|困眼|笑脸)|平面[^，。；]{0,8}贴图|圆柱头|桶状[^，。；]{0,6}头)/i.test(
      prompt
    );
  const humanGenderRisk =
    /\b(?:girl|boy|man|woman|realistic\s+face|3d\s+nose|lips)\b/i.test(posLower) ||
    /(?:真脸|高鼻梁|真人嘴唇)/.test(positiveOnly);

  if (issue === "face-morph" || (humanGenderRisk && !hasFaceLock)) {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: issue === "face-morph" ? "FAIL" : "WARN",
      reasonEn: "Humanized nouns or facial terms without `1:1 barrel-beveled cylindrical head, flat 2D screen-printed face decal, zero 3D nose` risk realistic face morphing.",
      reasonZh: "包含拟人词但未锁定「1:1桶状圆角圆柱头 + 纯平2D印刷五官贴图 + 无3D鼻子」，易触发真人化五官变形。"
    });
  } else if (!hasFaceLock) {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: "WARN",
      reasonEn: "Add `1:1 barrel-beveled cylindrical head, flat 2D screen-printed decal face` to prevent 3D nose protrusion.",
      reasonZh: "建议补充「1:1桶状圆柱头、纯平2D印刷五官贴图」以防止长出3D鼻子。"
    });
  } else {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: "PASS",
      reasonEn: "Cylindrical head and flat 2D face decal lock present.",
      reasonZh: "已锁定桶状圆柱头与2D平面贴图五官。"
    });
  }

  // 3. Studless & Non-Voxel Guard
  const hasStudlessLock =
    /studless|zero\s+raised[^.,;]{0,20}stud|no\s+raised[^.,;]{0,20}lego|non-voxel|chamfered|beveled|smoothplastic/.test(lower) ||
    /(?:无颗粒|无凸点|无圆粒|无乐高|倒角|平滑塑料|非像素)/.test(prompt);
  const positiveMentionsLegoStuds =
    /\b(?:studded|raised\s+studs|lego\s+studs|lego\s+floor|brick\s+pegs|voxel\s+cube)\b/i.test(posLower) ||
    /(?:凸点底板|乐高颗粒|乐高圆粒|地面凸点|像素方块头)/.test(positiveOnly);

  if (issue === "lego-studs" || issue === "minecraft-voxels" || positiveMentionsLegoStuds) {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高凸粒与MC防串味锁",
      status: issue ? "FAIL" : "FAIL",
      reasonEn: "Positive prompt includes `studded` / Lego floor bumps or voxel terms; replace with `smooth flat SmoothPlastic / WoodPlanks / Concrete surfaces (zero raised circular Lego studs), non-voxel`.",
      reasonZh: "正向描述中包含凸点底板/乐高颗粒或体素词，极易诱发地面与头顶长出乐高圆粒；必须改为平整无凸点的 SmoothPlastic/木板/混凝土表面。"
    });
  } else if (!hasStudlessLock) {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高凸粒与MC防串味锁",
      status: "WARN",
      reasonEn: "Missing `smooth studless SmoothPlastic, 2mm chamfered edges, zero raised Lego studs, non-voxel`.",
      reasonZh: "缺少「平滑无乐高凸粒、2毫米倒角、非像素方块」描述。"
    });
  } else {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高凸粒与MC防串味锁",
      status: "PASS",
      reasonEn: "Studless beveled geometry and smooth architectural surface tokens present.",
      reasonZh: "已包含无乐高凸粒倒角方块与平整表面锁定。"
    });
  }

  // 4. Single-Action Clip Budget (Unicode-safe; prefer isolated actionText when available from structured packs!)
  const actionScopeText = rawOpts.actionText ? stripNegatedSpans(rawOpts.actionText) : positiveOnly;
  const { chainConnectors, verbCount } = countActionVerbsAndConnectors(actionScopeText);
  if (issue === "overload" || chainConnectors >= 2 || verbCount >= 3 || (chainConnectors >= 1 && verbCount >= 3)) {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "FAIL",
      reasonEn: `Detected multi-step action chain (${verbCount} active motion verbs, ${chainConnectors} sequence connectors). Split into separate 3.5–4s single-action shots.`,
      reasonZh: `检测到单镜头动作超载（识别到 ${verbCount} 个动态动词、${chainConnectors} 处先后连接词）。请拆分为每镜单一核心动作的 3.5~4 秒分镜。`
    });
  } else if (chainConnectors === 1 || verbCount === 2) {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "WARN",
      reasonEn: "Two-step motion detected; keep the secondary beat to a simple 2D decal swap or rigid head pivot.",
      reasonZh: "检测到两段动作，建议将次要动作限制为面部2D贴图切换或刚性转头。"
    });
  } else {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "PASS",
      reasonEn: "Action density fits cleanly inside a single 3.5–4s shot.",
      reasonZh: "单镜头动作密度合理。"
    });
  }

  // 5. Rigid Physics & Contradiction Check (catches "R15 ... softly bends noodle-like arm"!)
  const hasSoftBodyContradiction =
    /\b(?:noodle-like|noodle\s+arms?|rubbery|softly\s+bends?|bendy|elastic\s+limbs?|twists?\s+(?:its\s+)?forearm|jelly\s+limbs?|soft-body\s+limbs?)\b/i.test(
      posLower
    ) || /(?:面条臂|面条般|像面条一样|软体弯曲|橡胶般弯曲|扭曲前臂|软绵绵弯曲)/.test(positiveOnly);

  const hasExplicitHingeWords =
    /\b(?:rigid|hinges?|motor6d|stiff|unsegmented|mechanical\s+elbows?)\b/i.test(lower) ||
    /(?:刚性|刚体|转轴|铰链|僵直|不弯曲)/.test(prompt);

  if (hasSoftBodyContradiction || issue === "noodle-limbs" || issue === "foot-sliding" || issue === "outfit-drift") {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "FAIL",
      reasonEn: hasSoftBodyContradiction
        ? "Contradictory soft-body limb deformation (`noodle-like` / `softly bends` / `twists forearm`) detected; blocky R6/R15 limbs must remain rigid rectangular segments rotating only at mechanical hinges."
        : ISSUE_PATCHES[issue].fixEn,
      reasonZh: hasSoftBodyContradiction
        ? "检测到面条臂/软体弯曲/扭曲前臂等矛盾变形词；R6/R15方柱四肢必须保持刚性长方体，仅沿机械铰链折角转动。"
        : ISSUE_PATCHES[issue].fixZh
    });
  } else if (mode === "t2v" || !hasExplicitHingeWords) {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "WARN",
      reasonEn:
        mode === "t2v"
          ? "Raw T2V risks cross-shot outfit drift; prefer local 3D `--spec` rendering or First-Frame I2V with explicit `rigid Motor6D mechanical hinge joints`."
          : "Add explicit `rigid Motor6D mechanical hinge joints` (mentioning `R6`/`R15` alone is not enough to stop soft-body limb bending).",
      reasonZh:
        mode === "t2v"
          ? "纯文生视频(T2V)多镜头易换装变脸；建议直接用本地3D `--spec` 渲染成片，或改用首帧I2V并显式声明「刚性Motor6D机械铰链」。"
          : "仅写 R6/R15 骨架名不足以阻止软体形变，请显式加入「刚性Motor6D机械转轴/铰链 (rigid mechanical hinge joints)」。"
    });
  } else {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "PASS",
      reasonEn: "Rigid mechanical hinge physics locked without soft-body contradictions.",
      reasonZh: "已锁定刚性机械铰链物理且无软体变形冲突。"
    });
  }

  // 6. Trademark & Brand Cleanliness Gate
  const positiveMentionsTrademark =
    /\b(?:official\s+roblox\s+(?:logo|r\b|badge|emblem|trademark)|roblox\s+tilt\b|tilted[-\s]square\s+(?:roblox|r\b|logo)|roblox\s+r\s+(?:logo|badge|emblem)|robux\s+(?:icon|logo))\b/i.test(
      posLower
    ) || /(?:官方\s*roblox\s*(?:商标|logo|标志|徽标)|倾斜方框\s*(?:商标|标志)|roblox\s*r\s*(?:标|徽标))/i.test(positiveOnly);

  if (positiveMentionsTrademark || issue === "trademark-leak") {
    checks.push({
      gate: "Trademark Cleanliness / 官方商标零污染锁",
      status: "FAIL",
      reasonEn: "Positive prompt requests an official Roblox logo / tilted-square emblem / [R] badge. Replace with an unbranded geometric triangle emblem.",
      reasonZh: "正向提示词中包含官方 Roblox 商标 / 倾斜方框或 R 徽标；请替换为无品牌的原创几何三角形徽章。"
    });
  } else {
    checks.push({
      gate: "Trademark Cleanliness / 官方商标零污染锁",
      status: "PASS",
      reasonEn: "Zero official trademark emblems requested in positive prompt.",
      reasonZh: "正向描述无官方品牌商标污染。"
    });
  }

  // 7. Non-Human Pet & Prop Topology Gate (ignore wearable ear accessories like "cat-ear headphones")
  const petScopeLower = posLower.replace(/\b(?:cat|dog|bunny|bear|fox)-ears?\b/gi, "ear_accessory");
  const petScopeZh = positiveOnly.replace(/(?:猫耳|兔耳|熊耳|狗耳)(?:耳机|帽|发箍|头饰)?/g, "耳饰");
  const mentionsPet =
    /\b(?:dragon|pet|puppy|dog|cat|kitten|monster|creature|mount)\b/i.test(petScopeLower) ||
    /(?:神宠|宠物|巨龙|恐龙|小龙|猫咪|小狗|坐骑)/.test(petScopeZh);
  const organicPetDrift =
    /\b(?:scaly|scales|sharp\s+claws?|talons?|leathery\s+(?:bat\s+)?wings?|feathers?|furry|realistic\s+fur|fangs?)\b/i.test(
      posLower
    ) || /(?:龙鳞|鳞片|锋利尖爪|利爪|皮膜翼|蝙蝠翼|逼真毛发|獠牙)/.test(positiveOnly);
  const blockyPetLocked =
    /\b(?:blocky[^.,;]{0,25}(?:pet|dragon|dog|cat|wing)|chamfered[^.,;]{0,25}(?:pet|dragon|wing)|clawless[^.,;]{0,20}paws?)\b/i.test(
      lower
    ) || /(?:方块[^，。；]{0,8}(?:龙|宠|犬|翼)|无爪[^，。；]{0,8}方[足爪]|几何翼)/.test(prompt);

  const mentionsHeldProp =
    /\b(?:kettle|ramen|noodles?|chopsticks?|cup|mug|cola|can|sword|flashlight|pencil|strap|handle|shopping\s+cart|umbrella|phone|tray)\b/i.test(
      posLower
    ) || /(?:水壶|泡面|筷子|咖啡杯|可乐罐|长剑|手电筒|铅笔|吊环|把手|购物车|托盘)/.test(positiveOnly);
  const fingerPinchProp =
    /\b(?:pinches?|wraps?\s+(?:its\s+)?fingers|gripping\s+with\s+fingers|curls?\s+fingers|between\s+thumb\s+and)\b/i.test(
      posLower
    ) || /(?:捏住|五指握住|手指缠绕|夹在指间|扣住扳机)/.test(positiveOnly);
  const propDockedCleanly =
    /\b(?:docked|welded|parented|attached\s+flush|mounted\s+flush|magnetic|presses\s+squarely|flat\s+against|pushes\s+the\s+bar)\b/i.test(
      lower
    ) || /(?:吸附|刚性贴合|父子绑定|焊接|平贴|抵住|贴在)/.test(prompt);

  if ((mentionsPet && organicPetDrift) || fingerPinchProp) {
    checks.push({
      gate: "Pet & Prop Topology Lock / 神宠与手持道具刚性装配锁",
      status: "FAIL",
      reasonEn: fingerPinchProp
        ? "Prop interaction uses finger-pinching/wrapping (`pinches` / `wraps fingers`); specify rigid flat-surface docking/welding to the 1x2x1 block hand."
        : "Non-human pet uses organic anatomy (`scales` / `sharp claws` / `leathery wings`); lock chamfered SmoothPlastic/Neon pet blocks, 2D dot eyes, and clawless block paws.",
      reasonZh: fingerPinchProp
        ? "道具交互出现了捏住/手指缠绕描述；必须改为道具与1x2x1实心平头方手平面的刚性吸附/贴合装配。"
        : "非人宠物包含鳞片/尖爪/皮膜翼等有机生物特征；必须锁定倒角SmoothPlastic/Neon方块神宠、2D豆豆眼与无爪实心小方足。"
    });
  } else if ((mentionsPet && !blockyPetLocked) || (mentionsHeldProp && !propDockedCleanly && mode !== "local3d")) {
    checks.push({
      gate: "Pet & Prop Topology Lock / 神宠与手持道具刚性装配锁",
      status: "WARN",
      reasonEn: mentionsPet
        ? "Pet mentioned without explicit `blocky chamfered SmoothPlastic pet, 2D dot eyes, clawless block paws` lock."
        : "Handheld prop mentioned without explicit rigid flat-hand docking (`docked/welded flush against the solid 1x2x1 block hand`).",
      reasonZh: mentionsPet
        ? "提及宠物但未锁定「倒角方块几何体、2D豆豆眼、无爪小方足」，易退化为写实生物。"
        : "提及手持/接触道具，建议显式声明「与1x2x1实心平头方手底面刚性贴合/吸附 (docked/welded flush)」，防止模型脑补手指握持。"
    });
  } else {
    checks.push({
      gate: "Pet & Prop Topology Lock / 神宠与手持道具刚性装配锁",
      status: "PASS",
      reasonEn: "Pet/prop rigid attachment topology is clean.",
      reasonZh: "宠物与手持道具刚性装配约束清晰。"
    });
  }

  // 8. UI Text-Garble & Engine Compatibility Gate
  const denseUiRisk =
    /\b(?:paragraph\s+text|crowded\s+[^.,;]{0,20}text|fine\s+print|countdown\s+timer\s+\d\d:\d\d|four\s+overlapping\s+[^.,;]{0,25}text)\b/i.test(
      lower
    ) || /(?:密集小字|多行段落文字|倒计时数字跳动|满屏文字弹窗)/.test(prompt);

  if (!isKnownEngine) {
    checks.push({
      gate: "UI & Engine Guard / 浮空UI防乱码与引擎校验",
      status: "WARN",
      reasonEn: `Unsupported engine "${engine}". Valid engines: ${Array.from(VALID_ENGINES).join(", ")}.`,
      reasonZh: `未知引擎 "${engine}"；支持列表：${Array.from(VALID_ENGINES).join(", ")}。`
    });
  } else if (denseUiRisk) {
    checks.push({
      gate: "UI & Engine Guard / 浮空UI防乱码与引擎校验",
      status: "WARN",
      reasonEn: "Dense UI text or live ticking digits often garble in diffusion video; keep in-scene UI badges to 1–3 bold words or composite HUD text in post / local 3D.",
      reasonZh: "密集弹窗文字或跳动倒计时在扩散视频中极易乱码；画面内仅保留1~3词极简色块按钮，复杂花字建议后期合成或直接用本Skill本地3D直出。"
    });
  } else {
    checks.push({
      gate: "UI & Engine Guard / 浮空UI防乱码与引擎校验",
      status: "PASS",
      reasonEn: `Engine (${engine}) and UI text density verified.`,
      reasonZh: `目标引擎 (${engine}) 与画面UI文字密度正常。`
    });
  }

  const overallStatus = checks.some((c) => c.status === "FAIL")
    ? "FAIL"
    : checks.some((c) => c.status === "WARN")
    ? "WARN"
    : "PASS";

  // Clean & rig-accurate Rescue Rewrite
  const sanitizedAction = (prompt || "performs one crisp blocky hinge motion")
    .replace(/\b(?:then|and then|after that|afterwards|followed by)\b[\s\S]*$/i, "")
    .replace(/(?:接着|然后|随后|紧接着)[\s\S]*$/, "")
    .replace(/\b(?:with\s+)?(?:five\s+fingers|human\s+fingers|human\s+hands|c-shaped\s+claw\s+hands?|lego\s+claws?|studded\s+lego\s+floor|official\s+roblox\s+(?:logo|r\s+logo|badge)|noodle-like|softly\s+bends?|realistic\s+scaly)\b/gi, "")
    .replace(/(?:带人类五指的?|用五根手指|人类五指|乐高C型夹爪|凸点底板|官方Roblox商标Logo|像面条一样)/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/^[\s,.;:，。；、]+|[\s,.;:，。；、]+$/g, "");

  const hasCjkInput = /[\u4e00-\u9fff]/.test(sanitizedAction);
  const actionForEn = hasCjkInput ? "executes one crisp single-beat physical motion matching the keyframe" : sanitizedAction || "executes one crisp single-beat physical motion";
  const actionForZh = hasCjkInput ? sanitizedAction : "沿刚性机械铰链执行单一干脆的核心物理动作（保持首帧角色配色与贴图完全一致）";

  const rigDescEn =
    detectedRig === "r15"
      ? "Roblox R15 segmented blocky rig (2x2x1 SmoothPlastic torso, flush 1x2x1 upper/lower rectangular limb blocks rotating strictly at mechanical 90-degree elbow and knee hinges with zero rubbery bending, fingerless and clawless solid block hands)"
      : "Roblox R6/Blocky rig (2x2x1 SmoothPlastic rectangular torso, flush 1x2x1 unsegmented solid rectangular limbs rotating strictly at Motor6D shoulder and hip hinges, fingerless and clawless flat beveled block hands)";

  const rigDescZh =
    detectedRig === "r15"
      ? "Roblox R15分段刚性方块骨架（2x2x1平滑塑料躯干、并拢1x2x1刚性上下肢方块仅沿肘膝机械铰链折角转动、严禁面条弯曲、无指无爪实心平头方手）"
      : "标准Roblox R6刚性方块骨架（2x2x1平滑塑料长方体躯干、并拢齐平1x2x1无分段实心方柱四肢仅沿肩髋Motor6D转轴摆动、无指无爪实心平头方手）";

  let rescuedPromptEn;
  if (engine === "hailuo") {
    rescuedPromptEn = `[Push in] (9:16 vertical, ${detectedRig}) ${rigDescEn}, 1:1 barrel-beveled studless head with flat 2D screen-printed face decal. Single action: ${actionForEn}. Props docked flush to flat block hands, smooth architectural floor (zero raised Lego studs), unbranded triangle emblem only.`;
  } else if (engine === "sora") {
    rescuedPromptEn = `Camera (9:16, 35mm macro lens): Medium framing, controlled dolly push-in (generate 5.0s clip, trim to 3.75s). Subject: ${rigDescEn}, smooth studless 1:1 barrel head, flat 2D face decal. Action: ${actionForEn}. Physics: Strict rigid-body hinge rotation only, zero soft-body limb deformation, smooth studless floor, zero brand logos.`;
  } else if (engine === "runway") {
    rescuedPromptEn = `Camera (9:16): Medium tracking framing. Subject (${detectedRig}): ${rigDescEn}, 1:1 studless barrel head, flat 2D decal face. Action: ${actionForEn}. Physics: Rigid Motor6D hinges, smooth flat floor (zero Lego bumps), zero human fingers, unbranded.`;
  } else {
    const tag = isKnownEngine ? engine.toUpperCase() : "SAFE-BLOCKY";
    rescuedPromptEn = `[${tag} I2V · 9:16] ${rigDescEn}, smooth studless 1:1 barrel-beveled cylindrical head, flat 2D screen-printed face decal. Single action: ${actionForEn}. Smooth flat Roblox SmoothPlastic / WoodPlanks environment with multi-part props, zero human fingers, zero Lego C-claws or floor studs, zero official brand logos, non-voxel.`;
  }

  const tagZh = isKnownEngine ? engine.toUpperCase() : "通用防串味";
  const rescuedPromptZh = `【${tagZh} 首帧I2V · 9:16竖屏】${rigDescZh}，头顶平滑无颗粒1:1桶状圆角圆柱头与纯平2D印刷五官贴图。单一核心动作：${actionForZh}。手持道具与方手底面刚性贴合吸附，平整无凸粒地面与多部件精致道具，无任何官方商标Logo，严禁人类五指、乐高C型爪或乐高地面圆颗粒。`;

  const negativePrompt =
    "official Roblox logo, tilted square Roblox trademark emblem, Roblox R badge, brand watermarks, human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, raised circular Lego floor studs, studded Lego baseplate, Minecraft sharp voxel cube head, organic reptile scales, sharp claws, leathery bat wings, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, soft-body limb bending, foot sliding, morphing clothes / 官方Roblox倾斜方框商标Logo，R字品牌徽标，品牌水印，人类五指，真实人脸，乐高C型夹爪手，乐高头顶与地面凸起圆颗粒，我的世界直角像素块，真实动物鳞片尖爪，双腿分叉穿真人运动鞋，3D高鼻梁，面条状软体弯曲手臂，脚底打滑";

  return {
    overallStatus,
    engine,
    rig: detectedRig,
    mode,
    issue: issue || null,
    originalPrompt: prompt,
    checks,
    rescuedPromptEn,
    rescuedPromptZh,
    negativePrompt
  };
}

export function inspectPackageFile(filePath, opts = {}) {
  const abs = path.resolve(filePath);
  const raw = JSON.parse(fs.readFileSync(abs, "utf8").replace(/^\uFEFF/, ""));
  const shots = Array.isArray(raw.shots) ? raw.shots : [];
  if (shots.length === 0) {
    throw new Error(`No shots[] array found in ${abs}`);
  }

  const engine = (opts.engine || raw.engine || "local3d").toLowerCase();
  const rig = opts.rig || raw.rig || "r6";
  const packMode = engine === "local3d" || opts.mode === "local3d" ? "local3d" : opts.mode || "i2v";
  const seenActions = new Map();
  const duplicateShots = [];
  const constraintViolations = [];

  const shotReports = shots.map((s, idx) => {
    const shotNum = s.shotNumber || s.id || idx + 1;
    const isRawSpecShot = !s.i2vPromptEn && !s.i2vPromptZh && Boolean(Array.isArray(raw.cast) || raw.backdrop || raw.environmentEn);
    const specHeader = isRawSpecShot
      ? `Roblox ${rig} ${raw.material || "SmoothPlastic"} rig, 1:1 studless barrel cylindrical head, flat 2D screen-printed face decal, fingerless and clawless solid 1x2x1 block hands, rigid Motor6D hinges. ${raw.environmentEn || ""} `
      : "";
    const textToInspect = s.i2vPromptEn || s.i2vPromptZh || `${specHeader}${s.actionEn || s.actionZh || ""} ${s.faceEn || ""}`;
    const actionOnly = s.actionEn || s.actionZh || "";
    const actionSig = String(actionOnly).trim().toLowerCase();
    if (actionSig) {
      if (seenActions.has(actionSig)) {
        duplicateShots.push({ shotNumber: shotNum, duplicatesShot: seenActions.get(actionSig), action: actionSig });
      } else {
        seenActions.set(actionSig, shotNum);
      }
    }
    const banCheckpoint = Boolean(raw.constraints?.noCheckpoint || raw.constraints?.noCheckpoints);
    const banJetpack = Boolean(raw.constraints?.noJetpack || raw.constraints?.noJetpacks);
    if (banCheckpoint && /\bcheckpoint\b|存档点/i.test(textToInspect)) {
      constraintViolations.push(`Shot ${shotNum} violates constraints.noCheckpoint`);
    }
    if (banJetpack && /\bjetpack\b|喷气包/i.test(textToInspect)) {
      constraintViolations.push(`Shot ${shotNum} violates constraints.noJetpack`);
    }

    const rep = inspectPrompt({
      prompt: textToInspect,
      actionText: actionOnly,
      engine,
      rig,
      mode: s.i2vPromptEn ? packMode : "local3d"
    });
    return {
      shotNumber: shotNum,
      overallStatus: rep.overallStatus,
      failedGates: rep.checks.filter((c) => c.status === "FAIL").map((c) => c.gate),
      warnGates: rep.checks.filter((c) => c.status === "WARN").map((c) => c.gate)
    };
  });

  const hasFail =
    duplicateShots.length > 0 ||
    constraintViolations.length > 0 ||
    shotReports.some((r) => r.overallStatus === "FAIL");
  const hasWarn = shotReports.some((r) => r.overallStatus === "WARN");

  return {
    file: abs,
    shotCount: shots.length,
    uniqueActionCount: seenActions.size,
    overallStatus: hasFail ? "FAIL" : hasWarn ? "WARN" : "PASS",
    duplicateShots,
    constraintViolations,
    shotReports
  };
}

export function formatDriftCheckMarkdown(report, rawLang = "en") {
  const lang = normalizeLang(rawLang);
  const useZhText = lang === "zh" || lang === "zh-tw" || lang === "zh-en";
  const lines = [];
  lines.push(`# Prompt Drift & Rescue Report: \`${report.overallStatus}\` (\`lang: ${lang}\`)`);
  lines.push("");
  lines.push(`- **Engine, Rig & Mode**: \`${report.engine}\` · \`${report.rig || "r6"}\` · \`${report.mode.toUpperCase()}\``);
  if (report.issue) {
    lines.push(`- **Targeted Issue**: \`${report.issue}\` (${ISSUE_PATCHES[report.issue].titleZh})`);
  }
  if (report.originalPrompt) {
    lines.push(`- **Input Prompt**: \`${report.originalPrompt}\``);
  }
  lines.push("");
  lines.push("| Gate | Status | Diagnosis & Fix |");
  lines.push("| --- | :---: | --- |");
  for (const c of report.checks) {
    const diag = lang === "zh" ? c.reasonZh : lang === "zh-en" || lang === "zh-tw" ? `${c.reasonZh} (${c.reasonEn})` : c.reasonEn;
    lines.push(`| ${c.gate} | **${c.status}** | ${diag} |`);
  }
  lines.push("");

  if (lang !== "zh") {
    lines.push("## Rescued Prompt (English · Geometry-Locked Single Action)");
    lines.push("");
    lines.push("```text");
    lines.push(report.rescuedPromptEn);
    lines.push("```");
    lines.push("");
  }

  if (useZhText) {
    lines.push("## 救场重写提示词 (中文 · 已锁定几何防串味与单镜头单动作)");
    lines.push("");
    lines.push("```text");
    lines.push(report.rescuedPromptZh);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Required Negative Prompt");
  lines.push("");
  lines.push("```text");
  lines.push(report.negativePrompt);
  lines.push("```");

  return lines.join("\n");
}

function emitOutput(text, outPath) {
  if (outPath) {
    const abs = path.resolve(outPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  } else {
    console.log(text);
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]).endsWith("drift_check.mjs");
if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || (!opts.prompt && !opts.issue && !opts.pack)) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }
  try {
    if (opts.pack) {
      const packReport = inspectPackageFile(opts.pack, opts);
      const outText = opts.json
        ? JSON.stringify(packReport, null, 2)
        : `# Package Drift Audit: \`${packReport.overallStatus}\`\n\n- Shots: \`${packReport.shotCount}\` (Unique actions: \`${packReport.uniqueActionCount}\`)\n- Duplicate shots: \`${packReport.duplicateShots.length}\`\n- Constraint violations: \`${packReport.constraintViolations.length}\`\n\n` +
          packReport.shotReports
            .map((s) => `- Shot ${String(s.shotNumber).padStart(2, "0")}: **${s.overallStatus}**${s.failedGates.length ? ` (FAIL: ${s.failedGates.join(", ")})` : ""}`)
            .join("\n");
      emitOutput(outText, opts.out);
    } else {
      const report = inspectPrompt(opts);
      const outText = opts.json ? JSON.stringify(report, null, 2) : formatDriftCheckMarkdown(report, opts.lang);
      emitOutput(outText, opts.out);
    }
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }
}
