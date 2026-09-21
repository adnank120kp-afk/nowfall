import * as THREE from 'three';

/**
 * Builds the authentic 2024 BS6 Auto Tuk Tuk Model
 * strictly matching the technical specification blueprint:
 * - Olive green body panels & fenders
 * - Vibrant yellow front cowl & rear bumper bar
 * - Matte black canopy roof with aerodynamic curve & rear window
 * - Sculpted black front grille with RE badge & twin round headlamps
 * - Twin amber turn signals on cowl
 * - Angled windshield with black rubber frame & single diagonal wiper
 * - Twin side stalk rearview mirrors
 * - Interior driver bucket seat, handlebar console, passenger cushioned bench
 * - Stepped open passenger side entrance cutouts with tubular B-pillars
 * - Rear engine compartment with horizontal cooling louvers, RE badge & vertical taillights
 * - Kerala taxi registration plate: KL-11 E 4040
 * - 3 detailed wheels with silver steel rims, 4-bolt hubs, and rubber tires
 */
export function buildDetailedAutoRickshaw(isPlayerVehicle = false): THREE.Group {
  const auto = new THREE.Group();

  // 1. PALETTE & MATERIALS (Strictly from 2024 Technical Spec)
  const oliveMat = new THREE.MeshLambertMaterial({ color: 0x4f6139 }); // Olive/army green metal panels
  const oliveDarkMat = new THREE.MeshLambertMaterial({ color: 0x3d4d2b });
  const yellowMat = new THREE.MeshLambertMaterial({ color: 0xebb022 }); // High-visibility Indian auto yellow
  const canopyMat = new THREE.MeshLambertMaterial({ color: 0x222527 }); // Matte black canvas/vinyl roof
  const blackTrimMat = new THREE.MeshLambertMaterial({ color: 0x161819 }); // Bumpers, grille, pillars, mirrors
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd2d6dc,
    metalness: 0.65,
    roughness: 0.3,
  });
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x151617 }); // Dark rubber
  const glassMat = new THREE.MeshPhongMaterial({
    color: 0xd0e8f2,
    transparent: true,
    opacity: 0.75,
    shininess: 90,
  });
  const headlightMat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x555555,
    shininess: 120,
  });
  const amberMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b }); // Indicator lights
  const redLightMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 }); // Brake lights
  const seatLeatherMat = new THREE.MeshLambertMaterial({ color: 0x2a2421 }); // Dark brown/black leather
  const plateYellowMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 }); // Commercial taxi plate

  // 2. CHASSIS & FLOOR PAN
  const floorPan = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.12, 2.65), blackTrimMat);
  floorPan.position.set(0, 0.42, -0.15);
  floorPan.castShadow = true;
  floorPan.receiveShadow = true;
  auto.add(floorPan);

  // Stepped entrance sills on both sides
  const sillLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 1.1), blackTrimMat);
  sillLeft.position.set(-0.76, 0.38, 0.05);
  const sillRight = sillLeft.clone();
  sillRight.position.x = 0.76;
  auto.add(sillLeft, sillRight);

  // 3. FRONT WHEEL ASSEMBLY & FORK SUSPENSION
  const frontWheelGroup = new THREE.Group();
  frontWheelGroup.position.set(0, 0.36, 1.18);

  // Front tire (rubber)
  const fTire = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.22, 18), tireMat);
  fTire.rotateZ(Math.PI / 2);
  fTire.castShadow = true;
  frontWheelGroup.add(fTire);

  // Front rim (steel with 4-bolt hub detail)
  const fRim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.226, 14), silverMat);
  fRim.rotateZ(Math.PI / 2);
  frontWheelGroup.add(fRim);

  const fHub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.236, 10), blackTrimMat);
  fHub.rotateZ(Math.PI / 2);
  frontWheelGroup.add(fHub);

  // Front fork suspension arm (Right side single fork as on Bajaj RE)
  const forkArm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.65, 8), silverMat);
  forkArm.position.set(0.14, 0.24, 0);
  forkArm.rotation.z = -0.18;
  forkArm.rotation.x = -0.22;
  frontWheelGroup.add(forkArm);

  // Front Curved Mudguard / Fender (Olive green)
  const fMudguardGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 14, 1, false, -Math.PI * 0.15, Math.PI * 0.85);
  fMudguardGeo.rotateZ(Math.PI / 2);
  const fMudguard = new THREE.Mesh(fMudguardGeo, oliveMat);
  fMudguard.position.set(0, 0.06, 0);
  fMudguard.castShadow = true;
  frontWheelGroup.add(fMudguard);

  auto.add(frontWheelGroup);

  // 4. FRONT NOSE, SCULPTED GRILLE & HEADLAMPS
  // Lower front apron tapering to nose
  const noseApron = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.65), oliveMat);
  noseApron.position.set(0, 0.72, 1.05);
  noseApron.castShadow = true;
  auto.add(noseApron);

  // Sculpted matte black center grille with angular Bajaj RE 2024 contour
  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.46, 0.14), blackTrimMat);
  grille.position.set(0, 0.88, 1.34);
  grille.rotation.x = -0.18;
  grille.castShadow = true;
  auto.add(grille);

  // Center "RE" badge
  const reBadge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.03), silverMat);
  reBadge.position.set(0, 0.95, 1.42);
  reBadge.rotation.x = -0.18;
  auto.add(reBadge);

  // Dual circular crystal headlamps set into grille
  const hlLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 12), headlightMat);
  hlLeft.rotateX(Math.PI / 2);
  hlLeft.position.set(-0.27, 0.88, 1.41);
  const hlRight = hlLeft.clone();
  hlRight.position.x = 0.27;

  // Headlamp bezels
  const hlBezelL = new THREE.Mesh(new THREE.TorusGeometry(0.115, 0.02, 8, 16), silverMat);
  hlBezelL.position.copy(hlLeft.position);
  hlBezelL.position.z += 0.01;
  const hlBezelR = hlBezelL.clone();
  hlBezelR.position.x = 0.27;

  auto.add(hlLeft, hlRight, hlBezelL, hlBezelR);

  // 5. YELLOW UPPER COWL SECTION WITH TURN INDICATORS
  const yellowCowl = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.32, 0.32), yellowMat);
  yellowCowl.position.set(0, 1.24, 1.15);
  yellowCowl.rotation.x = -0.22;
  yellowCowl.castShadow = true;
  auto.add(yellowCowl);

  // Twin amber turn indicators on yellow cowl
  const indLeft = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.04), amberMat);
  indLeft.position.set(-0.52, 1.25, 1.29);
  indLeft.rotation.x = -0.22;
  const indRight = indLeft.clone();
  indRight.position.x = 0.52;
  auto.add(indLeft, indRight);

  // 6. WINDSHIELD & RUBBER FRAME
  // Windshield frame
  const wsFrame = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.68, 0.08), blackTrimMat);
  wsFrame.position.set(0, 1.66, 0.98);
  wsFrame.rotation.x = -0.26;
  auto.add(wsFrame);

  // Windshield safety glass
  const windshield = new THREE.Mesh(new THREE.PlaneGeometry(1.28, 0.58), glassMat);
  windshield.position.set(0, 1.66, 1.025);
  windshield.rotation.x = -0.26;
  auto.add(windshield);

  // Single diagonal windshield wiper arm (as shown in technical diagram)
  const wiperArm = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.44, 0.015), blackTrimMat);
  wiperArm.position.set(0.15, 1.66, 1.035);
  wiperArm.rotation.x = -0.26;
  wiperArm.rotation.z = -0.65;
  auto.add(wiperArm);

  // 7. SIDE REARVIEW MIRRORS
  function createSideMirror(isLeft: boolean) {
    const mirrorGroup = new THREE.Group();
    const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.22, 6), blackTrimMat);
    stalk.rotation.z = isLeft ? -Math.PI / 3.5 : Math.PI / 3.5;
    stalk.rotation.y = isLeft ? 0.2 : -0.2;
    mirrorGroup.add(stalk);

    const mirrorHead = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 12), blackTrimMat);
    mirrorHead.rotateX(Math.PI / 2);
    mirrorHead.position.set(isLeft ? -0.16 : 0.16, 0.1, 0.04);

    const mirrorGlass = new THREE.Mesh(new THREE.CircleGeometry(0.072, 12), silverMat);
    mirrorGlass.position.set(isLeft ? -0.16 : 0.16, 0.1, 0.02);
    mirrorGlass.rotation.y = Math.PI;

    mirrorGroup.add(mirrorHead, mirrorGlass);
    mirrorGroup.position.set(isLeft ? -0.72 : 0.72, 1.54, 1.02);
    return mirrorGroup;
  }
  auto.add(createSideMirror(true), createSideMirror(false));

  // 8. CABIN INTERIOR: Driver seat, handlebar, passenger bench
  // Handlebar steering console
  const handleBar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.65, 8), blackTrimMat);
  handleBar.rotateZ(Math.PI / 2);
  handleBar.position.set(0, 1.15, 0.72);
  const handleStem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.55, 8), blackTrimMat);
  handleStem.position.set(0, 0.9, 0.78);
  handleStem.rotation.x = -0.32;
  auto.add(handleBar, handleStem);

  // Meter console box
  const meterBox = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.12, 0.14), blackTrimMat);
  meterBox.position.set(0, 1.18, 0.72);
  auto.add(meterBox);

  // Driver bucket seat
  const dSeatBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.35, 0.5), seatLeatherMat);
  dSeatBase.position.set(0, 0.62, 0.35);
  dSeatBase.castShadow = true;
  const dSeatBack = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 0.12), seatLeatherMat);
  dSeatBack.position.set(0, 0.95, 0.12);
  dSeatBack.castShadow = true;
  auto.add(dSeatBase, dSeatBack);

  // Passenger rear bench seat
  const pSeatBase = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.38, 0.6), seatLeatherMat);
  pSeatBase.position.set(0, 0.64, -0.85);
  pSeatBase.castShadow = true;
  const pSeatBack = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.52, 0.14), seatLeatherMat);
  pSeatBack.position.set(0, 1.05, -1.18);
  pSeatBack.castShadow = true;
  auto.add(pSeatBase, pSeatBack);

  // 9. BODY PANELS & SIDE PROFILE (Stepped entrance, rear quarters, louvers)
  // Rear side quarter panels (olive green)
  const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 1.25), oliveMat);
  sideL.position.set(-0.72, 0.85, -0.72);
  sideL.castShadow = true;
  const sideR = sideL.clone();
  sideR.position.x = 0.72;
  auto.add(sideL, sideR);

  // Side engine louvers (horizontal ventilation slits detail on side panels)
  const louverMat = new THREE.MeshLambertMaterial({ color: 0x222222 });
  for (let li = 0; li < 4; li++) {
    const louverL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.35), louverMat);
    louverL.position.set(-0.73, 0.7 + li * 0.07, -0.7);
    const louverR = louverL.clone();
    louverR.position.x = 0.73;
    auto.add(louverL, louverR);
  }

  // Eco / BS6 green leaf sticker badge on side panels
  const ecoBadgeL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.14), new THREE.MeshLambertMaterial({ color: 0x22c55e }));
  ecoBadgeL.position.set(-0.73, 0.95, -0.55);
  const ecoBadgeR = ecoBadgeL.clone();
  ecoBadgeR.position.x = 0.73;
  auto.add(ecoBadgeL, ecoBadgeR);

  // Tubular B-Pillars (Center vertical support post)
  const pillarL = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 1.5, 8), blackTrimMat);
  pillarL.position.set(-0.72, 1.22, -0.12);
  const pillarR = pillarL.clone();
  pillarR.position.x = 0.72;
  auto.add(pillarL, pillarR);

  // 10. REAR ENGINE COMPARTMENT, LOUVERED HATCH, TAILLIGHTS & BUMPER
  // Rear main back panel
  const rearHatch = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.82, 0.08), oliveMat);
  rearHatch.position.set(0, 0.88, -1.38);
  rearHatch.castShadow = true;
  auto.add(rearHatch);

  // Engine hatch cooling louver grill (6 horizontal embossed bars)
  for (let ri = 0; ri < 5; ri++) {
    const rLouver = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.035, 0.02), oliveDarkMat);
    rLouver.position.set(0, 0.85 + ri * 0.075, -1.425);
    auto.add(rLouver);
  }

  // Rear "RE" emblem badge
  const rearReBadge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.08, 0.02), silverMat);
  rearReBadge.position.set(0, 0.98, -1.43);
  auto.add(rearReBadge);

  // Vertical rectangular taillight clusters (Red brake top, Amber turn bottom)
  [-0.64, 0.64].forEach((tx) => {
    const tRed = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.12, 0.04), redLightMat);
    tRed.position.set(tx, 0.96, -1.42);
    const tAmber = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.04), amberMat);
    tAmber.position.set(tx, 0.84, -1.42);
    auto.add(tRed, tAmber);
  });

  // Full-width yellow rear bumper bar
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.13, 0.14), yellowMat);
  rearBumper.position.set(0, 0.44, -1.42);
  rearBumper.castShadow = true;
  auto.add(rearBumper);

  // Kerala commercial yellow registration plate: KL-11 E 4040
  const regPlate = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.11, 0.02), plateYellowMat);
  regPlate.position.set(0.38, 0.68, -1.425);
  auto.add(regPlate);

  // Rubber rear mudflaps behind rear wheels
  const mudFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.02), blackTrimMat);
  mudFlapL.position.set(-0.76, 0.25, -1.25);
  const mudFlapR = mudFlapL.clone();
  mudFlapR.position.x = 0.76;
  auto.add(mudFlapL, mudFlapR);

  // 11. 2024 CURVED MATTE BLACK CANOPY / SOFT-TOP ROOF
  // Main horizontal canopy roof
  const canopyTop = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.18, 2.3), canopyMat);
  canopyTop.position.set(0, 2.01, -0.15);
  canopyTop.castShadow = true;
  auto.add(canopyTop);

  // Curved canopy front brow sloping down above windshield
  const canopyFrontBrow = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.16, 0.35), canopyMat);
  canopyFrontBrow.position.set(0, 1.94, 0.95);
  canopyFrontBrow.rotation.x = -0.32;
  canopyFrontBrow.castShadow = true;
  auto.add(canopyFrontBrow);

  // Canopy rear curved panel dropping down to engine deck
  const canopyRearWall = new THREE.Mesh(new THREE.BoxGeometry(1.46, 0.68, 0.08), canopyMat);
  canopyRearWall.position.set(0, 1.64, -1.32);
  canopyRearWall.castShadow = true;
  auto.add(canopyRearWall);

  // Rear rectangular viewing window glass
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.34, 0.02), glassMat);
  rearWindow.position.set(0, 1.66, -1.365);
  auto.add(rearWindow);

  // Side canopy overhang valances
  const valanceL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 2.25), canopyMat);
  valanceL.position.set(-0.73, 1.94, -0.15);
  const valanceR = valanceL.clone();
  valanceR.position.x = 0.73;
  auto.add(valanceL, valanceR);

  // 12. REAR WHEEL ASSEMBLIES (Left & Right)
  function createRearWheel(xPos: number) {
    const rWheelGroup = new THREE.Group();
    rWheelGroup.position.set(xPos, 0.36, -0.95);

    // Rubber Tire
    const rTire = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.22, 18), tireMat);
    rTire.rotateZ(Math.PI / 2);
    rTire.castShadow = true;
    rWheelGroup.add(rTire);

    // Silver steel rim with 4 lug nuts
    const rRim = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.226, 14), silverMat);
    rRim.rotateZ(Math.PI / 2);
    rWheelGroup.add(rRim);

    // Center hub cap
    const rHub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.236, 10), blackTrimMat);
    rHub.rotateZ(Math.PI / 2);
    rWheelGroup.add(rHub);

    // 4 wheel lug bolts
    for (let b = 0; b < 4; b++) {
      const angle = (b / 4) * Math.PI * 2;
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.238, 6), silverMat);
      bolt.rotateZ(Math.PI / 2);
      bolt.position.set(xPos < 0 ? -0.005 : 0.005, Math.sin(angle) * 0.14, Math.cos(angle) * 0.14);
      rWheelGroup.add(bolt);
    }

    return rWheelGroup;
  }

  auto.add(createRearWheel(-0.75), createRearWheel(0.75));

  // Rear axle bar under carriage
  const rearAxle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.45, 8), blackTrimMat);
  rearAxle.rotateZ(Math.PI / 2);
  rearAxle.position.set(0, 0.36, -0.95);
  auto.add(rearAxle);

  return auto;
}
