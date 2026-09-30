import * as THREE from 'three';

// =============================================================================
// 🐘 REALISTIC SCULPTED ASIAN ELEPHANT (6 അടി / 72" சிமெண்ட் யானை சிலை)
// Faithfully constructed to the exact blueprint dimensions and anatomy:
// - Total Height: 72" (6ft) / Shoulder Height: 58-60"
// - Body Length: 84-90" / Body Width: 30-36" / Back Arch: 48-52"
// - Twin Cranial Domes (Frontal Lobes with sagittal depression) & Temple Filigree
// - Curved Asian Elephant Ears (16-20" W x 20-24" H) with folded top pinna
// - Segmented Muscular Curved Trunk (30-36" L) curling gracefully at tip
// - Dual Polished Ivory Tusks (14-18" L) sweeping forward & curving upward
// - Pillar Column Legs (10-12" Dia) with flared footpads & white toenails
//   (5 front toenails, 4 rear toenails)
// - Slender Tail (24-30" L) with paddle-shaped black hair bristle tuft
// - Architectural Beveled Stone Pedestal Base (90-96" L x 36-42" W x 4-6" H)
// =============================================================================

export interface ElephantOptions {
  scale?: number;
  hasPedestal?: boolean;
  skinColor?: number;
  hasNettipattam?: boolean;
}

export function buildRealisticSculptedElephant(options: ElephantOptions = {}): THREE.Group {
  const elephant = new THREE.Group();

  const scale = options.scale ?? 1.0;
  const hasPedestal = options.hasPedestal ?? true;
  const skinColor = options.skinColor ?? 0x52525b; // Realistic sculpted matte cement / granite slate
  const hasNettipattam = options.hasNettipattam ?? true;

  // -----------------------------------------------------------
  // Materials Palette
  // -----------------------------------------------------------
  // Realistic matte cement / slate elephant skin
  const skinMat = new THREE.MeshStandardMaterial({
    color: skinColor,
    roughness: 0.88,
    metalness: 0.12,
  });

  // Darker shade for skin creases, ears, and joint shadows
  const skinDarkMat = new THREE.MeshStandardMaterial({
    color: 0x3f3f46,
    roughness: 0.92,
    metalness: 0.08,
  });

  // Polished Ivory for Tusks
  const ivoryMat = new THREE.MeshStandardMaterial({
    color: 0xfef9c3,
    roughness: 0.25,
    metalness: 0.15,
  });

  // Sculpted Ivory/Bone Toenails
  const toenailMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.35,
    metalness: 0.1,
  });

  // Coarse Black Hair Bristles for Tail Tuft & Eye Lashes
  const hairMat = new THREE.MeshLambertMaterial({
    color: 0x18181b,
  });

  // Temple Forehead Ornament / Nettipattam Filigree
  const goldFiligreeMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    roughness: 0.3,
    metalness: 0.8,
  });

  // Dark Glossy Eyes
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.1,
    metalness: 0.9,
  });

  // Pedestal Base Stone
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.95,
    metalness: 0.05,
  });

  // ===========================================================
  // 1. ARCHITECTURAL BEVELED PEDESTAL BASE (அடிப்பாகம் / Base)
  // Blueprint: Length 90-96", Width 36-42", Height 4-6"
  // ===========================================================
  if (hasPedestal) {
    const baseGroup = new THREE.Group();

    // Main Base Plinth
    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(2.3 * scale, 0.22 * scale, 5.2 * scale),
      pedestalMat
    );
    plinth.position.y = (0.22 * scale) / 2;
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    baseGroup.add(plinth);

    // Stepped Upper Molding / Cornice
    const cornice = new THREE.Mesh(
      new THREE.BoxGeometry(2.15 * scale, 0.08 * scale, 5.0 * scale),
      pedestalMat
    );
    cornice.position.y = 0.22 * scale + (0.08 * scale) / 2;
    cornice.receiveShadow = true;
    baseGroup.add(cornice);

    elephant.add(baseGroup);
  }

  const baseOffsetY = hasPedestal ? 0.26 * scale : 0;
  const bodyRoot = new THREE.Group();
  bodyRoot.position.y = baseOffsetY;

  // ===========================================================
  // 2. COLUMNAR PILLAR LEGS & FOOTPADS (கால்கள் & விரல் நகங்கள்)
  // Blueprint: Leg Height 48-52", Diameter 10-12", Circ 28-32"
  // Front legs spacing 10-14", Rear legs spacing 12-16"
  // Front-to-rear spacing 32-40"
  // ===========================================================
  const legHeight = 2.4 * scale;
  const legRadius = 0.32 * scale;

  function createLeg(isFront: boolean, isLeft: boolean) {
    const legGroup = new THREE.Group();
    const sideX = (isFront ? 0.44 : 0.48) * (isLeft ? -1 : 1) * scale;
    const posZ = (isFront ? 1.05 : -1.05) * scale;

    legGroup.position.set(sideX, 0, posZ);

    // Main Muscular Leg Pillar (Slight taper from shoulder to ankle)
    const legTopRad = (isFront ? 0.38 : 0.42) * scale;
    const legBotRad = 0.30 * scale;
    const legShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(legTopRad, legBotRad, legHeight, 16),
      skinMat
    );
    legShaft.position.y = legHeight / 2;
    legShaft.castShadow = true;
    legGroup.add(legShaft);

    // Shoulder / Hip Muscular Bulge (Scapula & Pelvic joinery)
    const upperJoint = new THREE.Mesh(
      new THREE.SphereGeometry((isFront ? 0.42 : 0.46) * scale, 12, 10),
      skinMat
    );
    upperJoint.scale.set(0.9, 1.2, 1.0);
    upperJoint.position.set(isLeft ? -0.06 * scale : 0.06 * scale, legHeight - 0.2 * scale, 0);
    legGroup.add(upperJoint);

    // Knee / Wrist Joint Creases & Wrinkle Rings
    const kneeY = (isFront ? 0.52 : 0.44) * legHeight;
    const kneeBulge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.33 * scale, 0.31 * scale, 0.25 * scale, 14),
      skinDarkMat
    );
    kneeBulge.position.y = kneeY;
    legGroup.add(kneeBulge);

    // Ankle Flared Footpad (As detailed in the blueprint callout!)
    const footpad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31 * scale, 0.36 * scale, 0.22 * scale, 16),
      skinMat
    );
    footpad.position.y = (0.22 * scale) / 2;
    footpad.castShadow = true;
    legGroup.add(footpad);

    // Sculpted Ivory/Bone Toenails: 5 on Front feet, 4 on Rear feet!
    const nailCount = isFront ? 5 : 4;
    const nailRadius = 0.35 * scale;
    const nailAngleSpan = Math.PI * 0.75;
    const nailAngleStart = -nailAngleSpan / 2;

    for (let n = 0; n < nailCount; n++) {
      const angle = nailAngleStart + (n / (nailCount - 1)) * nailAngleSpan;
      const nail = new THREE.Mesh(
        new THREE.SphereGeometry(0.05 * scale, 8, 8),
        toenailMat
      );
      nail.scale.set(1.0, 1.4, 0.8);
      nail.position.set(
        Math.sin(angle) * nailRadius,
        0.05 * scale,
        Math.cos(angle) * nailRadius
      );
      nail.rotation.y = angle;
      legGroup.add(nail);
    }

    return legGroup;
  }

  bodyRoot.add(createLeg(true, true));   // Front Left
  bodyRoot.add(createLeg(true, false));  // Front Right
  bodyRoot.add(createLeg(false, true));  // Rear Left
  bodyRoot.add(createLeg(false, false)); // Rear Right

  // ===========================================================
  // 3. ANATOMICAL TORSO & ARCHED DORSAL SPINE (உடல்)
  // Blueprint: Length 84-90", Height 48-52", Width 30-36"
  // Characteristic convex arched back sloping toward the pelvis
  // ===========================================================
  const torsoGroup = new THREE.Group();
  torsoGroup.position.set(0, legHeight + 0.15 * scale, 0);

  // Main Barrel Chest & Ribcage (Rounded convex mass)
  const ribcage = new THREE.Mesh(
    new THREE.SphereGeometry(1.22 * scale, 18, 16),
    skinMat
  );
  ribcage.scale.set(0.92, 1.05, 1.45);
  ribcage.position.set(0, 0.45 * scale, 0.3 * scale);
  ribcage.castShadow = true;
  torsoGroup.add(ribcage);

  // Muscular Shoulder Hump (Shoulder Height: 58-60", highest crest at front)
  const shoulderCrest = new THREE.Mesh(
    new THREE.SphereGeometry(0.98 * scale, 14, 12),
    skinMat
  );
  shoulderCrest.scale.set(0.95, 1.05, 1.1);
  shoulderCrest.position.set(0, 0.72 * scale, 0.85 * scale);
  shoulderCrest.castShadow = true;
  torsoGroup.add(shoulderCrest);

  // Convex Arched Spine Ridge along the top back
  const spineRidge = new THREE.Mesh(
    new THREE.BoxGeometry(0.35 * scale, 0.22 * scale, 2.6 * scale),
    skinDarkMat
  );
  spineRidge.position.set(0, 1.38 * scale, -0.1 * scale);
  spineRidge.rotation.x = -0.06;
  torsoGroup.add(spineRidge);

  // Rounded Pelvic Girdle & Sloping Rump
  const rump = new THREE.Mesh(
    new THREE.SphereGeometry(1.08 * scale, 16, 14),
    skinMat
  );
  rump.scale.set(0.90, 0.98, 1.25);
  rump.position.set(0, 0.35 * scale, -0.85 * scale);
  rump.castShadow = true;
  torsoGroup.add(rump);

  // Lower Belly / Underbelly contour sagging naturally
  const belly = new THREE.Mesh(
    new THREE.SphereGeometry(0.85 * scale, 14, 10),
    skinDarkMat
  );
  belly.scale.set(0.88, 0.75, 1.55);
  belly.position.set(0, -0.15 * scale, 0);
  torsoGroup.add(belly);

  // ===========================================================
  // 4. SLENDER TAIL WITH PADDLE BRISTLE BRUSH (வால்)
  // Blueprint: Tail Length 24-30", hangs down past hocks with brush
  // ===========================================================
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, 0.35 * scale, -1.92 * scale);

  // Slender tail stem curving naturally downward
  const tailStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05 * scale, 0.035 * scale, 1.55 * scale, 8),
    skinMat
  );
  tailStem.rotation.x = 0.12;
  tailStem.position.set(0, -0.72 * scale, -0.05 * scale);
  tailGroup.add(tailStem);

  // Paddle-shaped coarse black hair brush / tuft at tail tip
  const tailTuft = new THREE.Mesh(
    new THREE.BoxGeometry(0.12 * scale, 0.35 * scale, 0.04 * scale),
    hairMat
  );
  tailTuft.position.set(0, -1.55 * scale, -0.14 * scale);
  tailTuft.rotation.x = 0.12;
  tailGroup.add(tailTuft);

  torsoGroup.add(tailGroup);

  // ===========================================================
  // 5. CRANIUM WITH TWIN CRANIAL DOMES (தலை & மத்தகங்கள்)
  // Blueprint: Head Width 20-22", Head Height 22-24"
  // Iconic Asian elephant twin frontal lobes with sagittal furrow
  // ===========================================================
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.58 * scale, 1.88 * scale);

  // Powerful Neck Joint connecting torso to head
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72 * scale, 0.95 * scale, 0.9 * scale, 12),
    skinMat
  );
  neck.rotation.x = Math.PI / 3;
  neck.position.set(0, -0.15 * scale, -0.35 * scale);
  headGroup.add(neck);

  // Central Skull Core
  const skullCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.82 * scale, 16, 14),
    skinMat
  );
  skullCore.scale.set(0.95, 1.15, 1.05);
  headGroup.add(skullCore);

  // Twin Cranial Domes (Left & Right Forehead Bulges - characteristic of Asian elephant!)
  [-0.32, 0.32].forEach((dx) => {
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.42 * scale, 14, 12),
      skinMat
    );
    dome.position.set(dx * scale, 0.62 * scale, 0.18 * scale);
    headGroup.add(dome);
  });

  // Central Sagittal Depression / Furrow between domes
  const foreheadCenter = new THREE.Mesh(
    new THREE.BoxGeometry(0.18 * scale, 0.45 * scale, 0.12 * scale),
    skinDarkMat
  );
  foreheadCenter.position.set(0, 0.55 * scale, 0.46 * scale);
  headGroup.add(foreheadCenter);

  // Sculpted Temple Forehead Band / Nettipattam Filigree (as shown in front view blueprint!)
  if (hasNettipattam) {
    const crownBand = new THREE.Mesh(
      new THREE.TorusGeometry(0.55 * scale, 0.04 * scale, 8, 20, Math.PI * 0.9),
      goldFiligreeMat
    );
    crownBand.rotation.x = Math.PI / 2.8;
    crownBand.rotation.z = Math.PI;
    crownBand.position.set(0, 0.56 * scale, 0.32 * scale);
    headGroup.add(crownBand);

    // Center Golden Medallion / Jewel
    const medallion = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * scale, 0.12 * scale, 0.03 * scale, 12),
      goldFiligreeMat
    );
    medallion.rotation.x = Math.PI / 2.5;
    medallion.position.set(0, 0.48 * scale, 0.66 * scale);
    headGroup.add(medallion);
  }

  // Realistic Lateral Eyes with Wrinkled Eyelid Hoods
  [-0.68, 0.68].forEach((ex) => {
    const isLeft = ex < 0;
    // Eyebrow ridge / socket
    const eyeSocket = new THREE.Mesh(
      new THREE.SphereGeometry(0.16 * scale, 8, 8),
      skinDarkMat
    );
    eyeSocket.scale.set(0.6, 1.2, 1.4);
    eyeSocket.position.set(ex * scale, 0.22 * scale, 0.32 * scale);
    headGroup.add(eyeSocket);

    // Dark glossy eyeball
    const eyeball = new THREE.Mesh(
      new THREE.SphereGeometry(0.07 * scale, 8, 8),
      eyeMat
    );
    eyeball.position.set(
      (isLeft ? ex - 0.04 : ex + 0.04) * scale,
      0.22 * scale,
      0.34 * scale
    );
    headGroup.add(eyeball);
  });

  // ===========================================================
  // 6. SCULPTED ASIAN ELEPHANT EARS (காதுகள்)
  // Blueprint: Ear Width 16-20", Ear Height 20-24"
  // Characteristic triangular lateral flare with top folded forward
  // ===========================================================
  [-0.85, 0.85].forEach((earX) => {
    const isLeft = earX < 0;
    const earGroup = new THREE.Group();
    earGroup.position.set(earX * scale, 0.28 * scale, -0.05 * scale);

    // Main Ear Flap
    const earShape = new THREE.Mesh(
      new THREE.BoxGeometry(0.06 * scale, 1.15 * scale, 0.88 * scale),
      skinMat
    );
    earShape.position.set(isLeft ? -0.22 * scale : 0.22 * scale, -0.15 * scale, 0);
    earGroup.add(earShape);

    // Folded Top Margin (The distinctive Asian elephant top ear fold!)
    const earFold = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04 * scale, 0.04 * scale, 0.82 * scale, 8),
      skinDarkMat
    );
    earFold.rotation.x = Math.PI / 2;
    earFold.position.set(isLeft ? -0.22 * scale : 0.22 * scale, 0.44 * scale, 0);
    earGroup.add(earFold);

    // Inner Ear Concha Shadow
    const innerEar = new THREE.Mesh(
      new THREE.PlaneGeometry(0.72 * scale, 0.95 * scale),
      skinDarkMat
    );
    innerEar.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
    innerEar.position.set(isLeft ? -0.25 * scale : 0.25 * scale, -0.15 * scale, 0);
    earGroup.add(innerEar);

    // Angle ears slightly outward and forward (natural flare)
    earGroup.rotation.y = isLeft ? 0.38 : -0.38;
    earGroup.rotation.z = isLeft ? 0.12 : -0.12;

    headGroup.add(earGroup);
  });

  // ===========================================================
  // 7. POLISHED CURVED IVORY TUSKS (தந்தங்கள்)
  // Blueprint: Tusk Length 14-18", sweeping forward, down, and up
  // ===========================================================
  [-0.32, 0.32].forEach((tx) => {
    const isLeft = tx < 0;
    const tuskGroup = new THREE.Group();
    tuskGroup.position.set(tx * scale, -0.38 * scale, 0.58 * scale);

    // Tusk Socket / Sheath Bulge in the cheek
    const socket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * scale, 0.15 * scale, 0.22 * scale, 10),
      skinDarkMat
    );
    socket.rotation.x = 0.4;
    tuskGroup.add(socket);

    // Swept Curved Ivory Tusk (Multiple articulated segments for smooth curve!)
    const segments = 5;
    let currY = 0;
    let currZ = 0;
    let currX = 0;

    for (let s = 0; s < segments; s++) {
      const segLen = 0.22 * scale;
      const rTop = (0.10 - s * 0.016) * scale;
      const rBot = (0.086 - s * 0.016) * scale;
      const tSeg = new THREE.Mesh(
        new THREE.CylinderGeometry(rTop, rBot, segLen, 10),
        ivoryMat
      );
      // Curve forward, downward, then upward and slightly flared outward
      tSeg.rotation.x = 0.55 - s * 0.14;
      tSeg.rotation.z = (isLeft ? -1 : 1) * (0.12 + s * 0.04);
      tSeg.position.set(currX, currY - segLen / 2, currZ + segLen * 0.4);
      tuskGroup.add(tSeg);

      currY -= segLen * 0.75;
      currZ += segLen * 0.65;
      currX += (isLeft ? -1 : 1) * 0.03 * scale;
    }

    // Sharp Tapered Tip
    const tuskTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.04 * scale, 0.18 * scale, 10),
      ivoryMat
    );
    tuskTip.rotation.x = 0.2;
    tuskTip.rotation.z = (isLeft ? -1 : 1) * 0.28;
    tuskTip.position.set(currX, currY - 0.06 * scale, currZ + 0.12 * scale);
    tuskGroup.add(tuskTip);

    headGroup.add(tuskGroup);
  });

  // ===========================================================
  // 8. MUSCULAR SEGMENTED CURVED TRUNK (தும்ரிக்கை)
  // Blueprint: Length 30-36", hangs down and gracefully curls at tip
  // ===========================================================
  const trunkGroup = new THREE.Group();
  trunkGroup.position.set(0, -0.15 * scale, 0.68 * scale);

  // Trunk Base (Thick muscular origin between tusks)
  const trunkBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38 * scale, 0.32 * scale, 0.45 * scale, 14),
    skinMat
  );
  trunkBase.rotation.x = 0.25;
  trunkGroup.add(trunkBase);

  // Progressive Curved Segments with Wrinkle Rings
  const trunkSegCount = 8;
  let trY = -0.22 * scale;
  let trZ = 0.08 * scale;
  let trRotX = 0.25;

  for (let i = 0; i < trunkSegCount; i++) {
    const segH = 0.26 * scale;
    const tR1 = (0.32 - i * 0.024) * scale;
    const tR2 = (0.29 - i * 0.024) * scale;

    const segMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(tR1, tR2, segH, 12),
      i % 2 === 0 ? skinMat : skinDarkMat
    );

    // Natural graceful S-curve: drops vertically, then curls outward & up at tip
    if (i < 4) {
      trRotX += 0.08;
    } else {
      trRotX -= 0.32; // Curl upward at the tip!
    }

    segMesh.rotation.x = trRotX;
    segMesh.position.set(0, trY - segH / 2, trZ);
    segMesh.castShadow = true;
    trunkGroup.add(segMesh);

    trY -= Math.cos(trRotX) * segH;
    trZ += Math.sin(trRotX) * segH;
  }

  // Prehensile Tip with Upper Finger Lobe (characteristic trunk tip)
  const trunkTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.12 * scale, 10, 8),
    skinDarkMat
  );
  trunkTip.scale.set(0.9, 0.6, 1.2);
  trunkTip.position.set(0, trY, trZ + 0.05 * scale);
  trunkGroup.add(trunkTip);

  headGroup.add(trunkGroup);
  torsoGroup.add(headGroup);

  bodyRoot.add(torsoGroup);
  elephant.add(bodyRoot);

  return elephant;
}
