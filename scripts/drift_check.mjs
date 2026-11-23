#!/usr/bin/env node
/**
 * drift_check.mjs
 * Zero-dependency rule-based linter and rescue rewriter for Roblox-style AI video prompts.
 * Flags humanization risk, Lego/Minecraft style contamination, action overload, and joint drift.
 */

const ISSUE_PATCHES = {
  "human-fingers": {
    titleZh: "长出人类五指 (Human Finger Growth)",
    fixEn: "fingerless and clawless solid 1x2x1 beveled rectangular block hands, zero human fingers, no knuckles",
    fixZh: "平头倒角1x2x1实心方块手部，严禁出现人类五指或手部关节纹"
  },
  "lego-studs": {
    titleZh: "出现乐高头顶圆颗粒或乐高C型夹爪手 (Lego Stud & C-Claw Contamination)",
    fixEn: "smooth studless 1:1 barrel-beveled Roblox head, solid 1x2x1 rectangular block hands (no Lego C-shaped hook claws, no cylindrical brick pegs)",
    fixZh: "头顶完全平滑的1:1桶状圆角Roblox头部，1x2x1实心平头方柱手（严禁乐高C型钩子爪与头顶凸起颗粒）"
  },
  "minecraft-voxels": {
    titleZh: "串味成我的世界像素方块 (Minecraft Voxel Drift)",
    fixEn: "classic Roblox 1:1 barrel-cylinder head with deep curved top/bottom bevels, SmoothPlastic shader, non-voxel, no pixel texture",
    fixZh: "经典Roblox 1:1上下大圆角桶状圆柱头，SmoothPlastic平滑塑料材质，非像素马赛克方块"
  },
  "limb-gap": {
    titleZh: "双腿分叉有空隙或穿分体运动鞋，不像Roblox方腿 (Non-Roblox Separated Legs)",
    fixEn: "canonical Roblox 2x2x1 rectangular torso with two 1x2x1 rectangular leg blocks sitting flush side-by-side matching exact torso width, zero thigh gap",
    fixZh: "标准Roblox 2x2x1宽扁长方体躯干配两条并拢齐平的1x2x1方柱双腿（与躯干完全同宽，无腿缝、无外凸真人鞋头）"
  },
  "face-morph": {
    titleZh: "五官突起长出真人鼻子/嘴唇 (3D Human Face Morphing)",
    fixEn: "flat 2D screen-printed Roblox face decal on smooth cylindrical surface, painted ink eyes and mouth, zero 3D nose protrusion",
    fixZh: "纯平2D丝网印刷五官贴图，绘制墨点眼与平面嘴型，零3D鼻子凸起，无真实皮肤纹理"
  },
  "noodle-limbs": {
    titleZh: "四肢像面条一样弯曲软化 (Rubbery Noodle Limbs)",
    fixEn: "rigid 1x2x1 rectangular blocky arms and legs, strict Motor6D mechanical hinge rotation at shoulders and hips only, no rubbery bending",
    fixZh: "刚性1x2x1长方体四肢，仅在肩部与髋部做Motor6D机械转轴摆动，严禁橡胶面条状弯曲形变"
  },
  "foot-sliding": {
    titleZh: "走路脚底打滑/太空步 (Foot Skating / Sliding)",
    fixEn: "medium three-quarter framing, crisp bouncy R6 hop landing firmly on a classic Roblox 1x1 studded baseplate grid",
    fixZh: "改用中景或七分景机位，将连续碎步走改为干脆的R6方块跳步落地，强化与Roblox方格底板的接触"
  },
  "outfit-drift": {
    titleZh: "切镜头后衣服与配饰变形 (Cross-Shot Outfit Drift)",
    fixEn: "Switch from raw T2V to First-Frame I2V anchored by a 3-view character turnaround reference sheet",
    fixZh: "从纯文生视频(T2V)切换为首帧图生视频(I2V)，先用角色三视图固定全身穿搭再生成各镜头首帧"
  },
  "overload": {
    titleZh: "单镜头动作过多导致穿模卡死 (Single-Clip Action Overload)",
    fixEn: "Split sequential verbs so each 4-5s video clip executes only ONE primary physical action and ONE camera move",
    fixZh: "遵循单镜头单动作铁律：将多个连续动词拆分为独立的3.5~4秒分镜，每镜只保留1个核心动作"
  }
};

function printHelp() {
  console.log(`Usage: node scripts/drift_check.mjs --prompt "<prompt text>" [options]

Run deterministic PASS/WARN/FAIL checks on a Roblox-style AI video prompt and output a rescued rewrite.

Options:
  --prompt <text>    Draft prompt to inspect (required unless --issue is given)
  --engine <id>      Target engine: kling | seedance | hailuo | wan | sora | runway (default: kling)
  --mode <id>        Workflow mode: i2v | t2v (default: i2v)
  --issue <code>     Optional observed failure code: human-fingers | lego-studs |
                     minecraft-voxels | face-morph | noodle-limbs | foot-sliding |
                     outfit-drift | overload
  --lang <mode>      Output language: zh-en | zh | en (default: zh-en)
  --json             Output structured JSON
  --help             Show this help message`);
}

export function parseArgs(argv) {
  const opts = {
    prompt: "",
    engine: "kling",
    mode: "i2v",
    issue: "",
    lang: "zh-en",
    json: false,
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--prompt" && argv[i + 1]) opts.prompt = argv[++i];
    else if (arg === "--engine" && argv[i + 1]) opts.engine = argv[++i].toLowerCase();
    else if (arg === "--mode" && argv[i + 1]) opts.mode = argv[++i].toLowerCase();
    else if (arg === "--issue" && argv[i + 1]) opts.issue = argv[++i].toLowerCase();
    else if (arg === "--lang" && argv[i + 1]) opts.lang = argv[++i];
  }
  return opts;
}

export function inspectPrompt(rawOpts = {}) {
  const prompt = (rawOpts.prompt || "").trim();
  const lower = prompt.toLowerCase();
  const mode = rawOpts.mode === "t2v" ? "t2v" : "i2v";
  const engine = rawOpts.engine || "kling";
  const issue = rawOpts.issue && ISSUE_PATCHES[rawOpts.issue] ? rawOpts.issue : "";

  const checks = [];

  // 1. Hand geometry check (block BOTH human fingers AND Lego C-claws unless negated)
  const hasHandLock =
    /fingerless|solid.*block hand|1x2x1.*arm|blocky hand|无手指|实心方块手|实心方柱手|方柱手/.test(lower);
  const mentionsRiskyHands =
    /\b(fingers|five fingers|human hands|手指|五指)\b/.test(lower) &&
    !/no human fingers|zero human fingers|无手指|严禁.*手指/.test(lower);
  const mentionsLegoClaws =
    /\b(c-shaped|claw hand|lego claw|c型手|c型夹爪)\b/.test(lower) &&
    !/no lego c-shaped|zero lego|clawless|无乐高c型|严禁.*c型/.test(lower);

  if (mentionsRiskyHands || issue === "human-fingers") {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "FAIL",
      reasonEn: "Prompt triggers human finger generation without a fingerless solid 1x2x1 rectangular block hand lock.",
      reasonZh: "提示词易触发真人五指生成，缺少「无手指1x2x1实心平头方块手」几何锁定。"
    });
  } else if (mentionsLegoClaws) {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "WARN",
      reasonEn: "C-shaped claw hooks belong to Lego minifigures; authentic Roblox R6/Blocky avatars use `fingerless and clawless solid 1x2x1 beveled rectangular block hands`.",
      reasonZh: "C型夹爪属于乐高小人特征；纯正Roblox方块小人应使用「无手指且无乐高C型爪的1x2x1实心平头倒角方柱手」。"
    });
  } else if (!hasHandLock) {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "WARN",
      reasonEn: "Missing explicit `fingerless and clawless solid 1x2x1 rectangular block hands` token; models may invent human fingers or Lego hooks.",
      reasonZh: "未显式声明「1x2x1实心平头方块手 (solid 1x2x1 rectangular block hands)」，运动时易长出人类手指或乐高钩爪。"
    });
  } else {
    checks.push({
      gate: "Hand Geometry Lock / 手部防长手指与防乐高爪锁",
      status: "PASS",
      reasonEn: "Solid fingerless Roblox blocky hand lock detected.",
      reasonZh: "已包含纯正Roblox实心平头方块手锁定。"
    });
  }

  // 2. Face & Head Decal check
  const hasFaceLock =
    /2d.*decal|2d.*face|screen-printed|painted face|cylindrical head|2d.*五官|2d.*贴图|印刷五官|圆柱头/.test(lower);
  if (issue === "face-morph" || (!hasFaceLock && /\b(talking|singing|crying|laughing|girl|boy|man|woman|说话|唱歌|大笑|哭泣)\b/.test(lower))) {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: issue === "face-morph" ? "FAIL" : "WARN",
      reasonEn: "Expressive or human-gendered nouns without `flat 2D screen-printed face decal, smooth cylindrical head, no 3D nose` risk morphing into a realistic human face.",
      reasonZh: "包含拟人词或情绪动词但未锁定「平滑圆柱头 + 纯平2D丝网印刷五官贴图 + 无3D真人鼻子」，极易出现五官立体真人化。"
    });
  } else if (!hasFaceLock) {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: "WARN",
      reasonEn: "Add `smooth cylindrical head, flat 2D screen-printed decal face` to prevent 3D nose protrusion.",
      reasonZh: "建议补充「平滑圆柱头、纯平2D印刷五官贴图」以防止长出3D鼻子。"
    });
  } else {
    checks.push({
      gate: "2D Face Decal Lock / 面部2D贴图锁",
      status: "PASS",
      reasonEn: "Cylindrical head and 2D decal face lock present.",
      reasonZh: "已锁定圆柱头与2D平面贴图五官。"
    });
  }

  // 3. Lego / Minecraft contamination check
  const hasStudlessLock = /studless|non-voxel|chamfered|beveled|无颗粒|无乐高颗粒|倒角/.test(lower);
  if (issue === "lego-studs" || issue === "minecraft-voxels") {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高与MC防串味锁",
      status: "FAIL",
      reasonEn: `Observed style contamination (${issue}). Must lock studless smooth ABS/vinyl plastic and 2mm rounded bevels.`,
      reasonZh: `已发生风格串味（${issue}），必须正向声明平滑无颗粒盲盒塑料与2毫米圆润倒角。`
    });
  } else if (!hasStudlessLock) {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高与MC防串味锁",
      status: "WARN",
      reasonEn: "Missing `smooth studless plastic, 2mm chamfered edges, non-voxel`; model may add Lego studs or voxel cubes.",
      reasonZh: "缺少「无乐高凸起颗粒、2毫米倒角、非像素方块」描述，模型可能混入乐高颗粒或MC像素块。"
    });
  } else {
    checks.push({
      gate: "Studless & Non-Voxel Guard / 乐高与MC防串味锁",
      status: "PASS",
      reasonEn: "Studless beveled Roblox geometry tokens present.",
      reasonZh: "已包含无颗粒倒角方块材质锁定。"
    });
  }

  // 4. Single-action clip budget check
  const chainConnectors = (
    prompt.match(/\b(then|after that|and then|next|suddenly|while also|接着|然后|随后|再|紧接着|一边.*一边)\b/gi) || []
  ).length;
  const verbMatches = (
    prompt.match(
      /\b(walks?|runs?|jumps?|sits?|stands?|drinks?|eats?|opens?|closes?|slams?|waves?|cries|dances?|spins?|falls?|走|跑|跳|坐下|站起|喝|吃|打开|合上|拍|挥手|哭|跳舞|转圈|摔倒)\b/gi
    ) || []
  ).length;

  if (issue === "overload" || chainConnectors >= 2 || verbMatches >= 3) {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "FAIL",
      reasonEn: `Detected multi-step action chain (${verbMatches} verbs, ${chainConnectors} sequence connectors). A 4–5s clip can reliably execute only ONE primary action.`,
      reasonZh: `检测到单镜头动作超载（识别到 ${verbMatches} 个动作词、${chainConnectors} 处先后连接词）。4~5秒生成片段应只保留 1 个核心动作并拆分其余分镜。`
    });
  } else if (chainConnectors === 1 || verbMatches === 2) {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "WARN",
      reasonEn: "Prompt contains a two-part action sequence; keep the second movement as a simple facial or accessory reaction.",
      reasonZh: "包含两段连续动作，建议将后半段简化为面部贴图变化或配饰轻微回弹。"
    });
  } else {
    checks.push({
      gate: "Single-Action Clip Budget / 单镜头动作容量",
      status: "PASS",
      reasonEn: "Action density fits cleanly inside a single 4–5s generation clip.",
      reasonZh: "单镜头动作密度合理，适合4~5秒高完成度生成。"
    });
  }

  // 5. Joint rigidity & workflow check
  const hasRigidityLock = /rigid|hinge|stiff|r6|r15|chibi-blocky|刚性|转轴|铰链|僵硬/.test(lower);
  if (issue === "noodle-limbs" || issue === "foot-sliding" || issue === "outfit-drift") {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "FAIL",
      reasonEn: ISSUE_PATCHES[issue].fixEn,
      reasonZh: ISSUE_PATCHES[issue].fixZh
    });
  } else if (mode === "t2v" || !hasRigidityLock) {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "WARN",
      reasonEn:
        mode === "t2v"
          ? "Using raw T2V risks cross-shot outfit drift and rubbery limbs; prefer First-Frame I2V with `rigid mechanical hinge joints`."
          : "Add `rigid mechanical hinge joints, stiff rectangular limbs` so arms do not bend like rubber noodles.",
      reasonZh:
        mode === "t2v"
          ? "当前为纯文生视频(T2V)，多镜头易换装变脸；建议改用首帧I2V并声明「刚性机械转轴关节」。"
          : "建议补充「刚性机械转轴关节 (rigid mechanical hinge joints)」，防止手臂像面条一样弯曲。"
    });
  } else {
    checks.push({
      gate: "Rigid Physics & I2V Anchor / 刚体关节与首帧锚定",
      status: "PASS",
      reasonEn: "Rigid hinge physics and I2V workflow locked.",
      reasonZh: "已锁定刚体铰链关节与首帧I2V路径。"
    });
  }

  const overallStatus = checks.some((c) => c.status === "FAIL")
    ? "FAIL"
    : checks.some((c) => c.status === "WARN")
    ? "WARN"
    : "PASS";

  // Build rescued prompt rewrite
  const cleanedSubject = prompt
    ? prompt
        .replace(/\b(then|and then|after that)\b.*$/i, "")
        .replace(/(接着|然后|随后|紧接着).*$/, "")
        .trim()
    : "A Roblox-style blocky avatar performs one crisp physical action";

  const enginePrefixEn =
    engine === "hailuo" ? "[Push in] " : `[${engine.toUpperCase()} I2V · 9:16] `;
  const rescuedPromptEn = `${enginePrefixEn}An authentic Roblox R6/Blocky figure built on canonical stud proportions (1:1 barrel-beveled cylindrical head, flat 2D screen-printed Roblox decal face, 2x2x1 SmoothPlastic rectangular torso, two 1x2x1 rectangular leg blocks sitting flush side-by-side matching torso width, and two 1x2x1 solid rectangular arm blocks with fingerless and clawless flat beveled block hands). Single action: ${cleanedSubject}. Rigid Motor6D mechanical hinge joints at shoulders and hips, classic Roblox studded baseplate, zero human fingers, zero Lego C-claws or top studs, non-voxel.`;

  const rescuedPromptZh = `【${engine.toUpperCase()} 首帧I2V · 9:16竖屏】纯正Roblox Studio SmoothPlastic材质的方块小人（1:1上下大圆角桶状圆柱头、纯平2D丝网印刷五官贴图、2x2x1宽扁长方体躯干、两条并拢齐平与躯干同宽的1x2x1方柱腿、两条紧贴两侧的1x2x1实心平头倒角方柱手臂，Motor6D刚性转轴关节）。单一核心动作：${cleanedSubject}。配合经典Roblox方格Studs底板，严禁出现人类五指、乐高C型钩爪、乐高头顶圆颗粒或3D真人鼻子。`;

  const negativePrompt =
    "human fingers, five-fingered hand, Lego C-shaped claw hands, Lego hook hands, Lego top head studs, Minecraft sharp voxel cube head, separated thin legs with thigh gap, protruding human sneakers, realistic human face, 3D protruding nose, skin pores, rubbery noodle limbs, foot sliding, morphing clothes, watermark / 人类五指，真实人脸，乐高C型夹爪手，乐高头顶圆颗粒，我的世界直角像素块，双腿分叉穿真人运动鞋，3D高鼻梁，面条状弯曲手臂，脚底打滑";

  return {
    overallStatus,
    engine,
    mode,
    issue: issue || null,
    originalPrompt: prompt,
    checks,
    rescuedPromptEn,
    rescuedPromptZh,
    negativePrompt
  };
}

export function formatDriftCheckMarkdown(report, lang = "zh-en") {
  const lines = [];
  lines.push(`# Prompt Drift & Rescue Report / 提示词防串味体检报告: \`${report.overallStatus}\``);
  lines.push("");
  lines.push(`- **Engine & Mode / 模型与路径**: \`${report.engine}\` · \`${report.mode.toUpperCase()}\``);
  if (report.issue) {
    lines.push(`- **Targeted Issue / 指定救场项**: \`${report.issue}\` (${ISSUE_PATCHES[report.issue].titleZh})`);
  }
  if (report.originalPrompt) {
    lines.push(`- **Input Prompt / 原始提示词**: \`${report.originalPrompt}\``);
  }
  lines.push("");
  lines.push("| Gate / 检查项 | Status | Diagnosis & Fix / 诊断与修复建议 |");
  lines.push("| --- | :---: | --- |");
  for (const c of report.checks) {
    const diag = lang === "en" ? c.reasonEn : lang === "zh" ? c.reasonZh : `${c.reasonZh} (${c.reasonEn})`;
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

  if (lang !== "en") {
    lines.push("## 救场重写提示词 (中文 · 已锁定几何防串味与单镜头单动作)");
    lines.push("");
    lines.push("```text");
    lines.push(report.rescuedPromptZh);
    lines.push("```");
    lines.push("");
  }

  lines.push("## Required Negative Prompt / 必配负向防漂移词");
  lines.push("");
  lines.push("```text");
  lines.push(report.negativePrompt);
  lines.push("```");

  return lines.join("\n");
}

const isMain = process.argv[1] && process.argv[1].endsWith("drift_check.mjs");
if (isMain) {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || (!opts.prompt && !opts.issue)) {
    printHelp();
    process.exit(opts.help ? 0 : 1);
  }
  const report = inspectPrompt(opts);
  if (opts.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(formatDriftCheckMarkdown(report, opts.lang));
  }
}
