import * as THREE from 'three';

export interface LotusPondData {
  group: THREE.Group;
  colliders: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }>;
  updateAnimation: (time: number) => void;
  pondCenter: THREE.Vector3;
  getBoundaryRadius: (angle: number) => number;
}

/**
 * Procedural harmonic function describing the organic kidney / lagoon shoreline
 * directly inspired by the user's reference image (Image 2).
 */
export function getOrganicPondRadius(angle: number, baseRadius = 12.5): number {
  return (
    baseRadius *
    (1.0 +
      0.24 * Math.sin(angle) +
      0.20 * Math.cos(2 * angle - 0.35) -
      0.13 * Math.sin(3 * angle + 0.25) +
      0.08 * Math.cos(4 * angle))
  );
}

/**
 * Creates an authentic notched Water Lily Pad (താമരയില)
 * with the characteristic missing wedge slice as seen in Image 2.
 */
function createNotchedLilyPad(radius: number, leafColor = 0x22c55e): THREE.Group {
  const padGroup = new THREE.Group();

  // Leaf disc with missing pie wedge (notch)
  const notchAngle = 0.38 + Math.random() * 0.08;
  const padGeo = new THREE.CircleGeometry(radius, 24, notchAngle / 2, Math.PI * 2 - notchAngle);
  padGeo.rotateX(-Math.PI / 2);

  const padMat = new THREE.MeshLambertMaterial({
    color: leafColor,
    side: THREE.DoubleSide,
  });
  const leafMesh = new THREE.Mesh(padGeo, padMat);
  leafMesh.receiveShadow = true;
  padGroup.add(leafMesh);

  // Raised central stem node
  const centerNodeMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
  const centerNode = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.08, radius * 0.1, 0.04, 8), centerNodeMat);
  centerNode.position.y = 0.015;
  padGroup.add(centerNode);

  // Subtle radiating leaf veins
  const veinMat = new THREE.MeshBasicMaterial({ color: 0x86efac });
  const veinCount = 7;
  for (let v = 0; v < veinCount; v++) {
    const vAngle = notchAngle / 2 + (v / veinCount) * (Math.PI * 2 - notchAngle);
    const veinLen = radius * 0.88;
    const veinGeo = new THREE.PlaneGeometry(0.025, veinLen);
    veinGeo.rotateX(-Math.PI / 2);
    const vein = new THREE.Mesh(veinGeo, veinMat);
    vein.position.set((Math.cos(vAngle) * veinLen) / 2, 0.008, (Math.sin(vAngle) * veinLen) / 2);
    vein.rotation.y = -vAngle + Math.PI / 2;
    padGroup.add(vein);
  }

  return padGroup;
}

/**
 * Creates a delicate 3D Blooming Lotus / Water Lily Flower (ആമ്പൽപൂവ് / താമര)
 */
function createLotusBlossom(colorType: 'pink' | 'white' = 'pink', scale = 1): THREE.Group {
  const flower = new THREE.Group();

  const petalColor = colorType === 'pink' ? 0xf472b6 : 0xfdf4ff;
  const innerPetalColor = colorType === 'pink' ? 0xec4899 : 0xffffff;
  const petalMat = new THREE.MeshLambertMaterial({ color: petalColor, side: THREE.DoubleSide });
  const innerPetalMat = new THREE.MeshLambertMaterial({ color: innerPetalColor, side: THREE.DoubleSide });

  // Golden stamen center
  const stamenMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
  const stamen = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.14 * scale, 0.22 * scale, 8), stamenMat);
  stamen.position.y = 0.12 * scale;
  flower.add(stamen);

  // Inner ring of petals (8 upright petals)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const pGeo = new THREE.ConeGeometry(0.14 * scale, 0.55 * scale, 4);
    pGeo.rotateX(0.35);
    const pMesh = new THREE.Mesh(pGeo, innerPetalMat);
    pMesh.position.set(Math.cos(angle) * 0.16 * scale, 0.22 * scale, Math.sin(angle) * 0.16 * scale);
    pMesh.rotation.y = -angle + Math.PI / 2;
    flower.add(pMesh);
  }

  // Outer ring of spreading petals (10 flared petals)
  for (let j = 0; j < 10; j++) {
    const angle = (j / 10) * Math.PI * 2 + 0.3;
    const pGeo = new THREE.ConeGeometry(0.18 * scale, 0.65 * scale, 4);
    pGeo.rotateX(0.78);
    const pMesh = new THREE.Mesh(pGeo, petalMat);
    pMesh.position.set(Math.cos(angle) * 0.26 * scale, 0.14 * scale, Math.sin(angle) * 0.26 * scale);
    pMesh.rotation.y = -angle + Math.PI / 2;
    flower.add(pMesh);
  }

  return flower;
}

/**
 * Creates natural grass sedge / reed tufts sprouting between boulders
 */
function createShorelineSedgeTuft(bladeColor = 0x22c55e, scale = 1): THREE.Group {
  const tuft = new THREE.Group();
  const mat = new THREE.MeshLambertMaterial({ color: bladeColor, side: THREE.DoubleSide });
  const bladeCount = 7 + Math.floor(Math.random() * 5);

  for (let i = 0; i < bladeCount; i++) {
    const bHeight = (0.5 + Math.random() * 0.45) * scale;
    const bWidth = (0.06 + Math.random() * 0.04) * scale;
    const bGeo = new THREE.ConeGeometry(bWidth, bHeight, 3);
    const lean = 0.25 + Math.random() * 0.35;
    bGeo.rotateX(lean);
    const blade = new THREE.Mesh(bGeo, mat);
    blade.position.y = (bHeight / 2) * 0.85;
    blade.rotation.y = Math.random() * Math.PI * 2;
    tuft.add(blade);
  }

  // Optional tiny yellow wildflower buttercup
  if (Math.random() > 0.4) {
    const fMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.09 * scale, 5, 5), fMat);
    flower.position.set((Math.random() - 0.5) * 0.25, 0.45 * scale, (Math.random() - 0.5) * 0.25);
    tuft.add(flower);
  }

  return tuft;
}

/**
 * Creates a low-poly swimming ornamental Koi / carp fish
 */
function createKoiFish(color: number, scale = 0.9): { group: THREE.Group; tail: THREE.Mesh } {
  const koi = new THREE.Group();

  const bodyMat = new THREE.MeshLambertMaterial({ color });
  const bodyGeo = new THREE.ConeGeometry(0.18 * scale, 0.85 * scale, 6);
  bodyGeo.rotateX(Math.PI / 2);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.scale.set(0.65, 0.9, 1.0);
  koi.add(body);

  // Fin details
  const finMat = new THREE.MeshLambertMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
  const finL = new THREE.Mesh(new THREE.PlaneGeometry(0.18 * scale, 0.28 * scale), finMat);
  finL.position.set(-0.16 * scale, 0, 0.1 * scale);
  finL.rotation.set(0.3, -0.6, -0.4);
  const finR = finL.clone();
  finR.position.x = 0.16 * scale;
  finR.rotation.set(0.3, 0.6, 0.4);
  koi.add(finL, finR);

  // Tail fin
  const tailGeo = new THREE.PlaneGeometry(0.26 * scale, 0.38 * scale);
  tailGeo.rotateY(Math.PI / 2);
  const tail = new THREE.Mesh(tailGeo, finMat);
  tail.position.set(0, 0, -0.48 * scale);
  koi.add(tail);

  return { group: koi, tail };
}

/**
 * Builds the complete, breathtaking 3D Lotus Pond (കിഴക്കുംപുറം താമരക്കുളം)
 * faithfully recreating the organic kidney shape, boulder shoreline, dark inner lip,
 * crystal turquoise water, submerged pebble bed, floating notched lily pads,
 * blooming lotus blossoms, and swimming fish from the reference image.
 */
export function buildBeautifulLotusPond(centerX = -80, centerZ = -75): LotusPondData {
  const pondGroup = new THREE.Group();
  pondGroup.position.set(centerX, 0, centerZ);

  const colliders: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [];

  const baseRadius = 12.0;
  const numPerimeterPoints = 48;

  // 1. Calculate Perimeter Points for Shoreline, Water, and Basin
  const outerContourPoints: THREE.Vector2[] = [];
  const innerContourPoints: THREE.Vector2[] = [];
  const sandContourPoints: THREE.Vector2[] = [];

  for (let i = 0; i < numPerimeterPoints; i++) {
    const angle = (i / numPerimeterPoints) * Math.PI * 2;
    const rBase = getOrganicPondRadius(angle, baseRadius);

    const rWater = rBase * 0.98;
    const rInnerRim = rBase * 1.0;
    const rSand = rBase * 1.16;

    innerContourPoints.push(new THREE.Vector2(Math.cos(angle) * rWater, Math.sin(angle) * rWater));
    outerContourPoints.push(new THREE.Vector2(Math.cos(angle) * rInnerRim, Math.sin(angle) * rInnerRim));
    sandContourPoints.push(new THREE.Vector2(Math.cos(angle) * rSand, Math.sin(angle) * rSand));
  }

  // 2. Sandy & Gravel Bank Apron (Soft ground transition underneath boulders)
  const sandShape = new THREE.Shape(sandContourPoints);
  const sandInnerHole = new THREE.Path(innerContourPoints);
  sandShape.holes.push(sandInnerHole);

  const sandGeo = new THREE.ShapeGeometry(sandShape);
  sandGeo.rotateX(-Math.PI / 2);
  const sandMat = new THREE.MeshLambertMaterial({
    color: 0xc8aa78,
    side: THREE.DoubleSide,
  });
  const sandMesh = new THREE.Mesh(sandGeo, sandMat);
  sandMesh.position.y = 0.04;
  sandMesh.receiveShadow = true;
  pondGroup.add(sandMesh);

  // 3. Submerged Basin Floor with Pebble Bed (അടിത്തട്ടിലെ ചരൽത്തറ)
  const bedShape = new THREE.Shape(innerContourPoints);
  const bedGeo = new THREE.ShapeGeometry(bedShape);
  bedGeo.rotateX(-Math.PI / 2);
  const bedMat = new THREE.MeshLambertMaterial({
    color: 0x6e766c,
    side: THREE.DoubleSide,
  });
  const bedMesh = new THREE.Mesh(bedGeo, bedMat);
  bedMesh.position.y = -0.72;
  bedMesh.receiveShadow = true;
  pondGroup.add(bedMesh);

  // Scattered Underwater River Pebbles visible through the clear water
  const pebbleColors = [0x57534e, 0x78716c, 0xa8a29e, 0x44403c, 0x94a3b8];
  const pebbleMat = pebbleColors.map(c => new THREE.MeshLambertMaterial({ color: c }));
  const pebbleGeo = new THREE.SphereGeometry(0.22, 5, 4);
  pebbleGeo.scale(1.2, 0.45, 1.0);

  for (let p = 0; p < 55; p++) {
    const angle = Math.random() * Math.PI * 2;
    const rMax = getOrganicPondRadius(angle, baseRadius) * 0.85;
    const rDist = Math.sqrt(Math.random()) * rMax;
    const px = Math.cos(angle) * rDist;
    const pz = Math.sin(angle) * rDist;

    const pebble = new THREE.Mesh(pebbleGeo, pebbleMat[p % pebbleMat.length]);
    const pScale = 0.5 + Math.random() * 0.9;
    pebble.scale.set(pScale, pScale * 0.4, pScale * (0.8 + Math.random() * 0.5));
    pebble.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3);
    pebble.position.set(px, -0.66, pz);
    pondGroup.add(pebble);
  }

  // 4. Smooth Dark Inner Basin Lip / Waterproof Rim (കറുത്ത വാട്ടർലൈൻ റിം)
  // Replicating the distinctive smooth dark collar between rocks and water from Image 2
  const rimPoints: THREE.Vector3[] = [];
  for (let i = 0; i <= numPerimeterPoints; i++) {
    const idx = i % numPerimeterPoints;
    const angle = (idx / numPerimeterPoints) * Math.PI * 2;
    const rRim = getOrganicPondRadius(angle, baseRadius) * 0.985;
    rimPoints.push(new THREE.Vector3(Math.cos(angle) * rRim, -0.05, Math.sin(angle) * rRim));
  }
  const rimCurve = new THREE.CatmullRomCurve3(rimPoints);
  const rimGeo = new THREE.TubeGeometry(rimCurve, 64, 0.18, 7, true);
  const rimMat = new THREE.MeshLambertMaterial({
    color: 0x1f2937,
  });
  const rimMesh = new THREE.Mesh(rimGeo, rimMat);
  pondGroup.add(rimMesh);

  // 5. Crystal Clear Turquoise Water Surface (ഗ്ലാസ് പോലെയുള്ള തെളിഞ്ഞ നീല വെള്ളം)
  const waterShape = new THREE.Shape(innerContourPoints);
  const waterGeo = new THREE.ShapeGeometry(waterShape, 32);
  waterGeo.rotateX(-Math.PI / 2);

  const waterMat = new THREE.MeshPhongMaterial({
    color: 0x06b6d4,
    emissive: 0x024551,
    specular: 0xa5f3fc,
    shininess: 130,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
  });
  const waterMesh = new THREE.Mesh(waterGeo, waterMat);
  waterMesh.position.y = -0.14;
  pondGroup.add(waterMesh);

  // Shimmering Water Surface Caustic Accents
  const causticGeo = new THREE.CircleGeometry(0.7, 6);
  causticGeo.rotateX(-Math.PI / 2);
  const causticMat = new THREE.MeshBasicMaterial({
    color: 0xecfeff,
    transparent: true,
    opacity: 0.28,
  });
  const causticMeshes: THREE.Mesh[] = [];
  for (let c = 0; c < 16; c++) {
    const cMesh = new THREE.Mesh(causticGeo, causticMat);
    const angle = Math.random() * Math.PI * 2;
    const rDist = (0.2 + Math.random() * 0.6) * getOrganicPondRadius(angle, baseRadius);
    cMesh.position.set(Math.cos(angle) * rDist, -0.135, Math.sin(angle) * rDist);
    cMesh.scale.set(0.6 + Math.random() * 1.0, 1, 0.4 + Math.random() * 0.8);
    cMesh.rotation.y = Math.random() * Math.PI;
    pondGroup.add(cMesh);
    causticMeshes.push(cMesh);
  }

  // 6. River Rock & Boulder Ring (കരിങ്കല്ല് & ഉരുളൻ പാറക്കല്ലുകൾ)
  // Layered natural river rocks snugly bordering the pond sides directly on the water's edge
  const boulderColors = [0x8c6b4f, 0xa6825c, 0x785a40, 0xbfa07a, 0x6e5e49, 0x9c7a56];
  const boulderMaterials = boulderColors.map(c => new THREE.MeshLambertMaterial({ color: c }));
  const rockGeo = new THREE.DodecahedronGeometry(1.0, 1);

  // Concentric layered rocks snug against the water perimeter
  const numBoulders = 64;
  for (let b = 0; b < numBoulders; b++) {
    const angle = (b / numBoulders) * Math.PI * 2 + (Math.random() - 0.5) * 0.04;
    const rBound = getOrganicPondRadius(angle, baseRadius);

    // Stagger boulders snugly along the waterline:
    // Inner tier rests directly along the water margin/rim, outer tier interlocks directly behind it
    const isOuter = b % 2 === 0;
    const rDist = isOuter
      ? rBound * 1.05 + (Math.random() - 0.5) * 0.35
      : rBound * 0.97 + (Math.random() - 0.5) * 0.25;
    const bx = Math.cos(angle) * rDist;
    const bz = Math.sin(angle) * rDist;

    const bMesh = new THREE.Mesh(rockGeo, boulderMaterials[b % boulderMaterials.length]);
    const bScale = (isOuter ? 0.9 : 0.72) + Math.random() * 0.38;
    bMesh.scale.set(
      bScale * (0.85 + Math.random() * 0.4),
      bScale * (0.55 + Math.random() * 0.25), // slightly flattened river rock profile
      bScale * (0.85 + Math.random() * 0.4)
    );
    bMesh.rotation.set(
      Math.random() * 0.4,
      Math.random() * Math.PI * 2,
      Math.random() * 0.4
    );
    bMesh.position.set(bx, (bMesh.scale.y * 0.5) - 0.12, bz);
    bMesh.castShadow = true;
    bMesh.receiveShadow = true;
    pondGroup.add(bMesh);

    // Sprout lush green sedge tufts and yellow wildflowers between boulder crevices
    if (b % 3 === 0) {
      const tuft = createShorelineSedgeTuft(0x22c55e, 0.8 + Math.random() * 0.4);
      const tuftOffset = isOuter ? 0.35 : -0.15;
      tuft.position.set(
        Math.cos(angle) * (rDist + tuftOffset),
        0.08,
        Math.sin(angle) * (rDist + tuftOffset)
      );
      pondGroup.add(tuft);
    }
  }

  // 7. Natural Stepping Stones (നടക്കല്ലുകൾ) on the West Cove Shore
  // Permitting player to step right up to the water's edge
  const stepGeo = new THREE.CylinderGeometry(0.7, 0.75, 0.3, 8);
  const stepMat = new THREE.MeshLambertMaterial({ color: 0x9a8067 });
  for (let s = 0; s < 3; s++) {
    const stepMesh = new THREE.Mesh(stepGeo, stepMat);
    stepMesh.position.set(-10.5 + s * 1.1, -0.05, 3.2 - s * 0.4);
    stepMesh.rotation.y = Math.random() * Math.PI;
    pondGroup.add(stepMesh);
  }

  // 8. Authentic Floating Water Lily Pads (താമരയിലകൾ • With Characteristic Notches)
  // Accurately recreating the clusters of varying sizes from Image 2
  interface FloatingPad {
    group: THREE.Group;
    baseY: number;
    phase: number;
    speed: number;
  }
  const floatingPads: FloatingPad[] = [];

  // Cluster 1 (Main iconic cluster in the tranquil bay - exactly matching Image 2's arrangement)
  const cluster1Center = new THREE.Vector2(-4.2, -3.2);
  const cluster1Pads = [
    { offset: new THREE.Vector2(0, 0), radius: 1.55, rot: 0.3, color: 0x16a34a }, // Mother pad
    { offset: new THREE.Vector2(-0.8, -1.8), radius: 1.2, rot: 1.4, color: 0x22c55e }, // Medium pad
    { offset: new THREE.Vector2(1.6, -1.1), radius: 0.95, rot: -0.6, color: 0x15803d }, // Small pad
    { offset: new THREE.Vector2(0.6, -2.6), radius: 0.75, rot: 2.1, color: 0x22c55e }, // Baby pad
    { offset: new THREE.Vector2(2.1, -2.5), radius: 0.65, rot: -1.8, color: 0x16a34a }, // Baby pad 2
  ];

  cluster1Pads.forEach((p, idx) => {
    const pad = createNotchedLilyPad(p.radius, p.color);
    const px = cluster1Center.x + p.offset.x;
    const pz = cluster1Center.y + p.offset.y;
    pad.position.set(px, -0.145, pz);
    pad.rotation.y = p.rot;
    pondGroup.add(pad);

    floatingPads.push({
      group: pad,
      baseY: -0.145,
      phase: idx * 0.8,
      speed: 1.2,
    });
  });

  // Cluster 2 (Secondary peaceful cluster in the East cove)
  const cluster2Center = new THREE.Vector2(5.5, 2.5);
  const cluster2Pads = [
    { offset: new THREE.Vector2(0, 0), radius: 1.4, rot: -1.2, color: 0x16a34a },
    { offset: new THREE.Vector2(1.4, -0.6), radius: 1.05, rot: 0.8, color: 0x22c55e },
    { offset: new THREE.Vector2(-1.1, 0.9), radius: 0.85, rot: 2.4, color: 0x15803d },
    { offset: new THREE.Vector2(0.5, 1.4), radius: 0.65, rot: -0.4, color: 0x22c55e },
  ];

  cluster2Pads.forEach((p, idx) => {
    const pad = createNotchedLilyPad(p.radius, p.color);
    const px = cluster2Center.x + p.offset.x;
    const pz = cluster2Center.y + p.offset.y;
    pad.position.set(px, -0.145, pz);
    pad.rotation.y = p.rot;
    pondGroup.add(pad);

    floatingPads.push({
      group: pad,
      baseY: -0.145,
      phase: idx * 0.9 + 2.0,
      speed: 1.1,
    });
  });

  // Cluster 3 (Quiet North-West bay cluster)
  const cluster3Center = new THREE.Vector2(-5.0, 5.0);
  const cluster3Pads = [
    { offset: new THREE.Vector2(0, 0), radius: 1.25, rot: 1.9, color: 0x22c55e },
    { offset: new THREE.Vector2(1.2, 0.8), radius: 0.8, rot: -0.9, color: 0x16a34a },
  ];
  cluster3Pads.forEach((p, idx) => {
    const pad = createNotchedLilyPad(p.radius, p.color);
    const px = cluster3Center.x + p.offset.x;
    const pz = cluster3Center.y + p.offset.y;
    pad.position.set(px, -0.145, pz);
    pad.rotation.y = p.rot;
    pondGroup.add(pad);

    floatingPads.push({
      group: pad,
      baseY: -0.145,
      phase: idx * 0.7 + 4.0,
      speed: 1.0,
    });
  });

  // 9. Delicate Water Lily & Lotus Blossoms (ആമ്പൽപൂക്കൾ & താമരകൾ)
  const lotusFlowers = [
    { pos: new THREE.Vector3(-3.2, -0.12, -4.6), type: 'pink' as const, scale: 1.15 },
    { pos: new THREE.Vector3(-5.6, -0.12, -2.1), type: 'pink' as const, scale: 0.95 },
    { pos: new THREE.Vector3(6.8, -0.12, 1.8), type: 'white' as const, scale: 1.1 },
    { pos: new THREE.Vector3(4.2, -0.12, 3.6), type: 'pink' as const, scale: 0.85 },
    { pos: new THREE.Vector3(-4.0, -0.12, 5.8), type: 'white' as const, scale: 1.0 },
  ];

  lotusFlowers.forEach((f, idx) => {
    const flower = createLotusBlossom(f.type, f.scale);
    flower.position.copy(f.pos);
    pondGroup.add(flower);

    floatingPads.push({
      group: flower,
      baseY: f.pos.y,
      phase: idx * 1.2,
      speed: 1.3,
    });
  });

  // 10. Swimming Ornamental Koi Fish (വർണ്ണ മത്സ്യങ്ങൾ)
  interface SwimmingKoi {
    group: THREE.Group;
    tail: THREE.Mesh;
    orbitRadius: number;
    orbitSpeed: number;
    orbitCenter: THREE.Vector2;
    phase: number;
  }
  const swimmingKois: SwimmingKoi[] = [];

  const koiConfigs = [
    { color: 0xf97316, center: new THREE.Vector2(0, 1.0), orbitR: 4.8, speed: 0.35, phase: 0 },
    { color: 0xffffff, center: new THREE.Vector2(0, 1.0), orbitR: 5.4, speed: -0.32, phase: 2.2 },
    { color: 0xeab308, center: new THREE.Vector2(-2.5, 0.5), orbitR: 3.5, speed: 0.42, phase: 4.1 },
    { color: 0xef4444, center: new THREE.Vector2(3.0, -1.0), orbitR: 4.2, speed: -0.38, phase: 1.5 },
  ];

  koiConfigs.forEach(cfg => {
    const koi = createKoiFish(cfg.color, 0.9);
    koi.group.position.set(cfg.center.x, -0.38, cfg.center.y);
    pondGroup.add(koi.group);

    swimmingKois.push({
      group: koi.group,
      tail: koi.tail,
      orbitRadius: cfg.orbitR,
      orbitSpeed: cfg.speed,
      orbitCenter: cfg.center,
      phase: cfg.phase,
    });
  });

  // 11. Traditional Stone Lamp Pillar (കൽവിളക്ക്) on the Pond Bank
  const lampGroup = new THREE.Group();
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x857666 });
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.6, 0.6, 6), stoneMat);
  lampBase.position.y = 0.3;
  const lampPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 2.2, 6), stoneMat);
  lampPillar.position.y = 1.4;
  const lampPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.2, 0.25, 6), stoneMat);
  lampPlate.position.y = 2.4;
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 5), flameMat);
  flame.position.y = 2.65;
  lampGroup.add(lampBase, lampPillar, lampPlate, flame);
  lampGroup.position.set(-13.2, 0, 5.2);
  pondGroup.add(lampGroup);

  // ==============================================================
  // 11B. 🌸 WINDING STEPPING-STONE PATH FROM SIDE ROAD TO POND
  // Matches the user's reference image:
  // Meandering natural flagstone slabs embedded in the lawn,
  // lined with river rocks, lush white daisy wildflowers with golden centers,
  // and a rustic entrance wooden signpost at the side road junction.
  // ==============================================================
  const trailGroup = new THREE.Group();

  // Natural flagstone paver materials (layered greys and warm earth tones)
  const flagstoneColors = [0x9ca3af, 0xb8b4aa, 0x8d8980, 0xd1d5db, 0xa39d91];
  const flagstoneMats = flagstoneColors.map(c => new THREE.MeshLambertMaterial({ color: c }));
  const paverBorderMat = new THREE.MeshLambertMaterial({ color: 0x6b7280 });
  const whiteDaisyMat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const daisyCenterMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });
  const stemMat = new THREE.MeshLambertMaterial({ color: 0x16a34a });
  const pebbleMatTrail = new THREE.MeshLambertMaterial({ color: 0x78716c });

  // Waypoints along the meandering path from the side road (Z ~ 43) to the pond shoreline (Z ~ 13.5)
  const pathWaypoints: THREE.Vector3[] = [
    new THREE.Vector3(-2.2, 0, 43.0), // At side road concrete edge
    new THREE.Vector3(-1.8, 0, 39.5),
    new THREE.Vector3(-0.9, 0, 35.0),
    new THREE.Vector3(0.5, 0, 30.5),
    new THREE.Vector3(1.8, 0, 26.0),
    new THREE.Vector3(2.4, 0, 21.5),
    new THREE.Vector3(1.6, 0, 17.5),
    new THREE.Vector3(0.4, 0, 14.2),  // Snug up to pond rocks & water
  ];

  const pathSpline = new THREE.CatmullRomCurve3(pathWaypoints);
  const numPavers = 24;

  for (let p = 0; p <= numPavers; p++) {
    const t = p / numPavers;
    const pt = pathSpline.getPoint(t);
    const tangent = pathSpline.getTangent(t);
    const angle = Math.atan2(tangent.x, tangent.z);

    // Flat organic flagstone stepping stone
    const paverWidth = 1.35 + (p % 3 === 0 ? 0.25 : -0.15) + (Math.sin(p * 1.7) * 0.15);
    const paverLength = 1.1 + (Math.cos(p * 2.3) * 0.2);
    const paverGeo = new THREE.CylinderGeometry(paverWidth * 0.5, paverWidth * 0.53, 0.08, 8);
    const paverMesh = new THREE.Mesh(paverGeo, flagstoneMats[p % flagstoneMats.length]);
    paverMesh.scale.set(1.0, 1.0, paverLength / paverWidth);
    paverMesh.rotation.y = angle + (Math.random() - 0.5) * 0.3;
    paverMesh.position.set(pt.x + (Math.random() - 0.5) * 0.12, 0.045, pt.z);
    paverMesh.receiveShadow = true;
    trailGroup.add(paverMesh);

    // Paver grout / border rim
    const borderGeo = new THREE.TorusGeometry(paverWidth * 0.51, 0.035, 4, 8);
    borderGeo.rotateX(Math.PI / 2);
    const borderMesh = new THREE.Mesh(borderGeo, paverBorderMat);
    borderMesh.position.copy(paverMesh.position);
    borderMesh.position.y = 0.03;
    borderMesh.scale.set(1.0, 1.0, paverLength / paverWidth);
    trailGroup.add(borderMesh);

    // Flanking river stones along the left and right path edges
    [-1, 1].forEach(side => {
      const normalX = -tangent.z * side;
      const normalZ = tangent.x * side;
      const rockDist = paverWidth * 0.65 + 0.35 + (Math.random() * 0.3);
      const rx = pt.x + normalX * rockDist;
      const rz = pt.z + normalZ * rockDist;

      // Small boundary rock
      const pebble = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.24 + Math.random() * 0.22, 1),
        pebbleMatTrail
      );
      pebble.scale.set(1 + Math.random() * 0.4, 0.65, 1 + Math.random() * 0.4);
      pebble.position.set(rx, 0.08, rz);
      pebble.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.4);
      pebble.castShadow = true;
      trailGroup.add(pebble);

      // White Daisy Wildflowers cluster (ആമ്പൽപാതയിലെ ഡെയ്സി പൂക്കൾ)
      if (p % 2 === 0 || side === 1) {
        const flowerCluster = new THREE.Group();
        const flowerCount = 2 + Math.floor(Math.random() * 3);

        for (let f = 0; f < flowerCount; f++) {
          const fx = (Math.random() - 0.5) * 0.45;
          const fz = (Math.random() - 0.5) * 0.45;
          const flowerH = 0.25 + Math.random() * 0.22;

          // Green stem
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, flowerH, 4), stemMat);
          stem.position.set(fx, flowerH * 0.5, fz);
          flowerCluster.add(stem);

          // Golden center disc
          const center = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.02, 8), daisyCenterMat);
          center.position.set(fx, flowerH + 0.01, fz);
          flowerCluster.add(center);

          // White radiating petals
          const petals = new THREE.Mesh(new THREE.CircleGeometry(0.12, 10), whiteDaisyMat);
          petals.rotateX(-Math.PI / 2);
          petals.position.set(fx, flowerH, fz);
          flowerCluster.add(petals);
        }

        flowerCluster.position.set(rx + (Math.random() - 0.5) * 0.3, 0.02, rz + (Math.random() - 0.5) * 0.3);
        trailGroup.add(flowerCluster);
      }
    });
  }

  // Rustic Wooden Signpost at Road Junction (Z: 43.2, X: -3.8)
  const signpostGroup = new THREE.Group();
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x5c3a21 });
  const woodBoardMat = new THREE.MeshLambertMaterial({ color: 0x7c4a2d });
  const signTextMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // Wooden vertical post
  const signPost = new THREE.Mesh(new THREE.BoxGeometry(0.14, 2.1, 0.14), woodMat);
  signPost.position.y = 1.05;
  signPost.castShadow = true;
  signpostGroup.add(signPost);

  // Directional sign board pointing towards pond
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.08), woodBoardMat);
  signBoard.position.set(0.4, 1.85, 0);
  signBoard.rotation.y = -0.22;
  signpostGroup.add(signBoard);

  // Sign text line (gold / yellow arrow & lettering)
  const signTextStrip = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.3), signTextMat);
  signTextStrip.position.set(0.4, 1.85, 0.045);
  signTextStrip.rotation.y = -0.22;
  signpostGroup.add(signTextStrip);

  signpostGroup.position.set(-3.8, 0, 43.2);
  trailGroup.add(signpostGroup);

  pondGroup.add(trailGroup);

  // 12. Safe Collision Boundaries: prevent player from falling into deep center
  // Deep water basin collider centered in pond
  colliders.push({
    minX: centerX - 8.5,
    maxX: centerX + 8.5,
    minZ: centerZ - 8.5,
    maxZ: centerZ + 8.5,
  });
  // Surrounding rock boundary colliders for major boulder clumps
  colliders.push(
    { minX: centerX + 11.0, maxX: centerX + 15.5, minZ: centerZ - 6.0, maxZ: centerZ + 6.0 },
    { minX: centerX - 16.0, maxX: centerX - 11.5, minZ: centerZ - 6.0, maxZ: centerZ + 6.0 },
    { minX: centerX - 7.0, maxX: centerX + 7.0, minZ: centerZ - 15.0, maxZ: centerZ - 10.5 },
    { minX: centerX - 7.0, maxX: centerX + 7.0, minZ: centerZ + 10.5, maxZ: centerZ + 15.0 }
  );

  // 13. Dynamic Animation Handler (Gentle floating swells, caustics shimmer, and koi swim)
  const updateAnimation = (time: number) => {
    // Floating lily pad bobbing & gentle tilt
    floatingPads.forEach(f => {
      const swell = Math.sin(time * 0.0022 * f.speed + f.phase);
      f.group.position.y = f.baseY + swell * 0.025;
      f.group.rotation.x = Math.sin(time * 0.0018 * f.speed + f.phase) * 0.028;
      f.group.rotation.z = Math.cos(time * 0.0016 * f.speed + f.phase) * 0.028;
    });

    // Shimmering water caustics
    causticMeshes.forEach((cm, i) => {
      (cm.material as THREE.MeshBasicMaterial).opacity = 0.18 + 0.14 * Math.sin(time * 0.003 + i);
    });

    // Swimming koi fish motion
    swimmingKois.forEach(koi => {
      const angle = time * 0.0006 * koi.orbitSpeed + koi.phase;
      const kx = koi.orbitCenter.x + Math.cos(angle) * koi.orbitRadius;
      const kz = koi.orbitCenter.y + Math.sin(angle) * koi.orbitRadius;
      koi.group.position.x = kx;
      koi.group.position.z = kz;
      // Head facing tangent to swimming circle
      const facingAngle = -angle + (koi.orbitSpeed > 0 ? 0 : Math.PI);
      koi.group.rotation.y = facingAngle;
      // Subtle tail wagging animation
      koi.tail.rotation.y = Math.sin(time * 0.008 * Math.abs(koi.orbitSpeed * 10)) * 0.38;
    });
  };

  return {
    group: pondGroup,
    colliders,
    updateAnimation,
    pondCenter: new THREE.Vector3(centerX, 0, centerZ),
    getBoundaryRadius: getOrganicPondRadius,
  };
}
