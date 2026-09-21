import * as THREE from 'three';
import { HumanRig } from './BabuCharacterBuilder';

export interface TraditionalHumanOptions {
  skinColor?: number;
  shirtColor?: number;
  munduColor?: number;
  kasavuColor?: number;
  hairColor?: number;
  hasMoustache?: boolean;
  hasUmbrella?: boolean;
  foldedMundu?: boolean;
}

/**
 * Builds a rigged traditional Kerala human character (Unni, Villager, Tea Master, Pedestrian)
 * with articulated hips, knees, ankles, shoulders, elbows, and torso for authentic walking locomotion.
 */
export function buildRiggedTraditionalCharacter(options: TraditionalHumanOptions = {}): HumanRig {
  const {
    skinColor = 0x8d5524,
    shirtColor = 0x1e56a0,
    munduColor = 0xf5f3e9,
    kasavuColor = 0xd4af37,
    hairColor = 0x111111,
    hasMoustache = true,
    hasUmbrella = false,
    foldedMundu = false,
  } = options;

  const root = new THREE.Group();

  const skinMat = new THREE.MeshLambertMaterial({ color: skinColor });
  const shirtMat = new THREE.MeshLambertMaterial({ color: shirtColor });
  const munduMat = new THREE.MeshLambertMaterial({ color: munduColor });
  const kasavuMat = new THREE.MeshLambertMaterial({ color: kasavuColor });
  const hairMat = new THREE.MeshLambertMaterial({ color: hairColor });
  const chappalMat = new THREE.MeshLambertMaterial({ color: 0x3b2314 });
  const umbrellaMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  // 1. TORSO & PELVIS (Pivot at y = 0.88)
  const torso = new THREE.Group();
  torso.position.y = 0.88;
  root.add(torso);

  // Upper Mundu Waist Knot / Nori (ഞൊറി / അരക്കെട്ട്)
  const munduWaist = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.40, 0.20, 10), munduMat);
  munduWaist.position.y = 0.08;
  munduWaist.castShadow = true;
  torso.add(munduWaist);

  // Shirt / Kurta Body
  const shirtBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.78, 0.42), shirtMat);
  shirtBody.position.y = 0.48;
  shirtBody.castShadow = true;

  // Shirt Collar & Button Placket
  const collar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.10, 0.44), shirtMat);
  collar.position.set(0, 0.84, 0);

  const placket = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.50, 0.04), shirtMat);
  placket.position.set(0, 0.54, 0.22);

  torso.add(shirtBody, collar, placket);

  // 2. HEAD & NECK
  const head = new THREE.Group();
  head.position.set(0, 1.05, 0);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.18, 8), skinMat);
  neck.position.y = -0.16;
  head.add(neck);

  const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), skinMat);
  headMesh.scale.set(1.0, 1.08, 0.98);
  headMesh.castShadow = true;
  head.add(headMesh);

  // Kerala traditional cropped hair
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.27, 10, 10, 0, Math.PI * 2, 0, Math.PI * 0.65),
    hairMat
  );
  hair.position.set(0, 0.04, -0.02);
  head.add(hair);

  if (hasMoustache) {
    const moustache = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.06), hairMat);
    moustache.position.set(0, -0.06, 0.24);
    moustache.rotation.z = 0.05;
    head.add(moustache);
  }

  // Traditional Chandanam / Bindi mark on forehead
  const thilakam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.02), new THREE.MeshLambertMaterial({ color: 0xfef3c7 }));
  thilakam.position.set(0, 0.12, 0.24);
  head.add(thilakam);

  torso.add(head);

  // 3. ARTICULATED ARMS (Shoulder & Elbow)
  // LEFT ARM
  const shoulderL = new THREE.Group();
  shoulderL.position.set(-0.40, 0.72, 0);

  const sleeveL = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.32, 8), shirtMat);
  sleeveL.position.y = -0.16;
  sleeveL.castShadow = true;
  shoulderL.add(sleeveL);

  const elbowL = new THREE.Group();
  elbowL.position.set(0, -0.30, 0);

  const forearmL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.32, 8), skinMat);
  forearmL.position.set(0, -0.16, 0.02);

  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), skinMat);
  handL.position.set(0, -0.34, 0.02);

  elbowL.add(forearmL, handL);

  // Optional traditional black Kerala umbrella held in left hand
  if (hasUmbrella) {
    const umbrellaGroup = new THREE.Group();
    umbrellaGroup.position.set(0, -0.28, 0.12);
    umbrellaGroup.rotation.x = 0.4;

    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.95, 6), new THREE.MeshLambertMaterial({ color: 0x3f3f46 }));
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.65, 8), umbrellaMat);
    canopy.position.y = 0.18;
    const hookHandle = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.015, 6, 8, Math.PI), chappalMat);
    hookHandle.position.set(0, -0.44, 0.04);
    hookHandle.rotation.x = Math.PI / 2;

    umbrellaGroup.add(stick, canopy, hookHandle);
    elbowL.add(umbrellaGroup);
  }

  shoulderL.add(elbowL);
  torso.add(shoulderL);

  // RIGHT ARM
  const shoulderR = new THREE.Group();
  shoulderR.position.set(0.40, 0.72, 0);

  const sleeveR = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.32, 8), shirtMat);
  sleeveR.position.y = -0.16;
  sleeveR.castShadow = true;
  shoulderR.add(sleeveR);

  const elbowR = new THREE.Group();
  elbowR.position.set(0, -0.30, 0);

  const forearmR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.075, 0.32, 8), skinMat);
  forearmR.position.set(0, -0.16, 0.02);

  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), skinMat);
  handR.position.set(0, -0.34, 0.02);

  elbowR.add(forearmR, handR);
  shoulderR.add(elbowR);
  torso.add(shoulderR);

  // 4. ARTICULATED LEGS & FEET (Mundu drapes dynamically on each leg)
  function createChappal(): THREE.Group {
    const shoe = new THREE.Group();
    // Sole
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.04, 0.36), chappalMat);
    sole.position.set(0, 0.02, 0.04);

    // Toe Post & Straps (V-strap chappal)
    const strapV1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.16), chappalMat);
    strapV1.position.set(-0.04, 0.06, 0.06);
    strapV1.rotation.y = 0.4;

    const strapV2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 0.16), chappalMat);
    strapV2.position.set(0.04, 0.06, 0.06);
    strapV2.rotation.y = -0.4;

    // Foot base (bare skin foot inside chappal)
    const footSkin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.32), skinMat);
    footSkin.position.set(0, 0.06, 0.04);

    shoe.add(sole, strapV1, strapV2, footSkin);
    return shoe;
  }

  const legRadiusTop = foldedMundu ? 0.16 : 0.20;
  const legRadiusBot = foldedMundu ? 0.14 : 0.22;

  // LEFT HIP
  const hipL = new THREE.Group();
  hipL.position.set(-0.18, 0.86, 0);

  // Left Thigh (Mundu drape)
  const thighL = new THREE.Mesh(
    new THREE.CylinderGeometry(legRadiusTop, legRadiusBot, 0.42, 10),
    munduMat
  );
  thighL.position.y = -0.21;
  thighL.castShadow = true;
  hipL.add(thighL);

  // Left Knee
  const kneeL = new THREE.Group();
  kneeL.position.set(0, -0.42, 0);

  // Left Lower Leg (Mundu hem + Gold Kasavu border or bare calf if folded mundu)
  const lowerMat = foldedMundu ? skinMat : munduMat;
  const shinL = new THREE.Mesh(
    new THREE.CylinderGeometry(legRadiusBot, foldedMundu ? 0.10 : 0.24, 0.38, 10),
    lowerMat
  );
  shinL.position.y = -0.19;
  shinL.castShadow = true;
  kneeL.add(shinL);

  if (!foldedMundu) {
    // Golden Kasavu Border near bottom hem
    const kasavuL = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.25, 0.08, 10), kasavuMat);
    kasavuL.position.y = -0.32;
    kneeL.add(kasavuL);
  }

  // Left Ankle & Foot
  const ankleL = new THREE.Group();
  ankleL.position.set(0, -0.38, 0);
  ankleL.add(createChappal());
  kneeL.add(ankleL);
  hipL.add(kneeL);
  root.add(hipL);

  // RIGHT HIP
  const hipR = new THREE.Group();
  hipR.position.set(0.18, 0.86, 0);

  // Right Thigh
  const thighR = new THREE.Mesh(
    new THREE.CylinderGeometry(legRadiusTop, legRadiusBot, 0.42, 10),
    munduMat
  );
  thighR.position.y = -0.21;
  thighR.castShadow = true;
  hipR.add(thighR);

  // Right Knee
  const kneeR = new THREE.Group();
  kneeR.position.set(0, -0.42, 0);

  // Right Lower Leg
  const shinR = new THREE.Mesh(
    new THREE.CylinderGeometry(legRadiusBot, foldedMundu ? 0.10 : 0.24, 0.38, 10),
    lowerMat
  );
  shinR.position.y = -0.19;
  shinR.castShadow = true;
  kneeR.add(shinR);

  if (!foldedMundu) {
    const kasavuR = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.25, 0.08, 10), kasavuMat);
    kasavuR.position.y = -0.32;
    kneeR.add(kasavuR);
  }

  // Right Ankle & Foot
  const ankleR = new THREE.Group();
  ankleR.position.set(0, -0.38, 0);
  ankleR.add(createChappal());
  kneeR.add(ankleR);
  hipR.add(kneeR);
  root.add(hipR);

  // 5. AUTHENTIC BIPEDAL WALK LOCOMOTION CONTROLLER
  let walkPhase = 0;
  let currentIntensity = 0;
  let idleTime = Math.random() * 10;

  function updateAnimation(delta: number, isMoving: boolean, isSprinting: boolean, moveSpeed: number = 1.0) {
    const targetIntensity = isMoving ? (isSprinting ? 1.35 : 1.0) : 0.0;
    currentIntensity = THREE.MathUtils.lerp(currentIntensity, targetIntensity, Math.min(1.0, delta * 8.5));

    idleTime += delta;

    if (currentIntensity > 0.01) {
      const cadence = (isSprinting ? 12.0 : 8.5) * Math.max(0.6, moveSpeed);
      walkPhase += delta * cadence;

      const p = walkPhase;
      const intensity = currentIntensity;

      // 1. HIP SWING
      const legStride = (isSprinting ? 0.65 : 0.42) * intensity;
      hipL.rotation.x = Math.sin(p) * legStride;
      hipR.rotation.x = -Math.sin(p) * legStride;

      hipL.rotation.z = Math.sin(p) * 0.03 * intensity;
      hipR.rotation.z = Math.sin(p) * 0.03 * intensity;

      // 2. KNEE FLEXION
      const kneeFlexL = Math.max(0, -Math.sin(p)) * (isSprinting ? 0.90 : 0.60) * intensity;
      const kneeFlexR = Math.max(0, Math.sin(p)) * (isSprinting ? 0.90 : 0.60) * intensity;
      kneeL.rotation.x = kneeFlexL;
      kneeR.rotation.x = kneeFlexR;

      // 3. ANKLE PITCH
      ankleL.rotation.x = Math.sin(p) * 0.20 * intensity - kneeFlexL * 0.22;
      ankleR.rotation.x = -Math.sin(p) * 0.20 * intensity - kneeFlexR * 0.22;

      // 4. VERTICAL CENTER OF MASS BOUNCE (2x frequency)
      const comBounce = -Math.abs(Math.sin(p)) * (isSprinting ? 0.07 : 0.045) * intensity;
      torso.position.y = 0.88 + comBounce;
      torso.rotation.x = (isSprinting ? 0.15 : 0.05) * intensity;

      // 5. PELVIC TILT & COUNTER-TWIST
      torso.rotation.y = -Math.sin(p) * (isSprinting ? 0.12 : 0.07) * intensity;
      torso.rotation.z = Math.cos(p) * 0.025 * intensity;

      // 6. ARM SWING (Counter-lateral)
      const armSwing = (isSprinting ? 0.70 : 0.42) * intensity;
      // Right arm swings opposite right leg (with left leg)
      shoulderR.rotation.x = -Math.sin(p) * armSwing;
      elbowR.rotation.x = Math.max(0, -Math.sin(p)) * 0.32 * intensity;

      // Left arm (if holding umbrella, swing is dampened)
      if (hasUmbrella) {
        shoulderL.rotation.x = Math.sin(p) * (armSwing * 0.35);
        elbowL.rotation.x = Math.max(0, Math.sin(p)) * 0.15 * intensity;
      } else {
        shoulderL.rotation.x = Math.sin(p) * armSwing;
        elbowL.rotation.x = Math.max(0, Math.sin(p)) * 0.32 * intensity;
      }

      // 7. HEAD COUNTER-TILT
      head.rotation.x = -torso.rotation.x * 0.5 + Math.sin(p * 2) * 0.015 * intensity;
      head.rotation.y = -torso.rotation.y * 0.5;
    } else {
      // IDLE REST POSE: Smooth damping with gentle breathing and resting weight shift
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

      // Subtle breathing rhythm
      const breath = Math.sin(idleTime * 2.0) * 0.012;
      const weightShift = Math.sin(idleTime * 0.7) * 0.015;

      torso.position.y = THREE.MathUtils.lerp(torso.position.y, 0.88 + breath, damp);
      torso.rotation.x = THREE.MathUtils.lerp(torso.rotation.x, 0, damp);
      torso.rotation.y = THREE.MathUtils.lerp(torso.rotation.y, 0, damp);
      torso.rotation.z = THREE.MathUtils.lerp(torso.rotation.z, weightShift, damp);

      head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, Math.sin(idleTime * 1.4) * 0.015, damp);
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
    updateAnimation,
  };
}
