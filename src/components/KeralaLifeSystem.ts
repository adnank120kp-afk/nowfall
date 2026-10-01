export interface FarmlandPlot {
  id: 'coconut' | 'banana' | 'rice';
  name: string;
  malayalamName: string;
  district: string;
  coords: { x: number; z: number };
  cropName: string;
  cropIcon: string;
  cropUnit: string;
  pricePerUnit: number;
  readyToHarvest: boolean;
  yieldAmount: number;
  growthProgress: number; // 0 to 100
  harvestCooldown: number; // seconds
}

export type HouseModelType = 'nalukettu' | 'modern_villa' | 'plantation_cottage';

export interface PlayerHouse {
  isBuilt: boolean;
  isConstructing: boolean;
  constructionStage: number; // 0: None, 1: Foundation Stones, 2: Walls, 3: Roof, 4: Complete
  district: string;
  model: HouseModelType;
  coords: { x: number; z: number };
}

export type ReligionType = 'universal' | 'muslim' | 'hindu' | 'christian';

export interface PlayerInventory {
  coconuts: number;
  bananas: number;
  riceSacks: number;
  stones: number; // Vettukallu / Laterite building stones
  cementBags: number;
}

export interface OnlinePlayerInfo {
  id: string;
  name: string;
  outfit: string;
  district: string;
  activity: string;
  vehicle: string;
  pingMs: number;
}

export const INITIAL_FARMLANDS: FarmlandPlot[] = [
  {
    id: 'coconut',
    name: 'Bekal Coconut Grove',
    malayalamName: 'ബേക്കൽ തേങ്ങ തോട്ടം',
    district: 'Kasaragod',
    coords: { x: -85, z: -125 },
    cropName: 'Fresh Coconuts',
    cropIcon: '🥥',
    cropUnit: 'nuts',
    pricePerUnit: 35,
    readyToHarvest: true,
    yieldAmount: 18,
    growthProgress: 100,
    harvestCooldown: 0,
  },
  {
    id: 'banana',
    name: 'Wayanad Nendran Plantation',
    malayalamName: 'വയനാട് നേന്ത്രവാഴ തോട്ടം',
    district: 'Wayanad',
    coords: { x: 75, z: -70 },
    cropName: 'Nendran Bananas',
    cropIcon: '🍌',
    cropUnit: 'bunches',
    pricePerUnit: 85,
    readyToHarvest: true,
    yieldAmount: 12,
    growthProgress: 100,
    harvestCooldown: 0,
  },
  {
    id: 'rice',
    name: 'Kuttanad Golden Rice Paddy',
    malayalamName: 'കുട്ടനാട് നെൽവയൽ',
    district: 'Alappuzha',
    coords: { x: -45, z: 95 },
    cropName: 'Golden Rice Sacks',
    cropIcon: '🌾',
    cropUnit: 'sacks',
    pricePerUnit: 180,
    readyToHarvest: true,
    yieldAmount: 6,
    growthProgress: 100,
    harvestCooldown: 0,
  },
];

export const SIMULATED_ONLINE_PLAYERS: OnlinePlayerInfo[] = [
  {
    id: 'p1',
    name: 'Shameer Puthanathani',
    outfit: 'Lungi & Banyan',
    district: 'Malappuram',
    activity: 'Playing football at Sevens Arena',
    vehicle: 'Auto Rickshaw',
    pingMs: 24,
  },
  {
    id: 'p2',
    name: 'Rahul Varma',
    outfit: 'Kasavu Mundu',
    district: 'Thrissur',
    activity: 'Praying at Vadakkumnathan Temple',
    vehicle: 'Varahi Bus',
    pingMs: 31,
  },
  {
    id: 'p3',
    name: 'Faizal Kaka',
    outfit: 'Driver Khaki',
    district: 'Kasaragod',
    activity: 'Harvesting fresh coconuts in Bekal',
    vehicle: 'Auto Rickshaw',
    pingMs: 28,
  },
  {
    id: 'p4',
    name: 'Jithin Mathew',
    outfit: 'Formal Shirt',
    district: 'Kottayam',
    activity: 'Building Contemporary Villa',
    vehicle: 'Mustang',
    pingMs: 35,
  },
  {
    id: 'p5',
    name: 'Niyas Cherpulassery',
    outfit: 'Sevens Jersey',
    district: 'Malappuram',
    activity: 'Swimming in Sevens Arena Pool',
    vehicle: 'Mountain Jeep',
    pingMs: 22,
  },
  {
    id: 'p6',
    name: 'Ashique Kozhikode',
    outfit: 'Lungi & Banyan',
    district: 'Kozhikode',
    activity: 'Drinking piping hot Samovar Chaya',
    vehicle: 'Auto Rickshaw',
    pingMs: 26,
  },
];
