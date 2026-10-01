import * as THREE from 'three';

/**
 * Builds the authentic KERALA FARMLAND PLOTS across districts:
 * 1. Bekal Coconut Grove (Kasaragod) - Towering palms with harvestable coconuts
 * 2. Wayanad Banana Plantation (Wayanad) - Nendran banana plants with heavy bunches
 * 3. Kuttanad Rice Paddy Fields (Alappuzha) - Golden flooded paddy stalks & bunds
 */
export interface FarmlandWorldPlots {
  group: THREE.Group;
  plots: {
    id: 'coconut' | 'banana' | 'rice';
    coords: { x: number; z: number };
    markerMesh: THREE.Mesh;
  }[];
  updateAnimation: (time: number) => void;
}

export function buildKeralaFarmlands(): FarmlandWorldPlots {
  const group = new THREE.Group();
  const plotsData: FarmlandWorldPlots['plots'] = [];

  // 1. BEKAL COCONUT GROVE (Kasaragod: X: -85, Z: -125)
  const coconutGroup = new THREE.Group();
  coconutGroup.position.set(-85, 0, -125);

  const soilMat = new THREE.MeshLambertMaterial({ color: 0x5a4d3b }); // Rich red/brown Kerala coastal soil
  const trunkMat = new THREE.MeshLambertMaterial({ color: 0x4a3b2c });
  const frondMat = new THREE.MeshLambertMaterial({ color: 0x15803d, side: THREE.DoubleSide });
  const coconutNutMat = new THREE.MeshLambertMaterial({ color: 0x78552b });

  const coconutPlotFloor = new THREE.Mesh(new THREE.PlaneGeometry(36, 36).rotateX(-Math.PI / 2), soilMat);
  coconutPlotFloor.position.y = 0.04;
  coconutPlotFloor.receiveShadow = true;
  coconutGroup.add(coconutPlotFloor);

  // 12 Coconut Palms in orderly grove pattern
  const coconutHeads: THREE.Group[] = [];
  for (let gx = -2; gx <= 2; gx++) {
    for (let gz = -2; gz <= 2; gz++) {
      if (gx === 0 && gz === 0) continue; // Leave center for harvest cart
      const px = gx * 7 + (Math.random() - 0.5) * 1.5;
      const pz = gz * 7 + (Math.random() - 0.5) * 1.5;

      const palmTree = new THREE.Group();
      palmTree.position.set(px, 0, pz);

      // Curved slender trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.38, 9, 8), trunkMat);
      trunk.position.y = 4.5;
      trunk.rotation.z = (Math.random() - 0.5) * 0.12;
      palmTree.add(trunk);

      // Crown of radiating fronds
      const crown = new THREE.Group();
      crown.position.set(0, 8.8, 0);

      for (let f = 0; f < 8; f++) {
        const theta = (f / 8) * Math.PI * 2;
        const frond = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 4.2), frondMat);
        frond.rotation.y = theta;
        frond.rotation.x = 0.45;
        frond.position.set(Math.cos(theta) * 1.8, -0.6, Math.sin(theta) * 1.8);
        crown.add(frond);
      }

      // Clustered coconuts under fronds
      for (let n = 0; n < 4; n++) {
        const nut = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), coconutNutMat);
        const nutTheta = (n / 4) * Math.PI * 2;
        nut.position.set(Math.cos(nutTheta) * 0.45, -0.2, Math.sin(nutTheta) * 0.45);
        crown.add(nut);
      }

      palmTree.add(crown);
      coconutHeads.push(crown);
      coconutGroup.add(palmTree);
    }
  }

  // Harvest Beacon Marker in Center of Coconut plot
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, wireframe: true });
  const coconutBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 16), beaconMat);
  coconutBeacon.position.set(0, 0.2, 0);
  coconutGroup.add(coconutBeacon);

  group.add(coconutGroup);
  plotsData.push({ id: 'coconut', coords: { x: -85, z: -125 }, markerMesh: coconutBeacon });

  // 2. WAYANAD BANANA PLANTATION (Wayanad: X: 75, Z: -70)
  const bananaGroup = new THREE.Group();
  bananaGroup.position.set(75, 0, -70);

  const plantationFloor = new THREE.Mesh(new THREE.PlaneGeometry(34, 34).rotateX(-Math.PI / 2), soilMat);
  plantationFloor.position.y = 0.04;
  bananaGroup.add(plantationFloor);

  const stemMat = new THREE.MeshLambertMaterial({ color: 0x65a30d });
  const leafMat = new THREE.MeshLambertMaterial({ color: 0x4d7c0f, side: THREE.DoubleSide });
  const bunchMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 }); // Golden ripe Nendran bananas
  const flowerMat = new THREE.MeshLambertMaterial({ color: 0x881337 }); // Deep maroon banana flower (വാഴക്കൂമ്പ്)

  for (let bx = -2; bx <= 2; bx++) {
    for (let bz = -2; bz <= 2; bz++) {
      if (bx === 0 && bz === 0) continue;
      const plant = new THREE.Group();
      plant.position.set(bx * 6.5, 0, bz * 6.5);

      // Succulent pseudostem
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 3.2, 8), stemMat);
      stem.position.y = 1.6;
      plant.add(stem);

      // Arching broad banana paddle leaves
      for (let l = 0; l < 6; l++) {
        const theta = (l / 6) * Math.PI * 2;
        const leaf = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.05, 3.2), leafMat);
        leaf.rotation.y = theta;
        leaf.rotation.x = 0.55;
        leaf.position.set(Math.cos(theta) * 1.2, 2.7, Math.sin(theta) * 1.2);
        plant.add(leaf);
      }

      // Hanging heavy bunch of Nendran bananas (വാഴക്കുല)
      const bunch = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.22, 1.1, 8), bunchMat);
      bunch.position.set(0.4, 2.2, 0.4);
      bunch.rotation.z = -0.3;
      plant.add(bunch);

      // Maroon tip flower
      const flower = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 8), flowerMat);
      flower.position.set(0.55, 1.5, 0.55);
      flower.rotation.x = Math.PI;
      plant.add(flower);

      bananaGroup.add(plant);
    }
  }

  // Harvest Beacon Marker in Center of Banana plot
  const bananaBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 16), beaconMat.clone());
  bananaBeacon.position.set(0, 0.2, 0);
  bananaGroup.add(bananaBeacon);

  group.add(bananaGroup);
  plotsData.push({ id: 'banana', coords: { x: 75, z: -70 }, markerMesh: bananaBeacon });

  // 3. KUTTANAD RICE PADDY FIELD (Alappuzha: X: -45, Z: 95)
  const riceGroup = new THREE.Group();
  riceGroup.position.set(-45, 0, 95);

  // Flooded muddy water floor
  const waterPaddyMat = new THREE.MeshPhongMaterial({
    color: 0x4d7c0f,
    transparent: true,
    opacity: 0.85,
    shininess: 60,
  });
  const paddyWater = new THREE.Mesh(new THREE.PlaneGeometry(38, 38).rotateX(-Math.PI / 2), waterPaddyMat);
  paddyWater.position.y = 0.05;
  riceGroup.add(paddyWater);

  // Mud bunds (വരമ്പ്) criss-crossing the field
  const bundMat = new THREE.MeshLambertMaterial({ color: 0x3d3126 });
  [-12, 0, 12].forEach((pos) => {
    const bundX = new THREE.Mesh(new THREE.BoxGeometry(38, 0.24, 0.8), bundMat);
    bundX.position.set(0, 0.12, pos);
    const bundZ = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.24, 38), bundMat);
    bundZ.position.set(pos, 0.12, 0);
    riceGroup.add(bundX, bundZ);
  });

  // Dense golden paddy grain stalks (നെൽക്കതിരുകൾ)
  const stalkMat = new THREE.MeshLambertMaterial({ color: 0xeab308 }); // Golden ripe rice
  for (let rx = -14; rx <= 14; rx += 3.5) {
    for (let rz = -14; rz <= 14; rz += 3.5) {
      if (Math.abs(rx) < 2 && Math.abs(rz) < 2) continue;
      const bunch = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.08, 0.95, 6), stalkMat);
      bunch.position.set(rx, 0.5, rz);
      riceGroup.add(bunch);
    }
  }

  // Harvest Beacon Marker in Center of Rice plot
  const riceBeacon = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.3, 16), beaconMat.clone());
  riceBeacon.position.set(0, 0.2, 0);
  riceGroup.add(riceBeacon);

  group.add(riceGroup);
  plotsData.push({ id: 'rice', coords: { x: -45, z: 95 }, markerMesh: riceBeacon });

  function updateAnimation(time: number) {
    const sway = Math.sin(time * 0.002) * 0.04;
    coconutHeads.forEach((c) => {
      c.rotation.z = sway;
    });

    // Pulse beacon markers
    const pulseScale = 1.0 + Math.sin(time * 0.005) * 0.15;
    plotsData.forEach((p) => {
      p.markerMesh.scale.set(pulseScale, 1.0, pulseScale);
      p.markerMesh.rotation.y += 0.015;
    });
  }

  return {
    group,
    plots: plotsData,
    updateAnimation,
  };
}
