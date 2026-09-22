import * as THREE from 'three';

export interface ThattukadaModelData {
  group: THREE.Group;
  counterPosition: THREE.Vector3;
  colliders: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }>;
  updateAnimation: (time: number) => void;
}

/**
 * Creates canvas textures for hand-painted roadside price signboards
 * exactly matching Image 2: "CABBAGE ₹20 /kg", "CARROT ₹25 /kg", etc.
 */
function createPriceSignTexture(title: string, price: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Weathered cream / rustic paper board
  ctx.fillStyle = '#fdfbf7';
  ctx.fillRect(0, 0, 256, 128);

  // Distressed border
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 120);

  // Title text (e.g. CABBAGE, CARROT)
  ctx.fillStyle = '#18181b';
  ctx.font = 'bold 26px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';
  ctx.fillText(title.toUpperCase(), 128, 42);

  // Subtle divider
  ctx.strokeStyle = '#a1a1aa';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, 68);
  ctx.lineTo(224, 68);
  ctx.stroke();

  // Price text (e.g. ₹20 /kg)
  ctx.fillStyle = '#b91c1c'; // Red price highlight
  ctx.font = 'bold 30px "Syne", sans-serif';
  ctx.fillText(price, 128, 98);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates canvas texture for the hanging grocery/condiment labels
 */
function createCondimentSignTexture(label: string, price: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 120;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 300, 120);

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 5;
  ctx.strokeRect(3, 3, 294, 114);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 24px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, 150, 42);

  ctx.fillStyle = '#c2410c';
  ctx.font = 'bold 28px "Syne", sans-serif';
  ctx.fillText(price, 150, 88);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates canvas texture for the official Malayalam Thattukada signboard
 */
function createThattukadaSignTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Weathered wooden board with emerald green paint
  ctx.fillStyle = '#064e3b';
  ctx.fillRect(0, 0, 1024, 256);

  // Golden decorative frame
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, 1004, 236);

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, 988, 220);

  // Malayalam Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Noto Sans Malayalam", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🍵 കിഴക്കുംപുറം തട്ടുകട — നായർ ചേട്ടൻ', 512, 75);

  // English Title
  ctx.fillStyle = '#fde047';
  ctx.font = '900 48px "Syne", sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('NAIR’S AUTHENTIC THATTUKADA', 512, 145);

  // Lower menu ticker
  ctx.fillStyle = '#ecfdf5';
  ctx.font = 'bold 26px "Noto Sans Malayalam", "Syne", sans-serif';
  ctx.fillText('ചായ • ചൂട് പലഹാരങ്ങൾ • പൊറോട്ട & ബീഫ് • നാടൻ സ്പെഷ്യൽസ്', 512, 210);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates Corn Flour packaging box texture
 */
function createCornFlourTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#fef08a'; // Bright yellow
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#15803d'; // Green banner
  ctx.fillRect(0, 0, 256, 70);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CORN', 128, 38);
  ctx.fillText('FLOUR', 128, 64);

  // Corn cob graphic circle
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(128, 145, 45, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#166534';
  ctx.font = 'bold 20px "Syne", sans-serif';
  ctx.fillText('100% PURE', 128, 220);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural model of an authentic Kerala roadside Thattukada
 * faithfully crafted after Image 2:
 * - Rustic wooden poles, corrugated tin roof with blue and yellow tarpaulins
 * - Rear wooden shelves with glass treat jars (ഭരണികൾ)
 * - Hanging string with clipped snack bags (Lays, mixture, chips)
 * - Hanging Edison filament bulb casting warm glow
 * - Tiered wooden vegetable crates: Cabbage, Carrot, Garlic, Capsicum, Spring Onion
 * - Front counter with sunflower oil bottles, sauce bottles, cornflour, wooden spoons
 * - Side produce crate with tomatoes and coriander, water drum
 * - Traditional tea samovar with steam and steel tea glasses
 */
export function buildAuthenticKeralaThattukada(): ThattukadaModelData {
  const stallGroup = new THREE.Group();
  const colliders: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [];

  // Reusable Materials
  const rusticWoodMat = new THREE.MeshLambertMaterial({ color: 0x54371f }); // Dark bark timber
  const lightWoodMat = new THREE.MeshLambertMaterial({ color: 0x8a5b32 }); // Planed counter timber
  const blueTarpMat = new THREE.MeshLambertMaterial({ color: 0x1d4ed8, side: THREE.DoubleSide }); // Royal blue tarpaulin
  const yellowTarpMat = new THREE.MeshLambertMaterial({ color: 0xeab308, side: THREE.DoubleSide }); // Yellow tarp corner
  const corrugatedTinMat = new THREE.MeshStandardMaterial({
    color: 0x6b7280,
    roughness: 0.65,
    metalness: 0.45,
  });
  const rustTinMat = new THREE.MeshStandardMaterial({
    color: 0x7c3f25,
    roughness: 0.8,
    metalness: 0.3,
  });

  const stallWidth = 10.5;
  const stallDepth = 5.2;
  const stallHeight = 4.2;

  // 1. MAIN TIMBER & BAMBOO POSTS (4 Corners + Rear Center)
  const poleRadius = 0.16;
  const poleGeo = new THREE.CylinderGeometry(poleRadius, poleRadius * 1.1, stallHeight, 8);
  const polePositions = [
    [-stallWidth / 2 + 0.3, stallHeight / 2, -stallDepth / 2 + 0.3], // Back Left
    [stallWidth / 2 - 0.3, stallHeight / 2, -stallDepth / 2 + 0.3],  // Back Right
    [-stallWidth / 2 + 0.3, stallHeight / 2 - 0.2, stallDepth / 2 - 0.3], // Front Left
    [stallWidth / 2 - 0.3, stallHeight / 2 - 0.2, stallDepth / 2 - 0.3],  // Front Right
    [0, stallHeight / 2, -stallDepth / 2 + 0.3], // Back Center
  ];

  polePositions.forEach(([px, py, pz]) => {
    const pole = new THREE.Mesh(poleGeo, rusticWoodMat);
    pole.position.set(px, py, pz);
    pole.castShadow = true;
    stallGroup.add(pole);

    // Bamboo ring knots
    for (let h = 0.8; h < stallHeight; h += 0.85) {
      const knot = new THREE.Mesh(new THREE.TorusGeometry(poleRadius * 1.08, 0.03, 6, 12), rusticWoodMat);
      knot.rotation.x = Math.PI / 2;
      knot.position.set(px, h, pz);
      stallGroup.add(knot);
    }
  });

  // Cross beams between poles
  const rearBeam = new THREE.Mesh(new THREE.BoxGeometry(stallWidth - 0.4, 0.18, 0.18), rusticWoodMat);
  rearBeam.position.set(0, stallHeight - 0.1, -stallDepth / 2 + 0.3);
  stallGroup.add(rearBeam);

  const frontBeam = new THREE.Mesh(new THREE.BoxGeometry(stallWidth - 0.4, 0.18, 0.18), rusticWoodMat);
  frontBeam.position.set(0, stallHeight - 0.45, stallDepth / 2 - 0.3);
  stallGroup.add(frontBeam);

  // Side rafters
  [-stallWidth / 2 + 0.3, 0, stallWidth / 2 - 0.3].forEach((rx) => {
    const rafter = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, stallDepth + 0.6), rusticWoodMat);
    rafter.position.set(rx, stallHeight - 0.25, 0);
    rafter.rotation.x = 0.06; // slight forward pitch
    stallGroup.add(rafter);
  });

  // 2. BACK & SIDE WALLS (Dark weathered timber planks + side blue tarp)
  const backWallGroup = new THREE.Group();
  const plankH = 0.38;
  const plankCount = 10;
  for (let i = 0; i < plankCount; i++) {
    const plankMat = i % 2 === 0 ? rusticWoodMat : lightWoodMat;
    const plank = new THREE.Mesh(new THREE.BoxGeometry(stallWidth - 0.6, plankH - 0.02, 0.08), plankMat);
    plank.position.set(0, 0.2 + i * plankH, -stallDepth / 2 + 0.3);
    plank.castShadow = true;
    backWallGroup.add(plank);
  }
  stallGroup.add(backWallGroup);

  // Left & Right Side blue tarps
  const leftTarp = new THREE.Mesh(new THREE.BoxGeometry(0.06, stallHeight - 0.8, stallDepth - 0.8), blueTarpMat);
  leftTarp.position.set(-stallWidth / 2 + 0.3, (stallHeight - 0.8) / 2 + 0.2, 0);
  stallGroup.add(leftTarp);

  const rightTarp = new THREE.Mesh(new THREE.BoxGeometry(0.06, stallHeight - 0.8, stallDepth - 0.8), blueTarpMat);
  rightTarp.position.set(stallWidth / 2 - 0.3, (stallHeight - 0.8) / 2 + 0.2, 0);
  stallGroup.add(rightTarp);

  // 3. CORRUGATED TIN ROOF WITH BLUE & YELLOW TARPAULIN
  const roofGroup = new THREE.Group();
  const roofWidth = stallWidth + 1.2;
  const roofDepth = stallDepth + 1.4;

  // Corrugated multi-pane ridged roof sheets
  const ridgeCount = 38;
  const ridgeWidth = roofWidth / ridgeCount;
  for (let i = 0; i < ridgeCount; i++) {
    const rx = -roofWidth / 2 + i * ridgeWidth + ridgeWidth / 2;
    const isRusty = (i > 8 && i < 14) || (i > 24 && i < 30) || (i % 7 === 0);
    const sheetMat = isRusty ? rustTinMat : corrugatedTinMat;

    // Ridge crest and trough
    const ridgeMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, roofDepth, 6),
      sheetMat
    );
    ridgeMesh.rotation.x = Math.PI / 2;
    ridgeMesh.position.set(rx, 0.06 * Math.sin(i * 1.5), 0);
    ridgeMesh.castShadow = true;
    roofGroup.add(ridgeMesh);
  }

  // Base roof plane under ridges
  const baseRoof = new THREE.Mesh(new THREE.BoxGeometry(roofWidth, 0.05, roofDepth), corrugatedTinMat);
  roofGroup.add(baseRoof);

  // Blue tarpaulin sheet stretched directly under the roof eaves
  const blueTarpEaves = new THREE.Mesh(
    new THREE.BoxGeometry(roofWidth + 0.2, 0.04, roofDepth * 0.96),
    blueTarpMat
  );
  blueTarpEaves.position.set(0, -0.1, 0.05);
  roofGroup.add(blueTarpEaves);

  // Front draping blue tarp ruffle / fold hanging over the front beam
  const frontTarpHang = new THREE.Mesh(
    new THREE.BoxGeometry(stallWidth + 0.4, 0.55, 0.06),
    blueTarpMat
  );
  frontTarpHang.position.set(0, -0.38, roofDepth / 2 - 0.35);
  roofGroup.add(frontTarpHang);

  // Yellow tarpaulin accent draped over top right corner (just like in Image 2!)
  const yellowTarpCorner = new THREE.Mesh(
    new THREE.BoxGeometry(roofWidth * 0.28, 0.06, roofDepth * 0.45),
    yellowTarpMat
  );
  yellowTarpCorner.position.set(roofWidth * 0.36, 0.06, roofDepth * 0.28);
  roofGroup.add(yellowTarpCorner);

  // Wooden batten holding the yellow tarp
  const tarpBatten = new THREE.Mesh(new THREE.BoxGeometry(roofWidth * 0.26, 0.08, 0.08), rusticWoodMat);
  tarpBatten.position.set(roofWidth * 0.36, 0.12, roofDepth * 0.28);
  roofGroup.add(tarpBatten);

  // Position entire roof with slight forward slope
  roofGroup.position.set(0, stallHeight + 0.15, 0);
  roofGroup.rotation.x = 0.07;
  stallGroup.add(roofGroup);

  // 4. MAIN WOODEN SERVICE COUNTER (Center & Right)
  const counterGroup = new THREE.Group();
  const counterW = 6.2;
  const counterH = 1.35;
  const counterD = 1.6;

  // Counter front timber boards
  const counterFront = new THREE.Mesh(
    new THREE.BoxGeometry(counterW, counterH, 0.1),
    lightWoodMat
  );
  counterFront.position.set(0, counterH / 2, counterD / 2);
  counterFront.castShadow = true;
  counterGroup.add(counterFront);

  // Counter top tabletop surface
  const counterTop = new THREE.Mesh(
    new THREE.BoxGeometry(counterW + 0.3, 0.12, counterD + 0.3),
    lightWoodMat
  );
  counterTop.position.set(0, counterH, 0);
  counterTop.castShadow = true;
  counterTop.receiveShadow = true;
  counterGroup.add(counterTop);

  // Counter side support posts
  [-counterW / 2 + 0.15, counterW / 2 - 0.15].forEach((cx) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, counterH, counterD - 0.2), rusticWoodMat);
    leg.position.set(cx, counterH / 2, 0);
    counterGroup.add(leg);
  });

  counterGroup.position.set(1.4, 0, stallDepth / 2 - 1.2);
  stallGroup.add(counterGroup);

  // 5. TIERED WOODEN VEGETABLE & PRODUCE STAND (Left Side, Image 2)
  const vegStandGroup = new THREE.Group();

  // Rustic wooden slatted crate builder
  function createSlattedCrate(w: number, h: number, d: number): THREE.Group {
    const crate = new THREE.Group();
    const slatThick = 0.04;
    const slatMat = new THREE.MeshLambertMaterial({ color: 0x92613b }); // Light raw pine

    // Bottom
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(w, slatThick, d), slatMat);
    bottom.position.y = slatThick / 2;
    crate.add(bottom);

    // Front & Back slats
    [-d / 2 + slatThick / 2, d / 2 - slatThick / 2].forEach((sz) => {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(w, h, slatThick), slatMat);
      slat.position.set(0, h / 2, sz);
      crate.add(slat);
    });

    // Left & Right slats
    [-w / 2 + slatThick / 2, w / 2 - slatThick / 2].forEach((sx) => {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(slatThick, h, d - slatThick * 2), slatMat);
      slat.position.set(sx, h / 2, 0);
      crate.add(slat);
    });

    return crate;
  }

  // Price Signboard Creator helper
  function addSignToCrate(crate: THREE.Group, title: string, price: string, w = 0.65, h = 0.32) {
    const signMat = new THREE.MeshBasicMaterial({
      map: createPriceSignTexture(title, price),
      transparent: true,
    });
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(w, h), signMat);
    sign.position.set(0, 0.05, 0.62);
    crate.add(sign);
  }

  // A. TOP TIER CRATES (Cabbage, Carrot, Garlic)
  const topCrateTable = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 1.4), rusticWoodMat);
  topCrateTable.position.set(-3.2, 0.95, stallDepth / 2 - 1.2);
  stallGroup.add(topCrateTable);

  // Legs for top crate table
  [-4.8, -1.6].forEach((lx) => {
    [-0.5, 0.5].forEach((lz) => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.95, 6), rusticWoodMat);
      leg.position.set(lx, 0.95 / 2, stallDepth / 2 - 1.2 + lz);
      stallGroup.add(leg);
    });
  });

  // 1. Cabbage Crate
  const cabbageCrate = createSlattedCrate(1.15, 0.45, 1.2);
  cabbageCrate.position.set(-4.35, 1.0, stallDepth / 2 - 1.2);
  const cabbageMat = new THREE.MeshLambertMaterial({ color: 0x4ade80 });
  for (let cx = -0.35; cx <= 0.35; cx += 0.35) {
    for (let cz = -0.35; cz <= 0.35; cz += 0.35) {
      const cabbage = new THREE.Mesh(new THREE.SphereGeometry(0.18 + Math.random() * 0.04, 8, 8), cabbageMat);
      cabbage.position.set(cx, 0.28, cz);
      cabbageCrate.add(cabbage);
    }
  }
  addSignToCrate(cabbageCrate, 'Cabbage', '₹20 /kg');
  stallGroup.add(cabbageCrate);

  // 2. Carrot Crate
  const carrotCrate = createSlattedCrate(1.15, 0.45, 1.2);
  carrotCrate.position.set(-3.1, 1.0, stallDepth / 2 - 1.2);
  const carrotMat = new THREE.MeshLambertMaterial({ color: 0xea580c });
  const carrotGreenMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
  for (let cx = -0.38; cx <= 0.38; cx += 0.22) {
    for (let cz = -0.35; cz <= 0.35; cz += 0.24) {
      const carrot = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.42, 6), carrotMat);
      carrot.rotation.x = Math.PI + (Math.random() - 0.5) * 0.4;
      carrot.position.set(cx, 0.28, cz);
      carrotCrate.add(carrot);

      const leaf = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.16, 4), carrotGreenMat);
      leaf.position.set(cx, 0.46, cz);
      carrotCrate.add(leaf);
    }
  }
  addSignToCrate(carrotCrate, 'Carrot', '₹25 /kg');
  stallGroup.add(carrotCrate);

  // 3. Garlic Crate
  const garlicCrate = createSlattedCrate(1.15, 0.45, 1.2);
  garlicCrate.position.set(-1.85, 1.0, stallDepth / 2 - 1.2);
  const garlicMat = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 });
  for (let gx = -0.38; gx <= 0.38; gx += 0.18) {
    for (let gz = -0.35; gz <= 0.35; gz += 0.2) {
      const garlic = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 6), garlicMat);
      garlic.scale.set(1.0, 1.3, 1.0);
      garlic.position.set(gx, 0.22, gz);
      garlicCrate.add(garlic);
    }
  }
  addSignToCrate(garlicCrate, 'Garlic', '₹120 /kg');
  stallGroup.add(garlicCrate);

  // B. LOWER TIER CRATES (Capsicum & Spring Onion, on ground floor)
  // 4. Capsicum Crate (Left Bottom)
  const capsicumCrate = createSlattedCrate(1.7, 0.45, 1.2);
  capsicumCrate.position.set(-4.0, 0.0, stallDepth / 2 + 0.1);
  const capsicumMat = new THREE.MeshLambertMaterial({ color: 0x166534 });
  for (let px = -0.65; px <= 0.65; px += 0.32) {
    for (let pz = -0.35; pz <= 0.35; pz += 0.32) {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.28, 7), capsicumMat);
      cap.position.set(px, 0.26, pz);
      capsicumCrate.add(cap);
    }
  }
  addSignToCrate(capsicumCrate, 'Capsicum', '₹30 /kg', 0.8, 0.32);
  stallGroup.add(capsicumCrate);

  // 5. Spring Onion Crate (Right Bottom)
  const onionCrate = createSlattedCrate(1.7, 0.45, 1.2);
  onionCrate.position.set(-2.1, 0.0, stallDepth / 2 + 0.1);
  const onionGreenMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
  const onionWhiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  for (let ox = -0.65; ox <= 0.65; ox += 0.22) {
    // White bulb
    const bulb = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.2, 5), onionWhiteMat);
    bulb.rotation.x = Math.PI / 2;
    bulb.position.set(ox, 0.18, 0.2);
    onionCrate.add(bulb);

    // Green long scallion stems
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 5), onionGreenMat);
    stem.rotation.x = Math.PI / 2;
    stem.position.set(ox, 0.2, -0.15);
    onionCrate.add(stem);
  }
  addSignToCrate(onionCrate, 'Spring Onion', '₹20 /bunch', 0.8, 0.32);
  stallGroup.add(onionCrate);

  // 6. COUNTER CONDIMENTS & GROCERY ITEMS (Image 2)
  const counterItemsGroup = new THREE.Group();
  counterItemsGroup.position.set(1.4, counterH + 0.06, stallDepth / 2 - 1.2);

  // A. Golden Cooking Oil Bottles
  const oilYellowMat = new THREE.MeshLambertMaterial({ color: 0xfacc15, transparent: true, opacity: 0.85 });
  const oilCapMat = new THREE.MeshLambertMaterial({ color: 0xca8a04 });
  [-1.8, -1.45, -1.1].forEach((ox) => {
    const bottleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.58, 8), oilYellowMat);
    bottleBody.position.set(ox, 0.29, -0.2);
    const bottleNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.18, 8), oilYellowMat);
    bottleNeck.position.set(ox, 0.65, -0.2);
    const bottleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8), oilCapMat);
    bottleCap.position.set(ox, 0.76, -0.2);
    counterItemsGroup.add(bottleBody, bottleNeck, bottleCap);
  });

  // Oil Price Tag
  const oilSignMat = new THREE.MeshBasicMaterial({
    map: createCondimentSignTexture('OIL', '₹100 /ltr'),
    transparent: true,
  });
  const oilSign = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.26), oilSignMat);
  oilSign.position.set(-1.45, 0.14, 0.45);
  counterItemsGroup.add(oilSign);

  // B. Glass Sauce / Condiment Bottles
  const sauceColors = [0x991b1b, 0xdc2626, 0xe11d48, 0x15803d, 0xb91c1c];
  sauceColors.forEach((color, i) => {
    const sx = -0.6 + i * 0.25;
    const sauceMat = new THREE.MeshLambertMaterial({ color });
    const sBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.46, 7), sauceMat);
    sBody.position.set(sx, 0.23, -0.2);
    const sNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.16, 7), sauceMat);
    sNeck.position.set(sx, 0.52, -0.2);
    counterItemsGroup.add(sBody, sNeck);
  });

  // Sauce Price Tag
  const sauceSignMat = new THREE.MeshBasicMaterial({
    map: createCondimentSignTexture('SAUCES', '₹40 - ₹60'),
    transparent: true,
  });
  const sauceSign = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.26), sauceSignMat);
  sauceSign.position.set(-0.1, 0.14, 0.45);
  counterItemsGroup.add(sauceSign);

  // C. Corn Flour Box
  const cornBoxMat = new THREE.MeshLambertMaterial({ map: createCornFlourTexture() });
  const cornBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.6, 0.25), cornBoxMat);
  cornBox.position.set(0.9, 0.3, -0.2);
  counterItemsGroup.add(cornBox);

  // Corn Flour Price Tag
  const cornSignMat = new THREE.MeshBasicMaterial({
    map: createCondimentSignTexture('CORNFLOUR', '₹30'),
    transparent: true,
  });
  const cornSign = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.26), cornSignMat);
  cornSign.position.set(0.9, 0.14, 0.45);
  counterItemsGroup.add(cornSign);

  // D. Woven Basket with Wooden Ice-Cream Spoons
  const basketMat = new THREE.MeshLambertMaterial({ color: 0xa16207 }); // Woven wicker brown
  const basket = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.45), basketMat);
  basket.position.set(1.9, 0.2, -0.15);
  counterItemsGroup.add(basket);

  // Wooden Spoons fan spread inside basket
  const spoonMat = new THREE.MeshLambertMaterial({ color: 0xfde68a });
  for (let sp = -0.25; sp <= 0.25; sp += 0.05) {
    const spoon = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 0.02), spoonMat);
    spoon.position.set(1.9 + sp, 0.48, -0.15);
    spoon.rotation.z = sp * 0.6;
    counterItemsGroup.add(spoon);
  }

  // Wooden Spoons Price Tag
  const spoonSignMat = new THREE.MeshBasicMaterial({
    map: createCondimentSignTexture('WOODEN SPOONS', '₹20 /pack'),
    transparent: true,
  });
  const spoonSign = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.26), spoonSignMat);
  spoonSign.position.set(1.9, 0.14, 0.45);
  counterItemsGroup.add(spoonSign);

  stallGroup.add(counterItemsGroup);

  // 7. SIDE WOODEN BENCH WITH TOMATOES & CORIANDER, AND WATER DRUM (Right Side)
  const sideProduceBench = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.9), rusticWoodMat);
  sideProduceBench.position.set(stallWidth / 2 + 0.4, 0.45 / 2, stallDepth / 2 - 0.2);
  stallGroup.add(sideProduceBench);

  // Blue plastic crate on the bench
  const blueTray = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.22, 0.75), blueTarpMat);
  blueTray.position.set(stallWidth / 2 + 0.4, 0.45 + 0.11, stallDepth / 2 - 0.2);
  stallGroup.add(blueTray);

  // Ripe Red Tomatoes
  const tomatoMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
  for (let tx = -0.4; tx <= 0.4; tx += 0.2) {
    for (let tz = -0.2; tz <= 0.2; tz += 0.2) {
      const tomato = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), tomatoMat);
      tomato.position.set(stallWidth / 2 + 0.4 + tx, 0.45 + 0.24, stallDepth / 2 - 0.2 + tz);
      stallGroup.add(tomato);
    }
  }

  // Fresh Coriander & Mint bunch
  const corianderMat = new THREE.MeshLambertMaterial({ color: 0x16a34a });
  const mintBunch = new THREE.Mesh(new THREE.SphereGeometry(0.24, 7, 7), corianderMat);
  mintBunch.scale.set(1.2, 0.6, 1.0);
  mintBunch.position.set(stallWidth / 2 + 0.4 - 0.25, 0.45 + 0.32, stallDepth / 2 - 0.2);
  stallGroup.add(mintBunch);

  // Deep teal/green plastic water drum (കന്നാസ്)
  const drumMat = new THREE.MeshLambertMaterial({ color: 0x0f766e });
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.25, 12), drumMat);
  drum.position.set(stallWidth / 2 + 0.6, 1.25 / 2, stallDepth / 2 - 1.8);
  drum.castShadow = true;
  stallGroup.add(drum);

  const drumCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 8), new THREE.MeshLambertMaterial({ color: 0xf8fafc }));
  drumCap.position.set(stallWidth / 2 + 0.6, 1.25 + 0.05, stallDepth / 2 - 1.8);
  stallGroup.add(drumCap);

  // 8. BACK SHELVES WITH PROCEDURAL GLASS SNACK JARS (കണ്ണാടി ഭരണികൾ)
  const shelvesGroup = new THREE.Group();
  const shelfZ = -stallDepth / 2 + 0.7;

  [1.7, 2.7].forEach((shY) => {
    const shelfBoard = new THREE.Mesh(new THREE.BoxGeometry(stallWidth - 1.2, 0.08, 0.55), rusticWoodMat);
    shelfBoard.position.set(0, shY, shelfZ);
    shelvesGroup.add(shelfBoard);

    // Glass Jars along each shelf
    const jarLidMatRed = new THREE.MeshLambertMaterial({ color: 0xb91c1c });
    const jarLidMatSilver = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 });
    const jarGlassMat = new THREE.MeshPhongMaterial({
      color: 0xe0f2fe,
      transparent: true,
      opacity: 0.6,
      shininess: 90,
    });
    const snackFillMats = [
      new THREE.MeshLambertMaterial({ color: 0xeab308 }), // Banana Chips
      new THREE.MeshLambertMaterial({ color: 0xd97706 }), // Achappam / Mixture
      new THREE.MeshLambertMaterial({ color: 0xb45309 }), // Kozhikodan Halwa / Biscuits
    ];

    for (let jx = -4.0; jx <= 4.0; jx += 0.9) {
      const jarGroup = new THREE.Group();
      jarGroup.position.set(jx, shY + 0.04, shelfZ);

      // Glass jar cylinder
      const jarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.55, 10), jarGlassMat);
      jarMesh.position.y = 0.28;
      jarGroup.add(jarMesh);

      // Jar lid
      const lidMat = Math.abs(jx) % 1.8 < 0.5 ? jarLidMatRed : jarLidMatSilver;
      const lidMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.08, 10), lidMat);
      lidMesh.position.y = 0.58;
      jarGroup.add(lidMesh);

      // Snack filler inside
      const snackColor = snackFillMats[Math.floor(Math.abs(jx * 3)) % snackFillMats.length];
      const snackFill = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.45, 8), snackColor);
      snackFill.position.y = 0.24;
      jarGroup.add(snackFill);

      shelvesGroup.add(jarGroup);
    }
  });
  stallGroup.add(shelvesGroup);

  // 9. HANGING SNACK / CHIP PACKETS STRING (Image 2)
  const packetLine = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, stallWidth - 1.2, 4),
    new THREE.MeshBasicMaterial({ color: 0x27272a })
  );
  packetLine.rotation.z = Math.PI / 2;
  packetLine.position.set(0, stallHeight - 1.05, stallDepth / 2 - 0.35);
  stallGroup.add(packetLine);

  const packetColors = [0x16a34a, 0xeab308, 0xdc2626, 0x2563eb, 0xea580c];
  for (let px = -stallWidth / 2 + 1.2; px <= stallWidth / 2 - 1.2; px += 0.52) {
    const packetMat = new THREE.MeshLambertMaterial({
      color: packetColors[Math.floor(Math.abs(px * 4)) % packetColors.length],
    });
    const packet = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.48, 0.04), packetMat);
    packet.position.set(px, stallHeight - 1.35, stallDepth / 2 - 0.35);
    packet.rotation.z = (Math.random() - 0.5) * 0.15; // slight natural sway
    stallGroup.add(packet);

    // Tiny wooden clothespin peg
    const peg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.04), rusticWoodMat);
    peg.position.set(px, stallHeight - 1.08, stallDepth / 2 - 0.35);
    stallGroup.add(peg);
  }

  // 10. HANGING GLOWING TUNGSTEN EDISON BULB (Image 2)
  const bulbCord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 1.2, 4),
    new THREE.MeshBasicMaterial({ color: 0x18181b })
  );
  bulbCord.position.set(0, stallHeight - 0.8, stallDepth / 2 - 0.8);
  stallGroup.add(bulbCord);

  const bulbGlassMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
  const bulbMesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), bulbGlassMat);
  bulbMesh.position.set(0, stallHeight - 1.45, stallDepth / 2 - 0.8);
  stallGroup.add(bulbMesh);

  // Warm amber tungsten light cast over the counter & vegetables
  const bulbLight = new THREE.PointLight(0xff9e3d, 1.8, 16);
  bulbLight.position.set(0, stallHeight - 1.45, stallDepth / 2 - 0.8);
  bulbLight.castShadow = true;
  stallGroup.add(bulbLight);

  // 11. KERALA TEA SAMOVAR (CHAYA BOILER) & TEA GLASSES
  const samovarGroup = new THREE.Group();
  samovarGroup.position.set(3.8, counterH + 0.1, stallDepth / 2 - 1.2);

  // Chrome stainless steel boiler cylinder
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.1,
  });
  const boiler = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.95, 14), chromeMat);
  boiler.position.y = 0.48;
  samovarGroup.add(boiler);

  // Top steam chimney & brass lid
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.25 });
  const samovarLid = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.2, 14), brassMat);
  samovarLid.position.y = 1.02;
  samovarGroup.add(samovarLid);

  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 8), chromeMat);
  chimney.position.y = 1.18;
  samovarGroup.add(chimney);

  // Brass spigot tap
  const spigot = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6), brassMat);
  spigot.rotation.x = Math.PI / 2;
  spigot.position.set(0, 0.25, 0.42);
  samovarGroup.add(spigot);

  // Stack of Kerala steel fluted tea glasses
  const glassTray = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.04, 12), chromeMat);
  glassTray.position.set(-0.95, 0.04, 0);
  samovarGroup.add(glassTray);

  for (let gx = -0.15; gx <= 0.15; gx += 0.15) {
    for (let gz = -0.15; gz <= 0.15; gz += 0.15) {
      const teaGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.22, 8), chromeMat);
      teaGlass.position.set(-0.95 + gx, 0.15, gz);
      samovarGroup.add(teaGlass);
    }
  }

  // Hanging bunch of fresh Kerala Nendran Bananas (ഏത്തക്കുല)
  const bananaBunchGroup = new THREE.Group();
  const bananaMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
  const bananaStemMat = new THREE.MeshLambertMaterial({ color: 0x4d7c0f });
  const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 1.1, 6), bananaStemMat);
  stalk.position.y = -0.55;
  bananaBunchGroup.add(stalk);

  for (let b = 0; b < 18; b++) {
    const angle = (b * Math.PI) / 4.5;
    const bHeight = -0.2 - (b / 18) * 0.7;
    const banana = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.03, 0.45, 6), bananaMat);
    banana.rotation.z = 0.55;
    banana.rotation.y = angle;
    banana.position.set(Math.cos(angle) * 0.16, bHeight, Math.sin(angle) * 0.16);
    bananaBunchGroup.add(banana);
  }
  bananaBunchGroup.position.set(stallWidth / 2 - 0.8, stallHeight - 0.4, stallDepth / 2 - 0.8);
  stallGroup.add(bananaBunchGroup);

  stallGroup.add(samovarGroup);

  // 12. PROUD WOODEN BILINGUAL SIGNBOARD ACROSS FRONT TOP
  const signMat = new THREE.MeshBasicMaterial({
    map: createThattukadaSignTexture(),
  });
  const thattukadaSign = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 1.8), signMat);
  thattukadaSign.position.set(0, stallHeight + 0.35, stallDepth / 2 - 0.28);
  stallGroup.add(thattukadaSign);

  // 13. STEAM PARTICLES OVER TEA BOILER (Procedural puffs)
  const steamParticles: THREE.Mesh[] = [];
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.35,
  });
  for (let i = 0; i < 6; i++) {
    const steamPuff = new THREE.Mesh(new THREE.SphereGeometry(0.06 + i * 0.02, 6, 6), steamMat);
    steamPuff.position.set(
      3.8 + (Math.random() - 0.5) * 0.08,
      counterH + 1.35 + i * 0.18,
      stallDepth / 2 - 1.2 + (Math.random() - 0.5) * 0.08
    );
    samovarGroup.add(steamPuff);
    steamParticles.push(steamPuff);
  }

  // Animation handler
  const updateAnimation = (time: number) => {
    steamParticles.forEach((puff, idx) => {
      puff.position.y += 0.008;
      puff.position.x += Math.sin(time * 2 + idx) * 0.002;
      if (puff.position.y > counterH + 2.4) {
        puff.position.y = counterH + 1.35;
      }
    });

    // Gentle sway of hanging snack bags
    stallGroup.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && child.position.y > stallHeight - 1.4 && child.position.y < stallHeight - 1.2) {
        child.rotation.z = Math.sin(time * 1.5 + index) * 0.06;
      }
    });
  };

  // Add colliders for main stall footprint
  colliders.push({
    minX: -stallWidth / 2 - 0.5,
    maxX: stallWidth / 2 + 1.5,
    minZ: -stallDepth / 2 - 0.5,
    maxZ: stallDepth / 2 + 0.8,
  });

  return {
    group: stallGroup,
    counterPosition: new THREE.Vector3(1.4, 0, stallDepth / 2 + 1.2),
    colliders,
    updateAnimation,
  };
}
