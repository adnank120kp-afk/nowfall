import * as THREE from 'three';

// =============================================================================
// 🚇 PUNE METRO PURPLE LINE (TITAGARH FIREMA MODERN METRO COACH)
// Accurately recreated from the official Pune Metro Purple Line papercraft model:
// - Vibrant Magenta / Purple / Violet roof and upper cantrail livery (#c026d3 / #9333ea)
// - Sleek Gloss Jet Black window and door belt (#09090b)
// - Corrugated / fluted stainless steel lower side skirt with bottom purple pinstripe
// - Aerodynamic angled cab nose with glowing amber LED destination display ("PCMC - SWARGATE PURPLE LINE")
// - Twin curved vertical LED Daytime Running Lights (DRL) on front & Red LED tail markers on rear
// - Scharfenberg automatic mechanical & electrical couplers at nose and gangways
// - Double automatic plug sliding doors with yellow vertical safety edge warning strips
// - Panoramic tinted passenger windows revealing blue ergonomic interior seating
// - Roof-mounted red single-arm Z-pantograph with carbon collector shoe & insulators
// - Dual HVAC air conditioning pods with circular multi-blade exhaust fans
// - Dual two-axle metro wheel bogies with disc brakes and air suspension springs
// =============================================================================

// Helper: Destination LED Display Texture ("PCMC - SWARGATE PURPLE LINE")
function createMetroDestinationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 96;
  const ctx = canvas.getContext('2d')!;

  // Black LED matrix board background
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, 512, 96);

  // Amber LED glowing matrix grid
  ctx.strokeStyle = '#261805';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 6) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 96);
    ctx.stroke();
  }

  // Glowing orange-amber digital destination text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#fde68a';
  ctx.font = '900 36px monospace';
  ctx.fillText('PCMC ➔ SWARGATE', 256, 38);

  ctx.shadowBlur = 6;
  ctx.font = 'bold 20px monospace';
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('PURPLE LINE • പർപ്പിൾ ലൈൻ', 256, 74);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Cab Logos Texture ("महा मेट्रो / PUNE METRO" & "TITAGARH")
function createMetroLogosTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Transparent / black background
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, 512, 256);

  // Left: Pune Metro Spiral Rainbow Emblem
  // Outer multi-color ring
  const cx1 = 140;
  const cy1 = 128;
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#a855f7'];
  for (let i = 0; i < colors.length; i++) {
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx1, cy1, 46 - i * 3.5, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Train icon in center
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🚆', cx1, cy1);

  // "महा मेट्रो / PUNE METRO" text
  ctx.font = 'bold 16px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('महा मेट्रो', cx1, 196);
  ctx.font = '900 14px sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('PUNE METRO', cx1, 218);

  // Right: Titagarh Circular Brand Logo
  const cx2 = 372;
  const cy2 = 128;
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx2, cy2, 48, 0, Math.PI * 2);
  ctx.stroke();

  // Stylized "T" monogram inside circle
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx2 - 32, cy2 - 24, 64, 10);
  ctx.fillRect(cx2 - 6, cy2 - 24, 12, 54);

  // "TITAGARH" brand text
  ctx.font = '900 16px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('TITAGARH', cx2, 206);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Roof HVAC Pod Condenser Mesh & Dual Exhaust Fans
function createRoofHVACTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Stainless steel background
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(0, 0, 512, 256);

  // Outer bezel
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 244);

  // Left & Right Circular Cooling Exhaust Fan housings
  [140, 372].forEach((fx) => {
    // Fan outer ring
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(fx, 128, 92, 0, Math.PI * 2);
    ctx.fill();

    // Dark inner hub
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(fx, 128, 82, 0, Math.PI * 2);
    ctx.fill();

    // 8 Fan blades
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 8;
    for (let a = 0; a < 8; a++) {
      const angle = (Math.PI * 2 / 8) * a;
      ctx.beginPath();
      ctx.moveTo(fx, 128);
      ctx.lineTo(fx + Math.cos(angle) * 78, 128 + Math.sin(angle) * 78);
      ctx.stroke();
    }

    // Center fan nose spinner
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(fx, 128, 22, 0, Math.PI * 2);
    ctx.fill();

    // Protective wire mesh guard
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    for (let r = 30; r <= 80; r += 20) {
      ctx.beginPath();
      ctx.arc(fx, 128, r, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Helper: Gangway Bellows Texture (Inter-car flexible accordion connection)
function createGangwayBellowsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#18181b';
  ctx.fillRect(0, 0, 256, 256);

  // Accordion pleated rubber folds
  for (let x = 0; x < 256; x += 16) {
    ctx.fillStyle = '#09090b';
    ctx.fillRect(x, 0, 8, 256);
    ctx.fillStyle = '#27272a';
    ctx.fillRect(x + 8, 0, 8, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

// =============================================================================
// METRO COACH BUILDER
// =============================================================================

export interface MetroTrainOptions {
  cars?: number; // 2 or 3 car trainset
  speed?: number; // Speed multiplier
  viaductY?: number; // Viaduct height (default 9.5)
}

export interface TrackPoint {
  position: THREE.Vector3;
  tangent: THREE.Vector3;
  yaw: number;
  curvature: number; // 0 on straights, >0 on curves (for inward cant banking)
}

// -----------------------------------------------------------------------------
// Evaluates exact position, tangent, heading, and curvature on the 734m loop track
// -----------------------------------------------------------------------------
export function evaluateMetroTrack(s: number, viaductY: number = 9.5): TrackPoint {
  const straightL = 320;
  const curveR = 15;
  const curveL = Math.PI * curveR; // ~47.1238898m
  const totalP = straightL * 2 + curveL * 2; // ~734.2477796m

  // Normalize s around closed circuit
  const normS = ((s % totalP) + totalP) % totalP;
  const trackY = viaductY + 0.72; // Deck height + rail crown

  let px = 0;
  let pz = 0;
  let tx = 0;
  let tz = 0;
  let yaw = 0;
  let curvature = 0;

  if (normS < straightL) {
    // 1. North Straight Track (cruising East along Z = -15 from X = -160 to +160)
    px = -160 + normS;
    pz = -15;
    tx = 1;
    tz = 0;
    yaw = Math.PI / 2;
    curvature = 0;
  } else if (normS < straightL + curveL) {
    // 2. East Sweeping 180° Curve (attaching North track at Z = -15 across to South track at Z = +15)
    const u = normS - straightL;
    const phi = -Math.PI / 2 + u / curveR; // sweeps from -PI/2 to +PI/2
    px = 160 + Math.cos(phi) * curveR;
    pz = Math.sin(phi) * curveR;
    tx = -Math.sin(phi);
    tz = Math.cos(phi);
    yaw = Math.PI / 2 - u / curveR;
    curvature = 1 / curveR;
  } else if (normS < straightL * 2 + curveL) {
    // 3. South Straight Track on the OTHER SIDE (cruising West along Z = +15 from X = +160 to -160)
    const u = normS - (straightL + curveL);
    px = 160 - u;
    pz = 15;
    tx = -1;
    tz = 0;
    yaw = -Math.PI / 2;
    curvature = 0;
  } else {
    // 4. West Sweeping 180° Curve (attaching South track at Z = +15 back across to North track at Z = -15)
    const u = normS - (straightL * 2 + curveL);
    const phi = Math.PI / 2 + u / curveR; // sweeps from +PI/2 to +3PI/2
    px = -160 + Math.cos(phi) * curveR;
    pz = Math.sin(phi) * curveR;
    tx = -Math.sin(phi);
    tz = Math.cos(phi);
    yaw = -Math.PI / 2 - u / curveR;
    curvature = 1 / curveR;
  }

  return {
    position: new THREE.Vector3(px, trackY, pz),
    tangent: new THREE.Vector3(tx, 0, tz),
    yaw,
    curvature,
  };
}

export function buildPuneMetroTrain(options: MetroTrainOptions = {}): {
  group: THREE.Group;
  leadCar: THREE.Group;
  trailerCar: THREE.Group;
  rearCar: THREE.Group;
  update: (time: number) => void;
} {
  const trainGroup = new THREE.Group();
  trainGroup.position.set(0, 0, 0);
  trainGroup.rotation.set(0, 0, 0);

  const viaductY = options.viaductY ?? 9.5;

  // -----------------------------------------------------------
  // Materials Palette
  // -----------------------------------------------------------
  // Vibrant Purple / Magenta for Roof & Cantrail Band (#c026d3 / #9333ea)
  const purpleLiveryMat = new THREE.MeshStandardMaterial({
    color: 0xc026d3,
    roughness: 0.25,
    metalness: 0.35,
  });

  // Deep Gloss Jet Black for Side Window / Door Surround Band (#09090b)
  const blackBeltMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.15,
    metalness: 0.5,
  });

  // Metallic Fluted Stainless Steel Lower Skirt
  const stainlessSteelMat = new THREE.MeshStandardMaterial({
    color: 0xd8e2ec,
    roughness: 0.35,
    metalness: 0.85,
  });

  // Dark Underframe & Bogies
  const bogieMat = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.7,
    metalness: 0.6,
  });

  // High-Gloss Chrome / Polished Wheel Rims
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.95,
  });

  // High-Contrast Safety Yellow Door Edge Rubber Seals (#facc15)
  const doorYellowMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.4,
    metalness: 0.1,
  });

  // Cyan Tinted Panoramic Window Glass
  const windowGlassMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.55,
    roughness: 0.05,
    metalness: 0.2,
  });

  // Interior Blue Ergonomic Passenger Seats (#0284c7)
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.8,
    metalness: 0.05,
  });

  // Glowing White LED DRL Headlights (Front Face)
  const headlightLedMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 1.4,
    roughness: 0.05,
  });

  // Glowing Red LED Marker Taillights (Rear Face)
  const taillightLedMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xdc2626,
    emissiveIntensity: 1.2,
    roughness: 0.1,
  });

  // Pantograph Red Powder-Coat Steel (#dc2626)
  const pantographRedMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.3,
    metalness: 0.6,
  });

  // High-Voltage Porcelain Insulator Cones (Brown / Terracotta)
  const insulatorMat = new THREE.MeshStandardMaterial({
    color: 0x7c2d12,
    roughness: 0.3,
    metalness: 0.1,
  });

  // Textures
  const destinationTex = createMetroDestinationTexture();
  const destinationMat = new THREE.MeshBasicMaterial({ map: destinationTex });

  const logosTex = createMetroLogosTexture();
  const logosMat = new THREE.MeshBasicMaterial({ map: logosTex, transparent: true });

  const hvacTex = createRoofHVACTexture();
  const hvacMat = new THREE.MeshStandardMaterial({ map: hvacTex, roughness: 0.4, metalness: 0.6 });

  const bellowsMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.9,
    metalness: 0.1,
  });

  // -----------------------------------------------------------
  // Helper: Build Metro Wheel Bogie (Two-Axle Running Gear)
  // Can pivot dynamically relative to car chassis to follow rails!
  // -----------------------------------------------------------
  const createMetroBogie = () => {
    const bogie = new THREE.Group();

    // Central H-Frame Bolster
    const bolster = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.2, 0.45), bogieMat);
    bolster.position.set(0, 0.48, 0);
    bogie.add(bolster);

    // Side Frames (Left & Right)
    [-1.15, 1.15].forEach((sx) => {
      const sideBeam = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 2.8), bogieMat);
      sideBeam.position.set(sx, 0.48, 0);
      bogie.add(sideBeam);

      // Primary Helical Coil Springs over each axle
      [-0.95, 0.95].forEach((sz) => {
        const spring = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.35, 12), bogieMat);
        spring.position.set(sx, 0.62, sz);
        bogie.add(spring);
      });

      // Central Secondary Air Spring Bellows
      const airBellow = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.26, 16), bogieMat);
      airBellow.position.set(sx, 0.64, 0);
      bogie.add(airBellow);
    });

    // 2 Axles & 4 Solid Steel Wheels with Disk Brakes
    [-0.95, 0.95].forEach((az) => {
      const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 12), bogieMat);
      axle.rotation.z = Math.PI / 2;
      axle.position.set(0, 0.42, az);
      bogie.add(axle);

      [-1.0, 1.0].forEach((wx) => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 20), chromeMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.42, az);

        const brakeDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16), bogieMat);
        brakeDisc.rotation.z = Math.PI / 2;
        brakeDisc.position.set(wx > 0 ? wx - 0.08 : wx + 0.08, 0.42, az);
        bogie.add(wheel, brakeDisc);
      });
    });

    return bogie;
  };

  // -----------------------------------------------------------
  // Helper: Build Passenger Door Set (Double Sliding Plug Doors)
  // -----------------------------------------------------------
  const createDoubleDoor = () => {
    const dg = new THREE.Group();

    // Twin Door Panels
    [-0.52, 0.52].forEach((dx) => {
      // Black door panel core
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.96, 2.2, 0.06), blackBeltMat);
      panel.position.set(dx, 0, 0);

      // Yellow vertical safety edge strip
      const edgeStrip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.2, 0.07), doorYellowMat);
      edgeStrip.position.set(dx > 0 ? dx - 0.46 : dx + 0.46, 0, 0);

      // Tall door glass window
      const glass = new THREE.Mesh(new THREE.BoxGeometry(0.68, 1.45, 0.08), windowGlassMat);
      glass.position.set(dx, 0.25, 0);

      dg.add(panel, edgeStrip, glass);
    });

    return dg;
  };

  // -----------------------------------------------------------
  // Helper: Build Full Metro Coach Body (Leading / Trailing / Trailer)
  // Car length: 22.0m, Width: 3.1m, Height: 3.6m
  // -----------------------------------------------------------
  const createMetroCar = (type: 'lead' | 'trailer' | 'rear') => {
    const car = new THREE.Group();
    const carLen = 22.0;

    // 1. Lower Stainless Steel Fluted Skirt (Z = -carLen/2 to +carLen/2)
    const skirtGeo = new THREE.BoxGeometry(3.08, 1.05, carLen);
    const skirt = new THREE.Mesh(skirtGeo, stainlessSteelMat);
    skirt.position.set(0, 1.25, 0);
    skirt.castShadow = true;
    car.add(skirt);

    // Horizontal Fluting Grooves along the stainless skirt
    for (let y = 0.95; y <= 1.55; y += 0.15) {
      const flute = new THREE.Mesh(new THREE.BoxGeometry(3.12, 0.03, carLen), stainlessSteelMat);
      flute.position.set(0, y, 0);
      car.add(flute);
    }

    // Bottom Edge Magenta / Purple Accent Stripe
    const bottomStripe = new THREE.Mesh(new THREE.BoxGeometry(3.14, 0.08, carLen), purpleLiveryMat);
    bottomStripe.position.set(0, 0.76, 0);
    car.add(bottomStripe);

    // 2. Gloss Jet Black Side Window & Door Belt
    const blackBeltGeo = new THREE.BoxGeometry(3.06, 1.55, carLen);
    const blackBelt = new THREE.Mesh(blackBeltGeo, blackBeltMat);
    blackBelt.position.set(0, 2.52, 0);
    blackBelt.castShadow = true;
    car.add(blackBelt);

    // 3. Vibrant Purple / Magenta Roof & Upper Cantrail Band
    const roofBaseGeo = new THREE.BoxGeometry(3.08, 0.55, carLen);
    const roofBase = new THREE.Mesh(roofBaseGeo, purpleLiveryMat);
    roofBase.position.set(0, 3.55, 0);
    car.add(roofBase);

    // Sleek Low-Profile Purple Roof Tier (Strictly bounded along Z)
    const roofCrown = new THREE.Mesh(
      new THREE.BoxGeometry(2.86, 0.22, carLen),
      purpleLiveryMat
    );
    roofCrown.position.set(0, 3.88, 0);
    roofCrown.castShadow = true;
    car.add(roofCrown);

    // 4. Passenger Double Plug Doors (4 Door Sets per side = 8 doors per car)
    const doorZPositions = [-7.2, -2.4, 2.4, 7.2];
    doorZPositions.forEach((dz) => {
      // Left side doors
      const doorL = createDoubleDoor();
      doorL.rotation.y = Math.PI / 2;
      doorL.position.set(-1.54, 2.15, dz);
      car.add(doorL);

      // Right side doors
      const doorR = createDoubleDoor();
      doorR.rotation.y = -Math.PI / 2;
      doorR.position.set(1.54, 2.15, dz);
      car.add(doorR);
    });

    // 5. Panoramic Passenger Windows between doors
    const windowZPositions = [-4.8, 0, 4.8];
    windowZPositions.forEach((wz) => {
      // Large panoramic glass pane
      [-1.54, 1.54].forEach((wx) => {
        const panGlass = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.25, 2.6), windowGlassMat);
        panGlass.position.set(wx, 2.55, wz);
        car.add(panGlass);
      });
    });

    // 6. Interior Details Visible through glass: Blue Ergonomic Passenger Seats & Handrails
    [-1.25, 1.25].forEach((sx) => {
      [-5.0, 0, 5.0].forEach((sz) => {
        // Longitudinal Bench Seats
        const seatBench = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 2.4), seatMat);
        seatBench.position.set(sx, 1.2, sz);
        const seatBack = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.48, 2.4), seatMat);
        seatBack.position.set(sx > 0 ? sx + 0.18 : sx - 0.18, 1.62, sz);
        car.add(seatBench, seatBack);
      });
    });

    // Stainless Steel Interior Stanchion Grab Poles
    [-5.5, -3.2, -0.5, 1.8, 4.2].forEach((pz) => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 2.6, 8), chromeMat);
      pole.position.set(0, 2.4, pz);
      car.add(pole);
    });

    // 7. Roof Equipment: Dual HVAC Air Conditioning Units with Fans
    [-5.5, 5.5].forEach((hz) => {
      const hvacBox = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.38, 3.8), stainlessSteelMat);
      hvacBox.position.set(0, 4.02, hz);
      car.add(hvacBox);

      // Top HVAC Decal Panel with Dual Circular Exhaust Fans
      const hvacDecal = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 3.6), hvacMat);
      hvacDecal.rotation.x = -Math.PI / 2;
      hvacDecal.position.set(0, 4.22, hz);
      car.add(hvacDecal);
    });

    // Longitudinal Stainless Roof Cable Conduit Channels & Ribs
    [-0.85, 0.85].forEach((cx) => {
      const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, carLen - 2, 8), stainlessSteelMat);
      conduit.rotation.x = Math.PI / 2;
      conduit.position.set(cx, 4.0, 0);
      car.add(conduit);
    });

    // 8. Dual Running Gear Bogies (Z = -6.8m and Z = +6.8m)
    // Mounted as independent pivotable assemblies!
    const bogieFront = createMetroBogie();
    bogieFront.position.set(0, 0, 6.8);
    car.add(bogieFront);

    const bogieRear = createMetroBogie();
    bogieRear.position.set(0, 0, -6.8);
    car.add(bogieRear);

    // 9. Aerodynamic Streamlined Cab Nose (for Leading & Rear Trailing cars)
    if (type === 'lead' || type === 'rear') {
      const isLead = type === 'lead';
      const noseDir = isLead ? 1 : -1;
      const noseZ = (carLen / 2) * noseDir;

      const noseGroup = new THREE.Group();
      noseGroup.position.set(0, 0, noseZ);

      // Angled Wedge Nose Front Mask (Jet Black Face)
      const noseWedgeGeo = new THREE.BoxGeometry(3.02, 2.8, 1.8);
      const noseWedge = new THREE.Mesh(noseWedgeGeo, blackBeltMat);
      noseWedge.position.set(0, 2.15, 0.85 * noseDir);
      noseWedge.castShadow = true;
      noseGroup.add(noseWedge);

      // Sloping Windshield Glass (Panoramic Dual-Pane)
      const windGlassGeo = new THREE.BoxGeometry(2.65, 1.25, 0.15);
      const windGlass = new THREE.Mesh(windGlassGeo, windowGlassMat);
      windGlass.rotation.x = -0.32 * noseDir;
      windGlass.position.set(0, 2.65, 1.72 * noseDir);
      noseGroup.add(windGlass);

      // Center Windshield Wiper
      const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.55, 0.04), blackBeltMat);
      wiper.rotation.z = -0.4;
      wiper.position.set(0.2, 2.5, 1.78 * noseDir);
      noseGroup.add(wiper);

      // Overhead Amber Destination LED Display Box
      const destBox = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.38, 0.15), blackBeltMat);
      destBox.position.set(0, 3.42, 1.68 * noseDir);
      const destPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.34), destinationMat);
      if (isLead) {
        destPlane.position.set(0, 3.42, 1.77);
      } else {
        destPlane.rotation.y = Math.PI;
        destPlane.position.set(0, 3.42, -1.77);
      }
      noseGroup.add(destBox, destPlane);

      // Rounded Purple Hood / Cantrail Nose Cap
      const noseCap = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.22, 1.4), purpleLiveryMat);
      noseCap.position.set(0, 3.65, 0.8 * noseDir);
      noseGroup.add(noseCap);

      // Vertical Curved LED Daytime Running Lights (DRL) / Headlights
      // White on Front, Red on Rear
      const lightMat = isLead ? headlightLedMat : taillightLedMat;
      [-1.38, 1.38].forEach((lx) => {
        const drlStrip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.4, 0.08), lightMat);
        drlStrip.position.set(lx, 2.1, 1.75 * noseDir);
        drlStrip.rotation.x = -0.15 * noseDir;
        noseGroup.add(drlStrip);
      });

      // Front Face Brand Decals: "PUNE METRO" & "TITAGARH" Logos
      const logoPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.1), logosMat);
      if (isLead) {
        logoPlane.position.set(0, 1.45, 1.78);
      } else {
        logoPlane.rotation.y = Math.PI;
        logoPlane.position.set(0, 1.45, -1.78);
      }
      noseGroup.add(logoPlane);

      // Automatic Scharfenberg Train Coupler at bottom center nose
      const couplerShaft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 1.1), bogieMat);
      couplerShaft.position.set(0, 0.65, 1.75 * noseDir);
      const couplerHead = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.34, 0.35), chromeMat);
      couplerHead.position.set(0, 0.65, 2.32 * noseDir);
      noseGroup.add(couplerShaft, couplerHead);

      car.add(noseGroup);
    }

    // 10. Open Gangway Vestibule End Portals (for walk-through connections)
    const addVestibulePortal = (zPos: number) => {
      const portalFrame = new THREE.Mesh(new THREE.BoxGeometry(2.35, 2.7, 0.12), blackBeltMat);
      portalFrame.position.set(0, 2.2, zPos);
      const portalHole = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 0.14), new THREE.MeshBasicMaterial({ color: 0x09090b }));
      portalHole.position.set(0, 2.1, zPos);
      const rubberSeal = new THREE.Mesh(new THREE.BoxGeometry(2.45, 2.8, 0.05), bellowsMat);
      rubberSeal.position.set(0, 2.2, zPos);
      car.add(portalFrame, portalHole, rubberSeal);
    };

    if (type === 'lead') {
      addVestibulePortal(-carLen / 2);
    } else if (type === 'trailer') {
      addVestibulePortal(carLen / 2);
      addVestibulePortal(-carLen / 2);
    } else if (type === 'rear') {
      addVestibulePortal(carLen / 2);
    }

    // 11. Low-Profile Aerodynamic Rooftop Pantograph (Mounted strictly on Center Trailer Car)
    // Kept compact and sleek to prevent any long protruding sticks extending into the air
    if (type === 'trailer') {
      const pantoGroup = new THREE.Group();
      pantoGroup.position.set(0, 4.02, 0);

      // 4 Ceramic / Porcelain High Voltage Insulator Cones
      [-0.65, 0.65].forEach((ix) => {
        [-0.65, 0.65].forEach((iz) => {
          const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.15, 12), insulatorMat);
          cone.position.set(ix, 0.08, iz);
          pantoGroup.add(cone);
        });
      });

      // Steel Base Frame & Actuator Cylinder
      const pFrame = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 1.4), pantographRedMat);
      pFrame.position.set(0, 0.15, 0);
      const actuator = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 12), chromeMat);
      actuator.rotation.x = Math.PI / 2;
      actuator.position.set(0, 0.18, 0);
      pantoGroup.add(pFrame, actuator);

      // Sleek Folded Diamond Frame (low profile, hugs roof)
      const diamondFrame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.9), pantographRedMat);
      diamondFrame.rotation.y = Math.PI / 4;
      diamondFrame.position.set(0, 0.22, 0);
      pantoGroup.add(diamondFrame);

      // Carbon Contact Collector Shoe (horizontal bar)
      const collectorBar = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.04, 0.12), chromeMat);
      collectorBar.position.set(0, 0.28, 0);
      pantoGroup.add(collectorBar);

      car.add(pantoGroup);
    }

    return {
      car,
      frontBogie: bogieFront,
      rearBogie: bogieRear,
      type,
    };
  };

  // -----------------------------------------------------------
  // Helper: Build Articulated Accordion Gangway (Vestibule Bellows)
  // Connects adjacent cars and flexes naturally around curves!
  // -----------------------------------------------------------
  const createArticulatedGangway = () => {
    const gw = new THREE.Group();

    // 5 Pleated Accordion Bellow Segments
    const pleatCount = 5;
    for (let p = 0; p < pleatCount; p++) {
      const zOffset = (p - (pleatCount - 1) / 2) * 0.16;
      const pleat = new THREE.Mesh(new THREE.BoxGeometry(2.38, 2.72, 0.11), bellowsMat);
      pleat.position.set(0, 2.2, zOffset);
      gw.add(pleat);
    }

    // Heavy Underframe Drawbar & Articulated Mechanical Coupler
    const couplerBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.2, 0.85), bogieMat);
    couplerBar.position.set(0, 0.65, 0);
    const couplerJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.28, 12), chromeMat);
    couplerJoint.position.set(0, 0.65, 0);
    gw.add(couplerBar, couplerJoint);

    // Gangway treadplate / threshold floor
    const treadPlate = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 0.8), stainlessSteelMat);
    treadPlate.position.set(0, 0.85, 0);
    gw.add(treadPlate);

    return { group: gw };
  };

  // -----------------------------------------------------------
  // Build Complete Articulated Metro Trainset
  // Car 1 (Lead DM) + Gangway 1 + Car 2 (Trailer) + Gangway 2 + Car 3 (Rear DT)
  // -----------------------------------------------------------
  const leadCarData = createMetroCar('lead');
  const trailerCarData = createMetroCar('trailer');
  const rearCarData = createMetroCar('rear');

  const gangway1 = createArticulatedGangway();
  const gangway2 = createArticulatedGangway();

  trainGroup.add(leadCarData.car);
  trainGroup.add(trailerCarData.car);
  trainGroup.add(rearCarData.car);
  trainGroup.add(gangway1.group);
  trainGroup.add(gangway2.group);

  const cars = [leadCarData, trailerCarData, rearCarData];
  const carLength = 22.0;
  const carSpacing = 22.8; // Center-to-center distance along track
  const bogieOffset = 6.8; // Distance from car center to front/rear bogie

  // Helper to update kinematics for all 3 cars and 2 gangways
  const updateKinematics = (time: number) => {
    // Metro cruising speed: 16 m/s (~58 km/h)
    const speed = 0.016;
    const straightL = 320;
    const curveR = 15;
    const curveL = Math.PI * curveR;
    const totalP = straightL * 2 + curveL * 2;

    const leadS = ((time * speed) % totalP + totalP) % totalP;

    // Evaluate each of the 3 cars independently along the track path!
    const carPositions: THREE.Vector3[] = [];
    const carYaws: number[] = [];
    const carRolls: number[] = [];

    cars.forEach((cData, idx) => {
      const sCar = leadS - idx * carSpacing;

      // Real train bogie physics: car body sits on two bogies!
      const pF = evaluateMetroTrack(sCar + bogieOffset, viaductY);
      const pR = evaluateMetroTrack(sCar - bogieOffset, viaductY);

      // Car body center is midpoint between front and rear bogies
      const carPos = new THREE.Vector3().addVectors(pF.position, pR.position).multiplyScalar(0.5);

      // Gentle operational rocking sway and suspension float
      const rockSway = Math.sin(time * 0.003 + idx * 1.6) * 0.0035;
      const vertFloat = Math.sin(time * 0.006 + idx * 1.2) * 0.012;
      carPos.y += vertFloat;

      // Chord heading between the two bogies
      const dx = pF.position.x - pR.position.x;
      const dz = pF.position.z - pR.position.z;
      const carYaw = Math.atan2(dx, dz);

      // Superelevation (cant) inward banking: real trains tilt inward into curves!
      const avgCurv = (pF.curvature + pR.curvature) * 0.5;
      const cantBank = avgCurv > 0.005 ? -0.045 : 0; // ~2.6° inward banking
      const carRoll = cantBank + rockSway;

      // Apply transform to this individual car
      cData.car.position.copy(carPos);
      cData.car.rotation.set(0, carYaw, 0, 'YXZ');
      cData.car.rotateZ(carRoll);

      // Bogie rail tracking: bogies pivot to align with the steel rail tangent
      let dYawF = pF.yaw - carYaw;
      dYawF = Math.atan2(Math.sin(dYawF), Math.cos(dYawF));
      cData.frontBogie.rotation.y = dYawF;

      let dYawR = pR.yaw - carYaw;
      dYawR = Math.atan2(Math.sin(dYawR), Math.cos(dYawR));
      cData.rearBogie.rotation.y = dYawR;

      carPositions.push(carPos);
      carYaws.push(carYaw);
      carRolls.push(carRoll);
    });

    // Dynamic Articulated Gangway 1 (between Lead Car 0 and Trailer Car 1)
    {
      const yaw0 = carYaws[0];
      const yaw1 = carYaws[1];
      const u0 = new THREE.Vector3(Math.sin(yaw0), 0, Math.cos(yaw0));
      const u1 = new THREE.Vector3(Math.sin(yaw1), 0, Math.cos(yaw1));

      // Rear coupling point of Car 0 and Front coupling point of Car 1
      const rear0 = carPositions[0].clone().sub(u0.clone().multiplyScalar(carLength / 2));
      const front1 = carPositions[1].clone().add(u1.clone().multiplyScalar(carLength / 2));

      const g1Pos = new THREE.Vector3().addVectors(rear0, front1).multiplyScalar(0.5);
      const g1Yaw = Math.atan2(
        Math.sin(yaw0) + Math.sin(yaw1),
        Math.cos(yaw0) + Math.cos(yaw1)
      );

      gangway1.group.position.copy(g1Pos);
      gangway1.group.rotation.set(0, g1Yaw, 0, 'YXZ');
      gangway1.group.rotateZ((carRolls[0] + carRolls[1]) * 0.5);

      const gapDist1 = rear0.distanceTo(front1);
      gangway1.group.scale.set(1, 1, Math.max(0.5, Math.min(1.6, gapDist1 / 0.8)));
    }

    // Dynamic Articulated Gangway 2 (between Trailer Car 1 and Rear Car 2)
    {
      const yaw1 = carYaws[1];
      const yaw2 = carYaws[2];
      const u1 = new THREE.Vector3(Math.sin(yaw1), 0, Math.cos(yaw1));
      const u2 = new THREE.Vector3(Math.sin(yaw2), 0, Math.cos(yaw2));

      // Rear coupling point of Car 1 and Front coupling point of Car 2
      const rear1 = carPositions[1].clone().sub(u1.clone().multiplyScalar(carLength / 2));
      const front2 = carPositions[2].clone().add(u2.clone().multiplyScalar(carLength / 2));

      const g2Pos = new THREE.Vector3().addVectors(rear1, front2).multiplyScalar(0.5);
      const g2Yaw = Math.atan2(
        Math.sin(yaw1) + Math.sin(yaw2),
        Math.cos(yaw1) + Math.cos(yaw2)
      );

      gangway2.group.position.copy(g2Pos);
      gangway2.group.rotation.set(0, g2Yaw, 0, 'YXZ');
      gangway2.group.rotateZ((carRolls[1] + carRolls[2]) * 0.5);

      const gapDist2 = rear1.distanceTo(front2);
      gangway2.group.scale.set(1, 1, Math.max(0.5, Math.min(1.6, gapDist2 / 0.8)));
    }
  };

  // Initial calculation so cars are immediately on track at time 0
  updateKinematics(0);

  return {
    group: trainGroup,
    leadCar: leadCarData.car,
    trailerCar: trailerCarData.car,
    rearCar: rearCarData.car,
    update: (time: number) => {
      updateKinematics(time);
    },
  };
}

