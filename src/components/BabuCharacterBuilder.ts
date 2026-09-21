import * as THREE from 'three';

/**
 * Rigged human character interface enabling authentic bipedal locomotion.
 */
export interface HumanRig {
  root: THREE.Group;
  torso: THREE.Group;
  head: THREE.Group;
  shoulderL: THREE.Group;
  elbowL: THREE.Group;
  shoulderR: THREE.Group;
  elbowR: THREE.Group;
  hipL: THREE.Group;
  kneeL: THREE.Group;
  ankleL: THREE.Group;
  hipR: THREE.Group;
  kneeR: THREE.Group;
  ankleR: THREE.Group;
  backpack?: THREE.Group;
  updateAnimation: (delta: number, isMoving: boolean, isSprinting: boolean, moveSpeed?: number) => void;
}

/**
 * Builds the 3D Babu Character strictly matching the reference diagram:
 * - Natural dark wavy/curly voluminous hair (头发是自然卷)
 * - Round wireframe spectacles (近视340度)
 * - Open blue chambray denim shirt over white undershirt
 * - Employee ID lanyard & badge card (员工工牌)
 * - Black canvas backpack (长年坐办公室导致有点驼背)
 * - Black smartwatch on left wrist (手环手表), hand resting near strap
 * - Loose comfortable tan/beige relaxed chinos (喜欢穿宽松舒适的裤子)
 * - White/cream chunky sneakers with gum rubber soles
 *
 * Equipped with an articulated skeletal rig for realistic human walking.
 */
export function buildRiggedBabuCharacter(): HumanRig {
  const root = new THREE.Group();

  // 1. PALETTE & MATERIALS
  const skinMat = new THREE.MeshLambertMaterial({ color: 0xecbe9e });
  const hairMat = new THREE.MeshLambertMaterial({ color: 0x1b1c22 });
  const whiteTeeMat = new THREE.MeshLambertMaterial({ color: 0xf5f6fa });
  const chambrayMat = new THREE.MeshLambertMaterial({ color: 0x4f7096 });
  const chambrayDarkMat = new THREE.MeshLambertMaterial({ color: 0x3d5c7f });
  const khakiPantsMat = new THREE.MeshLambertMaterial({ color: 0xd4bc99 });
  const khakiFoldMat = new THREE.MeshLambertMaterial({ color: 0xc4ac89 });
  const sneakerMat = new THREE.MeshLambertMaterial({ color: 0xf7f5ef });
  const sneakerSoleMat = new THREE.MeshLambertMaterial({ color: 0xcfc8bc });
  const glassesFrameMat = new THREE.MeshLambertMaterial({ color: 0x222428 });
  const lensMat = new THREE.MeshPhongMaterial({
    color: 0xdaf0fc,
    transparent: true,
    opacity: 0.45,
    shininess: 90,
  });
  const lanyardMat = new THREE.MeshLambertMaterial({ color: 0xb52424 });
  const badgeMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const backpackMat = new THREE.MeshLambertMaterial({ color: 0x202024 });
  const watchMat = new THREE.MeshLambertMaterial({ color: 0x121215 });

  // 2. TORSO & PELVIS GROUP (Pivot at hip level y = 0.88)
  const torso = new THREE.Group();
  torso.position.y = 0.88;
  root.add(torso);

  // Waistband
  const waist = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.18, 0.32), khakiFoldMat);
  waist.position.y = 0.09;
  waist.castShadow = true;
  torso.add(waist);

  // Inner White Tee
  const innerTee = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.72, 0.32), whiteTeeMat);
  innerTee.position.set(0, 0.48, 0.01);
  innerTee.castShadow = true;
  torso.add(innerTee);

  // Open Blue Chambray Overshirt
  const shirtBack = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.76, 0.10), chambrayMat);
  shirtBack.position.set(0, 0.46, -0.13);
  shirtBack.castShadow = true;

  const shirtFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.74, 0.14), chambrayMat);
  shirtFlapL.position.set(-0.24, 0.46, 0.12);
  shirtFlapL.castShadow = true;

  const shirtFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.74, 0.14), chambrayMat);
  shirtFlapR.position.set(0.24, 0.46, 0.12);
  shirtFlapR.castShadow = true;

  // Shirt Collar Fold
  const collarL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.18), chambrayDarkMat);
  collarL.position.set(-0.16, 0.83, 0.05);
  collarL.rotation.z = -0.26;

  const collarR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.07, 0.18), chambrayDarkMat);
  collarR.position.set(0.16, 0.83, 0.05);
  collarR.rotation.z = 0.26;

  torso.add(shirtBack, shirtFlapL, shirtFlapR, collarL, collarR);

  // Employee ID Lanyard & Card Badge (员工工牌)
  const lanyardGroup = new THREE.Group();
  const strapL = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.38, 6), lanyardMat);
  strapL.position.set(-0.06, 0.68, 0.18);
  strapL.rotation.z = -0.28;

  const strapR = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.38, 6), lanyardMat);
  strapR.position.set(0.06, 0.68, 0.18);
  strapR.rotation.z = 0.28;

  const badgeCard = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.14, 0.015), badgeMat);
  badgeCard.position.set(0, 0.50, 0.20);

  const badgeClip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.02), glassesFrameMat);
  badgeClip.position.set(0, 0.58, 0.20);

  const badgePhoto = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, 0.018), chambrayMat);
  badgePhoto.position.set(-0.02, 0.52, 0.203);

  lanyardGroup.add(strapL, strapR, badgeCard, badgeClip, badgePhoto);
  torso.add(lanyardGroup);

  // Black Canvas Backpack (长年坐办公室导致有点驼背, backpack)
  const backpack = new THREE.Group();
  backpack.position.set(0, 0.44, -0.26);

  const packBody = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.60, 0.24), backpackMat);
  packBody.castShadow = true;

  const packPocket = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.08), backpackMat);
  packPocket.position.set(0, -0.09, -0.15);

  const packHandle = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 12, Math.PI), backpackMat);
  packHandle.position.set(0, 0.31, 0);

  const strapLMesh = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.62, 0.04), backpackMat);
  strapLMesh.position.set(-0.19, 0.02, 0.24);
  const strapRMesh = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.62, 0.04), backpackMat);
  strapRMesh.position.set(0.19, 0.02, 0.24);

  backpack.add(packBody, packPocket, packHandle, strapLMesh, strapRMesh);
  torso.add(backpack);

  // 3. HEAD & NECK (Attached to torso at neck joint)
  const head = new THREE.Group();
  head.position.set(0, 1.06, 0);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.12, 0.16, 10), skinMat);
  neck.position.y = -0.18;
  head.add(neck);

  const headBase = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), skinMat);
  headBase.scale.set(1.0, 1.1, 0.94);
  headBase.castShadow = true;
  head.add(headBase);

  // Voluminous curly hair crown
  const hairCrown = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 14, 14, 0, Math.PI * 2, 0, Math.PI * 0.68),
    hairMat
  );
  hairCrown.position.set(0, 0.04, -0.02);
  hairCrown.castShadow = true;
  head.add(hairCrown);

  // Detailed natural curls & wavy tufts
  const curlClumps = [
    { pos: [-0.13, 0.16, 0.17], scale: [0.10, 0.08, 0.08], rot: [0.2, 0.1, -0.15] },
    { pos: [-0.05, 0.20, 0.19], scale: [0.11, 0.09, 0.09], rot: [0.15, -0.1, 0.1] },
    { pos: [0.05, 0.19, 0.18], scale: [0.11, 0.08, 0.09], rot: [0.1, 0.2, -0.1] },
    { pos: [0.14, 0.15, 0.16], scale: [0.09, 0.07, 0.08], rot: [0.2, -0.15, 0.2] },
    { pos: [-0.08, 0.11, 0.22], scale: [0.07, 0.06, 0.07], rot: [0.3, 0, 0] },
    { pos: [-0.23, 0.05, 0.03], scale: [0.10, 0.09, 0.10], rot: [0, 0, 0.2] },
    { pos: [-0.24, -0.04, -0.01], scale: [0.09, 0.08, 0.09], rot: [0, 0, 0.15] },
    { pos: [0.23, 0.05, 0.03], scale: [0.10, 0.09, 0.10], rot: [0, 0, -0.2] },
    { pos: [0.24, -0.04, -0.01], scale: [0.09, 0.08, 0.09], rot: [0, 0, -0.15] },
    { pos: [-0.08, 0.26, -0.03], scale: [0.12, 0.10, 0.11], rot: [0.1, 0.2, 0] },
    { pos: [0.08, 0.26, -0.02], scale: [0.11, 0.10, 0.11], rot: [-0.1, -0.2, 0] },
    { pos: [0.0, 0.28, -0.07], scale: [0.12, 0.11, 0.12], rot: [0, 0, 0] },
    { pos: [-0.12, -0.08, -0.18], scale: [0.11, 0.09, 0.10], rot: [-0.3, -0.2, -0.2] },
    { pos: [0.12, -0.08, -0.18], scale: [0.11, 0.09, 0.10], rot: [-0.3, 0.2, 0.2] },
    { pos: [0.0, -0.11, -0.19], scale: [0.12, 0.10, 0.10], rot: [-0.4, 0, 0] },
    { pos: [-0.16, -0.14, -0.14], scale: [0.08, 0.07, 0.08], rot: [-0.2, 0, -0.3] },
    { pos: [0.16, -0.14, -0.14], scale: [0.08, 0.07, 0.08], rot: [-0.2, 0, 0.3] },
  ];

  curlClumps.forEach(c => {
    const curl = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), hairMat);
    curl.position.set(c.pos[0], c.pos[1], c.pos[2]);
    curl.scale.set(c.scale[0], c.scale[1], c.scale[2]);
    curl.rotation.set(c.rot[0], c.rot[1], c.rot[2]);
    head.add(curl);
  });

  // Round Spectacles (近视340度)
  const glasses = new THREE.Group();
  glasses.position.set(0, 0.035, 0.21);

  const rimGeo = new THREE.TorusGeometry(0.062, 0.010, 8, 20);
  const lensGeo = new THREE.CircleGeometry(0.058, 16);

  const rimL = new THREE.Mesh(rimGeo, glassesFrameMat);
  rimL.position.set(-0.085, 0, 0);
  const lensL = new THREE.Mesh(lensGeo, lensMat);
  lensL.position.set(-0.085, 0, 0.004);

  const rimR = new THREE.Mesh(rimGeo, glassesFrameMat);
  rimR.position.set(0.085, 0, 0);
  const lensR = new THREE.Mesh(lensGeo, lensMat);
  lensR.position.set(0.085, 0, 0.004);

  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 6), glassesFrameMat);
  bridge.rotation.z = Math.PI / 2;
  bridge.position.set(0, 0.02, 0);

  const templeArmL = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.22, 6), glassesFrameMat);
  templeArmL.rotation.x = Math.PI / 2;
  templeArmL.position.set(-0.145, 0.01, -0.1);
  const templeArmR = templeArmL.clone();
  templeArmR.position.x = 0.145;

  glasses.add(rimL, lensL, rimR, lensR, bridge, templeArmL, templeArmR);
  head.add(glasses);
  torso.add(head);

  // 4. ARTICULATED ARMS (Shoulder & Elbow joints)
  // LEFT SHOULDER JOINT (Holding backpack strap)
  const shoulderL = new THREE.Group();
  shoulderL.position.set(-0.35, 0.72, 0);

  const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.32, 8), chambrayMat);
  sleeveL.position.y = -0.16;
  sleeveL.castShadow = true;
  shoulderL.add(sleeveL);

  const cuffL = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.06, 8), chambrayDarkMat);
  cuffL.position.y = -0.32;
  shoulderL.add(cuffL);

  // Left Elbow Joint
  const elbowL = new THREE.Group();
  elbowL.position.set(0, -0.32, 0);

  const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.30, 8), skinMat);
  forearmL.position.set(0.04, -0.14, 0.08);
  forearmL.rotation.x = -0.42;

  const watch = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.04, 10), watchMat);
  watch.position.set(0.04, -0.24, 0.13);
  watch.rotation.x = -0.42;

  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.068, 8, 8), skinMat);
  handL.position.set(0.04, -0.29, 0.16);

  elbowL.add(forearmL, watch, handL);
  shoulderL.add(elbowL);
  torso.add(shoulderL);

  // RIGHT SHOULDER JOINT (Relaxed swinging arm)
  const shoulderR = new THREE.Group();
  shoulderR.position.set(0.35, 0.72, 0);

  const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 0.32, 8), chambrayMat);
  sleeveR.position.y = -0.16;
  sleeveR.castShadow = true;
  shoulderR.add(sleeveR);

  const cuffR = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 0.06, 8), chambrayDarkMat);
  cuffR.position.y = -0.32;
  shoulderR.add(cuffR);

  // Right Elbow Joint
  const elbowR = new THREE.Group();
  elbowR.position.set(0, -0.32, 0);

  const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.32, 8), skinMat);
  forearmR.position.set(0, -0.15, 0.02);

  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.068, 8, 8), skinMat);
  handR.position.set(0, -0.32, 0.03);

  elbowR.add(forearmR, handR);
  shoulderR.add(elbowR);
  torso.add(shoulderR);

  // 5. ARTICULATED LEGS & FEET (Hip, Knee, Ankle joints)
  function createSneaker(): THREE.Group {
    const shoe = new THREE.Group();
    // Origin at ankle / heel ground level
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.36), sneakerMat);
    upper.position.set(0, 0.08, 0.05);
    upper.castShadow = true;

    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.23, 0.05, 0.38), sneakerSoleMat);
    sole.position.set(0, 0.025, 0.05);

    const toe = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 8), sneakerMat);
    toe.position.set(0, 0.07, 0.17);
    toe.scale.set(1.0, 0.6, 0.9);

    shoe.add(upper, sole, toe);
    return shoe;
  }

  // LEFT HIP JOINT (Pivot at y = 0.86)
  const hipL = new THREE.Group();
  hipL.position.set(-0.16, 0.86, 0);

  // Thigh (Loose Chino)
  const thighL = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.15, 0.40, 10), khakiPantsMat);
  thighL.position.y = -0.20;
  thighL.castShadow = true;
  hipL.add(thighL);

  // Left Knee Joint
  const kneeL = new THREE.Group();
  kneeL.position.set(0, -0.40, 0);

  // Shin (Relaxed Chino drape)
  const shinL = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.38, 10), khakiPantsMat);
  shinL.position.y = -0.19;
  shinL.castShadow = true;

  const cuffPantsL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.185, 0.10, 10), khakiFoldMat);
  cuffPantsL.position.set(0, -0.34, 0);

  kneeL.add(shinL, cuffPantsL);

  // Left Ankle / Foot Joint
  const ankleL = new THREE.Group();
  ankleL.position.set(0, -0.38, 0);
  const shoeL = createSneaker();
  ankleL.add(shoeL);
  kneeL.add(ankleL);
  hipL.add(kneeL);
  root.add(hipL);

  // RIGHT HIP JOINT (Pivot at y = 0.86)
  const hipR = new THREE.Group();
  hipR.position.set(0.16, 0.86, 0);

  // Thigh
  const thighR = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.15, 0.40, 10), khakiPantsMat);
  thighR.position.y = -0.20;
  thighR.castShadow = true;
  hipR.add(thighR);

  // Right Knee Joint
  const kneeR = new THREE.Group();
  kneeR.position.set(0, -0.40, 0);

  // Shin
  const shinR = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.38, 10), khakiPantsMat);
  shinR.position.y = -0.19;
  shinR.castShadow = true;

  const cuffPantsR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.185, 0.10, 10), khakiFoldMat);
  cuffPantsR.position.set(0, -0.34, 0);

  kneeR.add(shinR, cuffPantsR);

  // Right Ankle / Foot Joint
  const ankleR = new THREE.Group();
  ankleR.position.set(0, -0.38, 0);
  const shoeR = createSneaker();
  ankleR.add(shoeR);
  kneeR.add(ankleR);
  hipR.add(kneeR);
  root.add(hipR);

  // 6. AUTHENTIC BIPEDAL WALK LOCOMOTION CONTROLLER
  let walkPhase = 0;
  let currentIntensity = 0; // Smooth blend between standing idle and walking
  let idleTime = 0;

  function updateAnimation(delta: number, isMoving: boolean, isSprinting: boolean, moveSpeed: number = 1.0) {
    const targetIntensity = isMoving ? (isSprinting ? 1.4 : 1.0) : 0.0;
    currentIntensity = THREE.MathUtils.lerp(currentIntensity, targetIntensity, Math.min(1.0, delta * 8.5));

    idleTime += delta;

    if (currentIntensity > 0.01) {
      // Cadence scales with speed
      const cadence = (isSprinting ? 12.5 : 8.8) * Math.max(0.6, moveSpeed);
      walkPhase += delta * cadence;

      const p = walkPhase;
      const intensity = currentIntensity;

      // 1. HIP SWING (Alternating inverted pendulum gait)
      const legStride = (isSprinting ? 0.68 : 0.44) * intensity;
      const hipAngleL = Math.sin(p) * legStride;
      const hipAngleR = -Math.sin(p) * legStride;

      hipL.rotation.x = hipAngleL;
      hipR.rotation.x = hipAngleR;

      // Subtle lateral hip adduction/abduction
      hipL.rotation.z = Math.sin(p) * 0.035 * intensity;
      hipR.rotation.z = Math.sin(p) * 0.035 * intensity;

      // 2. KNEE FLEXION (Bends naturally on swing phase only, never backwards!)
      // When leg swings forward from back to front (sin(p) < 0 for left leg, moving forward):
      const kneeFlexL = Math.max(0, -Math.sin(p)) * (isSprinting ? 0.95 : 0.65) * intensity;
      const kneeFlexR = Math.max(0, Math.sin(p)) * (isSprinting ? 0.95 : 0.65) * intensity;
      kneeL.rotation.x = kneeFlexL;
      kneeR.rotation.x = kneeFlexR;

      // 3. ANKLE PITCH (Heel strike vs toe push-off)
      // Dorsiflexion on forward swing, plantarflexion on push-off
      ankleL.rotation.x = Math.sin(p) * 0.22 * intensity - kneeFlexL * 0.25;
      ankleR.rotation.x = -Math.sin(p) * 0.22 * intensity - kneeFlexR * 0.25;

      // 4. VERTICAL CENTER OF MASS (Drop on contact, peak on single support - 2x frequency!)
      const comBounce = -Math.abs(Math.sin(p)) * (isSprinting ? 0.075 : 0.048) * intensity;
      torso.position.y = 0.88 + comBounce;
      // Slight forward lean when walking/sprinting
      torso.rotation.x = (isSprinting ? 0.16 : 0.06) * intensity;

      // 5. PELVIC LATERAL TILT & TORSO COUNTER-ROTATION (Spine Twist)
      // When left leg swings forward, upper torso counter-rotates slightly right
      torso.rotation.y = -Math.sin(p) * (isSprinting ? 0.12 : 0.07) * intensity;
      torso.rotation.z = Math.cos(p) * 0.03 * intensity;

      // 6. ARMS COUNTER-SWING
      // Right arm swings naturally forward when left leg swings forward!
      const armSwing = (isSprinting ? 0.72 : 0.42) * intensity;
      shoulderR.rotation.x = -Math.sin(p) * armSwing;
      // Slight elbow bend during swing
      elbowR.rotation.x = Math.max(0, -Math.sin(p)) * 0.35 * intensity;

      // Left arm holds backpack strap: gentle inertial bounce and subtle forward/back gait sway
      shoulderL.rotation.x = Math.sin(p) * (armSwing * 0.32);
      elbowL.rotation.x = -Math.sin(p) * 0.15 * intensity;

      // 7. BACKPACK INERTIAL BOUNCE
      backpack.position.y = 0.44 + Math.sin(p * 2) * 0.025 * intensity;
      backpack.rotation.x = Math.sin(p * 2) * 0.03 * intensity;

      // 8. HEAD MICRO-STABILIZATION
      head.rotation.x = -torso.rotation.x * 0.6 + Math.sin(p * 2) * 0.015 * intensity;
      head.rotation.y = -torso.rotation.y * 0.5;
    } else {
      // IDLE STATE: Smoothly return to natural relaxed standing posture with breathing cycle
      const damp = Math.min(1.0, delta * 7.0);

      hipL.rotation.x = THREE.MathUtils.lerp(hipL.rotation.x, 0, damp);
      hipL.rotation.z = THREE.MathUtils.lerp(hipL.rotation.z, 0, damp);
      hipR.rotation.x = THREE.MathUtils.lerp(hipR.rotation.x, 0, damp);
      hipR.rotation.z = THREE.MathUtils.lerp(hipR.rotation.z, 0, damp);

      kneeL.rotation.x = THREE.MathUtils.lerp(kneeL.rotation.x, 0, damp);
      kneeR.rotation.x = THREE.MathUtils.lerp(kneeR.rotation.x, 0, damp);

      ankleL.rotation.x = THREE.MathUtils.lerp(ankleL.rotation.x, 0, damp);
      ankleR.rotation.x = THREE.MathUtils.lerp(ankleR.rotation.x, 0, damp);

      shoulderR.rotation.x = THREE.MathUtils.lerp(shoulderR.rotation.x, 0, damp);
      elbowR.rotation.x = THREE.MathUtils.lerp(elbowR.rotation.x, 0, damp);

      shoulderL.rotation.x = THREE.MathUtils.lerp(shoulderL.rotation.x, 0, damp);
      elbowL.rotation.x = THREE.MathUtils.lerp(elbowL.rotation.x, 0, damp);

      // Gentle resting breath
      const breath = Math.sin(idleTime * 2.2) * 0.012;
      torso.position.y = THREE.MathUtils.lerp(torso.position.y, 0.88 + breath, damp);
      torso.rotation.x = THREE.MathUtils.lerp(torso.rotation.x, 0, damp);
      torso.rotation.y = THREE.MathUtils.lerp(torso.rotation.y, 0, damp);
      torso.rotation.z = THREE.MathUtils.lerp(torso.rotation.z, 0, damp);

      backpack.position.y = THREE.MathUtils.lerp(backpack.position.y, 0.44, damp);
      backpack.rotation.x = THREE.MathUtils.lerp(backpack.rotation.x, 0, damp);

      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, Math.sin(idleTime * 1.5) * 0.015, damp);
      head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, 0, damp);
    }
  }

  return {
    root,
    torso,
    head,
    shoulderL,
    elbowL,
    shoulderR,
    elbowR,
    hipL,
    kneeL,
    ankleL,
    hipR,
    kneeR,
    ankleR,
    backpack,
    updateAnimation,
  };
}

/**
 * Backward compatibility wrapper returning the root THREE.Group
 */
export function buildBabuDiagramCharacter(): THREE.Group {
  const rig = buildRiggedBabuCharacter();
  (rig.root as any).__humanRig = rig;
  return rig.root;
}
