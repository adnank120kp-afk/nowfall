import * as THREE from 'three';
import { buildAmericanBoxAmbulance, buildKeralaTipper } from './VehiclesBuilder';
import { buildPuneMetroTrain } from './MetroBuilder';
import { buildRealisticSculptedElephant } from './ElephantBuilder';

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
    malayalamName: 'കാസർഗോഡ് • വടക്കൻ പൈതൃകം & ബേക്കൽ കോട്ട',
    icon: '🌴',
    desc: 'Northern border atmosphere, historic Bekal Fort ramparts, Chandragiri river, laterite undulating hills and coconut plantations.',
    coords: { x: -80, z: -350 },
    category: 'North',
  },
  {
    id: 'kannur',
    name: '2. Kannur — Coast & Culture',
    malayalamName: 'കണ്ണൂർ • തെയ്യവും മുഴപ്പിലങ്ങാട് ബീച്ചും',
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
    malayalamName: 'വയനാട് • മലയോര ചുരവും വെള്ളച്ചാട്ടവും',
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
    malayalamName: 'പാലക്കാട് • നെല്ലറയും കോട്ടയും കാറ്റും',
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

  // Common shared materials
  const whiteWallMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  const crimsonRedMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
  const darkGlassMat = new THREE.MeshLambertMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 });
  const roofGrayMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const lateriteMat = new THREE.MeshLambertMaterial({ color: 0xb45309 });
  const lateriteDarkMat = new THREE.MeshLambertMaterial({ color: 0x92400e });
  const tileRoofMat = new THREE.MeshLambertMaterial({ color: 0xc2410c });
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x5a3d28 });
  const asphaltMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const whiteLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // Animated elements references
  const animObstacleLights: THREE.Mesh[] = [];
  const animBeacons: THREE.SpotLight[] = [];
  let animMetroTrain: { group: THREE.Group; leadCar: THREE.Group; update: (time: number) => void } | null = null;

  // =========================================================================
  // 1. 🌴 KASARAGOD — THE NORTHERN START (X: -80, Z: -350)
  // Coastal Fort, Laterite Hills, Chandragiri River, Karnataka Border Gateway
  // =========================================================================
  const kasaragodGroup = new THREE.Group();
  kasaragodGroup.position.set(-80, 0, -350);

  // 1A. Karnataka-Kerala Border Gateway Arch
  const borderArch = new THREE.Group();
  const borderPillarL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.2, 1.6), lateriteMat);
  borderPillarL.position.set(-8, 3.1, 0);
  const borderPillarR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.2, 1.6), lateriteMat);
  borderPillarR.position.set(8, 3.1, 0);
  const borderBeam = new THREE.Mesh(new THREE.BoxGeometry(18, 1.4, 1.8), lateriteDarkMat);
  borderBeam.position.set(0, 5.8, 0);
  // Kerala Welcome Sign
  const borderSign = new THREE.Mesh(new THREE.BoxGeometry(15, 0.9, 0.2), new THREE.MeshLambertMaterial({ color: 0x047857 }));
  borderSign.position.set(0, 5.8, 0.95);
  // Sloped Traditional Kerala Padippura Roof
  const borderRoof = new THREE.Mesh(new THREE.ConeGeometry(11, 2.5, 4), tileRoofMat);
  borderRoof.rotateY(Math.PI / 4);
  borderRoof.position.set(0, 7.6, 0);
  borderArch.add(borderPillarL, borderPillarR, borderBeam, borderSign, borderRoof);
  borderArch.position.set(0, 0, -25);
  kasaragodGroup.add(borderArch);

  // 1B. Bekal Fort Inspired Laterite Bastion & Observation Ramparts
  const fortGroup = new THREE.Group();
  // Semi-circular Observation Tower
  const towerGeo = new THREE.CylinderGeometry(8.5, 9.2, 10.5, 16);
  const tower = new THREE.Mesh(towerGeo, lateriteMat);
  tower.position.set(0, 5.25, 0);
  // Crenellated Battlements
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
    const battlement = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 0.9), lateriteDarkMat);
    battlement.position.set(Math.cos(a) * 8.2, 11.1, Math.sin(a) * 8.2);
    battlement.rotation.y = -a;
    fortGroup.add(battlement);
  }
  // Flagstaff on Bastion Apex
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5.5, 8), new THREE.MeshLambertMaterial({ color: 0xd4d4d8 }));
  flagPole.position.set(0, 13.2, 0);
  const flagCloth = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.0, 0.04), crimsonRedMat);
  flagCloth.position.set(0.9, 14.8, 0);
  fortGroup.add(tower, flagPole, flagCloth);
  fortGroup.position.set(-25, 0, 10);
  kasaragodGroup.add(fortGroup);
  colliders.push({ minX: -115, maxX: -95, minZ: -350, maxZ: -330 });

  // 1C. Northern Kerala Nalukettu Courtyard House (Sloped tiled roof, laterite walls)
  const naluGroup = new THREE.Group();
  const naluBase = new THREE.Mesh(new THREE.BoxGeometry(16, 4.2, 14), lateriteMat);
  naluBase.position.set(0, 2.1, 0);
  const naluRoof = new THREE.Mesh(new THREE.ConeGeometry(12, 4.2, 4), tileRoofMat);
  naluRoof.rotateY(Math.PI / 4);
  naluRoof.position.set(0, 6.2, 0);
  // Wooden verandah pillars
  for (let vx of [-7, -3.5, 0, 3.5, 7]) {
    const vPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 2.8, 8), woodMat);
    vPillar.position.set(vx, 1.4, 7.3);
    naluGroup.add(vPillar);
  }
  naluGroup.add(naluBase, naluRoof);
  naluGroup.position.set(22, 0, 5);
  kasaragodGroup.add(naluGroup);
  colliders.push({ minX: -68, maxX: -48, minZ: -355, maxZ: -335 });

  mapGroup.add(kasaragodGroup);

  // =========================================================================
  // 2. 🌊 KANNUR — COAST & CULTURE (X: 70, Z: -320)
  // Muzhappilangad Drive-In Beach, Theyyam Ritual Grounds, Fishing Village
  // =========================================================================
  const kannurGroup = new THREE.Group();
  kannurGroup.position.set(70, 0, -320);

  // 2A. Muzhappilangad Drive-in Beach Hard-packed Sand Strip & Surf
  const kBeach = new THREE.Mesh(new THREE.PlaneGeometry(110, 48), new THREE.MeshLambertMaterial({ color: 0xd97706 }));
  kBeach.rotateX(-Math.PI / 2);
  kBeach.position.set(0, 0.04, 15);
  kannurGroup.add(kBeach);

  // 2B. Theyyam / Kaliyattam Sacred Festival Stage (തെയ്യത്തറ & തീയാട്ടം)
  const theyyamStage = new THREE.Group();
  // Circular Sacred Stone Platform
  const altarPlatform = new THREE.Mesh(new THREE.CylinderGeometry(9, 9.5, 0.9, 20), lateriteMat);
  altarPlatform.position.set(0, 0.45, 0);
  // Central Sacred Hearth / Fire Altar (മേലേരി / തീക്കുണ്ടം)
  const fireAltar = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.8, 0.6, 12), new THREE.MeshLambertMaterial({ color: 0x7c2d12 }));
  fireAltar.position.set(0, 0.9, 0);
  const fireEmber = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1.8, 8), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
  fireEmber.position.set(0, 1.8, 0);
  // Chenda Melam Troupe Stands & Festival Flags
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const flagStaff = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.5, 8), woodMat);
    flagStaff.position.set(Math.cos(angle) * 7.5, 2.25, Math.sin(angle) * 7.5);
    const pennant = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.4, 0.03), crimsonRedMat);
    pennant.position.set(Math.cos(angle) * 7.5 + 0.4, 3.5, Math.sin(angle) * 7.5);
    theyyamStage.add(flagStaff, pennant);
  }
  theyyamStage.add(altarPlatform, fireAltar, fireEmber);
  theyyamStage.position.set(-15, 0, -18);
  kannurGroup.add(theyyamStage);
  colliders.push({ minX: 45, maxX: 65, minZ: -348, maxZ: -328 });

  // 2C. Traditional Fishermen Huts with Coconut Leaf Thatched Canopies
  for (let h = 0; h < 2; h++) {
    const hut = new THREE.Group();
    const hWalls = new THREE.Mesh(new THREE.BoxGeometry(6, 2.8, 5.5), new THREE.MeshLambertMaterial({ color: 0xfde68a }));
    hWalls.position.set(0, 1.4, 0);
    const hRoof = new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.6, 4), new THREE.MeshLambertMaterial({ color: 0x78350f }));
    hRoof.rotateY(Math.PI / 4);
    hRoof.position.set(0, 3.8, 0);
    hut.add(hWalls, hRoof);
    hut.position.set(22 + h * 11, 0, -8 + h * 8);
    kannurGroup.add(hut);
    colliders.push({ minX: 88 + h * 11, maxX: 98 + h * 11, minZ: -332 + h * 8, maxZ: -322 + h * 8 });
  }

  mapGroup.add(kannurGroup);

  // =========================================================================
  // 3. 🌆 KOZHIKODE — BIG CITY REGION (X: 0, Z: -280)
  // Downtown High Street, SM Street (Mittai Theruvu), Calicut Beach Pier Ruins
  // =========================================================================
  const kozhikodeGroup = new THREE.Group();
  kozhikodeGroup.position.set(0, 0, -280);

  // 3A. Historic SM Street (മിഠായിത്തെരുവ് / Sweet Meat Street) Heritage Arch
  const smArch = new THREE.Group();
  const smPillarL = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7.2, 1.4), new THREE.MeshLambertMaterial({ color: 0x065f46 }));
  smPillarL.position.set(-7, 3.6, 0);
  const smPillarR = new THREE.Mesh(new THREE.BoxGeometry(1.4, 7.2, 1.4), new THREE.MeshLambertMaterial({ color: 0x065f46 }));
  smPillarR.position.set(7, 3.6, 0);
  const smBanner = new THREE.Mesh(new THREE.BoxGeometry(16, 1.6, 0.4), new THREE.MeshLambertMaterial({ color: 0xd97706 }));
  smBanner.position.set(0, 6.8, 0);
  const smLampL = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  smLampL.position.set(-7, 7.6, 0);
  const smLampR = smLampL.clone();
  smLampR.position.set(7, 7.6, 0);
  smArch.add(smPillarL, smPillarR, smBanner, smLampL, smLampR);
  smArch.position.set(-30, 0, 0);
  kozhikodeGroup.add(smArch);

  // 3B. Kozhikodan Halwa & Paragon Culinary Bazaars
  for (let s = 0; s < 3; s++) {
    const shop = new THREE.Group();
    const sBody = new THREE.Mesh(new THREE.BoxGeometry(8, 4.5, 6), new THREE.MeshLambertMaterial({ color: s === 1 ? 0xfef08a : 0xffedd5 }));
    sBody.position.set(0, 2.25, 0);
    const sSign = new THREE.Mesh(new THREE.BoxGeometry(7.6, 1.1, 0.2), crimsonRedMat);
    sSign.position.set(0, 4.8, 3.1);
    shop.add(sBody, sSign);
    shop.position.set(-42 + s * 10, 0, -12);
    kozhikodeGroup.add(shop);
    colliders.push({ minX: -48 + s * 10, maxX: -36 + s * 10, minZ: -296, maxZ: -286 });
  }

  // 3C. Calicut Beach Old Sea Pier Ruins (കടൽപ്പാലം Pillars in the water)
  const pierGroup = new THREE.Group();
  for (let p = 0; p < 7; p++) {
    const pierColL = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 6, 8), new THREE.MeshLambertMaterial({ color: 0x475569 }));
    pierColL.position.set(38, 2.5, -20 + p * 6);
    const pierColR = pierColL.clone();
    pierColR.position.set(43, 2.5, -20 + p * 6);
    const beamAcross = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.4, 0.5), new THREE.MeshLambertMaterial({ color: 0x334155 }));
    beamAcross.position.set(40.5, 5.2, -20 + p * 6);
    pierGroup.add(pierColL, pierColR, beamAcross);
  }
  kozhikodeGroup.add(pierGroup);

  mapGroup.add(kozhikodeGroup);

  // =========================================================================
  // 4. ⛰️ WAYANAD — MISTY WESTERN GHATS & WATERFALL (X: -140, Z: -250)
  // Hairpin Ghat Roads, Cascading Mountain Waterfall, Tea & Coffee Terraces
  // =========================================================================
  const wayanadGroup = new THREE.Group();
  wayanadGroup.position.set(-140, 0, -250);

  // 4A. Cascading Mountain Cliff & Waterfall (വെള്ളച്ചാട്ടം)
  const cliffGeo = new THREE.BoxGeometry(32, 28, 18);
  const cliffMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const cliff = new THREE.Mesh(cliffGeo, cliffMat);
  cliff.position.set(0, 14, 0);
  wayanadGroup.add(cliff);
  colliders.push({ minX: -158, maxX: -122, minZ: -260, maxZ: -240 });

  // Waterfall Water Stream tumbling down cliff face
  const wFallMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    emissive: 0x075985,
    shininess: 120,
    transparent: true,
    opacity: 0.88,
  });
  const wFallStream = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 27), wFallMat);
  wFallStream.position.set(0, 14.5, 9.1);
  wayanadGroup.add(wFallStream);
  waterObjects.push(wFallStream);

  // Splash Lagoon at Waterfall Base
  const poolMat = new THREE.MeshPhongMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 });
  const pool = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 9.5, 0.6, 16), poolMat);
  pool.position.set(0, 0.3, 14);
  wayanadGroup.add(pool);
  waterObjects.push(pool);

  // 4B. Stepped Terraced Emerald Tea Plantations (തേയിലത്തോട്ടങ്ങൾ)
  for (let t = 0; t < 4; t++) {
    const teaBed = new THREE.Mesh(
      new THREE.BoxGeometry(26, 0.9, 7),
      new THREE.MeshLambertMaterial({ color: 0x15803d })
    );
    teaBed.position.set(22, 1.2 + t * 1.4, -10 + t * 6);
    wayanadGroup.add(teaBed);
  }

  // 4C. High-Range Bamboo Tribal Huts & Viewpoint Pavilion
  const vHut = new THREE.Mesh(new THREE.BoxGeometry(8, 4, 7), woodMat);
  vHut.position.set(-22, 2, 12);
  const vRoof = new THREE.Mesh(new THREE.ConeGeometry(6.5, 3.5, 4), new THREE.MeshLambertMaterial({ color: 0x78350f }));
  vRoof.rotateY(Math.PI / 4);
  vRoof.position.set(-22, 5.5, 12);
  wayanadGroup.add(vHut, vRoof);
  colliders.push({ minX: -168, maxX: -156, minZ: -242, maxZ: -232 });

  // 4D. Realistic Sculpted Asian Elephant (6 அடி சிமெண்ட் யானை சிலை / കാട്ടാന)
  // Faithfully constructed to the 72" architectural cement statue blueprint
  const elephant = buildRealisticSculptedElephant({
    scale: 1.15,
    hasPedestal: true,
    hasNettipattam: true,
    skinColor: 0x52525b,
  });
  elephant.position.set(8, 0, 16);
  elephant.rotation.y = -Math.PI / 4; // Angled naturally toward the visitor pathway
  wayanadGroup.add(elephant);
  colliders.push({ minX: -136, maxX: -124, minZ: -238, maxZ: -226 });

  // Elephant Warning Sign (മുന്നറിയിപ്പ്: കാട്ടാന ശല്യം! 🐘)
  const signPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.8, 8), new THREE.MeshLambertMaterial({ color: 0x94a3b8 }));
  signPole.position.set(16, 1.9, 14);
  const signBoard = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.1), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  signBoard.position.set(16, 3.6, 14);
  signBoard.rotateZ(Math.PI / 4);
  wayanadGroup.add(signPole, signBoard);

  mapGroup.add(wayanadGroup);

  // =========================================================================
  // 5. ⚽ MALAPPURAM — HILLS & SEVENS FOOTBALL (X: -60, Z: -160)
  // Traditional Juma Masjid, Sevens Football Ground, Rolling Green Hills
  // =========================================================================
  const malappuramGroup = new THREE.Group();
  malappuramGroup.position.set(-60, 0, -160);

  // 5A. Traditional Malappuram Heritage White & Green Mosque
  const masjid = new THREE.Group();
  const mWalls = new THREE.Mesh(new THREE.BoxGeometry(18, 7.5, 15), whiteWallMat);
  mWalls.position.set(0, 3.75, 0);
  const mDome = new THREE.Mesh(new THREE.SphereGeometry(4.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0x16a34a }));
  mDome.position.set(0, 7.5, 0);
  // Twin Minarets
  for (let mx of [-9, 9]) {
    const minaret = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.3, 14, 12), whiteWallMat);
    minaret.position.set(mx, 7, 7.5);
    const minDome = new THREE.Mesh(new THREE.SphereGeometry(1.2, 10, 8), new THREE.MeshLambertMaterial({ color: 0x16a34a }));
    minDome.position.set(mx, 14.5, 7.5);
    masjid.add(minaret, minDome);
  }
  masjid.add(mWalls, mDome);
  masjid.position.set(-18, 0, 0);
  malappuramGroup.add(masjid);
  colliders.push({ minX: -88, maxX: -68, minZ: -170, maxZ: -150 });

  // 5B. Sevens Football Field with Goalposts & Floodlights
  const pitchGeo = new THREE.PlaneGeometry(38, 26);
  pitchGeo.rotateX(-Math.PI / 2);
  const pitch = new THREE.Mesh(pitchGeo, new THREE.MeshLambertMaterial({ color: 0x15803d }));
  pitch.position.set(22, 0.06, 0);
  malappuramGroup.add(pitch);

  // Floodlight Poles at Corners
  for (let fx of [5, 39]) {
    for (let fz of [-12, 12]) {
      const fPole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 10, 8), new THREE.MeshLambertMaterial({ color: 0x64748b }));
      fPole.position.set(fx, 5, fz);
      const fLamp = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.6, 0.8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
      fLamp.position.set(fx, 10.2, fz);
      malappuramGroup.add(fPole, fLamp);
    }
  }

  mapGroup.add(malappuramGroup);

  // =========================================================================
  // 6. 🌾 PALAKKAD — PALAKKAD GAP & GRANARY (X: 120, Z: -150)
  // Expansive Paddy Fields, Tipu's Granite Fort Wall, Massey Farm Tractor
  // =========================================================================
  const palakkadGroup = new THREE.Group();
  palakkadGroup.position.set(120, 0, -150);

  // 6A. Expansive Emerald Flooded Paddy Fields with Mud Bunds
  for (let px of [-22, 22]) {
    for (let pz of [-16, 16]) {
      const pWater = new THREE.Mesh(
        new THREE.PlaneGeometry(36, 26),
        new THREE.MeshPhongMaterial({ color: 0x16a34a, shininess: 80, transparent: true, opacity: 0.78 })
      );
      pWater.rotateX(-Math.PI / 2);
      pWater.position.set(px, 0.18, pz);
      palakkadGroup.add(pWater);

      // Mud Bund (വരമ്പ്)
      const bund = new THREE.Mesh(new THREE.BoxGeometry(38, 0.35, 1.4), lateriteDarkMat);
      bund.position.set(px, 0.22, pz + 13);
      palakkadGroup.add(bund);
    }
  }

  // 6B. Historic Granite Fort Bastion (Palakkad Fort Rampart)
  const pFort = new THREE.Mesh(new THREE.BoxGeometry(32, 6.5, 4.5), new THREE.MeshLambertMaterial({ color: 0x4b5563 }));
  pFort.position.set(0, 3.25, -34);
  palakkadGroup.add(pFort);
  colliders.push({ minX: 104, maxX: 136, minZ: -188, maxZ: -180 });

  // 6C. Parked Red Massey Ferguson Farm Tractor
  const tractorGroup = new THREE.Group();
  const trBody = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 3.8), crimsonRedMat);
  trBody.position.set(0, 1.4, 0);
  const trTireL = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 0.7, 12), asphaltMat);
  trTireL.rotateZ(Math.PI / 2);
  trTireL.position.set(-1.4, 1.1, -0.8);
  const trTireR = trTireL.clone();
  trTireR.position.set(1.4, 1.1, -0.8);
  tractorGroup.add(trBody, trTireL, trTireR);
  tractorGroup.position.set(-18, 0, 15);
  palakkadGroup.add(tractorGroup);

  // 6D. Iconic Palakkad Gap Tall Palmyrah Palms (കരിമ്പനകൾ) & Breezy Farm Lane
  for (let kx of [-36, -24, 28, 40]) {
    const pTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.48, 16, 8), new THREE.MeshLambertMaterial({ color: 0x27272a }));
    pTrunk.position.set(kx, 8.0, 22);
    const pCrown = new THREE.Mesh(new THREE.SphereGeometry(2.8, 8, 8), new THREE.MeshLambertMaterial({ color: 0x14532d }));
    pCrown.position.set(kx, 16.5, 22);
    palakkadGroup.add(pTrunk, pCrown);
  }

  // 6E. Working Kerala Quarry & Roadworks Heavy Tipper Lorry (ടിപ്പർ ലോറി • "HORN PLEASE")
  const palakkadTipper = buildKeralaTipper(0xf59e0b);
  palakkadTipper.position.set(-6, 0, 24);
  palakkadTipper.rotation.y = -0.35;
  palakkadGroup.add(palakkadTipper);
  colliders.push({ minX: -55 - 4, maxX: -55 + 4, minZ: -120 + 20, maxZ: -120 + 28 });

  mapGroup.add(palakkadGroup);

  // =========================================================================
  // 7. 🎉 THRISSUR — CULTURAL CAPITAL & POORAM (X: 80, Z: -70)
  // Thekkinkadu Maidan, Caparisoned Elephant Statues, Vadakkumnathan Gopuram
  // =========================================================================
  const thrissurGroup = new THREE.Group();
  thrissurGroup.position.set(80, 0, -70);

  // 7A. Thekkinkadu Maidan Festival Ground Circle
  const maidanGeo = new THREE.CircleGeometry(36, 32);
  maidanGeo.rotateX(-Math.PI / 2);
  const maidan = new THREE.Mesh(maidanGeo, new THREE.MeshLambertMaterial({ color: 0xd97706 }));
  maidan.position.set(0, 0.05, 0);
  thrissurGroup.add(maidan);

  // 7B. Temple Pagoda Gopuram with Gilded Copper Roofing
  const gopuram = new THREE.Group();
  const gBase = new THREE.Mesh(new THREE.BoxGeometry(16, 5, 12), lateriteMat);
  gBase.position.set(0, 2.5, 0);
  // Multi-tier pagoda hip roofs
  for (let r = 0; r < 3; r++) {
    const rGeo = new THREE.ConeGeometry(13 - r * 2.5, 3.2, 4);
    const rRoof = new THREE.Mesh(rGeo, new THREE.MeshLambertMaterial({ color: 0xb45309 }));
    rRoof.rotateY(Math.PI / 4);
    rRoof.position.set(0, 5 + r * 2.8, 0);
    gopuram.add(rRoof);
  }
  gopuram.add(gBase);
  gopuram.position.set(0, 0, -22);
  thrissurGroup.add(gopuram);
  colliders.push({ minX: 72, maxX: 88, minZ: -98, maxZ: -86 });

  // 7C. Caparisoned Pooram Elephant Statues with Gold Nettipattam & Parasols
  for (let e = -1; e <= 1; e++) {
    const eleGroup = new THREE.Group();
    // Body & Head
    const eBody = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.8, 4.2), new THREE.MeshLambertMaterial({ color: 0x374151 }));
    eBody.position.set(0, 2.5, 0);
    const eHead = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 10), new THREE.MeshLambertMaterial({ color: 0x374151 }));
    eHead.position.set(0, 3.4, 2.4);
    // Golden Nettipattam Forehead Ornament
    const nettipattam = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.8), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    nettipattam.position.set(0, 3.4, 3.75);
    // Colorful Muthukkuda Parasol on Back
    const parasolPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.2, 8), woodMat);
    parasolPole.position.set(0, 4.8, 0);
    const parasolDome = new THREE.Mesh(new THREE.ConeGeometry(1.8, 0.9, 12), crimsonRedMat);
    parasolDome.position.set(0, 6.2, 0);
    eleGroup.add(eBody, eHead, nettipattam, parasolPole, parasolDome);
    eleGroup.position.set(e * 9, 0, 10);
    thrissurGroup.add(eleGroup);
    colliders.push({ minX: 80 + e * 9 - 2, maxX: 80 + e * 9 + 2, minZ: -63, maxZ: -57 });
  }

  mapGroup.add(thrissurGroup);

  // =========================================================================
  // 8. 🏙️ ERNAKULAM — MEGA METROPOLIS & METRO (X: 0, Z: 0)
  // Corporate High Rises, Elevated Kochi Metro Viaduct with Train Overhead,
  // Marine Drive Promenade & Commercial Downtown
  // =========================================================================
  const ernakulamGroup = new THREE.Group();
  ernakulamGroup.position.set(0, 0, 0);

  // 8A. Glass Skyscraper Towers & Modern High-Rises
  const towerConfigs: { x: number; z: number; w: number; h: number; d: number; col: number }[] = [
    { x: -55, z: -40, w: 18, h: 36, d: 16, col: 0x0284c7 }, // Blue Glass Tower
    { x: 55, z: -35, w: 16, h: 42, d: 18, col: 0x0f766e },  // Teal Tech Hub
    { x: -52, z: 35, w: 16, h: 32, d: 15, col: 0x334155 },  // Granite Tower
  ];

  towerConfigs.forEach((tc) => {
    const tMesh = new THREE.Mesh(
      new THREE.BoxGeometry(tc.w, tc.h, tc.d),
      new THREE.MeshLambertMaterial({ color: tc.col })
    );
    tMesh.position.set(tc.x, tc.h / 2, tc.z);
    ernakulamGroup.add(tMesh);
    colliders.push({
      minX: tc.x - tc.w / 2 - 1,
      maxX: tc.x + tc.w / 2 + 1,
      minZ: tc.z - tc.d / 2 - 1,
      maxZ: tc.z + tc.d / 2 + 1,
    });

    // Rooftop Red Flashing Aircraft Warning Light
    const bLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xef4444 })
    );
    bLight.position.set(tc.x, tc.h + 0.5, tc.z);
    ernakulamGroup.add(bLight);
    animObstacleLights.push(bLight);
  });

  // 8B. 🚇 Elevated Pune Metro Purple Line Viaduct & High-Speed Train
  // =========================================================================
  // 8B. 🚇 COLOSSAL DUAL-SIDED CONNECTED METRO SYSTEM & 734M TRANSIT LOOP
  // Spanning both sides of the metropolis:
  // - North Viaduct Corridor at Z = -15 (Length 320m, X: -160 to +160)
  // - South Viaduct Corridor on the OTHER SIDE at Z = +15 (Length 320m, X: -160 to +160)
  // - East 180° Sweeping Curved Connector Viaduct attaching North to South (R = 15m)
  // - West 180° Sweeping Curved Connector Viaduct attaching South to North (R = 15m)
  // - Overhead Pedestrian Concourse Skybridge attaching stations across the street
  // - Animated High-Speed Metro Train cruising continuously around the full loop!
  // =========================================================================
  const metroGroup = new THREE.Group();

  const viaductY = 9.5;
  const straightLength = 320;
  const halfSpan = straightLength / 2; // 160
  const curveRadius = 15;
  const deckW = 6.4;

  const deckMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const parapetMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const purpleTrimMat = new THREE.MeshLambertMaterial({ color: 0xc026d3 });
  const railMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
  const sleeperMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const pillarMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const pierCapMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const mastMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
  const copperWireMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.2 });

  // -------------------------------------------------------------------------
  // Helper: Build a Straight Viaduct Section (Used for North & South corridors)
  // -------------------------------------------------------------------------
  function buildStraightViaduct(zLine: number, isNorth: boolean) {
    const section = new THREE.Group();

    // 1. Concrete Viaduct Deck Slab
    const deck = new THREE.Mesh(new THREE.BoxGeometry(straightLength, 1.2, deckW), deckMat);
    deck.position.set(0, viaductY, zLine);
    deck.receiveShadow = true;
    section.add(deck);

    // 2. Parapet Crash Barriers with Glowing Purple Line LED Strip
    [-deckW / 2 + 0.16, deckW / 2 - 0.16].forEach((edgeZ) => {
      const parapet = new THREE.Mesh(new THREE.BoxGeometry(straightLength, 1.15, 0.32), parapetMat);
      parapet.position.set(0, viaductY + 1.15, zLine + edgeZ);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(straightLength, 0.14, 0.36), purpleTrimMat);
      trim.position.set(0, viaductY + 1.2, zLine + edgeZ);

      section.add(parapet, trim);
    });

    // 3. Steel Rails
    [-0.72, 0.72].forEach((trackZ) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(straightLength, 0.12, 0.08), railMat);
      rail.position.set(0, viaductY + 0.66, zLine + trackZ);
      section.add(rail);
    });

    // 4. Concrete Railway Sleepers
    for (let sx = -halfSpan + 2; sx <= halfSpan - 2; sx += 2.0) {
      const sleeper = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 2.5), sleeperMat);
      sleeper.position.set(sx, viaductY + 0.62, zLine);
      section.add(sleeper);
    }

    // 5. Heavy Hammerhead Concrete Support Pillars (spaced every 24m)
    for (let px = -halfSpan + 16; px <= halfSpan - 16; px += 24) {
      const pCol = new THREE.Mesh(new THREE.BoxGeometry(2.4, viaductY, 2.4), pillarMat);
      pCol.position.set(px, viaductY / 2, zLine);
      pCol.castShadow = true;
      section.add(pCol);
      colliders.push({ minX: px - 1.5, maxX: px + 1.5, minZ: zLine - 1.5, maxZ: zLine + 1.5 });

      const pCap = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.9, deckW), pierCapMat);
      pCap.position.set(px, viaductY - 0.45, zLine);
      section.add(pCap);

      // Catenary Portal Mast Gantry
      const mastL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 5.2, 0.18), mastMat);
      mastL.position.set(px, viaductY + 3.1, zLine - 2.9);
      const mastR = mastL.clone();
      mastR.position.set(px, viaductY + 3.1, zLine + 2.9);
      const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 6.0), mastMat);
      crossBeam.position.set(px, viaductY + 5.6, zLine);
      const dropper = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), new THREE.MeshLambertMaterial({ color: 0x7c2d12 }));
      dropper.position.set(px, viaductY + 5.3, zLine);
      section.add(mastL, mastR, crossBeam, dropper);
    }

    // 6. Overhead Contact Wire
    const wire = new THREE.Mesh(new THREE.BoxGeometry(straightLength, 0.03, 0.03), copperWireMat);
    wire.position.set(0, viaductY + 5.1, zLine);
    section.add(wire);

    return section;
  }

  // 1. North Viaduct Corridor (Z = -15)
  metroGroup.add(buildStraightViaduct(-15, true));

  // 2. South Viaduct Corridor ON THE OTHER SIDE (Z = +15)
  metroGroup.add(buildStraightViaduct(15, false));

  // -------------------------------------------------------------------------
  // Helper: Build a Sweeping 180° Curved Viaduct (Attaching North to South!)
  // -------------------------------------------------------------------------
  function buildCurvedConnectorViaduct(centerX: number, isEast: boolean) {
    const curveGroup = new THREE.Group();
    const segments = 16;
    const angleStart = isEast ? -Math.PI / 2 : Math.PI / 2;
    const angleSweep = Math.PI;
    const segAngle = angleSweep / segments;

    for (let i = 0; i < segments; i++) {
      const a1 = angleStart + i * segAngle;
      const a2 = angleStart + (i + 1) * segAngle;
      const midA = (a1 + a2) / 2;
      const segLen = curveRadius * segAngle * 1.04;

      const segX = centerX + Math.cos(midA) * curveRadius;
      const segZ = Math.sin(midA) * curveRadius;
      const rotY = -midA + Math.PI / 2;

      // Curved Deck Segment
      const deckSeg = new THREE.Mesh(new THREE.BoxGeometry(segLen, 1.2, deckW), deckMat);
      deckSeg.position.set(segX, viaductY, segZ);
      deckSeg.rotation.y = rotY;
      curveGroup.add(deckSeg);

      // Outer & Inner Parapets with Purple Trim
      [-deckW / 2 + 0.16, deckW / 2 - 0.16].forEach((rOffset) => {
        const rad = curveRadius + (isEast ? rOffset : -rOffset);
        const pX = centerX + Math.cos(midA) * rad;
        const pZ = Math.sin(midA) * rad;

        const pSeg = new THREE.Mesh(new THREE.BoxGeometry(segLen, 1.15, 0.32), parapetMat);
        pSeg.position.set(pX, viaductY + 1.15, pZ);
        pSeg.rotation.y = rotY;

        const trimSeg = new THREE.Mesh(new THREE.BoxGeometry(segLen, 0.14, 0.36), purpleTrimMat);
        trimSeg.position.set(pX, viaductY + 1.2, pZ);
        trimSeg.rotation.y = rotY;

        curveGroup.add(pSeg, trimSeg);
      });

      // Curved Dual Steel Rails
      [-0.72, 0.72].forEach((trackOffset) => {
        const rRad = curveRadius + (isEast ? trackOffset : -trackOffset);
        const rX = centerX + Math.cos(midA) * rRad;
        const rZ = Math.sin(midA) * rRad;

        const railSeg = new THREE.Mesh(new THREE.BoxGeometry(segLen, 0.12, 0.08), railMat);
        railSeg.position.set(rX, viaductY + 0.66, rZ);
        railSeg.rotation.y = rotY;
        curveGroup.add(railSeg);
      });

      // Concrete Sleepers
      const sleeperSeg = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.08, 2.5), sleeperMat);
      sleeperSeg.position.set(segX, viaductY + 0.62, segZ);
      sleeperSeg.rotation.y = rotY;
      curveGroup.add(sleeperSeg);

      // Support Columns at Quarter Points
      if (i % 4 === 0) {
        const pCol = new THREE.Mesh(new THREE.BoxGeometry(2.4, viaductY, 2.4), pillarMat);
        pCol.position.set(segX, viaductY / 2, segZ);
        pCol.castShadow = true;
        curveGroup.add(pCol);
        colliders.push({ minX: segX - 1.5, maxX: segX + 1.5, minZ: segZ - 1.5, maxZ: segZ + 1.5 });

        const pCap = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.9, deckW), pierCapMat);
        pCap.position.set(segX, viaductY - 0.45, segZ);
        pCap.rotation.y = rotY;
        curveGroup.add(pCap);
      }
    }

    return curveGroup;
  }

  // 3. East Curved Connector Viaduct (attaching North track at Z = -15 across to South track at Z = +15!)
  metroGroup.add(buildCurvedConnectorViaduct(halfSpan, true));

  // 4. West Curved Connector Viaduct (attaching South track at Z = +15 across to North track at Z = -15!)
  metroGroup.add(buildCurvedConnectorViaduct(-halfSpan, false));

  // 5. Cable-Stayed Metro Bridge Pylon where viaduct crosses Eastern Canal (X = 90)
  const pylonMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25, metalness: 0.4 });
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6 });

  // A-Frame Cable Stayed Tower on canal bank between North & South lines
  const towerA = new THREE.Mesh(new THREE.BoxGeometry(2.2, 28, 2.2), pylonMat);
  towerA.position.set(90, 14, 0);
  towerA.castShadow = true;
  metroGroup.add(towerA);

  // Radiant Harp Stay Cables attaching tower to North & South viaduct decks
  [-1, 1].forEach((dirZ) => {
    for (let c = 0; c < 5; c++) {
      const cableY = 18 + c * 2.2;
      const targetX = 90 + (c - 2) * 16;
      const targetZ = dirZ * 15;

      const cLen = Math.sqrt(Math.pow(targetX - 90, 2) + Math.pow(cableY - viaductY, 2) + Math.pow(targetZ, 2));
      const stayCable = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, cLen, 6), cableMat);
      stayCable.position.set((90 + targetX) / 2, (cableY + viaductY) / 2, targetZ / 2);
      stayCable.lookAt(targetX, viaductY, targetZ);
      stayCable.rotateX(Math.PI / 2);
      metroGroup.add(stayCable);
    }
  });

  // =========================================================================
  // ELEVATED PASSENGER STATIONS ON BOTH SIDES & CONNECTING CROSS-AVENUE SKYBRIDGE
  // =========================================================================

  // Station 1: North Elevated MG Road Central Station (Z = -15)
  const st1Deck = new THREE.Mesh(new THREE.BoxGeometry(64, 0.8, 4.2), new THREE.MeshLambertMaterial({ color: 0xe2e8f0 }));
  st1Deck.position.set(0, viaductY + 0.8, -10.8);
  const st1Canopy = new THREE.Mesh(new THREE.BoxGeometry(66, 0.25, 5.2), new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.65 }));
  st1Canopy.position.set(0, viaductY + 4.7, -10.8);
  st1Canopy.rotation.x = -0.06;
  metroGroup.add(st1Deck, st1Canopy);

  // Station 2: South Elevated Marine Drive Promenade Station ON THE OTHER SIDE (Z = +15)
  const st2Deck = new THREE.Mesh(new THREE.BoxGeometry(64, 0.8, 4.2), new THREE.MeshLambertMaterial({ color: 0xe2e8f0 }));
  st2Deck.position.set(0, viaductY + 0.8, 10.8);
  const st2Canopy = new THREE.Mesh(new THREE.BoxGeometry(66, 0.25, 5.2), new THREE.MeshStandardMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.65 }));
  st2Canopy.position.set(0, viaductY + 4.7, 10.8);
  st2Canopy.rotation.x = 0.06;
  metroGroup.add(st2Deck, st2Canopy);

  // Modern Cross-Avenue Pedestrian Concourse Glass Skybridge (Attaching North to South across the street!)
  const skybridgeGlass = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 3.2, 30.0),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 })
  );
  skybridgeGlass.position.set(0, viaductY + 2.2, 0);

  const skybridgeFloor = new THREE.Mesh(
    new THREE.BoxGeometry(5.4, 0.45, 30.0),
    new THREE.MeshLambertMaterial({ color: 0x1e293b })
  );
  skybridgeFloor.position.set(0, viaductY + 0.75, 0);
  metroGroup.add(skybridgeGlass, skybridgeFloor);

  // Center Street Elevator Shaft & Covered Stairs descending to road level (X: 0, Z: 0)
  const centerStairs = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, viaductY + 1.2, 3.8),
    new THREE.MeshLambertMaterial({ color: 0x475569 })
  );
  centerStairs.position.set(0, (viaductY + 1.2) / 2, 0);
  centerStairs.castShadow = true;
  metroGroup.add(centerStairs);
  colliders.push({ minX: -2.8, maxX: 2.8, minZ: -2.2, maxZ: 2.2 });

  // Station Bilingual Neon Signboard
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 96;
  const sCtx = signCanvas.getContext('2d')!;
  sCtx.fillStyle = '#7e22ce';
  sCtx.fillRect(0, 0, 512, 96);
  sCtx.fillStyle = '#ffffff';
  sCtx.font = '900 30px sans-serif';
  sCtx.textAlign = 'center';
  sCtx.fillText('KOCHI METRO CENTRAL INTERCHANGE', 256, 40);
  sCtx.font = 'bold 18px sans-serif';
  sCtx.fillStyle = '#fde047';
  sCtx.fillText('★ PURPLE LOOP LINE • പർപ്പിൾ ലൂപ്പ് ലൈൻ ★', 256, 72);
  const signTex = new THREE.CanvasTexture(signCanvas);
  const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 1.6), new THREE.MeshBasicMaterial({ map: signTex }));
  signMesh.position.set(0, viaductY + 3.2, -8.6);
  metroGroup.add(signMesh);

  // Modern Pune Metro Purple Line 3-Car Trainset (Titagarh Firema coach model)
  const metroTrainData = buildPuneMetroTrain();
  const metroTrain = metroTrainData.group;
  metroTrain.rotation.y = Math.PI / 2;
  metroTrain.position.set(0, viaductY + 0.72, -15);
  metroGroup.add(metroTrain);

  // Save reference for animation updates
  animMetroTrain = metroTrainData;

  ernakulamGroup.add(metroGroup);

  // 8C. Marine Drive Rainbow Bridge Walkway Arch
  const rainbowBridge = new THREE.Mesh(
    new THREE.TorusGeometry(12, 0.8, 8, 24, Math.PI),
    new THREE.MeshLambertMaterial({ color: 0xfacc15 })
  );
  rainbowBridge.position.set(38, 0, 25);
  rainbowBridge.rotation.z = 0;
  ernakulamGroup.add(rainbowBridge);

  mapGroup.add(ernakulamGroup);

  // =========================================================================
  // 9. 🌿 IDUKKI — HIGH RANGES & ARCH DAM (X: -130, Z: 50)
  // Asia's Largest Double-Curvature Arch Dam, High Mountain Reservoir & Gorge
  // =========================================================================
  const idukkiGroup = new THREE.Group();
  idukkiGroup.position.set(-130, 0, 50);

  // 9A. Massive Curved Concrete Arch Dam Wall (ആർച്ച് ഡാം)
  const damCurve = new THREE.Mesh(
    new THREE.CylinderGeometry(36, 42, 22, 24, 1, true, 0, Math.PI * 0.55),
    new THREE.MeshLambertMaterial({ color: 0x64748b, side: THREE.DoubleSide })
  );
  damCurve.rotateY(Math.PI / 3);
  damCurve.position.set(0, 11, 0);
  idukkiGroup.add(damCurve);
  colliders.push({ minX: -155, maxX: -110, minZ: 35, maxZ: 65 });

  // Dam Crest Highway Roadway (along top of dam wall)
  const damRoadway = new THREE.Mesh(new THREE.BoxGeometry(45, 1.2, 4.5), asphaltMat);
  damRoadway.position.set(0, 22.5, 0);
  damRoadway.rotateY(0.4);
  idukkiGroup.add(damRoadway);

  // Hydro Reservoir Lake Water (behind the dam wall)
  const resLake = new THREE.Mesh(
    new THREE.PlaneGeometry(65, 55),
    new THREE.MeshPhongMaterial({ color: 0x0369a1, emissive: 0x082f49, shininess: 130, transparent: true, opacity: 0.9 })
  );
  resLake.rotateX(-Math.PI / 2);
  resLake.position.set(0, 18, -26);
  idukkiGroup.add(resLake);
  waterObjects.push(resLake);

  // Hydro Powerhouse Turbine Station at Dam Base
  const powerHouse = new THREE.Mesh(new THREE.BoxGeometry(14, 6.5, 9), new THREE.MeshLambertMaterial({ color: 0x334155 }));
  powerHouse.position.set(8, 3.25, 20);
  idukkiGroup.add(powerHouse);
  colliders.push({ minX: -126, maxX: -114, minZ: 65, maxZ: 75 });

  mapGroup.add(idukkiGroup);

  // =========================================================================
  // 10. 🌴 KOTTAYAM — RUBBER PLANTATIONS & MODERN HOSPITAL (X: 50, Z: 65)
  // Rubber Tree Estates with Latex Cups, Syrian Christian Heritage Church,
  // AND THE NEW FULLY-CONVERTED MODERN LOW-POLY HOSPITAL COMPLEX (image.png)!
  // =========================================================================
  const kottayamGroup = new THREE.Group();
  kottayamGroup.position.set(50, 0, 65);

  // 10A. Vast Rubber Tree Plantation with latex tapping incisions & coconut shells
  for (let rx of [-36, -26, -16]) {
    for (let rz of [-24, -14, -4]) {
      const rTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 7.5, 8), woodMat);
      rTrunk.position.set(rx, 3.75, rz);
      // Latex cup (half coconut shell)
      const rCup = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6, 0, Math.PI * 2, 0, Math.PI / 2), whiteWallMat);
      rCup.position.set(rx + 0.28, 1.8, rz);
      // Foliage canopy
      const rFoliage = new THREE.Mesh(new THREE.SphereGeometry(2.4, 8, 8), new THREE.MeshLambertMaterial({ color: 0x15803d }));
      rFoliage.position.set(rx, 8.2, rz);
      kottayamGroup.add(rTrunk, rCup, rFoliage);
    }
  }

  // 10B. Traditional Syrian Christian Heritage Church with White Bell Tower & Cross
  const church = new THREE.Group();
  const cBody = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 22), whiteWallMat);
  cBody.position.set(0, 4, 0);
  const cRoof = new THREE.Mesh(new THREE.ConeGeometry(11, 4.5, 4), tileRoofMat);
  cRoof.rotateY(Math.PI / 4);
  cRoof.position.set(0, 9.8, 0);
  // Tall Square Bell Tower (മണിമേട)
  const bTower = new THREE.Mesh(new THREE.BoxGeometry(4.8, 16, 4.8), whiteWallMat);
  bTower.position.set(0, 8, 12);
  const bSpire = new THREE.Mesh(new THREE.ConeGeometry(3.6, 6, 4), crimsonRedMat);
  bSpire.rotateY(Math.PI / 4);
  bSpire.position.set(0, 19, 12);
  // Gold Church Cross
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.45, 0.3), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  crossH.position.set(0, 22.8, 12);
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.45, 3.2, 0.3), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  crossV.position.set(0, 22.8, 12);
  church.add(cBody, cRoof, bTower, bSpire, crossH, crossV);
  church.position.set(-28, 0, 22);
  kottayamGroup.add(church);
  colliders.push({ minX: 16, maxX: 32, minZ: 76, maxZ: 98 });

  // =========================================================================
  // 🏥 CONVERTED MODERN LOW-POLY HOSPITAL COMPLEX (IMAGE.PNG)
  // Multi-tier white wings, crimson horizontal accent stripes, grand red entrance
  // arch portal with glass doors, rhythmic cyan tinted windows, and prominent
  // circular ROOFTOP HELIPAD with bold white 'H' and obstacle lighting!
  // =========================================================================
  const hospComplex = new THREE.Group();
  hospComplex.position.set(16, 0, 0); // Positioned inside Kottayam East Sector

  // 1. Main Central Medical Tower (3-Story Modern Block)
  const mainTowerW = 28;
  const mainTowerH = 13.5;
  const mainTowerD = 18;
  const mainTower = new THREE.Mesh(
    new THREE.BoxGeometry(mainTowerW, mainTowerH, mainTowerD),
    whiteWallMat
  );
  mainTower.position.set(0, mainTowerH / 2, 0);
  hospComplex.add(mainTower);

  // Horizontal Crimson / Red Accent Ledge Trims (as seen in image.png)
  for (let f = 1; f <= 3; f++) {
    const accentBand = new THREE.Mesh(
      new THREE.BoxGeometry(mainTowerW + 0.4, 0.55, mainTowerD + 0.4),
      crimsonRedMat
    );
    accentBand.position.set(0, f * 4.2, 0);
    hospComplex.add(accentBand);
  }

  // 2. Left Clinical Wing (2-Story stepped wing)
  const leftWing = new THREE.Mesh(
    new THREE.BoxGeometry(14, 9.2, 14),
    whiteWallMat
  );
  leftWing.position.set(-18, 4.6, 0);
  const leftWingTrim = new THREE.Mesh(
    new THREE.BoxGeometry(14.4, 0.5, 14.4),
    crimsonRedMat
  );
  leftWingTrim.position.set(-18, 9.3, 0);
  hospComplex.add(leftWing, leftWingTrim);

  // 3. Right Outpatient & Diagnostic Wing (2-Story stepped wing)
  const rightWing = new THREE.Mesh(
    new THREE.BoxGeometry(14, 9.2, 14),
    whiteWallMat
  );
  rightWing.position.set(18, 4.6, 0);
  const rightWingTrim = new THREE.Mesh(
    new THREE.BoxGeometry(14.4, 0.5, 14.4),
    crimsonRedMat
  );
  rightWingTrim.position.set(18, 9.3, 0);
  hospComplex.add(rightWing, rightWingTrim);

  // 4. Facade Window Grid (Light Cyan tinted glass with dark mullion frames)
  for (let floor = 0; floor < 3; floor++) {
    const wy = 2.4 + floor * 4.2;
    for (let wx = -10; wx <= 10; wx += 5) {
      // Main tower front windows
      const winGlass = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.9, 0.2), darkGlassMat);
      winGlass.position.set(wx, wy, mainTowerD / 2 + 0.08);
      hospComplex.add(winGlass);
    }
    // Wings windows
    if (floor < 2) {
      for (let wx of [-22, -15, 15, 22]) {
        const wingWin = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.8, 0.2), darkGlassMat);
        wingWin.position.set(wx, wy, 7.08);
        hospComplex.add(wingWin);
      }
    }
  }

  // 5. Grand Red Arched Entrance Portal (Matching image.png)
  const portalGroup = new THREE.Group();
  // Projecting Red Canopy Frame
  const portalArch = new THREE.Mesh(
    new THREE.BoxGeometry(10.5, 4.8, 5.5),
    crimsonRedMat
  );
  portalArch.position.set(0, 2.4, mainTowerD / 2 + 2.5);
  // Recessed Entrance Portal Foyer
  const portalCutout = new THREE.Mesh(
    new THREE.BoxGeometry(7.8, 3.8, 5.8),
    new THREE.MeshLambertMaterial({ color: 0x0f172a })
  );
  portalCutout.position.set(0, 1.9, mainTowerD / 2 + 2.6);
  // Automatic Glass Sliding Double Doors
  const doorGlass = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 3.2, 0.15),
    new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  );
  doorGlass.position.set(0, 1.6, mainTowerD / 2 + 1.2);
  // Red Cross / Medical Signboard above Entrance
  const crossPlinth = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 1.1, 0.2),
    whiteWallMat
  );
  crossPlinth.position.set(0, 5.2, mainTowerD / 2 + 5.3);
  const rcCrossH = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.25), crimsonRedMat);
  rcCrossH.position.set(0, 5.2, mainTowerD / 2 + 5.4);
  const rcCrossV = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.4, 0.25), crimsonRedMat);
  rcCrossV.position.set(0, 5.2, mainTowerD / 2 + 5.4);

  // Entrance Concrete Ramp & Yellow Safety Apron
  const rampMesh = new THREE.Mesh(
    new THREE.BoxGeometry(9.5, 0.25, 4.2),
    new THREE.MeshLambertMaterial({ color: 0x475569 })
  );
  rampMesh.position.set(0, 0.12, mainTowerD / 2 + 6.8);
  portalGroup.add(portalArch, portalCutout, doorGlass, crossPlinth, rcCrossH, rcCrossV, rampMesh);
  hospComplex.add(portalGroup);

  // 6. 🚁 PROMINENT CIRCULAR ROOFTOP HELIPAD (image.png)
  const helipadGroup = new THREE.Group();
  helipadGroup.position.set(0, mainTowerH + 0.1, 0);

  // Elevated Helipad Round Platform
  const padRadius = 7.2;
  const padGeo = new THREE.CylinderGeometry(padRadius, padRadius, 0.45, 32);
  const padMesh = new THREE.Mesh(padGeo, new THREE.MeshLambertMaterial({ color: 0x334155 }));
  padMesh.position.set(0, 0.22, 0);
  helipadGroup.add(padMesh);

  // Painted Red Circular Border Ring on Helipad
  const ringGeo = new THREE.RingGeometry(5.8, 6.8, 32);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMesh = new THREE.Mesh(ringGeo, crimsonRedMat);
  ringMesh.position.set(0, 0.46, 0);
  helipadGroup.add(ringMesh);

  // Bold Crisp White 'H' Symbol (Helipad Identification)
  const hBarL = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 4.6), whiteLineMat);
  hBarL.rotateX(-Math.PI / 2);
  hBarL.position.set(-1.6, 0.47, 0);
  const hBarR = hBarL.clone();
  hBarR.position.set(1.6, 0.47, 0);
  const hBarMid = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.85), whiteLineMat);
  hBarMid.rotateX(-Math.PI / 2);
  hBarMid.position.set(0, 0.47, 0);
  helipadGroup.add(hBarL, hBarR, hBarMid);

  // Helipad Perimeter Safety Netting & Yellow Warning Lights
  for (let pa = 0; pa < Math.PI * 2; pa += Math.PI / 8) {
    const pLight = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xfacc15 })
    );
    pLight.position.set(Math.cos(pa) * (padRadius - 0.2), 0.55, Math.sin(pa) * (padRadius - 0.2));
    helipadGroup.add(pLight);
  }

  // 7. Rooftop Infrastructure: Elevator Penthouse, Antenna & AC Chillers
  const penthouse = new THREE.Mesh(
    new THREE.BoxGeometry(5.5, 3.2, 5.0),
    whiteWallMat
  );
  penthouse.position.set(10.5, 1.6, 5);
  helipadGroup.add(penthouse);

  // AC Chiller Units
  for (let cx of [-10, -7]) {
    const chiller = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 1.6, 2.8),
      new THREE.MeshLambertMaterial({ color: 0x64748b })
    );
    chiller.position.set(cx, 0.8, -5);
    helipadGroup.add(chiller);
  }

  // Communications Mast with Blinking Obstacle Red Light
  const mast = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 6.5, 8),
    new THREE.MeshLambertMaterial({ color: 0xd4d4d8 })
  );
  mast.position.set(10.5, 6.2, 5);
  const mastLight = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xef4444 })
  );
  mastLight.position.set(10.5, 9.6, 5);
  helipadGroup.add(mast, mastLight);
  animObstacleLights.push(mastLight);

  hospComplex.add(helipadGroup);

  // 8. 🚑 108 AMBULANCE CASUALTY EMERGENCY WING & BAY
  const casualtyWing = new THREE.Group();
  casualtyWing.position.set(-18, 0, 10);

  // Driveway Apron
  const ambApron = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 12),
    asphaltMat
  );
  ambApron.rotateX(-Math.PI / 2);
  ambApron.position.set(0, 0.06, 0);
  casualtyWing.add(ambApron);

  // Overhead Ambulance Portico Canopy with Red Cross
  const ambCanopy = new THREE.Mesh(new THREE.BoxGeometry(14, 0.4, 9), crimsonRedMat);
  ambCanopy.position.set(0, 4.4, 0);
  // Support Columns
  for (let cx of [-6.2, 6.2]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 4.4, 8), whiteWallMat);
    col.position.set(cx, 2.2, 4);
    casualtyWing.add(col);
  }
  const ambSign = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 0.2), whiteWallMat);
  ambSign.position.set(0, 4.9, 4.45);
  casualtyWing.add(ambCanopy, ambSign);

  // Park the Type III Box Ambulance inside the bay
  const { group: ambulance } = buildAmericanBoxAmbulance();
  ambulance.position.set(0, 0, 0);
  casualtyWing.add(ambulance);

  hospComplex.add(casualtyWing);

  // Hospital Colliders (incorporating the new multi-wing layout)
  colliders.push({ minX: 42, maxX: 92, minZ: 52, maxZ: 78 });

  kottayamGroup.add(hospComplex);
  mapGroup.add(kottayamGroup);

  // =========================================================================
  // 11. 🚤 ALAPPUZHA — BACKWATERS & HOUSEBOATS (X: -80, Z: 120)
  // Venice of the East, Kettuvallam Thatched Houseboat, Chundan Snake Boat,
  // Interconnected Canals & Chinese Fishing Nets
  // =========================================================================
  const alappuzhaGroup = new THREE.Group();
  alappuzhaGroup.position.set(-80, 0, 120);

  // 11A. Wide Backwater Basin (കായൽ)
  const bwBasin = new THREE.Mesh(
    new THREE.PlaneGeometry(130, 95),
    new THREE.MeshPhongMaterial({ color: 0x0e7490, emissive: 0x083344, shininess: 120, transparent: true, opacity: 0.88 })
  );
  bwBasin.rotateX(-Math.PI / 2);
  bwBasin.position.set(0, -0.45, 0);
  alappuzhaGroup.add(bwBasin);
  waterObjects.push(bwBasin);

  // 11B. Authentic Kerala Kettuvallam (Houseboat) with Bamboo Thatch Roof
  const hBoat = new THREE.Group();
  const hHull = new THREE.Mesh(new THREE.BoxGeometry(6.8, 1.9, 24), new THREE.MeshLambertMaterial({ color: 0x3f1f0a }));
  hHull.position.y = 0.55;
  const hThatch = new THREE.Mesh(
    new THREE.CylinderGeometry(3.8, 3.8, 18, 14, 1, false, 0, Math.PI),
    new THREE.MeshLambertMaterial({ color: 0xb45309, side: THREE.DoubleSide })
  );
  hThatch.rotateX(Math.PI / 2);
  hThatch.position.set(0, 2.3, 0);
  const hDeck = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.35, 4.5), new THREE.MeshLambertMaterial({ color: 0x78350f }));
  hDeck.position.set(0, 1.25, 10.5);
  hBoat.add(hHull, hThatch, hDeck);
  hBoat.position.set(-18, 0, 5);
  alappuzhaGroup.add(hBoat);
  colliders.push({ minX: -105, maxX: -91, minZ: 110, maxZ: 135 });

  // 11C. Nehru Trophy Chundan Vallam (100-Oarsmen Snake Boat)
  const snakeBoat = new THREE.Group();
  const sbHull = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 32), new THREE.MeshLambertMaterial({ color: 0x18181b }));
  sbHull.position.set(0, 0.45, 0);
  // High Prow Stern Curving Upwards (അമരം)
  const sbStern = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.6, 5.5, 8), new THREE.MeshLambertMaterial({ color: 0xb45309 }));
  sbStern.position.set(0, 2.6, -15.5);
  sbStern.rotateX(-0.4);
  snakeBoat.add(sbHull, sbStern);
  snakeBoat.position.set(14, 0, 8);
  alappuzhaGroup.add(snakeBoat);

  // 11D. Chinese Fishing Net (ചീനവല) on Canal Shore
  const cNet = new THREE.Group();
  const cBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 12, 8), woodMat);
  cBeam.rotateZ(Math.PI / 3);
  cBeam.position.set(4, 5, 0);
  const netMesh = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ color: 0xd4d4d8, wireframe: true }));
  netMesh.rotateX(Math.PI / 2.2);
  netMesh.position.set(9, 1.2, 0);
  cNet.add(cBeam, netMesh);
  cNet.position.set(38, 0, -15);
  alappuzhaGroup.add(cNet);

  mapGroup.add(alappuzhaGroup);

  // =========================================================================
  // 12. 🌲 PATHANAMTHITTA — PILGRIM FORESTS & PAMBA RIVER (X: 110, Z: 150)
  // Dense Sabarimala Teak Forests, Holy Pamba River Bathing Ghats, Suspension Bridge
  // =========================================================================
  const pathanamthittaGroup = new THREE.Group();
  pathanamthittaGroup.position.set(110, 0, 150);

  // 12A. Holy Pamba River Waters & Stone Ghat Steps
  const pambaWater = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 24),
    new THREE.MeshPhongMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85 })
  );
  pambaWater.rotateX(-Math.PI / 2);
  pambaWater.position.set(0, -0.2, 0);
  pathanamthittaGroup.add(pambaWater);
  waterObjects.push(pambaWater);

  // Stone Bathing Steps (കടവ്)
  for (let s = 0; s < 4; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(28, 0.35, 1.6), new THREE.MeshLambertMaterial({ color: 0x94a3b8 }));
    step.position.set(0, 0.15 + s * 0.35, 12 + s * 1.6);
    pathanamthittaGroup.add(step);
  }

  // 12B. Wooden Suspension Footbridge over Pamba River
  const suspBridge = new THREE.Group();
  const plankWay = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.35, 26), woodMat);
  plankWay.position.set(0, 2.2, 0);
  // Suspension Cables & Towers
  for (let tx of [-2.4, 2.4]) {
    const towerL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 6, 0.35), new THREE.MeshLambertMaterial({ color: 0x334155 }));
    towerL.position.set(tx, 3, -12);
    const towerR = towerL.clone();
    towerR.position.set(tx, 3, 12);
    suspBridge.add(towerL, towerR);
  }
  suspBridge.add(plankWay);
  suspBridge.position.set(-20, 0, 0);
  pathanamthittaGroup.add(suspBridge);

  // 12C. Dense Teak Reserve Forest Canopy
  for (let fx of [-28, -12, 12, 28]) {
    for (let fz of [-24, -14, 18, 28]) {
      const fTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 9, 8), woodMat);
      fTrunk.position.set(fx, 4.5, fz);
      const fLeaf = new THREE.Mesh(new THREE.SphereGeometry(3.2, 8, 8), new THREE.MeshLambertMaterial({ color: 0x14532d }));
      fLeaf.position.set(fx, 10, fz);
      pathanamthittaGroup.add(fTrunk, fLeaf);
    }
  }

  mapGroup.add(pathanamthittaGroup);

  // =========================================================================
  // 13. 🌊 KOLLAM — HISTORIC PORT & ASHTAMUDI (X: 0, Z: 230)
  // Ashtamudi 8-Arm Lake, Tangasseri Red-and-White Lighthouse, Fishing Harbour
  // =========================================================================
  const kollamGroup = new THREE.Group();
  kollamGroup.position.set(0, 0, 230);

  // 13A. Ashtamudi Lake Water Basin
  const ashtamudi = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 65),
    new THREE.MeshPhongMaterial({ color: 0x0891b2, emissive: 0x064e3b, shininess: 120, transparent: true, opacity: 0.88 })
  );
  ashtamudi.rotateX(-Math.PI / 2);
  ashtamudi.position.set(0, -0.4, 0);
  kollamGroup.add(ashtamudi);
  waterObjects.push(ashtamudi);

  // 13B. Tangasseri Iconic Red-and-White Striped Lighthouse (ലൈറ്റ്ഹൗസ്)
  const lighthouse = new THREE.Group();
  for (let s = 0; s < 6; s++) {
    const sMat = s % 2 === 0 ? crimsonRedMat : whiteWallMat;
    const rBot = 3.6 - s * 0.22;
    const rTop = rBot - 0.22;
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, 4.2, 14), sMat);
    cyl.position.y = 2.1 + s * 4.2;
    lighthouse.add(cyl);
  }
  // Lantern Room & Balcony
  const lhBalcony = new THREE.Mesh(new THREE.CylinderGeometry(3.4, 3.4, 0.5, 14), new THREE.MeshLambertMaterial({ color: 0x1e293b }));
  lhBalcony.position.y = 25.4;
  const lhGlass = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 2.8, 12), darkGlassMat);
  lhGlass.position.y = 27.0;
  const lhDome = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), crimsonRedMat);
  lhDome.position.y = 28.4;

  // Rotating Spotlight Beacon
  const lhBeacon = new THREE.SpotLight(0xfffae6, 4.8, 160, Math.PI / 6, 0.35);
  lhBeacon.position.set(0, 27.2, 0);
  const lhTarget = new THREE.Object3D();
  lhTarget.position.set(80, 0, 0);
  lighthouse.add(lhBalcony, lhGlass, lhDome, lhBeacon, lhTarget);
  lhBeacon.target = lhTarget;
  animBeacons.push(lhBeacon);

  lighthouse.position.set(45, 0, 8);
  kollamGroup.add(lighthouse);
  colliders.push({ minX: 40, maxX: 50, minZ: 233, maxZ: 243 });

  // 13C. Fishing Harbour Wharf & Marine Trawlers
  const wharf = new THREE.Mesh(new THREE.BoxGeometry(32, 1.2, 8), asphaltMat);
  wharf.position.set(-35, 0.6, 0);
  kollamGroup.add(wharf);

  for (let b = 0; b < 2; b++) {
    const trawler = new THREE.Mesh(new THREE.BoxGeometry(4.5, 2.2, 11), new THREE.MeshLambertMaterial({ color: b === 0 ? 0x0284c7 : 0xd97706 }));
    trawler.position.set(-42 + b * 14, 0.6, -10);
    kollamGroup.add(trawler);
  }

  mapGroup.add(kollamGroup);

  // =========================================================================
  // 14. 🏛️ THIRUVANANTHAPURAM — SOUTHERN STATE CAPITAL (X: 0, Z: 320)
  // Kerala Government Secretariat with Colonial Pillars & Clock Tower,
  // Napier Cultural Museum Domes, Kovalam Crescent Beach, Southern Highway Terminal
  // =========================================================================
  const tvmGroup = new THREE.Group();
  tvmGroup.position.set(0, 0, 320);

  // 14A. Grand Kerala Government Secretariat (സെക്രട്ടറിയേറ്റ്)
  const secretariat = new THREE.Group();
  // Central Main Administrative Wing
  const secMain = new THREE.Mesh(new THREE.BoxGeometry(34, 11, 16), whiteWallMat);
  secMain.position.set(0, 5.5, 0);

  // Classical Colonial Pillar Portico
  for (let px of [-12, -6, 0, 6, 12]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 10.5, 12), whiteWallMat);
    col.position.set(px, 5.25, 8.8);
    secretariat.add(col);
  }
  // Classical Triangular Pediment Roof
  const pediment = new THREE.Mesh(new THREE.ConeGeometry(17, 4.5, 4), new THREE.MeshLambertMaterial({ color: 0x94a3b8 }));
  pediment.rotateY(Math.PI / 4);
  pediment.position.set(0, 13.2, 8.8);

  // Central Clock Tower & Indian Tricolor Flagstaff
  const clockTower = new THREE.Mesh(new THREE.BoxGeometry(6.5, 8, 6.5), whiteWallMat);
  clockTower.position.set(0, 15, 0);
  const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 16), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  clockFace.rotateX(Math.PI / 2);
  clockFace.position.set(0, 15, 3.4);
  const flagPoleTvm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 6, 8), new THREE.MeshLambertMaterial({ color: 0xd4d4d8 }));
  flagPoleTvm.position.set(0, 22, 0);
  const flagTricolor = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 0.04), new THREE.MeshBasicMaterial({ color: 0xf97316 }));
  flagTricolor.position.set(1.1, 23.5, 0);
  secretariat.add(secMain, pediment, clockTower, clockFace, flagPoleTvm, flagTricolor);
  secretariat.position.set(0, 0, -20);
  tvmGroup.add(secretariat);
  colliders.push({ minX: -19, maxX: 19, minZ: 288, maxZ: 312 });

  // 14B. Kovalam Crescent Beach & Ocean Waves
  const kovalamSand = new THREE.Mesh(new THREE.PlaneGeometry(280, 55), new THREE.MeshLambertMaterial({ color: 0xfde047 }));
  kovalamSand.rotateX(-Math.PI / 2);
  kovalamSand.position.set(0, 0.04, 22);
  tvmGroup.add(kovalamSand);

  // Arabian Sea Waters
  const seaWater = new THREE.Mesh(
    new THREE.PlaneGeometry(360, 75),
    new THREE.MeshPhongMaterial({ color: 0x0284c7, emissive: 0x082f49, shininess: 150, transparent: true, opacity: 0.9 })
  );
  seaWater.rotateX(-Math.PI / 2);
  seaWater.position.set(0, -0.3, 72);
  tvmGroup.add(seaWater);
  waterObjects.push(seaWater);

  mapGroup.add(tvmGroup);

  // =========================================================================
  // 🛣️ THE MEGA ROAD NETWORK (ALL 6 ROAD TYPES CONNECTING KERALA)
  // 1. 🔴 Main Highway: Kasaragod → Kannur → Kozhikode → Malappuram → Thrissur → Ernakulam → Kollam → Thiruvananthapuram
  // 2. 🟡 Coastal Road: Runs continuously along the Arabian Sea
  // 3. 🟢 Hill Road: Western Ghats route (Wayanad → Idukki → Pathanamthitta)
  // 4. 🔵 Village Roads: Connecting local houses, thattukadas, football ground
  // 5. 🟤 Forest Roads: Teak and wildlife tracks
  // 6. ⚪ City Roads: Multi-lane avenues in Ernakulam, Kozhikode, Thiruvananthapuram
  // =========================================================================
  const roadNetwork = new THREE.Group();

  // 1. 🔴 Continuous North-South Main Highway (Z: -370 to Z: +350, Width 14m)
  const hwayTotalLength = 720;
  const mainHway = new THREE.Mesh(new THREE.PlaneGeometry(14, hwayTotalLength), asphaltMat);
  mainHway.rotateX(-Math.PI / 2);
  mainHway.position.set(0, 0.08, 0);
  mainHway.receiveShadow = true;
  roadNetwork.add(mainHway);

  // Center Double Yellow Lines along Main Highway
  const hLineL = new THREE.Mesh(new THREE.PlaneGeometry(0.32, hwayTotalLength), yellowLineMat);
  hLineL.rotateX(-Math.PI / 2);
  hLineL.position.set(-0.25, 0.09, 0);
  const hLineR = new THREE.Mesh(new THREE.PlaneGeometry(0.32, hwayTotalLength), yellowLineMat);
  hLineR.rotateX(-Math.PI / 2);
  hLineR.position.set(0.25, 0.09, 0);
  roadNetwork.add(hLineL, hLineR);

  // 2. 🟡 Coastal Road (West Coast Highway from Z: -360 to +340 at X: -70 to -85)
  const coastalRoad = new THREE.Mesh(new THREE.PlaneGeometry(10, 710), asphaltMat);
  coastalRoad.rotateX(-Math.PI / 2);
  coastalRoad.position.set(-78, 0.08, 0);
  roadNetwork.add(coastalRoad);

  // 3. 🟢 Western Ghats Hill Road (East Ghats Route connecting Wayanad, Idukki, Pathanamthitta)
  const hillRoad1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 240), asphaltMat);
  hillRoad1.rotateX(-Math.PI / 2);
  hillRoad1.position.set(-135, 0.08, -120);
  roadNetwork.add(hillRoad1);

  // 4. ⚪ Multi-lane City Cross Arterials
  // Central Ernakulam MG Road (Z: 0, spanning X: -180 to +180)
  const ernakulamMGRoad = new THREE.Mesh(new THREE.PlaneGeometry(360, 12), asphaltMat);
  ernakulamMGRoad.rotateX(-Math.PI / 2);
  ernakulamMGRoad.position.set(0, 0.085, 0);
  roadNetwork.add(ernakulamMGRoad);

  // Kozhikode Beach Road (Z: -280, X: -140 to +140)
  const calicutCrossRoad = new THREE.Mesh(new THREE.PlaneGeometry(280, 11), asphaltMat);
  calicutCrossRoad.rotateX(-Math.PI / 2);
  calicutCrossRoad.position.set(0, 0.085, -280);
  roadNetwork.add(calicutCrossRoad);

  // Thiruvananthapuram Secretariat Boulevard (Z: 310, X: -140 to +140)
  const tvmCrossRoad = new THREE.Mesh(new THREE.PlaneGeometry(280, 12), asphaltMat);
  tvmCrossRoad.rotateX(-Math.PI / 2);
  tvmCrossRoad.position.set(0, 0.085, 310);
  roadNetwork.add(tvmCrossRoad);

  // 5. 🟤 Forest Roads (Western Ghats & Sabarimala Pilgrim Trails)
  const forestRoadWayanad = new THREE.Mesh(new THREE.PlaneGeometry(8, 120), lateriteDarkMat);
  forestRoadWayanad.rotateX(-Math.PI / 2);
  forestRoadWayanad.position.set(-110, 0.082, -220);
  forestRoadWayanad.rotateY(0.4);
  roadNetwork.add(forestRoadWayanad);

  const forestRoadPamba = new THREE.Mesh(new THREE.PlaneGeometry(8, 90), lateriteDarkMat);
  forestRoadPamba.rotateX(-Math.PI / 2);
  forestRoadPamba.position.set(70, 0.082, 160);
  forestRoadPamba.rotateY(-0.35);
  roadNetwork.add(forestRoadPamba);

  // 6. 🔵 Village Connecting Roads (Hospital spur, Thattukada lane, Sevens ground access)
  const villageSpur1 = new THREE.Mesh(new THREE.PlaneGeometry(85, 8), asphaltMat);
  villageSpur1.rotateX(-Math.PI / 2);
  villageSpur1.position.set(45, 0.082, 65); // Leads right to Hospital & Kottayam
  roadNetwork.add(villageSpur1);

  // 7. 🟢 Overhead Highway Direction Gantries (Kerala PWD / NHAI Green Boards)
  function createHighwayGantry(z: number, routeTitle: string, distA: string, distB: string) {
    const gantry = new THREE.Group();
    // Steel lattice support pillars
    const poleL = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7.5, 0.5), new THREE.MeshLambertMaterial({ color: 0x64748b }));
    poleL.position.set(-8.8, 3.75, 0);
    const poleR = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7.5, 0.5), new THREE.MeshLambertMaterial({ color: 0x64748b }));
    poleR.position.set(8.8, 3.75, 0);
    // Overhead steel truss beam
    const truss = new THREE.Mesh(new THREE.BoxGeometry(19, 0.55, 0.55), new THREE.MeshLambertMaterial({ color: 0x475569 }));
    truss.position.set(0, 7.3, 0);
    // Green PWD board
    const board = new THREE.Mesh(new THREE.BoxGeometry(15.5, 2.4, 0.25), new THREE.MeshLambertMaterial({ color: 0x065f46 }));
    board.position.set(0, 6.0, 0);
    // White border outline
    const boardBorder = new THREE.Mesh(new THREE.BoxGeometry(15.8, 2.6, 0.22), whiteWallMat);
    boardBorder.position.set(0, 6.0, -0.02);
    // Yellow Highway Emblem Box (NH-66 / SH-17)
    const nhBadge = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 0.35), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    nhBadge.position.set(-6.0, 6.0, 0.08);

    gantry.add(poleL, poleR, truss, boardBorder, board, nhBadge);
    gantry.position.set(0, 0, z);
    roadNetwork.add(gantry);
    colliders.push({ minX: -9.5, maxX: -8.1, minZ: z - 0.5, maxZ: z + 0.5 });
    colliders.push({ minX: 8.1, maxX: 9.5, minZ: z - 0.5, maxZ: z + 0.5 });
  }

  // Place overhead gantries at key Kerala highway junctions
  createHighwayGantry(-335, 'NH-66 KASARAGOD ➔ KANNUR', 'Kasaragod Fort', 'Kannur Beach');
  createHighwayGantry(-270, 'NH-66 KOZHIKODE ➔ WAYANAD GHATS', 'Calicut City', 'Wayanad High Range');
  createHighwayGantry(-110, 'NH-544 THRISSUR ➔ PALAKKAD GAP', 'Thekkinkadu', 'Palakkad Gap');
  createHighwayGantry(-25, 'NH-66 ERNAKULAM MEGA METRO', 'Marine Drive', 'Kochi Metro');
  createHighwayGantry(90, 'NH-66 ALAPPUZHA ➔ KOLLAM PORT', 'Backwaters', 'Ashtamudi Lake');
  createHighwayGantry(280, 'NH-66 THIRUVANANTHAPURAM CAPITAL', 'Secretariat', 'Kovalam Beach');

  // 8. 🟡 Yellow & White Kerala Highway Milestone Posts (മൈൽക്കുറ്റികൾ)
  const milestoneLocations = [
    { x: -7.5, z: -350, nh: true },
    { x: -7.5, z: -310, nh: true },
    { x: -7.5, z: -270, nh: true },
    { x: -7.5, z: -210, nh: true },
    { x: -7.5, z: -140, nh: true },
    { x: -7.5, z: -70, nh: true },
    { x: -7.5, z: 0, nh: true },
    { x: -7.5, z: 70, nh: true },
    { x: -7.5, z: 140, nh: true },
    { x: -7.5, z: 220, nh: true },
    { x: -7.5, z: 310, nh: true },
  ];

  milestoneLocations.forEach((m) => {
    const stone = new THREE.Group();
    // Lower rectangular white base
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.35), whiteWallMat);
    base.position.set(0, 0.375, 0);
    // Rounded yellow top for National Highway
    const topArc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.27, 0.27, 0.35, 12, 1, false, 0, Math.PI),
      new THREE.MeshLambertMaterial({ color: 0xfacc15 })
    );
    topArc.rotateZ(Math.PI / 2);
    topArc.position.set(0, 0.75, 0);
    stone.add(base, topArc);
    stone.position.set(m.x, 0, m.z);
    roadNetwork.add(stone);
  });

  mapGroup.add(roadNetwork);

  // Return composite object with animation update
  return {
    group: mapGroup,
    colliders,
    waterObjects,
    updateAnimation: (time: number) => {
      // 1. Rotate Tangasseri Lighthouse Beacon Beam
      animBeacons.forEach(b => {
        if (b.target) {
          b.target.position.x = 45 + Math.sin(time * 0.0018) * 90;
          b.target.position.z = 8 + Math.cos(time * 0.0018) * 90;
        }
      });

      // 2. Aircraft Obstacle Warning Lights Blinking (Secretariat, Ernakulam, Hospital)
      const flash = Math.sin(time * 0.006) > 0;
      animObstacleLights.forEach(light => {
        light.visible = flash;
      });

      // 3. Gentle Shimmer on Water Bodies
      const waveShimmer = Math.sin(time * 0.0025) * 0.04;
      waterObjects.forEach((w, idx) => {
        w.position.y += Math.sin(time * 0.002 + idx) * 0.002;
      });

      // 4. 🚇 Pune Metro Purple Line High-Speed Loop Transit Animation
      if (animMetroTrain) {
        animMetroTrain.update(time);

        // Continuous circulation around the complete 734-meter dual-corridor loop
        const straightL = 320;
        const curveR = 15;
        const curveL = Math.PI * curveR; // ~47.12m
        const totalP = straightL * 2 + curveL * 2; // ~734.25m

        // Train speed: smoothly glides around the entire city loop
        const s = ((time * 0.016) % totalP + totalP) % totalP;

        let px = 0;
        let pz = 0;
        let rotY = 0;

        if (s < straightL) {
          // 1. North Straight Track (cruising East along Z: -15)
          px = -160 + s;
          pz = -15;
          rotY = Math.PI / 2;
        } else if (s < straightL + curveL) {
          // 2. East Sweeping Curve (crossing over to the South side!)
          const frac = (s - straightL) / curveL;
          const ang = -Math.PI / 2 + frac * Math.PI;
          px = 160 + Math.cos(ang) * curveR;
          pz = Math.sin(ang) * curveR;
          rotY = Math.PI / 2 - frac * Math.PI;
        } else if (s < straightL * 2 + curveL) {
          // 3. South Straight Track on THE OTHER SIDE (cruising West along Z: +15)
          const distS = s - (straightL + curveL);
          px = 160 - distS;
          pz = 15;
          rotY = -Math.PI / 2;
        } else {
          // 4. West Sweeping Curve (attaching South back to North!)
          const frac = (s - (straightL * 2 + curveL)) / curveL;
          const ang = Math.PI / 2 + frac * Math.PI;
          px = -160 + Math.cos(ang) * curveR;
          pz = Math.sin(ang) * curveR;
          rotY = -Math.PI / 2 - frac * Math.PI;
        }

        animMetroTrain.group.position.set(px, 9.5 + 0.72, pz);
        animMetroTrain.group.rotation.y = rotY;
      }
    },
  };
}
