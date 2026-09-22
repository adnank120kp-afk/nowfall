import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundSynth } from '../audio';
import { WeatherMode, NPCEntity } from '../types';
import { buildDetailedAutoRickshaw } from './AutoRickshawBuilder';
import { buildKSRTCSuperFastBus, buildLuxuryCoachBus } from './KSRTCBusBuilder';
import { buildKeralaPrivateBus } from './KeralaPrivateBusBuilder';
import { buildKSRTCBusStand } from './KSRTCStandBuilder';
import { buildRiggedBabuCharacter, buildBabuDiagramCharacter, HumanRig } from './BabuCharacterBuilder';
import { buildRiggedTraditionalCharacter } from './TraditionalCharacterBuilder';
import { buildFootballGround } from './FootballGroundBuilder';
import { buildBeautifulLotusPond, getOrganicPondRadius } from './LotusPondBuilder';
import { buildBigKizhakkumpuramMap } from './BigMapBuilder';
import { buildLivingTrafficAndFauna } from './TrafficAndFaunaBuilder';
import {
  buildKeralaTractor,
  buildKeralaJeep,
  buildKeralaBullet,
  buildKeralaBoat,
} from './VehiclesBuilder';
import { buildAuthenticKeralaThattukada } from './ThattukadaBuilder';

interface ThreeKeralaWorldProps {
  weather: WeatherMode;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  inVehicle: boolean;
  vehicleType?: 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat';
  onVehicleToggle: (inVehicle: boolean, vehicleType?: 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat') => void;
  onInteractNPC: (npc: NPCEntity) => void;
  onOpenThattukada?: () => void;
  focusTarget: 'auto' | 'bus' | 'chaya' | 'mosque' | 'football' | 'ticket' | 'pond' | null;
  onClearFocus: () => void;
  teleportTarget?: { x: number; z: number } | null;
  onClearTeleport?: () => void;
  playerModel?: 'unni' | 'babu';
}

export function ThreeKeralaWorld({
  weather,
  timeOfDay = 'afternoon',
  inVehicle,
  vehicleType = 'auto',
  onVehicleToggle,
  onInteractNPC,
  onOpenThattukada,
  focusTarget,
  onClearFocus,
  teleportTarget,
  onClearTeleport,
  playerModel = 'unni',
}: ThreeKeralaWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldApiRef = useRef<{
    setWeather: (w: WeatherMode) => void;
    setTimeOfDay: (t: 'morning' | 'afternoon' | 'evening' | 'night') => void;
    toggleVehicle: (type?: 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat') => void;
    focusPOI: (poi: 'auto' | 'bus' | 'chaya' | 'mosque' | 'football' | 'ticket' | 'pond') => void;
    teleportTo: (x: number, z: number) => void;
    triggerInteract: () => void;
    setPlayerSkin: (model: 'unni' | 'babu') => void;
  } | null>(null);

  // Sync weather changes
  useEffect(() => {
    if (worldApiRef.current) {
      worldApiRef.current.setWeather(weather);
    }
  }, [weather]);

  // Sync time of day changes
  useEffect(() => {
    if (worldApiRef.current) {
      worldApiRef.current.setTimeOfDay(timeOfDay);
    }
  }, [timeOfDay]);

  // Sync player skin changes
  useEffect(() => {
    if (worldApiRef.current) {
      worldApiRef.current.setPlayerSkin(playerModel);
    }
  }, [playerModel]);

  // Sync vehicle toggle from props
  useEffect(() => {
    // handled via worldApiRef
  }, [inVehicle]);

  // Sync focus target
  useEffect(() => {
    if (focusTarget && worldApiRef.current) {
      worldApiRef.current.focusPOI(focusTarget);
      onClearFocus();
    }
  }, [focusTarget, onClearFocus]);

  // Sync teleport target (KSRTC Bus Travel)
  useEffect(() => {
    if (teleportTarget && worldApiRef.current) {
      worldApiRef.current.teleportTo(teleportTarget.x, teleportTarget.z);
      onClearTeleport?.();
    }
  }, [teleportTarget, onClearTeleport]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE & RENDERER
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x7da4a8);
    scene.fog = new THREE.FogExp2(0x8faeaf, 0.0032);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. CAMERA (Expansive viewing distance for Big Map)
    const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1600);
    camera.position.set(0, 16, 26);

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff2df, 0.75);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffae6, 1.45);
    sunLight.position.set(90, 160, 60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 750;
    const shadowDist = 260;
    sunLight.shadow.camera.left = -shadowDist;
    sunLight.shadow.camera.right = shadowDist;
    sunLight.shadow.camera.top = shadowDist;
    sunLight.shadow.camera.bottom = -shadowDist;
    scene.add(sunLight);

    const hemiLight = new THREE.HemisphereLight(0x8bc34a, 0x3d6b38, 0.4);
    scene.add(hemiLight);

    // 4. MASTER WORLD GROUP
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Terrain - Expanded 800x800 Big Map covering Highland hills, valleys, river, backwaters & beach
    const groundGeo = new THREE.PlaneGeometry(800, 800, 70, 70);
    groundGeo.rotateX(-Math.PI / 2);
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      let vy = 0;
      // North highland hills (Highland & Forest sector)
      if (vz < -160) {
        vy = Math.sin((vz + 160) * 0.024) * 16 + Math.cos(vx * 0.024) * 8;
      }
      // Wide River Valley Basin (River Zone at Z: 120 to 170)
      if (vz > 118 && vz < 172) {
        vy = -2.2;
      }
      // South-east backwater canal basin
      if (vx > 65 && vx < 170 && vz > -50 && vz < 118) {
        vy = -2.6;
      }
      // Coastal Beach shoreline (South coast at Z > 280)
      if (vz > 280) {
        vy = -0.2;
      }
      // Organic Lotus Pond Hollow (smoothly carved in the natural lagoon shape)
      const pDx = vx - -80;
      const pDz = vz - -75;
      const pDist = Math.hypot(pDx, pDz);
      if (pDist < 20) {
        const pAngle = Math.atan2(pDz, pDx);
        const pBound = getOrganicPondRadius(pAngle, 12.0);
        if (pDist < pBound * 1.05) {
          vy = -0.75 * Math.cos((pDist / (pBound * 1.05)) * (Math.PI / 2));
        }
      }
      posAttr.setY(i, vy);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshLambertMaterial({ color: 0x3e7529 });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.receiveShadow = true;
    worldGroup.add(groundMesh);

    // Canal (പുഴ / തോട്) with glistening water
    const canalGeo = new THREE.PlaneGeometry(24, 210);
    canalGeo.rotateX(-Math.PI / 2);
    const canalMat = new THREE.MeshPhongMaterial({
      color: 0x1a6b72,
      emissive: 0x052a2e,
      shininess: 140,
      transparent: true,
      opacity: 0.88,
    });
    const canalMesh = new THREE.Mesh(canalGeo, canalMat);
    canalMesh.position.set(80, -0.6, 40);
    worldGroup.add(canalMesh);

    // Colliders list for world boundaries and obstacle collision detection
    interface Collider {
      minX: number;
      maxX: number;
      minZ: number;
      maxZ: number;
    }
    const colliders: Collider[] = [];

    // 3B. AUTHENTIC KERALA LOTUS POND (ആമ്പൽക്കുളം / താമരക്കുളം)
    const lotusPond = buildBeautifulLotusPond(-80, -75);
    worldGroup.add(lotusPond.group);
    colliders.push(...lotusPond.colliders);

    // 3C. BIG MAP 12-DISTRICT SYSTEM (Highland, Forest, School, Hospital, Market, River Bridge, Backwater, Beach)
    const bigMap = buildBigKizhakkumpuramMap();
    worldGroup.add(bigMap.group);
    colliders.push(...bigMap.colliders);

    // 3D. LIVING TRAFFIC & FAUNA SYSTEM (Cars, Lorry, Ambulance, Police Jeep, Scooter, Bicycle, Cows, Dogs, Chickens)
    const livingWorld = buildLivingTrafficAndFauna();
    worldGroup.add(livingWorld.group);

    // Wooden bridges over canal
    function createBridge(zPos: number) {
      const bridge = new THREE.Group();
      const plankMat = new THREE.MeshLambertMaterial({ color: 0x5a361c });
      const plank = new THREE.Mesh(new THREE.BoxGeometry(26, 0.5, 7), plankMat);
      plank.castShadow = true;
      plank.receiveShadow = true;
      bridge.add(plank);

      const railMat = new THREE.MeshLambertMaterial({ color: 0x3d220e });
      const rail1 = new THREE.Mesh(new THREE.BoxGeometry(26, 0.9, 0.25), railMat);
      rail1.position.set(0, 0.7, 3.2);
      const rail2 = rail1.clone();
      rail2.position.set(0, 0.7, -3.2);
      bridge.add(rail1, rail2);

      bridge.position.set(80, 0.35, zPos);
      worldGroup.add(bridge);
    }
    createBridge(0);
    createBridge(70);

    // Paddy fields (പാടം)
    function createPaddyField(x: number, z: number, w: number, d: number) {
      const paddy = new THREE.Group();
      const soilMat = new THREE.MeshLambertMaterial({ color: 0x2b571e });
      const soil = new THREE.Mesh(new THREE.BoxGeometry(w, 0.35, d), soilMat);
      soil.receiveShadow = true;
      paddy.add(soil);

      const bundMat = new THREE.MeshLambertMaterial({ color: 0x6e4e30 });
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(w, 0.5, 1.4), bundMat);
      b1.position.set(0, 0.25, -d / 2);
      const b2 = b1.clone();
      b2.position.set(0, 0.25, d / 2);
      const b3 = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.5, d), bundMat);
      b3.position.set(-w / 2, 0.25, 0);
      const b4 = b3.clone();
      b4.position.set(w / 2, 0.25, 0);
      paddy.add(b1, b2, b3, b4);

      const waterMat = new THREE.MeshPhongMaterial({ color: 0x386d3e, shininess: 85, transparent: true, opacity: 0.68 });
      const waterMesh = new THREE.Mesh(new THREE.PlaneGeometry(w - 2.5, d - 2.5), waterMat);
      waterMesh.rotateX(-Math.PI / 2);
      waterMesh.position.y = 0.28;
      paddy.add(waterMesh);

      const stalkMat = new THREE.MeshLambertMaterial({ color: 0x599824 });
      const stalkGeo = new THREE.ConeGeometry(0.2, 0.9, 4);
      for (let si = 0; si < 24; si++) {
        const stalk = new THREE.Mesh(stalkGeo, stalkMat);
        stalk.position.set((Math.random() - 0.5) * (w - 6), 0.6, (Math.random() - 0.5) * (d - 6));
        paddy.add(stalk);
      }

      paddy.position.set(x, 0.1, z);
      worldGroup.add(paddy);
    }
    createPaddyField(115, -15, 48, 40);
    createPaddyField(115, 35, 48, 50);
    createPaddyField(-105, 35, 50, 55);

    // Roads
    function createRoad(x: number, z: number, w: number, d: number, angle = 0, type = 'asphalt') {
      const roadGeo = new THREE.PlaneGeometry(w, d);
      roadGeo.rotateX(-Math.PI / 2);
      let color = 0x2e3236;
      if (type === 'mud') color = 0x875430;
      if (type === 'concrete') color = 0x9fa4a6;

      const roadMat = new THREE.MeshLambertMaterial({ color });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.y = angle;
      road.position.set(x, 0.08, z);
      road.receiveShadow = true;
      worldGroup.add(road);

      if (type === 'asphalt' && d > 35) {
        const lineGeo = new THREE.PlaneGeometry(0.35, d * 0.92);
        lineGeo.rotateX(-Math.PI / 2);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xefca3d });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(x, 0.1, z);
        line.rotation.y = angle;
        worldGroup.add(line);
      }
    }

    createRoad(0, 0, 270, 14, 0, 'asphalt');
    createRoad(0, 0, 14, 250, 0, 'asphalt');
    createRoad(50, -65, 11, 100, Math.PI / 6, 'asphalt');
    createRoad(-60, 65, 9, 120, Math.PI / 4, 'mud');
    createRoad(-45, -30, 9, 75, Math.PI / 2, 'concrete');

    // Drainage Gutter
    const dMat = new THREE.MeshLambertMaterial({ color: 0x5a6063 });
    const gutterL = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 200), dMat);
    gutterL.position.set(-7.5, 0.15, 0);
    const gutterR = gutterL.clone();
    gutterR.position.set(7.5, 0.15, 0);
    worldGroup.add(gutterL, gutterR);

    // 5. VEGETATION
    interface AnimatedFlora {
      type: 'palm' | 'arecanut' | 'banana';
      crown: THREE.Object3D;
      phase: number;
      speed: number;
    }
    const animatedFlora: AnimatedFlora[] = [];

    function createCoconutPalm(x: number, z: number, scale = 1) {
      const palm = new THREE.Group();
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x584433 });
      const segments = 6;
      let currY = 0;
      let currX = 0;
      const curve = (Math.random() - 0.5) * 1.6;

      for (let s = 0; s < segments; s++) {
        const segH = 1.6 * scale;
        const rBot = (0.42 - s * 0.038) * scale;
        const rTop = rBot * 0.88;
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, segH, 7), trunkMat);
        seg.castShadow = true;
        seg.position.set(currX, currY + segH / 2, 0);
        seg.rotation.z = -curve * 0.08;
        palm.add(seg);
        currY += segH;
        currX += curve * 0.32;
      }

      const nutMat = new THREE.MeshLambertMaterial({ color: 0x6e882e });
      for (let c = 0; c < 5; c++) {
        const nut = new THREE.Mesh(new THREE.SphereGeometry(0.3 * scale, 6, 6), nutMat);
        const angle = (c / 5) * Math.PI * 2;
        nut.position.set(currX + Math.cos(angle) * 0.4, currY - 0.2, Math.sin(angle) * 0.4);
        palm.add(nut);
      }

      const crownGroup = new THREE.Group();
      crownGroup.position.set(currX, currY, 0);
      const frondMat = new THREE.MeshLambertMaterial({ color: 0x2d6d24, side: THREE.DoubleSide });
      const frondCount = 8;
      for (let f = 0; f < frondCount; f++) {
        const fAngle = (f / frondCount) * Math.PI * 2;
        const frondGeo = new THREE.CylinderGeometry(0.08 * scale, 0.55 * scale, 4.2 * scale, 5);
        frondGeo.rotateZ(Math.PI / 2.6);
        const frond = new THREE.Mesh(frondGeo, frondMat);
        frond.castShadow = true;
        frond.rotation.y = fAngle;
        crownGroup.add(frond);
      }
      palm.add(crownGroup);

      palm.position.set(x, 0, z);
      worldGroup.add(palm);

      animatedFlora.push({
        type: 'palm',
        crown: crownGroup,
        phase: Math.random() * Math.PI * 2,
        speed: 1.4 + Math.random() * 0.8,
      });
    }

    function createArecanutTree(x: number, z: number, scale = 1) {
      const tree = new THREE.Group();
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x7c7365 });
      const h = (8 + Math.random() * 3) * scale;
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.22 * scale, h, 6), trunkMat);
      trunk.position.y = h / 2;
      trunk.castShadow = true;
      tree.add(trunk);

      const bunchMat = new THREE.MeshLambertMaterial({ color: 0xd67a29 });
      const bunch = new THREE.Mesh(new THREE.SphereGeometry(0.4 * scale, 5, 5), bunchMat);
      bunch.position.set(0, h - 0.6, 0.3);
      tree.add(bunch);

      const crown = new THREE.Group();
      crown.position.y = h;
      const leafMat = new THREE.MeshLambertMaterial({ color: 0x387a22, side: THREE.DoubleSide });
      for (let i = 0; i < 5; i++) {
        const lGeo = new THREE.CylinderGeometry(0.05, 0.35 * scale, 2.8 * scale, 4);
        lGeo.rotateZ(Math.PI / 3);
        const leaf = new THREE.Mesh(lGeo, leafMat);
        leaf.rotation.y = (i / 5) * Math.PI * 2;
        crown.add(leaf);
      }
      tree.add(crown);

      tree.position.set(x, 0, z);
      worldGroup.add(tree);

      animatedFlora.push({
        type: 'arecanut',
        crown,
        phase: Math.random() * Math.PI * 2,
        speed: 2.0,
      });
    }

    function createBananaPlant(x: number, z: number, scale = 1) {
      const plant = new THREE.Group();
      const stemMat = new THREE.MeshLambertMaterial({ color: 0x5a9435 });
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.25 * scale, 0.32 * scale, 2.2 * scale, 6), stemMat);
      stem.position.y = 1.1 * scale;
      plant.add(stem);

      const leafMat = new THREE.MeshLambertMaterial({ color: 0x489921, side: THREE.DoubleSide });
      for (let i = 0; i < 6; i++) {
        const leafGeo = new THREE.PlaneGeometry(1.2 * scale, 3.2 * scale);
        leafGeo.rotateX(Math.PI / 3);
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(0, 2.0 * scale, 0);
        leaf.rotation.y = (i / 6) * Math.PI * 2;
        leaf.castShadow = true;
        plant.add(leaf);
      }

      const bunchMat = new THREE.MeshLambertMaterial({ color: 0x769b32 });
      const bunch = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.8, 5), bunchMat);
      bunch.position.set(0.5 * scale, 1.4 * scale, 0);
      const flowerMat = new THREE.MeshLambertMaterial({ color: 0x6e1b30 });
      const flower = new THREE.Mesh(new THREE.ConeGeometry(0.25 * scale, 0.6 * scale, 5), flowerMat);
      flower.rotation.x = Math.PI;
      flower.position.set(0.5 * scale, 0.9 * scale, 0);
      plant.add(bunch, flower);

      plant.position.set(x, 0, z);
      worldGroup.add(plant);

      animatedFlora.push({
        type: 'banana',
        crown: plant,
        phase: Math.random() * Math.PI * 2,
        speed: 1.2,
      });
    }

    function createFruitTree(x: number, z: number, isJackfruit = false, scale = 1) {
      const tree = new THREE.Group();
      const trunkMat = new THREE.MeshLambertMaterial({ color: 0x473426 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6 * scale, 0.85 * scale, 3.8 * scale, 7), trunkMat);
      trunk.position.y = 1.9 * scale;
      trunk.castShadow = true;
      tree.add(trunk);

      const foliageMat = new THREE.MeshLambertMaterial({ color: isJackfruit ? 0x1f541c : 0x2d6b24 });
      const canopy = new THREE.Mesh(new THREE.SphereGeometry(3.2 * scale, 8, 8), foliageMat);
      canopy.position.y = 4.8 * scale;
      canopy.castShadow = true;
      tree.add(canopy);

      if (isJackfruit) {
        const chakkaMat = new THREE.MeshLambertMaterial({ color: 0x647528 });
        for (let j = 0; j < 3; j++) {
          const chakka = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.9, 6), chakkaMat);
          chakka.position.set((j - 1) * 0.5, 2.2, 0.6);
          tree.add(chakka);
        }
      }

      tree.position.set(x, 0, z);
      worldGroup.add(tree);
    }

    // Plant trees
    const palmCoordinates = [
      [-22, 22], [-42, 20], [-64, 24], [-84, 18], [-104, 25],
      [24, 20], [46, 22], [66, 18], [92, 20],
      [-22, -22], [-44, -20], [-72, -22],
      [22, -22], [42, -24], [62, -20],
      [72, -15], [74, 12], [73, 35], [71, 62], [74, 90], [72, 115],
      [90, -18], [91, 18], [88, 50], [92, 82], [90, 110],
      [-90, 65], [-115, 75], [-48, 105], [-22, 84],
      [18, -65], [38, -85], [48, -105], [-32, -72]
    ];
    palmCoordinates.forEach(([px, pz]) => {
      createCoconutPalm(px + (Math.random() - 0.5) * 3, pz + (Math.random() - 0.5) * 3, 0.9 + Math.random() * 0.35);
    });

    for (let a = 0; a < 14; a++) {
      createArecanutTree(-75 + (a % 7) * 5, 23 + Math.floor(a / 7) * 4, 0.85 + Math.random() * 0.3);
      createArecanutTree(105 + (a % 3) * 5, -55 + Math.floor(a / 3) * 5, 0.9 + Math.random() * 0.25);
    }

    const bananaCoords = [
      [-30, 24], [-33, 27], [-28, 28],
      [32, 25], [35, 28], [30, 30],
      [-52, -16], [-56, -18], [-54, -22],
      [60, -42], [64, -40], [62, -45]
    ];
    bananaCoords.forEach(([bx, bz]) => createBananaPlant(bx, bz, 0.9 + Math.random() * 0.25));

    createFruitTree(-35, -45, true, 1.1);
    createFruitTree(-15, -40, false, 1.2);
    createFruitTree(45, 55, true, 1.0);
    createFruitTree(65, -80, false, 1.1);

    // 6. BUILDINGS & VILLAGE INFRASTRUCTURE
    // Authentic Kerala Roadside Thattukada & Produce Stall (Faithfully recreated after Image 2)
    const thattukada = buildAuthenticKeralaThattukada();
    thattukada.group.position.set(-24, 0, -16);
    worldGroup.add(thattukada.group);
    thattukada.colliders.forEach((c) => {
      colliders.push({
        minX: c.minX - 24,
        maxX: c.maxX - 24,
        minZ: c.minZ - 16,
        maxZ: c.maxZ - 16,
      });
    });

    // Mosque
    const mGroup = new THREE.Group();
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf5f7f5 });
    const mHall = new THREE.Mesh(new THREE.BoxGeometry(18, 7.5, 15), whiteMat);
    mHall.position.y = 3.75;
    mHall.castShadow = true;
    mGroup.add(mHall);

    const domeMat = new THREE.MeshLambertMaterial({ color: 0x18784b });
    const mDome = new THREE.Mesh(new THREE.SphereGeometry(3.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    mDome.position.y = 7.5;
    mGroup.add(mDome);

    const goldMat = new THREE.MeshBasicMaterial({ color: 0xf3ca3e });
    const mCrescent = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.12, 8, 12, Math.PI * 1.4), goldMat);
    mCrescent.position.y = 11.5;
    mCrescent.rotation.z = Math.PI / 2;
    mGroup.add(mCrescent);

    const mMinaret = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 22, 12), whiteMat);
    mMinaret.position.set(-10, 11, 8.5);
    mMinaret.castShadow = true;
    const mCap = new THREE.Mesh(new THREE.SphereGeometry(1.7, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    mCap.position.set(-10, 22, 8.5);
    mGroup.add(mMinaret, mCap);

    const archMat = new THREE.MeshLambertMaterial({ color: 0x1d8a56 });
    for (let aw = -1; aw <= 1; aw++) {
      const arch = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 3.5), archMat);
      arch.position.set(aw * 4.5, 3.2, 7.55);
      mGroup.add(arch);
    }

    const cWallMat = new THREE.MeshLambertMaterial({ color: 0xe6e4db });
    const cWallL = new THREE.Mesh(new THREE.BoxGeometry(8, 1.6, 0.4), cWallMat);
    cWallL.position.set(-6, 0.8, 12);
    const cWallR = cWallL.clone();
    cWallR.position.x = 6;
    mGroup.add(cWallL, cWallR);

    mGroup.position.set(55, 0, -68);
    worldGroup.add(mGroup);
    colliders.push({ minX: 42, maxX: 68, minZ: -78, maxZ: -56 });

    // Additional Kerala buildings
    function createKeralaHouse(x: number, z: number, w: number, h: number, d: number, wallCol: number, roofCol: number) {
      const hGroup = new THREE.Group();
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color: wallCol }));
      wall.position.y = h / 2;
      wall.castShadow = true;
      hGroup.add(wall);

      const roofGeo = new THREE.ConeGeometry(Math.max(w, d) * 0.76 + 0.9, h * 0.6, 4);
      roofGeo.rotateY(Math.PI / 4);
      const roof = new THREE.Mesh(roofGeo, new THREE.MeshLambertMaterial({ color: roofCol }));
      roof.position.y = h + (h * 0.6) / 2 - 0.1;
      roof.castShadow = true;
      hGroup.add(roof);

      hGroup.position.set(x, 0, z);
      worldGroup.add(hGroup);
      colliders.push({ minX: x - w / 2 - 0.9, maxX: x + w / 2 + 0.9, minZ: z - d / 2 - 0.9, maxZ: z + d / 2 + 0.9 });
    }

    // 6B. AUTHENTIC KSRTC BUS STAND & SUB-DEPOT (Dedicated terminal on the plain area)
    const ksrtcStand = buildKSRTCBusStand(38, -35);
    worldGroup.add(ksrtcStand.group);
    colliders.push(...ksrtcStand.colliders);

    // School, market, tharavadu (kept outside grounds)
    createKeralaHouse(-42, -32, 12, 4.4, 9, 0xd9be88, 0xa83822);
    createKeralaHouse(40, 40, 13, 5.0, 11, 0xded1b4, 0x9a361c);

    // 7. ROADSIDE INFRASTRUCTURE (Electric poles & wires, Milestone, Bus shelter)
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x7a8082 });
    const crossMat = new THREE.MeshLambertMaterial({ color: 0x424648 });
    const polePositions = [
      [-70, 7.5], [-35, 7.5], [0, 7.5], [35, 7.5], [70, 7.5],
      [-70, -7.5], [-35, -7.5], [0, -7.5], [35, -7.5], [70, -7.5]
    ];
    const poleTops: THREE.Vector3[] = [];
    polePositions.forEach(([px, pz]) => {
      const pole = new THREE.Group();
      const pPost = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 7.5, 6), poleMat);
      pPost.position.y = 3.75;
      pPost.castShadow = true;
      pole.add(pPost);

      const cross = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 1.8), crossMat);
      cross.position.y = 7.0;
      pole.add(cross);

      pole.position.set(px, 0, pz);
      worldGroup.add(pole);
      poleTops.push(new THREE.Vector3(px, 7.15, pz));
    });

    const wireMat = new THREE.LineBasicMaterial({ color: 0x222222 });
    for (let i = 0; i < poleTops.length / 2 - 1; i++) {
      const p1 = poleTops[i];
      const p2 = poleTops[i + 1];
      const wirePoints = [p1, new THREE.Vector3((p1.x + p2.x) / 2, p1.y - 0.45, (p1.z + p2.z) / 2), p2];
      const wireGeo = new THREE.BufferGeometry().setFromPoints(wirePoints);
      const wire = new THREE.Line(wireGeo, wireMat);
      worldGroup.add(wire);
    }

    // Milestone: SH-17 Kizhakkumpuram 0 KM
    const msGroup = new THREE.Group();
    const msBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.8, 8), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    msBase.position.y = 0.4;
    const msTop = new THREE.Mesh(new THREE.SphereGeometry(0.35, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xf5b722 }));
    msTop.position.y = 0.8;
    msGroup.add(msBase, msTop);
    msGroup.position.set(-12, 0, 7.8);
    worldGroup.add(msGroup);

    // Bus Shelter
    const bsGroup = new THREE.Group();
    const bsRoof = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.15, 2.8), new THREE.MeshLambertMaterial({ color: 0x244f7d }));
    bsRoof.position.set(0, 2.9, 0);
    bsRoof.rotation.x = 0.12;
    const bsPillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.9, 6), crossMat);
    [-2.2, 2.2].forEach(bx => {
      const p = bsPillar.clone();
      p.position.set(bx, 1.45, 1.1);
      bsGroup.add(p);
    });
    const bsBench = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.45, 0.6), new THREE.MeshLambertMaterial({ color: 0xc2beaf }));
    bsBench.position.set(0, 0.45, -0.6);
    bsGroup.add(bsRoof, bsBench);
    bsGroup.position.set(16, 0, 9.5);
    worldGroup.add(bsGroup);

    // 8. VEHICLES (Auto, Bus, Tractor, Jeep, Bullet, Boat)
    interface VehicleData {
      mesh: THREE.Group;
      type: 'auto' | 'ksrtc' | 'private_bus' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat';
      isPlayerVehicle: boolean;
      speed: number;
      bounds: [number, number];
    }
    const vehicles: VehicleData[] = [];

    function createAutoRickshaw(x: number, z: number, angle = 0, isPlayerVehicle = false) {
      const auto = buildDetailedAutoRickshaw(isPlayerVehicle);
      auto.position.set(x, 0, z);
      auto.rotation.y = angle;
      worldGroup.add(auto);

      const vData: VehicleData = {
        mesh: auto,
        type: 'auto',
        isPlayerVehicle,
        speed: 0,
        bounds: [-90, 90],
      };
      vehicles.push(vData);
      return vData;
    }

    function createKeralaBus(x: number, z: number, angle = 0, isKSRTC = true) {
      const bus = buildLuxuryCoachBus();
      bus.position.set(x, 0, z);
      bus.rotation.y = angle;
      worldGroup.add(bus);

      vehicles.push({
        mesh: bus,
        type: 'ksrtc',
        isPlayerVehicle: false,
        speed: 0.18,
        bounds: [-115, 115],
      });
      return bus;
    }

    function createPrivateBus(x: number, z: number, angle = 0, speed = 0.22) {
      const bus = buildKeralaPrivateBus();
      bus.position.set(x, 0, z);
      bus.rotation.y = angle;
      worldGroup.add(bus);

      vehicles.push({
        mesh: bus,
        type: 'private_bus',
        isPlayerVehicle: false,
        speed,
        bounds: [-115, 115],
      });
      return bus;
    }

    const playerAuto = createAutoRickshaw(-6, 8, 0, true);
    createAutoRickshaw(25, -4.5, -Math.PI / 2);

    // DRIVABLE MODERN LUXURY COACH BUS (BUS MODE)
    const playerBusMesh = buildLuxuryCoachBus();
    playerBusMesh.position.set(24, 0, 14.5);
    playerBusMesh.rotation.y = -Math.PI / 2;
    worldGroup.add(playerBusMesh);

    const playerBusData: VehicleData = {
      mesh: playerBusMesh,
      type: 'bus',
      isPlayerVehicle: true,
      speed: 0,
      bounds: [-115, 115],
    };
    vehicles.push(playerBusData);
    colliders.push({ minX: 24 - 6.0, maxX: 24 + 6.0, minZ: 14.5 - 2.0, maxZ: 14.5 + 2.0 });

    // DRIVABLE KERALA PADDY TRACTOR (TRACTOR MODE)
    const playerTractorMesh = buildKeralaTractor();
    playerTractorMesh.position.set(-36, 0, -18);
    playerTractorMesh.rotation.y = Math.PI / 4;
    worldGroup.add(playerTractorMesh);
    const playerTractorData: VehicleData = {
      mesh: playerTractorMesh,
      type: 'tractor',
      isPlayerVehicle: true,
      speed: 0,
      bounds: [-115, 115],
    };
    vehicles.push(playerTractorData);

    // DRIVABLE KERALA 4x4 MOUNTAIN JEEP (JEEP MODE)
    const playerJeepMesh = buildKeralaJeep();
    playerJeepMesh.position.set(-16, 0, 18);
    playerJeepMesh.rotation.y = -Math.PI / 3;
    worldGroup.add(playerJeepMesh);
    const playerJeepData: VehicleData = {
      mesh: playerJeepMesh,
      type: 'jeep',
      isPlayerVehicle: true,
      speed: 0,
      bounds: [-115, 115],
    };
    vehicles.push(playerJeepData);

    // DRIVABLE KERALA CLASSIC BULLET MOTORCYCLE (BULLET MODE)
    const playerBulletMesh = buildKeralaBullet();
    playerBulletMesh.position.set(-12, 0, -8);
    playerBulletMesh.rotation.y = Math.PI / 2;
    worldGroup.add(playerBulletMesh);
    const playerBulletData: VehicleData = {
      mesh: playerBulletMesh,
      type: 'bullet',
      isPlayerVehicle: true,
      speed: 0,
      bounds: [-115, 115],
    };
    vehicles.push(playerBulletData);

    // DRIVABLE BACKWATER BOAT (BOAT MODE)
    const playerBoatMesh = buildKeralaBoat();
    playerBoatMesh.position.set(-62, 0.2, -75);
    playerBoatMesh.rotation.y = 0;
    worldGroup.add(playerBoatMesh);
    const playerBoatData: VehicleData = {
      mesh: playerBoatMesh,
      type: 'boat',
      isPlayerVehicle: true,
      speed: 0,
      bounds: [-115, 115],
    };
    vehicles.push(playerBoatData);

    // Cruising Luxury Coach Buses on Highway SH-17:
    // Eastbound: White Luxury Coach
    createKeralaBus(45, -4, Math.PI / 2, true);
    // Westbound: Luxury Intercity Coach
    createKeralaBus(-65, 4, -Math.PI / 2, true);

    // 8B. KERALA SEVENS FOOTBALL GROUND (സെവൻസ് ഫുട്ബോൾ ഗ്രൗണ്ട്)
    // Modeled exactly after the striped turf pitch diagram with white regulation markings & 3D goals
    const footballGroundData = buildFootballGround(-58, 65, 44, 66);
    worldGroup.add(footballGroundData.groundGroup);
    colliders.push(...footballGroundData.colliders);

    // 9. NPCS & WALKING PEDESTRIANS
    interface NPCData {
      entity: NPCEntity;
      mesh: THREE.Group;
      rig?: HumanRig;
    }
    const npcs: NPCData[] = [];

    function createNPC(
      entity: NPCEntity,
      x: number,
      z: number,
      lungiColor = 0xf0ede6,
      shirtColor = 0x247ba0,
      isGoat = false,
      isBabu = false
    ) {
      let npcGroup: THREE.Group;
      let rig: HumanRig | undefined;

      if (isBabu) {
        // Build 3D Rigged Babu Character strictly matching diagram
        rig = buildRiggedBabuCharacter();
        npcGroup = rig.root;
        npcGroup.rotation.y = Math.PI * 0.72; // Friendly pose facing the road & Chaya Kada
      } else if (isGoat) {
        npcGroup = new THREE.Group();
        const goatMat = new THREE.MeshLambertMaterial({ color: 0xeaeaea });
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 1.3), goatMat);
        body.position.y = 0.65;
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 0.5), goatMat);
        head.position.set(0, 1.1, 0.65);
        const h1 = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.35, 5), new THREE.MeshLambertMaterial({ color: 0x333333 }));
        h1.position.set(-0.15, 1.4, 0.55);
        h1.rotateX(-0.4);
        const h2 = h1.clone();
        h2.position.x = 0.15;
        npcGroup.add(body, head, h1, h2);
      } else {
        rig = buildRiggedTraditionalCharacter({
          shirtColor,
          munduColor: lungiColor,
          kasavuColor: entity.id === 'station_master' ? 0x222222 : 0xd4af37,
          hasUmbrella: entity.id === 'conductor' || entity.id === 'aboobacker',
          foldedMundu: entity.id === 'mohnan' || entity.id === 'private_bus_kili',
          hairColor: entity.id === 'aboobacker' ? 0x888888 : 0x111111,
          hasMoustache: entity.id !== 'aboobacker',
        });
        npcGroup = rig.root;
      }
      npcGroup.position.set(x, 0, z);
      worldGroup.add(npcGroup);

      const data: NPCData = { entity, mesh: npcGroup, rig };
      npcs.push(data);
      return data;
    }

    interface WalkingPedestrian {
      rig: HumanRig;
      waypoints: THREE.Vector3[];
      waypointIndex: number;
      speed: number;
      entity: NPCEntity;
      pauseTimer: number;
    }
    const walkingPedestrians: WalkingPedestrian[] = [];

    function createWalkingPedestrian(
      entity: NPCEntity,
      waypoints: THREE.Vector3[],
      speed = 0.042,
      traditionalOptions: Parameters<typeof buildRiggedTraditionalCharacter>[0] = {}
    ) {
      const rig = buildRiggedTraditionalCharacter(traditionalOptions);
      rig.root.position.copy(waypoints[0]);
      worldGroup.add(rig.root);

      const pedestrian: WalkingPedestrian = {
        rig,
        waypoints,
        waypointIndex: 1,
        speed,
        entity,
        pauseTimer: 0,
      };
      walkingPedestrians.push(pedestrian);

      npcs.push({
        entity,
        mesh: rig.root,
        rig,
      });

      return pedestrian;
    }

    createNPC(
      {
        id: 'babu',
        name: "Babu (ബാബു • Techie)",
        malayalamName: "ബാബു • ബാംഗ്ലൂർ റിട്ടേൺ",
        role: "Bangalore Return Techie & Auto Friend",
        dialogue: "“ഹലോ ഉണ്ണീ! ബാംഗ്ലൂർ ടെക് പാർക്കിൽ നിന്ന് ലാപ്ടോപ്പ് ബാഗും തൂക്കി നാട്ടിൽ എത്തിയതാണ്! ഈ നീല ഷർട്ടും ലൂസ് ബീജ് പാന്റും കണ്ണടയും ഐഡി കാർഡും കണ്ടില്ലേ? നാട്ടിലെ റോഡിലൂടെ ഓട്ടോ ഓടിക്കാൻ എന്ത് ത്രില്ലാണ്! [F] അമർത്തിയാൽ എന്റെ ഓട്ടോയിൽ കയറാം!”",
        avatar: "👓",
        tag: "AUTO"
      },
      -21, -12, 0, 0, false, true
    );

    createNPC(
      {
        id: 'mohnan',
        name: "Mohanan Nair (നായർ ചേട്ടൻ)",
        malayalamName: "നായർ ചേട്ടൻ",
        role: "Thattukada Master",
        dialogue: "“എന്താ വേണ്ടത് ചേട്ടാ? ചൂട് കട്ടൻ ചായയോ, സുലൈമാനിയോ, പൊറോട്ട & ബീഫ് കറിയോ, നല്ല ആവി പറക്കുന്ന പഴംപൊരിയോ എടുക്കട്ടെ? [🍵 തട്ടുകട മെനു] നോക്കൂ!”",
        avatar: "☕",
        tag: "CHAYA"
      },
      -22.6, -15.2, 0xeeeeee, 0x1f4e5b
    );

    createNPC(
      {
        id: 'goat',
        name: "Aadu Thoma (ആട് തോമ 🐐)",
        malayalamName: "ആട് തോമ",
        role: "Village Notorious Goat",
        dialogue: "“മേഹ്ഹ്ഹ്ഹ്! (നിങ്ങൾ ഏത് ജില്ലക്കാരനായാലും എന്റെ വഴിയേ വരരുത്!)”",
        avatar: "🐐",
        tag: "GOAT"
      },
      8, 12, 0, 0, true
    );

    createNPC(
      {
        id: 'aboobacker',
        name: "Aboobacker Kaka (അബൂബക്കർ കാക്ക)",
        malayalamName: "അബൂബക്കർ കാക്ക",
        role: "Community Elder",
        dialogue: "“അസ്സലാമു അലൈക്കും ഉണ്ണീ! പള്ളി റോഡിൽ സമാധാനപരമായ അന്തരീക്ഷമാണ്. നായരുടെ കടയിൽ പോയാൽ നല്ല ഏലക്ക ചായ കിട്ടും.”",
        avatar: "🕌",
        tag: "ELDER"
      },
      52, -60, 0xffffff, 0xffffff
    );

    // KSRTC Bus Stand Platform NPCs
    createNPC(
      {
        id: 'station_master',
        name: "Damodaran Pillai (സ്റ്റേഷൻ മാസ്റ്റർ)",
        malayalamName: "സ്റ്റേഷൻ മാസ്റ്റർ ദാമോദരൻ പിള്ള",
        role: "KSRTC Station Master",
        dialogue: "“കിഴക്കുംപുറം KSRTC സബ് ഡിപ്പോയിലേക്ക് സ്വാഗതം! ബേ 1 ൽ തിരുവനന്തപുരം സൂപ്പർ ഫാസ്റ്റ് റെഡിയാണ്. റിസർവേഷൻ കൗണ്ടറിൽ നിന്ന് ടിക്കറ്റ് എടുക്കാം!”",
        avatar: "👨‍✈️",
        tag: "KSRTC"
      },
      26, -46, 0x8a623a, 0xa5752c
    );

    createNPC(
      {
        id: 'conductor',
        name: "Sukumaran (കണ്ടക്ടർ സുകു)",
        malayalamName: "കണ്ടക്ടർ സുകുമാരൻ",
        role: "Chief Conductor",
        dialogue: "“വൈറ്റില, ആലപ്പുഴ, കൊല്ലം വഴി തിരുവനന്തപുരം സൂപ്പർ ഫാസ്റ്റ്! ടിക്കറ്റ് കയ്യിൽ കരുതുക, ബാക്കി ചില്ലറ ഇറങ്ങുമ്പോൾ തരാം!”",
        avatar: "🎫",
        tag: "KSRTC"
      },
      36, -46, 0x8a623a, 0x9b6b28
    );

    // Kerala Private Bus Door Boy / Kili NPC
    createNPC(
      {
        id: 'private_bus_kili',
        name: "Noushad (കിളി നൗഷാദ്)",
        malayalamName: "കിളി നൗഷാദ് • എരഞ്ഞിക്കൽ",
        role: "Private Bus Door Boy & Cleaner",
        dialogue: "“കോഴിക്കോട്... കോഴിക്കോട്... ലിമിറ്റഡ് സ്റ്റോപ്പ്! എരഞ്ഞിക്കൽ ക്ലബ്ബ് എഡിഷൻ (SAMMAS)! കൊണ്ടോട്ടി, രാമനാട്ടുകര വഴി നേരെ കോഴിക്കോട്! കയറിപ്പിടിച്ചോ വേഗം!”",
        avatar: "🚩",
        tag: "Private Bus"
      },
      26, 12, 0xd97706, 0xdb2777
    );

    // Active Walking Pedestrians in the Kerala Town
    createWalkingPedestrian(
      {
        id: 'shafi',
        name: "Shafi (പത്രക്കാരൻ ഷാഫി)",
        malayalamName: "പത്രക്കാരൻ ഷാഫി",
        role: "Village Newspaper Distributor",
        dialogue: "“മനോരമയും മാതൃഭൂമിയും ചായക്കടയിൽ എത്തിച്ചു! ഈ മഴയത്ത് റോഡിലൂടെ നടക്കാൻ നല്ല സുഖമാണ്!”",
        avatar: "📰",
        tag: "WALKER",
      },
      [new THREE.Vector3(-34, 0, -14), new THREE.Vector3(-6, 0, -14)],
      0.038,
      { shirtColor: 0x16a34a, munduColor: 0x334155, foldedMundu: true, hasMoustache: true }
    );

    createWalkingPedestrian(
      {
        id: 'radhamani',
        name: "Radhamani Teacher (രാധാമണി ടീച്ചർ)",
        malayalamName: "രാധാമണി ടീച്ചർ • എൽ.പി സ്കൂൾ",
        role: "School Teacher",
        dialogue: "“സ്കൂൾ വിട്ട് വീട്ടിലേക്ക് പോവുകയാണ്. ഈ മഴയത്ത് കുടയില്ലാതെ ഇറങ്ങിയാൽ പനി ഉറപ്പ്. ഉണ്ണീ, മഴ നനയാതെ നോക്കണേ!”",
        avatar: "🌂",
        tag: "WALKER",
      },
      [new THREE.Vector3(8, 0, -11), new THREE.Vector3(38, 0, -11)],
      0.032,
      { shirtColor: 0xc026d3, munduColor: 0xfef08a, hasUmbrella: true, hasMoustache: false, kasavuColor: 0xd97706 }
    );

    createWalkingPedestrian(
      {
        id: 'ashokan',
        name: "Ashokan (അശോകൻ ചേട്ടൻ)",
        malayalamName: "അശോകൻ ചേട്ടൻ",
        role: "Commuter to KSRTC Stand",
        dialogue: "“ആലപ്പുഴ സൂപ്പർ ഫാസ്റ്റിൽ കയറാൻ സ്റ്റാൻഡിലേക്ക് നടക്കുകയാണ്. ബസ്സ് പോകും മുൻപ് ടിക്കറ്റ് കൗണ്ടറിൽ എത്തണം!”",
        avatar: "🚶",
        tag: "WALKER",
      },
      [new THREE.Vector3(14, 0, -22), new THREE.Vector3(28, 0, -42), new THREE.Vector3(38, 0, -42)],
      0.042,
      { shirtColor: 0x0284c7, munduColor: 0xf3f4f6, hasUmbrella: true, hasMoustache: true }
    );

    // Sevens Football Ground Coach NPC
    createNPC(
      {
        id: 'football_coach',
        name: "Majeed (കോച്ച് മജീദ്)",
        malayalamName: "കോച്ച് മജീദ് • സെവൻസ് റഫറി",
        role: "Sevens Football Coach & Referee",
        dialogue: "“വാ ഉണ്ണീ ഗ്രൗണ്ടിലേക്ക്! പുതിയ സെവൻസ് ടർഫ് കണ്ടോ? വരകളും പോസ്റ്റും പന്തും ഒക്കെ റെഡിയാണ്. [W,A,S,D] കൊണ്ട് പന്തിലേക്ക് ഓടി ചവിട്ടിയാൽ നല്ല അടിപൊളി ഗോൾ അടിക്കാം! [Shift] പിടിച്ചാൽ നല്ല പവർ കിക്ക് കിട്ടും!”",
        avatar: "⚽",
        tag: "SEVENS",
      },
      -36, 60, 0xffffff, 0xd97706
    );

    // Sevens Stadium Ticket Collector NPC (ടിക്കറ്റ് കൗണ്ടർ • ₹50 ENTRY)
    // Standing at the front entrance right beside the ticket window, facing approaching visitors
    const tX = footballGroundData.ticketCounterPos.x;
    const tZ = footballGroundData.ticketCounterPos.z;
    const ticketKoyaNPC = createNPC(
      {
        id: 'ticket_koya',
        name: "Koya (ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്)",
        malayalamName: "ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്",
        role: "Stadium Ticket Collector (₹50 Entry)",
        dialogue: "“സ്വാഗതം കിഴക്കുംപുറം സെവൻസ് സ്റ്റേഡിയത്തിലേക്ക്! ഇന്നത്തെ ബിഗ് മാച്ച്: കിഴക്കുംപുറം FC vs മലപ്പുറം സെവൻസ്! പ്രവേശന ഫീസ് വെറും ₹50 രൂപ മാത്രം! ടിക്കറ്റ് എടുത്ത് ഇരുവശത്തെയും ഗാലറിയിലേക്ക് കയറിക്കോളൂ!”",
        avatar: "🎫",
        tag: "TICKET",
      },
      tX + 2.2, tZ - 1.8, 0xf5f5f5, 0x166534
    );
    ticketKoyaNPC.mesh.rotation.y = Math.PI; // Face North toward approaching visitors

    // Lotus Pond Caretaker & Flower Gatherer NPC (ആമ്പൽക്കുളം • താമരപ്പൂക്കൾ)
    createNPC(
      {
        id: 'lotus_pond',
        name: "Devaki Amma (ദേവകി അമ്മ • പൂന്തോട്ടം)",
        malayalamName: "ദേവകി അമ്മ • താമരക്കുളം",
        role: "Lotus Pond Caretaker & Flower Gatherer",
        dialogue: "“കിഴക്കുംപുറത്തെ ശാന്തമായ ആമ്പൽക്കുളത്തിലേക്ക് സ്വാഗതം! ഇവിടെ തെളിഞ്ഞ നീല വെള്ളത്തിൽ വിരിഞ്ഞുനിൽക്കുന്ന ആമ്പൽപൂക്കളും നീന്തിത്തുടിക്കുന്ന വർണ്ണമത്സ്യങ്ങളും കാണാം. കല്ലിന്മേൽ ഇരുന്ന് തണുത്ത കാറ്റേൽക്കൂ!”",
        avatar: "🌸",
        tag: "POND",
      },
      -94, -73, 0xfef08a, 0x15803d
    );

    // District 5: Taluk Hospital Chief Medical Officer (ആശുപത്രി)
    createNPC(
      {
        id: 'hospital_dr_anjali',
        name: "Dr. Anjali (ഡോ. അഞ്ജലി • താലൂക്ക് ആശുപത്രി)",
        malayalamName: "ഡോ. അഞ്ജലി • മെഡിക്കൽ ഓഫീസർ",
        role: "Taluk Hospital Chief Medical Officer",
        dialogue: "“കിഴക്കുംപുറം താലൂക്ക് ആശുപത്രിയിലേക്ക് സ്വാഗതം! 24 മണിക്കൂറും അത്യാഹിത വിഭാഗവും ആംബുലൻസ് സൗകര്യവും ഇവിടെ പ്രവർത്തിക്കുന്നു. ഗ്രാമീണ ജനങ്ങളുടെ ആരോഗ്യമാണ് പ്രധാനം!”",
        avatar: "🩺",
        tag: "HOSPITAL",
      },
      14, 62, 0xe2e8f0, 0x0284c7
    );

    // District 3: Daily Bazaar & Fish Monger (ചന്ത • പച്ചക്കറി & മീൻ)
    createNPC(
      {
        id: 'market_moosa_kaka',
        name: "Moosa Kaka (മൂസാ കാക്ക • മീൻ ചന്ത)",
        malayalamName: "മൂസാ കാക്ക • ചന്ത",
        role: "Bazaar Merchant & Fresh Fish Monger",
        dialogue: "“ഇന്ന് രാവിലെ കടലിൽ നിന്ന് പിടിച്ച നല്ല ഫ്രഷ് അയലയും മത്തിയും ഉണ്ട് മോനേ! ചന്തയിൽ പച്ചക്കറിയും പഴങ്ങളും കുറഞ്ഞ വിലയ്ക്ക് കിട്ടും. നോക്കി വാങ്ങിപ്പോകൂ!”",
        avatar: "🐟",
        tag: "MARKET",
      },
      92, 14, 0xfef08a, 0x9a3412
    );

    // District 8: Highland Viewpoint Guide (മലയോരം • തേയിലത്തോട്ടം)
    createNPC(
      {
        id: 'highland_chandran',
        name: "Chandran Chettan (ചന്ദ്രൻ ചേട്ടൻ • മലയോരം)",
        malayalamName: "ചന്ദ്രൻ ചേട്ടൻ • വ്യൂ പോയിൻ്റ്",
        role: "Highland Forest Guide & Tea Planter",
        dialogue: "“ഇതാണ് കിഴക്കുംപുറത്തെ ഏറ്റവും ഉയരമുള്ള മലയോര വ്യൂ പോയിൻ്റ്! ഇവിടെ നിന്നാൽ താഴെ പച്ചപ്പരപ്പാർന്ന ഗ്രാമവും അകലെ അറബിക്കടലും കാണാം. തേയിലത്തോട്ടത്തിലെ തണുത്ത കാറ്റ് ശ്വസിക്കൂ!”",
        avatar: "⛰️",
        tag: "HIGHLAND",
      },
      4, -278, 0xbfdbfe, 0x166534
    );

    // District 10: Backwater Houseboat Captain (കായൽ • കെട്ടുവള്ളം)
    createNPC(
      {
        id: 'backwater_shaji',
        name: "Captain Shaji (സ്രാങ്ക് ഷാജി • കെട്ടുവള്ളം)",
        malayalamName: "സ്രാങ്ക് ഷാജി • ഹൗസ്ബോട്ട്",
        role: "Kettuvallam Houseboat Captain",
        dialogue: "“വേമ്പനാട് കായലിലൂടെയുള്ള ശിക്കാര വള്ളം യാത്രയ്ക്ക് തയ്യാറാണോ? കരിമീൻ പൊള്ളിച്ചതും കരിക്കിൻ വെള്ളവും കഴിച്ച് തെങ്ങുകൾക്കിടയിലൂടെ ശാന്തമായി തുഴയാം!”",
        avatar: "🛶",
        tag: "BACKWATER",
      },
      104, 232, 0xfde047, 0x075985
    );

    // District 11: Lighthouse Beach Coconut Vendor (കടൽത്തീരം • ഇളനീർ)
    createNPC(
      {
        id: 'beach_vijayan',
        name: "Vijayan (വിജയൻ • ഇളനീർ കച്ചവടം)",
        malayalamName: "വിജയൻ • ലൈറ്റ് ഹൗസ് ബീച്ച്",
        role: "Beachside Tender Coconut Vendor",
        dialogue: "“ലൈറ്റ് ഹൗസ് ബീച്ചിലേക്ക് സ്വാഗതം സുഹൃത്തേ! ചൂടുള്ള വെയിലിൽ ഒരു നല്ല മധുരമുള്ള തണുത്ത ഇളനീർ കുടിക്കൂ. വൈകുന്നേരം അറബിക്കടലിലെ സൂര്യാസ്തമയം കാണാൻ ആളുകൾ എത്തും!”",
        avatar: "🥥",
        tag: "BEACH",
      },
      -18, 322, 0xfacc15, 0x854d0e
    );

    // District 4: St. Mary's School Headmaster (വിദ്യാഭ്യാസ മേഖല)
    createNPC(
      {
        id: 'school_thomas_sir',
        name: "Thomas Sir (തോമസ് സാർ • ഹെഡ്മാസ്റ്റർ)",
        malayalamName: "തോമസ് സാർ • സ്കൂൾ",
        role: "St. Mary's School Headmaster",
        dialogue: "“വിദ്യാഭ്യാസമാണ് നാടിൻ്റെ വെളിച്ചം! നമ്മുടെ സെവൻസ് ഫുട്ബോൾ മൈതാനത്ത് വൈകുന്നേരം കുട്ടികളുടെ മാച്ച് നടക്കുന്നുണ്ട്. പഠനത്തോടൊപ്പം കായിക മികവും വേണം!”",
        avatar: "📚",
        tag: "SCHOOL",
      },
      112, -72, 0xffffff, 0x1e3a8a
    );

    // 10. PLAYABLE CHARACTER (Rigged Babu or Rigged Unni with authentic walking locomotion)
    const player = new THREE.Group();
    let currentPlayerModel: 'unni' | 'babu' = playerModel;
    let playerRig: HumanRig = currentPlayerModel === 'babu'
      ? buildRiggedBabuCharacter()
      : buildRiggedTraditionalCharacter({
          shirtColor: 0x1e56a0,
          munduColor: 0xf5f3e9,
          kasavuColor: 0xd4af37,
        });

    player.add(playerRig.root);
    player.position.set(0, 0, 5);
    scene.add(player);

    function setPlayerSkin(model: 'unni' | 'babu') {
      if (model === currentPlayerModel) return;
      currentPlayerModel = model;
      player.remove(playerRig.root);
      if (model === 'babu') {
        playerRig = buildRiggedBabuCharacter();
      } else {
        playerRig = buildRiggedTraditionalCharacter({
          shirtColor: 0x1e56a0,
          munduColor: 0xf5f3e9,
          kasavuColor: 0xd4af37,
        });
      }
      player.add(playerRig.root);
    }

    const playerState = {
      velocity: new THREE.Vector3(),
      speed: 0.15,
      sprintMultiplier: 1.8,
      isGrounded: true,
      inVehicle: false,
      vehicleType: 'auto' as 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat',
    };

    // 11. MONSOON RAIN SYSTEM
    let rainParticles: THREE.Points | null = null;
    function createMonsoonRain() {
      if (rainParticles) return;
      const rainGeo = new THREE.BufferGeometry();
      const count = 2600;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 180;
        pos[i + 1] = Math.random() * 45;
        pos[i + 2] = (Math.random() - 0.5) * 180;
      }
      rainGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const rainMat = new THREE.PointsMaterial({
        color: 0xa4d4f2,
        size: 0.32,
        transparent: true,
        opacity: 0.72,
      });
      rainParticles = new THREE.Points(rainGeo, rainMat);
      scene.add(rainParticles);

      scene.fog = new THREE.FogExp2(0x566d73, 0.016);
      scene.background = new THREE.Color(0x566d73);
      sunLight.intensity = 0.55;
      ambientLight.color.setHex(0x758a91);
    }

    function removeMonsoonRain() {
      if (rainParticles) {
        scene.remove(rainParticles);
        rainParticles.geometry.dispose();
        rainParticles = null;
      }
    }

    function applyWeather(mode: WeatherMode) {
      if (mode === 'monsoon') {
        createMonsoonRain();
      } else if (mode === 'morning') {
        removeMonsoonRain();
        scene.fog = new THREE.FogExp2(0xc4e2e8, 0.009);
        scene.background = new THREE.Color(0xb2dbe2);
        sunLight.intensity = 1.1;
        sunLight.color.setHex(0xfffae0);
        ambientLight.color.setHex(0xe3f2fd);
      } else if (mode === 'evening') {
        removeMonsoonRain();
        scene.fog = new THREE.FogExp2(0x995e38, 0.007);
        scene.background = new THREE.Color(0xd67d4b);
        sunLight.intensity = 1.3;
        sunLight.color.setHex(0xffaa5e);
        ambientLight.color.setHex(0xffc599);
      }
    }

    function applyTimeOfDay(time: 'morning' | 'afternoon' | 'evening' | 'night') {
      if (time === 'night') {
        scene.fog = new THREE.FogExp2(0x060f17, 0.012);
        scene.background = new THREE.Color(0x060f17);
        sunLight.intensity = 0.22;
        sunLight.color.setHex(0x7ea0d6); // cold moonlight
        ambientLight.color.setHex(0x1a2e40);
      } else if (time === 'morning') {
        scene.fog = new THREE.FogExp2(0xb6dbe2, 0.009);
        scene.background = new THREE.Color(0xaad3dc);
        sunLight.intensity = 1.1;
        sunLight.color.setHex(0xfff3d1);
        ambientLight.color.setHex(0xdbeef8);
      } else if (time === 'evening') {
        scene.fog = new THREE.FogExp2(0x8a4b2a, 0.008);
        scene.background = new THREE.Color(0xc96a3b);
        sunLight.intensity = 1.25;
        sunLight.color.setHex(0xff7733);
        ambientLight.color.setHex(0xffa873);
      } else {
        // afternoon
        scene.fog = new THREE.FogExp2(0x9fc8b5, 0.006);
        scene.background = new THREE.Color(0x82b89f);
        sunLight.intensity = 1.4;
        sunLight.color.setHex(0xffffff);
        ambientLight.color.setHex(0xd0e8dc);
      }
    }

    applyWeather(weather);
    applyTimeOfDay(timeOfDay);

    // 12. CONTROLLER
    const keys: Record<string, boolean> = {};

    function handleKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      keys[k] = true;

      if (k === 'e') {
        checkInteractions();
      } else if (k === 'f') {
        toggleVehicleState();
      } else if (k === 'v') {
        // Toggle vehicle between Auto and Luxury Coach Bus
        toggleVehicleState(playerState.inVehicle ? (playerState.vehicleType === 'bus' ? 'auto' : 'bus') : 'bus');
      } else if (k === 'h') {
        if (playerState.inVehicle && playerState.vehicleType === 'auto') soundSynth.playSound('autohorn');
        else soundSynth.playSound('airhorn');
      } else if (k === 't') {
        soundSynth.playSound('teaglass');
      } else if (e.key === ' ' && playerState.isGrounded && !playerState.inVehicle) {
        playerState.velocity.y = 0.22;
        playerState.isGrounded = false;
        soundSynth.playSound('jump');
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      keys[e.key.toLowerCase()] = false;
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    function toggleVehicleState(preferredType?: 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat') {
      if (playerState.inVehicle) {
        playerState.inVehicle = false;
        player.visible = true;
        const currentV = vehicles.find(v => v.isPlayerVehicle && v.type === playerState.vehicleType);
        if (currentV) {
          player.position.set(currentV.mesh.position.x + 2.2, 0, currentV.mesh.position.z + 1.0);
        }
        onVehicleToggle(false, playerState.vehicleType);
      } else {
        const chosenType = preferredType || 'auto';
        playerState.inVehicle = true;
        playerState.vehicleType = chosenType;
        player.visible = false;

        if (chosenType === 'bus') soundSynth.playSound('airhorn');
        else if (chosenType === 'auto') soundSynth.playSound('autohorn');
        else if (chosenType === 'tractor') soundSynth.playSound('tractor');
        else if (chosenType === 'jeep') soundSynth.playSound('airhorn');
        else if (chosenType === 'bullet') soundSynth.playSound('bullet');
        else if (chosenType === 'boat') soundSynth.playSound('splash');

        // Teleport player vehicle to player if too far
        const targetV = vehicles.find(v => v.isPlayerVehicle && v.type === chosenType);
        if (targetV && targetV.mesh.position.distanceTo(player.position) > 35) {
          targetV.mesh.position.set(player.position.x, 0, player.position.z);
        }

        onVehicleToggle(true, chosenType);
      }
    }

    function checkInteractions() {
      // Check if near thattukada counter (-22.6, 0, -13.5)
      const distToThattukada = player.position.distanceTo(new THREE.Vector3(-22.6, 0, -13.5));
      if (distToThattukada < 6.5) {
        soundSynth.playSound('teaglass');
        onOpenThattukada?.();
        const mohanNPC = npcs.find((n) => n.entity.id === 'mohnan');
        if (mohanNPC) {
          onInteractNPC(mohanNPC.entity);
        }
        return;
      }

      let nearestNPC: NPCData | null = null;
      let minDist = 7.0;

      npcs.forEach(n => {
        const d = player.position.distanceTo(n.mesh.position);
        if (d < minDist) {
          minDist = d;
          nearestNPC = n;
        }
      });

      if (nearestNPC) {
        soundSynth.playSound('teaglass');
        onInteractNPC((nearestNPC as NPCData).entity);
        if ((nearestNPC as NPCData).entity.id === 'mohnan') {
          onOpenThattukada?.();
        }
      }
    }

    // World API Exposure
    worldApiRef.current = {
      setWeather: applyWeather,
      setTimeOfDay: applyTimeOfDay,
      toggleVehicle: (type?: 'auto' | 'bus' | 'tractor' | 'jeep' | 'bullet' | 'boat') => toggleVehicleState(type),
      focusPOI: (poi) => {
        if (poi === 'chaya') {
          player.position.set(-22.6, 0, -12.0);
          camera.position.set(-22.6, 2.2, -7.5);
          camera.lookAt(-22.6, 1.6, -15.5);
          checkInteractions();
          onOpenThattukada?.();
        } else if (poi === 'mosque') {
          player.position.set(52, 0, -56);
          checkInteractions();
        } else if (poi === 'auto') {
          player.position.set(-8, 0, 8);
          toggleVehicleState();
        } else if (poi === 'bus') {
          player.position.set(34, 0.75, -45);
          soundSynth.playSound('airhorn');
          checkInteractions();
        } else if (poi === 'football') {
          player.position.set(-58, 0.15, 60);
          camera.position.set(-58, 12, 85);
          camera.lookAt(-58, 1, 65);
          soundSynth.playSound('whistle');
          checkInteractions();
        } else if (poi === 'ticket') {
          const tcX = footballGroundData.ticketCounterPos.x;
          const tcZ = footballGroundData.ticketCounterPos.z;
          player.position.set(tcX, 0.15, tcZ - 3.2);
          camera.position.set(tcX, 2.5, tcZ - 7.5);
          camera.lookAt(tcX, 1.6, tcZ);
          soundSynth.playSound('ticket');
          checkInteractions();
        } else if (poi === 'pond') {
          player.position.set(-94, 0.2, -73);
          camera.position.set(-101, 4.8, -65);
          camera.lookAt(-80, 0, -75);
          soundSynth.playSound('splash');
          checkInteractions();
        }
      },
      teleportTo: (x: number, z: number) => {
        if (playerState.inVehicle) {
          playerState.inVehicle = false;
          player.visible = true;
          onVehicleToggle(false);
        }
        player.position.set(x, 0.5, z);
        playerState.velocity.set(0, 0, 0);
        playerState.isGrounded = true;
        camera.position.set(x, 11, z + 18);
        camera.lookAt(x, 2, z);
        checkInteractions();
      },
      triggerInteract: checkInteractions,
      setPlayerSkin: (model: 'unni' | 'babu') => setPlayerSkin(model),
    };

    // 13. ANIMATION LOOP
    let lastTime = performance.now();
    function animate() {
      animFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Lotus pond ripples, floating pads bobbing & swimming koi fish
      lotusPond.updateAnimation(now);

      // Big Map coastal lighthouse beacon beam & water waves
      bigMap.updateAnimation(now);

      // Thattukada tea samovar steam puffs & swaying hanging packets
      thattukada.updateAnimation(now * 0.001);

      // Moving highway traffic & living animal behaviors (cows, dogs, chickens)
      livingWorld.update(now, dt);

      // Wind sway in foliage
      animatedFlora.forEach(f => {
        const windSway = Math.sin(now * 0.0018 * f.speed + f.phase);
        if (f.type === 'palm') {
          f.crown.rotation.z = windSway * 0.065;
          f.crown.rotation.x = Math.cos(now * 0.0015 + f.phase) * 0.045;
        } else if (f.type === 'arecanut') {
          f.crown.rotation.z = windSway * 0.04;
        } else if (f.type === 'banana') {
          f.crown.rotation.y += Math.sin(now * 0.001 + f.phase) * 0.001;
        }
      });

      // Rain particles
      if (rainParticles) {
        const pos = rainParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] -= 1.1;
          pos[i - 1] += 0.08;
          if (pos[i] < 0) {
            pos[i] = 45;
            pos[i - 1] = (Math.random() - 0.5) * 180;
          }
        }
        rainParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Vehicles (Player Auto / Luxury Coach Bus & Traffic)
      vehicles.forEach(v => {
        if (v.isPlayerVehicle && playerState.inVehicle) {
          const isCurrentActive = (v.type === playerState.vehicleType);
          if (isCurrentActive) {
            let vSpeed = 0;
            let turn = 0;
            let maxFwd = 0.44;
            let maxRev = -0.20;
            let turnRate = 0.045;

            if (v.type === 'bus') {
              maxFwd = 0.48;
              maxRev = -0.22;
              turnRate = 0.032;
            } else if (v.type === 'auto') {
              maxFwd = 0.44;
              maxRev = -0.20;
              turnRate = 0.048;
            } else if (v.type === 'tractor') {
              maxFwd = 0.36;
              maxRev = -0.16;
              turnRate = 0.038;
            } else if (v.type === 'jeep') {
              maxFwd = 0.52;
              maxRev = -0.24;
              turnRate = 0.044;
            } else if (v.type === 'bullet') {
              maxFwd = 0.62;
              maxRev = -0.15;
              turnRate = 0.054;
            } else if (v.type === 'boat') {
              maxFwd = 0.38;
              maxRev = -0.15;
              turnRate = 0.028;
            }

            if (keys['w'] || keys['arrowup']) vSpeed = maxFwd;
            if (keys['s'] || keys['arrowdown']) vSpeed = maxRev;
            if (keys['a'] || keys['arrowleft']) turn = turnRate;
            if (keys['d'] || keys['arrowright']) turn = -turnRate;

            v.mesh.rotation.y += turn;
            v.mesh.translateZ(vSpeed);
            player.position.copy(v.mesh.position);
          }
        } else if (!v.isPlayerVehicle) {
          v.mesh.translateZ(v.speed);
          if (v.mesh.position.x > v.bounds[1]) v.mesh.position.x = v.bounds[0];
          if (v.mesh.position.x < v.bounds[0]) v.mesh.position.x = v.bounds[1];
        }
      });

      // Walking Village Pedestrians (Realistic Human Bipedal Locomotion)
      walkingPedestrians.forEach(p => {
        const currentPos = p.rig.root.position;
        const targetWp = p.waypoints[p.waypointIndex];
        const dir = new THREE.Vector3().subVectors(targetWp, currentPos);
        dir.y = 0;
        const dist = dir.length();

        if (p.pauseTimer > 0) {
          p.pauseTimer -= dt;
          p.rig.updateAnimation(dt, false, false, 0);
          return;
        }

        if (dist < 0.6) {
          p.waypointIndex = (p.waypointIndex + 1) % p.waypoints.length;
          p.pauseTimer = 1.0;
          p.rig.updateAnimation(dt, false, false, 0);
        } else {
          dir.normalize();
          const step = Math.min(dist, p.speed * dt * 60);
          currentPos.addScaledVector(dir, step);

          const targetAngle = Math.atan2(dir.x, dir.z);
          p.rig.root.rotation.y = THREE.MathUtils.lerp(p.rig.root.rotation.y, targetAngle, 0.12);

          p.rig.updateAnimation(dt, true, false, 1.0);
        }
      });

      // Player Movement & Locomotion Animation
      let isPlayerMoving = false;
      let isSprinting = false;
      if (!playerState.inVehicle) {
        let moveX = 0, moveZ = 0;
        isSprinting = !!keys['shift'];
        const curSpeed = playerState.speed * (isSprinting ? playerState.sprintMultiplier : 1.0);
        if (keys['w'] || keys['arrowup']) moveZ -= 1;
        if (keys['s'] || keys['arrowdown']) moveZ += 1;
        if (keys['a'] || keys['arrowleft']) moveX -= 1;
        if (keys['d'] || keys['arrowright']) moveX += 1;

        if (moveX !== 0 || moveZ !== 0) {
          isPlayerMoving = true;
          const moveVec = new THREE.Vector3(moveX, 0, moveZ).normalize();
          const targetRot = Math.atan2(moveVec.x, moveVec.z);
          // Correct shortest-path angle lerp so character faces forward in movement direction
          let angleDiff = (targetRot - player.rotation.y) % (Math.PI * 2);
          if (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          if (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          player.rotation.y += angleDiff * 0.22;

          const newX = player.position.x + moveVec.x * curSpeed;
          const newZ = player.position.z + moveVec.z * curSpeed;

          let blocked = false;
          for (const c of colliders) {
            if (newX > c.minX && newX < c.maxX && newZ > c.minZ && newZ < c.maxZ) {
              blocked = true;
              break;
            }
          }
          if (!blocked) {
            player.position.x = newX;
            player.position.z = newZ;
          }
        }

        // Authentic human walk cycle (legs swing, knees flex, feet articulate, torso twists, arms counter-swing)
        playerRig.updateAnimation(dt, isPlayerMoving, isSprinting, isSprinting ? 1.4 : 1.0);
      }

      // Update Sevens Football physics and kicking interactions
      footballGroundData.footballPhysics.update(
        dt,
        player.position,
        isPlayerMoving,
        isSprinting,
        () => {
          soundSynth.playSound('goal');
          soundSynth.playSound('whistle');
        },
        () => {
          soundSynth.playSound('kick');
        }
      );

      // Dynamic NPC response (Babu and villagers face player when nearby and breathe)
      npcs.forEach(n => {
        const d = player.position.distanceTo(n.mesh.position);
        if (d < 9.0) {
          const targetAngle = Math.atan2(player.position.x - n.mesh.position.x, player.position.z - n.mesh.position.z);
          n.mesh.rotation.y = THREE.MathUtils.lerp(n.mesh.rotation.y, targetAngle, 0.04);
        }
        // Idle animation for stationary NPCs
        const isPedestrian = walkingPedestrians.some(wp => wp.rig.root === n.mesh);
        if (!isPedestrian) {
          n.rig?.updateAnimation(dt, false, false, 0);
        }
      });

      // Gravity & Jump
      if (!playerState.isGrounded) {
        player.position.y += playerState.velocity.y;
        playerState.velocity.y -= 0.012;
        if (player.position.y <= 0) {
          player.position.y = 0;
          playerState.velocity.y = 0;
          playerState.isGrounded = true;
        }
      }

      // Camera follow (Dynamic framing for Walking vs Auto Rickshaw vs 12m Luxury Coach Bus)
      let focusPos = player.position;
      let camOffset = new THREE.Vector3(0, 11, 18);
      if (playerState.inVehicle) {
        if (playerState.vehicleType === 'bus') {
          focusPos = playerBusMesh.position;
          camOffset = new THREE.Vector3(0, 16, 26);
        } else {
          focusPos = playerAuto.mesh.position;
          camOffset = new THREE.Vector3(0, 11, 18);
        }
      }
      const targetCam = focusPos.clone().add(camOffset);
      camera.position.lerp(targetCam, 0.08);
      camera.lookAt(focusPos.x, focusPos.y + (playerState.vehicleType === 'bus' && playerState.inVehicle ? 3.2 : 2.0), focusPos.z);

      renderer.render(scene, camera);
    }

    animate();

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" id="threejs-container-ANIMATION_AUTHENTIC_KERALA" />;
}
