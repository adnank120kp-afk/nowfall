import * as THREE from 'three';

/**
 * Procedurally generates high-resolution canvas textures and 3D mesh for the
 * authentic Kerala Private Bus ("ERANHIKKAL - 2020 CLUB EDITION") based strictly
 * on the uploaded livery net diagram:
 * - Livery: Hot Pink / Magenta (#e11d84) with crisp white double speed stripes
 * - Front / Glass: "SAMMAS", "MASHA ALLAH", Kozhikode - Manjeri Limited Stop
 * - Front Fascia: Viking Lion shield mascot, "SPORTS MIND", "TRAVEL MACHINE", KL 10 AV 8847
 * - Sides: Bold cursive "ERANHIKKAL - THE SPEED OF BUS KERALA", Stunt Biker wheelie graphic,
 *   winged SF badge, twin entrance doors with floral decals, sponsor strip (FAYGO, FALKEN, SPYDER, MONSTER)
 * - LED Roof Board: "KOZHIKODE - 2020 CLUB EDITION - MANJERI", "3D LED LIGHTS", "4K DJ FLOOR"
 * - Rear: Back glass with SAMMAS & leaf border, huge Viking mascot, "SUBSCRIBE FOR MORE", "Welcome" badge
 */

function createPrivateFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Electric Hot Pink base
  ctx.fillStyle = '#db2777';
  ctx.fillRect(0, 0, 1024, 1024);

  // Top Sunshade / Visor banner
  ctx.fillStyle = '#9d174d';
  ctx.fillRect(0, 0, 1024, 80);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('EXECUTIVE COACH • M4 DESIGNS', 512, 50);

  // Front Glass Area (Windshield)
  ctx.fillStyle = '#111827';
  ctx.fillRect(50, 90, 924, 380);
  ctx.strokeStyle = '#030712';
  ctx.lineWidth = 12;
  ctx.strokeRect(50, 90, 924, 380);

  // Front Glass Top: "SAMMAS" in glowing yellow/pink font
  ctx.fillStyle = '#facc15';
  ctx.font = 'italic 900 88px "Syne", sans-serif';
  ctx.shadowColor = '#ec4899';
  ctx.shadowBlur = 15;
  ctx.fillText('SAMMAS', 512, 190);
  ctx.shadowBlur = 0;

  // "MASHA ALLAH" strip
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Syne", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('••• MASHA ALLAH •••', 512, 230);
  ctx.letterSpacing = '0px';

  // Front Route Board inside windshield: MANJERI - KOZHIKODE LIMITED STOP
  ctx.fillStyle = '#be185d';
  ctx.fillRect(100, 270, 824, 150);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 6;
  ctx.strokeRect(100, 270, 824, 150);

  // Route Left: MANJERI
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('മഞ്ചേരി', 220, 325);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 22px "Syne", sans-serif';
  ctx.fillText('MANJERI', 220, 360);

  // Center Speedometer & Limited Stop badge
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.roundRect(400, 285, 224, 55, 10);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "Syne", sans-serif';
  ctx.fillText('LIMITED STOP', 512, 320);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 16px "Syne", sans-serif';
  ctx.fillText('TURBO CHARGED POWERFUL', 512, 360);

  // Route Right: KOZHIKODE
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('കോഴിക്കോട്', 800, 325);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 22px "Syne", sans-serif';
  ctx.fillText('KOZHIKODE', 800, 360);

  // Divider lines inside route board
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(330, 285);
  ctx.lineTo(330, 405);
  ctx.moveTo(694, 285);
  ctx.lineTo(694, 405);
  ctx.stroke();

  // Left & Right Viking Lion Shield Mascots on the windshield corners
  [140, 884].forEach(mx => {
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(mx, 155, 55, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.fillStyle = '#f97316';
    ctx.font = '48px sans-serif';
    ctx.fillText('🦁', mx, 172);
  });

  // Center Windshield Wiper base
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(504, 90, 16, 380);

  // Body Below Windshield: Hot Pink with White Accents
  // "SPORTS MIND" banner
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 900 32px "Syne", sans-serif';
  ctx.fillText('SPORTS MIND', 512, 510);

  // Aggressive Angular LED Headlight Brows
  // Left Headlight Cluster
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(90, 560);
  ctx.lineTo(300, 560);
  ctx.lineTo(260, 640);
  ctx.lineTo(90, 640);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Multi-LED projector eyes inside left headlight
  [130, 180, 230].forEach(lx => {
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(lx, 600, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  // Right Headlight Cluster
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(934, 560);
  ctx.lineTo(724, 560);
  ctx.lineTo(764, 640);
  ctx.lineTo(934, 640);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 8;
  ctx.stroke();

  [894, 844, 794].forEach(rx => {
    ctx.fillStyle = '#06b6d4';
    ctx.beginPath();
    ctx.arc(rx, 600, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();
  });

  // Star accents near lights
  ctx.fillStyle = '#fef08a';
  ctx.font = '28px sans-serif';
  ctx.fillText('★★★★', 180, 680);
  ctx.fillText('★★★★', 844, 680);

  // Center Hexagonal Sports Radiator Grille
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.moveTo(340, 580);
  ctx.lineTo(684, 580);
  ctx.lineTo(650, 750);
  ctx.lineTo(374, 750);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 10;
  ctx.stroke();

  // "TRAVEL MACHINE" stenciled in center of grille
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px "Syne", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('TRAVEL MACHINE', 512, 675);
  ctx.letterSpacing = '0px';

  // Lower White Aero Chin / Front Bumper
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(80, 780, 864, 180);
  ctx.strokeStyle = '#be185d';
  ctx.lineWidth = 12;
  ctx.strokeRect(80, 780, 864, 180);

  // Center Pink Inset
  ctx.fillStyle = '#db2777';
  ctx.fillRect(280, 810, 464, 120);

  // Yellow Taxi Plate: KL 10 AV 8847 (Malappuram / Manjeri RTO)
  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(362, 835, 300, 70);
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 6;
  ctx.strokeRect(362, 835, 300, 70);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.fillText('KL 10 AV 8847', 512, 882);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createPrivateRearTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Magenta / Hot Pink base
  ctx.fillStyle = '#db2777';
  ctx.fillRect(0, 0, 1024, 1024);

  // Top Spoiler strip
  ctx.fillStyle = '#be185d';
  ctx.fillRect(0, 0, 1024, 80);

  // Rear Glass Area
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(80, 90, 864, 380);
  ctx.strokeStyle = '#020617';
  ctx.lineWidth = 14;
  ctx.strokeRect(80, 90, 864, 380);

  // Green Leaf / Ivy Garland arch on back glass top
  ctx.fillStyle = '#15803d';
  ctx.font = '36px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌿 🍇 🍃 🍇 🌿 🍇 🍃 🍇 🌿', 512, 140);

  // "SAMMAS" in cursive gold
  ctx.fillStyle = '#facc15';
  ctx.font = 'italic 900 78px "Syne", cursive, sans-serif';
  ctx.fillText('SAMMAS', 512, 230);

  // Route sub-strip on rear glass
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('കോഴിക്കോട്   ★   ലിമിറ്റഡ് സ്റ്റോപ്പ്   ★   മഞ്ചേരി', 512, 300);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.fillText('KOZHIKODE • LIMITED STOP • MANJERI', 512, 350);

  // Left & Right Vertical text banners: "SUBSCRIBE" & "FOR MORE"
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 36px "Syne", sans-serif';
  // Vertical left text
  const sub = 'SUBSCRIBE';
  for (let i = 0; i < sub.length; i++) {
    ctx.fillText(sub[i], 120, 520 + i * 42);
  }
  const more = 'FOR MORE';
  for (let i = 0; i < more.length; i++) {
    ctx.fillText(more[i], 904, 520 + i * 42);
  }

  // Giant Viking / Lion Mascot Shield in center
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(512, 600, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.fillStyle = '#f97316';
  ctx.font = '96px sans-serif';
  ctx.fillText('🦁', 512, 635);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Syne", sans-serif';
  ctx.fillText('M4 DESIGNS', 512, 735);

  // Center "Welcome" green illuminated oval plate
  ctx.fillStyle = '#15803d';
  ctx.beginPath();
  ctx.roundRect(332, 770, 360, 70, 35);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic bold 40px "Syne", cursive, sans-serif';
  ctx.fillText('Welcome', 512, 818);

  // Lower bumper & Yellow Taxi License Plate
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(80, 870, 864, 100);

  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(362, 885, 300, 70);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5;
  ctx.strokeRect(362, 885, 300, 70);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 36px "JetBrains Mono", monospace';
  ctx.fillText('KL 10 AV 8847', 512, 932);

  // Tail lights
  [140, 884].forEach(tx => {
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(tx - 35, 885, 70, 70);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(tx - 35, 885, 25, 70);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createPrivateSideTexture(isLeft: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Vivid Hot Pink / Magenta base
  ctx.fillStyle = '#db2777';
  ctx.fillRect(0, 0, 2048, 1024);

  // 1. TOP ROOF LED ROUTE DISPLAY BOARD (Green LED bar)
  ctx.fillStyle = '#064e3b'; // Dark emerald green
  ctx.fillRect(0, 0, 2048, 140);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 2036, 128);

  // LED Text along roof:
  ctx.textAlign = 'center';
  // 3D LED LIGHTS badge
  ctx.fillStyle = '#84cc16';
  ctx.font = 'bold 32px "Syne", sans-serif';
  ctx.fillText('3D LED', 100, 60);
  ctx.font = 'bold 20px "Syne", sans-serif';
  ctx.fillText('LIGHTS', 100, 95);

  // KOZHIKODE
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('കോഴിക്കോട്', 400, 70);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 26px "Syne", sans-serif';
  ctx.fillText('KOZHIKODE', 400, 105);

  // 2020 CLUB EDITION
  ctx.fillStyle = '#facc15';
  ctx.font = 'italic 900 48px "Syne", sans-serif';
  ctx.fillText('2020 CLUB EDITION', 1024, 65);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('★ 4K DIGITAL SOUND • LASER SHOW • DJ FLOOR ★', 1024, 105);

  // MANJERI
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('മഞ്ചേരി', 1640, 70);
  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 26px "Syne", sans-serif';
  ctx.fillText('MANJERI', 1640, 105);

  // 4K Badge Right
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 44px "Syne", sans-serif';
  ctx.fillText('4K', 1940, 70);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 18px "Syne", sans-serif';
  ctx.fillText('DIGITAL SOUND', 1940, 98);

  // Thin separator line below LED board
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 140, 2048, 12);

  // 2. WINDOW AREA
  // Window frames
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(60, 160, 1928, 250);

  // Individual tinted window panes with pillar dividers
  const numPanes = 8;
  const paneWidth = 1928 / numPanes;
  for (let i = 0; i < numPanes; i++) {
    const px = 60 + i * paneWidth;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(px + 10, 170, paneWidth - 20, 230);

    // Red floral hanging curtains inside windows
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(px + paneWidth / 2, 185, 24, 0, Math.PI);
    ctx.fill();

    // Chrome sliding window rail
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px + 10, 290);
    ctx.lineTo(px + paneWidth - 10, 290);
    ctx.stroke();
  }

  // 3. MAIN BODY SIDE PANEL (Pink with Graphics)
  // Yellow reflector dots under window line
  for (let rx = 100; rx < 1950; rx += 140) {
    ctx.fillStyle = '#facc15';
    ctx.fillRect(rx, 430, 45, 14);
  }

  // STUNT BIKER WHEELIE GRAPHIC (Left side of bus)
  const bikerX = isLeft ? 380 : 1660;
  ctx.fillStyle = '#111827';
  ctx.font = '100px sans-serif';
  ctx.fillText('🏍️', bikerX, 580);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 22px "Syne", sans-serif';
  ctx.fillText('STUNT TEAM', bikerX, 615);

  // WINGED "SF" EMBLEM BADGE
  const wingX = isLeft ? 1660 : 380;
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(wingX, 540, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic bold 36px "Syne", sans-serif';
  ctx.fillText('SF', wingX, 552);

  // Wings
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(wingX - 45, 540);
  ctx.lineTo(wingX - 100, 520);
  ctx.lineTo(wingX - 120, 550);
  ctx.moveTo(wingX + 45, 540);
  ctx.lineTo(wingX + 100, 520);
  ctx.lineTo(wingX + 120, 550);
  ctx.stroke();

  // MAIN CALLIGRAPHY TITLE: "ERANHIKKAL"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 900 115px "Syne", sans-serif';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 18;
  ctx.fillText('ERANHIKKAL', 1024, 550);
  ctx.shadowBlur = 0;

  // Malayalam subtitle
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 36px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('എരഞ്ഞിക്കൽ', 1024, 600);

  // Slogan: "THE SPEED OF BUS KERALA"
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px "Syne", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('THE SPEED OF BUS KERALA', 1024, 640);
  ctx.letterSpacing = '0px';

  // Sub-route text: KOZHIKODE • MANJERI
  ctx.fillStyle = '#fbcfe8';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('KOZHIKODE ➔ MANJERI', 1024, 675);

  // 4. DOUBLE WHITE LOWER SPEED STRIPES
  // Stripe 1
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 715, 2048, 26);
  // Stripe 2
  ctx.fillRect(0, 755, 2048, 36);

  // 5. LOWER RED SKIRT & SPONSOR LOGOS
  ctx.fillStyle = '#9d174d';
  ctx.fillRect(0, 810, 2048, 140);

  // Sponsor brand decals across bottom skirt: FAYGO, AMSOUTH, FALKEN, SPYDER, MONSTER
  const sponsors = [
    { name: 'FAYGO', x: 250 },
    { name: 'AMSOUTH', x: 620 },
    { name: 'FALKEN', x: 1024 },
    { name: 'SPYDER', x: 1420 },
    { name: 'MONSTER', x: 1800 },
  ];

  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic 900 32px "Syne", sans-serif';
  sponsors.forEach(sp => {
    ctx.fillText(sp.name, sp.x, 880);
  });

  // Stamp: KL 10 AV 8847 on rear quarter
  ctx.fillStyle = '#fbbf24';
  const stampX = isLeft ? 1920 : 120;
  ctx.fillRect(stampX - 70, 520, 140, 50);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 4;
  ctx.strokeRect(stampX - 70, 520, 140, 50);

  ctx.fillStyle = '#000000';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('KL 10', stampX, 542);
  ctx.fillText('AV 8847', stampX, 562);

  // 6. PASSENGER DOORS (Twin folding accordion doors on Passenger side)
  if (!isLeft) {
    // Front passenger door (near front wheel) and Rear door (near rear wheel)
    [320, 1720].forEach(dx => {
      // Door frame
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(dx - 65, 220, 130, 590);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      ctx.strokeRect(dx - 65, 220, 130, 590);

      // Two tall narrow glass viewing panels
      [-30, 30].forEach(vx => {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(dx + vx - 20, 240, 40, 360);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(dx + vx - 20, 240, 40, 360);

        // Floral sticker art on door glass (matching diagram!)
        ctx.fillStyle = '#f43f5e';
        ctx.font = '24px sans-serif';
        ctx.fillText('🌸', dx + vx, 320);
        ctx.fillText('🌸', dx + vx, 420);
        ctx.fillText('🌸', dx + vx, 520);
      });

      // Door chrome handrails
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(dx, 400);
      ctx.lineTo(dx, 750);
      ctx.stroke();
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createPrivateWheelTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Dark tire rubber outer
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(0, 0, 512, 512);

  // White fancy stylized Kerala Private Bus wheel cover (as shown in net diagram!)
  ctx.beginPath();
  ctx.arc(256, 256, 210, 0, Math.PI * 2);
  ctx.fillStyle = '#f8fafc';
  ctx.fill();
  ctx.strokeStyle = '#db2777'; // Pink accent rim
  ctx.lineWidth = 14;
  ctx.stroke();

  // Spiral / Star spoke design
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(256, 256);
    ctx.lineTo(256 + Math.cos(angle) * 190, 256 + Math.sin(angle) * 190);
    ctx.stroke();

    // Hot pink spoke accents
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(256 + Math.cos(angle + 0.2) * 130, 256 + Math.sin(angle + 0.2) * 130, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  // Center chrome hub
  ctx.beginPath();
  ctx.arc(256, 256, 55, 0, Math.PI * 2);
  ctx.fillStyle = '#cbd5e1';
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Center logo
  ctx.fillStyle = '#db2777';
  ctx.font = 'bold 28px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SF', 256, 266);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Builds the complete 3D Kerala Private Bus ("ERANHIKKAL")
 */
export function buildKeralaPrivateBus(): THREE.Group {
  const busGroup = new THREE.Group();

  const length = 11.2;
  const width = 2.65;
  const height = 3.35;
  const cabinY = height / 2 + 0.75;

  // High-resolution textures matching the diagram
  const frontTex = createPrivateFrontTexture();
  const rearTex = createPrivateRearTexture();
  const leftSideTex = createPrivateSideTexture(true);
  const rightSideTex = createPrivateSideTexture(false);
  const wheelTex = createPrivateWheelTexture();

  // Materials
  const frontMat = new THREE.MeshLambertMaterial({ map: frontTex });
  const rearMat = new THREE.MeshLambertMaterial({ map: rearTex });
  const leftSideMat = new THREE.MeshLambertMaterial({ map: leftSideTex });
  const rightSideMat = new THREE.MeshLambertMaterial({ map: rightSideTex });
  const roofMat = new THREE.MeshLambertMaterial({ color: 0xdb2777 }); // Hot pink roof
  const bottomMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 }); // Dark chassis bottom

  // Standard Box Face Materials
  const busMaterials = [
    rightSideMat, // +X (Passenger side with entrance doors)
    leftSideMat,  // -X (Driver side)
    roofMat,      // +Y (Roof)
    bottomMat,    // -Y (Bottom)
    frontMat,     // +Z (Front)
    rearMat,      // -Z (Rear)
  ];

  // 1. MAIN BUS CABIN BOX
  const cabinGeo = new THREE.BoxGeometry(width, height, length);
  const cabin = new THREE.Mesh(cabinGeo, busMaterials);
  cabin.position.y = cabinY;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  busGroup.add(cabin);

  // 2. ROOF LED ROUTE DISPLAY POD (Crowned along the top front roof)
  const podGeo = new THREE.BoxGeometry(width * 0.94, 0.45, 2.2);
  const podMat = new THREE.MeshLambertMaterial({ color: 0x064e3b });
  const pod = new THREE.Mesh(podGeo, podMat);
  pod.position.set(0, cabinY + height / 2 + 0.22, length / 2 - 1.2);
  busGroup.add(pod);

  // Front face of the roof LED pod: "KOZHIKODE - MANJERI"
  const podCanvas = document.createElement('canvas');
  podCanvas.width = 512;
  podCanvas.height = 128;
  const pctx = podCanvas.getContext('2d')!;
  pctx.fillStyle = '#064e3b';
  pctx.fillRect(0, 0, 512, 128);
  pctx.fillStyle = '#10b981';
  pctx.font = 'bold 36px "Syne", sans-serif';
  pctx.textAlign = 'center';
  pctx.fillText('2020 CLUB EDITION', 256, 50);
  pctx.fillStyle = '#facc15';
  pctx.font = 'bold 32px "Noto Sans Malayalam", sans-serif';
  pctx.fillText('കോഴിക്കോട് • മഞ്ചേരി', 256, 100);

  const podTex = new THREE.CanvasTexture(podCanvas);
  const podSign = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.92, 0.4), new THREE.MeshBasicMaterial({ map: podTex }));
  podSign.position.set(0, cabinY + height / 2 + 0.22, length / 2 - 0.08);
  busGroup.add(podSign);

  // 3. REAR SPORT SPOILER & FIN
  const spoilerMat = new THREE.MeshLambertMaterial({ color: 0xdb2777 });
  const wing = new THREE.Mesh(new THREE.BoxGeometry(width + 0.1, 0.12, 0.6), spoilerMat);
  wing.position.set(0, cabinY + height / 2 + 0.35, -length / 2 + 0.3);
  busGroup.add(wing);

  [-width / 2 + 0.15, width / 2 - 0.15].forEach(sx => {
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.4), spoilerMat);
    strut.position.set(sx, cabinY + height / 2 + 0.18, -length / 2 + 0.3);
    busGroup.add(strut);
  });

  // 4. FRONT SHARP BUMPER & LOWER CHIN SPOILER
  const bumperMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(width + 0.14, 0.35, 0.45), bumperMat);
  bumper.position.set(0, 0.85, length / 2 + 0.15);
  busGroup.add(bumper);

  // Lower neon/LED glow splitter (Cyan LED underglow famous in Kerala private buses!)
  const neonGlowMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.85 });
  const underglow = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.95, length * 0.9), neonGlowMat);
  underglow.rotateX(-Math.PI / 2);
  underglow.position.set(0, 0.3, 0);
  busGroup.add(underglow);

  // 5. GIANT ELEPHANT-EAR REARVIEW MIRRORS (Hot Pink housings)
  const mirrorCapMat = new THREE.MeshLambertMaterial({ color: 0xec4899 });
  const stalkMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

  [[-width / 2 - 0.32, 1], [width / 2 + 0.32, -1]].forEach(([mx, dir]) => {
    const mirrorGroup = new THREE.Group();

    // Curved stalk arm extending from bus A-pillar
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 8), stalkMat);
    stalk.rotation.z = (Math.PI / 3) * dir;
    stalk.position.set(0, 0, 0);
    mirrorGroup.add(stalk);

    // Large vertical mirror head
    const mirrorHead = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.1), mirrorCapMat);
    mirrorHead.position.set(0.2 * dir, 0.3, 0.25);
    mirrorGroup.add(mirrorHead);

    // Glass face
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15, 0.6),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 })
    );
    glass.position.set(0.2 * dir, 0.3, 0.25 - 0.055);
    glass.rotation.y = Math.PI;
    mirrorGroup.add(glass);

    mirrorGroup.position.set(mx, cabinY + 0.3, length / 2 - 0.2);
    busGroup.add(mirrorGroup);
  });

  // 6. WHEELS & FANCY WHEEL CAPS (KL 10 Private Bus Style)
  const wheelRadius = 0.58;
  const tireWidth = 0.38;
  const wheelCapMat = new THREE.MeshBasicMaterial({ map: wheelTex });
  const tireRubberMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  function createWheelAssembly(isOuterRight: boolean) {
    const wGroup = new THREE.Group();

    // Rubber tire cylinder
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(wheelRadius, wheelRadius, tireWidth, 18), tireRubberMat);
    tire.rotateZ(Math.PI / 2);
    tire.castShadow = true;
    wGroup.add(tire);

    // Outer wheel cap disc
    const capDisc = new THREE.Mesh(new THREE.CircleGeometry(wheelRadius * 0.92, 18), wheelCapMat);
    if (isOuterRight) {
      capDisc.rotateY(Math.PI / 2);
      capDisc.position.x = tireWidth / 2 + 0.01;
    } else {
      capDisc.rotateY(-Math.PI / 2);
      capDisc.position.x = -tireWidth / 2 - 0.01;
    }
    wGroup.add(capDisc);

    return wGroup;
  }

  // Front Single Wheels
  const frontZ = length / 2 - 2.4;
  const frontWheelR = createWheelAssembly(true);
  frontWheelR.position.set(width / 2 + 0.02, wheelRadius, frontZ);
  busGroup.add(frontWheelR);

  const frontWheelL = createWheelAssembly(false);
  frontWheelL.position.set(-width / 2 - 0.02, wheelRadius, frontZ);
  busGroup.add(frontWheelL);

  // Rear Dual Commercial Wheels
  const rearZ = -length / 2 + 2.8;
  // Right dual
  const rearWheelR = createWheelAssembly(true);
  rearWheelR.position.set(width / 2 + 0.02, wheelRadius, rearZ);
  busGroup.add(rearWheelR);
  const rearWheelRInner = createWheelAssembly(true);
  rearWheelRInner.position.set(width / 2 - tireWidth - 0.04, wheelRadius, rearZ);
  busGroup.add(rearWheelRInner);

  // Left dual
  const rearWheelL = createWheelAssembly(false);
  rearWheelL.position.set(-width / 2 - 0.02, wheelRadius, rearZ);
  busGroup.add(rearWheelL);
  const rearWheelLInner = createWheelAssembly(false);
  rearWheelLInner.position.set(-width / 2 + tireWidth + 0.04, wheelRadius, rearZ);
  busGroup.add(rearWheelLInner);

  // Mud flaps on rear wheel arches
  const flapMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  [-width / 2, width / 2].forEach(fx => {
    const flap = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.04), flapMat);
    flap.position.set(fx, wheelRadius - 0.1, rearZ - wheelRadius - 0.2);
    busGroup.add(flap);
  });

  return busGroup;
}
