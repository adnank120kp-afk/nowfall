import * as THREE from 'three';

export interface PrayerPlacesWorld {
  group: THREE.Group;
  places: {
    id: 'masjid' | 'temple' | 'church';
    name: string;
    coords: { x: number; z: number };
    markerMesh: THREE.Mesh;
  }[];
  updateAnimation: (time: number) => void;
}

export function buildKeralaPrayerPlaces(): PrayerPlacesWorld {
  const group = new THREE.Group();
  const places: PrayerPlacesWorld['places'] = [];

  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  const greenMat = new THREE.MeshLambertMaterial({ color: 0x059669 }); // Islamic Emerald Green
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.85, roughness: 0.2 });
  const tileMat = new THREE.MeshLambertMaterial({ color: 0x991b1b }); // Terracotta tile
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });

  // 1. GRAND KERALA MASJID (X: -105, Z: 45)
  const masjidGroup = new THREE.Group();
  masjidGroup.position.set(-105, 0, 45);

  // Main Prayer Hall
  const hall = new THREE.Mesh(new THREE.BoxGeometry(16, 7.5, 18), whiteMat);
  hall.position.y = 3.75;
  hall.castShadow = true;
  hall.receiveShadow = true;
  masjidGroup.add(hall);

  // Central Emerald Green Dome
  const dome = new THREE.Mesh(new THREE.SphereGeometry(4.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), greenMat);
  dome.position.y = 7.5;
  const domeSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.16, 2.4, 8), goldMat);
  domeSpire.position.y = 12.2;
  const crescent = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.06, 8, 16, Math.PI * 1.3), goldMat);
  crescent.position.y = 13.5;
  masjidGroup.add(dome, domeSpire, crescent);

  // Soaring Octagonal Minaret Tower
  const minaret = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.6, 22, 8), whiteMat);
  minaret.position.set(9.5, 11, 10);
  const minaretDome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2), greenMat);
  minaretDome.position.set(9.5, 22, 10);
  masjidGroup.add(minaret, minaretDome);

  // Arched Entrance Porch
  const arch = new THREE.Mesh(new THREE.BoxGeometry(6, 4.5, 2), greenMat);
  arch.position.set(0, 2.25, 9.8);
  masjidGroup.add(arch);

  // Prayer Beacon
  const masjidBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.25, 16), beaconMat.clone());
  masjidBeacon.position.set(0, 0.15, 12);
  masjidGroup.add(masjidBeacon);

  group.add(masjidGroup);
  places.push({ id: 'masjid', name: 'Grand Juma Masjid (പള്ളി)', coords: { x: -105, z: 45 }, markerMesh: masjidBeacon });

  // 2. KERALA TRADITIONAL TEMPLE (X: 115, Z: 55)
  const templeGroup = new THREE.Group();
  templeGroup.position.set(115, 0, 55);

  // Outer Chuttambalam Wall with clay roof
  const chuttambalam = new THREE.Mesh(new THREE.BoxGeometry(18, 3.2, 18), stoneMat);
  chuttambalam.position.y = 1.6;
  chuttambalam.castShadow = true;
  templeGroup.add(chuttambalam);

  const tRoof = new THREE.Mesh(new THREE.ConeGeometry(14, 3.8, 4), tileMat);
  tRoof.position.y = 4.8;
  tRoof.rotation.y = Math.PI / 4;
  templeGroup.add(tRoof);

  // Golden Kodimaram Flagpole in front courtyard
  const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 14, 8), goldMat);
  flagPole.position.set(0, 7, 13);
  templeGroup.add(flagPole);

  // Brass Deepasthambham Oil Lamp Tree
  const lampPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.35, 4.5, 8), goldMat);
  lampPillar.position.set(0, 2.25, 10.5);
  templeGroup.add(lampPillar);

  // Temple Beacon
  const templeBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.25, 16), new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true }));
  templeBeacon.position.set(0, 0.15, 13);
  templeGroup.add(templeBeacon);

  group.add(templeGroup);
  places.push({ id: 'temple', name: 'Traditional Kerala Temple (ക്ഷേത്രം)', coords: { x: 115, z: 55 }, markerMesh: templeBeacon });

  // 3. KERALA HISTORIC CHURCH (X: 65, Z: 145)
  const churchGroup = new THREE.Group();
  churchGroup.position.set(65, 0, 145);

  // Main Nave
  const nave = new THREE.Mesh(new THREE.BoxGeometry(14, 8, 22), whiteMat);
  nave.position.y = 4;
  churchGroup.add(nave);

  const churchRoof = new THREE.Mesh(new THREE.ConeGeometry(11, 4, 4), tileMat);
  churchRoof.position.set(0, 9.8, 0);
  churchRoof.rotation.y = Math.PI / 4;
  churchGroup.add(churchRoof);

  // Tall Bell Tower with Cross
  const bTower = new THREE.Mesh(new THREE.BoxGeometry(4.5, 16, 4.5), whiteMat);
  bTower.position.set(0, 8, 12);
  const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.25, 2.2, 0.25), goldMat);
  crossV.position.set(0, 17, 12);
  const crossH = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.25, 0.25), goldMat);
  crossH.position.set(0, 17.4, 12);
  churchGroup.add(bTower, crossV, crossH);

  // Church Beacon
  const churchBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 0.25, 16), new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true }));
  churchBeacon.position.set(0, 0.15, 15);
  churchGroup.add(churchBeacon);

  group.add(churchGroup);
  places.push({ id: 'church', name: 'St. Mary Historic Church (പള്ളി)', coords: { x: 65, z: 145 }, markerMesh: churchBeacon });

  function updateAnimation(time: number) {
    const pulse = 1.0 + Math.sin(time * 0.005) * 0.15;
    places.forEach((p) => {
      p.markerMesh.scale.set(pulse, 1.0, pulse);
      p.markerMesh.rotation.y += 0.015;
    });
  }

  return {
    group,
    places,
    updateAnimation,
  };
}
