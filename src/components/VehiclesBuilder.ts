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
// 🏍️ 3. KERALA CLASSIC BULLET MOTORCYCLE BUILDER
// Iconic Royal Enfield style thumping single-cylinder cruiser
// with teardrop fuel tank, round headlight, wide chrome handlebars,
// dual spring rider saddle, chrome engine and exhaust pipe.
// -------------------------------------------------------------
export function buildKeralaBullet(): THREE.Group {
  const bike = new THREE.Group();

  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.5,
    roughness: 0.3,
  });
  const maroonMat = new THREE.MeshStandardMaterial({
    color: 0x5a1820, // Classic Kerala Forest/Maroon Bullet tank
    metalness: 0.6,
    roughness: 0.25,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    metalness: 0.95,
    roughness: 0.1,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.85,
  });
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfffae0 });

  // Main tubular frame
  const frame = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 8), blackMat);
  frame.rotation.z = Math.PI / 2;
  frame.position.set(0, 0.65, 0);
  bike.add(frame);

  // Teardrop Fuel Tank with golden pinstripe effect
  const tank = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), maroonMat);
  tank.scale.set(0.7, 0.7, 1.5);
  tank.position.set(0, 0.92, 0.25);
  tank.castShadow = true;
  bike.add(tank);

  // Engine Block (Finned air-cooled cylinder & chrome crankcase)
  const crankcase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.35, 14), chromeMat);
  crankcase.rotation.z = Math.PI / 2;
  crankcase.position.set(0, 0.48, 0);
  bike.add(crankcase);

  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.35, 10), blackMat);
  cylinder.position.set(0, 0.7, 0.05);
  cylinder.rotation.x = -0.15;
  bike.add(cylinder);

  // Chrome Exhaust Pipe running to rear
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 10), chromeMat);
  exhaust.rotation.x = Math.PI / 2;
  exhaust.position.set(0.22, 0.35, -0.4);
  bike.add(exhaust);

  const silencerTip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.5, 10), chromeMat);
  silencerTip.rotation.x = Math.PI / 2;
  silencerTip.position.set(0.22, 0.38, -1.0);
  bike.add(silencerTip);

  // Rider Spring Saddle & Pillion Seat
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 0.45), blackMat);
  seat.position.set(0, 0.85, -0.25);
  bike.add(seat);

  const pillion = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.4), blackMat);
  pillion.position.set(0, 0.87, -0.65);
  bike.add(pillion);

  // Chrome Handlebars & Round Mirrors
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 8), chromeMat);
  bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 1.15, 0.65);
  bike.add(bar);

  // Round Chrome Headlamp
  const headlamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), chromeMat);
  headlamp.scale.set(1, 1, 0.8);
  headlamp.position.set(0, 1.05, 0.88);
  bike.add(headlamp);

  const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.14, 16), lightMat);
  bulb.position.set(0, 1.05, 0.98);
  bike.add(bulb);

  // Front & Rear Spoke Wheels
  [
    { z: 0.95, y: 0.48 },
    { z: -0.85, y: 0.48 },
  ].forEach((pos) => {
    const wheel = new THREE.Group();
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.07, 12, 24), tireMat);
    tire.castShadow = true;
    wheel.add(tire);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.12, 12), chromeMat);
    hub.rotation.x = Math.PI / 2;
    wheel.add(hub);

    // Spokes
    for (let s = 0; s < 8; s++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.72, 4), chromeMat);
      spoke.rotation.z = (s / 8) * Math.PI;
      wheel.add(spoke);
    }

    wheel.position.set(0, pos.y, pos.z);
    bike.add(wheel);
  });

  bike.scale.set(1.1, 1.1, 1.1);
  return bike;
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
