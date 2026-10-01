import * as THREE from 'three';
import { HouseModelType } from './KeralaLifeSystem';

export interface KeralaHouseInstance {
  group: THREE.Group;
  setConstructionStage: (stage: number, model: HouseModelType) => void;
  getWardrobePosition: () => THREE.Vector3;
}

/**
 * Builds the player's custom home with real-time construction animation:
 * Stage 1: Granite stones (കരിങ്കല്ല്) & cement foundation
 * Stage 2: Rising walls & doorframes
 * Stage 3: Roof trusses & clay tiles / slab
 * Stage 4: Fully furnished home with Dressing Room (wardrobe)
 */
export function buildPlayerHome(defaultX = -15, defaultZ = -30): KeralaHouseInstance {
  const group = new THREE.Group();
  group.position.set(defaultX, 0, defaultZ);

  // Materials
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x475569 }); // Granite / Laterite
  const mortarMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 }); // Wet cement
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc }); // Off-white painted walls
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x78350f }); // Teak wood
  const tileMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // Red terracotta Kerala roof tiles
  const glassMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });

  let houseRoot = new THREE.Group();
  group.add(houseRoot);

  function rebuild(stage: number, model: HouseModelType) {
    group.remove(houseRoot);
    houseRoot = new THREE.Group();

    if (stage <= 0) {
      // Empty plot with wooden plot corner pegs & rope
      const pegMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
      [-5, 5].forEach((px) => {
        [-4, 4].forEach((pz) => {
          const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8), pegMat);
          peg.position.set(px, 0.4, pz);
          houseRoot.add(peg);
        });
      });
      group.add(houseRoot);
      return;
    }

    // STAGE 1: Foundation Stones & Cement Mortar Bed
    const foundation = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.45, 8.5), stoneMat);
    foundation.position.y = 0.22;
    foundation.receiveShadow = true;
    houseRoot.add(foundation);

    // Granite foundation stone courses along perimeter
    const stoneGeo = new THREE.BoxGeometry(1.2, 0.4, 0.6);
    for (let sx = -4.5; sx <= 4.5; sx += 1.4) {
      const stoneN = new THREE.Mesh(stoneGeo, stoneMat);
      stoneN.position.set(sx, 0.65, -3.8);
      const stoneS = new THREE.Mesh(stoneGeo, stoneMat);
      stoneS.position.set(sx, 0.65, 3.8);
      houseRoot.add(stoneN, stoneS);
    }

    // Cement bags pile beside foundation
    const bagMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
    for (let b = 0; b < 4; b++) {
      const bag = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.25, 0.5), bagMat);
      bag.position.set(5.8, 0.15 + b * 0.22, 2.5);
      houseRoot.add(bag);
    }

    if (stage >= 2) {
      // STAGE 2: Walls & Lintels rising
      const wallHeight = stage >= 3 ? 3.2 : 1.8;
      const mainWalls = new THREE.Mesh(new THREE.BoxGeometry(9.8, wallHeight, 7.8), wallMat);
      mainWalls.position.y = 0.45 + wallHeight / 2;
      mainWalls.castShadow = true;
      mainWalls.receiveShadow = true;
      houseRoot.add(mainWalls);

      // Teak Front Door
      const doorMat = stage >= 3 ? woodMat : mortarMat;
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.2, 0.15), doorMat);
      door.position.set(0, 1.35, 3.95);
      houseRoot.add(door);

      // Windows with wooden shutters
      [-3, 3].forEach((wx) => {
        const windowPane = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.15), glassMat);
        windowPane.position.set(wx, 1.8, 3.95);
        houseRoot.add(windowPane);
      });
    }

    if (stage >= 3) {
      // STAGE 3 & 4: Roof, Veranda, & Styling according to Model Type
      if (model === 'nalukettu') {
        // Traditional Kerala Sloping Mangalore Clay Tile Roof
        const roofGroup = new THREE.Group();
        roofGroup.position.set(0, 3.65, 0);

        // North & South slopes
        const roofS = new THREE.Mesh(new THREE.ConeGeometry(7.2, 2.8, 4), tileMat);
        roofS.position.y = 1.4;
        roofS.rotation.y = Math.PI / 4;
        roofGroup.add(roofS);

        // Front Charupadi Veranda with carved wooden pillars
        for (let vx = -4; vx <= 4; vx += 2) {
          const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 8), woodMat);
          pillar.position.set(vx, 1.3, 4.8);
          houseRoot.add(pillar);
        }

        const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.25, 2.2), tileMat);
        porchRoof.position.set(0, 2.7, 4.8);
        porchRoof.rotation.x = 0.18;
        houseRoot.add(porchRoof);

        houseRoot.add(roofGroup);
      } else if (model === 'modern_villa') {
        // Contemporary Flat Roof Villa with Glass Balcony & Parapet
        const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(10.6, 0.35, 8.6), wallMat);
        roofSlab.position.set(0, 3.8, 0);
        houseRoot.add(roofSlab);

        const glassBalcony = new THREE.Mesh(new THREE.BoxGeometry(9.8, 0.9, 0.1), glassMat);
        glassBalcony.position.set(0, 4.4, 4.2);
        houseRoot.add(glassBalcony);

        // Modern geometric stone feature wall
        const featureWall = new THREE.Mesh(new THREE.BoxGeometry(2.4, 3.8, 0.4), stoneMat);
        featureWall.position.set(-3.2, 2.1, 4.1);
        houseRoot.add(featureWall);
      } else {
        // Plantation Cottage (green estate roof & cane porch)
        const cottageMat = new THREE.MeshLambertMaterial({ color: 0x166534 }); // Forest green roof
        const roofS = new THREE.Mesh(new THREE.ConeGeometry(7.0, 2.4, 4), cottageMat);
        roofS.position.y = 4.85;
        roofS.rotation.y = Math.PI / 4;
        houseRoot.add(roofS);
      }
    }

    if (stage >= 4) {
      // STAGE 4: Fully Finished Home with Dressing Room Beacon
      // Brass Nilavilakku lamp at front entrance
      const lampMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.8, roughness: 0.2 });
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.22, 1.2, 8), lampMat);
      lamp.position.set(1.4, 0.6, 4.4);
      houseRoot.add(lamp);

      // Dressing Room / Wardrobe Marker inside
      const wardrobeMat = new THREE.MeshLambertMaterial({ color: 0x9333ea });
      const wardrobe = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.1, 0.6), wardrobeMat);
      wardrobe.position.set(-2.8, 1.1, 0);
      houseRoot.add(wardrobe);

      // Glowing Dressing Beacon
      const dBeacon = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.15, 12), new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true }));
      dBeacon.position.set(-2.8, 0.1, 0);
      houseRoot.add(dBeacon);
    }

    group.add(houseRoot);
  }

  // Initial stage
  rebuild(0, 'nalukettu');

  function setConstructionStage(stage: number, model: HouseModelType) {
    rebuild(stage, model);
  }

  function getWardrobePosition(): THREE.Vector3 {
    return new THREE.Vector3(group.position.x - 2.8, 0, group.position.z);
  }

  return {
    group,
    setConstructionStage,
    getWardrobePosition,
  };
}
