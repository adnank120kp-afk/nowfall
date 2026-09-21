import * as THREE from 'three';

/**
 * Procedurally generates high-resolution canvas textures for the authentic
 * KSRTC Super Fast (Aanavandi) livery strictly based on the template diagram:
 * - Depot: Vadakkan Paravoor (വടക്കൻ പറവൂർ - RPK 992)
 * - Registration: KL.15.A.1764
 * - Route: Paravoor - Vyttila - Alappuzha - Kollam - Thiruvananthapuram (Cochin Xpress)
 * - Two-tone Cream & Crimson Red livery with double chevron racing stripes
 * - Official Kerala State KSRTC Elephant Seal Emblem & "SUPERFAST" banner
 */

function createFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Cream background
  ctx.fillStyle = '#f8efb9';
  ctx.fillRect(0, 0, 1024, 1024);

  // Top destination board box (White)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(80, 50, 864, 210);
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 6;
  ctx.strokeRect(80, 50, 864, 210);

  // Red KSRTC Header box
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(110, 70, 480, 85);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Syne", sans-serif';
  ctx.fillText('KSRTC', 130, 136);

  ctx.font = 'bold 30px "Noto Sans Malayalam", sans-serif';
  ctx.fillStyle = '#f8efb9';
  ctx.fillText('വടക്കൻ പറവൂർ', 370, 130);

  // Route text inside board
  ctx.fillStyle = '#111111';
  ctx.font = 'bold 38px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('പറവൂർ  വൈറ്റില  തിരുവനന്തപുരം', 120, 215);

  // Gold Cochin Xpress text & SF badge
  ctx.fillStyle = '#b45309';
  ctx.font = 'italic bold 42px "Syne", cursive, sans-serif';
  ctx.fillText('Cochin Xpress', 640, 160);

  // Windshield area (represented below board)
  ctx.fillStyle = '#1c2328';
  ctx.fillRect(60, 280, 904, 240);
  ctx.strokeStyle = '#0a0d0e';
  ctx.lineWidth = 14;
  ctx.strokeRect(60, 280, 904, 240);

  // Center windshield dividing pillar
  ctx.fillStyle = '#0a0d0e';
  ctx.fillRect(504, 280, 16, 240);

  // Horizontal Red accent strip with "SUPER FAST"
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(0, 530, 1024, 120);

  ctx.fillStyle = '#fef08a';
  ctx.font = 'italic 900 52px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SUPER FAST', 512, 610);

  // Center Cream / Silver Radiator Grille
  ctx.fillStyle = '#f8efb9';
  ctx.fillRect(240, 670, 544, 220);
  ctx.strokeStyle = '#cf1418';
  ctx.lineWidth = 10;
  ctx.strokeRect(240, 670, 544, 220);

  // Horizontal cooling louvers
  ctx.fillStyle = '#1c1c1c';
  for (let y = 705; y < 870; y += 32) {
    ctx.fillRect(265, y, 494, 14);
  }

  // Left & Right Headlamp Clusters (Twin circular lights)
  [-1, 1].forEach(side => {
    const cx = side === -1 ? 140 : 884;
    ctx.fillStyle = '#be1216';
    ctx.fillRect(cx - 100, 690, 200, 170);

    // Twin headlights
    [cx - 45, cx + 45].forEach(hx => {
      ctx.beginPath();
      ctx.arc(hx, 775, 42, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#9ca3af';
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(hx, 775, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
    });
  });

  // Stencils & Depot Markings
  ctx.fillStyle = '#cf1418';
  ctx.font = 'bold 42px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('RPK 992 (FRP)', 60, 670);

  // Lower Red Bumper
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, 900, 1024, 124);

  // Yellow Taxi Registration Plate: KL.15.A.1764
  ctx.fillStyle = '#facc15';
  ctx.fillRect(362, 920, 300, 75);
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 5;
  ctx.strokeRect(362, 920, 300, 75);

  ctx.fillStyle = '#111111';
  ctx.font = 'bold 46px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('KL.15.A.1764', 512, 974);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createRearTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Cream base
  ctx.fillStyle = '#f8efb9';
  ctx.fillRect(0, 0, 1024, 1024);

  // Top Red KSRTC header
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(120, 60, 784, 120);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KSRTC', 512, 125);
  ctx.font = 'bold 34px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('വടക്കൻ പറവൂർ', 512, 165);

  // Large Dark Blue Route Card Window
  ctx.fillStyle = '#0f2742';
  ctx.fillRect(160, 200, 704, 340);
  ctx.strokeStyle = '#cf1418';
  ctx.lineWidth = 10;
  ctx.strokeRect(160, 200, 704, 340);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('പറവൂർ  തിരുവനന്തപുരം', 512, 260);

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 48px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('വൈറ്റില', 512, 330);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('ആലപ്പുഴ  കൊല്ലം', 512, 400);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '22px "JetBrains Mono", monospace';
  ctx.fillText('online booking: www.keralartc.com', 512, 455);

  ctx.fillStyle = '#f59e0b';
  ctx.font = 'italic bold 36px cursive, sans-serif';
  ctx.fillText('Cochin Xpress', 512, 505);

  // Center Air Louver Vent Section
  ctx.fillStyle = '#e5dfaa';
  ctx.fillRect(260, 560, 504, 150);
  ctx.fillStyle = '#222222';
  for (let ly = 580; ly <= 690; ly += 24) {
    ctx.fillRect(290, ly, 444, 10);
  }

  // Depot Number & Indicators
  ctx.fillStyle = '#cf1418';
  ctx.font = 'bold 38px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText('RPK 992', 880, 590);

  // Red lower skirt
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(0, 730, 1024, 294);

  // STOP Indicator (Orange left box)
  ctx.fillStyle = '#ea580c';
  ctx.fillRect(80, 760, 160, 140);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(80, 760, 160, 140);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Stop', 160, 845);

  // Center Advertisement Banner: "കച്ചവടം ഇനി ഈസിയായി"
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(270, 750, 484, 160);
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 4;
  ctx.strokeRect(270, 750, 484, 160);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 32px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('കച്ചവടം ഇനി ഈസിയായി', 512, 810);
  ctx.font = '19px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('ബിസിനസ്സ് ഓൺലൈൻ ആക്കാം • 0484 230 49 49', 512, 860);

  // Yellow Registration Plate: KL.15 A.1764
  ctx.fillStyle = '#facc15';
  ctx.fillRect(780, 780, 180, 100);
  ctx.strokeStyle = '#111111';
  ctx.lineWidth = 4;
  ctx.strokeRect(780, 780, 180, 100);

  ctx.fillStyle = '#111111';
  ctx.font = 'bold 32px "JetBrains Mono", monospace';
  ctx.fillText('KL.15', 870, 825);
  ctx.fillText('A.1764', 870, 865);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createSideTexture(isLeftPassengerSide: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Cream base
  ctx.fillStyle = '#f8efb9';
  ctx.fillRect(0, 0, 2048, 512);

  // Continuous Windows row
  ctx.fillStyle = '#1a2328';
  ctx.fillRect(100, 60, 1848, 125);

  // Cream Window Mullions / Vertical dividers
  ctx.fillStyle = '#f8efb9';
  for (let wx = 240; wx < 1900; wx += 145) {
    ctx.fillRect(wx, 60, 16, 125);
  }

  // Thin Red accent band above windows
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(0, 40, 2048, 16);

  // LOWER BODY: Red lower section
  ctx.fillStyle = '#cf1418';
  ctx.fillRect(0, 310, 2048, 202);

  // Double Red Chevron Speed Stripes (Iconic KSRTC Aanavandi arrow pattern)
  // Top stripe
  ctx.fillStyle = '#cf1418';
  ctx.beginPath();
  ctx.moveTo(80, 205);
  ctx.lineTo(1968, 205);
  ctx.lineTo(1948, 235);
  ctx.lineTo(100, 235);
  ctx.closePath();
  ctx.fill();

  // Bottom stripe
  ctx.beginPath();
  ctx.moveTo(110, 255);
  ctx.lineTo(1938, 255);
  ctx.lineTo(1918, 285);
  ctx.lineTo(130, 285);
  ctx.closePath();
  ctx.fill();

  // Bold Center Red Panel with Elephant Seal Emblem
  ctx.fillStyle = '#cf1418';
  ctx.beginPath();
  ctx.moveTo(1050, 195);
  ctx.lineTo(1420, 195);
  ctx.lineTo(1360, 310);
  ctx.lineTo(990, 310);
  ctx.closePath();
  ctx.fill();

  // Official KSRTC Elephant Seal Emblem (Round gold & green badge with two standing elephants)
  const emblemX = 1200;
  const emblemY = 252;
  ctx.beginPath();
  ctx.arc(emblemX, emblemY, 44, 0, Math.PI * 2);
  ctx.fillStyle = '#15803d'; // Green wreath circle
  ctx.fill();
  ctx.strokeStyle = '#facc15'; // Gold ring
  ctx.lineWidth = 6;
  ctx.stroke();

  // Two elephant silhouettes & conch shield inside emblem
  ctx.fillStyle = '#ffffff';
  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🐘🛡️🐘', emblemX, emblemY + 11);

  // Bold Red "SUPERFAST" Text Banner
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(660, 235, 310, 52);
  ctx.strokeStyle = '#cf1418';
  ctx.lineWidth = 4;
  ctx.strokeRect(660, 235, 310, 52);

  ctx.fillStyle = '#cf1418';
  ctx.font = 'italic 900 42px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SUPERFAST', 815, 275);

  // Stencils on lower red skirt: "BATTERY BOX" & "COURIER BOX"
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('BATTERY BOX', 620, 370);
  ctx.fillText('COURIER BOX', 1050, 370);

  // Registration plate on rear corner
  ctx.fillStyle = '#facc15';
  ctx.fillRect(1900, 240, 95, 55);
  ctx.fillStyle = '#111111';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('KL 15', 1948, 262);
  ctx.fillText('A 1764', 1948, 284);

  // If Passenger side: Draw the two distinct accordion entrance doors!
  if (isLeftPassengerSide) {
    [480, 1540].forEach(dx => {
      ctx.fillStyle = '#161819';
      ctx.fillRect(dx, 60, 90, 380);
      ctx.strokeStyle = '#cf1418';
      ctx.lineWidth = 6;
      ctx.strokeRect(dx, 60, 90, 380);

      // Glass door panes (Upper & lower)
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(dx + 10, 80, 30, 110);
      ctx.fillRect(dx + 50, 80, 30, 110);
      ctx.fillRect(dx + 10, 230, 30, 110);
      ctx.fillRect(dx + 50, 230, 30, 110);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Builds the complete 3D KSRTC Super Fast Bus Model matching the diagram
 */
export function buildKSRTCSuperFastBus(): THREE.Group {
  const bus = new THREE.Group();

  const length = 11.2;
  const width = 2.85;
  const height = 3.25;

  // 1. CHASSIS & LOWER UNDERCARRIAGE
  const chassisMat = new THREE.MeshLambertMaterial({ color: 0x181a1b });
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(width * 0.88, 0.45, length * 0.94), chassisMat);
  chassis.position.y = 0.55;
  chassis.castShadow = true;
  bus.add(chassis);

  // 2. MAIN BODY SHELL (Cream & Red two-tone)
  const bodyGeo = new THREE.BoxGeometry(width, height, length);

  // Material setup:
  // 0: Right side (+X)
  // 1: Left side (-X)
  // 2: Top / Roof (+Y)
  // 3: Bottom (-Y)
  // 4: Front (+Z)
  // 5: Rear (-Z)
  const frontTex = createFrontTexture();
  const rearTex = createRearTexture();
  const sideRightTex = createSideTexture(false);
  const sideLeftTex = createSideTexture(true);

  // Roof cream material
  const roofMat = new THREE.MeshLambertMaterial({ color: 0xf8efb9 });
  const underMat = new THREE.MeshLambertMaterial({ color: 0x111111 });

  const bodyMaterials = [
    new THREE.MeshLambertMaterial({ map: sideRightTex }), // Right side
    new THREE.MeshLambertMaterial({ map: sideLeftTex }),  // Left side (passenger doors)
    roofMat,                                            // Top roof
    underMat,                                           // Bottom
    new THREE.MeshLambertMaterial({ map: frontTex }),     // Front
    new THREE.MeshLambertMaterial({ map: rearTex }),      // Rear
  ];

  const body = new THREE.Mesh(bodyGeo, bodyMaterials);
  body.position.y = height / 2 + 0.45;
  body.castShadow = true;
  body.receiveShadow = true;
  bus.add(body);

  // 3. AERODYNAMIC ROOF COWLS & VENTILATION DUCTS
  const cowlMat = new THREE.MeshLambertMaterial({ color: 0xe5dfaa });
  [-2.2, 0, 2.2].forEach(cz => {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 0.85), cowlMat);
    vent.position.set(0, height + 0.52, cz);
    vent.castShadow = true;
    bus.add(vent);
  });

  // Longitudinal roof luggage carrier / reinforcement rails
  const railMat = new THREE.MeshLambertMaterial({ color: 0x6b7280 });
  [-1.0, 1.0].forEach(rx => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, length * 0.72, 8), railMat);
    rail.rotateX(Math.PI / 2);
    rail.position.set(rx, height + 0.58, -0.4);
    bus.add(rail);
  });

  // 4. FRONT WINDSHIELD WIPER ARMS & HEAVY-DUTY SIDE MIRRORS
  const mirrorMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.8 });

  // Dual front windshield wipers
  [-0.55, 0.55].forEach(wx => {
    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.65, 0.02), mirrorMat);
    wiper.position.set(wx, 2.15, length / 2 + 0.03);
    wiper.rotation.z = -0.28;
    bus.add(wiper);
  });

  // Giant Elephant Ear Side Rearview Mirrors (Essential for Kerala Buses!)
  [-width / 2 - 0.18, width / 2 + 0.18].forEach((mx, idx) => {
    const mirrorGroup = new THREE.Group();
    // Curved stalk
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.65, 8), mirrorMat);
    stalk.rotation.z = idx === 0 ? Math.PI / 4 : -Math.PI / 4;
    mirrorGroup.add(stalk);

    // Large rectangular mirror head
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.42, 0.08), mirrorMat);
    head.position.set(idx === 0 ? -0.15 : 0.15, 0.22, 0.12);

    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.38), silverMat);
    glass.position.set(idx === 0 ? -0.15 : 0.15, 0.22, 0.07);
    glass.rotation.y = Math.PI;

    mirrorGroup.add(head, glass);
    mirrorGroup.position.set(mx, 2.55, length / 2 - 0.4);
    bus.add(mirrorGroup);
  });

  // 5. 6 HEAVY-DUTY COMMERCIAL BUS WHEELS (Front single, rear dual-tires)
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x121314 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.7, roughness: 0.3 });
  const hubMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });

  function createBusWheel(x: number, z: number, isDual = false) {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(x, 0.55, z);

    const tireWidth = isDual ? 0.62 : 0.36;
    const tireRadius = 0.55;

    // Tire
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(tireRadius, tireRadius, tireWidth, 20), tireMat);
    tire.rotateZ(Math.PI / 2);
    tire.castShadow = true;
    wheelGroup.add(tire);

    // Rim
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, tireWidth + 0.02, 16), rimMat);
    rim.rotateZ(Math.PI / 2);
    wheelGroup.add(rim);

    // Hub cap with 10 wheel nuts
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, tireWidth + 0.04, 12), hubMat);
    hub.rotateZ(Math.PI / 2);
    wheelGroup.add(hub);

    for (let b = 0; b < 8; b++) {
      const angle = (b / 8) * Math.PI * 2;
      const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, tireWidth + 0.05, 6), silverMat);
      nut.rotateZ(Math.PI / 2);
      nut.position.set(x < 0 ? -0.01 : 0.01, Math.sin(angle) * 0.24, Math.cos(angle) * 0.24);
      wheelGroup.add(nut);
    }

    return wheelGroup;
  }

  // Front Wheels
  bus.add(createBusWheel(-width / 2 + 0.12, 3.4, false));
  bus.add(createBusWheel(width / 2 - 0.12, 3.4, false));

  // Rear Wheels (Dual tires on each side for heavy Super Fast chassis)
  bus.add(createBusWheel(-width / 2 + 0.22, -2.8, true));
  bus.add(createBusWheel(width / 2 - 0.22, -2.8, true));

  // Rubber rear mud flaps
  const flapMat = new THREE.MeshLambertMaterial({ color: 0x090a0a });
  [-width / 2 + 0.25, width / 2 - 0.25].forEach(fx => {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.42, 0.04), flapMat);
    flap.position.set(fx, 0.35, -3.5);
    bus.add(flap);
  });

  return bus;
}
