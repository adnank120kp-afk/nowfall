import * as THREE from 'three';

export interface TrafficEntity {
  mesh: THREE.Group;
  speed: number;
  direction: number; // 1 or -1
  axis: 'x' | 'z';
  minBound: number;
  maxBound: number;
  fixedCoord: number; // fixed x or z
  update?: (time: number, dt: number) => void;
}

export interface FaunaEntity {
  group: THREE.Group;
  update: (time: number) => void;
}

export interface TrafficAndFaunaSystem {
  group: THREE.Group;
  vehicles: TrafficEntity[];
  fauna: FaunaEntity[];
  update: (time: number, dt: number) => void;
}

// 1. Classic Ambassador Car (അംബാസഡർ)
function buildAmbassadorCar(isTaxi = false): THREE.Group {
  const car = new THREE.Group();
  const bodyColor = isTaxi ? 0xf5f5f5 : 0xf8fafc;
  const bodyMat = new THREE.MeshLambertMaterial({ color: bodyColor });
  const chromeMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 });
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  // Main Rounded Lower Body
  const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.9, 4.8), bodyMat);
  lowerBody.position.y = 0.65;
  lowerBody.castShadow = true;
  car.add(lowerBody);

  // Cabin / Greenhouse (Curved vintage roof)
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.85, 2.6), bodyMat);
  cabin.position.set(0, 1.45, -0.2);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.75, 2.7), glassMat);
  windshield.position.set(0, 1.45, -0.2);
  car.add(cabin, windshield);

  // Chrome Curved Grille & Bumpers
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.25, 0.35), chromeMat);
  frontBumper.position.set(0, 0.45, 2.45);
  const rearBumper = frontBumper.clone();
  rearBumper.position.set(0, 0.45, -2.45);
  const grille = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.15), chromeMat);
  grille.position.set(0, 0.75, 2.42);
  car.add(frontBumper, rearBumper, grille);

  // Round Headlights & Amber indicators
  const lightGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 12);
  lightGeo.rotateX(Math.PI / 2);
  const hlL = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  hlL.position.set(-0.85, 0.8, 2.43);
  const hlR = hlL.clone();
  hlR.position.x = 0.85;
  car.add(hlL, hlR);

  // Taxi Roof Sign if Taxi
  if (isTaxi) {
    const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.3), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    taxiSign.position.set(0, 1.98, -0.2);
    car.add(taxiSign);
  }

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.3, 12);
  wheelGeo.rotateZ(Math.PI / 2);
  for (let wx of [-1.15, 1.15]) {
    for (let wz of [-1.4, 1.4]) {
      const w = new THREE.Mesh(wheelGeo, blackMat);
      w.position.set(wx, 0.38, wz);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.32, 8), chromeMat);
      cap.rotateZ(Math.PI / 2);
      cap.position.copy(w.position);
      car.add(w, cap);
    }
  }

  return car;
}

// 2. Kerala Goods Lorry (കേരള ഗുഡ്സ് ലോറി • "HORN PLEASE")
function buildKeralaGoodsLorry(): THREE.Group {
  const lorry = new THREE.Group();
  const cabinColor = 0xf59e0b; // Bright amber/yellow Kerala truck cabin
  const cabinMat = new THREE.MeshLambertMaterial({ color: cabinColor });
  const woodGreenMat = new THREE.MeshLambertMaterial({ color: 0x15803d }); // Carved green wooden body
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 8.2), blackMat);
  chassis.position.y = 0.8;
  lorry.add(chassis);

  // Front Driver Cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 2.2), cabinMat);
  cabin.position.set(0, 2.1, 2.9);
  // Windshield visor (കണ്ണാടിത്തട്ട്)
  const visor = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.35, 0.4), new THREE.MeshLambertMaterial({ color: 0xdc2626 }));
  visor.position.set(0, 3.2, 3.8);
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.9, 0.1), new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.8 }));
  windshield.position.set(0, 2.5, 4.02);
  lorry.add(cabin, visor, windshield);

  // Decorated Wooden Cargo Bed (തടി ബോഡി)
  const cargoBed = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.8, 5.6), woodGreenMat);
  cargoBed.position.set(0, 1.9, -1.1);
  // Wooden Side Ribs
  for (let r = -2.4; r <= 2.4; r += 0.8) {
    const ribL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.9, 0.15), new THREE.MeshLambertMaterial({ color: 0xfacc15 }));
    ribL.position.set(-1.3, 1.9, -1.1 + r);
    const ribR = ribL.clone();
    ribR.position.x = 1.3;
    lorry.add(ribL, ribR);
  }
  // "HORN PLEASE" Rear Tailgate Signboard
  const tailgate = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.6, 0.15), new THREE.MeshLambertMaterial({ color: 0xfacc15 }));
  tailgate.position.set(0, 1.4, -3.95);
  lorry.add(cargoBed, tailgate);

  // Wheels (6-wheel heavy lorry)
  const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 14);
  wheelGeo.rotateZ(Math.PI / 2);
  for (let wx of [-1.3, 1.3]) {
    // Front wheels
    const wf = new THREE.Mesh(wheelGeo, blackMat);
    wf.position.set(wx, 0.5, 2.8);
    // Rear dual axles
    const wr1 = new THREE.Mesh(wheelGeo, blackMat);
    wr1.position.set(wx, 0.5, -1.8);
    const wr2 = new THREE.Mesh(wheelGeo, blackMat);
    wr2.position.set(wx, 0.5, -3.0);
    lorry.add(wf, wr1, wr2);
  }

  return lorry;
}

// 3. 108 Kerala Ambulance (ആംബുലൻസ്)
function buildAmbulance(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  const amb = new THREE.Group();
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const redMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
  const blueMat = new THREE.MeshLambertMaterial({ color: 0x1d4ed8 });
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  // Main Ambulance Van Body
  const vanBody = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.1, 5.2), whiteMat);
  vanBody.position.y = 1.4;
  amb.add(vanBody);

  // Red & Blue Emergency Side Stripes
  const stripeR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 5.0), redMat);
  stripeR.position.set(1.16, 1.3, 0);
  const stripeL = stripeR.clone();
  stripeL.position.x = -1.16;
  const stripeBlueR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 5.0), blueMat);
  stripeBlueR.position.set(1.16, 0.95, 0);
  const stripeBlueL = stripeBlueR.clone();
  stripeBlueL.position.x = -1.16;
  amb.add(stripeR, stripeL, stripeBlueR, stripeBlueL);

  // Red Cross emblem on sides
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.8), redMat);
  crossH.position.set(1.17, 1.8, 0.5);
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.25), redMat);
  crossV.position.set(1.17, 1.8, 0.5);
  amb.add(crossH, crossV);

  // Emergency Siren Lightbar on Roof
  const sirenBase = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.4), new THREE.MeshLambertMaterial({ color: 0xe2e8f0 }));
  sirenBase.position.set(0, 2.55, 0.8);
  const redSiren = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.28, 0.35), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  redSiren.position.set(-0.4, 2.65, 0.8);
  const blueSiren = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.28, 0.35), new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
  blueSiren.position.set(0.4, 2.65, 0.8);
  amb.add(sirenBase, redSiren, blueSiren);

  const lightBeacon = new THREE.PointLight(0xef4444, 2.5, 20);
  lightBeacon.position.set(0, 2.8, 0.8);
  amb.add(lightBeacon);

  // 4 Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12);
  wheelGeo.rotateZ(Math.PI / 2);
  for (let wx of [-1.15, 1.15]) {
    for (let wz of [-1.6, 1.6]) {
      const w = new THREE.Mesh(wheelGeo, blackMat);
      w.position.set(wx, 0.4, wz);
      amb.add(w);
    }
  }

  return { group: amb, lightBeacon };
}

// 4. Kerala Police Jeep (പോലീസ് ജീപ്പ്)
function buildPoliceJeep(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  const jeep = new THREE.Group();
  const blueMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a }); // Kerala Police Navy Blue
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  // Jeep Hood & Tub Body
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.7, 2.2), blueMat);
  hood.position.set(0, 0.95, 1.1);
  const tub = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 2.2), blueMat);
  tub.position.set(0, 1.0, -1.1);
  jeep.add(hood, tub);

  // White Canvas Hood / Roof Frame
  const canvasRoof = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.85, 2.3), whiteMat);
  canvasRoof.position.set(0, 1.9, -1.1);
  jeep.add(canvasRoof);

  // Windshield Frame
  const wsFrame = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.8, 0.15), blueMat);
  wsFrame.position.set(0, 1.65, 0.05);
  jeep.add(wsFrame);

  // Roof Police Flasher Bar
  const lightbar = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 0.3), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
  lightbar.position.set(0, 2.42, -0.3);
  jeep.add(lightbar);

  const lightBeacon = new THREE.PointLight(0x3b82f6, 2.0, 18);
  lightBeacon.position.set(0, 2.6, -0.3);
  jeep.add(lightBeacon);

  // Heavy Duty Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.35, 14);
  wheelGeo.rotateZ(Math.PI / 2);
  for (let wx of [-1.1, 1.1]) {
    for (let wz of [-1.2, 1.2]) {
      const w = new THREE.Mesh(wheelGeo, blackMat);
      w.position.set(wx, 0.45, wz);
      jeep.add(w);
    }
  }

  return { group: jeep, lightBeacon };
}

// 5. Vintage Bajaj Chetak Scooter (സ്കൂട്ടർ)
function buildBajajChetakScooter(color = 0x86efac): THREE.Group {
  const scooter = new THREE.Group();
  const bodyMat = new THREE.MeshLambertMaterial({ color });
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  const chromeMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });

  // Curved Body Panels
  const footBoard = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.15, 1.4), bodyMat);
  footBoard.position.y = 0.35;
  const legShield = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.95, 0.15), bodyMat);
  legShield.position.set(0, 0.85, 0.65);
  const rearCowl = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.65, 0.95), bodyMat);
  rearCowl.position.set(0, 0.65, -0.45);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.2, 0.85), blackMat);
  seat.position.set(0, 1.05, -0.4);

  // Handlebars & Headlamp
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.6, 6), chromeMat);
  stem.position.set(0, 1.25, 0.65);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 6), chromeMat);
  bar.rotateZ(Math.PI / 2);
  bar.position.set(0, 1.5, 0.65);
  const headlamp = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  headlamp.position.set(0, 1.48, 0.76);

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.16, 10);
  wheelGeo.rotateZ(Math.PI / 2);
  const frontW = new THREE.Mesh(wheelGeo, blackMat);
  frontW.position.set(0, 0.24, 0.7);
  const rearW = new THREE.Mesh(wheelGeo, blackMat);
  rearW.position.set(0, 0.24, -0.5);

  scooter.add(footBoard, legShield, rearCowl, seat, stem, bar, headlamp, frontW, rearW);
  return scooter;
}

// 6. Classic Village Hero Bicycle (സൈക്കിൾ)
function buildVillageBicycle(): THREE.Group {
  const bike = new THREE.Group();
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const chromeMat = new THREE.MeshLambertMaterial({ color: 0xd4d4d8 });
  const blackMat = new THREE.MeshLambertMaterial({ color: 0x09090b });

  // Diamond Frame tubes
  const topTube = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.9, 5), steelMat);
  topTube.rotateX(Math.PI / 2);
  topTube.position.set(0, 0.9, 0);
  const downTube = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.0, 5), steelMat);
  downTube.rotateX(Math.PI / 3);
  downTube.position.set(0, 0.65, 0.3);
  const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.85, 5), steelMat);
  seatTube.position.set(0, 0.65, -0.35);

  // Wheels
  const wheelGeo = new THREE.TorusGeometry(0.38, 0.03, 6, 16);
  const frontWheel = new THREE.Mesh(wheelGeo, blackMat);
  frontWheel.position.set(0, 0.38, 0.75);
  const rearWheel = new THREE.Mesh(wheelGeo, blackMat);
  rearWheel.position.set(0, 0.38, -0.75);

  // Handlebars & Bell
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.65, 6), chromeMat);
  handle.rotateZ(Math.PI / 2);
  handle.position.set(0, 1.15, 0.55);
  const bell = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  bell.position.set(0.18, 1.2, 0.55);

  bike.add(topTube, downTube, seatTube, frontWheel, rearWheel, handle, bell);
  return bike;
}

// 7. 🐄 3D Kerala Cow (വെച്ചൂർ പശു / നാടൻ പശു)
function buildKeralaCow(isWhite = true): FaunaEntity {
  const cow = new THREE.Group();
  const coatColor = isWhite ? 0xf5f5f5 : 0x78350f;
  const bodyMat = new THREE.MeshLambertMaterial({ color: coatColor });
  const snoutMat = new THREE.MeshLambertMaterial({ color: 0xfca5a5 });
  const hornMat = new THREE.MeshLambertMaterial({ color: 0x27272a });

  // Barrel Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 2.6), bodyMat);
  body.position.y = 1.4;
  cow.add(body);

  // Hump (നാടൻ പശുവിന്റെ പൂഞ്ഞ)
  const hump = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.6, 6), bodyMat);
  hump.position.set(0, 2.25, 0.6);
  cow.add(hump);

  // Neck & Head Pivot Group for animated grazing/bobbing
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 1.8, 1.3);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.75, 0.95), bodyMat);
  head.position.set(0, 0, 0.45);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.4, 0.45), snoutMat);
  snout.position.set(0, -0.15, 0.95);

  // Curved Horns (കൊമ്പുകൾ)
  for (let hx of [-0.35, 0.35]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 6), hornMat);
    horn.rotateX(-0.3);
    horn.rotateZ(hx < 0 ? -0.4 : 0.4);
    horn.position.set(hx, 0.42, 0.3);
    headPivot.add(horn);
  }
  headPivot.add(head, snout);
  cow.add(headPivot);

  // 4 Legs
  const legMat = bodyMat;
  const legGeo = new THREE.CylinderGeometry(0.14, 0.12, 1.1, 6);
  for (let lx of [-0.45, 0.45]) {
    for (let lz of [-0.85, 0.85]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(lx, 0.55, lz);
      cow.add(leg);
    }
  }

  // Tail Pivot for gentle wagging
  const tailPivot = new THREE.Group();
  tailPivot.position.set(0, 1.8, -1.3);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.08, 1.0, 5), hornMat);
  tail.position.y = -0.5;
  tailPivot.add(tail);
  cow.add(tailPivot);

  const phase = Math.random() * Math.PI * 2;
  return {
    group: cow,
    update: (time: number) => {
      // Gentle grazing head movement and tail wag
      headPivot.rotation.x = 0.2 + Math.sin(time * 0.0018 + phase) * 0.2;
      tailPivot.rotation.z = Math.sin(time * 0.003 + phase) * 0.35;
    },
  };
}

// 8. 🐕 3D Village Dog (നാടൻ പട്ടി)
function buildVillageDog(): FaunaEntity {
  const dog = new THREE.Group();
  const coatMat = new THREE.MeshLambertMaterial({ color: 0xd97706 }); // Golden tan village stray
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 1.1), coatMat);
  body.position.y = 0.65;
  dog.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.45), coatMat);
  head.position.set(0, 0.95, 0.55);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.18, 0.3), darkMat);
  snout.position.set(0, 0.88, 0.82);
  dog.add(head, snout);

  // Upright Alert Ears
  for (let ex of [-0.14, 0.14]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 4), coatMat);
    ear.position.set(ex, 1.18, 0.5);
    dog.add(ear);
  }

  // Curved Upright Tail
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 0.5, 5), coatMat);
  tail.rotateX(Math.PI / 4);
  tail.position.set(0, 0.85, -0.6);
  dog.add(tail);

  // Legs
  for (let lx of [-0.18, 0.18]) {
    for (let lz of [-0.35, 0.35]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.5, 5), coatMat);
      leg.position.set(lx, 0.25, lz);
      dog.add(leg);
    }
  }

  const phase = Math.random() * Math.PI * 2;
  return {
    group: dog,
    update: (time: number) => {
      dog.rotation.y += Math.sin(time * 0.001 + phase) * 0.005;
    },
  };
}

// 9. 🐓 3D Country Chicken (നാടൻ കോഴി)
function buildCountryChicken(): FaunaEntity {
  const chicken = new THREE.Group();
  const feathMat = new THREE.MeshLambertMaterial({ color: 0x9a3412 }); // Red-brown feathers
  const combMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
  const beakMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.24, 7, 7), feathMat);
  body.position.y = 0.35;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 6, 6), feathMat);
  head.position.set(0, 0.52, 0.18);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 4), beakMat);
  beak.rotateX(Math.PI / 2);
  beak.position.set(0, 0.52, 0.32);
  const comb = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.1, 0.14), combMat);
  comb.position.set(0, 0.65, 0.18);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 4), new THREE.MeshLambertMaterial({ color: 0x1c1917 }));
  tail.rotateX(-Math.PI / 3);
  tail.position.set(0, 0.45, -0.22);

  chicken.add(body, head, beak, comb, tail);

  const phase = Math.random() * Math.PI * 2;
  return {
    group: chicken,
    update: (time: number) => {
      // Rapid chicken pecking motion
      const peck = Math.sin(time * 0.008 + phase);
      if (peck > 0.6) {
        head.position.y = 0.42;
        head.position.z = 0.24;
      } else {
        head.position.y = 0.52;
        head.position.z = 0.18;
      }
    },
  };
}

// ==========================================
// MASTER TRAFFIC & FAUNA SYSTEM BUILDER
// ==========================================
export function buildLivingTrafficAndFauna(): TrafficAndFaunaSystem {
  const masterGroup = new THREE.Group();
  const vehicles: TrafficEntity[] = [];
  const fauna: FaunaEntity[] = [];

  // 1. HIGHWAY VEHICLES (Patrolling along Z axis between -280 and +310 on the main road)
  // Vehicle A: Classic White Ambassador Taxi (Highway Northbound, lane X = -2.8)
  const taxiAmba = buildAmbassadorCar(true);
  taxiAmba.position.set(-2.8, 0, -80);
  taxiAmba.rotation.y = Math.PI; // Face North (-Z)
  masterGroup.add(taxiAmba);
  vehicles.push({
    mesh: taxiAmba,
    speed: 0.35,
    direction: -1,
    axis: 'z',
    minBound: -270,
    maxBound: 290,
    fixedCoord: -2.8,
  });

  // Vehicle B: Kerala Goods Lorry ("HORN PLEASE", Highway Southbound, lane X = 2.8)
  const goodsLorry = buildKeralaGoodsLorry();
  goodsLorry.position.set(2.8, 0, -210);
  goodsLorry.rotation.y = 0; // Face South (+Z)
  masterGroup.add(goodsLorry);
  vehicles.push({
    mesh: goodsLorry,
    speed: 0.28,
    direction: 1,
    axis: 'z',
    minBound: -270,
    maxBound: 290,
    fixedCoord: 2.8,
  });

  // Vehicle C: 108 Kerala Ambulance with flashing light (Highway Northbound, lane X = -2.8)
  const ambulance = buildAmbulance();
  ambulance.group.position.set(-2.8, 0, 180);
  ambulance.group.rotation.y = Math.PI;
  masterGroup.add(ambulance.group);
  vehicles.push({
    mesh: ambulance.group,
    speed: 0.48,
    direction: -1,
    axis: 'z',
    minBound: -270,
    maxBound: 290,
    fixedCoord: -2.8,
    update: (time: number) => {
      // Strobe beacon light
      ambulance.lightBeacon.intensity = Math.sin(time * 0.015) > 0 ? 3.5 : 0.5;
    },
  });

  // Vehicle D: Kerala Police Jeep with blue strobe (Highway Southbound, lane X = 2.8)
  const policeJeep = buildPoliceJeep();
  policeJeep.group.position.set(2.8, 0, 40);
  policeJeep.group.rotation.y = 0;
  masterGroup.add(policeJeep.group);
  vehicles.push({
    mesh: policeJeep.group,
    speed: 0.42,
    direction: 1,
    axis: 'z',
    minBound: -270,
    maxBound: 290,
    fixedCoord: 2.8,
    update: (time: number) => {
      policeJeep.lightBeacon.intensity = Math.cos(time * 0.018) > 0 ? 3.0 : 0.4;
    },
  });

  // Vehicle E: Bajaj Chetak Scooter (Cross Street at Z: 0, moving East-West)
  const scooter = buildBajajChetakScooter(0x6ee7b7);
  scooter.position.set(-80, 0, 2.2);
  scooter.rotation.y = Math.PI / 2; // Face East (+X)
  masterGroup.add(scooter);
  vehicles.push({
    mesh: scooter,
    speed: 0.25,
    direction: 1,
    axis: 'x',
    minBound: -140,
    maxBound: 140,
    fixedCoord: 2.2,
  });

  // Vehicle F: Village Bicycle (Cross Street at Z: 0, moving Westward)
  const bicycle = buildVillageBicycle();
  bicycle.position.set(110, 0, -2.2);
  bicycle.rotation.y = -Math.PI / 2; // Face West (-X)
  masterGroup.add(bicycle);
  vehicles.push({
    mesh: bicycle,
    speed: 0.16,
    direction: -1,
    axis: 'x',
    minBound: -140,
    maxBound: 140,
    fixedCoord: -2.2,
  });

  // 2. 🐄 ANIMALS (Cows, Dogs, Chickens)
  // Cows in Paddy Village and roadside verges
  const cow1 = buildKeralaCow(true); // White cow
  cow1.group.position.set(-110, 0.2, 75);
  cow1.group.rotation.y = 0.5;
  masterGroup.add(cow1.group);
  fauna.push(cow1);

  const cow2 = buildKeralaCow(false); // Brown cow
  cow2.group.position.set(-145, 0.2, 105);
  cow2.group.rotation.y = -0.8;
  masterGroup.add(cow2.group);
  fauna.push(cow2);

  const cow3 = buildKeralaCow(true);
  cow3.group.position.set(10, 0.1, -160);
  cow3.group.rotation.y = Math.PI / 2;
  masterGroup.add(cow3.group);
  fauna.push(cow3);

  // Dogs near Market and Town Center
  const dog1 = buildVillageDog();
  dog1.group.position.set(78, 0, 16);
  masterGroup.add(dog1.group);
  fauna.push(dog1);

  const dog2 = buildVillageDog();
  dog2.group.position.set(-12, 0, -18);
  masterGroup.add(dog2.group);
  fauna.push(dog2);

  // Chickens near Old Kizhakkumpuram houses
  for (let ch = 0; ch < 5; ch++) {
    const chicken = buildCountryChicken();
    chicken.group.position.set(-52 + (ch % 3) * 2.5, 0.05, -12 + Math.floor(ch / 3) * 2.5);
    masterGroup.add(chicken.group);
    fauna.push(chicken);
  }

  return {
    group: masterGroup,
    vehicles,
    fauna,
    update: (time: number, dt: number) => {
      // Update moving traffic
      vehicles.forEach(v => {
        if (v.axis === 'z') {
          v.mesh.position.z += v.speed * v.direction;
          if (v.direction === 1 && v.mesh.position.z > v.maxBound) {
            v.mesh.position.z = v.minBound;
          } else if (v.direction === -1 && v.mesh.position.z < v.minBound) {
            v.mesh.position.z = v.maxBound;
          }
        } else {
          v.mesh.position.x += v.speed * v.direction;
          if (v.direction === 1 && v.mesh.position.x > v.maxBound) {
            v.mesh.position.x = v.minBound;
          } else if (v.direction === -1 && v.mesh.position.x < v.minBound) {
            v.mesh.position.x = v.maxBound;
          }
        }
        v.update?.(time, dt);
      });

      // Update fauna behaviors
      fauna.forEach(f => f.update(time));
    },
  };
}
