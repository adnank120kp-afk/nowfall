import * as THREE from 'three';

/**
 * Procedurally generates high-resolution canvas textures and 3D mesh for the
 * Modern Luxury Coach / Tourist Bus matching the user's vector blueprint:
 * - Pure Alpine White aerodynamic luxury coach livery (#ffffff / #f8fafc)
 * - Front Fascia: Gloss black mask / visor across lower windshield with bold chrome "BUS" emblem,
 *   swept-back projector LED headlights with lightbar DRL eyebrows, lower fog lights, and license plate
 * - Distinctive hanging "rabbit ear" / "elephant ear" aerodynamic top-mounted rearview mirrors
 * - Sides: Continuous panoramic dark obsidian tinted glass featuring the signature dynamic
 *   forward downward swoop / Z-slash cut at the front entrance / cab
 * - Lower Body: Flush luggage compartment bay doors with handles, amber clearance side markers,
 *   aerodynamic wheel arch flares, and driver-side rear vertical engine cooling radiator louvers
 * - Rear: Large dark back window, sweeping vertical/boomerang red LED tail light clusters,
 *   horizontal red reflector connecting bar across the boot lid, rear engine vents, and bumper
 * - Roof: Streamlined aerodynamic rooftop air conditioning (AC) pod
 * - Wheels: Luxury coach silver alloy wheels with circular vent styling and lug nuts
 */

function createCoachFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. White base body
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 1024);

  // Aerodynamic top roof crown gradient
  const roofGrad = ctx.createLinearGradient(0, 0, 0, 120);
  roofGrad.addColorStop(0, '#e2e8f0');
  roofGrad.addColorStop(1, '#ffffff');
  ctx.fillStyle = roofGrad;
  ctx.fillRect(0, 0, 1024, 120);

  // 2. High Panoramic Raked Windshield (Dark obsidian glass with subtle sky reflection)
  const glassGrad = ctx.createLinearGradient(0, 100, 0, 520);
  glassGrad.addColorStop(0, '#0a0d12');
  glassGrad.addColorStop(0.2, '#151b24');
  glassGrad.addColorStop(0.7, '#1e2632');
  glassGrad.addColorStop(1, '#0f141a');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.roundRect(50, 100, 924, 430, [40, 40, 0, 0]);
  ctx.fill();

  // Dark windshield rubber gasket border
  ctx.strokeStyle = '#05070a';
  ctx.lineWidth = 10;
  ctx.stroke();

  // Subtle interior rearview mirror & sun-visor gradient at top of glass
  ctx.fillStyle = 'rgba(5, 7, 10, 0.65)';
  ctx.fillRect(60, 110, 904, 50);

  // Dual sleek front windshield wipers resting along the bottom
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(180, 515);
  ctx.lineTo(470, 495);
  ctx.moveTo(520, 515);
  ctx.lineTo(810, 495);
  ctx.stroke();

  // 3. GLOSS BLACK FRONT AERODYNAMIC MASK / VISOR (Signature feature from blueprint!)
  const maskGrad = ctx.createLinearGradient(0, 520, 0, 710);
  maskGrad.addColorStop(0, '#0b0e13');
  maskGrad.addColorStop(0.5, '#131821');
  maskGrad.addColorStop(1, '#090b0e');
  ctx.fillStyle = maskGrad;
  ctx.beginPath();
  ctx.moveTo(60, 520);
  ctx.lineTo(964, 520);
  ctx.lineTo(920, 700);
  ctx.quadraticCurveTo(512, 730, 104, 700);
  ctx.closePath();
  ctx.fill();

  // Subtle chrome perimeter accent line around the black mask
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  ctx.stroke();

  // 4. BOLD CHROME "BUS" EMBLEM (Centered on the gloss black mask)
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;

  // Metallic Chrome Gradient for BUS text
  const textGrad = ctx.createLinearGradient(0, 580, 0, 650);
  textGrad.addColorStop(0, '#ffffff');
  textGrad.addColorStop(0.45, '#e2e8f0');
  textGrad.addColorStop(0.55, '#94a3b8');
  textGrad.addColorStop(1, '#cbd5e1');

  ctx.fillStyle = textGrad;
  ctx.font = '900 68px "Syne", "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '14px';
  ctx.fillText('BUS', 512, 638);
  ctx.letterSpacing = '0px';

  // Subtle chrome underline below "BUS"
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(432, 652, 160, 4);
  ctx.restore();

  // 5. MODERN SWEPT-BACK PROJECTOR LED HEADLIGHT ASSEMBLIES (Left & Right)
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const hx = isLeft ? 135 : 889;
    const hw = 125;
    const hy = 630;
    const hh = 75;

    // Outer clear polycarbonate headlight housing
    ctx.save();
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(hx - 30, hy);
      ctx.lineTo(hx + hw, hy + 10);
      ctx.lineTo(hx + hw - 15, hy + hh);
      ctx.lineTo(hx - 45, hy + hh - 10);
    } else {
      ctx.moveTo(hx - hw, hy + 10);
      ctx.lineTo(hx + 30, hy);
      ctx.lineTo(hx + 45, hy + hh - 10);
      ctx.lineTo(hx - hw + 15, hy + hh);
    }
    ctx.closePath();
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Ice-blue / White LED Daytime Running Light (DRL) Eyebrow strip along the top edge
    ctx.strokeStyle = '#e0f2fe';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 6;
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(hx - 24, hy + 6);
      ctx.lineTo(hx + hw - 6, hy + 14);
    } else {
      ctx.moveTo(hx - hw + 6, hy + 14);
      ctx.lineTo(hx + 24, hy + 6);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Dual Projector LED Lenses (Bright white crystal projector bulbs)
    const bulb1X = isLeft ? hx + 15 : hx - 15;
    const bulb2X = isLeft ? hx + 75 : hx - 75;
    [bulb1X, bulb2X].forEach((bx) => {
      ctx.beginPath();
      ctx.arc(bx, hy + 42, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Inner bulb core
      ctx.beginPath();
      ctx.arc(bx, hy + 42, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
    });

    // Lower amber turn indicator strip
    ctx.fillStyle = '#f59e0b';
    const indX = isLeft ? hx - 20 : hx + 5;
    ctx.fillRect(indX, hy + hh - 18, 26, 10);

    ctx.restore();
  });

  // 6. LOWER SCULPTED WHITE BUMPER & AIR INTAKE
  // Central lower black radiator air intake
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.roundRect(280, 770, 464, 110, [12, 12, 16, 16]);
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Horizontal intake grille mesh slats
  ctx.fillStyle = '#1e293b';
  for (let gy = 785; gy <= 860; gy += 18) {
    ctx.fillRect(300, gy, 424, 6);
  }

  // Round fog lamps in bumper corners
  [-1, 1].forEach((side) => {
    const fx = side === -1 ? 165 : 859;
    const fy = 825;

    // Recessed housing
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(fx, fy, 26, 0, Math.PI * 2);
    ctx.fill();

    // Glass lamp
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(fx, fy, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // 7. FRONT NUMBER / REGISTRATION PLATE
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(387, 905, 250, 60);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.strokeRect(387, 905, 250, 60);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KL 07 B 2026', 512, 948);

  // Aerodynamic lower chin spoiler lip
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(100, 990, 824, 25);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createCoachRearTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // 1. White base body
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-mounted Tinted Rear Window
  const glassGrad = ctx.createLinearGradient(0, 80, 0, 480);
  glassGrad.addColorStop(0, '#0a0d12');
  glassGrad.addColorStop(0.7, '#151b24');
  glassGrad.addColorStop(1, '#0a0d12');
  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.roundRect(140, 80, 744, 380, [32, 32, 16, 16]);
  ctx.fill();
  ctx.strokeStyle = '#05070a';
  ctx.lineWidth = 10;
  ctx.stroke();

  // High-mount third brake light (Center top of glass)
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(442, 92, 140, 16);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeRect(442, 92, 140, 16);

  // Subtle rear window heating defogger lines
  ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
  ctx.lineWidth = 1.5;
  for (let dy = 160; dy <= 420; dy += 40) {
    ctx.beginPath();
    ctx.moveTo(170, dy);
    ctx.lineTo(854, dy);
    ctx.stroke();
  }

  // 3. PURE WHITE REAR TAILGATE PANEL
  // Subtle character crease lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(140, 500);
  ctx.lineTo(884, 500);
  ctx.stroke();

  // 4. SWEEPING VERTICAL / BOOMERANG RED LED TAILLIGHT CLUSTERS (Left & Right)
  // Matching the exact rear view shown in the blueprint diagram!
  [-1, 1].forEach((side) => {
    const isLeft = side === -1;
    const tx = isLeft ? 60 : 924;
    const tw = 40;
    const ty = 520;
    const th = 260;

    // Outer swooping red lightbar housing
    ctx.fillStyle = '#991b1b';
    ctx.beginPath();
    if (isLeft) {
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + tw + 10, ty + 20);
      ctx.lineTo(tx + tw + 25, ty + th);
      ctx.lineTo(tx, ty + th - 20);
    } else {
      ctx.moveTo(tx + tw, ty);
      ctx.lineTo(tx - 10, ty + 20);
      ctx.lineTo(tx - 25, ty + th);
      ctx.lineTo(tx + tw, ty + th - 20);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#450a0a';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Bright Red LED Lightbar Stripe
    ctx.fillStyle = '#ef4444';
    const barX = isLeft ? tx + 8 : tx + 12;
    ctx.fillRect(barX, ty + 25, 18, th - 90);

    // Amber Turn Signal section
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(barX, ty + th - 60, 18, 22);

    // White Reverse Light section
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, ty + th - 34, 18, 20);
  });

  // 5. HORIZONTAL RED REFLECTOR BAR / LIGHT STRIP CONNECTING TAILLIGHTS
  // (Signature feature visible on the rear boot lid in the user's image!)
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(135, 730, 754, 26);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.strokeRect(135, 730, 754, 26);

  // Inner reflective segment pattern
  ctx.fillStyle = '#ef4444';
  for (let rx = 150; rx < 870; rx += 28) {
    ctx.fillRect(rx, 734, 18, 18);
  }

  // 6. LOWER REAR ENGINE COOLING VENT SLATS
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(240, 780, 544, 70);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.strokeRect(240, 780, 544, 70);

  ctx.fillStyle = '#1e293b';
  for (let vy = 792; vy <= 836; vy += 14) {
    ctx.fillRect(255, vy, 514, 6);
  }

  // 7. WHITE REAR BUMPER & REGISTRATION PLATE
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(387, 875, 250, 60);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 4;
  ctx.strokeRect(387, 875, 250, 60);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KL 07 B 2026', 512, 918);

  // Lower bumper dual red reflectors
  [-1, 1].forEach((side) => {
    const rx = side === -1 ? 160 : 814;
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(rx, 895, 50, 16);
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 2;
    ctx.strokeRect(rx, 895, 50, 16);
  });

  // Black bottom diffuser trim
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(100, 960, 824, 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Creates Left (Passenger side) or Right (Driver side) side livery texture
 * matching the user's blueprint:
 * - Pure Alpine White body
 * - Continuous panoramic tinted glass windows
 * - The iconic swooping forward downward Z-slash cut behind the front cab/door
 * - Flush lower luggage compartment doors with paddle handles
 * - Driver side rear radiator cooling louver grille
 * - Passenger side entrance swing door
 */
function createCoachSideTexture(isDriverSide: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // 1. Pure Alpine White base body
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 2048, 512);

  // Subtle aerodynamic gradient at upper roof line
  const topGrad = ctx.createLinearGradient(0, 0, 0, 60);
  topGrad.addColorStop(0, '#e2e8f0');
  topGrad.addColorStop(1, '#ffffff');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, 2048, 60);

  // 2. CONTINUOUS PANORAMIC DARK TINTED GLASS WITH DYNAMIC FORWARD DOWNWARD CUT
  // In the diagram, the front passenger and driver windows swoop downwards towards the front wheel arch
  const winGrad = ctx.createLinearGradient(0, 50, 0, 260);
  winGrad.addColorStop(0, '#0a0d12');
  winGrad.addColorStop(0.5, '#151c26');
  winGrad.addColorStop(1, '#0e1218');
  ctx.fillStyle = winGrad;

  // Draw the iconic luxury coach profile window cutout:
  ctx.beginPath();
  if (!isDriverSide) {
    // Passenger Side: Front is at right (X > 1700), Rear is at left (X < 300)
    ctx.moveTo(120, 55);
    ctx.lineTo(1920, 55);
    ctx.lineTo(1935, 140);
    // Downward swooping forward cut
    ctx.lineTo(1860, 240);
    ctx.lineTo(1580, 240);
    ctx.lineTo(1530, 185);
    ctx.lineTo(120, 185);
    ctx.closePath();
  } else {
    // Driver Side: Front is at left (X < 300), Rear is at right (X > 1700)
    ctx.moveTo(128, 55);
    ctx.lineTo(1928, 55);
    ctx.lineTo(1928, 185);
    ctx.lineTo(518, 185);
    // Downward swooping forward cut
    ctx.lineTo(468, 240);
    ctx.lineTo(188, 240);
    ctx.lineTo(113, 140);
    ctx.closePath();
  }
  ctx.fill();

  // Dark rubber gasket around windows
  ctx.strokeStyle = '#05070a';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Thin vertical black window mullions separating the panoramic touring glass
  ctx.fillStyle = '#05070a';
  const startX = isDriverSide ? 520 : 160;
  const endX = isDriverSide ? 1880 : 1520;
  for (let wx = startX; wx <= endX; wx += 170) {
    ctx.fillRect(wx, 55, 6, 130);
  }

  // 3. PASSENGER SIDE ENTRANCE DOOR / DRIVER CAB DOOR SEAMS
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 4;
  if (!isDriverSide) {
    // Front Passenger swing door (around X: 1620 to 1840)
    ctx.strokeRect(1620, 55, 220, 395);

    // Door glass pane in the lower portion
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(1640, 255, 180, 140);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.strokeRect(1640, 255, 180, 140);

    // Emergency door cut at mid-body
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.strokeRect(880, 55, 130, 395);
  } else {
    // Driver Side Cab door outline (around X: 200 to 420)
    ctx.strokeRect(200, 55, 220, 395);

    // Emergency exit door outline at mid-body
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.strokeRect(1038, 55, 130, 395);

    // 4. LARGE VERTICAL REAR RADIATOR / ENGINE COOLING LOUVER GRILLE
    // (Crucial distinguishing detail on driver side rear from blueprint!)
    const grilleX = 1680;
    const grilleY = 320;
    const grilleW = 160;
    const grilleH = 130;

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(grilleX, grilleY, grilleW, grilleH);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.strokeRect(grilleX, grilleY, grilleW, grilleH);

    // Vertical cooling louvers
    ctx.fillStyle = '#64748b';
    for (let lx = grilleX + 12; lx < grilleX + grilleW - 8; lx += 12) {
      ctx.fillRect(lx, grilleY + 8, 4, grilleH - 16);
    }
  }

  // 5. LOWER BODY FLUSH LUGGAGE / CARGO COMPARTMENT DOORS
  // Rectangular shut lines with chrome flush paddle latches
  const lugY = 285;
  const lugH = 160;
  const lugW = 230;
  const lugStartX = isDriverSide ? 490 : 380;
  const numLuggageDoors = 4;

  for (let i = 0; i < numLuggageDoors; i++) {
    const lx = lugStartX + i * (lugW + 28);
    // Door panel shut line
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.strokeRect(lx, lugY, lugW, lugH);

    // Flush paddle handle
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(lx + lugW / 2 - 20, lugY + 28, 40, 16);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(lx + lugW / 2 - 14, lugY + 32, 28, 8);

    // Key lock cylinder
    ctx.beginPath();
    ctx.arc(lx + lugW / 2 + 28, lugY + 36, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#64748b';
    ctx.fill();
  }

  // 6. AMBER CLEARANCE SIDE-MARKER LIGHTS
  ctx.fillStyle = '#f59e0b';
  for (let mx = 180; mx < 1920; mx += 360) {
    ctx.fillRect(mx, 455, 18, 8);
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(mx, 455, 18, 8);
  }

  // Rear corner red clearance marker
  const rearMarkerX = isDriverSide ? 1970 : 80;
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(rearMarkerX, 455, 18, 8);

  // 7. CLEAN SCULPTED HORIZONTAL CHARACTER LINE
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(60, 265);
  ctx.lineTo(1988, 265);
  ctx.stroke();

  // Bottom dark aerodynamic rocker panel / underbody edge
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 485, 2048, 27);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Builds the complete 3D Modern Luxury Coach Bus Model matching the uploaded blueprint:
 * - Pristine Alpine White aerodynamic coach body
 * - Dynamic continuous panoramic dark tinted windows
 * - Black aerodynamic front mask with chrome "BUS" insignia
 * - Projector LED headlights with lightbar eyebrows & lower fog lights
 * - Top-mounted hanging "rabbit ear" / "elephant ear" aerodynamic black rearview mirrors
 * - Streamlined rooftop Air Conditioning (AC) unit pod
 * - Luxury coach silver alloy wheels with circular vent holes
 * - Boomerang red LED tail lights with connecting horizontal reflector strip
 */
export function buildLuxuryCoachBus(): THREE.Group {
  const bus = new THREE.Group();

  const length = 11.8;
  const width = 2.65;
  const height = 3.55;

  // 1. CHASSIS & LOWER UNDERCARRIAGE
  const chassisMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(width * 0.9, 0.45, length * 0.95), chassisMat);
  chassis.position.y = 0.55;
  chassis.castShadow = true;
  bus.add(chassis);

  // 2. MAIN AERODYNAMIC BODY SHELL
  const bodyGeo = new THREE.BoxGeometry(width, height, length);

  // Textures matching the 4 views in the uploaded vector diagram:
  // Material Indices:
  // 0: Right side (+X) -> Driver Side
  // 1: Left side (-X)  -> Passenger Side
  // 2: Top / Roof (+Y)
  // 3: Bottom (-Y)
  // 4: Front (+Z)
  // 5: Rear (-Z)
  const frontTex = createCoachFrontTexture();
  const rearTex = createCoachRearTexture();
  const sideDriverTex = createCoachSideTexture(true);
  const sidePassengerTex = createCoachSideTexture(false);

  // Pure white roof & dark underbody
  const roofMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const underMat = new THREE.MeshLambertMaterial({ color: 0x0b0f17 });

  const bodyMaterials = [
    new THREE.MeshLambertMaterial({ map: sideDriverTex }),    // Right side (Driver)
    new THREE.MeshLambertMaterial({ map: sidePassengerTex }), // Left side (Passenger)
    roofMat,                                                // Roof
    underMat,                                               // Underside
    new THREE.MeshLambertMaterial({ map: frontTex }),         // Front
    new THREE.MeshLambertMaterial({ map: rearTex }),          // Rear
  ];

  const body = new THREE.Mesh(bodyGeo, bodyMaterials);
  body.position.y = height / 2 + 0.45;
  body.castShadow = true;
  body.receiveShadow = true;
  bus.add(body);

  // 3. AERODYNAMIC ROOFTOP AIR CONDITIONING (AC) POD
  // Streamlined white low-profile rooftop unit (Carrier/Sutrak style)
  const acGroup = new THREE.Group();
  const acMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const acVentMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

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

  // AC Dual Cooling Exhaust Fans on top
  [-0.45, 0.45].forEach((fx) => {
    const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.04, 16), acVentMat);
    fan.position.set(fx, height + 0.74, -0.6);
    acGroup.add(fan);
  });

  // AC Side Ventilation Slits
  [-0.84, 0.84].forEach((vx) => {
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 2.2), acVentMat);
    slit.position.set(vx, height + 0.58, -0.4);
    acGroup.add(slit);
  });
  bus.add(acGroup);

  // 4. DISTINCTIVE HANGING "RABBIT EAR" / "ELEPHANT EAR" AERODYNAMIC REARVIEW MIRRORS
  // Extending from the top roof corners forward and curving down (prominently shown in front & side views)
  const mirrorMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
  const mirrorGlassMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.85, roughness: 0.15 });

  [-width / 2 - 0.08, width / 2 + 0.08].forEach((mx, idx) => {
    const isLeft = idx === 0;
    const mirrorGroup = new THREE.Group();

    // Top anchor bracket on front corner pillar
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.18), mirrorMat);
    bracket.position.set(0, 0, 0);
    mirrorGroup.add(bracket);

    // Sweeping forward aerodynamic curved arm
    const armGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.75, 8);
    const arm = new THREE.Mesh(armGeo, mirrorMat);
    arm.rotation.x = 0.55;
    arm.rotation.z = isLeft ? -0.25 : 0.25;
    arm.position.set(isLeft ? -0.14 : 0.14, -0.28, 0.32);
    mirrorGroup.add(arm);

    // Modern vertical aerodynamic mirror head casing
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.52, 0.12), mirrorMat);
    head.position.set(isLeft ? -0.22 : 0.22, -0.58, 0.52);
    head.castShadow = true;

    // Dual mirror glass panes (Main upper mirror + lower blind-spot convex mirror)
    const upperGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.32), mirrorGlassMat);
    upperGlass.position.set(isLeft ? -0.22 : 0.22, -0.5, 0.45);
    upperGlass.rotation.y = Math.PI;

    const lowerGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.11, 0.12), mirrorGlassMat);
    lowerGlass.position.set(isLeft ? -0.22 : 0.22, -0.74, 0.45);
    lowerGlass.rotation.y = Math.PI;

    mirrorGroup.add(head, upperGlass, lowerGlass);
    mirrorGroup.position.set(mx, height + 0.32, length / 2 - 0.2);
    bus.add(mirrorGroup);
  });

  // 5. LUXURY COACH ALLOY WHEELS (Front Single, Rear Dual)
  // Silver alloy rims with circular vent holes, dark tread tires, and chrome lug bolts
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x111827 });
  const alloyRimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.25 });
  const alloyHubMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const chromeNutMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9 });

  function createCoachWheel(x: number, z: number, isDual = false) {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, 0.55, z);

    const tireWidth = isDual ? 0.64 : 0.36;
    const tireRadius = 0.54;

    // Tire
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth, 24), tireMat);
    tire.rotateZ(Math.PI / 2);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Silver Alloy Rim
    const rimRadius = 0.38;
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(rimRadius, rimRadius, tireWidth + 0.02, 20), alloyRimMat);
    rim.rotateZ(Math.PI / 2);
    wheelGroup.add(rim);

    // Dark Inner Hub Core with circular vent cutouts
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, tireWidth + 0.04, 16), alloyHubMat);
    hub.rotateZ(Math.PI / 2);
    wheelGroup.add(hub);

    // Chrome Lug Nuts (10-bolt commercial pattern)
    for (let b = 0; b < 10; b++) {
      const angle = (b / 10) * Math.PI * 2;
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, tireWidth + 0.05, 6), chromeNutMat);
      nut.rotateZ(Math.PI / 2);
      nut.position.set(x < 0 ? -0.01 : 0.01, Math.sin(angle) * 0.16, Math.cos(angle) * 0.16);
      wheelGroup.add(nut);
    }

    // Chrome Center Cap with emblem
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, tireWidth + 0.06, 12), chromeNutMat);
    cap.rotateZ(Math.PI / 2);
    wheelGroup.add(cap);

    return wheelGroup;
  }

  // Front Wheels (Steering axle)
  bus.add(createCoachWheel(-width / 2 + 0.14, 3.6, false));
  bus.add(createCoachWheel(width / 2 - 0.14, 3.6, false));

  // Rear Wheels (Heavy-duty dual drive axle)
  bus.add(createCoachWheel(-width / 2 + 0.24, -2.8, true));
  bus.add(createCoachWheel(width / 2 - 0.24, -2.8, true));

  // Sculpted rear aerodynamic mud flaps
  const flapMat = new THREE.MeshLambertMaterial({ color: 0x0b0f17 });
  [-width / 2 + 0.26, width / 2 - 0.26].forEach((fx) => {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.44, 0.04), flapMat);
    flap.position.set(fx, 0.34, -3.52);
    bus.add(flap);
  });

  return bus;
}

// Export buildKSRTCSuperFastBus as an alias so all existing callers immediately
// render this pristine modern luxury coach model and its exact white livery!
export const buildKSRTCSuperFastBus = buildLuxuryCoachBus;
