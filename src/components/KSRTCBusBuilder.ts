import * as THREE from 'three';

// =============================================================================
// 🚌 KERALA TOURIST BUS: "VARAAHI" (വാരാഹി • KL 47 M 5100)
// Faithfully recreated after the user's reference photographs:
// - Front (Image 1): Modern aerodynamic white coach fascia with raked panoramic
//   windshield, dual horizontal wipers, "LUXURY" vertical badge, hood air intake
//   slot, swept LED projector headlights with glowing DRL eyebrows, center emblem,
//   twin auxiliary circular driving lamps on black brackets, high-mount white
//   "elephant ear" mirrors with orange reflectors, and plate KL 47 M 5100.
// - Two Sides (Image 2): Pure white coach body, continuous tinted panoramic
//   window band with double-deck sliding panes, front passenger entry door with
//   vision glass, underfloor luggage bays with horizontal slotted cooling louvers,
//   amber clearance markers, square inspection steps, and multi-spoke chrome alloy wheels.
// - Back (Image 3): White rear with tinted glass, glowing neon-green Malayalam
//   calligraphy "വാരാഹി", high-mount third brake light, black steel roof access
//   ladder on left, intricate mythical tribal face graphic with glowing red eyes,
//   vertical triple LED tail clusters, coachbuilder badge, and plate KL 47 M 5100.
// =============================================================================

function createVarahiFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Crisp Pure White Base Background (Matches Image 1)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 1024);

  // Upper Roof Cowl & Air Scoop
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(380, 20, 264, 40, [12, 12, 6, 6]);
  ctx.fill();

  // Top Amber Clearance Indicator Lights
  [260, 720].forEach((lx) => {
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(lx, 36, 75, 14, 7);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Small roof marker rivets
  ctx.fillStyle = '#cbd5e1';
  [440, 512, 584].forEach((rx) => {
    ctx.fillRect(rx, 48, 12, 6);
  });

  // 2. High Panoramic Raked Windshield (Image 1)
  const glassGrad = ctx.createLinearGradient(0, 70, 0, 520);
  glassGrad.addColorStop(0, '#090d14');
  glassGrad.addColorStop(0.35, '#0f172a');
  glassGrad.addColorStop(0.75, '#1e293b');
  glassGrad.addColorStop(1, '#090d14');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.roundRect(50, 70, 924, 445, [28, 28, 10, 10]);
  ctx.fill();

  // Dark windshield perimeter gasket
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 12;
  ctx.stroke();

  // Windshield top dark sun-visor band
  ctx.fillStyle = 'rgba(2, 6, 23, 0.7)';
  ctx.fillRect(56, 76, 912, 75);

  // Vertical "LUXURY" Badge on Lower Passenger Windshield (Image 1)
  ctx.save();
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(660, 390, 8, 110);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.letterSpacing = '4px';
  ctx.translate(650, 490);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('LUXURY', 0, 0);
  ctx.restore();

  // Dual Articulated Windshield Wipers resting horizontally across bottom (Image 1)
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 9;
  ctx.beginPath();
  // Left wiper arm & long horizontal blade
  ctx.moveTo(270, 510);
  ctx.lineTo(340, 445);
  ctx.lineTo(540, 435);
  ctx.moveTo(330, 445);
  ctx.lineTo(600, 435);
  // Right wiper arm & blade
  ctx.moveTo(690, 510);
  ctx.lineTo(600, 475);
  ctx.lineTo(410, 475);
  ctx.moveTo(590, 475);
  ctx.lineTo(360, 475);
  ctx.stroke();

  // Wiper motor pivot hubs
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(270, 510, 12, 0, Math.PI * 2);
  ctx.arc(690, 510, 12, 0, Math.PI * 2);
  ctx.fill();

  // 3. Bonnet Recessed Air Intake Slot (Image 1)
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.roundRect(140, 520, 744, 180, [16, 16, 24, 24]);
  ctx.fill();

  // Sculpted dark horizontal air slot with center divider
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(240, 545, 544, 46, [14, 14, 14, 14]);
  ctx.fill();

  // Center vertical white divider bridge
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(504, 545, 16, 46);

  // 4. Swept LED Projector Headlights with DRL Eyebrow Wings (Image 1)
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const hx = isLeft ? 190 : 834;
    const hy = 660;

    // Dark swept headlamp housing
    ctx.save();
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(hx - 60, hy);
      ctx.lineTo(hx + 140, hy + 25);
      ctx.lineTo(hx + 120, hy + 75);
      ctx.lineTo(hx - 80, hy + 50);
    } else {
      ctx.moveTo(hx + 60, hy);
      ctx.lineTo(hx - 140, hy + 25);
      ctx.lineTo(hx - 120, hy + 75);
      ctx.lineTo(hx + 80, hy + 50);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Glowing White DRL Eyebrow Arc (Image 1)
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 6;
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(hx - 50, hy + 8);
      ctx.quadraticCurveTo(hx + 30, hy + 12, hx + 130, hy + 28);
    } else {
      ctx.moveTo(hx + 50, hy + 8);
      ctx.quadraticCurveTo(hx - 30, hy + 12, hx - 130, hy + 28);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Triple Round Projector LED Beam Lenses inside headlamp
    const pSteps = isLeft ? [-25, 25, 75] : [25, -25, -75];
    pSteps.forEach((ox) => {
      ctx.beginPath();
      ctx.arc(hx + ox, hy + 46, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hx + ox, hy + 46, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();
  });

  // Center Chrome Grille Bar & Circular Emblem (Image 1)
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(360, 680, 304, 8);

  ctx.beginPath();
  ctx.arc(512, 684, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(512, 684, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.fill();

  // 5. Lower Grille & Auxiliary Round Driving Fog Lamps (Image 1)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(300, 715, 424, 75, [10, 10, 10, 10]);
  ctx.fill();

  // Horizontal grille slats
  ctx.fillStyle = '#334155';
  [730, 750, 770].forEach((gy) => {
    ctx.fillRect(310, gy, 404, 6);
  });

  // Twin Auxiliary Round Driving Lamps mounted on black brackets (Image 1)
  [380, 644].forEach((fx) => {
    // Mounting bracket bar
    ctx.fillStyle = '#020617';
    ctx.fillRect(fx - 4, 705, 8, 85);

    // Round driving lamp bezel
    ctx.beginPath();
    ctx.arc(fx, 745, 24, 0, Math.PI * 2);
    ctx.fillStyle = '#020617';
    ctx.fill();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Glowing white projector lens
    ctx.beginPath();
    ctx.arc(fx, 745, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#93c5fd';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // 6. Registration Plate: KL 47 M 5100 (Image 1 & Image 3)
  const plateX = 377;
  const plateY = 825;
  const plateW = 270;
  const plateH = 70;

  ctx.fillStyle = '#f59e0b'; // Commercial Yellow Plate
  ctx.fillRect(plateX, plateY, plateW, plateH);
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 4;
  ctx.strokeRect(plateX, plateY, plateW, plateH);

  // Blue IND Strip
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(plateX, plateY, 28, plateH);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IND', plateX + 14, plateY + 40);

  // Black Plate Number
  ctx.fillStyle = '#000000';
  ctx.font = '900 32px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KL 47 M 5100', plateX + 150, plateY + 46);

  // 7. Sculpted Lower Bumper & Corner Fog Lights (Image 1)
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const bx = isLeft ? 190 : 834;
    const by = 835;

    // Corner fog light pod
    ctx.beginPath();
    ctx.arc(bx, by, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(bx, by, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Aerodynamic chin vents
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(bx + (isLeft ? 30 : -50), by + 30, 32, 10);
  });

  // Lower aerodynamic black chin lip
  ctx.fillStyle = '#090d16';
  ctx.fillRect(60, 940, 904, 25);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createVarahiSideTexture(isDriverSide: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Pristine Pure White Coach Finish (Matches Image 2)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 2048, 512);

  // Pure white roof header
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 2048, 80);

  // Coach Badge Logo near front roof corner (Image 2)
  const badgeX = isDriverSide ? 220 : 1780;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(badgeX, 30, 48, 40);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.strokeRect(badgeX, 30, 48, 40);
  ctx.fillStyle = '#facc15';
  ctx.font = '900 16px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SG', badgeX + 24, 56);

  // 2. Continuous Panoramic Dark Tinted Window Band (Image 2)
  const winY = 80;
  const winH = 150;
  const winStartX = 80;
  const winW = 1888;

  const winGrad = ctx.createLinearGradient(0, winY, 0, winY + winH);
  winGrad.addColorStop(0, '#090d14');
  winGrad.addColorStop(0.5, '#1e293b');
  winGrad.addColorStop(1, '#090d14');
  ctx.fillStyle = winGrad;
  ctx.fillRect(winStartX, winY, winW, winH);

  // Black window surround border
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 5;
  ctx.strokeRect(winStartX, winY, winW, winH);

  // Double-Deck Window Transom Divider (Upper hopper panes vs lower panes)
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(winStartX, winY + 45);
  ctx.lineTo(winStartX + winW, winY + 45);
  ctx.stroke();

  // 6 Large Passenger Window Bays divided by black pillars (Image 2)
  const bayStep = winW / 7;
  for (let b = 1; b < 7; b++) {
    const px = winStartX + b * bayStep;
    ctx.fillStyle = '#020617';
    ctx.fillRect(px - 4, winY, 8, winH);
  }

  // Front Passenger Entry Door with Full-Height Vision Glass (Image 2 - Passenger Side)
  if (!isDriverSide) {
    const doorX = 1820;
    const doorW = 160;

    // Door outline
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.strokeRect(doorX, winY, doorW, 350);

    // Door lower passenger stepwell vision glass
    ctx.fillStyle = '#090d14';
    ctx.fillRect(doorX + 20, 240, doorW - 40, 140);
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 3;
    ctx.strokeRect(doorX + 20, 240, doorW - 40, 140);

    // Chrome door handle
    ctx.fillStyle = '#020617';
    ctx.fillRect(doorX + 10, 260, 14, 34);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(doorX + 13, 265, 8, 24);
  }

  // Rear Emergency Exit Door / Window with Red Exit Latch (Image 2)
  const emergX = isDriverSide ? 540 : 1380;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(emergX, 230, 85, 95);

  // Red Emergency Exit badge
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(emergX + 10, 235, 24, 16);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EXIT', emergX + 22, 246);

  // 3. Lower Body Underfloor Luggage Bays with Cooling Air Louvers (Image 2)
  const bayY = 295;
  const bayH = 150;

  // Center Large Luggage Hatch with Dual Slotted Cooling Air Louvers (Image 2)
  const centerBayX = isDriverSide ? 940 : 860;
  const centerBayW = 280;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(centerBayX, bayY, centerBayW, bayH);

  // Two horizontal cooling louver grilles (slotted vents)
  for (let l = 0; l < 2; l++) {
    const ly = bayY + 25 + l * 50;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(centerBayX + 20, ly, centerBayW - 40, 26);

    // Fine ventilation slots
    ctx.fillStyle = '#475569';
    for (let sx = centerBayX + 26; sx < centerBayX + centerBayW - 26; sx += 8) {
      ctx.fillRect(sx, ly + 3, 4, 20);
    }
  }

  // Forward Luggage Hatch with Slotted Louvers (Image 2)
  const fwdBayX = isDriverSide ? 1260 : 540;
  const fwdBayW = 260;
  ctx.strokeRect(fwdBayX, bayY, fwdBayW, bayH);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(fwdBayX + 20, bayY + 35, fwdBayW - 40, 26);
  ctx.fillStyle = '#475569';
  for (let sx = fwdBayX + 26; sx < fwdBayX + fwdBayW - 26; sx += 8) {
    ctx.fillRect(sx, bayY + 38, 4, 20);
  }

  // Luggage Door Chrome Locks / Handles
  [centerBayX + 30, centerBayX + centerBayW - 40, fwdBayX + 30, fwdBayX + fwdBayW - 40].forEach((hx) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(hx, bayY + 12, 18, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(hx + 3, bayY + 14, 12, 6);
  });

  // Rear Lower Body: Two Square Black Inspection / Step Recesses (Image 2)
  const stepX = isDriverSide ? 380 : 1620;
  [bayY + 20, bayY + 65].forEach((sy, idx) => {
    ctx.fillStyle = '#090d16';
    ctx.fillRect(stepX + (idx === 0 ? 0 : 35), sy, 30, 30);
  });

  // 4. Amber LED Clearance Side Marker Lights along lower skirt (Image 2)
  ctx.fillStyle = '#f59e0b';
  for (let mx = 180; mx < 1920; mx += 360) {
    ctx.fillRect(mx, 455, 18, 8);
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mx, 455, 18, 8);
  }

  // Bottom dark aerodynamic skirt line
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 485, 2048, 27);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createVarahiRearTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. Crisp Pure White Base Background (Matches Image 3)
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-Mounted Tinted Rear Window (Image 3)
  const glassGrad = ctx.createLinearGradient(0, 60, 0, 360);
  glassGrad.addColorStop(0, '#090d14');
  glassGrad.addColorStop(0.65, '#0f172a');
  glassGrad.addColorStop(1, '#090d14');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.roundRect(160, 60, 704, 300, [24, 24, 10, 10]);
  ctx.fill();

  // Dark window border gasket
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Top High-Mount Third Red Brake Light (Image 3)
  ctx.fillStyle = '#dc2626';
  ctx.shadowColor = '#ef4444';
  ctx.shadowBlur = 10;
  ctx.fillRect(390, 75, 244, 16);
  ctx.shadowBlur = 0;

  // -----------------------------------------------------------
  // 3. GLOWING NEON-GREEN MALAYALAM CALLIGRAPHY: "വാരാഹി" (Image 3!)
  // -----------------------------------------------------------
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#22c55e';
  ctx.shadowBlur = 18;

  // Outer bold green glow outline
  ctx.font = 'bold 84px "Noto Sans Malayalam", "Arial Unicode MS", sans-serif';
  ctx.fillStyle = '#16a34a';
  ctx.fillText('വാരാഹി', 512, 220);

  // Inner bright emerald neon text
  ctx.fillStyle = '#4ade80';
  ctx.fillText('വാരാഹി', 512, 220);
  ctx.shadowBlur = 0;
  ctx.restore();

  // -----------------------------------------------------------
  // 4. MYTHICAL TRIBAL FACE GRAPHIC WITH FIERCE RED EYES (Image 3!)
  // Exact reproduction of the iconic rear hatch line-art artwork!
  // -----------------------------------------------------------
  const gx = 525;
  const gy = 560;

  // Surrounding geometric polygonal black accent lines (Image 3)
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  // Diagonal lines cutting to the ladder and edges
  ctx.moveTo(160, 360);
  ctx.lineTo(260, 480);
  ctx.lineTo(160, 620);
  ctx.moveTo(260, 480);
  ctx.lineTo(360, 440);
  ctx.lineTo(360, 720);
  ctx.lineTo(260, 800);
  ctx.moveTo(690, 420);
  ctx.lineTo(840, 520);
  ctx.lineTo(840, 740);
  ctx.lineTo(690, 780);
  ctx.stroke();

  // Intricate Mythical Face Mask Contour & Linework (Image 3)
  ctx.save();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;

  // Crown / Forehead tribal bands
  for (let b = 0; b < 6; b++) {
    const by = gy - 160 + b * 16;
    ctx.beginPath();
    ctx.moveTo(gx - 160 + b * 8, by);
    ctx.quadraticCurveTo(gx, by - 12, gx + 160 - b * 8, by);
    ctx.stroke();
  }

  // Cheek contours & ornate tribal whiskers
  ctx.beginPath();
  ctx.moveTo(gx - 170, gy - 60);
  ctx.quadraticCurveTo(gx - 190, gy + 40, gx - 110, gy + 130);
  ctx.quadraticCurveTo(gx, gy + 170, gx + 110, gy + 130);
  ctx.quadraticCurveTo(gx + 190, gy + 40, gx + 170, gy - 60);
  ctx.stroke();

  // Nose bridge & central muzzle loop
  ctx.beginPath();
  ctx.moveTo(gx - 35, gy - 20);
  ctx.lineTo(gx - 20, gy + 70);
  ctx.quadraticCurveTo(gx, gy + 110, gx + 20, gy + 70);
  ctx.lineTo(gx + 35, gy - 20);
  ctx.stroke();

  // -----------------------------------------------------------
  // FIERCE GLOWING RED / ORANGE EYES (The standout feature from Image 3!)
  // -----------------------------------------------------------
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const ex = isLeft ? gx - 75 : gx + 75;
    const ey = gy - 25;

    // Outer flame/slanted eye contours
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(ex - 50, ey);
      ctx.quadraticCurveTo(ex, ey - 22, ex + 45, ey + 10);
      ctx.quadraticCurveTo(ex, ey + 24, ex - 50, ey);
    } else {
      ctx.moveTo(ex + 50, ey);
      ctx.quadraticCurveTo(ex, ey - 22, ex - 45, ey + 10);
      ctx.quadraticCurveTo(ex, ey + 24, ex + 50, ey);
    }
    ctx.closePath();
    ctx.fill();

    // Glowing intense red-orange sclera & iris
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(ex, ey, 14, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = '#020617';
    ctx.beginPath();
    ctx.arc(ex, ey, 6, 0, Math.PI * 2);
    ctx.fill();

    // White eye catchlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ex - 3, ey - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  ctx.restore();

  // Lower Left Coachbuilder Badge (Image 3)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 12px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('PRAKASH', 240, 715);
  ctx.font = 'bold 9px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('COACH BUILDERS', 240, 730);

  // 5. Vertical Triple LED Tail Light Clusters (Image 3)
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const tx = isLeft ? 100 : 884;
    const ty = 480;
    const tw = 40;
    const th = 260;

    // Sculpted dark light housing
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(tx, ty, tw, th);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(tx, ty, tw, th);

    // Top Red Stop / Brake LED Light
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(tx + 8, ty + 15, 24, 60);

    // Middle Red / Amber Indicator LED Light
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(tx + 8, ty + 95, 24, 60);

    // Bottom White Reverse Lamp / Reflector
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(tx + 8, ty + 175, 24, 55);

    // Lower Corner Horizontal Red Reflector Strip (Image 3)
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(tx - 10, ty + th + 25, 60, 10);
  });

  // 6. Registration Plate: KL 47 M 5100 (Image 3)
  const plateX = 422;
  const plateY = 825;
  const plateW = 180;
  const plateH = 75;

  ctx.fillStyle = '#f59e0b'; // Commercial Yellow Plate
  ctx.fillRect(plateX, plateY, plateW, plateH);
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(plateX, plateY, plateW, plateH);

  ctx.fillStyle = '#000000';
  ctx.font = '900 24px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KL 47', plateX + 90, plateY + 32);
  ctx.fillText('M 5100', plateX + 90, plateY + 62);

  // Lower Bumper Diffuser with Fins & Chrome Bar
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(120, 930, 784, 30);
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(360, 925, 304, 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

// =============================================================================
// COMPLETE 3D BUS MODEL BUILDER
// =============================================================================

export function buildLuxuryCoachBus(): THREE.Group {
  const bus = new THREE.Group();

  const length = 11.8;
  const width = 2.65;
  const height = 3.55;

  // 1. CHASSIS & LOWER UNDERCARRIAGE
  const chassisMat = new THREE.MeshLambertMaterial({ color: 0x05070a });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.45, length * 0.95), chassisMat);
  chassis.position.y = 0.55;
  chassis.castShadow = true;
  bus.add(chassis);

  // 2. MAIN AERODYNAMIC BODY SHELL WITH VARAHI TEXTURES
  const bodyGeo = new THREE.BoxGeometry(width, height, length);

  const frontTex = createVarahiFrontTexture();
  const rearTex = createVarahiRearTexture();
  const sideDriverTex = createVarahiSideTexture(true);
  const sidePassengerTex = createVarahiSideTexture(false);

  // Pure white roof & dark underbody
  const roofMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const underMat = new THREE.MeshLambertMaterial({ color: 0x05070a });

  const bodyMaterials = [
    new THREE.MeshLambertMaterial({ map: sideDriverTex }),    // Right side (Driver)
    new THREE.MeshLambertMaterial({ map: sidePassengerTex }), // Left side (Passenger)
    roofMat,                                                // Roof
    underMat,                                               // Underside
    new THREE.MeshLambertMaterial({ map: frontTex }),         // Front (Image 1)
    new THREE.MeshLambertMaterial({ map: rearTex }),          // Rear (Image 3)
  ];

  const body = new THREE.Mesh(bodyGeo, bodyMaterials);
  body.position.y = height / 2 + 0.45;
  body.castShadow = true;
  body.receiveShadow = true;
  bus.add(body);

  // 3. SLEEK ROOFTOP AIR CONDITIONING (AC) POD (Image 2)
  const acGroup = new THREE.Group();
  const acMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const acDarkMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

  // Main AC Fairing Body
  const acBody = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.28, 3.4), acMat);
  acBody.position.set(0, height + 0.58, -0.4);
  acBody.castShadow = true;
  acGroup.add(acBody);

  // Aerodynamic nose cap
  const acNose = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.28, 16, 1, false, 0, Math.PI), acMat);
  acNose.rotation.y = -Math.PI / 2;
  acNose.position.set(0, height + 0.58, 1.3);
  acGroup.add(acNose);

  // Dark roof spoiler accent
  const acRear = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.24, 0.6), acDarkMat);
  acRear.position.set(0, height + 0.58, -2.1);
  acGroup.add(acRear);

  // AC Dual Cooling Exhaust Fans on top
  [-0.45, 0.45].forEach((fx) => {
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.04, 16), acDarkMat);
    fan.position.set(fx, height + 0.74, -0.6);
    acGroup.add(fan);
  });

  bus.add(acGroup);

  // 4. DISTINCTIVE HANGING "ELEPHANT EAR" AERODYNAMIC REARVIEW MIRRORS (Image 1)
  // White outer aerodynamic casing with orange indicator reflector and black inner frame
  const mirrorArmMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
  const mirrorWhiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mirrorGlassMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
  const mirrorAmberMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });

  [-width / 2 - 0.08, width / 2 + 0.08].forEach((mx, idx) => {
    const isLeft = idx === 0;
    const mirrorGroup = new THREE.Group();

    // Top anchor bracket on front corner pillar
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), mirrorArmMat);
    bracket.position.set(0, 0, 0);
    mirrorGroup.add(bracket);

    // Sweeping forward aerodynamic curved arm
    const armGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.75, 8);
    const arm = new THREE.Mesh(armGeo, mirrorArmMat);
    arm.rotation.x = 0.55;
    arm.rotation.z = isLeft ? -0.25 : 0.25;
    arm.position.set(isLeft ? -0.14 : 0.14, -0.28, 0.32);
    mirrorGroup.add(arm);

    // White aerodynamic mirror head casing (Image 1)
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.12), mirrorWhiteMat);
    head.position.set(isLeft ? -0.22 : 0.22, -0.58, 0.52);
    head.castShadow = true;

    // Orange indicator reflector on mirror front (Image 1)
    const reflector = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.02), mirrorAmberMat);
    reflector.position.set(isLeft ? -0.28 : 0.28, -0.58, 0.58);

    // Dual mirror glass panes (Main upper mirror + lower blind-spot convex mirror)
    const upperGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.32), mirrorGlassMat);
    upperGlass.position.set(isLeft ? -0.22 : 0.22, -0.5, 0.45);
    upperGlass.rotation.y = Math.PI;

    const lowerGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.12), mirrorGlassMat);
    lowerGlass.position.set(isLeft ? -0.22 : 0.22, -0.74, 0.45);
    lowerGlass.rotation.y = Math.PI;

    mirrorGroup.add(head, reflector, upperGlass, lowerGlass);
    mirrorGroup.position.set(mx, height + 0.32, length / 2 - 0.2);
    bus.add(mirrorGroup);
  });

  // Additional lower black blind-spot mirror stalk on the right side (Image 1)
  const bsMirrorGroup = new THREE.Group();
  const bsArm = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.25), mirrorArmMat);
  bsArm.position.set(width / 2 + 0.14, height / 2 + 0.5, length / 2 - 0.1);
  const bsHead = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.1), mirrorArmMat);
  bsHead.position.set(width / 2 + 0.14, height / 2 + 0.5, length / 2 + 0.05);
  bsMirrorGroup.add(bsArm, bsHead);
  bus.add(bsMirrorGroup);

  // 5. FRONT AUXILIARY CIRCULAR DRIVING FOG LAMPS ON BRACKETS (Image 1)
  const fogLampMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.1 });
  const fogBracketMat = new THREE.MeshLambertMaterial({ color: 0x020617 });
  [-0.38, 0.38].forEach((fx) => {
    const fogGroup = new THREE.Group();
    // Black vertical mounting bracket
    const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.24, 8), fogBracketMat);
    bracket.position.set(fx, 0.82, length / 2 + 0.06);

    // Chrome circular lamp body
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.06, 16), fogLampMat);
    lamp.rotation.x = Math.PI / 2;
    lamp.position.set(fx, 0.82, length / 2 + 0.09);

    fogGroup.add(bracket, lamp);
    bus.add(fogGroup);
  });

  // 6. DETAILED DRIVER'S CABIN INTERIOR (RHD Kerala Tourist Bus Cockpit)
  const cabinGroup = new THREE.Group();
  const dashMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const gaugeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const seatFabricMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
  const steeringMat = new THREE.MeshLambertMaterial({ color: 0x020617 });

  // Wide Driver Dashboard Console across front
  const dashboard = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.42, 1.1), dashMat);
  dashboard.position.set(0, 1.48, length / 2 - 0.7);
  cabinGroup.add(dashboard);

  // Curved Instrument Binnacle over steering column (Right side)
  const binnacle = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.22, 0.45), dashMat);
  binnacle.position.set(0.72, 1.76, length / 2 - 0.75);
  cabinGroup.add(binnacle);

  // Glowing Speedometer & Digital Display Cluster
  const gaugeCluster = new THREE.Mesh(new THREE.PlaneGeometry(0.55, 0.14), gaugeMat);
  gaugeCluster.position.set(0.72, 1.76, length / 2 - 0.98);
  gaugeCluster.rotation.y = Math.PI;
  cabinGroup.add(gaugeCluster);

  // Steering Column & Large 2-Spoke Bus Steering Wheel (Right side)
  const steerColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.65, 12), steeringMat);
  steerColumn.position.set(0.72, 1.58, length / 2 - 1.05);
  steerColumn.rotation.x = 0.55;
  cabinGroup.add(steerColumn);

  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 10, 24), steeringMat);
  steerWheel.position.set(0.72, 1.82, length / 2 - 1.25);
  steerWheel.rotation.x = -1.0;
  cabinGroup.add(steerWheel);

  const steerCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12), steeringMat);
  steerCenter.position.set(0.72, 1.82, length / 2 - 1.25);
  steerCenter.rotation.x = -1.0;
  cabinGroup.add(steerCenter);

  // Ergonomic High-Back Driver Pneumatic Seat with Headrest
  const dSeatBase = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.35, 0.6), seatFabricMat);
  dSeatBase.position.set(0.72, 1.05, length / 2 - 1.55);
  const dSeatBack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.15), seatFabricMat);
  dSeatBack.position.set(0.72, 1.55, length / 2 - 1.8);
  const dHeadrest = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.12), seatFabricMat);
  dHeadrest.position.set(0.72, 2.05, length / 2 - 1.82);
  cabinGroup.add(dSeatBase, dSeatBack, dHeadrest);

  // Gear Shift Lever on Left of Driver
  const gearStick = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.45, 8), steeringMat);
  gearStick.position.set(0.32, 1.2, length / 2 - 1.4);
  const gearKnob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), new THREE.MeshLambertMaterial({ color: 0xfacc15 }));
  gearKnob.position.set(0.32, 1.42, length / 2 - 1.4);
  cabinGroup.add(gearStick, gearKnob);

  // Front Passenger Entry Stairs Well on Left side
  const stairWell = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.4, 1.0), dashMat);
  stairWell.position.set(-0.85, 0.8, length / 2 - 1.4);
  cabinGroup.add(stairWell);

  bus.add(cabinGroup);

  // 7. REAR BLACK STEEL ACCESS LADDER ON LEFT SIDE (Image 3!)
  // Full-height ladder mounted on the left side of the rear extending to the roof
  const ladderGroup = new THREE.Group();
  const ladderMat = new THREE.MeshLambertMaterial({ color: 0x09090b });
  const ladderX = -width / 2 + 0.52;
  const ladderZ = -length / 2 - 0.05;

  // Twin vertical ladder stringer rails
  [-0.18, 0.18].forEach((lx) => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 3.2, 8), ladderMat);
    rail.position.set(ladderX + lx, 2.1, ladderZ);
    ladderGroup.add(rail);

    // Standoff wall mounting brackets
    [0.8, 1.8, 2.8, 3.6].forEach((by) => {
      const bMount = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 0.08), ladderMat);
      bMount.position.set(ladderX + lx, by, ladderZ + 0.04);
      ladderGroup.add(bMount);
    });
  });

  // 7 Horizontal ladder climbing rungs
  for (let r = 0; r < 7; r++) {
    const ry = 0.85 + r * 0.42;
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.36, 8), ladderMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(ladderX, ry, ladderZ);
    ladderGroup.add(rung);
  }

  // Top roof curve over the rear roof lip
  const roofCurve = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.04, 0.32), ladderMat);
  roofCurve.position.set(ladderX, height + 0.45, -length / 2 + 0.12);
  ladderGroup.add(roofCurve);

  bus.add(ladderGroup);

  // 7. MULTI-SPOKE CHROME ALLOY WHEEL CAPS (Image 2)
  // Deep black tires with chrome multi-spoke turbine rims and red center cap
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x090d16 });
  const alloyRimMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.15 });
  const chromeSpokeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.2 });
  const redCapMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });

  function createVarahiWheel(x: number, z: number, isDual = false) {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, 0.55, z);

    const tireWidth = isDual ? 0.64 : 0.36;
    const tireRadius = 0.54;

    // Tire Rubber
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth, 24), tireMat);
    tire.rotateZ(Math.PI / 2);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Polished Silver Outer Lip Rim (Image 2)
    const rimRadius = 0.40;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(rimRadius, rimRadius, tireWidth + 0.02, 24), alloyRimMat);
    rim.rotateZ(Math.PI / 2);
    wheelGroup.add(rim);

    // Multi-Spoke Turbine Disc (Image 2)
    const faceX = x < 0 ? -tireWidth / 2 - 0.02 : tireWidth / 2 + 0.02;
    for (let s = 0; s < 12; s++) {
      const angle = (s / 12) * Math.PI * 2;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.28, 0.035), chromeSpokeMat);
      spoke.rotation.x = angle;
      spoke.position.set(faceX, Math.sin(angle) * 0.17, Math.cos(angle) * 0.17);
      wheelGroup.add(spoke);
    }

    // Red Center Wheel Bullet Cap (Image 2)
    const redCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, tireWidth + 0.06, 16), redCapMat);
    redCap.rotateZ(Math.PI / 2);
    wheelGroup.add(redCap);

    return wheelGroup;
  }

  // Front Wheels (Steering axle)
  bus.add(createVarahiWheel(-width / 2 + 0.14, 3.6, false));
  bus.add(createVarahiWheel(width / 2 - 0.14, 3.6, false));

  // Rear Wheels (Heavy-duty dual drive axle)
  bus.add(createVarahiWheel(-width / 2 + 0.24, -2.8, true));
  bus.add(createVarahiWheel(width / 2 - 0.24, -2.8, true));

  // Sculpted rear aerodynamic mud flaps
  const flapMat = new THREE.MeshLambertMaterial({ color: 0x05070a });
  [-width / 2 + 0.26, width / 2 - 0.26].forEach((fx) => {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.44, 0.04), flapMat);
    flap.position.set(fx, 0.34, -3.52);
    bus.add(flap);
  });

  return bus;
}

// Export buildKSRTCSuperFastBus as an alias so all existing callers immediately
// render this authentic VARAAHI Kerala Tourist Bus!
export const buildKSRTCSuperFastBus = buildLuxuryCoachBus;
