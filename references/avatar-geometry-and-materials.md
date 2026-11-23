# Avatar Geometry and Materials / 角色几何与材质规范

Short-form Roblox-style videos succeed when the character looks like a tangible, well-lit 3D collectible figure with consistent blocky geometry. When a prompt only says "Roblox character," image and video models blend human anatomy, Lego bricks, and Minecraft blocks. Use the exact geometric and material tokens below to lock the aesthetic.

## 1. Three Core Rig Proportions / 三种核心骨架比例

| Rig ID | Proportions | Joint Behavior | Best Short-Video Use Case |
| --- | --- | --- | --- |
| `chibi-blocky` | 2.2 to 2.5 heads tall, slightly rounded trapezoidal torso, stubby rectangular limbs, 3mm bevel radius | Stiff shoulder/hip hinge with subtle bouncy head bob | Xiaohongshu / Douyin viral blind-box skits, cozy miniature life, relatable student/worker meltdowns |
| `r6` | Classic 6-part rig: cylindrical head, flat rectangular torso, 2 rigid arm blocks, 2 rigid leg blocks | Strict mechanical hinge rotation at shoulders and hips only; zero elbow or knee bend | Retro obby parkour, deadpan slapstick memes, ragdoll comedy, nostalgic Roblox humor |
| `r15` | 15-part segmented blocky rig with upper/lower arm and leg blocks | Hinged elbow, knee, and waist bends while keeping rectangular limb cross-sections | Outfit transition reels, dance sync, fast-paced duo action skits |

## 2. Anatomy Lock Tokens / 核心部位防变形锁

### Head and Face Decal / 头部与2D面部贴图

- **Positive tokens (English)**: `smooth cylindrical head with rounded top bevel, flat 2D screen-printed decal face, glossy black ink eyes, simple painted mouth line, zero 3D facial protrusion, no nose`
- **正向词 (中文)**: `顶部圆角倒角的圆柱体平滑头部，纯平2D丝网印刷贴图五官，高光墨点眼睛，简约绘制嘴型，无3D突起鼻子，无真实皮肤纹理`
- **Expression swaps (单镜头表情词)**:
  - `shocked decal`: wide hollow ring eyes, open rectangular gasp mouth, painted sweat drop on temple.
  - `deadpan decal`: flat horizontal line eyes (`-_-`), tiny straight mouth line, zero emotion.
  - `crying decal`: streaming 2D blue waterfall tear strips painted on cheeks, wavy wailing mouth.
  - `smug decal`: asymmetrical raised brow line, sideways cat-like grin (`:3` or smirk).
  - `sparkle decal`: oversized star-shaped white eye highlights, cheerful curved smile.

### Hands and Limbs / 手部与四肢锁定

- **Positive tokens (English)**: `fingerless C-shaped claw hands, solid chamfered rectangular block arms, no human fingers, no thumbs, clean mechanical seam at shoulder socket`
- **正向词 (中文)**: `无手指C型夹爪手部（或一体式倒角方柱手），严禁出现人类五指，肩部机械转轴接缝清晰`

## 3. Four Surface Shaders / 四种高赞表面材质

| Shader ID | Visual Texture | Lighting Pairing | Prompt Tokens |
| --- | --- | --- | --- |
| `glossy-vinyl` | Blind-box collectible PVC/vinyl with crisp specular highlight and subtle subsurface scatter | Softbox key light + warm rim light + pastel GI bounce | `glossy blind-box vinyl toy material, smooth studless PVC surface, soft subsurface scattering, Octane render studio lighting` |
| `matte-abs` | Satin-matte injection-molded ABS plastic with 2mm chamfered edges | Clean three-point studio lighting, soft ambient occlusion in seams | `satin matte ABS plastic blocks, 2mm chamfered edges, studless smooth surfaces, clean ambient occlusion` |
| `clay-soft` | Soft-touch matte elastomer / polymer clay finish over rigid blocky geometry | Warm miniature tabletop lamp + shallow depth of field (`f/2.8` macro feel) | `soft-touch matte clay-plastic shader, warm miniature diorama lighting, tilt-shift shallow depth of field, tactile bevels` |
| `neon-cyber` | Glossy dark polycarbonate body with emissive neon trim and cyber visor | High-contrast neon rim lights + wet reflective floor grid | `glossy polycarbonate blocky armor, emissive neon edge strips, cyberpunk studio rim lighting, reflective floor` |

## 4. Curated Color Palettes / 爆款配色方案

| Palette Name | Head / Base | Primary Outfit | Secondary / Pants | Accent / Props |
| --- | --- | --- | --- | --- |
| **Classic Noob (经典新手)** | `#FACC15` (Warm Yellow) | `#2563EB` (Royal Blue) | `#65A30D` (Leaf Green) | `#F43F5E` (Cola Red) |
| **Cream Peach Blind-Box (奶油蜜桃)** | `#FEF3C7` (Warm Cream) | `#FDA4AF` (Pastel Rose) | `#F8FAFC` (Milk White) | `#38BDF8` (Sky Ribbon) |
| **Matcha Latte Desk (抹茶打工人)** | `#FEF9C3` (Soft Ivory) | `#86EFAC` (Matcha Green) | `#475569` (Slate Gray) | `#F59E0B` (Amber Coffee) |
| **Y2K Streetwear (千禧潮酷)** | `#FDE68A` (Light Gold) | `#1E293B` (Charcoal Puffer) | `#93C5FD` (Washed Denim) | `#A855F7` (Electric Purple) |

## 5. UGC Accessory Anchor Rules / 配饰防丢失法则

Video models drop small complex accessories across shots. Follow three rules:

1. Cap accessories at **two or three large-silhouette items** per character (for example: oversized cream headphones + fluffy cat-ear beanie + boxy mini backpack).
2. Describe accessories by **geometric primitive + material** (`thick rounded-rectangle matte white headphones` works better than `AirPods Max`).
3. Keep all accessories attached in the **3-View Turnaround Sheet** before generating individual shot keyframes.
