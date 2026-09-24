import * as THREE from 'three';
import { buildAmericanBoxAmbulance } from './VehiclesBuilder';

export interface DistrictInfo {
  id: string;
  name: string;
  malayalamName: string;
  icon: string;
  desc: string;
  coords: { x: number; z: number };
  category: 'North' | 'Central' | 'South' | 'High Range';
}

/**
 * 🗺️ NAATTILE SCENE — KERALA MEGA MAP (14 DISTRICTS)
 * Kasaragod → Kannur → Kozhikode → Wayanad → Malappuram → Palakkad →
 * Thrissur → Ernakulam → Idukki → Kottayam → Alappuzha → Pathanamthitta → Kollam → Thiruvananthapuram
 */
export const KERALA_14_DISTRICTS: DistrictInfo[] = [
  {
    id: 'kasaragod',
    name: '1. Kasaragod — The Northern Gateway',
    malayalamName: 'കാസർഗോഡ് • വടക്കൻ പൈതൃകം',
    icon: '🌴',
    desc: 'Northern border atmosphere, historic Bekal Fort ramparts, Chandragiri river, laterite undulating hills and coconut plantations.',
    coords: { x: -80, z: -350 },
    category: 'North',
  },
  {
    id: 'kannur',
    name: '2. Kannur — Coast & Culture',
    malayalamName: 'കണ്ണൂർ • തെയ്യവും തീരദേശവും',
    icon: '🌊',
    desc: 'Muzhappilangad drive-in beach, fishing villages, dense coconut groves, vibrant Theyyam festival grounds & coastal highway.',
    coords: { x: 70, z: -320 },
    category: 'North',
  },
  {
    id: 'kozhikode',
    name: '3. Kozhikode — Big City Region',
    malayalamName: 'കോഴിക്കോട് • മിഠായിത്തെരുവും ബീച്ചും',
    icon: '🌆',
    desc: 'Major urban downtown, historic SM Street (മിഠായിത്തെരുവ്), busy railway terminal, Paragon style culinary street & Calicut beach.',
    coords: { x: 0, z: -280 },
    category: 'North',
  },
  {
    id: 'wayanad',
    name: '4. Wayanad — Misty Western Ghats',
    malayalamName: 'വയനാട് • മലയോര ചുരവും കാടും',
    icon: '⛰️',
    desc: 'High-altitude mountain ghat road, hairpin turns, cascading waterfalls, tea & coffee plantations, cool mountain fog & viewpoint.',
    coords: { x: -140, z: -250 },
    category: 'High Range',
  },
  {
    id: 'malappuram',
    name: '5. Malappuram — Green Rolling Hills',
    malayalamName: 'മലപ്പുറം • സെവൻസ് ഫുട്ബോളിന്റെ നാട്',
    icon: '⚽',
    desc: 'Rolling emerald hills, dense village lanes, traditional heritage mosques, and buzzing local Sevens football mania.',
    coords: { x: -60, z: -160 },
    category: 'North',
  },
  {
    id: 'palakkad',
    name: '6. Palakkad — The Granary & Ghat Gap',
    malayalamName: 'പാലക്കാട് • നെല്ലറയും കോട്ടയും',
    icon: '🌾',
    desc: 'Famous Palakkad mountain gap, vast emerald paddy fields, coconut palm farms, historic granite fort and breezy long highways.',
    coords: { x: 120, z: -150 },
    category: 'Central',
  },
  {
    id: 'thrissur',
    name: '7. Thrissur — Cultural Capital',
    malayalamName: 'തൃശൂർ • സാംസ്കാരിക തലസ്ഥാനം & പൂരം',
    icon: '🎉',
    desc: 'Thekkinkadu Maidan, iconic Thrissur Pooram festival grounds, majestic temple towers, daily cultural bazaars & gold markets.',
    coords: { x: 80, z: -70 },
    category: 'Central',
  },
  {
    id: 'ernakulam',
    name: '8. Ernakulam — Mega Metropolis & Metro',
    malayalamName: 'എറണാകുളം • കൊച്ചി മെട്രോ & ബിസിനസ് ഹബ്ബ്',
    icon: '🏙️',
    desc: 'Modern mega metropolis, Marine Drive promenade, high-rises, Kochi Metro transit line, Harbour bridges and dense bustling traffic.',
    coords: { x: 0, z: 0 },
    category: 'Central',
  },
  {
    id: 'idukki',
    name: '9. Idukki — High Ranges & Arch Dam',
    malayalamName: 'ഇടുക്കി • ആർച്ച് ഡാമും മലനിരകളും',
    icon: '🌿',
    desc: 'Western Ghats wilderness, massive double-curvature arch dam reservoir, tea carpeted valleys, steep hairpin roads and misty peaks.',
    coords: { x: -130, z: 50 },
    category: 'High Range',
  },
  {
    id: 'kottayam',
    name: '10. Kottayam — Land of Letters & Rubber',
    malayalamName: 'കോട്ടയം • അക്ഷരനഗരിയും റബ്ബർ തോട്ടങ്ങളും',
    icon: '🌴',
    desc: 'Vast rubber plantations, Meenachil river, historic churches, printing press heritage and rolling midland countryside.',
    coords: { x: 50, z: 65 },
    category: 'Central',
  },
  {
    id: 'alappuzha',
    name: '11. Alappuzha — Venice of the East & Backwaters',
    malayalamName: 'ആലപ്പുഴ • കായൽ ലോകവും കെട്ടുവള്ളങ്ങളും',
    icon: '🚤',
    desc: 'Intricate backwater canals, traditional thatched Kettuvallam houseboats, Nehru Trophy snake boat race tracks & coconut waterways.',
    coords: { x: -80, z: 120 },
    category: 'South',
  },
  {
    id: 'pathanamthitta',
    name: '12. Pathanamthitta — Pilgrim Forests & Pamba',
    malayalamName: 'പത്തനംതിട്ട • പമ്പാ നദിയും വനപാതകളും',
    icon: '🌲',
    desc: 'Dense Sabarimala reserve forests, holy Pamba river waters, secluded wilderness roads, teak woodlands & peaceful hill shrines.',
    coords: { x: 110, z: 150 },
    category: 'South',
  },
  {
    id: 'kollam',
    name: '13. Kollam — Historic Port & Ashtamudi Lake',
    malayalamName: 'കൊല്ലം • അഷ്ടമുടിക്കായലും തുറമുഖവും',
    icon: '🌊',
    desc: 'Scenic 8-armed Ashtamudi backwater lake, Tangasseri lighthouse, fishing harbour, coastal cashew trade and beach avenues.',
    coords: { x: 0, z: 230 },
    category: 'South',
  },
  {
    id: 'thiruvananthapuram',
    name: '14. Thiruvananthapuram — The State Capital',
    malayalamName: 'തിരുവനന്തപുരം • തലസ്ഥാന നഗരിയും കോവളവും',
    icon: '🏛️',
    desc: 'Southern royal capital, Kerala Secretariat, Napier Museum cultural gardens, Kovalam crescent beach and southern highway terminal.',
    coords: { x: 0, z: 320 },
    category: 'South',
  },
];

// Backwards-compatibility alias for 12 districts references
export const KIZHAKKUMPURAM_12_DISTRICTS: DistrictInfo[] = KERALA_14_DISTRICTS;

export interface BigMapResult {
  group: THREE.Group;
  colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[];
  waterObjects: THREE.Mesh[];
  updateAnimation: (time: number) => void;
}

export function buildBigKizhakkumpuramMap(): BigMapResult {
  const mapGroup = new THREE.Group();
  const colliders: { minX: number; maxX: number; minZ: number; maxZ: number }[] = [];
  const waterObjects: THREE.Mesh[] = [];

  // ==========================================
  // 1. ⛰️ HIGHLAND & VIEWPOINT (North, Z: -280)
  // ==========================================
  const highlandGroup = new THREE.Group();
  highlandGroup.position.set(0, 0, -280);

  // Viewpoint Pavilion Platform on hill
  const deckMat = new THREE.MeshLambertMaterial({ color: 0x5a3d28 });
  const deck = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 16), deckMat);
  deck.position.set(0, 18, 0);
  highlandGroup.add(deck);

  // Deck Railings
  const deckRailMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const dRailFront = new THREE.Mesh(new THREE.BoxGeometry(22, 1.1, 0.25), deckRailMat);
  dRailFront.position.set(0, 19.1, 7.8);
  const dRailBack = dRailFront.clone();
  dRailBack.position.set(0, 19.1, -7.8);
  const dRailL = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.1, 16), deckRailMat);
  dRailL.position.set(-10.8, 19.1, 0);
  const dRailR = dRailL.clone();
  dRailR.position.set(10.8, 19.1, 0);
  highlandGroup.add(dRailFront, dRailBack, dRailL, dRailR);

  // Thatched Gazebo Roof on Deck
  const pillarMat = new THREE.MeshLambertMaterial({ color: 0x3d2817 });
  for (let px of [-9, 9]) {
    for (let pz of [-6, 6]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.28, 4.2, 8), pillarMat);
      p.position.set(px, 20.6, pz);
      highlandGroup.add(p);
    }
  }
  const thatchMat = new THREE.MeshLambertMaterial({ color: 0x8b6508 });
  const thatchRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 3.8, 4), thatchMat);
  thatchRoof.position.set(0, 24.2, 0);
  thatchRoof.rotateY(Math.PI / 4);
  highlandGroup.add(thatchRoof);

  // Observation Telescope
  const teleMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a });
  const teleStand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 1.4, 8), teleMat);
  teleStand.position.set(0, 19.3, 6.8);
  const teleScope = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.9, 8), teleMat);
  teleScope.rotateX(Math.PI / 2 - 0.2);
  teleScope.position.set(0, 20.1, 6.8);
  highlandGroup.add(teleStand, teleScope);

  // Highland Viewpoint Signboard
  const signPillar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.6, 0.2), pillarMat);
  signPillar.position.set(-6, 19.9, 6.5);
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.2, 0.15), new THREE.MeshLambertMaterial({ color: 0x047857 }));
  signBoard.position.set(-6, 21.0, 6.5);
  highlandGroup.add(signPillar, signBoard);

  mapGroup.add(highlandGroup);
  colliders.push({ minX: -12, maxX: 12, minZ: -290, maxZ: -270 });

  // ==========================================
  // 2. 🌲 FOREST AREA (North-West, X: -140, Z: -250)
  // ==========================================
  const forestGroup = new THREE.Group();
  forestGroup.position.set(-140, 0, -250);

  // Forest Dirt Trail Clearing
  const trailMat = new THREE.MeshLambertMaterial({ color: 0x6e4e32 });
  const trail = new THREE.Mesh(new THREE.PlaneGeometry(8, 120), trailMat);
  trail.rotateX(-Math.PI / 2);
  trail.position.set(0, 0.09, 0);
  forestGroup.add(trail);

  // Sacred Forest Shrine (സർപ്പക്കാവ് / വനക്ഷേത്രം)
  const shrineStoneMat = new THREE.MeshLambertMaterial({ color: 0x374151 });
  const shrineBase = new THREE.Mesh(new THREE.BoxGeometry(6, 0.8, 6), shrineStoneMat);
  shrineBase.position.set(12, 0.4, -15);
  // Stone Idol Plaque (നാഗപ്രതിഷ്ഠ)
  const idolMat = new THREE.MeshLambertMaterial({ color: 0x1f2937 });
  const idol = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.35), idolMat);
  idol.position.set(12, 1.7, -15);
  // Brass Deepam (വിളക്ക്)
  const brassMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
  const deepam = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.2, 8), brassMat);
  deepam.position.set(12, 1.2, -12.8);
  forestGroup.add(shrineBase, idol, deepam);

  // Dense Teak & Jungle Trees
  const teakTrunkMat = new THREE.MeshLambertMaterial({ color: 0x4a3728 });
  const teakFoliageMat = new THREE.MeshLambertMaterial({ color: 0x1e3a1e });
  for (let i = 0; i < 28; i++) {
    const tx = (Math.random() - 0.5) * 80;
    const tz = (Math.random() - 0.5) * 90;
    if (Math.abs(tx) < 6) continue; // Keep trail open
    const th = 9 + Math.random() * 5;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.5, th, 7), teakTrunkMat);
    trunk.position.set(tx, th / 2, tz);
    trunk.castShadow = true;
    const foliage = new THREE.Mesh(new THREE.DodecahedronGeometry(3.2 + Math.random() * 1.5, 1), teakFoliageMat);
    foliage.position.set(tx, th + 2.2, tz);
    foliage.castShadow = true;
    forestGroup.add(trunk, foliage);
  }

  // Timber Stacked Logs on forest verge
  const logMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
  for (let l = 0; l < 6; l++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 7, 8), logMat);
    log.rotateZ(Math.PI / 2);
    log.position.set(-6, 0.4 + (l % 2) * 0.7, -30 + Math.floor(l / 2) * 2.2);
    forestGroup.add(log);
  }

  mapGroup.add(forestGroup);

  // ==========================================
  // 3. 🏘️ OLD KIZHAKKUMPURAM (West, X: -60, Z: -15)
  // ==========================================
  const oldVillageGroup = new THREE.Group();
  oldVillageGroup.position.set(-60, 0, -15);

  // Traditional Kerala Nalukettu House
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xfef9c3 });
  const roofTileMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x5c3317 });

  const naluHouse = new THREE.Group();
  const baseWalls = new THREE.Mesh(new THREE.BoxGeometry(16, 4.2, 14), wallMat);
  baseWalls.position.set(0, 2.1, 0);
  naluHouse.add(baseWalls);

  // Pitched Terracotta Tile Roof
  const mainRoof = new THREE.Mesh(new THREE.ConeGeometry(13.5, 4.8, 4), roofTileMat);
  mainRoof.position.set(0, 6.2, 0);
  mainRoof.rotateY(Math.PI / 4);
  naluHouse.add(mainRoof);

  // Traditional Verandah with carved wooden pillars (പൂമുഖം)
  const porch = new THREE.Mesh(new THREE.BoxGeometry(10, 0.4, 3.5), new THREE.MeshLambertMaterial({ color: 0x991b1b }));
  porch.position.set(0, 0.2, 8.5);
  naluHouse.add(porch);
  for (let px of [-4.2, -1.4, 1.4, 4.2]) {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 3.4, 8), woodMat);
    pillar.position.set(px, 1.9, 9.8);
    naluHouse.add(pillar);
  }
  const porchRoof = new THREE.Mesh(new THREE.ConeGeometry(7.5, 2.6, 4), roofTileMat);
  porchRoof.position.set(0, 4.8, 8.6);
  porchRoof.rotateY(Math.PI / 4);
  naluHouse.add(porchRoof);
  naluHouse.position.set(-18, 0, -8);
  oldVillageGroup.add(naluHouse);
  colliders.push({ minX: -86, maxX: -70, minZ: -32, maxZ: -10 });

  // Traditional Stone Water Well (കിണർ) with Pulley (കപ്പി)
  const wellStoneMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const wellCylinder = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.3, 1.2, 14, 1, true), wellStoneMat);
  wellCylinder.position.set(-4, 0.6, 8);
  // Well Post & Pulley Crossbar
  const post1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.8, 6), woodMat);
  post1.position.set(-5.6, 1.4, 8);
  const post2 = post1.clone();
  post2.position.set(-2.4, 1.4, 8);
  const xbar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.6, 6), woodMat);
  xbar.rotateZ(Math.PI / 2);
  xbar.position.set(-4, 2.7, 8);
  // Pulley & Bucket
  const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.15, 10), new THREE.MeshLambertMaterial({ color: 0x1f2937 }));
  pulley.position.set(-4, 2.5, 8);
  const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 4), new THREE.MeshLambertMaterial({ color: 0xd4d4d8 }));
  rope.position.set(-4, 1.6, 8);
  const bucket = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.25, 0.6, 8), new THREE.MeshLambertMaterial({ color: 0x78716c }));
  bucket.position.set(-4, 0.8, 8);
  oldVillageGroup.add(wellCylinder, post1, post2, xbar, pulley, rope, bucket);

  // Tulasi Thara (തുളസിത്തറ)
  const tulasiMat = new THREE.MeshLambertMaterial({ color: 0xfef08a });
  const tulasiBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 1.5), tulasiMat);
  tulasiBase.position.set(3, 0.6, 6);
  const tulasiPlant = new THREE.Mesh(new THREE.DodecahedronGeometry(0.65, 1), new THREE.MeshLambertMaterial({ color: 0x15803d }));
  tulasiPlant.position.set(3, 1.6, 6);
  oldVillageGroup.add(tulasiBase, tulasiPlant);

  mapGroup.add(oldVillageGroup);

  // ==========================================
  // 4. 🏙️ TOWN CENTER (Center, X: 0, Z: 0)
  // ==========================================
  const townGroup = new THREE.Group();
  townGroup.position.set(0, 0, 0);

  // Historic Town Clock Tower (മണിമേട) at the central intersection
  const clockTower = new THREE.Group();
  const ctStoneMat = new THREE.MeshLambertMaterial({ color: 0xd1d5db });
  const ctPlinth = new THREE.Mesh(new THREE.BoxGeometry(4.8, 1.2, 4.8), new THREE.MeshLambertMaterial({ color: 0x4b5563 }));
  ctPlinth.position.y = 0.6;
  const ctShaft = new THREE.Mesh(new THREE.BoxGeometry(3.6, 12, 3.6), ctStoneMat);
  ctShaft.position.y = 7.2;
  const ctTopBox = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.5, 4.2), new THREE.MeshLambertMaterial({ color: 0x1e3a8a }));
  ctTopBox.position.y = 14.5;
  const ctRoof = new THREE.Mesh(new THREE.ConeGeometry(3.8, 3.2, 4), new THREE.MeshLambertMaterial({ color: 0xb45309 }));
  ctRoof.position.y = 17.8;
  ctRoof.rotateY(Math.PI / 4);

  // Clock Dials on 4 faces
  const dialMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  for (let r of [0, Math.PI / 2, Math.PI, -Math.PI / 2]) {
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.1, 16), dialMat);
    dial.rotateX(Math.PI / 2);
    dial.rotateY(r);
    dial.position.set(Math.sin(r) * 2.16, 14.5, Math.cos(r) * 2.16);
    clockTower.add(dial);
  }
  clockTower.add(ctPlinth, ctShaft, ctTopBox, ctRoof);
  clockTower.position.set(-16, 0, -22);
  townGroup.add(clockTower);
  colliders.push({ minX: -19, maxX: -13, minZ: -25, maxZ: -19 });

  // Commercial Shops Arcade: Kerala Bank & Bakery
  const bankGroup = new THREE.Group();
  const bankWalls = new THREE.Mesh(new THREE.BoxGeometry(18, 5.5, 9), new THREE.MeshLambertMaterial({ color: 0x0284c7 }));
  bankWalls.position.set(0, 2.75, 0);
  const bankRoof = new THREE.Mesh(new THREE.BoxGeometry(18.6, 0.6, 9.6), new THREE.MeshLambertMaterial({ color: 0x0369a1 }));
  bankRoof.position.set(0, 5.8, 0);
  // Bank Signboard
  const bankSign = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 0.2), new THREE.MeshLambertMaterial({ color: 0xfef08a }));
  bankSign.position.set(0, 4.8, 4.65);
  // ATM Kiosk Glass Box
  const atmBox = new THREE.Mesh(new THREE.BoxGeometry(3.5, 3.2, 3), new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 }));
  atmBox.position.set(6, 1.6, 5.6);
  bankGroup.add(bankWalls, bankRoof, bankSign, atmBox);
  bankGroup.position.set(16, 0, -22);
  townGroup.add(bankGroup);
  colliders.push({ minX: 6, maxX: 26, minZ: -27, maxZ: -17 });

  // Milma Milk & Snacks Booth (മിൽമ ബൂത്ത്)
  const milmaBooth = new THREE.Group();
  const milmaWalls = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.2, 4), new THREE.MeshLambertMaterial({ color: 0x2563eb }));
  milmaWalls.position.y = 1.6;
  const milmaRoof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.4, 4.8), new THREE.MeshLambertMaterial({ color: 0x1d4ed8 }));
  milmaRoof.position.y = 3.3;
  const milmaSign = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.8, 0.1), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  milmaSign.position.set(0, 2.8, 2.06);
  milmaBooth.add(milmaWalls, milmaRoof, milmaSign);
  milmaBooth.position.set(-18, 0, 16);
  townGroup.add(milmaBooth);
  colliders.push({ minX: -21, maxX: -15, minZ: 13, maxZ: 19 });

  mapGroup.add(townGroup);

  // ==========================================
  // 5. 🛍️ MARKET (East, X: 85, Z: 10)
  // ==========================================
  const marketGroup = new THREE.Group();
  marketGroup.position.set(85, 0, 10);

  // Market Stalls with Vibrant Tarpaulins (നീല / ഓറഞ്ച് ടാർപോളിൻ)
  const tarpColors = [0x0284c7, 0xea580c, 0x16a34a, 0xd97706];
  for (let m = 0; m < 4; m++) {
    const stall = new THREE.Group();
    const stallX = (m % 2) * 12 - 6;
    const stallZ = Math.floor(m / 2) * 14 - 7;
    // Counter
    const counter = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 4), new THREE.MeshLambertMaterial({ color: 0x78350f }));
    counter.position.set(0, 0.6, 0);
    // Bamboo canopy poles
    for (let px of [-4.2, 4.2]) {
      for (let pz of [-1.8, 1.8]) {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.6, 6), woodMat);
        pole.position.set(px, 1.8, pz);
        stall.add(pole);
      }
    }
    // Colorful Tarpaulin Canopy
    const tarpMat = new THREE.MeshLambertMaterial({ color: tarpColors[m % tarpColors.length], side: THREE.DoubleSide });
    const tarp = new THREE.Mesh(new THREE.PlaneGeometry(9.6, 4.6), tarpMat);
    tarp.rotateX(Math.PI / 2 + 0.1);
    tarp.position.set(0, 3.6, 0);
    stall.add(counter, tarp);

    // Vegetable & Fruit Crates (തക്കാളി, കപ്പ, വാഴപ്പഴം)
    const crateMat = new THREE.MeshLambertMaterial({ color: 0x92400e });
    for (let c = 0; c < 3; c++) {
      const crate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 1.2), crateMat);
      crate.position.set(-2.4 + c * 2.4, 1.4, 0);
      stall.add(crate);
    }
    stall.position.set(stallX, 0, stallZ);
    marketGroup.add(stall);
  }

  // Coastal Fish Market Counter (മീൻ മാർക്കറ്റ്) with silver fish on ice
  const fishStall = new THREE.Group();
  const fishBench = new THREE.Mesh(new THREE.BoxGeometry(10, 1.1, 4), new THREE.MeshLambertMaterial({ color: 0x334155 }));
  fishBench.position.set(0, 0.55, 0);
  const iceLayer = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.2, 3.4), new THREE.MeshLambertMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.9 }));
  iceLayer.position.set(0, 1.15, 0);
  // Blue overhead tarp
  const fishTarp = new THREE.Mesh(new THREE.PlaneGeometry(10.5, 5), new THREE.MeshLambertMaterial({ color: 0x0284c7, side: THREE.DoubleSide }));
  fishTarp.rotateX(Math.PI / 2);
  fishTarp.position.set(0, 3.4, 0);
  fishStall.add(fishBench, iceLayer, fishTarp);
  fishStall.position.set(16, 0, 0);
  marketGroup.add(fishStall);

  mapGroup.add(marketGroup);
  colliders.push({ minX: 72, maxX: 106, minZ: -5, maxZ: 25 });

  // ==========================================
  // 6. 🏫 EDUCATION ZONE (East-North, X: 110, Z: -80)
  // ==========================================
  const schoolGroup = new THREE.Group();
  schoolGroup.position.set(110, 0, -80);

  // St. Mary's Govt Higher Secondary School Building (സ്കൂൾ കെട്ടിടം)
  const schoolWalls = new THREE.Mesh(new THREE.BoxGeometry(32, 7.5, 14), new THREE.MeshLambertMaterial({ color: 0xfef08a }));
  schoolWalls.position.set(0, 3.75, 0);
  const schoolRoof = new THREE.Mesh(new THREE.ConeGeometry(24, 4.8, 4), roofTileMat);
  schoolRoof.position.set(0, 9.6, 0);
  schoolRoof.rotateY(Math.PI / 4);
  // Verandah pillars
  for (let px = -14; px <= 14; px += 4.5) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 6.8, 8), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    p.position.set(px, 3.4, 7.4);
    schoolGroup.add(p);
  }
  // School Name Board
  const schoolBoard = new THREE.Mesh(new THREE.BoxGeometry(20, 1.4, 0.2), new THREE.MeshLambertMaterial({ color: 0x1e3a8a }));
  schoolBoard.position.set(0, 7.2, 7.2);
  schoolGroup.add(schoolWalls, schoolRoof, schoolBoard);
  colliders.push({ minX: 92, maxX: 128, minZ: -90, maxZ: -70 });

  // Tricolor Flagpost (ദേശീയ പതാക)
  const flagBase = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 0.6, 8), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  flagBase.position.set(0, 0.3, 16);
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 10, 8), new THREE.MeshLambertMaterial({ color: 0xd1d5db }));
  flagPole.position.set(0, 5.3, 16);
  const flagCloth = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshLambertMaterial({ color: 0xf97316, side: THREE.DoubleSide }));
  flagCloth.position.set(1.2, 9.8, 16);
  schoolGroup.add(flagBase, flagPole, flagCloth);

  // Parked Yellow School Bus
  const busBody = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.8, 11), new THREE.MeshLambertMaterial({ color: 0xfacc15 }));
  busBody.position.set(-18, 1.8, 15);
  const busCabin = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.2, 4), new THREE.MeshLambertMaterial({ color: 0x38bdf8 }));
  busCabin.position.set(-18, 2.4, 17.2);
  schoolGroup.add(busBody, busCabin);

  mapGroup.add(schoolGroup);

  // ==========================================
  // 7. 🏥 HOSPITAL ZONE (East Complex, X: 52, Z: 65 — safely offset from main road)
  // ==========================================
  const hospGroup = new THREE.Group();
  hospGroup.position.set(52, 0, 65);

  // Hospital Entrance Paved Access Driveway & Ambulance Bay (connecting from Main Road X: 9 to Hospital X: 40)
  const hospDrivewayGeo = new THREE.PlaneGeometry(36, 11);
  hospDrivewayGeo.rotateX(-Math.PI / 2);
  const hospDrivewayMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const hospDriveway = new THREE.Mesh(hospDrivewayGeo, hospDrivewayMat);
  hospDriveway.position.set(-18, 0.082, 0);
  hospDriveway.receiveShadow = true;
  hospGroup.add(hospDriveway);

  // Entrance Gate Pillars on road boundary (X: -36 relative to hospGroup is X: 16)
  const gatePillarMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
  const pillarGeo = new THREE.BoxGeometry(0.8, 3.2, 0.8);
  const pillarL = new THREE.Mesh(pillarGeo, gatePillarMat);
  pillarL.position.set(-36, 1.6, 6);
  const pillarR = new THREE.Mesh(pillarGeo, gatePillarMat);
  pillarR.position.set(-36, 1.6, -6);
  // Gate arch / banner
  const archGeo = new THREE.BoxGeometry(0.5, 0.8, 12.8);
  const arch = new THREE.Mesh(archGeo, gatePillarMat);
  arch.position.set(-36, 3.4, 0);
  hospGroup.add(pillarL, pillarR, arch);

  // Govt Taluk Hospital Main Building (താലൂക്ക് ആശുപത്രി)
  const hospWalls = new THREE.Mesh(new THREE.BoxGeometry(26, 8.5, 15), new THREE.MeshLambertMaterial({ color: 0xf0fdf4 }));
  hospWalls.position.set(0, 4.25, 0);
  const hospRoof = new THREE.Mesh(new THREE.BoxGeometry(27, 0.6, 16), new THREE.MeshLambertMaterial({ color: 0x15803d }));
  hospRoof.position.set(0, 8.8, 0);

  // Red Cross Emblem (ചുവപ്പ് കുരിശ്)
  const rcH = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.15), new THREE.MeshLambertMaterial({ color: 0xdc2626 }));
  rcH.position.set(0, 6.8, 7.6);
  const rcV = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.2, 0.15), new THREE.MeshLambertMaterial({ color: 0xdc2626 }));
  rcV.position.set(0, 6.8, 7.6);

  // 24x7 Emergency / Casualty Sign
  const emSign = new THREE.Mesh(new THREE.BoxGeometry(16, 1.1, 0.15), new THREE.MeshLambertMaterial({ color: 0xdc2626 }));
  emSign.position.set(0, 4.8, 7.6);

  hospGroup.add(hospWalls, hospRoof, rcH, rcV, emSign);
  // Colliders for Hospital Main Building (absolute world coords: X: 39 to 65, Z: 57 to 73)
  colliders.push({ minX: 38, maxX: 66, minZ: 56, maxZ: 74 });

  // Jan Aushadhi Medical Pharmacy (മെഡിക്കൽ ഷോപ്പ്) — placed along the hospital courtyard, far clear of road
  const medShop = new THREE.Group();
  const medWalls = new THREE.Mesh(new THREE.BoxGeometry(9, 3.8, 6), new THREE.MeshLambertMaterial({ color: 0xffffff }));
  medWalls.position.set(0, 1.9, 0);
  const medSign = new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.9, 0.1), new THREE.MeshLambertMaterial({ color: 0x16a34a }));
  medSign.position.set(0, 3.2, 3.06);
  medShop.add(medWalls, medSign);
  medShop.position.set(-16, 0, 13);
  hospGroup.add(medShop);
  // Colliders for Pharmacy (absolute world coords: X: 31 to 41, Z: 75 to 81)
  colliders.push({ minX: 31, maxX: 41, minZ: 75, maxZ: 81 });

  // =========================================================================
  // 🚑 SIDE OF HOSPITAL: 108 AMBULANCE PARKING BAY & AMBULANCE (ആംബുലൻസ് പാർക്കിംഗ്)
  // Situated on the North side of the hospital building (Z: -6 to -17, X: -8 to +8)
  // Directly connected to the main entrance driveway.
  // =========================================================================
  const ambBayGroup = new THREE.Group();

  // 1. Tarmac / Asphalt Parking Apron & Bay Pavement (connecting to driveway)
  const apronGeo = new THREE.PlaneGeometry(17, 12);
  apronGeo.rotateX(-Math.PI / 2);
  const apronMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const apron = new THREE.Mesh(apronGeo, apronMat);
  apron.position.set(-0.5, 0.084, -11.5);
  apron.receiveShadow = true;
  ambBayGroup.add(apron);

  // Driveway connecting spur (smooth blend between main driveway and side parking)
  const spurGeo = new THREE.PlaneGeometry(10, 6.5);
  spurGeo.rotateX(-Math.PI / 2);
  const spur = new THREE.Mesh(spurGeo, apronMat);
  spur.position.set(-10, 0.083, -4);
  ambBayGroup.add(spur);

  // Painted parking bay slot lines (Bay 1 & Bay 2)
  const lineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 }); // Safety Yellow
  const whiteLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const redDecalMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });

  // Bay 1 & Bay 2 divider & boundary lines
  for (let lx of [-7.5, -0.5, 6.5]) {
    const bLine = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.02, 9.8), lineMat);
    bLine.position.set(lx, 0.09, -11.5);
    ambBayGroup.add(bLine);
  }
  // Stop boundary line across bays
  const stopLine = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.02, 0.25), lineMat);
  stopLine.position.set(-0.5, 0.09, -6.8);
  ambBayGroup.add(stopLine);

  // Painted Ground Decal: Emergency Red Cross on white square in front of ambulance bay
  const decalBg = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.02, 2.4), whiteLineMat);
  decalBg.position.set(-4, 0.091, -7.8);
  const decalCrossH = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.025, 0.55), redDecalMat);
  decalCrossH.position.set(-4, 0.093, -7.8);
  const decalCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.025, 1.8), redDecalMat);
  decalCrossV.position.set(-4, 0.093, -7.8);
  ambBayGroup.add(decalBg, decalCrossH, decalCrossV);

  // Painted "108 AMBULANCE ONLY" red marker plate on ground
  const textPlate = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.02, 1.1), redDecalMat);
  textPlate.position.set(-4, 0.092, -15.2);
  const textPlateInner = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.022, 0.8), whiteLineMat);
  textPlateInner.position.set(-4, 0.093, -15.2);
  ambBayGroup.add(textPlate, textPlateInner);

  // Concrete wheel stop bumpers (with yellow/black hazard bands)
  const bumperMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const bumper1 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.22, 0.35), bumperMat);
  bumper1.position.set(-4, 0.19, -15.8);
  const bumper2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.22, 0.35), bumperMat);
  bumper2.position.set(3, 0.19, -15.8);
  ambBayGroup.add(bumper1, bumper2);

  // 2. Covered Kerala Hospital Portico Shelter (ആംബുലൻസ് പോർട്ടിക്കോ)
  const porticoGroup = new THREE.Group();
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x15803d }); // Hospital Green
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const roofSheetMat = new THREE.MeshLambertMaterial({ color: 0x166534 });

  // 4 Main Structural Steel Support Columns with hazard protective plinth sleeves
  const colGeo = new THREE.CylinderGeometry(0.16, 0.16, 4.4, 10);
  const sleeveGeo = new THREE.BoxGeometry(0.5, 0.6, 0.5);
  const sleeveMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

  const colCoords: [number, number][] = [
    [-7.6, -7.2],
    [6.6, -7.2],
    [-7.6, -16.0],
    [6.6, -16.0],
  ];

  colCoords.forEach(([cx, cz]) => {
    const col = new THREE.Mesh(colGeo, steelMat);
    col.position.set(cx, 2.2, cz);
    const sleeve = new THREE.Mesh(sleeveGeo, sleeveMat);
    sleeve.position.set(cx, 0.3, cz);
    porticoGroup.add(col, sleeve);
  });

  // Perimeter Roof Trusses & Steel Beams
  const beamLongMat = new THREE.MeshLambertMaterial({ color: 0x15803d });
  const beamFront = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.3, 0.3), beamLongMat);
  beamFront.position.set(-0.5, 4.3, -7.2);
  const beamBack = new THREE.Mesh(new THREE.BoxGeometry(14.6, 0.3, 0.3), beamLongMat);
  beamBack.position.set(-0.5, 4.3, -16.0);
  const beamLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 9.1), beamLongMat);
  beamLeft.position.set(-7.6, 4.3, -11.6);
  const beamRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 9.1), beamLongMat);
  beamRight.position.set(6.6, 4.3, -11.6);
  porticoGroup.add(beamFront, beamBack, beamLeft, beamRight);

  // Sloped Weather Canopy Roof with green fascia
  const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(15.2, 0.25, 9.8), roofSheetMat);
  porticoRoof.position.set(-0.5, 4.5, -11.6);
  porticoRoof.rotation.x = 0.03; // slight drainage slope
  const roofFascia = new THREE.Mesh(new THREE.BoxGeometry(15.4, 0.45, 0.1), whiteMat);
  roofFascia.position.set(-0.5, 4.4, -6.9);
  porticoGroup.add(porticoRoof, roofFascia);

  // Front Illuminated Overhead Signboard: "108 EMERGENCY AMBULANCE BAY"
  const signBack = new THREE.Mesh(new THREE.BoxGeometry(11.2, 0.9, 0.15), redDecalMat);
  signBack.position.set(-0.5, 4.9, -6.85);
  const signInner = new THREE.Mesh(new THREE.BoxGeometry(10.8, 0.65, 0.18), whiteMat);
  signInner.position.set(-0.5, 4.9, -6.85);

  // Red Cross Medallion on canopy signboard apex
  const signCrossH = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.26, 0.22), redDecalMat);
  signCrossH.position.set(-5.0, 4.9, -6.83);
  const signCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.9, 0.22), redDecalMat);
  signCrossV.position.set(-5.0, 4.9, -6.83);

  // Green 24x7 Emergency Status Light Beacon
  const greenBeacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0x22c55e })
  );
  greenBeacon.position.set(4.5, 4.9, -6.8);
  porticoGroup.add(signBack, signInner, signCrossH, signCrossV, greenBeacon);

  // Under-canopy bright ceiling fluorescent light fixtures
  for (let lz of [-9.5, -13.5]) {
    for (let lx of [-4, 3]) {
      const lampTube = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.08, 0.2),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      lampTube.position.set(lx, 4.25, lz);
      porticoGroup.add(lampTube);
    }
  }

  ambBayGroup.add(porticoGroup);

  // 3. Side Hospital Emergency Entrance Door & Stretcher Patient Ramp
  // Connects directly onto the hospital side wall at Z = -7.5
  const rampGeo = new THREE.BoxGeometry(5.2, 0.26, 2.6);
  const ramp = new THREE.Mesh(rampGeo, new THREE.MeshLambertMaterial({ color: 0x64748b }));
  ramp.position.set(-1.0, 0.13, -7.5);
  // Double casualty emergency doors
  const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.8, 0.12), new THREE.MeshLambertMaterial({ color: 0x0f172a }));
  doorFrame.position.set(-1.0, 1.4, -7.4);
  const doorSign = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 0.15), redDecalMat);
  doorSign.position.set(-1.0, 2.7, -7.38);
  ambBayGroup.add(ramp, doorFrame, doorSign);

  // 4. Staged Medical Trauma Equipment beside Ambulance Bay
  // Stretcher Gurney (ട്രോളി / സ്ട്രെച്ചർ)
  const gurney = new THREE.Group();
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.85, roughness: 0.2 });
  const stretcherBed = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.1, 2.1), whiteMat);
  stretcherBed.position.set(0, 0.75, 0);
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.08, 0.4), new THREE.MeshLambertMaterial({ color: 0x0284c7 }));
  pillow.position.set(0, 0.83, 0.7);
  const gurneyFrame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.55, 1.8), chromeMat);
  gurneyFrame.position.set(0, 0.4, 0);
  // IV Drip Pole with saline bottle
  const ivPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.3, 8), chromeMat);
  ivPole.position.set(0.38, 1.35, 0.8);
  const ivBottle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8),
    new THREE.MeshLambertMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.8 })
  );
  ivBottle.position.set(0.38, 1.8, 0.8);
  gurney.add(stretcherBed, pillow, gurneyFrame, ivPole, ivBottle);
  gurney.position.set(-1.2, 0, -11.5);
  ambBayGroup.add(gurney);

  // Dual Medical Oxygen Cylinders on Steel Rack (ഓക്സിജൻ സിലിണ്ടറുകൾ)
  const o2Rack = new THREE.Group();
  const o2CylMat = new THREE.MeshLambertMaterial({ color: 0x15803d }); // Medical Oxygen Green
  const o2NeckMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  for (let ox of [-0.22, 0.22]) {
    const tankBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 1.25, 12), o2CylMat);
    tankBody.position.set(ox, 0.7, 0);
    const tankTop = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 10), o2NeckMat);
    tankTop.position.set(ox, 1.32, 0);
    const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.15, 8), chromeMat);
    valve.position.set(ox, 1.5, 0);
    o2Rack.add(tankBody, tankTop, valve);
  }
  o2Rack.position.set(5.5, 0, -15.2);
  ambBayGroup.add(o2Rack);

  // Safety traffic caution cones (bright fluorescent orange with white reflective ring)
  const coneMat = new THREE.MeshLambertMaterial({ color: 0xf97316 });
  const coneRingMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  for (let cx of [-6.8, -1.2]) {
    const coneBase = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.42), coneMat);
    coneBase.position.set(cx, 0.1, -6.6);
    const coneBody = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 10), coneMat);
    coneBody.position.set(cx, 0.42, -6.6);
    const coneRing = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 0.16, 10), coneRingMat);
    coneRing.position.set(cx, 0.38, -6.6);
    ambBayGroup.add(coneBase, coneBody, coneRing);
  }

  // 5. 🚑 AMERICAN TYPE III MODULAR BOX AMBULANCE (ambu.jpg)
  const { group: ambulanceGroup } = buildAmericanBoxAmbulance();
  ambulanceGroup.position.set(-4.0, 0, -11.5);
  ambulanceGroup.rotation.y = 0; // Parked in Bay 1 facing forward towards the driveway!
  ambBayGroup.add(ambulanceGroup);
  hospGroup.add(ambBayGroup);

  // Colliders for Ambulance Parking Bay & Shelter Pillars (absolute world coords: X: 44 to 59, Z: 49 to 58)
  colliders.push({ minX: 44, maxX: 59, minZ: 49, maxZ: 58 });

  mapGroup.add(hospGroup);

  // ==========================================
  // 8. 🌾 PADDY VILLAGE (South-West, X: -130, Z: 90)
  // ==========================================
  const paddyGroup = new THREE.Group();
  paddyGroup.position.set(-130, 0, 90);

  // Huge Flooded Paddy Fields with Mud Bunds
  for (let px = -35; px <= 35; px += 35) {
    for (let pz = -30; pz <= 30; pz += 30) {
      // Flooded water bed
      const pWater = new THREE.Mesh(
        new THREE.PlaneGeometry(31, 26),
        new THREE.MeshPhongMaterial({ color: 0x22c55e, shininess: 90, transparent: true, opacity: 0.72 })
      );
      pWater.rotateX(-Math.PI / 2);
      pWater.position.set(px, 0.22, pz);
      paddyGroup.add(pWater);

      // Mud bunds (വരമ്പ്)
      const bMat = new THREE.MeshLambertMaterial({ color: 0x785338 });
      const bNorth = new THREE.Mesh(new THREE.BoxGeometry(33, 0.45, 1.8), bMat);
      bNorth.position.set(px, 0.25, pz - 14);
      const bSouth = bNorth.clone();
      bSouth.position.set(px, 0.25, pz + 14);
      const bWest = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.45, 29), bMat);
      bWest.position.set(px - 16, 0.25, pz);
      const bEast = bWest.clone();
      bEast.position.set(px + 16, 0.25, pz);
      paddyGroup.add(bNorth, bSouth, bWest, bEast);
    }
  }

  // Bamboo Scarecrow (പേടിപ്പാവ / കൊതിച്ചി)
  const scGroup = new THREE.Group();
  const scPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 6), woodMat);
  scPole.position.y = 1.2;
  const scArm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.8, 6), woodMat);
  scArm.rotateZ(Math.PI / 2);
  scArm.position.y = 1.8;
  const scShirt = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.1, 0.3), new THREE.MeshLambertMaterial({ color: 0xdc2626 }));
  scShirt.position.y = 1.6;
  const scPotHead = new THREE.Mesh(new THREE.SphereGeometry(0.35, 7, 7), new THREE.MeshLambertMaterial({ color: 0x1f2937 }));
  scPotHead.position.y = 2.45;
  scGroup.add(scPole, scArm, scShirt, scPotHead);
  scGroup.position.set(0, 0, 0);
  paddyGroup.add(scGroup);

  mapGroup.add(paddyGroup);

  // ==========================================
  // 9. 🌊 RIVER ZONE & 🌉 BIG BRIDGE (Z: 145)
  // ==========================================
  const riverGroup = new THREE.Group();
  riverGroup.position.set(0, 0, 145);

  // Wide River Water Body (flowing East-West across the entire map, width 54m, span 700m)
  const riverWaterGeo = new THREE.PlaneGeometry(720, 54);
  riverWaterGeo.rotateX(-Math.PI / 2);
  const riverWaterMat = new THREE.MeshPhongMaterial({
    color: 0x0f766e,
    emissive: 0x042f2e,
    shininess: 120,
    transparent: true,
    opacity: 0.88,
  });
  const riverWater = new THREE.Mesh(riverWaterGeo, riverWaterMat);
  riverWater.position.set(0, -0.7, 0);
  riverGroup.add(riverWater);
  waterObjects.push(riverWater);

  // 🌉 THE BIG HIGHWAY BRIDGE (Crosses river at X: 0, spanning from Z: 115 to Z: 175)
  const bridgeGroup = new THREE.Group();
  const bridgeDeckMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const bridgePillarMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const bridgeRailMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });

  // Highway Bridge Deck (Width 16m, Length 62m)
  const bDeck = new THREE.Mesh(new THREE.BoxGeometry(16, 1.4, 62), bridgeDeckMat);
  bDeck.position.set(0, 3.2, 0);
  bDeck.receiveShadow = true;
  bridgeGroup.add(bDeck);

  // Asphalt road surface on bridge with white lane markings
  const bRoadMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const bRoad = new THREE.Mesh(new THREE.PlaneGeometry(13.5, 61.8), bRoadMat);
  bRoad.rotateX(-Math.PI / 2);
  bRoad.position.set(0, 3.92, 0);
  bridgeGroup.add(bRoad);

  // Yellow center dividing line
  const bLine = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 60), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  bLine.rotateX(-Math.PI / 2);
  bLine.position.set(0, 3.94, 0);
  bridgeGroup.add(bLine);

  // Massive Concrete Support Piers in the water
  for (let pz of [-18, 0, 18]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(14, 5.2, 4.5), bridgePillarMat);
    pier.position.set(0, 0.8, pz);
    pier.castShadow = true;
    bridgeGroup.add(pier);
  }

  // Steel Guardrails & Decorative Streetlights on Bridge
  const railLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 62), bridgeRailMat);
  railLeft.position.set(-7.4, 4.5, 0);
  const railRight = railLeft.clone();
  railRight.position.set(7.4, 4.5, 0);
  bridgeGroup.add(railLeft, railRight);

  for (let lz of [-22, -7, 7, 22]) {
    for (let lx of [-7.5, 7.5]) {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.2, 8), bridgePillarMat);
      pole.position.set(lx, 5.9, lz);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      bulb.position.set(lx * 0.88, 7.8, lz);
      bridgeGroup.add(pole, bulb);
    }
  }

  riverGroup.add(bridgeGroup);
  mapGroup.add(riverGroup);

  // ==========================================
  // 10. 🛶 BACKWATER & HOUSEBOAT (South-East, X: 120, Z: 230)
  // ==========================================
  const backwaterGroup = new THREE.Group();
  backwaterGroup.position.set(120, 0, 230);

  // Tranquil Backwater Basin (കായൽ)
  const bwWater = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 90),
    new THREE.MeshPhongMaterial({ color: 0x0e7490, emissive: 0x083344, shininess: 110, transparent: true, opacity: 0.85 })
  );
  bwWater.rotateX(-Math.PI / 2);
  bwWater.position.set(0, -0.4, 0);
  backwaterGroup.add(bwWater);
  waterObjects.push(bwWater);

  // Wooden Boat Jetty (തടി ജട്ടി)
  const jettyMat = new THREE.MeshLambertMaterial({ color: 0x451a03 });
  const jettyDeck = new THREE.Mesh(new THREE.BoxGeometry(6, 0.6, 26), jettyMat);
  jettyDeck.position.set(-30, 0.2, 0);
  backwaterGroup.add(jettyDeck);

  // Authentic Kerala Kettuvallam (Houseboat / കെട്ടുവള്ളം)
  const houseboat = new THREE.Group();
  // Wooden Hull (Dark curved hull)
  const hullMat = new THREE.MeshLambertMaterial({ color: 0x3f1f0a });
  const hull = new THREE.Mesh(new THREE.BoxGeometry(6.5, 1.8, 22), hullMat);
  hull.position.y = 0.5;
  houseboat.add(hull);

  // Curved Bamboo & Coir Thatched Roof Canopy (വളഞ്ഞ മേൽക്കൂര)
  const thatchRoofGeo = new THREE.CylinderGeometry(3.6, 3.6, 17, 12, 1, false, 0, Math.PI);
  const hbThatchMat = new THREE.MeshLambertMaterial({ color: 0xb45309, side: THREE.DoubleSide });
  const hbRoof = new THREE.Mesh(thatchRoofGeo, hbThatchMat);
  hbRoof.rotateX(Math.PI / 2);
  hbRoof.position.set(0, 2.2, 0);
  houseboat.add(hbRoof);

  // Front Sun Deck (മുൻവശത്തെ ഇരിപ്പിടം)
  const sunDeckMat = new THREE.MeshLambertMaterial({ color: 0x78350f });
  const sunDeck = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.3, 4.2), sunDeckMat);
  sunDeck.position.set(0, 1.2, 9.5);
  houseboat.add(sunDeck);

  houseboat.position.set(-18, 0, 4);
  backwaterGroup.add(houseboat);
  colliders.push({ minX: 96, maxX: 112, minZ: 220, maxZ: 246 });

  // Chinese Fishing Net (ചീനവല) on water edge
  const cNetGroup = new THREE.Group();
  const cPoleMat = new THREE.MeshLambertMaterial({ color: 0x713f12 });
  const mainCantilever = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 11, 8), cPoleMat);
  mainCantilever.rotateZ(Math.PI / 3);
  mainCantilever.position.set(4, 4.5, 0);
  const netGeo = new THREE.PlaneGeometry(7.5, 7.5);
  const netMat = new THREE.MeshBasicMaterial({ color: 0xa1a1aa, wireframe: true });
  const netMesh = new THREE.Mesh(netGeo, netMat);
  netMesh.rotateX(Math.PI / 2.3);
  netMesh.position.set(8.5, 1.2, 0);
  cNetGroup.add(mainCantilever, netMesh);
  cNetGroup.position.set(32, 0, -10);
  backwaterGroup.add(cNetGroup);

  mapGroup.add(backwaterGroup);

  // ==========================================
  // 11. 🏖️ BEACH & COAST (South, Z: 320)
  // ==========================================
  const beachGroup = new THREE.Group();
  beachGroup.position.set(0, 0, 320);

  // Golden Sand Strip (സ്വർണ്ണ മണൽപ്പരപ്പ്)
  const sandMat = new THREE.MeshLambertMaterial({ color: 0xfde047 });
  const beachSand = new THREE.Mesh(new THREE.PlaneGeometry(720, 80), sandMat);
  beachSand.rotateX(-Math.PI / 2);
  beachSand.position.set(0, 0.05, 0);
  beachGroup.add(beachSand);

  // Arabian Sea Ocean Waves (അറബിക്കടൽ)
  const seaMat = new THREE.MeshPhongMaterial({
    color: 0x0284c7,
    emissive: 0x082f49,
    shininess: 160,
    transparent: true,
    opacity: 0.9,
  });
  const oceanWaves = new THREE.Mesh(new THREE.PlaneGeometry(720, 90), seaMat);
  oceanWaves.rotateX(-Math.PI / 2);
  oceanWaves.position.set(0, -0.2, 65);
  beachGroup.add(oceanWaves);
  waterObjects.push(oceanWaves);

  // Iconic Red-and-White Striped Kerala Coastal Lighthouse (ലൈറ്റ്ഹൗസ്)
  const lighthouseGroup = new THREE.Group();
  const lhWhiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const lhRedMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });

  // Alternating striped cylinders
  const totalStripes = 6;
  for (let s = 0; s < totalStripes; s++) {
    const sMat = s % 2 === 0 ? lhRedMat : lhWhiteMat;
    const rBot = 3.6 - s * 0.22;
    const rTop = rBot - 0.22;
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, 4.5, 14), sMat);
    stripe.position.y = 2.25 + s * 4.5;
    lighthouseGroup.add(stripe);
  }

  // Lantern Room & Balcony at Top
  const balcony = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.6, 14), new THREE.MeshLambertMaterial({ color: 0x1f2937 }));
  balcony.position.y = 27.3;
  const lanternGlass = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 3.2, 12), new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.75 }));
  lanternGlass.position.y = 29.0;
  const lhDome = new THREE.Mesh(new THREE.SphereGeometry(2.5, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), lhRedMat);
  lhDome.position.y = 30.6;

  // Lighthouse Rotating Spotlight Beacon (ലൈറ്റ് ബീം)
  const beaconLight = new THREE.SpotLight(0xfffae6, 4.5, 140, Math.PI / 6, 0.4);
  beaconLight.position.set(0, 29.2, 0);
  const beaconTarget = new THREE.Object3D();
  beaconTarget.position.set(0, 0, 80);
  lighthouseGroup.add(balcony, lanternGlass, lhDome, beaconLight, beaconTarget);
  beaconLight.target = beaconTarget;

  lighthouseGroup.position.set(65, 0, 10);
  beachGroup.add(lighthouseGroup);
  colliders.push({ minX: 60, maxX: 70, minZ: 325, maxZ: 335 });

  // Tender Coconut Stall (ഇളനീർ കട) on the beach
  const cocoStall = new THREE.Group();
  const csTarp = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 3.6), new THREE.MeshLambertMaterial({ color: 0x16a34a, side: THREE.DoubleSide }));
  csTarp.rotateX(Math.PI / 2 + 0.1);
  csTarp.position.set(0, 2.4, 0);
  const csBench = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.9, 1.8), new THREE.MeshLambertMaterial({ color: 0x78350f }));
  csBench.position.set(0, 0.45, 0);
  // Green coconuts heap
  const tenderNutMat = new THREE.MeshLambertMaterial({ color: 0x65a30d });
  for (let n = 0; n < 8; n++) {
    const nut = new THREE.Mesh(new THREE.SphereGeometry(0.3, 6, 6), tenderNutMat);
    nut.position.set(-1.2 + (n % 4) * 0.8, 1.05 + Math.floor(n / 4) * 0.4, 0);
    cocoStall.add(nut);
  }
  cocoStall.add(csTarp, csBench);
  cocoStall.position.set(-20, 0, 5);
  beachGroup.add(cocoStall);

  // Traditional Fishing Catamarans on Sand (ചെറിയ വള്ളങ്ങൾ)
  const boatMat = new THREE.MeshLambertMaterial({ color: 0x1e3a8a });
  for (let b = 0; b < 3; b++) {
    const boat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 7.5), boatMat);
    boat.position.set(-45 + b * 9, 0.4, 18);
    boat.rotateY(0.2 * (b - 1));
    beachGroup.add(boat);
  }

  mapGroup.add(beachGroup);

  // ==========================================
  // 12. 🛣️ CONTINUOUS HIGHWAY & ROAD SYSTEM
  // ==========================================
  const roadSystemGroup = new THREE.Group();
  const hwayMat = new THREE.MeshLambertMaterial({ color: 0x1f2428 });
  const markMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  // Main North-South Highway (Spans Z: -300 up to Z: +310 across the entire map, width 14m)
  const mainHighway = new THREE.Mesh(new THREE.PlaneGeometry(14, 610), hwayMat);
  mainHighway.rotateX(-Math.PI / 2);
  mainHighway.position.set(0, 0.08, 5);
  mainHighway.receiveShadow = true;
  roadSystemGroup.add(mainHighway);

  // Center Line along Highway
  const hwayLine = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 600), markMat);
  hwayLine.rotateX(-Math.PI / 2);
  hwayLine.position.set(0, 0.1, 5);
  roadSystemGroup.add(hwayLine);

  // East-West Arterial Roads
  // 1. Central Town Cross Road (at Z: 0, spanning X: -180 to +180)
  const townCrossRoad = new THREE.Mesh(new THREE.PlaneGeometry(360, 11), hwayMat);
  townCrossRoad.rotateX(-Math.PI / 2);
  townCrossRoad.position.set(0, 0.09, 0);
  townCrossRoad.receiveShadow = true;
  roadSystemGroup.add(townCrossRoad);

  // 2. North Highland Ghat Road (curving up to Viewpoint at Z: -260)
  const ghatRoad = new THREE.Mesh(new THREE.PlaneGeometry(11, 80), hwayMat);
  ghatRoad.rotateX(-Math.PI / 2);
  ghatRoad.position.set(0, 0.09, -240);
  roadSystemGroup.add(ghatRoad);

  // 3. South Coastal Beach Boulevard (at Z: +305, spanning X: -160 to +160)
  const beachBoulevard = new THREE.Mesh(new THREE.PlaneGeometry(320, 10), hwayMat);
  beachBoulevard.rotateX(-Math.PI / 2);
  beachBoulevard.position.set(0, 0.09, 305);
  beachBoulevard.receiveShadow = true;
  roadSystemGroup.add(beachBoulevard);

  // 4. Backwater Jetty Branch Road (curves East from Highway to Jetty)
  const jettyBranchRoad = new THREE.Mesh(new THREE.PlaneGeometry(95, 8), hwayMat);
  jettyBranchRoad.rotateX(-Math.PI / 2);
  jettyBranchRoad.position.set(55, 0.09, 215);
  roadSystemGroup.add(jettyBranchRoad);

  mapGroup.add(roadSystemGroup);

  // Return composite object with animation update
  return {
    group: mapGroup,
    colliders,
    waterObjects,
    updateAnimation: (time: number) => {
      // Rotate coastal lighthouse beacon beam
      beaconTarget.position.x = Math.sin(time * 0.0015) * 80;
      beaconTarget.position.z = Math.cos(time * 0.0015) * 80;

      // Gentle river & sea wave shimmer
      const waveOffset = Math.sin(time * 0.002) * 0.06;
      riverWater.position.y = -0.7 + waveOffset;
      oceanWaves.position.y = -0.2 + Math.sin(time * 0.0025) * 0.08;
    },
  };
}
