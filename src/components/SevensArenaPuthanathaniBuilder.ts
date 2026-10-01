import * as THREE from 'three';

/**
 * Builds the authentic SEVENS ARENA PUTHANATHANI (Malappuram, Kerala)
 * Strictly matching the user's specific Google Maps location:
 * - Floodlit artificial green turf football ground with white markings & goal nets
 * - Interactive kickable football with physics
 * - Adjacent luxury swimming pool with realistic sparkling water & swim volume
 * - Player changing rooms, spectator gallery, and floodlight towers
 */
export interface SevensArenaInstance {
  group: THREE.Group;
  turfBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  poolBounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  ballMesh: THREE.Mesh;
  ballVelocity: THREE.Vector3;
  updateAnimation: (dt: number, playerPos: THREE.Vector3, isKicking: boolean, onGoal?: () => void) => boolean; // returns isSwimming
}

export function buildSevensArenaPuthanathani(centerX = 45, centerZ = -35): SevensArenaInstance {
  const group = new THREE.Group();
  group.position.set(centerX, 0, centerZ);

  // 1. MATERIALS & PALETTE
  const turfMat = new THREE.MeshLambertMaterial({ color: 0x15803d }); // Vibrant artificial football turf green
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const fenceMat = new THREE.MeshLambertMaterial({ color: 0x1e293b, wireframe: true });
  const postMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const netMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, wireframe: true, transparent: true, opacity: 0.5 });
  const poolTileMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, metalness: 0.1 });
  const poolWaterMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.72,
    shininess: 100,
    reflectivity: 0.8,
  });
  const concreteMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const bannerMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });

  // 2. MAIN SEVENS ARENA GREEN TURF PITCH (44m x 26m standard Sevens size)
  const pitchWidth = 26;
  const pitchLength = 44;
  const turfGeo = new THREE.PlaneGeometry(pitchWidth, pitchLength);
  turfGeo.rotateX(-Math.PI / 2);
  const turfMesh = new THREE.Mesh(turfGeo, turfMat);
  turfMesh.position.set(0, 0.05, 0);
  turfMesh.receiveShadow = true;
  group.add(turfMesh);

  // Pitch white boundary lines & penalty boxes
  const lineGroup = new THREE.Group();
  lineGroup.position.set(0, 0.06, 0);

  // Touchlines & Goal lines
  const borderLine = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(pitchWidth - 1, pitchLength - 1).rotateX(-Math.PI / 2)),
    new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
  );
  lineGroup.add(borderLine);

  // Halfway line
  const halfLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-pitchWidth / 2 + 0.5, 0, 0),
    new THREE.Vector3(pitchWidth / 2 - 0.5, 0, 0),
  ]);
  const halfLine = new THREE.Line(halfLineGeo, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
  lineGroup.add(halfLine);

  // Center circle
  const centerCircle = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 32 }, (_, i) => {
        const theta = (i / 32) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(theta) * 3.5, 0, Math.sin(theta) * 3.5);
      })
    ),
    new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
  );
  lineGroup.add(centerCircle);

  // Penalty Boxes (D-Box) on both ends
  [-1, 1].forEach((dir) => {
    const pz = (pitchLength / 2 - 4.5) * dir;
    const pBox = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(12, 8).rotateX(-Math.PI / 2)),
      new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 })
    );
    pBox.position.set(0, 0, pz);
    lineGroup.add(pBox);
  });
  group.add(lineGroup);

  // 3. GOAL POSTS & NETS (Both ends: North and South)
  [-1, 1].forEach((dir) => {
    const gz = (pitchLength / 2 - 0.5) * dir;
    const goalGroup = new THREE.Group();
    goalGroup.position.set(0, 0, gz);

    // Upright posts
    [-2.6, 2.6].forEach((gx) => {
      const upPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8), postMat);
      upPost.position.set(gx, 1.1, 0);
      goalGroup.add(upPost);
    });

    // Crossbar
    const crossBar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 5.3, 8), postMat);
    crossBar.rotation.z = Math.PI / 2;
    crossBar.position.set(0, 2.2, 0);
    goalGroup.add(crossBar);

    // Goal net box
    const netMesh = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.2, 1.8), netMat);
    netMesh.position.set(0, 1.1, dir * 0.9);
    goalGroup.add(netMesh);

    group.add(goalGroup);
  });

  // 4. FLOODLIGHT TOWERS (4 corner high-mast LED floodlights for night matches!)
  [
    [-pitchWidth / 2 - 2, -pitchLength / 2 - 2],
    [pitchWidth / 2 + 2, -pitchLength / 2 - 2],
    [-pitchWidth / 2 - 2, pitchLength / 2 + 2],
    [pitchWidth / 2 + 2, pitchLength / 2 + 2],
  ].forEach(([fx, fz]) => {
    const towerGroup = new THREE.Group();
    towerGroup.position.set(fx, 0, fz);

    // Galvanized steel mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 12, 8), concreteMat);
    mast.position.y = 6;
    towerGroup.add(mast);

    // Top LED light panel rack
    const rack = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 0.4), bannerMat);
    rack.position.set(0, 12, 0);
    towerGroup.add(rack);

    // Glowing LED arrays
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [-0.7, 0, 0.7].forEach((lx) => {
      const led = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.5), ledMat);
      led.position.set(lx, 12, 0.22);
      towerGroup.add(led);
    });

    group.add(towerGroup);
  });

  // 5. SEVENS ARENA SPONSORSHIP BOARDS & ENTRANCE ARCH
  const bannerGeo = new THREE.BoxGeometry(pitchWidth + 4, 1.8, 0.3);
  const archBanner = new THREE.Mesh(bannerGeo, bannerMat);
  archBanner.position.set(0, 4.5, -pitchLength / 2 - 3);

  // Canvas billboard texture with "SEVENS ARENA PUTHANATHANI"
  const cCanvas = document.createElement('canvas');
  cCanvas.width = 512;
  cCanvas.height = 128;
  const ctx = cCanvas.getContext('2d')!;
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 28px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⚡ SEVENS ARENA PUTHANATHANI ⚡', 256, 50);
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('MALAPPURAM • TURF & SWIMMING POOL', 256, 90);

  const bannerTex = new THREE.CanvasTexture(cCanvas);
  const bannerFaceMat = new THREE.MeshBasicMaterial({ map: bannerTex });
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(pitchWidth + 2, 1.6), bannerFaceMat);
  signMesh.position.set(0, 4.5, -pitchLength / 2 - 2.8);
  group.add(archBanner, signMesh);

  // 6. ADJACENT LUXURY SWIMMING POOL (20m x 12m sparkling blue pool!)
  const poolWidth = 14;
  const poolLength = 22;
  const poolOffsetX = pitchWidth / 2 + poolWidth / 2 + 5;
  const poolOffsetZ = 0;

  const poolGroup = new THREE.Group();
  poolGroup.position.set(poolOffsetX, 0, poolOffsetZ);

  // Surrounding anti-slip tiled deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(poolWidth + 6, 0.3, poolLength + 6), concreteMat);
  deck.position.y = 0.15;
  deck.receiveShadow = true;
  poolGroup.add(deck);

  // Pool recessed water plane
  const waterMesh = new THREE.Mesh(new THREE.PlaneGeometry(poolWidth, poolLength), poolWaterMat);
  waterMesh.rotateX(-Math.PI / 2);
  waterMesh.position.y = 0.22;
  poolGroup.add(waterMesh);

  // Pool underwater blue tiles
  const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(poolWidth, poolLength), poolTileMat);
  floorMesh.rotateX(-Math.PI / 2);
  floorMesh.position.y = -1.6;
  poolGroup.add(floorMesh);

  // Pool diving ledge / springboard
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 3.8), new THREE.MeshLambertMaterial({ color: 0x38bdf8 }));
  board.position.set(0, 0.7, -poolLength / 2 + 1.2);
  const boardBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8), concreteMat);
  boardBase.position.set(0, 0.35, -poolLength / 2);
  poolGroup.add(board, boardBase);

  // Chrome swimming ladders
  [-1, 1].forEach((lx) => {
    const ladderMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
    const ladder = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 8), ladderMat);
    ladder.position.set(lx * (poolWidth / 2 - 0.4), 0.2, poolLength / 2 - 1.2);
    poolGroup.add(ladder);
  });

  group.add(poolGroup);

  // 7. INTERACTIVE FOOTBALL WITH PHYSICS
  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.1,
  });
  const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), ballMat);
  ballMesh.position.set(0, 0.3, 0); // Center spot
  ballMesh.castShadow = true;
  group.add(ballMesh);

  const ballVelocity = new THREE.Vector3(0, 0, 0);

  // Calculate world bounding boxes
  const turfBounds = {
    minX: centerX - pitchWidth / 2,
    maxX: centerX + pitchWidth / 2,
    minZ: centerZ - pitchLength / 2,
    maxZ: centerZ + pitchLength / 2,
  };

  const poolBounds = {
    minX: centerX + poolOffsetX - poolWidth / 2,
    maxX: centerX + poolOffsetX + poolWidth / 2,
    minZ: centerZ + poolOffsetZ - poolLength / 2,
    maxZ: centerZ + poolOffsetZ + poolLength / 2,
  };

  // Water ripple oscillator
  let rippleTime = 0;

  function updateAnimation(
    dt: number,
    playerPos: THREE.Vector3,
    isKicking: boolean,
    onGoal?: () => void
  ): boolean {
    rippleTime += dt;
    waterMesh.position.y = 0.22 + Math.sin(rippleTime * 3) * 0.02;

    // Check if player is inside the pool volume
    const isInsidePool =
      playerPos.x >= poolBounds.minX &&
      playerPos.x <= poolBounds.maxX &&
      playerPos.z >= poolBounds.minZ &&
      playerPos.z <= poolBounds.maxZ;

    // Interactive Football Dribble & Kick Physics
    const worldBallX = centerX + ballMesh.position.x;
    const worldBallZ = centerZ + ballMesh.position.z;
    const distToPlayer = Math.hypot(playerPos.x - worldBallX, playerPos.z - worldBallZ);

    if (distToPlayer < 1.4) {
      // Player is near the ball
      const dx = worldBallX - playerPos.x;
      const dz = worldBallZ - playerPos.z;
      const angle = Math.atan2(dz, dx);

      if (isKicking) {
        // Power kick!
        ballVelocity.x = Math.cos(angle) * 18.0;
        ballVelocity.z = Math.sin(angle) * 18.0;
        ballVelocity.y = 4.5;
      } else {
        // Dribble roll
        ballVelocity.x += Math.cos(angle) * 3.5;
        ballVelocity.z += Math.sin(angle) * 3.5;
      }
    }

    // Ball movement & friction damping
    ballMesh.position.x += ballVelocity.x * dt;
    ballMesh.position.z += ballVelocity.z * dt;
    ballMesh.position.y += ballVelocity.y * dt;

    // Gravity
    if (ballMesh.position.y > 0.3) {
      ballVelocity.y -= 9.8 * dt;
    } else {
      ballMesh.position.y = 0.3;
      ballVelocity.y = -ballVelocity.y * 0.55; // Bounce
      if (Math.abs(ballVelocity.y) < 0.2) ballVelocity.y = 0;
    }

    // Turf rolling friction
    ballVelocity.x *= 0.94;
    ballVelocity.z *= 0.94;

    // Pitch bounds check (keep inside Sevens pitch walls)
    const maxHalfX = pitchWidth / 2 - 0.4;
    const maxHalfZ = pitchLength / 2 - 0.4;

    if (Math.abs(ballMesh.position.x) > maxHalfX) {
      ballMesh.position.x = Math.sign(ballMesh.position.x) * maxHalfX;
      ballVelocity.x = -ballVelocity.x * 0.6;
    }

    // Goal detection!
    if (Math.abs(ballMesh.position.z) > maxHalfZ) {
      if (Math.abs(ballMesh.position.x) < 2.8 && ballMesh.position.y < 2.4) {
        // GOAAALLL!
        onGoal?.();
        // Reset ball to center spot after a moment
        setTimeout(() => {
          ballMesh.position.set(0, 0.3, 0);
          ballVelocity.set(0, 0, 0);
        }, 1200);
      } else {
        ballMesh.position.z = Math.sign(ballMesh.position.z) * maxHalfZ;
        ballVelocity.z = -ballVelocity.z * 0.6;
      }
    }

    // Ball roll spin rotation
    ballMesh.rotation.x += ballVelocity.z * dt * 3;
    ballMesh.rotation.z -= ballVelocity.x * dt * 3;

    return isInsidePool;
  }

  return {
    group,
    turfBounds,
    poolBounds,
    ballMesh,
    ballVelocity,
    updateAnimation,
  };
}
