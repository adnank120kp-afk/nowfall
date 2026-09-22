import * as THREE from 'three';

export interface FootballPhysics {
  ballMesh: THREE.Group;
  update: (
    dt: number,
    playerPosition: THREE.Vector3,
    isPlayerMoving: boolean,
    isSprinting: boolean,
    onGoalScored?: () => void,
    onBallKicked?: () => void
  ) => void;
  resetToCenter: () => void;
  getPosition: () => THREE.Vector3;
}

export interface FootballGroundResult {
  groundGroup: THREE.Group;
  colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[];
  footballPhysics: FootballPhysics;
  centerSpot: THREE.Vector3;
  ticketCounterPos: THREE.Vector3;
}

/**
 * Procedurally generates a high-resolution, photorealistic canvas texture of a regulation
 * soccer / Kerala Sevens football pitch exactly matching the diagram reference:
 * - 10 Alternating vertical mowed lawn stripes (vibrant light & deep rich emerald grass)
 * - Roller sheen directional lighting gradient across each stripe
 * - Tens of thousands of individual organic grass blade strokes and turf fiber texture
 * - Razor-sharp white markings: outer boundary, halfway line, center circle (no dot),
 *   penalty boxes, 6-yard goal areas, goal cage mouth outlines extending outside pitch,
 *   smooth penalty D-arcs, corner arcs with diagonal corner ticks.
 */
function createFootballPitchCanvasTexture(width = 1536, height = 2304): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Base 10 alternating vertical mowed lawn stripes (matching user reference image)
  const numStripes = 10;
  const stripeWidth = width / numStripes;

  for (let i = 0; i < numStripes; i++) {
    const x0 = i * stripeWidth;
    const isLight = i % 2 === 0;

    // Linear gradient across each stripe for the realistic mower roller reflection
    const grad = ctx.createLinearGradient(x0, 0, x0 + stripeWidth, 0);
    if (isLight) {
      grad.addColorStop(0, '#56b022');
      grad.addColorStop(0.5, '#63c428');
      grad.addColorStop(1, '#4ea31e');
    } else {
      grad.addColorStop(0, '#317812');
      grad.addColorStop(0.5, '#3b8e18');
      grad.addColorStop(1, '#296b0f');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(x0, 0, stripeWidth, height);
  }

  // 2. High-density organic grass blades and carpet turf fibers
  const bladeCount = 80000;
  const bladeColors = [
    'rgba(145, 235, 65, 0.45)', // bright lime highlight
    'rgba(110, 205, 45, 0.50)', // vibrant spring green
    'rgba(75, 170, 30, 0.55)',  // rich emerald green
    'rgba(45, 125, 18, 0.45)',  // deep mid-tone green
    'rgba(25, 78, 10, 0.38)',   // shadow blade
    'rgba(180, 248, 88, 0.35)', // sunlit golden tip
  ];

  ctx.lineWidth = 1.35;
  ctx.lineCap = 'round';

  // Seeded deterministic random generator for fast, stable rendering
  let seed = 42;
  function rnd(): number {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (let b = 0; b < bladeCount; b++) {
    const bx = rnd() * width;
    const by = rnd() * height;
    const len = 5 + rnd() * 11;
    const angle = (rnd() - 0.5) * 0.7; // natural tilt
    const col = bladeColors[Math.floor(rnd() * bladeColors.length)];

    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    const midLen = len * 0.55;
    const cx = bx + Math.sin(angle) * midLen + (rnd() - 0.5) * 2;
    const cy = by - Math.cos(angle) * midLen;
    const ex = bx + Math.sin(angle * 1.3) * len;
    const ey = by - Math.cos(angle * 1.3) * len;
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
  }

  // 3. Fine turf grain overlay for biological density & depth
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  const len = data.length;
  for (let i = 0; i < len; i += 4) {
    const noise = (rnd() - 0.5) * 22;
    data[i] = Math.max(0, Math.min(255, data[i] + noise * 0.65));
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 1.1));
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.45));
  }
  ctx.putImageData(imgData, 0, 0);

  // 4. White Pitch Markings exactly matching the reference diagram
  const marginX = width * 0.048;
  const marginY = height * 0.045;
  const pitchW = width - marginX * 2;
  const pitchH = height - marginY * 2;

  const left = marginX;
  const right = width - marginX;
  const top = marginY;
  const bottom = height - marginY;
  const midX = left + pitchW / 2;
  const midY = top + pitchH / 2;

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = Math.round(width * 0.0076);
  ctx.lineCap = 'square';
  ctx.lineJoin = 'miter';

  // A. Outer boundary touchlines & goal lines
  ctx.strokeRect(left, top, pitchW, pitchH);

  // B. Halfway line across the middle
  ctx.beginPath();
  ctx.moveTo(left, midY);
  ctx.lineTo(right, midY);
  ctx.stroke();

  // C. Center circle (clean circle, no center spot, as in diagram)
  const centerRadius = pitchW * 0.178;
  ctx.beginPath();
  ctx.arc(midX, midY, centerRadius, 0, Math.PI * 2);
  ctx.stroke();

  // D. Four Corner Markings (Quarter-circle arc + diagonal corner tick)
  const cornerRadius = pitchW * 0.038;
  const cornerTick = pitchW * 0.016;

  // Top-left
  ctx.beginPath();
  ctx.arc(left, top, cornerRadius, 0, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(left + cornerTick, top);
  ctx.lineTo(left, top + cornerTick);
  ctx.stroke();

  // Top-right
  ctx.beginPath();
  ctx.arc(right, top, cornerRadius, Math.PI / 2, Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(right - cornerTick, top);
  ctx.lineTo(right, top + cornerTick);
  ctx.stroke();

  // Bottom-left
  ctx.beginPath();
  ctx.arc(left, bottom, cornerRadius, -Math.PI / 2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(left + cornerTick, bottom);
  ctx.lineTo(left, bottom - cornerTick);
  ctx.stroke();

  // Bottom-right
  ctx.beginPath();
  ctx.arc(right, bottom, cornerRadius, Math.PI, -Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(right - cornerTick, bottom);
  ctx.lineTo(right, bottom - cornerTick);
  ctx.stroke();

  // Dimensions for Penalty Box, Goal Area, Goal Mouth, Penalty Arc
  const penBoxW = pitchW * 0.585;
  const penBoxH = pitchH * 0.155;
  const goalAreaW = pitchW * 0.30;
  const goalAreaH = pitchH * 0.058;
  const goalMouthW = pitchW * 0.165;
  const goalMouthH = pitchH * 0.032;

  const penSpotDist = pitchH * 0.108;
  const arcRadius = centerRadius;
  const arcDist = penBoxH - penSpotDist;
  const arcAngleOffset = Math.asin(Math.min(0.99, arcDist / arcRadius));

  // E. TOP GOAL AREA
  // Outer Penalty Box
  ctx.strokeRect(midX - penBoxW / 2, top, penBoxW, penBoxH);
  // Inner Goal Area (Six-Yard Box)
  ctx.strokeRect(midX - goalAreaW / 2, top, goalAreaW, goalAreaH);
  // Goal Mouth / Cage extending outside the pitch
  ctx.strokeRect(midX - goalMouthW / 2, top - goalMouthH, goalMouthW, goalMouthH);
  // Penalty Arc (D-arc extending downwards from bottom edge of penalty box)
  ctx.beginPath();
  ctx.arc(midX, top + penSpotDist, arcRadius, arcAngleOffset, Math.PI - arcAngleOffset);
  ctx.stroke();

  // F. BOTTOM GOAL AREA
  // Outer Penalty Box
  ctx.strokeRect(midX - penBoxW / 2, bottom - penBoxH, penBoxW, penBoxH);
  // Inner Goal Area (Six-Yard Box)
  ctx.strokeRect(midX - goalAreaW / 2, bottom - goalAreaH, goalAreaW, goalAreaH);
  // Goal Mouth / Cage extending outside the pitch
  ctx.strokeRect(midX - goalMouthW / 2, bottom, goalMouthW, goalMouthH);
  // Penalty Arc (D-arc extending upwards from top edge of penalty box)
  ctx.beginPath();
  ctx.arc(midX, bottom - penSpotDist, arcRadius, Math.PI + arcAngleOffset, Math.PI * 2 - arcAngleOffset);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 16;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Builds a 3D White Soccer Goalpost with net
 */
function buildGoalpost(width: number, height: number, depth: number): THREE.Group {
  const goal = new THREE.Group();
  const postMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const postRadius = 0.12;

  // Left & Right upright posts
  const postGeo = new THREE.CylinderGeometry(postRadius, postRadius, height, 8);
  const leftPost = new THREE.Mesh(postGeo, postMat);
  leftPost.position.set(-width / 2, height / 2, 0);
  leftPost.castShadow = true;

  const rightPost = new THREE.Mesh(postGeo, postMat);
  rightPost.position.set(width / 2, height / 2, 0);
  rightPost.castShadow = true;

  // Top crossbar
  const barGeo = new THREE.CylinderGeometry(postRadius, postRadius, width, 8);
  barGeo.rotateZ(Math.PI / 2);
  const crossbar = new THREE.Mesh(barGeo, postMat);
  crossbar.position.set(0, height, 0);
  crossbar.castShadow = true;

  // Back net support frame
  const backPostGeo = new THREE.CylinderGeometry(0.06, 0.06, depth, 6);
  backPostGeo.rotateX(Math.PI / 2);

  const topBackLeft = new THREE.Mesh(backPostGeo, postMat);
  topBackLeft.position.set(-width / 2, height, -depth / 2);

  const topBackRight = new THREE.Mesh(backPostGeo, postMat);
  topBackRight.position.set(width / 2, height, -depth / 2);

  const bottomBackLeft = new THREE.Mesh(backPostGeo, postMat);
  bottomBackLeft.position.set(-width / 2, 0.08, -depth / 2);

  const bottomBackRight = new THREE.Mesh(backPostGeo, postMat);
  bottomBackRight.position.set(width / 2, 0.08, -depth / 2);

  // Back bar
  const backBar = new THREE.Mesh(barGeo, postMat);
  backBar.position.set(0, height, -depth);

  const backBottomBar = new THREE.Mesh(barGeo, postMat);
  backBottomBar.position.set(0, 0.08, -depth);

  // Hexagonal / grid net panels (semi-transparent white)
  const netMat = new THREE.MeshBasicMaterial({
    color: 0xefeff5,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    wireframe: true,
  });

  // Back net
  const backNet = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 10, 8), netMat);
  backNet.position.set(0, height / 2, -depth);

  // Top net
  const topNet = new THREE.Mesh(new THREE.PlaneGeometry(width, depth, 10, 4), netMat);
  topNet.rotateX(Math.PI / 2);
  topNet.position.set(0, height, -depth / 2);

  // Side nets
  const sideNetGeo = new THREE.PlaneGeometry(depth, height, 4, 8);
  sideNetGeo.rotateY(Math.PI / 2);

  const leftNet = new THREE.Mesh(sideNetGeo, netMat);
  leftNet.position.set(-width / 2, height / 2, -depth / 2);

  const rightNet = new THREE.Mesh(sideNetGeo, netMat);
  rightNet.position.set(width / 2, height / 2, -depth / 2);

  goal.add(
    leftPost,
    rightPost,
    crossbar,
    topBackLeft,
    topBackRight,
    bottomBackLeft,
    bottomBackRight,
    backBar,
    backBottomBar,
    backNet,
    topNet,
    leftNet,
    rightNet
  );
  return goal;
}

/**
 * Builds Corner Flag
 */
function buildCornerFlag(color1 = 0xdc2626, color2 = 0xfacc15): THREE.Group {
  const flag = new THREE.Group();
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  pole.position.y = 0.9;
  pole.castShadow = true;

  const clothGeo = new THREE.PlaneGeometry(0.55, 0.38);
  clothGeo.rotateY(Math.PI / 2);
  const cloth = new THREE.Mesh(
    clothGeo,
    new THREE.MeshLambertMaterial({ color: color1, side: THREE.DoubleSide })
  );
  cloth.position.set(0, 1.6, 0.28);

  flag.add(pole, cloth);
  return flag;
}

/**
 * Builds high-intensity stadium floodlight pylon
 */
function buildFloodlightTower(): THREE.Group {
  const tower = new THREE.Group();
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x475569 });

  // Main vertical column
  const pylon = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.45, 14, 6), metalMat);
  pylon.position.y = 7;
  pylon.castShadow = true;
  tower.add(pylon);

  // Floodlight head bracket
  const head = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.8, 0.5), metalMat);
  head.position.y = 14;
  tower.add(head);

  // Spotlight lamps
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfffae6 });
  for (let i = 0; i < 4; i++) {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.2), lampMat);
    lamp.position.set(-0.8 + i * 0.53, 14, 0.28);
    tower.add(lamp);
  }

  return tower;
}

/**
 * Creates 3D Football (Classic Telstar pattern: white sphere with black pentagon patches)
 */
function build3DFootball(): THREE.Group {
  const ballGroup = new THREE.Group();
  const ballRadius = 0.32;

  // Base white leather sphere
  const ballMesh = new THREE.Mesh(
    new THREE.SphereGeometry(ballRadius, 16, 16),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  ballMesh.castShadow = true;
  ballGroup.add(ballMesh);

  // Black pentagon patches
  const patchMat = new THREE.MeshLambertMaterial({ color: 0x111111 });
  const patchAngles = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [0.7, 0.7, 0.1],
    [-0.7, 0.7, -0.1],
    [0.7, -0.7, -0.1],
    [-0.7, -0.7, 0.1],
  ];

  patchAngles.forEach(([px, py, pz]) => {
    const dir = new THREE.Vector3(px, py, pz).normalize();
    const patch = new THREE.Mesh(new THREE.CircleGeometry(ballRadius * 0.32, 5), patchMat);
    patch.position.copy(dir).multiplyScalar(ballRadius * 1.002);
    patch.lookAt(ballGroup.position.clone().add(dir.clone().multiplyScalar(2)));
    ballGroup.add(patch);
  });

  return ballGroup;
}

/**
 * Creates low-poly spectator figure for stadium atmosphere
 */
function createSpectatorFan(shirtColor: number, pantColor: number, hasFlag = false): THREE.Group {
  const fan = new THREE.Group();
  const skinMat = new THREE.MeshLambertMaterial({ color: 0x8d5524 });
  const shirtMat = new THREE.MeshLambertMaterial({ color: shirtColor });
  const pantMat = new THREE.MeshLambertMaterial({ color: pantColor });

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 8, 8), skinMat);
  head.position.y = 0.68;
  fan.add(head);

  // Torso / Jersey
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.36, 0.22), shirtMat);
  torso.position.y = 0.42;
  fan.add(torso);

  // Legs sitting on tier
  const legs = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.16, 0.32), pantMat);
  legs.position.set(0, 0.18, 0.08);
  fan.add(legs);

  if (hasFlag) {
    const poleMat = new THREE.MeshLambertMaterial({ color: 0xcccccc });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.85, 6), poleMat);
    pole.position.set(0.18, 0.65, 0.12);
    pole.rotation.z = -0.35;

    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 128;
    flagCanvas.height = 80;
    const fCtx = flagCanvas.getContext('2d');
    if (fCtx) {
      fCtx.fillStyle = '#facc15';
      fCtx.fillRect(0, 0, 128, 80);
      fCtx.fillStyle = '#1d4ed8';
      fCtx.fillRect(0, 25, 128, 30);
    }
    const flagTex = new THREE.CanvasTexture(flagCanvas);
    const flagMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.36, 0.22),
      new THREE.MeshBasicMaterial({ map: flagTex, side: THREE.DoubleSide })
    );
    flagMesh.position.set(0.32, 0.82, 0.12);
    fan.add(pole, flagMesh);
  }

  return fan;
}

/**
 * Creates fluttering multi-colored triangular festival bunting garland (തോരണങ്ങൾ)
 */
function createBuntingGarland(length: number): THREE.Group {
  const garland = new THREE.Group();
  const colors = [0xef4444, 0xfacc15, 0x10b981, 0x2563eb, 0xf97316, 0xffffff];
  const flagW = 0.38;
  const flagH = 0.44;
  const spacing = 0.55;
  const count = Math.floor(length / spacing);
  const startX = -((count - 1) * spacing) / 2;

  // Thin rope line
  const stringGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-length / 2, 0, 0),
    new THREE.Vector3(length / 2, 0, 0),
  ]);
  const stringLine = new THREE.Line(stringGeo, new THREE.LineBasicMaterial({ color: 0xe2e8f0 }));
  garland.add(stringLine);

  for (let i = 0; i < count; i++) {
    const col = colors[i % colors.length];
    const triGeo = new THREE.BufferGeometry();
    const x = startX + i * spacing;
    // Inverted triangle coordinates (top edge flat, pointing down)
    const vertices = new Float32Array([
      x - flagW / 2, 0, 0,
      x + flagW / 2, 0, 0,
      x, -flagH, 0.04 * Math.sin(i * 1.5),
    ]);
    triGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    triGeo.computeVertexNormals();
    const triMat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide });
    const flagMesh = new THREE.Mesh(triGeo, triMat);
    garland.add(flagMesh);
  }

  return garland;
}

/**
 * Builds Stepped Stadium Grandstand / Gallery with vibrant bucket seats, painted stair aisles, spectators, and banners
 */
function buildSteppedGrandstand(
  length: number,
  tiers: number,
  tierWidth: number,
  tierHeight: number,
  seatColor1: number,
  seatColor2: number,
  bannerText: string,
  extraAccentColor?: number
): { group: THREE.Group; depth: number; height: number } {
  const group = new THREE.Group();
  // Vibrant painted concrete: off-white base with bright yellow stair aisle nosings
  const concreteMat = new THREE.MeshLambertMaterial({ color: 0xd6dbe0 });
  const railMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const stairMat = new THREE.MeshLambertMaterial({ color: 0xeab308 }); // caution yellow stair aisles
  const totalDepth = tiers * tierWidth;
  const totalHeight = tiers * tierHeight;

  // Aisle width and spacing
  const aisleSpacing = 11.0; // distance between stair walkways
  const aisleWidth = 1.2;

  // Stepped tiers
  for (let t = 0; t < tiers; t++) {
    const stepW = tierWidth;
    const stepH = (t + 1) * tierHeight;

    // Main tier concrete block
    const stepMesh = new THREE.Mesh(
      new THREE.BoxGeometry(stepW, stepH, length),
      concreteMat
    );
    stepMesh.position.set((t + 0.5) * tierWidth, stepH / 2, 0);
    stepMesh.castShadow = true;
    stepMesh.receiveShadow = true;
    group.add(stepMesh);

    // Front edge nosing stripe on the step
    const nosing = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.05, length),
      stairMat
    );
    nosing.position.set(t * tierWidth + 0.04, stepH, 0);
    group.add(nosing);

    // Stairway walking aisles (painted yellow caution steps)
    const aisleCount = Math.max(1, Math.floor(length / aisleSpacing));
    const aisleStartZ = -((aisleCount - 1) * aisleSpacing) / 2;
    for (let a = 0; a < aisleCount; a++) {
      const az = aisleStartZ + a * aisleSpacing;
      const aisleStep = new THREE.Mesh(
        new THREE.BoxGeometry(stepW + 0.02, 0.02, aisleWidth),
        stairMat
      );
      aisleStep.position.set((t + 0.5) * tierWidth, stepH + 0.01, az);
      group.add(aisleStep);
    }

    // Row of stadium bucket seats on this tier
    const seatSpacing = 0.95;
    const seatCount = Math.floor((length - 1.5) / seatSpacing);
    const startZ = -((seatCount - 1) * seatSpacing) / 2;

    const mat1 = new THREE.MeshLambertMaterial({ color: seatColor1 });
    const mat2 = new THREE.MeshLambertMaterial({ color: seatColor2 });
    const matAccent = extraAccentColor ? new THREE.MeshLambertMaterial({ color: extraAccentColor }) : mat1;

    for (let s = 0; s < seatCount; s++) {
      const sz = startZ + s * seatSpacing;

      // Skip seat placement if in the stairway aisle
      let inAisle = false;
      for (let a = 0; a < aisleCount; a++) {
        const az = aisleStartZ + a * aisleSpacing;
        if (Math.abs(sz - az) < aisleWidth * 0.55) {
          inAisle = true;
          break;
        }
      }
      if (inAisle) continue;

      // Vibrant alternating patterns: checkerboard or blocks
      let curMat = mat1;
      const block = Math.floor(s / 4);
      if ((block + t) % 2 === 0) {
        curMat = mat1;
      } else {
        curMat = mat2;
      }
      // Top row center seats get accent color
      if (t === tiers - 1 && Math.abs(sz) < 3.0 && extraAccentColor) {
        curMat = matAccent;
      }

      const seatGroup = new THREE.Group();
      // Molded seat cushion with front curved lip
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.44), curMat);
      cushion.position.set(0, 0.05, 0);
      // Ergonomic curved backrest
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 0.44), curMat);
      back.position.set(0.2, 0.26, 0);
      // Seat mounting iron bracket
      const bracket = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.12, 6),
        railMat
      );
      bracket.position.set(0, -0.04, 0);
      seatGroup.add(cushion, back, bracket);

      seatGroup.position.set((t + 0.5) * tierWidth, (t + 1) * tierHeight, sz);
      group.add(seatGroup);

      // Low-poly cheering spectators seated in ~30% of seats
      if ((s * 3 + t * 5) % 7 === 0) {
        const hasFlag = (s % 5 === 0);
        const fan = createSpectatorFan(
          s % 2 === 0 ? seatColor1 : seatColor2,
          0x1e293b,
          hasFlag
        );
        fan.position.set((t + 0.5) * tierWidth, (t + 1) * tierHeight, sz);
        // Face forward toward the pitch (-X)
        fan.rotation.y = -Math.PI / 2;
        group.add(fan);
      }
    }
  }

  // Top security railing at back of the gallery
  const backRail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.15, length), railMat);
  backRail.position.set(totalDepth, totalHeight + 0.58, 0);
  group.add(backRail);

  // Fluttering festive multi-colored bunting pennants along the top rail (തോരണങ്ങൾ)
  const bunting = createBuntingGarland(length);
  bunting.position.set(totalDepth - 0.04, totalHeight + 1.12, 0);
  bunting.rotation.y = -Math.PI / 2;
  group.add(bunting);

  // Side railings on both ends
  const sideRail1 = new THREE.Mesh(new THREE.BoxGeometry(totalDepth, 1.15, 0.06), railMat);
  sideRail1.position.set(totalDepth / 2, totalHeight / 2 + 0.58, -length / 2);
  const sideRail2 = sideRail1.clone();
  sideRail2.position.set(totalDepth / 2, totalHeight / 2 + 0.58, length / 2);
  group.add(sideRail1, sideRail2);

  // Front boundary fence with vibrant high-contrast stadium hoarding banner
  const bannerCanvas = document.createElement('canvas');
  bannerCanvas.width = 1024;
  bannerCanvas.height = 128;
  const bCtx = bannerCanvas.getContext('2d');
  if (bCtx) {
    bCtx.fillStyle = '#062817';
    bCtx.fillRect(0, 0, 1024, 128);
    bCtx.strokeStyle = '#facc15';
    bCtx.lineWidth = 8;
    bCtx.strokeRect(4, 4, 1016, 120);

    bCtx.fillStyle = '#facc15';
    bCtx.font = 'bold 36px sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText(bannerText, 512, 58);

    bCtx.fillStyle = '#38bdf8';
    bCtx.font = 'bold 24px monospace';
    bCtx.fillText('★ KERALA SEVENS TOURNAMENT • ENTRY: ₹50 • MANJAPPADA POWER ★', 512, 102);
  }
  const bannerTex = new THREE.CanvasTexture(bannerCanvas);
  const frontBanner = new THREE.Mesh(
    new THREE.PlaneGeometry(length * 0.95, 1.1),
    new THREE.MeshBasicMaterial({ map: bannerTex, side: THREE.DoubleSide })
  );
  frontBanner.position.set(-0.06, tierHeight + 0.55, 0);
  frontBanner.rotation.y = -Math.PI / 2;
  group.add(frontBanner);

  return { group, depth: totalDepth, height: totalHeight };
}

/**
 * Builds Covered VIP Main Grandstand with cantilever canopy roof and commentary box
 */
function buildCoveredVIPPavilion(
  length: number,
  tiers: number,
  tierWidth: number,
  tierHeight: number
): { group: THREE.Group; depth: number } {
  const group = new THREE.Group();
  const standData = buildSteppedGrandstand(
    length,
    tiers,
    tierWidth,
    tierHeight,
    0xf59e0b, // amber gold VIP seats
    0x1d4ed8, // royal blue VIP seats
    '★ KIZHAKKUMPURAM SEVENS CLUB • MAIN VIP PAVILION ★',
    0x10b981 // emerald green accent seats
  );
  group.add(standData.group);

  const totalDepth = standData.depth;
  const totalHeight = standData.height;

  // Cantilever canopy roof columns (steel pylon pillars at back)
  const pillarMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const roofHeight = totalHeight + 4.8;
  const colSpacing = 9.0;
  const colCount = Math.floor(length / colSpacing) + 1;
  const colStartZ = -((colCount - 1) * colSpacing) / 2;

  for (let c = 0; c < colCount; c++) {
    const colMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, roofHeight, 8),
      pillarMat
    );
    colMesh.position.set(totalDepth + 0.2, roofHeight / 2, colStartZ + c * colSpacing);
    group.add(colMesh);

    // Cantilever support truss beam angled forward toward the pitch
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(totalDepth + 2.5, 0.18, 0.18),
      pillarMat
    );
    beam.position.set(totalDepth / 2 - 0.5, roofHeight, colStartZ + c * colSpacing);
    beam.rotation.z = -0.06;
    group.add(beam);
  }

  // Curved Corrugated Stadium Roof Canopy (Dark Green Kerala Stadium Roof)
  const roofGeo = new THREE.PlaneGeometry(totalDepth + 3.4, length + 2);
  roofGeo.rotateX(Math.PI / 2);
  const roofMat = new THREE.MeshLambertMaterial({
    color: 0x164e33, // deep forest stadium green
    side: THREE.DoubleSide,
  });
  const roofMesh = new THREE.Mesh(roofGeo, roofMat);
  roofMesh.position.set(totalDepth / 2 - 0.6, roofHeight + 0.1, 0);
  roofMesh.rotation.z = -0.06;
  group.add(roofMesh);

  // Press & Commentary Box on Top Deck
  const pressBox = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.8, 6.0),
    new THREE.MeshLambertMaterial({ color: 0x0f172a })
  );
  pressBox.position.set(totalDepth - 0.8, totalHeight + 1.2, 0);
  // Glass front window
  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 1.2),
    new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
  );
  glass.position.set(totalDepth - 2.02, totalHeight + 1.2, 0);
  glass.rotation.y = -Math.PI / 2;
  group.add(pressBox, glass);

  return { group, depth: totalDepth };
}

/**
 * Builds Team Technical Dugouts (Home & Away player shelters)
 */
function buildTeamDugout(teamName: string, isHome: boolean): THREE.Group {
  const dugout = new THREE.Group();
  const frameMat = new THREE.MeshLambertMaterial({ color: isHome ? 0x15803d : 0x1d4ed8 });
  const glassMat = new THREE.MeshLambertMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });

  // Curved acrylic shelter hood
  const hood = new THREE.Mesh(
    new THREE.CylinderGeometry(1.6, 1.6, 5.2, 16, 1, false, 0, Math.PI),
    glassMat
  );
  hood.rotation.x = Math.PI / 2;
  hood.position.set(0, 1.3, 0);
  dugout.add(hood);

  // Aluminum frame ribs
  [-2.5, 0, 2.5].forEach((fz) => {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.05, 8, 16, Math.PI), frameMat);
    rib.rotation.y = Math.PI / 2;
    rib.position.set(0, 1.3, fz);
    dugout.add(rib);
  });

  // Bench seating
  const benchMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const bench = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 4.8), benchMat);
  bench.position.set(0.4, 0.25, 0);
  dugout.add(bench);

  // Team signage on top
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 128;
  const sCtx = signCanvas.getContext('2d');
  if (sCtx) {
    sCtx.fillStyle = isHome ? '#14532d' : '#1e3a8a';
    sCtx.fillRect(0, 0, 512, 128);
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 36px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText(teamName, 256, 75);
  }
  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 0.7),
    new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
  );
  signMesh.position.set(0, 2.35, 0);
  signMesh.rotation.y = Math.PI / 2;
  dugout.add(signMesh);

  return dugout;
}

/**
 * Builds Tall Ball-Catch Net behind goalposts
 */
function buildSafetyCatchNet(width: number, height: number): THREE.Group {
  const netGroup = new THREE.Group();
  const poleMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const netMat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
  });

  // 4 Support Steel Pylons
  const poleCount = 4;
  const poleSpacing = width / (poleCount - 1);
  const startX = -width / 2;

  for (let i = 0; i < poleCount; i++) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, height, 8), poleMat);
    pole.position.set(startX + i * poleSpacing, height / 2, 0);
    netGroup.add(pole);
  }

  // Safety Net Mesh
  const netMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height - 0.5, 32, 16), netMat);
  netMesh.position.set(0, height / 2, 0);
  netGroup.add(netMesh);

  return netGroup;
}

/**
 * Builds Digital Electronic LED Stadium Scoreboard
 */
function buildLEDScoreboard(): THREE.Group {
  const boardGroup = new THREE.Group();

  // Lattice steel support frame
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const post1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8.5, 0.4), steelMat);
  post1.position.set(-3.2, 4.25, 0);
  const post2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8.5, 0.4), steelMat);
  post2.position.set(3.2, 4.25, 0);
  boardGroup.add(post1, post2);

  // LED Screen Display
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // LED display frame
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, 1024, 512);

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 1004, 492);

    // Tournament Header
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ ALL KERALA FLOODLIT SEVENS DERBY ⚡', 512, 60);

    // Match Teams & Scores
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('KIZHAKKUMPURAM', 60, 160);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('MALAPPURAM FC', 60, 260);

    // Score numbers in bright neon green LED
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 90px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('2', 960, 160);
    ctx.fillStyle = '#f87171';
    ctx.fillText('1', 960, 260);

    // Match Clock & Status
    ctx.fillStyle = '#eab308';
    ctx.font = 'bold 44px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TIME: 78:42  [2nd HALF]', 512, 360);

    ctx.fillStyle = '#a3e635';
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('LIVE AT TOWN SEVENS STADIUM • ₹50 ENTRY', 512, 440);
  }

  const tex = new THREE.CanvasTexture(canvas);
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(7.8, 3.9),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
  );
  screenMesh.position.set(0, 8.0, 0.2);
  boardGroup.add(screenMesh);

  // Back panel of screen
  const backPanel = new THREE.Mesh(
    new THREE.BoxGeometry(8.2, 4.3, 0.4),
    new THREE.MeshLambertMaterial({ color: 0x0f172a })
  );
  backPanel.position.set(0, 8.0, 0);
  boardGroup.add(backPanel);

  return boardGroup;
}

/**
 * Builds Decorative Stadium Entrance Arch
 */
function buildStadiumEntranceArch(): THREE.Group {
  const archGroup = new THREE.Group();
  const pillarMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const trimMat = new THREE.MeshLambertMaterial({ color: 0x15803d });

  // Twin Entrance Gate Pillars
  const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5.2, 1.2), pillarMat);
  pillar1.position.set(-3.2, 2.6, 0);
  const pillar2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5.2, 1.2), pillarMat);
  pillar2.position.set(3.2, 2.6, 0);
  archGroup.add(pillar1, pillar2);

  // Pillar decorative crowns
  const crown1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.4, 1.5), trimMat);
  crown1.position.set(-3.2, 5.4, 0);
  const crown2 = crown1.clone();
  crown2.position.set(3.2, 5.4, 0);
  archGroup.add(crown1, crown2);

  // Overhead Curved Arch Banner
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#062817';
    ctx.fillRect(0, 0, 1024, 256);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 10;
    ctx.strokeRect(6, 6, 1012, 244);

    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 50px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏟️ കിഴക്കുംപുറം സെവൻസ് സ്റ്റേഡിയം 🏟️', 512, 85);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('KIZHAKKUMPURAM SEVENS FOOTBALL STADIUM', 512, 155);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('ടൗൺ സെവൻസ് കപ്പ് • MAIN GATE • ₹50 ENTRY', 512, 215);
  }

  const tex = new THREE.CanvasTexture(canvas);
  const bannerMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(7.6, 2.2),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
  );
  bannerMesh.position.set(0, 5.2, 0);
  archGroup.add(bannerMesh);

  return archGroup;
}

/**
 * Builds 3D Ticket Counter Booth (₹50 Entry) with high-res signs, window ledge, and floating badge
 */
function buildStadiumTicketCounterBooth(): {
  group: THREE.Group;
  collider: { minX: number; maxX: number; minZ: number; maxZ: number };
} {
  const boothGroup = new THREE.Group();

  // 1. Cabin Walls: cream textured concrete/brick cabin
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xded2b6 }); // Kerala plaster
  const plinthMat = new THREE.MeshLambertMaterial({ color: 0x854d0e }); // laterite brown plinth
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x5c3317 }); // dark teak wood

  const cabinW = 3.6;
  const cabinH = 3.0;
  const cabinD = 2.6;

  // Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(cabinW + 0.3, 0.4, cabinD + 0.3), plinthMat);
  plinth.position.set(0, 0.2, 0);
  boothGroup.add(plinth);

  // Main Cabin
  const mainCabin = new THREE.Mesh(new THREE.BoxGeometry(cabinW, cabinH, cabinD), wallMat);
  mainCabin.position.set(0, cabinH / 2 + 0.2, 0);
  boothGroup.add(mainCabin);

  // Front Service Window Opening (recessed black window hole)
  const windowHole = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.2, 0.1),
    new THREE.MeshLambertMaterial({ color: 0x111111 })
  );
  windowHole.position.set(0, 1.6, cabinD / 2 + 0.02);
  boothGroup.add(windowHole);

  // Wooden Counter Shelf Desk
  const counterShelf = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 0.6), woodMat);
  counterShelf.position.set(0, 1.0, cabinD / 2 + 0.25);
  boothGroup.add(counterShelf);

  // Window Grille Bars
  const barMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  for (let b = -0.8; b <= 0.8; b += 0.3) {
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6), barMat);
    bar.position.set(b, 1.6, cabinD / 2 + 0.05);
    boothGroup.add(bar);
  }

  // Striped Sunshade Awning (Red & Yellow Kerala festival canopy)
  const awningCanvas = document.createElement('canvas');
  awningCanvas.width = 256;
  awningCanvas.height = 256;
  const aCtx = awningCanvas.getContext('2d');
  if (aCtx) {
    for (let s = 0; s < 8; s++) {
      aCtx.fillStyle = s % 2 === 0 ? '#dc2626' : '#facc15';
      aCtx.fillRect(s * 32, 0, 32, 256);
    }
  }
  const awningTex = new THREE.CanvasTexture(awningCanvas);
  awningTex.wrapS = THREE.RepeatWrapping;
  awningTex.wrapT = THREE.RepeatWrapping;

  const awning = new THREE.Mesh(
    new THREE.PlaneGeometry(cabinW + 0.6, 1.4),
    new THREE.MeshLambertMaterial({ map: awningTex, side: THREE.DoubleSide })
  );
  awning.position.set(0, 2.5, cabinD / 2 + 0.5);
  awning.rotation.x = Math.PI / 4;
  boothGroup.add(awning);

  // Cabin Roof (Traditional hip roof)
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(cabinW * 0.8, 1.1, 4),
    new THREE.MeshLambertMaterial({ color: 0x991b1b })
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.set(0, cabinH + 0.75, 0);
  boothGroup.add(roof);

  // Front Painted Board: "ടൗൺ സെവൻസ് ടിക്കറ്റ് കൗണ്ടർ"
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 128;
  const sCtx = signCanvas.getContext('2d');
  if (sCtx) {
    sCtx.fillStyle = '#062817';
    sCtx.fillRect(0, 0, 512, 128);
    sCtx.strokeStyle = '#facc15';
    sCtx.lineWidth = 6;
    sCtx.strokeRect(3, 3, 506, 122);

    sCtx.fillStyle = '#facc15';
    sCtx.font = 'bold 32px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('ടൗൺ സെവൻസ് ടിക്കറ്റ് കൗണ്ടർ', 256, 50);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 24px sans-serif';
    sCtx.fillText('SEVENS TICKET COUNTER', 256, 95);
  }
  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 0.7),
    new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
  );
  signMesh.position.set(0, 2.8, cabinD / 2 + 0.05);
  boothGroup.add(signMesh);

  // Front Price Banner: "ENTRY TICKET: ₹50"
  const priceCanvas = document.createElement('canvas');
  priceCanvas.width = 512;
  priceCanvas.height = 128;
  const pCtx = priceCanvas.getContext('2d');
  if (pCtx) {
    pCtx.fillStyle = '#facc15';
    pCtx.fillRect(0, 0, 512, 128);
    pCtx.strokeStyle = '#dc2626';
    pCtx.lineWidth = 8;
    pCtx.strokeRect(4, 4, 504, 120);

    pCtx.fillStyle = '#dc2626';
    pCtx.font = 'bold 44px sans-serif';
    pCtx.textAlign = 'center';
    pCtx.fillText('🎟️ ENTRY: ₹50 🎟️', 256, 60);

    pCtx.fillStyle = '#000000';
    pCtx.font = 'bold 28px sans-serif';
    pCtx.fillText('പ്രവേശന ഫീസ്: ₹50 മാത്രം', 256, 105);
  }
  const priceTex = new THREE.CanvasTexture(priceCanvas);
  const priceMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.6),
    new THREE.MeshBasicMaterial({ map: priceTex, side: THREE.DoubleSide })
  );
  priceMesh.position.set(0, 0.65, cabinD / 2 + 0.06);
  boothGroup.add(priceMesh);

  // Floating 3D Glowing Ticket Badge above roof
  const badgeCanvas = document.createElement('canvas');
  badgeCanvas.width = 512;
  badgeCanvas.height = 160;
  const bgCtx = badgeCanvas.getContext('2d');
  if (bgCtx) {
    bgCtx.fillStyle = '#062c19';
    bgCtx.fillRect(0, 0, 512, 160);
    bgCtx.strokeStyle = '#eab308';
    bgCtx.lineWidth = 10;
    bgCtx.strokeRect(5, 5, 502, 150);

    bgCtx.fillStyle = '#facc15';
    bgCtx.font = 'bold 40px sans-serif';
    bgCtx.textAlign = 'center';
    bgCtx.fillText('🎫 TICKET COUNTER', 256, 65);

    bgCtx.fillStyle = '#4ade80';
    bgCtx.font = 'bold 44px monospace';
    bgCtx.fillText('₹50 ENTRY', 256, 125);
  }
  const badgeTex = new THREE.CanvasTexture(badgeCanvas);
  const badgeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 1.0),
    new THREE.MeshBasicMaterial({ map: badgeTex, side: THREE.DoubleSide })
  );
  badgeMesh.position.set(0, 4.4, 0);
  boothGroup.add(badgeMesh);

  // Ticket Collector inside booth window
  const vendorHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 12),
    new THREE.MeshLambertMaterial({ color: 0x8d5524 })
  );
  vendorHead.position.set(0, 1.8, 0.2);
  const vendorTurban = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.06, 8, 16),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  vendorTurban.position.set(0, 1.9, 0.2);
  vendorTurban.rotation.x = Math.PI / 2;
  const vendorBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.28, 0.6, 8),
    new THREE.MeshLambertMaterial({ color: 0x1e3a8a })
  );
  vendorBody.position.set(0, 1.35, 0.2);
  boothGroup.add(vendorHead, vendorTurban, vendorBody);

  return {
    group: boothGroup,
    collider: {
      minX: -cabinW / 2 - 0.2,
      maxX: cabinW / 2 + 0.2,
      minZ: -cabinD / 2 - 0.2,
      maxZ: cabinD / 2 + 0.6,
    },
  };
}

/**
 * Main function to build the complete Kerala Sevens Football Ground matching the user's diagram!
 */
export function buildFootballGround(
  centerX = -55,
  centerZ = 65,
  pitchWidth = 44, // width across X (touchlines)
  pitchLength = 66 // length across Z (goal to goal)
): FootballGroundResult {
  const groundGroup = new THREE.Group();
  const colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[] = [];

  // 1. High-resolution canvas textured grass pitch matching reference diagram
  const pitchTexture = createFootballPitchCanvasTexture(1536, 2304);
  const pitchGeo = new THREE.PlaneGeometry(pitchWidth, pitchLength);
  pitchGeo.rotateX(-Math.PI / 2);

  const pitchMat = new THREE.MeshStandardMaterial({
    map: pitchTexture,
    roughness: 0.78,
    metalness: 0.01,
  });

  const pitchMesh = new THREE.Mesh(pitchGeo, pitchMat);
  pitchMesh.position.set(centerX, 0.15, centerZ);
  pitchMesh.receiveShadow = true;
  groundGroup.add(pitchMesh);

  // 2. Elevated 3D Turf base slab underneath (dark emerald grass rim)
  const turfBase = new THREE.Mesh(
    new THREE.BoxGeometry(pitchWidth + 0.6, 0.14, pitchLength + 0.6),
    new THREE.MeshLambertMaterial({ color: 0x1f5210 })
  );
  turfBase.position.set(centerX, 0.07, centerZ);
  groundGroup.add(turfBase);

  // 3. Perimeter red gravel path around the outside of the turf (spacious side concourse)
  const pathMat = new THREE.MeshLambertMaterial({ color: 0x824928 });
  const pathSlab = new THREE.Mesh(
    new THREE.BoxGeometry(pitchWidth + 14.0, 0.06, pitchLength + 6.0),
    pathMat
  );
  pathSlab.position.set(centerX, 0.03, centerZ);
  groundGroup.add(pathSlab);

  // 4. Goalposts aligned with goal lines and goal mouth markings
  const halfW = pitchWidth * 0.452; // aligns with outer touchlines
  const halfL = pitchLength * 0.455; // aligns with outer goal lines
  const goalW = 6.56; // matches goal mouth marking width
  const goalH = 2.44;
  const goalD = 2.2;

  // North Goal (facing South into pitch)
  const northGoal = buildGoalpost(goalW, goalH, goalD);
  northGoal.position.set(centerX, 0.15, centerZ - halfL);
  northGoal.rotation.y = 0; // facing +Z
  groundGroup.add(northGoal);

  // South Goal (facing North into pitch)
  const southGoal = buildGoalpost(goalW, goalH, goalD);
  southGoal.position.set(centerX, 0.15, centerZ + halfL);
  southGoal.rotation.y = Math.PI; // facing -Z
  groundGroup.add(southGoal);

  // Goalpost back-wall colliders so player doesn't walk through back of the net
  colliders.push({
    minX: centerX - goalW / 2 - 0.5,
    maxX: centerX + goalW / 2 + 0.5,
    minZ: centerZ - halfL - goalD - 0.5,
    maxZ: centerZ - halfL + 0.2,
  });
  colliders.push({
    minX: centerX - goalW / 2 - 0.5,
    maxX: centerX + goalW / 2 + 0.5,
    minZ: centerZ + halfL - 0.2,
    maxZ: centerZ + halfL + goalD + 0.5,
  });

  // 5. Corner Flags at 4 corners of the pitch
  const flagPositions = [
    [centerX - halfW, centerZ - halfL],
    [centerX + halfW, centerZ - halfL],
    [centerX - halfW, centerZ + halfL],
    [centerX + halfW, centerZ + halfL],
  ];
  flagPositions.forEach(([fx, fz]) => {
    const flag = buildCornerFlag();
    flag.position.set(fx, 0.15, fz);
    groundGroup.add(flag);
  });

  // 5. Four Stadium Floodlight Towers
  const towerOffsetW = halfW + 4.5;
  const towerOffsetL = halfL + 3.5;
  const towerPositions = [
    [centerX - towerOffsetW, centerZ - towerOffsetL],
    [centerX + towerOffsetW, centerZ - towerOffsetL],
    [centerX - towerOffsetW, centerZ + towerOffsetL],
    [centerX + towerOffsetW, centerZ + towerOffsetL],
  ];
  towerPositions.forEach(([tx, tz]) => {
    const tower = buildFloodlightTower();
    tower.position.set(tx, 0, tz);
    // Orient lamps towards center of pitch
    tower.lookAt(centerX, 7, centerZ);
    groundGroup.add(tower);
    colliders.push({
      minX: tx - 0.9,
      maxX: tx + 0.9,
      minZ: tz - 0.9,
      maxZ: tz + 0.9,
    });
  });

  // 6. STADIUM SIDE-SEATING GALLERIES, VIP PAVILION, DUGOUTS & FRONT TICKET COUNTER
  // 6A. East Grandstand (General Sideline Stand - Manjappada Yellow & Blue, 6 tiers)
  // Perfectly parallel to the East touchline, sitting completely outside the pitch on the side, facing inward (-X)
  const eastStandLength = 54;
  const eastStandTiers = 6;
  const eastStandTierW = 1.05;
  const eastStandTierH = 0.62;
  const eastStand = buildSteppedGrandstand(
    eastStandLength,
    eastStandTiers,
    eastStandTierW,
    eastStandTierH,
    0xfacc15, // Kerala Blasters / Yellow Army yellow
    0x1d4ed8, // Kerala Sevens blue
    '★ KIZHAKKUMPURAM SEVENS FOOTBALL CLUB • EAST SIDE GRANDSTAND • മഞ്ഞപ്പട ★',
    0xffffff // white accent seats
  );
  // Positioned strictly along the East side of the pitch, generously outside the turf
  const eastStandX = centerX + halfW + 6.0;
  eastStand.group.position.set(eastStandX, 0, centerZ);
  eastStand.group.rotation.y = 0; // Length runs North-South along Z; seats face West (-X) directly into pitch!
  groundGroup.add(eastStand.group);
  colliders.push({
    minX: eastStandX - 0.2,
    maxX: eastStandX + eastStand.depth + 1.2,
    minZ: centerZ - eastStandLength / 2 - 0.5,
    maxZ: centerZ + eastStandLength / 2 + 0.5,
  });

  // 6B. West Main VIP Pavilion (Covered Grandstand with cantilever canopy roof)
  // Perfectly parallel to the West touchline, sitting completely outside the pitch on the side, facing inward (+X)
  const westStandLength = 54;
  const westStandTiers = 6;
  const westPavilion = buildCoveredVIPPavilion(
    westStandLength,
    westStandTiers,
    1.05,
    0.62
  );
  // Positioned strictly along the West side of the pitch, generously outside the turf
  const westStandX = centerX - halfW - 6.0;
  westPavilion.group.position.set(westStandX, 0, centerZ);
  westPavilion.group.rotation.y = Math.PI; // Length runs North-South along Z; seats face East (+X) directly into pitch!
  groundGroup.add(westPavilion.group);
  colliders.push({
    minX: westStandX - westPavilion.depth - 1.2,
    maxX: westStandX + 0.2,
    minZ: centerZ - westStandLength / 2 - 0.5,
    maxZ: centerZ + westStandLength / 2 + 0.5,
  });

  // 6C. Team Technical Dugouts (Home & Away) along West sideline in front of VIP Pavilion
  const dugoutHome = buildTeamDugout('HOME: KIZHAKKUMPURAM FC', true);
  dugoutHome.position.set(centerX - halfW - 2.8, 0, centerZ - 8.5);
  dugoutHome.rotation.y = Math.PI; // Open front faces East (+X) directly toward the pitch!
  groundGroup.add(dugoutHome);

  const dugoutAway = buildTeamDugout('AWAY: MALAPPURAM SEVENS', false);
  dugoutAway.position.set(centerX - halfW - 2.8, 0, centerZ + 8.5);
  dugoutAway.rotation.y = Math.PI; // Open front faces East (+X) directly toward the pitch!
  groundGroup.add(dugoutAway);

  colliders.push({
    minX: centerX - halfW - 4.4,
    maxX: centerX - halfW - 1.2,
    minZ: centerZ - 11.2,
    maxZ: centerZ - 5.8,
  });
  colliders.push({
    minX: centerX - halfW - 4.4,
    maxX: centerX - halfW - 1.2,
    minZ: centerZ + 5.8,
    maxZ: centerZ + 11.2,
  });

  // 6D. Goal-End High Ball-Catch Safety Nets (Behind North & South Goals with unobstructed open runoffs)
  const northNet = buildSafetyCatchNet(28, 8.5);
  northNet.position.set(centerX, 0, centerZ - halfL - 2.4);
  groundGroup.add(northNet);

  const southNet = buildSafetyCatchNet(28, 8.5);
  southNet.position.set(centerX, 0, centerZ + halfL + 2.4);
  groundGroup.add(southNet);

  // Clean open tubular steel barrier railing with festive bunting behind goals (no solid grey walls!)
  const railSteelMat = new THREE.MeshLambertMaterial({ color: 0xcbd5e1 });
  const buildGoalRailBarrier = (zPos: number): THREE.Group => {
    const barGroup = new THREE.Group();
    // Top tubular rail
    const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 28, 8), railSteelMat);
    topBar.rotateZ(Math.PI / 2);
    topBar.position.set(centerX, 1.0, zPos);
    // Mid tubular rail
    const midBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 28, 8), railSteelMat);
    midBar.rotateZ(Math.PI / 2);
    midBar.position.set(centerX, 0.52, zPos);
    barGroup.add(topBar, midBar);

    // Upright stanchions
    for (let st = -13; st <= 13; st += 2.6) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.02, 8), railSteelMat);
      post.position.set(centerX + st, 0.51, zPos);
      barGroup.add(post);
    }
    const bunting = createBuntingGarland(28);
    bunting.position.set(centerX, 1.02, zPos);
    barGroup.add(bunting);
    return barGroup;
  };

  groundGroup.add(buildGoalRailBarrier(centerZ - halfL - 2.8));
  groundGroup.add(buildGoalRailBarrier(centerZ + halfL + 2.8));

  // 6E. Digital Electronic LED Stadium Scoreboard (Elevated at North-East Corner)
  const scoreboard = buildLEDScoreboard();
  scoreboard.position.set(centerX + halfW + 5.5, 0, centerZ - halfL + 2.5);
  scoreboard.rotation.y = -Math.PI * 0.75;
  groundGroup.add(scoreboard);
  colliders.push({
    minX: centerX + halfW + 3.0,
    maxX: centerX + halfW + 8.5,
    minZ: centerZ - halfL,
    maxZ: centerZ - halfL + 5.5,
  });

  // 6F. Grand Stadium Entrance Arch at FRONT (North Approach from Village)
  const entranceArch = buildStadiumEntranceArch();
  const archX = centerX + 6.0; // -52.0
  const archZ = centerZ - halfL - 8.5; // 26.5 (Front entrance facing North)
  entranceArch.position.set(archX, 0, archZ);
  entranceArch.rotation.y = Math.PI; // Banner faces North directly towards approaching visitors!
  groundGroup.add(entranceArch);
  colliders.push({
    minX: archX - 3.8,
    maxX: archX - 2.6,
    minZ: archZ - 0.8,
    maxZ: archZ + 0.8,
  });
  colliders.push({
    minX: archX + 2.6,
    maxX: archX + 3.8,
    minZ: archZ - 0.8,
    maxZ: archZ + 0.8,
  });

  // 6G. 3D TICKET COUNTER BOOTH at FRONT (Turned directly to FRONT / North)
  // Window, counter desk, ₹50 signs, and awning face the visitor arriving from the village
  const ticketBooth = buildStadiumTicketCounterBooth();
  const ticketX = centerX + 16.5; // -41.5
  const ticketZ = centerZ - halfL - 8.5; // 26.5
  ticketBooth.group.position.set(ticketX, 0, ticketZ);
  ticketBooth.group.rotation.y = Math.PI; // Turned to FRONT (towards -Z / North approach)
  groundGroup.add(ticketBooth.group);
  colliders.push({
    minX: ticketX - 2.1,
    maxX: ticketX + 2.1,
    minZ: ticketZ - 1.8,
    maxZ: ticketZ + 1.8,
  });

  // Front paved entrance plaza connecting Arch, Ticket Counter, and pitch perimeter walkway
  const frontPlaza = new THREE.Mesh(
    new THREE.BoxGeometry(26, 0.05, 12),
    pathMat
  );
  frontPlaza.position.set(centerX + 11, 0.035, archZ);
  groundGroup.add(frontPlaza);

  const ticketCounterPos = new THREE.Vector3(ticketX, 0, ticketZ);

  // 7. Interactive Playable 3D Football resting on grass surface
  const ballGroundY = 0.15 + 0.32; // pitch y + ball radius
  const centerSpot = new THREE.Vector3(centerX, ballGroundY, centerZ);
  const ballGroup = build3DFootball();
  ballGroup.position.copy(centerSpot);
  groundGroup.add(ballGroup);

  // Ball physical properties
  const ballPos = centerSpot.clone();
  const ballVel = new THREE.Vector3(0, 0, 0);
  let goalCelebrationTimer = 0;

  const footballPhysics: FootballPhysics = {
    ballMesh: ballGroup,
    resetToCenter: () => {
      ballPos.copy(centerSpot);
      ballVel.set(0, 0, 0);
      ballGroup.position.copy(ballPos);
      ballGroup.rotation.set(0, 0, 0);
    },
    getPosition: () => ballPos.clone(),
    update: (dt, playerPosition, isPlayerMoving, isSprinting, onGoalScored, onBallKicked) => {
      if (goalCelebrationTimer > 0) {
        goalCelebrationTimer -= dt;
        if (goalCelebrationTimer <= 0) {
          footballPhysics.resetToCenter();
        }
      }

      // Check collision between player and football
      const playerDist = new THREE.Vector2(playerPosition.x - ballPos.x, playerPosition.z - ballPos.z).length();
      if (playerDist < 1.15) {
        // Player kicks the ball
        const kickDir = new THREE.Vector3(ballPos.x - playerPosition.x, 0, ballPos.z - playerPosition.z).normalize();
        const kickPower = isSprinting ? 18.5 : isPlayerMoving ? 11.5 : 5.0;

        ballVel.x = kickDir.x * kickPower;
        ballVel.z = kickDir.z * kickPower;
        ballVel.y = isSprinting ? 2.5 : 1.2;

        if (onBallKicked) {
          onBallKicked();
        }
      }

      // Physics integration: velocity, drag/friction, vertical bounce
      if (ballVel.lengthSq() > 0.001) {
        ballPos.x += ballVel.x * dt;
        ballPos.z += ballVel.z * dt;
        ballPos.y += ballVel.y * dt;

        // Ground collision & bounce on pitch
        if (ballPos.y <= ballGroundY) {
          ballPos.y = ballGroundY;
          if (ballVel.y < -0.5) {
            ballVel.y = -ballVel.y * 0.45; // damp bounce
          } else {
            ballVel.y = 0;
          }
        } else {
          ballVel.y -= 9.8 * dt; // gravity
        }

        // Rolling friction on grass
        const groundFriction = Math.pow(0.965, dt * 60);
        ballVel.x *= groundFriction;
        ballVel.z *= groundFriction;

        // Angular roll rotation around axis perpendicular to velocity
        const speed = Math.sqrt(ballVel.x * ballVel.x + ballVel.z * ballVel.z);
        if (speed > 0.05) {
          const rollAngle = (speed * dt) / 0.32;
          const rollAxis = new THREE.Vector3(-ballVel.z, 0, ballVel.x).normalize();
          ballGroup.rotateOnWorldAxis(rollAxis, rollAngle);
        }

        // Goal check
        const northGoalLine = centerZ - halfL;
        const southGoalLine = centerZ + halfL;
        const inGoalWidth = Math.abs(ballPos.x - centerX) < goalW / 2;

        if (inGoalWidth && ballPos.z < northGoalLine && ballPos.z > northGoalLine - goalD) {
          // GOAL IN NORTH NET!
          if (goalCelebrationTimer <= 0) {
            goalCelebrationTimer = 2.0;
            ballVel.set(0, 0, 0);
            if (onGoalScored) onGoalScored();
          }
        } else if (inGoalWidth && ballPos.z > southGoalLine && ballPos.z < southGoalLine + goalD) {
          // GOAL IN SOUTH NET!
          if (goalCelebrationTimer <= 0) {
            goalCelebrationTimer = 2.0;
            ballVel.set(0, 0, 0);
            if (onGoalScored) onGoalScored();
          }
        } else {
          // Boundary bounce on touchlines & goal lines
          const boundX = halfW + 1.2;
          const boundZ = halfL + 1.2;
          if (Math.abs(ballPos.x - centerX) > boundX) {
            ballVel.x = -ballVel.x * 0.6;
            ballPos.x = centerX + Math.sign(ballPos.x - centerX) * boundX;
          }
          if (Math.abs(ballPos.z - centerZ) > boundZ) {
            ballVel.z = -ballVel.z * 0.6;
            ballPos.z = centerZ + Math.sign(ballPos.z - centerZ) * boundZ;
          }
        }

        ballGroup.position.copy(ballPos);
      }
    },
  };

  return {
    groundGroup,
    colliders,
    footballPhysics,
    centerSpot,
    ticketCounterPos,
  };
}
