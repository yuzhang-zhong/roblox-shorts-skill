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

$fTitle = New-Object System.Drawing.Font("Microsoft YaHei UI", 19, [System.Drawing.FontStyle]::Bold)
$fSub = New-Object System.Drawing.Font("Microsoft YaHei UI", 10.5, [System.Drawing.FontStyle]::Regular)
$fCardTitle = New-Object System.Drawing.Font("Microsoft YaHei UI", 12.5, [System.Drawing.FontStyle]::Bold)
$fBody = New-Object System.Drawing.Font("Microsoft YaHei UI", 9.5, [System.Drawing.FontStyle]::Regular)
$fMono = New-Object System.Drawing.Font("Consolas", 10, [System.Drawing.FontStyle]::Bold)
$fCaption = New-Object System.Drawing.Font("Microsoft YaHei UI", 13, [System.Drawing.FontStyle]::Bold)

$bWhite = New-Object System.Drawing.SolidBrush((New-Color 248 250 252))
$bMuted = New-Object System.Drawing.SolidBrush((New-Color 148 163 184))
$bCard = New-Object System.Drawing.SolidBrush((New-Color 20 30 50))
$bOverlay = New-Object System.Drawing.SolidBrush((New-Color 15 23 42 218))
$bGold = New-Object System.Drawing.SolidBrush((New-Color 253 224 71))
$bCyan = New-Object System.Drawing.SolidBrush((New-Color 56 189 248))
$bRed = New-Object System.Drawing.SolidBrush((New-Color 244 63 94))
$pBorder = New-Object System.Drawing.Pen((New-Color 56 189 248 135), 2)

# 1. Turnaround Sheet
$tInfo = $manifest.turnaround
$bmp = New-Object System.Drawing.Bitmap(1400, 760)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear((New-Color 11 17 32))

$g.DrawString($tInfo.title, $fTitle, $bWhite, 36, 24)
$g.DrawString($tInfo.subtitle, $fSub, $bMuted, 38, 62)

for ($i = 0; $i -lt 3; $i++) {
  $v = $tInfo.views[$i]
  $vx = 36 + $i * 448
  $vy = 104
  Fill-RoundedRect $g $bCard $vx $vy 428 548 16
  Draw-RoundedRect $g $pBorder $vx $vy 428 548 16

  $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $v.file))
  $g.DrawImage($img, $vx + 4, $vy + 4, 420, 480)
  $img.Dispose()

  Fill-RoundedRect $g $bOverlay ($vx + 16) ($vy + 16) 310 34 8
  $g.DrawString($v.label, $fMono, $bCyan, ($vx + 26), ($vy + 24))
  $g.DrawString($v.note, $fBody, $bWhite, ($vx + 16), ($vy + 502))
}

for ($s = 0; $s -lt $tInfo.swatches.Count; $s++) {
  $sw = $tInfo.swatches[$s]
  $sx = 36 + $s * 268
  $sy = 674
  Fill-RoundedRect $g $bCard $sx $sy 252 54 12
  $bSw = New-Object System.Drawing.SolidBrush((New-Color $sw.r $sw.g $sw.b))
  Fill-RoundedRect $g $bSw ($sx + 12) ($sy + 11) 32 32 8
  $g.DrawString($sw.label, $fMono, $bWhite, ($sx + 54), ($sy + 18))
  $bSw.Dispose()
}

foreach ($outPath in $tInfo.outPaths) {
  $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
$g.Dispose()
$bmp.Dispose()

# 2. Drift Comparison Sheet
$dInfo = $manifest.drift
$bmp = New-Object System.Drawing.Bitmap(1440, 680)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear((New-Color 11 17 32))

$g.DrawString($dInfo.title, $fTitle, $bWhite, 32, 22)
$g.DrawString($dInfo.subtitle, $fSub, $bMuted, 34, 60)

for ($i = 0; $i -lt 4; $i++) {
  $p = $dInfo.panels[$i]
  $px = 32 + $i * 348
  $py = 100
  $pCol = New-Color $p.r $p.g $p.b
  Fill-RoundedRect $g $bCard $px $py 332 548 16
  $pen = New-Object System.Drawing.Pen($pCol, 2.5)
  Draw-RoundedRect $g $pen $px $py 332 548 16
  $pen.Dispose()

  $img = [System.Drawing.Image]::FromFile((Join-Path $rawDir $p.file))
  $g.DrawImage($img, $px + 6, $py + 6, 320, 420)
  $img.Dispose()

  $bTag = New-Object System.Drawing.SolidBrush($pCol)
  Fill-RoundedRect $g $bTag ($px + 16) ($py + 16) 190 30 8
  $g.DrawString($p.status, $fMono, $bWhite, ($px + 24), ($py + 22))
  $bTag.Dispose()

  $g.DrawString($p.title, $fCardTitle, $bWhite, ($px + 16), ($py + 444))
  $g.DrawString($p.desc, $fBody, $bMuted, (New-Object System.Drawing.RectangleF(($px + 16), ($py + 478), 300, 56)))
}
$bmp.Save($dInfo.outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# 3. Storyboard Contact Sheets + Keyframes + GIF + MP4
$fSmallMono = New-Object System.Drawing.Font("Consolas", 8.5, [System.Drawing.FontStyle]::Bold)
$fSmallCap = New-Object System.Drawing.Font("Microsoft YaHei UI", 10.5, [System.Drawing.FontStyle]::Bold)
$fBubble = New-Object System.Drawing.Font("Segoe UI", 10, [System.Drawing.FontStyle]::Bold)
$fNametag = New-Object System.Drawing.Font("Segoe UI", 8.5, [System.Drawing.FontStyle]::Bold)
$bBubbleFill = New-Object System.Drawing.SolidBrush((New-Color 255 255 255 245))
$bBubbleText = New-Object System.Drawing.SolidBrush((New-Color 15 23 42))
$pBubbleBorder = New-Object System.Drawing.Pen((New-Color 148 163 184 220), 1.5)
$bHpBg = New-Object System.Drawing.SolidBrush((New-Color 15 23 42 180))
$bHpGreen = New-Object System.Drawing.SolidBrush((New-Color 34 197 94))

function Draw-RobloxOverheadUI($g, [float]$cx, [float]$topY, [string]$bubbleText, [string]$displayName, [bool]$isLowHp = $false) {
  if ($bubbleText) {
    $sz = $g.MeasureString($bubbleText, $fBubble)
    $bw = [Math]::Max(76, [Math]::Ceiling($sz.Width) + 22)
    $bh = 28
    $bx = $cx - ($bw / 2)
    $by = $topY

    Fill-RoundedRect $g $bBubbleFill $bx $by $bw $bh 10
    Draw-RoundedRect $g $pBubbleBorder $bx $by $bw $bh 10

    # Classic Roblox chat bubble downward triangle tail
    $pts = @(
      (New-Object System.Drawing.PointF(($cx - 6), ($by + $bh - 1))),
      (New-Object System.Drawing.PointF(($cx + 6), ($by + $bh - 1))),
      (New-Object System.Drawing.PointF($cx, ($by + $bh + 7)))
    )
    $g.FillPolygon($bBubbleFill, $pts)
    $tx = $bx + ($bw - $sz.Width) / 2
    $g.DrawString($bubbleText, $fBubble, $bBubbleText, $tx, ($by + 5))
  }

  if ($displayName) {
    $nsz = $g.MeasureString($displayName, $fNametag)
    $nw = [Math]::Ceiling($nsz.Width) + 14
    $nx = $cx - ($nw / 2)
    $ny = $topY + 37
    Fill-RoundedRect $g $bHpBg $nx $ny $nw 18 5
    $g.DrawString($displayName, $fNametag, $bWhite, ($nx + 7), ($ny + 1))

    # Roblox Overhead Health Bar
    $hpx = $cx - 28
    $hpy = $ny + 20
    $g.FillRectangle($bHpBg, $hpx, $hpy, 56, 5)
    if ($isLowHp) {
      $g.FillRectangle($bRed, ($hpx + 1), ($hpy + 1), 10, 3)
    } else {
      $g.FillRectangle($bHpGreen, ($hpx + 1), ($hpy + 1), 54, 3)
    }
  }
}

foreach ($case in $manifest.cases) {
  $bmp = New-Object System.Drawing.Bitmap(1440, 860)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
  $g.Clear((New-Color 11 17 32))

  $g.DrawString($case.title, $fTitle, $bWhite, 32, 22)
  $g.DrawString($case.subtitle, $fSub, $bMuted, 34, 60)

  for ($s = 0; $s -lt 4; $s++) {
    $sh = $case.shots[$s]
    $sx = 32 + $s * 348
    $sy = 100
    Fill-RoundedRect $g $bCard $sx $sy 332 728 16
    Draw-RoundedRect $g $pBorder $sx $sy 332 728 16

    $rawShotPath = Join-Path $rawDir ($case.prefix + "_shot_" + $s + ".png")
    $img = [System.Drawing.Image]::FromFile($rawShotPath)
    $lowHp = ($sh.chatBubble -eq "oof" -or $sh.chatBubble -eq "oof.")

    if ($sh.savePath) {
      $shotBmp = New-Object System.Drawing.Bitmap(360, 640)
      $sg = [System.Drawing.Graphics]::FromImage($shotBmp)
      $sg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
      $sg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
      $sg.DrawImage($img, 0, 0, 360, 640)
      Fill-RoundedRect $sg $bOverlay 14 14 250 32 8
      $sg.DrawString($sh.badge, $fMono, $bGold, 24, 21)
      Draw-RobloxOverheadUI $sg ($sh.bubbleX * 1.1) ($sh.bubbleY * 1.1) $sh.chatBubble $sh.displayName $lowHp
      Fill-RoundedRect $sg $bOverlay 14 568 332 54 10
      $sg.DrawString($sh.caption, $fCaption, $bWhite, 24, 582)
      $shotBmp.Save($sh.savePath, [System.Drawing.Imaging.ImageFormat]::Png)
      $sg.Dispose()
      $shotBmp.Dispose()
    }

    $g.DrawImage($img, $sx + 6, $sy + 6, 320, 568)
    $img.Dispose()

    Fill-RoundedRect $g $bOverlay ($sx + 16) ($sy + 16) 235 30 8
    $g.DrawString($sh.badge, $fMono, $bGold, ($sx + 24), ($sy + 22))
    Draw-RobloxOverheadUI $g ($sx + $sh.bubbleX) ($sy + $sh.bubbleY) $sh.chatBubble $sh.displayName $lowHp

    Fill-RoundedRect $g $bOverlay ($sx + 16) ($sy + 516) 300 44 8
    $g.DrawString($sh.caption, $fCardTitle, $bWhite, ($sx + 24), ($sy + 527))

    $g.DrawString($sh.role, $fCardTitle, $bWhite, ($sx + 14), ($sy + 586))
    $g.DrawString($sh.camera, $fMono, $bCyan, ($sx + 14), ($sy + 616))
    $g.DrawString($sh.action, $fBody, $bMuted, (New-Object System.Drawing.RectangleF(($sx + 14), ($sy + 644), 304, 72)))
  }

  $bmp.Save($case.sheetPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()

  # Render 24 HUD animation frames
  $hudDir = Join-Path $rootDir ("tmp\hud_" + $case.prefix)
  New-Item -ItemType Directory -Force -Path $hudDir | Out-Null

  for ($f = 0; $f -lt 24; $f++) {
    $sIdx = [Math]::Floor($f / 6)
    $sh = $case.shots[$sIdx]
    $lowHp = ($sh.chatBubble -eq "oof" -or $sh.chatBubble -eq "oof.")
    $fname = $case.prefix + "_anim_" + $f.ToString("00") + ".png"
    $srcImg = [System.Drawing.Image]::FromFile((Join-Path $rawDir $fname))
    $frameBmp = New-Object System.Drawing.Bitmap(270, 480)
    $fg = [System.Drawing.Graphics]::FromImage($frameBmp)
    $fg.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $fg.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    $fg.DrawImage($srcImg, 0, 0, 270, 480)
    $srcImg.Dispose()

    Fill-RoundedRect $fg $bOverlay 10 10 198 26 6
    $fg.FillEllipse($bRed, 18, 18, 8, 8)
    $fg.DrawString($sh.badge, $fSmallMono, $bGold, 30, 16)
    Draw-RobloxOverheadUI $fg ($sh.bubbleX * 0.84) ($sh.bubbleY * 0.84) $sh.chatBubble $sh.displayName $lowHp

    Fill-RoundedRect $fg $bOverlay 10 422 250 44 8
    $fg.DrawString($sh.caption, $fSmallCap, $bWhite, 16, 434)

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
Write-Output "All visual boards, keyframes, GIFs, and MP4s generated!"
