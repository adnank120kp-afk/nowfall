import * as THREE from 'three';
import { buildHighwayPatrolCruiser, buildAmericanBoxAmbulance, buildWidebodyMustangGT } from './VehiclesBuilder';

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

// 1. Widebody Ford Mustang GT Sports Car (മുസ്തങ് - musthu.jpg)
function buildAmbassadorCar(_isTaxi = false): THREE.Group {
  return buildWidebodyMustangGT();
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

// 3. American Type III Modular Box Ambulance (ആംബുലൻസ് - ambu.jpg)
function buildAmbulance(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  return buildAmericanBoxAmbulance();
}

// 4. Highway Patrol Police Cruiser (ഹൈവേ പട്രോൾ പോലീസ് കാർ)
function buildPoliceJeep(): { group: THREE.Group; lightBeacon: THREE.PointLight } {
  return buildHighwayPatrolCruiser();
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

// 6. Modern Mountain Bicycle MTB (മൗണ്ടൻ സൈക്കിൾ — യെല്ലോ ഫ്രെയിം)
// Authentic Hardtail MTB matching the user's technical blueprint (sicu.jpg):
// Bright vibrant yellow diamond frame with sloping top tube,
// black front suspension fork w/ dual stanchions, wide flat MTB handlebars
// w/ black ergonomic grips & brake levers, slim racing saddle,
// knobby off-road MTB tread tires w/ disc brakes & black spoked rims,
// crankset w/ chainring, pedals, chain & rear derailleur.
function buildVillageBicycle(): THREE.Group {
  const bike = new THREE.Group();

  const yellowFrameMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15, // Bright vibrant yellow MTB frame
    roughness: 0.35,
    metalness: 0.2,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.5,
    metalness: 0.6,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xe4e4e7,
    roughness: 0.2,
    metalness: 0.9,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.95,
  });

  // 1. MTB Hardtail Yellow Diamond Frame
  // Sloping Top Tube (from head tube to seat tube junction)
  const topTube = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.76, 8), yellowFrameMat);
  topTube.rotation.x = 1.35;
  topTube.position.set(0, 0.88, 0.08);
  topTube.castShadow = true;
  bike.add(topTube);

  // Stout Down Tube (from head tube to bottom bracket)
  const downTube = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.84, 8), yellowFrameMat);
  downTube.rotation.x = 0.88;
  downTube.position.set(0, 0.68, 0.26);
  downTube.castShadow = true;
  bike.add(downTube);

  // Seat Tube (from bottom bracket to saddle clamp)
  const seatTube = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.74, 8), yellowFrameMat);
  seatTube.rotation.x = -0.28;
  seatTube.position.set(0, 0.72, -0.28);
  bike.add(seatTube);

  // Head Tube (front steer column)
  const headTube = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.22, 8), yellowFrameMat);
  headTube.rotation.x = -0.32;
  headTube.position.set(0, 0.98, 0.44);
  bike.add(headTube);

  // Chainstays (bottom bracket to rear dropout)
  [-0.07, 0.07].forEach((x) => {
    const chainStay = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.58, 6), yellowFrameMat);
    chainStay.rotation.x = Math.PI / 2 + 0.12;
    chainStay.position.set(x, 0.44, -0.56);
    bike.add(chainStay);
  });

  // Seatstays (seat cluster to rear dropout)
  [-0.07, 0.07].forEach((x) => {
    const seatStay = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.65, 6), yellowFrameMat);
    seatStay.rotation.x = 0.58;
    seatStay.position.set(x, 0.64, -0.58);
    bike.add(seatStay);
  });

  // 2. Black Front Suspension Fork with Dual Stanchions
  const forkCrown = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.06), blackMetalMat);
  forkCrown.position.set(0, 0.9, 0.47);
  bike.add(forkCrown);

  [-0.07, 0.07].forEach((x) => {
    // Upper chrome stanchion
    const stanchion = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.35, 8), chromeMat);
    stanchion.rotation.x = -0.32;
    stanchion.position.set(x, 0.78, 0.51);
    bike.add(stanchion);

    // Lower black suspension slider leg
    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.022, 0.42, 8), blackMetalMat);
    lowerLeg.rotation.x = -0.32;
    lowerLeg.position.set(x, 0.52, 0.6);
    bike.add(lowerLeg);
  });

  // 3. Wide Straight Flat MTB Handlebars & Grips
  const handlebar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.74, 8), blackMetalMat);
  handlebar.rotation.z = Math.PI / 2;
  handlebar.position.set(0, 1.08, 0.42);
  bike.add(handlebar);

  // Black Rubber Ergonomic Grips
  [-0.32, 0.32].forEach((x) => {
    const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.14, 8), blackMetalMat);
    grip.rotation.z = Math.PI / 2;
    grip.position.set(x, 1.08, 0.42);
    bike.add(grip);

    // Brake Levers
    const lever = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.015, 0.02), chromeMat);
    lever.position.set(x > 0 ? x - 0.06 : x + 0.06, 1.06, 0.47);
    bike.add(lever);
  });

  // 4. Slim Ergonomic MTB Racing Saddle & Black Seatpost
  const seatpost = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.32, 8), blackMetalMat);
  seatpost.rotation.x = -0.28;
  seatpost.position.set(0, 1.02, -0.37);
  bike.add(seatpost);

  // Saddle shape (tapered front, wider rear)
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.045, 0.34), blackMetalMat);
  saddle.position.set(0, 1.14, -0.4);
  saddle.rotation.x = 0.08;
  saddle.castShadow = true;
  bike.add(saddle);

  // 5. Crankset, Bottom Bracket, Pedals & Chainring
  const bb = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.16, 12), blackMetalMat);
  bb.rotation.z = Math.PI / 2;
  bb.position.set(0, 0.4, -0.22);
  bike.add(bb);

  // Single front chainring w/ guard
  const chainring = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.015, 16), blackMetalMat);
  chainring.rotation.z = Math.PI / 2;
  chainring.position.set(0.08, 0.4, -0.22);
  bike.add(chainring);

  // Left & right crank arms and pedals
  [-0.1, 0.1].forEach((x, idx) => {
    const angle = idx === 0 ? 0.7 : -2.4;
    const crank = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.18, 0.025), blackMetalMat);
    crank.position.set(x, 0.4 + Math.sin(angle) * 0.08, -0.22 + Math.cos(angle) * 0.08);
    crank.rotation.x = angle;
    bike.add(crank);

    const pedal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.09), blackMetalMat);
    pedal.position.set(x > 0 ? x + 0.04 : x - 0.04, 0.4 + Math.sin(angle) * 0.16, -0.22 + Math.cos(angle) * 0.16);
    bike.add(pedal);
  });

  // 6. Knobby 29" MTB Off-Road Wheels w/ Disc Rotors
  [
    { z: 0.76, y: 0.42 },
    { z: -0.82, y: 0.42 },
  ].forEach((pos) => {
    const wheel = new THREE.Group();

    // Chunky knobby MTB tire
    const tire = new THREE.Mesh(new THREE.TorusGeometry(0.39, 0.055, 12, 24), tireMat);
    tire.castShadow = true;
    wheel.add(tire);

    // Tire tread blocks / knobs
    for (let k = 0; k < 18; k++) {
      const angle = (k / 18) * Math.PI * 2;
      const knob = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.025, 0.045), tireMat);
      knob.position.set(0, Math.cos(angle) * 0.43, Math.sin(angle) * 0.43);
      knob.rotation.x = angle;
      wheel.add(knob);
    }

    // Black alloy rim
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.365, 0.016, 6, 24), blackMetalMat);
    wheel.add(rim);

    // Center hub
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.12, 10), blackMetalMat);
    hub.rotation.x = Math.PI / 2;
    wheel.add(hub);

    // Disc brake rotor
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.01, 16), chromeMat);
    disc.rotation.x = Math.PI / 2;
    disc.position.x = 0.04;
    wheel.add(disc);

    // Black steel spokes
    for (let s = 0; s < 12; s++) {
      const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.72, 4), blackMetalMat);
      spoke.rotation.z = (s / 12) * Math.PI;
      wheel.add(spoke);
    }

    wheel.position.set(0, pos.y, pos.z);
    bike.add(wheel);
  });

  bike.scale.set(1.05, 1.05, 1.05);
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
  // Vehicle A: Nardo Grey Widebody Ford Mustang GT (മുസ്തങ് - musthu.jpg) (Highway Northbound, lane X = -2.8)
  const mustangCar = buildWidebodyMustangGT();
  mustangCar.position.set(-2.8, 0, -80);
  mustangCar.rotation.y = Math.PI; // Face North (-Z)
  masterGroup.add(mustangCar);
  vehicles.push({
    mesh: mustangCar,
    speed: 0.45,
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
