import * as THREE from 'three';
import { buildKSRTCSuperFastBus } from './KSRTCBusBuilder';
import { buildKeralaPrivateBus } from './KeralaPrivateBusBuilder';

/**
 * Procedurally creates textures and models for the authentic Kerala KSRTC Bus Stand & Depot:
 * - Broad concrete terminal apron with marked bays
 * - Grand arched passenger terminal canopy with steel trusses
 * - Official bilingual KSRTC Depot signboard & Kerala Elephant Seal
 * - Station Master & Enquiry office with ticket counter & LED departure schedule
 * - Passenger waiting platform with benches, tea stall, and water kiosk
 * - High-mast yard lighting tower
 * - Stationed KSRTC buses ready for boarding
 */

function createDepotSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 384;
  const ctx = canvas.getContext('2d')!;

  // Deep Crimson KSRTC Red Background
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(0, 0, 1536, 384);

  // Outer Gold Trim
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 14;
  ctx.strokeRect(14, 14, 1508, 356);

  // Inner subtle dark frame
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 4;
  ctx.strokeRect(28, 28, 1480, 328);

  // Kerala State Road Transport Corporation English Top Header
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 36px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText('KERALA STATE ROAD TRANSPORT CORPORATION', 768, 70);

  // Main Malayalam Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('കേരള സ്റ്റേറ്റ് റോഡ് ട്രാൻസ്പോർട്ട് കോർപ്പറേഷൻ', 768, 160);

  // Depot Subtitle & Bus Terminal
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 48px "Noto Sans Malayalam", "Syne", sans-serif';
  ctx.fillText('കിഴക്കുംപുറം ബസ് ടെർമിനൽ & സബ് ഡിപ്പോ • KIZHAKKUMPURAM DEPOT', 768, 235);

  // Lower Info strip
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(100, 275, 1336, 68);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 4;
  ctx.strokeRect(100, 275, 1336, 68);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 32px "JetBrains Mono", monospace';
  ctx.fillText('24x7 ENQUIRY: 0484-2452244 • ONLINE: WWW.KERALARTC.COM', 768, 320);

  // Left & Right KSRTC Elephant Seal Emblem badges
  [160, 1376].forEach(ex => {
    ctx.beginPath();
    ctx.arc(ex, 170, 75, 0, Math.PI * 2);
    ctx.fillStyle = '#15803d'; // Green wreath
    ctx.fill();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '54px sans-serif';
    ctx.fillText('🐘🛡️🐘', ex, 188);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createScheduleBoardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d')!;

  // Dark LCD / LED display background
  ctx.fillStyle = '#090d10';
  ctx.fillRect(0, 0, 1024, 768);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 1004, 748);

  // Header
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(15, 15, 994, 90);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 38px "Noto Sans Malayalam", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KSRTC ബസ് സമയവിവരം • DEPARTURE SCHEDULE', 512, 72);

  // Columns: Time | Destination | Type | Bay | Status
  const headers = ['TIME', 'DESTINATION', 'SERVICE', 'BAY', 'STATUS'];
  const colX = [80, 320, 620, 780, 910];

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  headers.forEach((h, idx) => {
    ctx.fillText(h, colX[idx], 145);
  });

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(30, 165);
  ctx.lineTo(994, 165);
  ctx.stroke();

  // Schedule Rows
  const rows = [
    { t: '17:45', d: 'THIRUVANANTHAPURAM', s: 'SUPER FAST', bay: 'BAY 1', st: 'BOARDING', col: '#4ade80' },
    { t: '18:10', d: 'KOZHIKODE (Via GVR)', s: 'FAST PASSENGER', bay: 'BAY 2', st: 'ON TIME', col: '#facc15' },
    { t: '18:30', d: 'ALAPPUZHA TOWN', s: 'ORDINARY', bay: 'BAY 3', st: 'ON TIME', col: '#facc15' },
    { t: '19:00', d: 'KOTTAYAM / PALA', s: 'SUPER DELUXE', bay: 'BAY 1', st: 'EXPECTED', col: '#38bdf8' },
    { t: '19:40', d: 'BANGALORE (Via SLM)', s: 'SWIFT SCANIA', bay: 'BAY 4', st: 'BOOKING OPEN', col: '#a78bfa' },
    { t: '20:15', d: 'SULTHAN BATHERY', s: 'MINNAL EXPRESS', bay: 'BAY 2', st: 'ON TIME', col: '#facc15' },
    { t: '21:00', d: 'MUNNAR HILL EXPRESS', s: 'SUPER FAST', bay: 'BAY 1', st: 'ON TIME', col: '#facc15' },
  ];

  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  rows.forEach((r, idx) => {
    const y = 220 + idx * 65;
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(r.t, colX[0], y);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(r.d, colX[1], y);

    ctx.fillStyle = '#fbbf24';
    ctx.fillText(r.s, colX[2], y);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText(r.bay, colX[3], y);

    ctx.fillStyle = r.col;
    ctx.fillText(r.st, colX[4], y);
  });

  // Bottom Notice
  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 24px "Noto Sans Malayalam", sans-serif';
  ctx.fillText('ആനവണ്ടിയിൽ യാത്ര ചെയ്യൂ • യാത്രക്കാരുടെ സുരക്ഷിതത്വം ഞങ്ങളുടെ ഉത്തരവാദിത്തം', 512, 715);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createEnquiryOfficeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Wall color (classic Kerala government office sky blue & cream)
  ctx.fillStyle = '#bae6fd';
  ctx.fillRect(0, 0, 1024, 512);

  // Top header sign: "അന്വേഷണം / കൺട്രോൾ റൂം - STATION MASTER"
  ctx.fillStyle = '#b91c1c';
  ctx.fillRect(40, 30, 944, 90);
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 30, 944, 90);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px "Noto Sans Malayalam", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('അന്വേഷണം • റിസർവേഷൻ • കൺട്രോൾ റൂം', 512, 75);
  ctx.fillStyle = '#fef08a';
  ctx.font = 'bold 24px "Syne", sans-serif';
  ctx.fillText('ENQUIRY • RESERVATION • STATION MASTER OFFICE', 512, 106);

  // Ticket counter windows
  [180, 512, 844].forEach((wx, i) => {
    // Window opening
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(wx - 110, 160, 220, 260);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 8;
    ctx.strokeRect(wx - 110, 160, 220, 260);

    // Grill bars
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 4;
    for (let bx = wx - 90; bx <= wx + 90; bx += 20) {
      ctx.beginPath();
      ctx.moveTo(bx, 170);
      ctx.lineTo(bx, 370);
      ctx.stroke();
    }

    // Glass reflection
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.fillRect(wx - 100, 170, 200, 200);

    // Counter label
    ctx.fillStyle = '#facc15';
    ctx.fillRect(wx - 95, 385, 190, 30);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px "Noto Sans Malayalam", sans-serif';
    const label = i === 0 ? 'ടിക്കറ്റ് കൗണ്ടർ 1' : i === 1 ? 'അന്വേഷണം (ENQ)' : 'സ്റ്റേഷൻ മാസ്റ്റർ';
    ctx.fillText(label, wx, 406);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function createBayMarkingTexture(bayName: string, destination: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Dark tarmac background
  ctx.fillStyle = '#26292d';
  ctx.fillRect(0, 0, 512, 256);

  // Yellow hazard box outline
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 14;
  ctx.strokeRect(15, 15, 482, 226);

  // Text
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 54px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(bayName, 256, 95);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Noto Sans Malayalam", sans-serif';
  ctx.fillText(destination, 256, 175);

  // Chevron directional arrows
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 42px sans-serif';
  ctx.fillText('▲ ▲ ▲', 256, 222);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

export interface KSRTCStandBuildResult {
  group: THREE.Group;
  colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[];
  buses: THREE.Group[];
}

/**
 * Builds the complete authentic KSRTC Bus Stand & Terminal complex
 */
export function buildKSRTCBusStand(x: number, z: number): KSRTCStandBuildResult {
  const standGroup = new THREE.Group();
  const colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[] = [];
  const buses: THREE.Group[] = [];

  // MATERIALS
  const tarmacMat = new THREE.MeshLambertMaterial({ color: 0x2b2e32 });
  const platformMat = new THREE.MeshLambertMaterial({ color: 0xc8c3b5 });
  const curbMat = new THREE.MeshLambertMaterial({ color: 0x9ca3af });
  const hazardMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
  const trussMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // KSRTC Red steel columns
  const roofMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a, side: THREE.DoubleSide }); // Royal blue curved tin canopy
  const silverMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.6, roughness: 0.3 });
  const steelBenchMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });

  // 1. BROAD TERMINAL APRON (CONCOURSE TARMAC)
  // Expansive 60m x 48m tarmac surface
  const apronGeo = new THREE.PlaneGeometry(62, 50);
  apronGeo.rotateX(-Math.PI / 2);
  const apron = new THREE.Mesh(apronGeo, tarmacMat);
  apron.position.set(0, 0.08, 0);
  apron.receiveShadow = true;
  standGroup.add(apron);

  // Connecting Tarmac ramp towards Highway SH-17 (Z = 0)
  const entryRampGeo = new THREE.PlaneGeometry(24, 16);
  entryRampGeo.rotateX(-Math.PI / 2);
  const entryRamp = new THREE.Mesh(entryRampGeo, tarmacMat);
  entryRamp.position.set(0, 0.08, 28);
  entryRamp.receiveShadow = true;
  standGroup.add(entryRamp);

  // Painted boundary curb / perimeter raised wall around the yard
  const pWallMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  // Back boundary wall
  const bWall = new THREE.Mesh(new THREE.BoxGeometry(62, 1.4, 0.5), pWallMat);
  bWall.position.set(0, 0.7, -24.8);
  standGroup.add(bWall);
  colliders.push({ minX: x - 31, maxX: x + 31, minZ: z - 25.5, maxZ: z - 24.0 });

  // Left boundary wall
  const lWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 50), pWallMat);
  lWall.position.set(-30.8, 0.7, 0);
  standGroup.add(lWall);
  colliders.push({ minX: x - 31.5, maxX: x - 30.0, minZ: z - 25, maxZ: z + 25 });

  // Right boundary wall
  const rWall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 50), pWallMat);
  rWall.position.set(30.8, 0.7, 0);
  standGroup.add(rWall);
  colliders.push({ minX: x + 30.0, maxX: x + 31.5, minZ: z - 25, maxZ: z + 25 });

  // 2. RAISED PASSENGER WAITING PLATFORM
  // Dimensions: 48m long x 9m wide x 0.65m high
  const platWidth = 48;
  const platDepth = 9.5;
  const platHeight = 0.65;
  const platZ = -12;

  const platform = new THREE.Mesh(new THREE.BoxGeometry(platWidth, platHeight, platDepth), platformMat);
  platform.position.set(0, platHeight / 2 + 0.08, platZ);
  platform.castShadow = true;
  platform.receiveShadow = true;
  standGroup.add(platform);

  // Curb hazard stripe front edge (Black & Yellow Kerala bus terminal curb stones)
  for (let ci = -platWidth / 2 + 1; ci < platWidth / 2; ci += 2) {
    const curb = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, platHeight + 0.02, 0.18),
      Math.floor(ci) % 4 === 0 ? hazardMat : curbMat
    );
    curb.position.set(ci, platHeight / 2 + 0.08, platZ + platDepth / 2 + 0.08);
    standGroup.add(curb);
  }

  // 3. PASSENGER TERMINAL CANOPY ROOF (High Arched Steel Truss Canopy)
  const canopyHeight = 6.8;
  const canopyDepth = 15.0;
  const canopyWidth = 52.0;

  // Steel Support Columns (Red lattice posts along front and rear of platform)
  const columnPositions = [
    [-22, platZ - 3.5], [-11, platZ - 3.5], [0, platZ - 3.5], [11, platZ - 3.5], [22, platZ - 3.5],
    [-22, platZ + 3.8], [-11, platZ + 3.8], [0, platZ + 3.8], [11, platZ + 3.8], [22, platZ + 3.8],
  ];

  columnPositions.forEach(([cx, cz]) => {
    const colGroup = new THREE.Group();
    // Heavy base pillar
    const basePillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 1.2, 8), trussMat);
    basePillar.position.y = 0.6;
    basePillar.castShadow = true;
    colGroup.add(basePillar);

    // Steel column pipe
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, canopyHeight, 8), trussMat);
    pipe.position.y = canopyHeight / 2;
    pipe.castShadow = true;
    colGroup.add(pipe);

    // Truss bracket capital
    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 0.6), trussMat);
    bracket.position.y = canopyHeight - 0.2;
    colGroup.add(bracket);

    colGroup.position.set(cx, 0.08, cz);
    standGroup.add(colGroup);
  });

  // Arched Curved Canopy Roof
  const roofCurveGeo = new THREE.CylinderGeometry(
    canopyDepth * 0.72,
    canopyDepth * 0.72,
    canopyWidth,
    28,
    1,
    true,
    Math.PI * 0.18,
    Math.PI * 0.64
  );
  roofCurveGeo.rotateZ(Math.PI / 2);
  const canopyRoof = new THREE.Mesh(roofCurveGeo, roofMat);
  canopyRoof.position.set(0, canopyHeight + 1.2, platZ);
  canopyRoof.castShadow = true;
  canopyRoof.receiveShadow = true;
  standGroup.add(canopyRoof);

  // Roof longitudinal steel purlins / fascia beams
  [-canopyDepth * 0.38, 0, canopyDepth * 0.38].forEach(pz => {
    const purlin = new THREE.Mesh(new THREE.BoxGeometry(canopyWidth + 0.5, 0.25, 0.3), trussMat);
    purlin.position.set(0, canopyHeight + 1.8, platZ + pz);
    standGroup.add(purlin);
  });

  // 4. GRAND ENTRANCE SIGNBOARD (Bilingual KSRTC Title + Emblem)
  const signTex = createDepotSignTexture();
  const signMat = new THREE.MeshLambertMaterial({ map: signTex });
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(22.0, 4.4, 0.35), signMat);
  signBoard.position.set(0, canopyHeight + 3.2, platZ + platDepth / 2 + 0.2);
  signBoard.castShadow = true;
  standGroup.add(signBoard);

  // Twin sign lighting floodlight bars on top of sign
  [-6, 6].forEach(fx => {
    const floodlight = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 0.4), silverMat);
    floodlight.position.set(fx, canopyHeight + 5.5, platZ + platDepth / 2 + 0.6);
    standGroup.add(floodlight);
  });

  // 5. STATION MASTER OFFICE & ENQUIRY BOOTH
  // Placed at the left half of the platform
  const officeWidth = 14.0;
  const officeDepth = 5.2;
  const officeHeight = 3.6;
  const officeX = -13.0;
  const officeZ = platZ - 1.2;

  const enqTex = createEnquiryOfficeTexture();
  const officeMat = new THREE.MeshLambertMaterial({ map: enqTex });
  const officeWallMat = new THREE.MeshLambertMaterial({ color: 0x93c5fd });

  const officeMaterials = [
    officeWallMat, // +X
    officeWallMat, // -X
    officeWallMat, // +Y
    officeWallMat, // -Y
    officeMat,     // +Z Front (Facing passenger platform)
    officeWallMat, // -Z Back
  ];

  const office = new THREE.Mesh(
    new THREE.BoxGeometry(officeWidth, officeHeight, officeDepth),
    officeMaterials
  );
  office.position.set(officeX, platHeight + officeHeight / 2 + 0.08, officeZ);
  office.castShadow = true;
  office.receiveShadow = true;
  standGroup.add(office);
  colliders.push({
    minX: x + officeX - officeWidth / 2 - 0.5,
    maxX: x + officeX + officeWidth / 2 + 0.5,
    minZ: z + officeZ - officeDepth / 2 - 0.5,
    maxZ: z + officeZ + officeDepth / 2 + 0.5,
  });

  // 6. DIGITAL DEPARTURE SCHEDULE BOARD
  const schedTex = createScheduleBoardTexture();
  const schedMat = new THREE.MeshLambertMaterial({ map: schedTex });
  const scheduleBoard = new THREE.Mesh(new THREE.BoxGeometry(6.5, 4.8, 0.2), schedMat);
  scheduleBoard.position.set(3.5, platHeight + 3.2, platZ - 2.8);
  scheduleBoard.castShadow = true;
  standGroup.add(scheduleBoard);

  // 7. PASSENGER WAITING SEATS & BENCHES
  // Array of stainless steel passenger benches
  [-2, 8, 14, 19].forEach(bx => {
    const benchGroup = new THREE.Group();
    // 3 connected seats
    for (let si = -1; si <= 1; si++) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 0.65), steelBenchMat);
      seat.position.set(si * 1.15, 0.5, 0);
      const back = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.55, 0.06), steelBenchMat);
      back.position.set(si * 1.15, 0.8, -0.3);
      benchGroup.add(seat, back);
    }
    // Legs
    [-1.6, 1.6].forEach(lx => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8), steelBenchMat);
      leg.position.set(lx, 0.25, 0);
      benchGroup.add(leg);
    });

    benchGroup.position.set(bx, platHeight + 0.08, platZ + 1.8);
    standGroup.add(benchGroup);
  });

  // 8. "ആനവണ്ടി കഫേ" - KSRTC PLATFORM TEA & SNACK COUNTER
  const cafeX = 18.5;
  const cafeZ = platZ - 1.2;
  const cafeGroup = new THREE.Group();

  // Tea stall stall body
  const cafeBody = new THREE.Mesh(new THREE.BoxGeometry(7.0, 3.2, 4.4), new THREE.MeshLambertMaterial({ color: 0x064e3b }));
  cafeBody.position.y = 1.6;
  cafeBody.castShadow = true;
  cafeGroup.add(cafeBody);

  // Front Service Window Opening
  const cafeCounter = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.15, 0.8), new THREE.MeshLambertMaterial({ color: 0xb45309 }));
  cafeCounter.position.set(0, 1.25, 2.3);
  cafeGroup.add(cafeCounter);

  // Tea Samovar (Boiler)
  const samovar = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.9, 10), silverMat);
  samovar.position.set(-1.6, 1.75, 2.25);
  cafeGroup.add(samovar);

  // Glass snack cabinet with banana fry / parippuvada
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 0.6), new THREE.MeshPhongMaterial({ color: 0xd97706, transparent: true, opacity: 0.65 }));
  cabinet.position.set(1.4, 1.7, 2.25);
  cafeGroup.add(cabinet);

  // Cafe Header Sign
  const cafeSign = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.7, 0.1), new THREE.MeshLambertMaterial({ color: 0xf59e0b }));
  cafeSign.position.set(0, 2.85, 2.25);
  cafeGroup.add(cafeSign);

  cafeGroup.position.set(cafeX, platHeight + 0.08, cafeZ);
  standGroup.add(cafeGroup);
  colliders.push({
    minX: x + cafeX - 3.8,
    maxX: x + cafeX + 3.8,
    minZ: z + cafeZ - 2.5,
    maxZ: z + cafeZ + 2.5,
  });

  // Drinking water kiosk kiosk
  const waterKiosk = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.0), new THREE.MeshLambertMaterial({ color: 0x0284c7 }));
  waterKiosk.position.set(cafeX - 5.5, platHeight + 0.88, platZ - 2.2);
  standGroup.add(waterKiosk);

  // 9. PAINTED BUS BAYS ON CONCOURSE TARMAC
  // Bay 1: Super Fast (Trivandrum)
  // Bay 2: Fast Passenger (Kozhikode)
  // Bay 3: Eranhikkal Private Bus (Kozhikode - Manjeri Limited Stop)
  const bayConfigs = [
    { x: -16.0, name: 'BAY 1: SUPER FAST', dest: 'തിരുവനന്തപുരം • TRIVANDRUM' },
    { x: 0.0, name: 'BAY 2: FAST PASSENGER', dest: 'കോഴിക്കോട് • KOZHIKODE' },
    { x: 16.0, name: 'BAY 3: ERANHIKKAL (LS)', dest: 'കോഴിക്കോട് • മഞ്ചേരി (ERANHIKKAL)' },
  ];

  bayConfigs.forEach((cfg) => {
    // Yellow parking slot border lines on tarmac
    const bayTex = createBayMarkingTexture(cfg.name, cfg.dest);
    const baySign = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 3.8), new THREE.MeshBasicMaterial({ map: bayTex }));
    baySign.rotateX(-Math.PI / 2);
    baySign.position.set(cfg.x, 0.11, 4.5);
    standGroup.add(baySign);

    // Left and right yellow parking box lines
    [-3.8, 3.8].forEach(lx => {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 14.0), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
      line.rotateX(-Math.PI / 2);
      line.position.set(cfg.x + lx, 0.1, 8.5);
      standGroup.add(line);
    });
  });

  // 10. STATIONED BUSES IN BAYS
  // Bay 1 Bus: KSRTC Super Fast ready for boarding at platform edge
  const bus1 = buildKSRTCSuperFastBus();
  bus1.position.set(-16.0, 0.08, 6.5);
  bus1.rotation.y = 0; // Facing outwards towards exit
  standGroup.add(bus1);
  buses.push(bus1);
  colliders.push({
    minX: x - 16.0 - 1.8,
    maxX: x - 16.0 + 1.8,
    minZ: z + 6.5 - 5.8,
    maxZ: z + 6.5 + 5.8,
  });

  // Bay 2 Bus: KSRTC Super Fast parked in middle bay
  const bus2 = buildKSRTCSuperFastBus();
  bus2.position.set(0.0, 0.08, 7.2);
  bus2.rotation.y = 0;
  standGroup.add(bus2);
  buses.push(bus2);
  colliders.push({
    minX: x - 1.8,
    maxX: x + 1.8,
    minZ: z + 7.2 - 5.8,
    maxZ: z + 7.2 + 5.8,
  });

  // Bay 3 Bus: Kerala Private Bus ("ERANHIKKAL - 2020 Club Edition") parked in Bay 3
  const privateBus3 = buildKeralaPrivateBus();
  privateBus3.position.set(16.0, 0.08, 6.8);
  privateBus3.rotation.y = 0;
  standGroup.add(privateBus3);
  buses.push(privateBus3);
  colliders.push({
    minX: x + 16.0 - 1.8,
    maxX: x + 16.0 + 1.8,
    minZ: z + 6.8 - 5.8,
    maxZ: z + 6.8 + 5.8,
  });

  // Yard / Reserve Bus: KSRTC Bus parked at right maintenance bay
  const busYard = buildKSRTCSuperFastBus();
  busYard.position.set(24.0, 0.08, 16.5);
  busYard.rotation.y = -Math.PI / 4; // Angled parking in the yard
  standGroup.add(busYard);
  buses.push(busYard);
  colliders.push({
    minX: x + 24.0 - 4.5,
    maxX: x + 24.0 + 4.5,
    minZ: z + 16.5 - 4.5,
    maxZ: z + 16.5 + 4.5,
  });

  // 11. HIGH-MAST YARD FLOODLIGHT TOWER
  // Authentic 14-meter octagonal steel high mast pole with crown of floodlights
  const mastGroup = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 });
  const mastPole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.65, 14.5, 8), poleMat);
  mastPole.position.y = 7.25;
  mastPole.castShadow = true;
  mastGroup.add(mastPole);

  // Circular floodlight crown ring
  const crownRing = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 6, 16), poleMat);
  crownRing.rotateX(Math.PI / 2);
  crownRing.position.y = 14.2;
  mastGroup.add(crownRing);

  // 6 radial LED floodlight lanterns
  for (let li = 0; li < 6; li++) {
    const angle = (li / 6) * Math.PI * 2;
    const lantern = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.4), silverMat);
    lantern.position.set(Math.cos(angle) * 1.2, 14.0, Math.sin(angle) * 1.2);
    lantern.lookAt(Math.cos(angle) * 3, 0, Math.sin(angle) * 3);
    mastGroup.add(lantern);

    // Warm glow point
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
    glow.position.copy(lantern.position);
    mastGroup.add(glow);
  }

  // Red aviation warning beacon on top tip
  const redBeacon = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.3, 6), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  redBeacon.position.y = 15.1;
  mastGroup.add(redBeacon);

  mastGroup.position.set(-24.0, 0.08, 16.0);
  standGroup.add(mastGroup);
  colliders.push({ minX: x - 25.5, maxX: x - 22.5, minZ: z + 14.5, maxZ: z + 17.5 });

  standGroup.position.set(x, 0, z);

  return {
    group: standGroup,
    colliders,
    buses,
  };
}
