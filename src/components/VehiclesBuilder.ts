import * as THREE from 'three';

// -------------------------------------------------------------
// 🚜 1. KERALA PADDY FIELD TRACTOR BUILDER
// Authentic Mahindra/Sonalika style farm tractor with red chassis,
// huge ribbed rear tires, front steer wheels, driver seat, steering wheel,
// vertical tall exhaust pipe, and headlights.
// -------------------------------------------------------------
export function buildKeralaTractor(): THREE.Group {
  const tractor = new THREE.Group();

  // Materials
  const redBodyMat = new THREE.MeshStandardMaterial({
    color: 0xd32f2f,
    metalness: 0.4,
    roughness: 0.35,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.8,
    roughness: 0.4,
  });
  const yellowEngineMat = new THREE.MeshStandardMaterial({
    color: 0xfbc02d,
    metalness: 0.5,
    roughness: 0.4,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    roughness: 0.9,
    metalness: 0.1,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.15,
  });
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });

  // Main chassis base
  const chassisGeo = new THREE.BoxGeometry(1.6, 0.7, 3.2);
  const chassis = new THREE.Mesh(chassisGeo, darkMetalMat);
  chassis.position.y = 0.8;
  chassis.castShadow = true;
  tractor.add(chassis);

  // Red Engine Hood (slanted front)
  const hoodGeo = new THREE.BoxGeometry(1.3, 0.8, 1.8);
  const hood = new THREE.Mesh(hoodGeo, redBodyMat);
  hood.position.set(0, 1.45, 0.7);
  hood.castShadow = true;
  tractor.add(hood);

  // Front Grille
  const grilleGeo = new THREE.BoxGeometry(1.15, 0.65, 0.1);
  const grille = new THREE.Mesh(grilleGeo, darkMetalMat);
  grille.position.set(0, 1.45, 1.62);
  tractor.add(grille);

  // Headlamps
  [-0.45, 0.45].forEach((x) => {
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.15, 16), chromeMat);
    lamp.rotation.x = Math.PI / 2;
    lamp.position.set(x, 1.5, 1.65);
    tractor.add(lamp);

    const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), lightMat);
    bulb.position.set(x, 1.5, 1.73);
    tractor.add(bulb);
  });

  // Vertical Exhaust Pipe with flapping rain cap
  const pipeGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.5, 12);
  const pipe = new THREE.Mesh(pipeGeo, darkMetalMat);
  pipe.position.set(0.5, 2.2, 0.8);
  tractor.add(pipe);

  const rainCap = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.16), darkMetalMat);
  rainCap.position.set(0.5, 2.95, 0.8);
  rainCap.rotation.z = 0.2;
  tractor.add(rainCap);

  // Air Pre-cleaner intake mushroom
  const airIntake = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.25, 12), darkMetalMat);
  airIntake.position.set(-0.5, 2.1, 1.0);
  tractor.add(airIntake);

  // Driver Platform & Rear Fenders
  const platformGeo = new THREE.BoxGeometry(1.8, 0.15, 1.4);
  const platform = new THREE.Mesh(platformGeo, darkMetalMat);
  platform.position.set(0, 0.9, -0.7);
  tractor.add(platform);

  // Curved Rear Fenders (left & right)
  [-0.95, 0.95].forEach((x) => {
    const fenderGeo = new THREE.BoxGeometry(0.35, 0.9, 1.5);
    const fender = new THREE.Mesh(fenderGeo, redBodyMat);
    fender.position.set(x, 1.5, -0.7);
    fender.castShadow = true;
    tractor.add(fender);
  });

  // Driver Seat (spring suspended black vinyl seat)
  const seatGeo = new THREE.BoxGeometry(0.65, 0.15, 0.55);
  const seat = new THREE.Mesh(seatGeo, darkMetalMat);
  seat.position.set(0, 1.3, -0.65);
  tractor.add(seat);

  const seatBackGeo = new THREE.BoxGeometry(0.65, 0.5, 0.12);
  const seatBack = new THREE.Mesh(seatBackGeo, darkMetalMat);
  seatBack.position.set(0, 1.6, -0.92);
  tractor.add(seatBack);

  // Steering Wheel
  const steerColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.7, 8), chromeMat);
  steerColumn.rotation.x = -0.6;
  steerColumn.position.set(0, 1.6, -0.15);
  tractor.add(steerColumn);

  const steerWheel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 8, 20), darkMetalMat);
  steerWheel.rotation.x = 0.95;
  steerWheel.position.set(0, 1.88, -0.32);
  tractor.add(steerWheel);

  // Rear Big Tread Wheels (Radius 0.75, width 0.45)
  [-1.05, 1.05].forEach((x) => {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.42, 24), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheelGroup.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.44, 16), yellowEngineMat);
    rim.rotation.z = Math.PI / 2;
    wheelGroup.add(rim);

    // Tread ribs
    for (let r = 0; r < 14; r++) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.12), tireMat);
      const angle = (r / 14) * Math.PI * 2;
      rib.position.set(0, Math.cos(angle) * 0.8, Math.sin(angle) * 0.8);
      rib.rotation.x = angle;
      wheelGroup.add(rib);
    }

    wheelGroup.position.set(x, 0.8, -0.8);
    tractor.add(wheelGroup);
  });

  // Front Smaller Steer Wheels (Radius 0.45, width 0.25)
  [-0.8, 0.8].forEach((x) => {
    const frontWheel = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.24, 20), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    frontWheel.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.26, 12), yellowEngineMat);
    rim.rotation.z = Math.PI / 2;
    frontWheel.add(rim);

    frontWheel.position.set(x, 0.45, 1.15);
    tractor.add(frontWheel);
  });

  // Rear 3-point farming hitch
  const hitchGeo = new THREE.BoxGeometry(0.8, 0.1, 0.4);
  const hitch = new THREE.Mesh(hitchGeo, darkMetalMat);
  hitch.position.set(0, 0.55, -1.6);
  tractor.add(hitch);

  tractor.scale.set(1.05, 1.05, 1.05);
  return tractor;
}

// -------------------------------------------------------------
// 🚙 2. KERALA 4x4 MOUNTAIN JEEP BUILDER
// Iconic Kerala high-range Mahindra/Thar style open-top Jeep with
// khaki/army green body, roll-bar, spare wheel on rear door,
// windshield, front bullbar, and chunky mud tires.
// -------------------------------------------------------------
export function buildKeralaJeep(): THREE.Group {
  const jeep = new THREE.Group();

  const khakiMat = new THREE.MeshStandardMaterial({
    color: 0x4a5d3f, // Kerala Forest Department / Hill Range olive green
    metalness: 0.3,
    roughness: 0.45,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.6,
    roughness: 0.4,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.9,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    metalness: 0.85,
    roughness: 0.2,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x90caf9,
    roughness: 0.1,
    metalness: 0.3,
    transparent: true,
    opacity: 0.6,
  });
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffde7 });

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.35, 3.8), blackMat);
  chassis.position.y = 0.65;
  jeep.add(chassis);

  // Main Body Tub
  const bodyTub = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.6, 2.2), khakiMat);
  bodyTub.position.set(0, 1.05, -0.4);
  bodyTub.castShadow = true;
  jeep.add(bodyTub);

  // Front Hood & Grille
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 1.5), khakiMat);
  hood.position.set(0, 1.15, 1.15);
  hood.castShadow = true;
  jeep.add(hood);

  // Vertical 7-slot iconic grille
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.08), blackMat);
  grille.position.set(0, 1.1, 1.92);
  jeep.add(grille);

  // Classic Round Headlamps
  [-0.55, 0.55].forEach((x) => {
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16), chromeMat);
    lamp.rotation.x = Math.PI / 2;
    lamp.position.set(x, 1.12, 1.94);
    jeep.add(lamp);

    const glow = new THREE.Mesh(new THREE.CircleGeometry(0.13, 16), lightMat);
    glow.position.set(x, 1.12, 2.0);
    jeep.add(glow);
  });

  // Front Heavy Bullbar with foglamps
  const bullbar = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.35, 0.15), blackMat);
  bullbar.position.set(0, 0.75, 2.05);
  jeep.add(bullbar);

  // Foldable Windshield Frame & Glass
  const windshieldFrame = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.75, 0.08), khakiMat);
  windshieldFrame.position.set(0, 1.7, 0.4);
  windshieldFrame.rotation.x = -0.18;
  jeep.add(windshieldFrame);

  const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 0.58), glassMat);
  glass.position.set(0, 1.7, 0.45);
  glass.rotation.x = -0.18;
  jeep.add(glass);

  // Black Tubular Roll Cage (Kerala Offroad style)
  const rollBarMain = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 12), blackMat);
  rollBarMain.position.set(-0.85, 1.85, -0.3);
  jeep.add(rollBarMain);

  const rollBarRight = rollBarMain.clone();
  rollBarRight.position.x = 0.85;
  jeep.add(rollBarRight);

  const rollBarTop = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.7, 12), blackMat);
  rollBarTop.rotation.z = Math.PI / 2;
  rollBarTop.position.set(0, 2.45, -0.3);
  jeep.add(rollBarTop);

  // Diagonal support bars to rear
  [-0.85, 0.85].forEach((x) => {
    const diag = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 10), blackMat);
    diag.position.set(x, 1.8, -1.0);
    diag.rotation.x = 0.55;
    jeep.add(diag);
  });

  // Interior Seats (Front dual bucket seats, rear bench)
  [-0.45, 0.45].forEach((x) => {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.5), blackMat);
    seat.position.set(x, 1.15, -0.1);
    jeep.add(seat);
  });

  // Steering wheel
  const steer = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 8, 16), blackMat);
  steer.rotation.x = 1.0;
  steer.position.set(-0.45, 1.5, 0.15);
  jeep.add(steer);

  // 4 Chunky 4x4 Tires
  const wheelPositions = [
    [-0.95, 0.5, 1.1],
    [0.95, 0.5, 1.1],
    [-0.95, 0.5, -1.1],
    [0.95, 0.5, -1.1],
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheel = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.35, 20), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheel.add(tire);

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.37, 14), chromeMat);
    rim.rotation.z = Math.PI / 2;
    wheel.add(rim);

    wheel.position.set(x, y, z);
    jeep.add(wheel);
  });

  // Rear Spare Wheel mounted on tailgate
  const spare = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.28, 18), tireMat);
  spare.rotation.x = Math.PI / 2;
  spare.position.set(0, 1.1, -1.65);
  jeep.add(spare);

  jeep.scale.set(1.0, 1.0, 1.0);
  return jeep;
}

// -------------------------------------------------------------
// 🚔 3B. VINTAGE HIGHWAY PATROL POLICE CRUISER BUILDER
// Authentic 1980s American / Highway Patrol style cruiser (Caprice 9C1 style):
// Gloss black & white livery with "HIGHWAY PATROL" 7-point star badge,
// "TO PROTECT AND SERVE" motto on front fenders, "EMERGENCY | 911 236",
// quad rectangular headlights, chrome push bumper with dual push guards,
// aerodynic twin red/blue lightbar with siren speaker, ribbed taillights,
// and police steel wheels with chrome dog-dish center caps.
// -------------------------------------------------------------
export function buildHighwayPatrolCruiser(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  const cruiser = new THREE.Group();

  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x0f0f10,
    roughness: 0.35,
    metalness: 0.45,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.3,
    metalness: 0.2,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.12,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
    metalness: 0.2,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    roughness: 0.9,
  });
  const amberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const headlampMat = new THREE.MeshBasicMaterial({ color: 0xfffde7 });
  const redTailMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
  const goldStarMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const blueBeaconMat = new THREE.MeshBasicMaterial({ color: 0x2563eb });
  const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  // 1. Lower Body (Black Hood & Front Fenders, White Doors, Black Rear Quarters & Trunk)
  // Main chassis base
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.45, 5.4), blackMat);
  chassis.position.y = 0.45;
  cruiser.add(chassis);

  // Black Front Hood & Engine Bay (Z: 1.2 to 2.6)
  const frontHood = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.58, 1.8), blackMat);
  frontHood.position.set(0, 0.88, 1.6);
  frontHood.castShadow = true;
  cruiser.add(frontHood);

  // White Passenger Doors Section (Z: -0.6 to 0.7)
  const doorsSection = new THREE.Mesh(new THREE.BoxGeometry(2.28, 0.58, 1.5), whiteMat);
  doorsSection.position.set(0, 0.88, -0.05);
  doorsSection.castShadow = true;
  cruiser.add(doorsSection);

  // Black Rear Quarter Panels & Trunk Lid (Z: -2.6 to -0.8)
  const rearTrunk = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.56, 1.65), blackMat);
  rearTrunk.position.set(0, 0.87, -1.62);
  rearTrunk.castShadow = true;
  cruiser.add(rearTrunk);

  // 2. White Roof & Glass Greenhouse
  const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.65, 2.3), whiteMat);
  cabinRoof.position.set(0, 1.48, -0.2);
  cabinRoof.castShadow = true;
  cruiser.add(cabinRoof);

  // Slanted Windshield (Front)
  const frontWindshield = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.62, 0.1), glassMat);
  frontWindshield.rotation.x = -0.42;
  frontWindshield.position.set(0, 1.42, 1.02);
  cruiser.add(frontWindshield);

  // Slanted Rear Window
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.58, 0.1), glassMat);
  rearWindow.rotation.x = 0.42;
  rearWindow.position.set(0, 1.42, -1.42);
  cruiser.add(rearWindow);

  // Side Windows (Left & Right)
  [-1.04, 1.04].forEach((x) => {
    const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.48, 1.8), glassMat);
    sideGlass.position.set(x, 1.44, -0.2);
    cruiser.add(sideGlass);
  });

  // 3. Highway Patrol Door Star Badges & Lettering Graphics
  [-1.16, 1.16].forEach((x) => {
    // 7-Point Gold Star Badge on Doors
    const star = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 7), goldStarMat);
    star.rotation.z = Math.PI / 2;
    star.position.set(x, 0.9, -0.05);
    cruiser.add(star);

    // Arched "HIGHWAY PATROL" black banner above badge
    const hpBanner = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.08, 0.55), blackMat);
    hpBanner.position.set(x * 1.005, 1.04, -0.05);
    cruiser.add(hpBanner);

    // "TO PROTECT AND SERVE" white motto on front black fender
    const motto = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.05, 0.42), whiteMat);
    motto.position.set(x * 1.01, 0.88, 1.4);
    cruiser.add(motto);

    // "EMERGENCY | 911" & "236" callsign on rear quarter
    const callsign = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.08, 0.38), whiteMat);
    callsign.position.set(x * 1.01, 0.88, -1.6);
    cruiser.add(callsign);
  });

  // Rear Trunk "236" & "HIGHWAY PATROL" Plate
  const trunkPlate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.02), whiteMat);
  trunkPlate.position.set(0, 0.94, -2.46);
  cruiser.add(trunkPlate);

  // 4. Front Fascia: Quad Rectangular Sealed-Beam Headlights & Chrome Grille
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.08), chromeMat);
  grille.position.set(0, 0.86, 2.52);
  cruiser.add(grille);

  // Chrome Stand-Up Hood Ornament
  const ornament = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.08), chromeMat);
  ornament.position.set(0, 1.22, 2.45);
  cruiser.add(ornament);

  // Quad Rectangular Headlights (2 on each side)
  [-0.92, -0.74, 0.74, 0.92].forEach((x) => {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.18, 0.04), headlampMat);
    lamp.position.set(x, 0.88, 2.53);
    cruiser.add(lamp);
  });

  // Amber Corner Wrap-Around Turn Signals
  [-1.08, 1.08].forEach((x) => {
    const amberSignal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.22), amberMat);
    amberSignal.position.set(x, 0.88, 2.44);
    cruiser.add(amberSignal);
  });

  // 5. Heavy Chrome Push Bumper with Dual Rubber Push Bars (Bullbar)
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.26, 0.22), chromeMat);
  frontBumper.position.set(0, 0.52, 2.58);
  cruiser.add(frontBumper);

  // Dual Vertical Black Rubber Push Guards
  [-0.45, 0.45].forEach((x) => {
    const pushGuard = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.16), blackMat);
    pushGuard.position.set(x, 0.65, 2.68);
    cruiser.add(pushGuard);
  });

  // Front Center License Plate
  const frontPlate = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.04), whiteMat);
  frontPlate.position.set(0, 0.52, 2.7);
  cruiser.add(frontPlate);

  // 6. Rear Heavy Chrome Bumper & Wide Ribbed Tail Lamps
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.26, 0.22), chromeMat);
  rearBumper.position.set(0, 0.52, -2.52);
  cruiser.add(rearBumper);

  // Wide Horizontal Ribbed Red Tail Lamps
  [-0.85, 0.85].forEach((x) => {
    const tailLamp = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.2, 0.06), redTailMat);
    tailLamp.position.set(x, 0.86, -2.48);
    cruiser.add(tailLamp);

    // Amber & Reverse lamp inner section
    const revLamp = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.07), whiteMat);
    revLamp.position.set(x > 0 ? x - 0.15 : x + 0.15, 0.86, -2.48);
    cruiser.add(revLamp);
  });

  // 7. Aerodynic Roof Lightbar (Red & Blue Twin Beacons w/ Center Siren Dome)
  const roofRack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.12), chromeMat);
  roofRack.position.set(0, 1.84, -0.15);
  cruiser.add(roofRack);

  // Center Siren Speaker Housing
  const sirenSpeaker = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 12), chromeMat);
  sirenSpeaker.rotation.x = Math.PI / 2;
  sirenSpeaker.position.set(0, 1.94, -0.15);
  cruiser.add(sirenSpeaker);

  // Red Aerodynic Light Pod (Right / Passenger side)
  const redBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.16, 0.26), redBeaconMat);
  redBeacon.position.set(-0.48, 1.94, -0.15);
  cruiser.add(redBeacon);

  // Blue Aerodynic Light Pod (Left / Driver side)
  const blueBeacon = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.16, 0.26), blueBeaconMat);
  blueBeacon.position.set(0.48, 1.94, -0.15);
  cruiser.add(blueBeacon);

  // Flashing Emergency Point Light
  const lightBeacon = new THREE.PointLight(0x3b82f6, 2.5, 24);
  lightBeacon.position.set(0, 2.2, -0.15);
  cruiser.add(lightBeacon);

  // Roof Whip Antenna
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.85, 4), chromeMat);
  antenna.position.set(-0.6, 2.2, -0.85);
  cruiser.add(antenna);

  // Chrome Side Mirrors
  [-1.15, 1.15].forEach((x) => {
    const mirror = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.16), chromeMat);
    mirror.position.set(x, 1.25, 0.72);
    cruiser.add(mirror);
  });

  // 8. Police Steel Wheels with Chrome Dog-Dish Hubcaps & Beauty Rings
  const wheelPositions = [
    [-1.18, 0.42, 1.5],
    [1.18, 0.42, 1.5],
    [-1.18, 0.42, -1.5],
    [1.18, 0.42, -1.5],
  ];

  wheelPositions.forEach(([x, y, z]) => {
    const wheel = new THREE.Group();

    // Black Rubber Police Tire
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 18), tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.castShadow = true;
    wheel.add(tire);

    // Black Steel Wheel Center
    const steelRim = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.33, 16), blackMat);
    steelRim.rotation.z = Math.PI / 2;
    wheel.add(steelRim);

    // Chrome Dog-Dish Center Hubcap
    const dogDishCap = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), chromeMat);
    dogDishCap.scale.set(0.4, 1, 1);
    dogDishCap.position.x = x > 0 ? 0.16 : -0.16;
    wheel.add(dogDishCap);

    // Chrome Beauty Trim Ring
    const beautyRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.02, 6, 20), chromeMat);
    beautyRing.rotation.y = Math.PI / 2;
    beautyRing.position.x = x > 0 ? 0.16 : -0.16;
    wheel.add(beautyRing);

    wheel.position.set(x, y, z);
    cruiser.add(wheel);
  });

  cruiser.scale.set(1.05, 1.05, 1.05);
  return { group: cruiser, lightBeacon };
}

// -------------------------------------------------------------
// 🚤 4. KERALA BACKWATER MOTORBOAT / CANOE BUILDER
// Traditional dark wood Kerala motorized country boat (വള്ളം)
// with narrow pointed bow & stern, wooden ribbed hull, cross benches,
// and small outboard engine with propeller.
// -------------------------------------------------------------
export function buildKeralaBoat(): THREE.Group {
  const boat = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723, // Deep oiled teak wood
    roughness: 0.6,
    metalness: 0.1,
  });
  const plankMat = new THREE.MeshStandardMaterial({
    color: 0x5d4037,
    roughness: 0.7,
  });
  const motorMat = new THREE.MeshStandardMaterial({
    color: 0x1e88e5, // Blue Yamaha-style outboard motor
    metalness: 0.5,
    roughness: 0.35,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    metalness: 0.9,
    roughness: 0.2,
  });

  // Hollow Hull Shape using scaled hull geometries
  const hullGeo = new THREE.CylinderGeometry(0.9, 0.4, 5.5, 16);
  const hull = new THREE.Mesh(hullGeo, woodMat);
  hull.rotation.x = Math.PI / 2;
  hull.scale.set(0.7, 1.0, 0.55);
  hull.position.y = 0.3;
  boat.add(hull);

  // Deck floor
  const floorGeo = new THREE.BoxGeometry(1.1, 0.08, 4.4);
  const floor = new THREE.Mesh(floorGeo, plankMat);
  floor.position.set(0, 0.35, 0);
  boat.add(floor);

  // Wooden Cross Benches (Thwarts)
  [-1.4, -0.6, 0.2, 1.0].forEach((z) => {
    const bench = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 0.32), plankMat);
    bench.position.set(0, 0.55, z);
    boat.add(bench);
  });

  // Outboard Motor at Stern
  const motorBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.6, 0.35), motorMat);
  motorBody.position.set(0, 0.75, -2.5);
  boat.add(motorBody);

  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 8), chromeMat);
  shaft.position.set(0, 0.15, -2.55);
  boat.add(shaft);

  // Propeller blades
  const propHub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 8), chromeMat);
  propHub.rotation.x = Math.PI / 2;
  propHub.position.set(0, -0.2, -2.55);
  boat.add(propHub);

  [-0.14, 0.14].forEach((x) => {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.08), chromeMat);
    blade.position.set(x, -0.2, -2.55);
    blade.rotation.z = 0.5;
    boat.add(blade);
  });

  // Steering Tiller arm
  const tiller = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8), chromeMat);
  tiller.rotation.x = 0.3;
  tiller.position.set(0, 0.9, -2.25);
  boat.add(tiller);

  boat.scale.set(1.0, 1.0, 1.0);
  return boat;
}

// -------------------------------------------------------------
// 🚑 5. AMERICAN TYPE III MODULAR BOX AMBULANCE BUILDER
// Exactly matches ambu.jpg reference:
// - Cutaway van cab with raked windshield, chrome grille, stacked lamps,
//   bumperettes, cab clearance lights, and mirrors.
// - Wide rectangular modular box patient body with over-cab bulkhead.
// - Vibrant continuous red stripe beltline wrapping entirely around vehicle.
// - Bold red "AMBULANCE" side lettering & mirrored "ƎƆИA⅃UᙠMA" on over-cab front.
// - Royal Blue "Star of Life" decals (rear sides, rear doors, over-cab front, and giant roof emblem).
// - Upper corner red emergency strobes, front & rear flasher clusters, side scene floodlights.
// - Dual split rear loading doors with observation windows & heavy diamond plate step bumper.
// - Dual rear wheels (duallies) on each side under flared wheel wells.
// -------------------------------------------------------------

function drawStarOfLife(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  starColor = '#0284c7'
) {
  ctx.save();
  ctx.translate(cx, cy);

  // 1. Royal Blue 6-Pointed Star (3 crossed notched bars)
  ctx.fillStyle = starColor;
  const barW = radius * 0.44;
  const barH = radius * 2.0;

  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);
    // Main rectangular bar
    ctx.fillRect(-barW / 2, -barH / 2, barW, barH);
    // Notched end serifs (classic Star of Life profile)
    ctx.fillRect(-barW * 0.6, -barH / 2, barW * 1.2, barH * 0.08);
    ctx.fillRect(-barW * 0.6, barH / 2 - barH * 0.08, barW * 1.2, barH * 0.08);
    ctx.restore();
  }

  // 2. White Rod of Asclepius (Staff with coiled serpent)
  ctx.fillStyle = '#ffffff';
  // Central staff
  ctx.fillRect(-radius * 0.08, -radius * 0.85, radius * 0.16, radius * 1.7);
  // Coiled serpent
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = radius * 0.11;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.65);
  ctx.bezierCurveTo(-radius * 0.35, -radius * 0.35, radius * 0.35, -radius * 0.1, 0, 0.05);
  ctx.bezierCurveTo(-radius * 0.35, 0.2, radius * 0.35, 0.45, 0, 0.68);
  ctx.stroke();

  ctx.restore();
}

// Side box texture generator (left or right)
function createSideAmbulanceTexture(isLeft: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // White base
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 512);

  // Bold Red Beltline Stripe (middle)
  const stripeY = 240;
  const stripeH = 80;
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, stripeY, 1024, stripeH);

  // Upper thin red pinstripe accent
  ctx.fillRect(0, stripeY - 14, 1024, 6);

  // "AMBULANCE" bold red capital text above the stripe
  ctx.fillStyle = '#dc2626';
  ctx.font = '900 64px "Arial Black", Arial, sans-serif';
  ctx.textBaseline = 'middle';

  // Position text and Star of Life
  // On left side: front is towards +Z (right in texture coords), rear is towards -Z (left in texture coords)
  // On right side: front is towards +Z (left in texture coords), rear is towards -Z (right in texture coords)
  const textX = isLeft ? 480 : 260;
  ctx.fillText('AMBULANCE', textX, stripeY - 55);

  // Large Royal Blue Star of Life on rear quarter panel
  const starX = isLeft ? 180 : 840;
  drawStarOfLife(ctx, starX, stripeY - 30, 95);

  // Exterior equipment locker seams & chrome handles below stripe
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#f1f5f9';

  const lockerPositions = isLeft ? [80, 360, 680] : [140, 460, 740];
  lockerPositions.forEach((lx) => {
    ctx.strokeRect(lx, stripeY + stripeH + 20, 220, 130);
    // Chrome paddle latch handle
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(lx + 85, stripeY + stripeH + 45, 50, 30);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(lx + 90, stripeY + stripeH + 50, 40, 20);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Front over-cab banner texture
function createFrontOverCabTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 128);

  // Mirrored reverse red "ƎƆИA⅃UᙠMA" for driver rear-view mirror readability
  ctx.fillStyle = '#dc2626';
  ctx.font = '900 48px "Arial Black", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ƎƆИA⅃UᙠMA', 256, 64);

  // Flanking Blue Stars of Life
  drawStarOfLife(ctx, 55, 64, 38);
  drawStarOfLife(ctx, 457, 64, 38);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Rear doors texture
function createRearDoorsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 512);

  // Red beltline stripe across rear
  ctx.fillStyle = '#dc2626';
  ctx.fillRect(0, 250, 512, 80);
  ctx.fillRect(0, 236, 512, 6);

  // Center vertical door split line
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(256, 0);
  ctx.lineTo(256, 512);
  ctx.stroke();

  // Dual Stars of Life on rear doors
  drawStarOfLife(ctx, 128, 380, 60);
  drawStarOfLife(ctx, 384, 380, 60);

  // Lower diamond reflective hazard chevrons or red badges
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(236, 310, 16, 40);
  ctx.fillRect(260, 310, 16, 40);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

// Roof texture with giant Star of Life and corrugated ribs
function createRoofTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 512, 1024);

  // Longitudinal roof ribs
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 6;
  for (let x = 40; x < 512; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 1004);
    ctx.stroke();
  }

  // Massive Royal Blue Star of Life on roof center (for helicopter / aerial identification)
  drawStarOfLife(ctx, 256, 512, 180);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export function buildAmericanBoxAmbulance(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  const amb = new THREE.Group();

  // Common Materials
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.1 });
  const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.35, metalness: 0.15 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.9, roughness: 0.15 });
  const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
  const blackRubberMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.85 });
  const tintedGlassMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.85, roughness: 0.15, transparent: true, opacity: 0.92 });
  const amberLightMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
  const redStrobeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const whiteStrobeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const yellowPlateMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  // Textures
  const sideLMat = new THREE.MeshBasicMaterial({ map: createSideAmbulanceTexture(true) });
  const sideRMat = new THREE.MeshBasicMaterial({ map: createSideAmbulanceTexture(false) });
  const frontOverCabMat = new THREE.MeshBasicMaterial({ map: createFrontOverCabTexture() });
  const rearDoorsMat = new THREE.MeshBasicMaterial({ map: createRearDoorsTexture() });
  const roofDecalMat = new THREE.MeshBasicMaterial({ map: createRoofTexture() });

  // =========================================================================
  // 1. FRONT CAB (Cutaway Van Cab: Ford E-350 / Chevy Express style)
  // =========================================================================
  const cabGroup = new THREE.Group();

  // Cab Main Shell
  const cabLower = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.72, 1.8), whiteMat);
  cabLower.position.set(0, 0.88, 1.6);
  cabLower.castShadow = true;
  cabGroup.add(cabLower);

  // Cab Red Beltline Stripe (aligned with box stripe)
  for (let sx of [-1.1, 1.1]) {
    const cabStripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, 1.76), redMat);
    cabStripe.position.set(sx, 0.98, 1.6);
    cabGroup.add(cabStripe);
  }

  // Sloping Engine Hood
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.54, 1.3), whiteMat);
  hood.position.set(0, 1.08, 2.7);
  hood.castShadow = true;
  cabGroup.add(hood);

  // Hood Side Red Stripe
  for (let hx of [-1.08, 1.08]) {
    const hoodStripe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 1.28), redMat);
    hoodStripe.position.set(hx, 0.96, 2.7);
    cabGroup.add(hoodStripe);
  }

  // Front Heavy Billet Chrome Grille
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.65, 0.12), darkMetalMat);
  grille.position.set(0, 0.96, 3.36);
  const grilleChrome = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.58, 0.14), chromeMat);
  grilleChrome.position.set(0, 0.96, 3.37);
  // Horizontal grille bars
  for (let gy of [-0.15, 0.0, 0.15]) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.06, 0.16), darkMetalMat);
    bar.position.set(0, 0.96 + gy, 3.38);
    cabGroup.add(bar);
  }
  cabGroup.add(grille, grilleChrome);

  // Stacked Rectangular Headlights with Chrome Bezels
  for (let lx of [-0.94, 0.94]) {
    // Chrome housing
    const bez = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.56, 0.12), chromeMat);
    bez.position.set(lx, 0.96, 3.36);
    // Upper Main Beam (White)
    const upperHead = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.14), whiteStrobeMat);
    upperHead.position.set(lx, 1.08, 3.37);
    // Lower Turn Signal (Amber)
    const lowerTurn = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.14), amberLightMat);
    lowerTurn.position.set(lx, 0.84, 3.37);
    cabGroup.add(bez, upperHead, lowerTurn);
  }

  // Heavy Duty Chrome Front Bumper with Dual Rubber Bumperettes
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.32, 0.38, 0.32), chromeMat);
  bumper.position.set(0, 0.54, 3.42);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.2, 0.04), yellowPlateMat);
  plate.position.set(0, 0.54, 3.59);
  cabGroup.add(bumper, plate);

  // Rubber bumper guards
  for (let bx of [-0.55, 0.55]) {
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.44, 0.38), blackRubberMat);
    guard.position.set(bx, 0.55, 3.44);
    cabGroup.add(guard);
  }

  // Raked Windshield & Cabin Roof
  const cabRoof = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.5, 1.4), whiteMat);
  cabRoof.position.set(0, 1.82, 1.45);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.82, 0.08), glassMat);
  windshield.rotation.x = -0.32;
  windshield.position.set(0, 1.58, 2.12);
  cabGroup.add(cabRoof, windshield);

  // Dual Black Wiper Blades
  for (let wx of [-0.45, 0.45]) {
    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.03), darkMetalMat);
    wiper.rotation.z = -0.25;
    wiper.position.set(wx, 1.35, 2.26);
    cabGroup.add(wiper);
  }

  // Cab Side Windows & Chrome Door Handles
  for (let wx of [-1.1, 1.1]) {
    const sideWin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.95), glassMat);
    sideWin.position.set(wx, 1.6, 1.45);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.18), chromeMat);
    handle.position.set(wx > 0 ? wx + 0.02 : wx - 0.02, 1.18, 1.05);
    cabGroup.add(sideWin, handle);
  }

  // 5 Amber Teardrop Clearance Lights on Front Cab Brow
  for (let cx of [-0.8, -0.4, 0.0, 0.4, 0.8]) {
    const clearLight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.14), amberLightMat);
    clearLight.position.set(cx, 2.08, 2.05);
    cabGroup.add(clearLight);
  }

  // Large Dual-Post Truck Side Mirrors
  for (let mx of [-1.16, 1.16]) {
    const mirrorStemTop = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), darkMetalMat);
    mirrorStemTop.rotation.z = mx > 0 ? Math.PI / 3 : -Math.PI / 3;
    mirrorStemTop.position.set(mx > 0 ? mx + 0.12 : mx - 0.12, 1.7, 1.95);
    const mirrorStemBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 8), darkMetalMat);
    mirrorStemBottom.rotation.z = mx > 0 ? Math.PI / 3 : -Math.PI / 3;
    mirrorStemBottom.position.set(mx > 0 ? mx + 0.12 : mx - 0.12, 1.42, 1.95);
    const mirrorHead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.46, 0.24), darkMetalMat);
    mirrorHead.position.set(mx > 0 ? mx + 0.26 : mx - 0.26, 1.56, 1.95);
    cabGroup.add(mirrorStemTop, mirrorStemBottom, mirrorHead);
  }

  amb.add(cabGroup);

  // =========================================================================
  // 2. MODULAR BOX BODY (American Cube Ambulance Patient Box)
  // Substantially wider (2.54m) & taller (2.3m) with over-cab front section!
  // =========================================================================
  const boxGroup = new THREE.Group();

  // Main Box Module Body
  const boxWidth = 2.54;
  const boxHeight = 2.22;
  const boxLength = 4.45;
  const boxCenterY = 1.62;
  const boxCenterZ = -0.85;

  const boxShell = new THREE.Mesh(new THREE.BoxGeometry(boxWidth, boxHeight, boxLength), whiteMat);
  boxShell.position.set(0, boxCenterY, boxCenterZ);
  boxShell.castShadow = true;
  boxGroup.add(boxShell);

  // Over-Cab Bulkhead / Brow (Extends forward over cab roof)
  const overCab = new THREE.Mesh(new THREE.BoxGeometry(boxWidth, 0.65, 0.9), whiteMat);
  overCab.position.set(0, 2.4, 1.6);
  boxGroup.add(overCab);

  // Front Over-Cab Mirrored "ƎƆИA⅃UᙠMA" Signboard & Stars of Life
  const frontBanner = new THREE.Mesh(new THREE.PlaneGeometry(boxWidth - 0.2, 0.55), frontOverCabMat);
  frontBanner.position.set(0, 2.4, 2.06);
  boxGroup.add(frontBanner);

  // Front Over-Cab Emergency Strobe Lights (Top Row: Red, Amber/Clear, Amber/Clear, Red)
  const frontStrobes: [number, THREE.Material][] = [
    [-1.05, redStrobeMat],
    [-0.38, whiteStrobeMat],
    [0.38, whiteStrobeMat],
    [1.05, redStrobeMat],
  ];
  frontStrobes.forEach(([fx, mat]) => {
    const fLight = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.1), mat);
    fLight.position.set(fx, 2.76, 2.06);
    boxGroup.add(fLight);
  });

  // Left Side Modular Decal Panel (Star of Life + AMBULANCE + Stripe + Locker Seams)
  const sidePanelL = new THREE.Mesh(new THREE.PlaneGeometry(boxLength - 0.05, boxHeight - 0.05), sideLMat);
  sidePanelL.rotation.y = -Math.PI / 2;
  sidePanelL.position.set(-boxWidth / 2 - 0.01, boxCenterY, boxCenterZ);
  boxGroup.add(sidePanelL);

  // Right Side Modular Decal Panel
  const sidePanelR = new THREE.Mesh(new THREE.PlaneGeometry(boxLength - 0.05, boxHeight - 0.05), sideRMat);
  sidePanelR.rotation.y = Math.PI / 2;
  sidePanelR.position.set(boxWidth / 2 + 0.01, boxCenterY, boxCenterZ);
  boxGroup.add(sidePanelR);

  // Tinted Patient Compartment Square Windows (Black Rubber Trim)
  for (let wx of [-boxWidth / 2 - 0.02, boxWidth / 2 + 0.02]) {
    const winTrim = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.65, 0.75), darkMetalMat);
    winTrim.position.set(wx, 1.88, -0.6);
    const winGlass = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.58, 0.68), tintedGlassMat);
    winGlass.position.set(wx, 1.88, -0.6);
    boxGroup.add(winTrim, winGlass);
  }

  // Modular Box Roof Panel with Giant Star of Life
  const roofDecal = new THREE.Mesh(new THREE.PlaneGeometry(boxWidth - 0.08, boxLength - 0.08), roofDecalMat);
  roofDecal.rotation.x = -Math.PI / 2;
  roofDecal.position.set(0, boxCenterY + boxHeight / 2 + 0.01, boxCenterZ);
  boxGroup.add(roofDecal);

  // Roof Corner Perimeter Emergency Flashers (Red Lenses)
  const cornerStrobeCoords: [number, number][] = [
    [-boxWidth / 2 + 0.16, boxCenterZ + boxLength / 2 - 0.16],
    [boxWidth / 2 - 0.16, boxCenterZ + boxLength / 2 - 0.16],
    [-boxWidth / 2 + 0.16, boxCenterZ - boxLength / 2 + 0.16],
    [boxWidth / 2 - 0.16, boxCenterZ - boxLength / 2 + 0.16],
  ];
  cornerStrobeCoords.forEach(([cx, cz]) => {
    const cPod = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.32), redStrobeMat);
    cPod.position.set(cx, boxCenterY + boxHeight / 2 + 0.1, cz);
    boxGroup.add(cPod);
  });

  // Upper Side Scene / Flood Lights (White Rectangular Pods)
  for (let sx of [-boxWidth / 2 - 0.04, boxWidth / 2 + 0.04]) {
    for (let sz of [-1.8, 0.2]) {
      const flood = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.18, 0.44), whiteStrobeMat);
      flood.position.set(sx, 2.52, sz);
      boxGroup.add(flood);
    }
  }

  // Black Rubber Wheel Well Fender Flares on Rear
  for (let fx of [-boxWidth / 2 - 0.03, boxWidth / 2 + 0.03]) {
    const flare = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.08, 16, 1, false, 0, Math.PI), blackRubberMat);
    flare.rotation.z = Math.PI / 2;
    flare.rotation.x = -Math.PI / 2;
    flare.position.set(fx, 0.72, -1.25);
    boxGroup.add(flare);
  }

  // =========================================================================
  // 3. REAR DOORS & HEAVY DIAMOND PLATE STEP BUMPER
  // =========================================================================
  const rearZ = boxCenterZ - boxLength / 2;

  // Rear Doors Decal Face (Split doors, Stars of Life, Stripe)
  const rearDoorPlane = new THREE.Mesh(new THREE.PlaneGeometry(boxWidth - 0.1, boxHeight - 0.2), rearDoorsMat);
  rearDoorPlane.rotation.y = Math.PI;
  rearDoorPlane.position.set(0, boxCenterY, rearZ - 0.01);
  boxGroup.add(rearDoorPlane);

  // Dual Rear Observation Windows (with thick dark frames)
  for (let dx of [-0.62, 0.62]) {
    const rWinFrame = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.72, 0.06), darkMetalMat);
    rWinFrame.position.set(dx, 1.95, rearZ - 0.02);
    const rWinGlass = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.62, 0.07), tintedGlassMat);
    rWinGlass.position.set(dx, 1.95, rearZ - 0.02);
    const rHandle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.08), chromeMat);
    rHandle.position.set(dx > 0 ? dx - 0.38 : dx + 0.38, 1.25, rearZ - 0.04);
    boxGroup.add(rWinFrame, rWinGlass, rHandle);
  }

  // Top Rear Emergency Light Bar (5 Pods: Red, Amber, White, Amber, Red)
  const rearTopStrobes: [number, THREE.Material][] = [
    [-1.05, redStrobeMat],
    [-0.52, amberLightMat],
    [0.0, whiteStrobeMat],
    [0.52, amberLightMat],
    [1.05, redStrobeMat],
  ];
  rearTopStrobes.forEach(([rx, mat]) => {
    const rPod = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.1), mat);
    rPod.position.set(rx, boxCenterY + boxHeight / 2 - 0.12, rearZ - 0.05);
    boxGroup.add(rPod);
  });

  // Vertical 3-Tier Rear Tail Light Clusters (Brake, Turn, Backup)
  for (let tx of [-1.15, 1.15]) {
    const tailHousing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.72, 0.08), chromeMat);
    tailHousing.position.set(tx, 1.15, rearZ - 0.04);
    const tRed = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.09), redStrobeMat);
    tRed.position.set(tx, 1.35, rearZ - 0.04);
    const tAmber = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.09), amberLightMat);
    tAmber.position.set(tx, 1.15, rearZ - 0.04);
    const tWhite = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.2, 0.09), whiteStrobeMat);
    tWhite.position.set(tx, 0.95, rearZ - 0.04);
    boxGroup.add(tailHousing, tRed, tAmber, tWhite);
  }

  // Heavy Duty Diamond Plate Aluminum Step Bumper with Recessed Center Step
  const stepBumperOuter = new THREE.Mesh(new THREE.BoxGeometry(boxWidth + 0.04, 0.32, 0.44), chromeMat);
  stepBumperOuter.position.set(0, 0.46, rearZ - 0.24);
  // Recessed center footstep tread
  const stepRecess = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.12, 0.46), darkMetalMat);
  stepRecess.position.set(0, 0.54, rearZ - 0.25);
  // Rubber loading dock bumpers on edges
  for (let bx of [-1.18, 1.18]) {
    const dockBumper = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.36, 0.12), blackRubberMat);
    dockBumper.position.set(bx, 0.46, rearZ - 0.48);
    boxGroup.add(dockBumper);
  }
  // Rear License Plate
  const rearPlate = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.2, 0.04), yellowPlateMat);
  rearPlate.position.set(-0.55, 0.46, rearZ - 0.48);
  boxGroup.add(stepBumperOuter, stepRecess, rearPlate);

  amb.add(boxGroup);

  // =========================================================================
  // 4. WHEELS (Single Fronts + True DUAL REAR WHEELS "Duallies")
  // =========================================================================
  const tireGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.32, 16);
  tireGeo.rotateZ(Math.PI / 2);
  const deepDishRimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.34, 12);
  deepDishRimGeo.rotateZ(Math.PI / 2);

  // Front Single Wheels
  for (let fx of [-1.05, 1.05]) {
    const fTire = new THREE.Mesh(tireGeo, blackRubberMat);
    fTire.position.set(fx, 0.46, 2.15);
    const fRim = new THREE.Mesh(deepDishRimGeo, chromeMat);
    fRim.position.set(fx, 0.46, 2.15);
    amb.add(fTire, fRim);
  }

  // Rear DUAL WHEELS ("Duallies" - pair on each side)
  const rearDualCoords: number[][] = [
    [-1.22, -0.92], // Left Duals (outer, inner)
    [0.92, 1.22],   // Right Duals (inner, outer)
  ];
  rearDualCoords.forEach((pair) => {
    pair.forEach((rx) => {
      const rTire = new THREE.Mesh(tireGeo, blackRubberMat);
      rTire.position.set(rx, 0.46, -1.25);
      const rRim = new THREE.Mesh(deepDishRimGeo, chromeMat);
      rRim.position.set(rx, 0.46, -1.25);
      amb.add(rTire, rRim);
    });
  });

  // Emergency Beacon Light (PointLight for flashing reflection)
  const lightBeacon = new THREE.PointLight(0xef4444, 3.0, 22);
  lightBeacon.position.set(0, 2.85, 0.5);
  amb.add(lightBeacon);

  amb.scale.set(1.0, 1.0, 1.0);
  return { group: amb, lightBeacon };
}

// =============================================================================
// 6. WIDEBODY FORD MUSTANG GT (S550 FASTBACK COUPE • NARDO GREY - musthu.jpg)
// =============================================================================

function createMustangGrilleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Deep black grille background
  ctx.fillStyle = '#080a0d';
  ctx.fillRect(0, 0, 512, 128);

  // Honeycomb mesh pattern
  ctx.strokeStyle = '#232931';
  ctx.lineWidth = 1.5;
  const hexRadius = 9;
  for (let y = 0; y < 128; y += hexRadius * 1.5) {
    for (let x = 0; x < 512; x += hexRadius * Math.sqrt(3)) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + hexRadius * Math.cos(angle);
        const hy = y + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Dual Integrated Round Rally / Fog Lamps
  const drawRallyLamp = (cx: number) => {
    ctx.fillStyle = '#1e242c';
    ctx.beginPath();
    ctx.arc(cx, 64, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Crystal lens gradient
    const grad = ctx.createRadialGradient(cx, 64, 2, cx, 64, 26);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.4, '#e2e8f0');
    grad.addColorStop(1, '#475569');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, 64, 26, 0, Math.PI * 2);
    ctx.fill();
  };
  drawRallyLamp(135);
  drawRallyLamp(377);

  // Chrome Galloping Pony in Center
  ctx.save();
  ctx.translate(256, 64);
  ctx.fillStyle = '#f1f5f9';
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.moveTo(18, -10);
  ctx.lineTo(26, -14);
  ctx.lineTo(22, -6);
  ctx.lineTo(16, 2);
  ctx.lineTo(24, 18);
  ctx.lineTo(16, 12);
  ctx.lineTo(8, 4);
  ctx.lineTo(-8, 14);
  ctx.lineTo(-18, 20);
  ctx.lineTo(-12, 10);
  ctx.lineTo(-24, 6);
  ctx.lineTo(-28, -6);
  ctx.lineTo(-16, -12);
  ctx.lineTo(-6, -6);
  ctx.lineTo(4, -8);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createMustangRearDecklidTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // Gloss black decklid panel
  ctx.fillStyle = '#0a0c10';
  ctx.fillRect(0, 0, 512, 128);

  // GT Chrome Typography
  ctx.fillStyle = '#f8fafc';
  ctx.font = '900 66px "Arial Black", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#94a3b8';
  ctx.shadowBlur = 6;
  ctx.fillText('GT', 256, 62);

  // Red accent line under GT
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(170, 102);
  ctx.lineTo(342, 102);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function buildWidebodyMustangGT(): THREE.Group {
  const mustang = new THREE.Group();

  // Premium Automotive Materials
  // Nardo Grey / Battleship Grey Gloss Paint (musthu.jpg)
  const nardoGreyMat = new THREE.MeshStandardMaterial({
    color: 0x8f959d,
    roughness: 0.32,
    metalness: 0.18,
  });

  // Gloss Black Aero Parts (Front Splitter, Louvers, Ducktail Spoiler, Diffuser)
  const glossBlackMat = new THREE.MeshStandardMaterial({
    color: 0x0c0e12,
    roughness: 0.22,
    metalness: 0.65,
  });

  // Dark Tinted Glass
  const darkGlassMat = new THREE.MeshStandardMaterial({
    color: 0x090b0e,
    roughness: 0.12,
    metalness: 0.88,
    transparent: true,
    opacity: 0.88,
  });

  // Chrome & Polished Metal
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.15,
    metalness: 0.95,
  });

  // Gunmetal Metallic (Wheel Spokes)
  const gunmetalMat = new THREE.MeshStandardMaterial({
    color: 0x272b33,
    roughness: 0.35,
    metalness: 0.85,
  });

  // High Performance Black Rubber
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x14161a });

  // Brembo Brake Caliper Red
  const caliperRedMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.25,
    metalness: 0.4,
  });

  // Tri-bar LED Tail Lights
  const redLedMat = new THREE.MeshBasicMaterial({ color: 0xff1e1e });
  // Headlight LED DRLs
  const whiteLedMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const amberMarkerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

  // =========================================================================
  // 1. LOWER BODY & SCULPTED SPORTS FUSELAGE
  // =========================================================================
  // Main lower tub
  const lowerTub = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.48, 4.65), nardoGreyMat);
  lowerTub.position.set(0, 0.42, 0);
  lowerTub.castShadow = true;
  mustang.add(lowerTub);

  // Sculpted Door Waist & Side Crease Insets
  for (let sx of [-1.02, 1.02]) {
    const doorCrease = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 2.1), nardoGreyMat);
    doorCrease.position.set(sx, 0.48, -0.05);
    // Flush door handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.05, 0.22), glossBlackMat);
    handle.position.set(sx + (sx > 0 ? 0.02 : -0.02), 0.58, -0.2);
    mustang.add(doorCrease, handle);
  }

  // Aerodynamic Rocker Side Skirts (gloss black splitters below doors)
  for (let sx of [-1.05, 1.05]) {
    const sideSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 2.45), glossBlackMat);
    sideSkirt.position.set(sx, 0.18, -0.05);
    // Rear winglet on side skirt
    const skirtFin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.16), glossBlackMat);
    skirtFin.position.set(sx, 0.24, -1.25);
    mustang.add(sideSkirt, skirtFin);
  }

  // =========================================================================
  // 2. MUSCULAR POWER-BULGE HOOD & FRONT NOSE
  // =========================================================================
  // Main hood sloping forward
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.24, 1.62), nardoGreyMat);
  hood.position.set(0, 0.68, 1.45);
  hood.rotation.x = 0.05;
  hood.castShadow = true;
  mustang.add(hood);

  // Center Power Bulge Cowl
  const cowlBulge = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.05, 1.4), nardoGreyMat);
  cowlBulge.position.set(0, 0.73, 1.45);
  cowlBulge.rotation.x = 0.05;
  mustang.add(cowlBulge);

  // Dual Black Heat Extractor Air Vents (as seen in top view of musthu.jpg)
  for (let vx of [-0.46, 0.46]) {
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.03, 0.42), glossBlackMat);
    vent.position.set(vx, 0.74, 1.48);
    vent.rotation.x = 0.05;
    vent.rotation.y = (vx > 0 ? -0.1 : 0.1);
    mustang.add(vent);
  }

  // Front Nose / Grille Surround
  const noseCone = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.38, 0.38), nardoGreyMat);
  noseCone.position.set(0, 0.58, 2.3);
  mustang.add(noseCone);

  // Hexagonal Mustang GT Grille with Running Pony & Rally Lamps
  const grilleMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.32, 0.04),
    new THREE.MeshBasicMaterial({ map: createMustangGrilleTexture() })
  );
  grilleMesh.position.set(0, 0.58, 2.5);
  mustang.add(grilleMesh);

  // Front Aggressive Bumper & Lower Air Dam
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.28, 0.24), nardoGreyMat);
  frontBumper.position.set(0, 0.32, 2.35);
  const lowerAirDam = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.16, 0.08), glossBlackMat);
  lowerAirDam.position.set(0, 0.24, 2.48);
  mustang.add(frontBumper, lowerAirDam);

  // Lower Fog Light & Brake Duct Pockets
  for (let fx of [-0.78, 0.78]) {
    const fogPocket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.08), glossBlackMat);
    fogPocket.position.set(fx, 0.26, 2.46);
    const fogLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.04, 8), whiteLedMat);
    fogLamp.rotateX(Math.PI / 2);
    fogLamp.position.set(fx, 0.26, 2.49);
    // Aerodynamic Bumper Canard
    const canard = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.02, 0.16), glossBlackMat);
    canard.position.set(fx * 1.18, 0.34, 2.36);
    canard.rotation.z = (fx > 0 ? -0.25 : 0.25);
    mustang.add(fogPocket, fogLamp, canard);
  }

  // Low Front Chin Splitter with Support Struts (gloss black)
  const frontSplitter = new THREE.Mesh(new THREE.BoxGeometry(2.14, 0.04, 0.35), glossBlackMat);
  frontSplitter.position.set(0, 0.12, 2.45);
  // Splitter endplates
  for (let sx of [-1.07, 1.07]) {
    const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.32), glossBlackMat);
    endplate.position.set(sx, 0.16, 2.44);
    mustang.add(endplate);
  }
  // Splitter support struts
  for (let tx of [-0.42, 0.42]) {
    const strut = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6), chromeMat);
    strut.position.set(tx, 0.2, 2.54);
    strut.rotation.x = -0.3;
    mustang.add(strut);
  }
  mustang.add(frontSplitter);

  // Tri-Bar Angular LED Headlights
  for (let hx of [-0.82, 0.82]) {
    const hlHousing = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.15, 0.12), glossBlackMat);
    hlHousing.position.set(hx, 0.62, 2.42);
    hlHousing.rotation.y = (hx > 0 ? -0.15 : 0.15);

    // Main Projector Beam
    const projector = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 10), whiteLedMat);
    projector.rotateX(Math.PI / 2);
    projector.position.set(hx > 0 ? 0.06 : -0.06, 0, 0.04);
    hlHousing.add(projector);

    // 3 Slanted White LED Gills (Mustang Signature DRLs)
    for (let g = 0; g < 3; g++) {
      const gill = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.09, 0.02), whiteLedMat);
      const gx = (hx > 0 ? -0.04 - g * 0.035 : 0.04 + g * 0.035);
      gill.position.set(gx, 0, 0.05);
      gill.rotation.z = (hx > 0 ? 0.2 : -0.2);
      hlHousing.add(gill);
    }

    // Amber Corner Reflector
    const amberMarker = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.07, 0.02), amberMarkerMat);
    amberMarker.position.set(hx > 0 ? 0.11 : -0.11, 0, 0.03);
    hlHousing.add(amberMarker);

    mustang.add(hlHousing);
  }

  // =========================================================================
  // 3. FASTBACK COCKPIT & GREENHOUSE (With Rear Window Louvers!)
  // =========================================================================
  // Roof Shell (Double-bubble roof contours)
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.1, 1.7), nardoGreyMat);
  roof.position.set(0, 1.24, -0.15);
  roof.castShadow = true;
  mustang.add(roof);

  // Raked Windshield
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.54, 0.55, 0.8), darkGlassMat);
  windshield.position.set(0, 0.98, 0.72);
  windshield.rotation.x = -0.68;
  mustang.add(windshield);

  // Frameless Side Windows & B-Pillars
  for (let wx of [-0.8, 0.8]) {
    const sideGlass = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.36, 1.3), darkGlassMat);
    sideGlass.position.set(wx, 0.96, -0.05);
    // B-Pillar & Quarter blackout trim
    const quarterTrim = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.32, 0.45), glossBlackMat);
    quarterTrim.position.set(wx, 0.96, -0.65);
    mustang.add(sideGlass, quarterTrim);
  }

  // Sloping Fastback Rear Glass
  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.58, 1.15), darkGlassMat);
  rearGlass.position.set(0, 0.96, -1.02);
  rearGlass.rotation.x = 0.58;
  mustang.add(rearGlass);

  // REAR WINDOW LOUVERS (Iconic Black Sunshade Slats from musthu.jpg!)
  for (let l = 0; l < 6; l++) {
    const louverWidth = 1.38 - l * 0.06;
    const louver = new THREE.Mesh(new THREE.BoxGeometry(louverWidth, 0.02, 0.12), glossBlackMat);
    const lz = -0.62 - l * 0.15;
    const ly = 1.20 - l * 0.082;
    louver.position.set(0, ly, lz);
    louver.rotation.x = 0.25;
    mustang.add(louver);
  }

  // Aerodynamic Wing Mirrors
  for (let mx of [-0.94, 0.94]) {
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.08, 6), glossBlackMat);
    stem.position.set(mx, 0.82, 0.65);
    stem.rotation.z = (mx > 0 ? 0.3 : -0.3);
    const mHousing = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.12), nardoGreyMat);
    mHousing.position.set(mx * 1.08, 0.86, 0.64);
    const mMirror = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.08), chromeMat);
    mMirror.position.set(mx * 1.08, 0.86, 0.57);
    mustang.add(stem, mHousing, mMirror);
  }

  // Racing Fuel Filler Cap (on left rear quarter panel)
  const fuelCap = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.02, 16), glossBlackMat);
  fuelCap.rotateZ(Math.PI / 2);
  fuelCap.position.set(-1.03, 0.72, -1.15);
  mustang.add(fuelCap);

  // =========================================================================
  // 4. BOLTED WIDEBODY FENDER FLARES (Liberty Walk / Rocket Bunny Style!)
  // =========================================================================
  // FRONT BOLTED WIDEBODY FLARES (Over front wheels at Z = +1.42)
  for (let fx of [-1.06, 1.06]) {
    const flareGroup = new THREE.Group();

    // Flared Arch
    const flareArch = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.52, 0.18, 16, 1, false, 0, Math.PI), nardoGreyMat);
    flareArch.rotateZ(Math.PI / 2);
    flareArch.position.set(0, 0, 0);

    // Front flare skirt extension
    const flareSkirt = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.4), nardoGreyMat);
    flareSkirt.position.set(0, -0.16, 0.45);

    // Visible Rivet / Bolt Studs along the top seam
    for (let r = 0; r < 7; r++) {
      const angle = (Math.PI / 8) * (r + 1);
      const bx = (fx > 0 ? 0.08 : -0.08);
      const by = Math.sin(angle) * 0.49;
      const bz = Math.cos(angle) * 0.49;
      const rivet = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 6), chromeMat);
      rivet.rotateZ(Math.PI / 2);
      rivet.position.set(bx, by, bz);
      flareGroup.add(rivet);
    }

    flareGroup.add(flareArch, flareSkirt);
    flareGroup.position.set(fx, 0.38, 1.42);
    mustang.add(flareGroup);
  }

  // REAR BOLTED WIDEBODY FLARES (Over rear wheels at Z = -1.42, even wider hips!)
  for (let rx of [-1.12, 1.12]) {
    const flareGroup = new THREE.Group();

    // Muscular Rear Flared Arch
    const flareArch = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.56, 0.22, 16, 1, false, 0, Math.PI), nardoGreyMat);
    flareArch.rotateZ(Math.PI / 2);
    flareArch.position.set(0, 0, 0);

    // Rear air cutaway vent with vertical aero fin
    const ventFin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.22), glossBlackMat);
    ventFin.position.set(0, -0.12, -0.48);

    // Rivet studs along the widebody seam
    for (let r = 0; r < 8; r++) {
      const angle = (Math.PI / 9) * (r + 1);
      const bx = (rx > 0 ? 0.1 : -0.1);
      const by = Math.sin(angle) * 0.54;
      const bz = Math.cos(angle) * 0.54;
      const rivet = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.03, 6), chromeMat);
      rivet.rotateZ(Math.PI / 2);
      rivet.position.set(bx, by, bz);
      flareGroup.add(rivet);
    }

    flareGroup.add(flareArch, ventFin);
    flareGroup.position.set(rx, 0.39, -1.42);
    mustang.add(flareGroup);
  }

  // =========================================================================
  // 5. REAR DECKLID, DUCKTAIL SPOILER & TRI-BAR TAILLIGHTS
  // =========================================================================
  // Rear Decklid Trunk
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.28, 0.72), nardoGreyMat);
  trunk.position.set(0, 0.72, -1.82);
  mustang.add(trunk);

  // HIGH-KICK DUCKTAIL REAR SPOILER (from musthu.jpg side & rear views!)
  const ducktailCenter = new THREE.Mesh(new THREE.BoxGeometry(1.66, 0.16, 0.14), glossBlackMat);
  ducktailCenter.position.set(0, 0.90, -2.18);
  ducktailCenter.rotation.x = -0.42; // Upward kick
  // Ducktail aerodynamic side winglets
  for (let wx of [-0.86, 0.86]) {
    const winglet = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.20, 0.24), glossBlackMat);
    winglet.position.set(wx, 0.88, -2.14);
    winglet.rotation.y = (wx > 0 ? -0.15 : 0.15);
    mustang.add(winglet);
  }
  mustang.add(ducktailCenter);

  // Black Center Decklid Panel ("GT" Emblem)
  const decklidPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.26, 0.03),
    new THREE.MeshBasicMaterial({ map: createMustangRearDecklidTexture() })
  );
  decklidPanel.position.set(0, 0.62, -2.26);
  mustang.add(decklidPanel);

  // ICONIC MUSTANG TRI-BAR VERTICAL TAILLIGHTS (3 Red LED Bars on Each Side!)
  for (let tx of [-0.74, 0.74]) {
    const tailCluster = new THREE.Group();
    // 3 Vertical Red Bars
    for (let b = 0; b < 3; b++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.20, 0.06), redLedMat);
      const bx = (tx > 0 ? -0.065 + b * 0.065 : 0.065 - b * 0.065);
      bar.position.set(bx, 0, 0);
      bar.rotation.y = (tx > 0 ? 0.08 : -0.08);
      tailCluster.add(bar);
    }
    tailCluster.position.set(tx, 0.62, -2.24);
    mustang.add(tailCluster);
  }

  // Rear Lower Bumper & Aggressive Diffuser
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.32, 0.35), nardoGreyMat);
  rearBumper.position.set(0, 0.42, -2.14);
  mustang.add(rearBumper);

  // Gloss Black Rear Aerodynamic Diffuser with 4 Vertical Strakes
  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.58, 0.24, 0.28), glossBlackMat);
  diffuser.position.set(0, 0.22, -2.28);
  for (let s = -3; s <= 3; s += 2) {
    const strake = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.14, 0.28), glossBlackMat);
    strake.position.set(s * 0.16, 0.16, -2.28);
    mustang.add(strake);
  }
  mustang.add(diffuser);

  // Central F1-Style Reverse / Rain Lamp
  const f1Lamp = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.04), whiteLedMat);
  f1Lamp.position.set(0, 0.16, -2.43);
  mustang.add(f1Lamp);

  // QUAD CHROME EXHAUST TIPS (Dual Twin-Pipes on each side!)
  const exhaustGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.22, 12, 1, true);
  exhaustGeo.rotateX(Math.PI / 2);
  const exhaustInnerGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.23, 10);
  exhaustInnerGeo.rotateX(Math.PI / 2);

  for (let side of [-1, 1]) {
    for (let pipe of [-0.06, 0.06]) {
      const px = side * 0.62 + pipe;
      const tip = new THREE.Mesh(exhaustGeo, chromeMat);
      tip.position.set(px, 0.20, -2.36);
      const inner = new THREE.Mesh(exhaustInnerGeo, glossBlackMat);
      inner.position.set(px, 0.20, -2.36);
      mustang.add(tip, inner);
    }
  }

  // =========================================================================
  // 6. STANCED 5-SPOKE DEEP DISH ALLOY WHEELS & PERFORMANCE TIRES
  // =========================================================================
  // Wheel geometry helpers
  const frontTireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 20);
  frontTireGeo.rotateZ(Math.PI / 2);
  const rearTireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.34, 20);
  rearTireGeo.rotateZ(Math.PI / 2);

  // Stepped Chrome Outer Deep Dish Lip
  const frontLipGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.29, 20, 1, true);
  frontLipGeo.rotateZ(Math.PI / 2);
  const rearLipGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.35, 20, 1, true);
  rearLipGeo.rotateZ(Math.PI / 2);

  // 5-Spoke Star Rim Builder
  function create5SpokeStarRim(radius: number, isRear: boolean): THREE.Group {
    const rim = new THREE.Group();

    // Center Hub with Red Cap
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), gunmetalMat);
    hub.rotateZ(Math.PI / 2);
    const redCap = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.13, 10), caliperRedMat);
    redCap.rotateZ(Math.PI / 2);
    rim.add(hub, redCap);

    // 5 Slender Star Spokes
    for (let s = 0; s < 5; s++) {
      const angle = (Math.PI * 2 / 5) * s;
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.035, radius * 0.95), gunmetalMat);
      spoke.position.set(0, Math.sin(angle) * (radius * 0.5), Math.cos(angle) * (radius * 0.5));
      spoke.rotation.x = -angle;
      rim.add(spoke);
    }

    // Steel Cross-Drilled Brake Rotor
    const rotor = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.78, radius * 0.78, 0.02, 16), chromeMat);
    rotor.rotateZ(Math.PI / 2);
    rotor.position.x = (isRear ? -0.06 : -0.05);

    // Red Brembo Brake Caliper
    const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.14, 0.08), caliperRedMat);
    caliper.position.set(isRear ? -0.06 : -0.05, radius * 0.45, 0);

    rim.add(rotor, caliper);
    return rim;
  }

  // Front Wheels (Z = +1.42, X = ±1.06)
  for (let fx of [-1.06, 1.06]) {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(frontTireGeo, tireMat);
    tire.castShadow = true;
    const lip = new THREE.Mesh(frontLipGeo, chromeMat);
    const starRim = create5SpokeStarRim(0.26, false);
    if (fx < 0) {
      starRim.rotation.y = Math.PI;
    }

    wheelGroup.add(tire, lip, starRim);
    wheelGroup.position.set(fx, 0.35, 1.42);
    // Slight negative camber for stanced track look
    wheelGroup.rotation.z = (fx > 0 ? -0.03 : 0.03);
    mustang.add(wheelGroup);
  }

  // Rear Wheels (Z = -1.42, X = ±1.12 - wider tires with deeper dish lip!)
  for (let rx of [-1.12, 1.12]) {
    const wheelGroup = new THREE.Group();
    const tire = new THREE.Mesh(rearTireGeo, tireMat);
    tire.castShadow = true;
    const lip = new THREE.Mesh(rearLipGeo, chromeMat);
    const starRim = create5SpokeStarRim(0.27, true);
    if (rx < 0) {
      starRim.rotation.y = Math.PI;
    }

    wheelGroup.add(tire, lip, starRim);
    wheelGroup.position.set(rx, 0.36, -1.42);
    // Stanced negative camber
    wheelGroup.rotation.z = (rx > 0 ? -0.04 : 0.04);
    mustang.add(wheelGroup);
  }

  mustang.scale.set(1.0, 1.0, 1.0);
  return mustang;
}

export const buildWidebodyMustangCar = buildWidebodyMustangGT;
