export type WeatherMode = 'monsoon' | 'morning' | 'evening' | 'sunny' | 'thunderstorm' | 'fog';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type VehicleType = 'auto' | 'bus' | 'jeep' | 'tractor' | 'bullet' | 'boat';
export type PlayerOutfit = 'babu' | 'unni' | 'kasavu' | 'driver' | 'sevens';

export interface WeatherOption {
  name: string;
  key: WeatherMode;
  icon: string;
}

export interface NPCEntity {
  id: string;
  name: string;
  malayalamName: string;
  role: string;
  dialogue: string;
  avatar: string;
  tag: string;
}

export interface POIEntity {
  id: 'auto' | 'bus' | 'jeep' | 'tractor' | 'bullet' | 'boat' | 'chaya' | 'mosque' | 'football' | 'player' | 'waypoint' | 'petrol';
  label: string;
  sublabel: string;
  icon: string;
  x: number;
  z: number;
  color: string;
}

export interface MissionStep {
  id: string;
  desc: string;
  malayalamDesc: string;
  targetCoords?: { x: number; z: number };
  isDone: boolean;
}

export interface Mission {
  id: string;
  title: string;
  malayalamTitle: string;
  category: 'Story' | 'Delivery' | 'Farming' | 'Driving' | 'Sports';
  desc: string;
  malayalamDesc: string;
  reward: number;
  icon: string;
  steps: MissionStep[];
  currentStepIndex: number;
  timeLimit?: number;
  timeRemaining?: number;
  isCompleted: boolean;
  isActive: boolean;
}

export interface RandomSceneEvent {
  id: string;
  title: string;
  malayalamTitle: string;
  desc: string;
  malayalamDesc: string;
  avatar: string;
  location: string;
  choices: {
    text: string;
    malayalamText: string;
    reward?: number;
    reaction: string;
    malayalamReaction: string;
    sound?: 'coin' | 'airhorn' | 'bell' | 'chenda' | 'moo' | 'whistle' | 'goal' | 'autohorn' | 'tractor' | 'bullet' | 'splash' | 'teaglass';
  }[];
}

export interface BusinessItem {
  id: string;
  name: string;
  malayalamName: string;
  price: number;
  icon: string;
  desc: string;
  category: 'chaya' | 'fuel' | 'workshop' | 'outfit' | 'house';
}

export interface WaypointDestination {
  id: string;
  name: string;
  malayalamName: string;
  icon: string;
  coords: { x: number; z: number };
  category: 'Mission' | 'Shop' | 'Fuel' | 'Transport' | 'Nature' | 'Village' | 'Sports';
}

export interface VehicleStats {
  fuel: number; // 0 - 100
  damage: number; // 0 - 100
  speed: number;
  maxSpeed: number;
  headlightsOn: boolean;
}

export interface GameState {
  wallet: number;
  weather: WeatherMode;
  timeOfDay: TimeOfDay;
  inVehicle: boolean;
  vehicleType?: VehicleType;
  playerOutfit: PlayerOutfit;
  activeDialogue: NPCEntity | null;
  isAudioMuted: boolean;
  activeDistrict: string;
  newspaperStory: string;
  activeMission: Mission | null;
  activeWaypoint: WaypointDestination | null;
  vehicleStats: Record<VehicleType, VehicleStats>;
}

