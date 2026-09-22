export type WeatherMode = 'monsoon' | 'morning' | 'evening';

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
  id: 'auto' | 'bus' | 'chaya' | 'mosque' | 'football' | 'player';
  label: string;
  sublabel: string;
  icon: string;
  x: number;
  z: number;
  color: string;
}

export interface GameState {
  wallet: number;
  weather: WeatherMode;
  inVehicle: boolean;
  activeDialogue: NPCEntity | null;
  isAudioMuted: boolean;
  activeDistrict: string;
  newspaperStory: string;
}
