param(
  [string]$ManifestPath
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$jsonText = [System.IO.File]::ReadAllText($ManifestPath, [System.Text.Encoding]::UTF8)
$manifest = $jsonText | ConvertFrom-Json
$rawDir = $manifest.rawDir
$rootDir = $manifest.rootDir

function New-Color([int]$r, [int]$g, [int]$b, [int]$a = 255) {
  return [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
}

function Add-RoundedRectPath($path, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
}

function Fill-RoundedRect($g, $brush, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-RoundedRectPath $p $x $y $w $h $r
  $g.FillPath($brush, $p)
  $p.Dispose()
}

function Draw-RoundedRect($g, $pen, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $p = New-Object System.Drawing.Drawing2D.GraphicsPath
  Add-RoundedRectPath $p $x $y $w $h $r
  $g.DrawPath($pen, $p)
  $p.Dispose()
}

$fLabelZh = New-Object System.Drawing.Font("Microsoft YaHei UI", 12, [System.Drawing.FontStyle]::Bold)
$fLabelEn = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
$fBubbleZh = New-Object System.Drawing.Font("Microsoft YaHei UI", 10, [System.Drawing.FontStyle]::Bold)
$fBubbleEn = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)

$bBg = New-Object System.Drawing.SolidBrush((New-Color 244 246 250))
$bCard = New-Object System.Drawing.SolidBrush((New-Color 255 255 255))
$bDarkText = New-Object System.Drawing.SolidBrush((New-Color 30 41 59))
$bWhite = New-Object System.Drawing.SolidBrush((New-Color 255 255 255))
$pCardBorder = New-Object System.Drawing.Pen((New-Color 226 232 240), 1.5)
$bBubbleFill = New-Object System.Drawing.SolidBrush((New-Color 255 255 255 248))
$pBubbleBorder = New-Object System.Drawing.Pen((New-Color 203 213 225), 1.5)

function Draw-CleanChatBubble($g, [float]$cx, [float]$topY, [string]$text, $font) {
  if (-not $text) { return }
  $sz = $g.MeasureString($text, $font)
  $bw = [Math]::Max(68, [Math]::Ceiling($sz.Width) + 20)
  $bh = 28
  $bx = $cx - ($bw / 2)
  $by = $topY

  Fill-RoundedRect $g $bBubbleFill $bx $by $bw $bh 10
  Draw-RoundedRect $g $pBubbleBorder $bx $by $bw $bh 10

  $pts = @(
    (New-Object System.Drawing.PointF(($cx - 5), ($by + $bh - 1))),
    (New-Object System.Drawing.PointF(($cx + 5), ($by + $bh - 1))),
    (New-Object System.Drawing.PointF($cx, ($by + $bh + 6)))
  )
  $g.FillPolygon($bBubbleFill, $pts)
  $tx = $bx + ($bw - $sz.Width) / 2
  $g.DrawString($text, $font, $bDarkText, $tx, ($by + 4))
}

# 1. Clean 3-View Turnaround Sheet (.zh.png and .en.png)
$tInfo = $manifest.turnaround
if (Test-Path (Join-Path $rawDir $tInfo.views[0].file)) {
foreach ($lang in @("zh", "en")) {
  $bmp = New-Object System.Drawing.Bitmap(1344, 596)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.FillRectangle($bBg, 0, 0, 1344, 596)

  $font = if ($lang -eq "zh") { $fLabelZh } else { $fLabelEn }
  for ($i = 0; $i -lt 3; $i++) {
    $v = $tInfo.views[$i]
    $vx = 24 + $i * 436
    $vy = 20
    Fill-RoundedRect $g $bCard $vx $vy 424 556 14
    Draw-RoundedRect $g $pCardBorder $vx $vy 424 556 14

    $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $v.file))
    $g.DrawImage($img, ($vx + 6), ($vy + 6), 412, 502)
    $img.Dispose()

    $label = if ($lang -eq "zh") { $v.labelZh } else { $v.labelEn }
    $lsz = $g.MeasureString($label, $font)
    $g.DrawString($label, $font, $bDarkText, ($vx + (424 - $lsz.Width) / 2), ($vy + 518))
  }

  $outFile = if ($lang -eq "zh") { $tInfo.outZh } else { $tInfo.outEn }
  $bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
  if ($lang -eq "en") {
    foreach ($defPath in $tInfo.outDefault) {
      $bmp.Save($defPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
  }
  $g.Dispose()
  $bmp.Dispose()
}
}

# 2. Clean 4-Way Anti-Drift Comparison (.zh.png and .en.png)
$dInfo = $manifest.drift
if (Test-Path (Join-Path $rawDir $dInfo.panels[0].file)) {
foreach ($lang in @("zh", "en")) {
  $bmp = New-Object System.Drawing.Bitmap(1384, 500)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.FillRectangle($bBg, 0, 0, 1384, 500)

  $font = if ($lang -eq "zh") { $fLabelZh } else { $fLabelEn }
  for ($i = 0; $i -lt 4; $i++) {
    $p = $dInfo.panels[$i]
    $px = 20 + $i * 340
    $py = 18
    Fill-RoundedRect $g $bCard $px $py 324 464 14
    $pCol = New-Color $p.r $p.g $p.b
    $pen = New-Object System.Drawing.Pen($pCol, 2)
    Draw-RoundedRect $g $pen $px $py 324 464 14
    $pen.Dispose()

    $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $p.file))
    $g.DrawImage($img, ($px + 6), ($py + 6), 312, 408)
    $img.Dispose()

    $label = if ($lang -eq "zh") { $p.labelZh } else { $p.labelEn }
    $bBadge = New-Object System.Drawing.SolidBrush($pCol)
    Fill-RoundedRect $g $bBadge ($px + 14) ($py + 422) 296 32 8
    $lsz = $g.MeasureString($label, $font)
    $g.DrawString($label, $font, $bWhite, ($px + 14 + (296 - $lsz.Width) / 2), ($py + 427))
    $bBadge.Dispose()
  }

  $outFile = if ($lang -eq "zh") { $dInfo.outZh } else { $dInfo.outEn }
  $bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
  if ($lang -eq "en") {
    $bmp.Save($dInfo.outDefault, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  $g.Dispose()
  $bmp.Dispose()
}
}

# 2b. Classic Roblox Avatars Lineup (3x2 grid) & Classic Roblox Face Decal Atlas (4x2 grid)
if ($manifest.classicAssetSheet -and (Test-Path (Join-Path $rawDir "avatar_theo.png")) -and (Test-Path (Join-Path $rawDir "face_dizzy.png"))) {
  $cInfo = $manifest.classicAssetSheet
  $libAvDir = Join-Path $rootDir "assets\library\avatars"
  $libFaceDir = Join-Path $rootDir "assets\library\faces"
  New-Item -ItemType Directory -Force -Path $libAvDir, $libFaceDir | Out-Null

  foreach ($av in $cInfo.avatars) {
    $src = Join-Path $rawDir $av.file
    if (Test-Path $src) { Copy-Item $src (Join-Path $libAvDir $av.file) -Force }
  }
  foreach ($fc in $cInfo.faces) {
    $src = Join-Path $rawDir $fc.file
    if (Test-Path $src) { Copy-Item $src (Join-Path $libFaceDir $fc.file) -Force }
  }

  foreach ($lang in @("zh", "en")) {
    $font = if ($lang -eq "zh") { $fLabelZh } else { $fLabelEn }

    # Avatars 3x2 sheet (1384 x 836)
    $bmpA = New-Object System.Drawing.Bitmap(1384, 836)
    $gA = [System.Drawing.Graphics]::FromImage($bmpA)
    $gA.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $gA.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $gA.FillRectangle($bBg, 0, 0, 1384, 836)

    for ($i = 0; $i -lt $cInfo.avatars.Count; $i++) {
      $av = $cInfo.avatars[$i]
      $col = $i % 3
      $row = [Math]::Floor($i / 3)
      $ax = 24 + $col * 452
      $ay = 18 + $row * 404
      Fill-RoundedRect $gA $bCard $ax $ay 432 388 14
      Draw-RoundedRect $gA $pCardBorder $ax $ay 432 388 14

      $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $av.file))
      $gA.DrawImage($img, ($ax + 86), ($ay + 8), 260, 332)
      $img.Dispose()

      $label = if ($lang -eq "zh") { $av.labelZh } else { $av.labelEn }
      $lsz = $gA.MeasureString($label, $font)
      $gA.DrawString($label, $font, $bDarkText, ($ax + (432 - $lsz.Width) / 2), ($ay + 348))
    }

    $outA = if ($lang -eq "zh") { $cInfo.avatarsOutZh } else { $cInfo.avatarsOutEn }
    $bmpA.Save($outA, [System.Drawing.Imaging.ImageFormat]::Png)
    if ($lang -eq "en") { $bmpA.Save($cInfo.avatarsOutDefault, [System.Drawing.Imaging.ImageFormat]::Png) }
    $gA.Dispose()
    $bmpA.Dispose()

    # Faces 4x2 sheet (1384 x 564)
    $bmpF = New-Object System.Drawing.Bitmap(1384, 564)
    $gF = [System.Drawing.Graphics]::FromImage($bmpF)
    $gF.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $gF.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $gF.FillRectangle($bBg, 0, 0, 1384, 564)

    for ($i = 0; $i -lt $cInfo.faces.Count; $i++) {
      $fc = $cInfo.faces[$i]
      $col = $i % 4
      $row = [Math]::Floor($i / 4)
      $fx = 20 + $col * 340
      $fy = 16 + $row * 268
      Fill-RoundedRect $gF $bCard $fx $fy 324 252 14
      Draw-RoundedRect $gF $pCardBorder $fx $fy 324 252 14

      $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $fc.file))
      $gF.DrawImage($img, ($fx + 62), ($fy + 8), 200, 200)
      $img.Dispose()

      $label = if ($lang -eq "zh") { $fc.labelZh } else { $fc.labelEn }
      $lsz = $gF.MeasureString($label, $font)
      $gF.DrawString($label, $font, $bDarkText, ($fx + (324 - $lsz.Width) / 2), ($fy + 214))
    }

    $outF = if ($lang -eq "zh") { $cInfo.facesOutZh } else { $cInfo.facesOutEn }
    $bmpF.Save($outF, [System.Drawing.Imaging.ImageFormat]::Png)
    if ($lang -eq "en") { $bmpF.Save($cInfo.facesOutDefault, [System.Drawing.Imaging.ImageFormat]::Png) }
    $gF.Dispose()
    $bmpF.Dispose()
  }
}

# 3. Clean 4-Shot 9:16 Storyboard Contact Sheets (.zh.png and .en.png) + Keyframes + GIF + MP4
foreach ($case in $manifest.cases) {
  if (-not (Test-Path (Join-Path $rawDir ($case.prefix + "_shot_3.png")))) { continue }
  foreach ($lang in @("zh", "en")) {
    $bmp = New-Object System.Drawing.Bitmap(1384, 648)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $g.FillRectangle($bBg, 0, 0, 1384, 648)

    $fontLabel = if ($lang -eq "zh") { $fLabelZh } else { $fLabelEn }
    $fontBub = if ($lang -eq "zh") { $fBubbleZh } else { $fBubbleEn }

    for ($s = 0; $s -lt 4; $s++) {
      $sh = $case.shots[$s]
      $sx = 20 + $s * 340
      $sy = 18
      Fill-RoundedRect $g $bCard $sx $sy 324 612 14
      Draw-RoundedRect $g $pCardBorder $sx $sy 324 612 14

      $rawShotPath = Join-Path $rawDir ($case.prefix + "_shot_" + $s + ".png")
      $img = [System.Drawing.Image]::FromFile($rawShotPath)
      $chatText = if ($lang -eq "zh") { $sh.chatZh } else { $sh.chatEn }

      if ($lang -eq "zh" -and $sh.savePath) {
        $shotBmp = New-Object System.Drawing.Bitmap(360, 640)
        $sg = [System.Drawing.Graphics]::FromImage($shotBmp)
        $sg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $sg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
        $sg.DrawImage($img, 0, 0, 360, 640)
        Draw-CleanChatBubble $sg ($sh.bubbleX * 1.1) ($sh.bubbleY * 1.1) $chatText $fontBub
        $shotBmp.Save($sh.savePath, [System.Drawing.Imaging.ImageFormat]::Png)
        $sg.Dispose()
        $shotBmp.Dispose()
      }

      $g.DrawImage($img, ($sx + 6), ($sy + 6), 312, 554)
      $img.Dispose()

      Draw-CleanChatBubble $g ($sx + $sh.bubbleX) ($sy + $sh.bubbleY) $chatText $fontBub

      $label = if ($lang -eq "zh") { $sh.labelZh } else { $sh.labelEn }
      $lsz = $g.MeasureString($label, $fontLabel)
      $g.DrawString($label, $fontLabel, $bDarkText, ($sx + (324 - $lsz.Width) / 2), ($sy + 570))
    }

    $outSheet = if ($lang -eq "zh") { $case.sheetZh } else { $case.sheetEn }
    $bmp.Save($outSheet, [System.Drawing.Imaging.ImageFormat]::Png)
    if ($lang -eq "en") {
      $bmp.Save($case.sheetDefault, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $g.Dispose()
    $bmp.Dispose()
  }

  # Render clean 24-frame animation (no dark top/bottom HUD clutter, only clean Roblox speech bubble)
  $hudDir = Join-Path $rootDir ("tmp\hud_" + $case.prefix)
  New-Item -ItemType Directory -Force -Path $hudDir | Out-Null

  for ($f = 0; $f -lt 24; $f++) {
    $sIdx = [Math]::Floor($f / 6)
    $sh = $case.shots[$sIdx]
    $fname = $case.prefix + "_anim_" + $f.ToString("00") + ".png"
    $srcImg = [System.Drawing.Image]::FromFile((Join-Path $rawDir $fname))
    $frameBmp = New-Object System.Drawing.Bitmap(270, 480)
    $fg = [System.Drawing.Graphics]::FromImage($frameBmp)
    $fg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $fg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $fg.DrawImage($srcImg, 0, 0, 270, 480)
    $srcImg.Dispose()

    Draw-CleanChatBubble $fg ($sh.bubbleX * 0.84) ($sh.bubbleY * 0.84) $sh.chatEn $fBubbleEn

    $outFrame = Join-Path $hudDir ("frame_" + $f.ToString("00") + ".png")
    $frameBmp.Save($outFrame, [System.Drawing.Imaging.ImageFormat]::Png)
    $fg.Dispose()
    $frameBmp.Dispose()
  }

  $inPattern = Join-Path $hudDir "frame_%02d.png"
  $palPath = Join-Path $hudDir "palette.png"
  & ffmpeg -y -loglevel error -framerate 6 -i $inPattern -vf "palettegen=max_colors=128" $palPath
  & ffmpeg -y -loglevel error -framerate 6 -i $inPattern -i $palPath -lavfi "paletteuse=dither=bayer" $case.gifPath
  & ffmpeg -y -loglevel error -framerate 6 -i $inPattern -f lavfi -i "sine=frequency=520:beep_factor=4:duration=4" -c:v libx264 -pix_fmt yuv420p -vf "fps=24" -c:a aac -b:a 96k -shortest $case.mp4Path
}
Write-Output "All bilingual .zh.png / .en.png boards, keyframes, GIFs, and MP4s generated!"
