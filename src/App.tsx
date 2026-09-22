import { useState, useCallback, useEffect } from 'react';
import { HeaderHUD } from './components/HeaderHUD';
import { RadarHUD } from './components/RadarHUD';
import { RightSidebarHUD } from './components/RightSidebarHUD';
import { DialogueHUD } from './components/DialogueHUD';
import { ControlsHUD } from './components/ControlsHUD';
import { DistrictModal } from './components/DistrictModal';
import { KSRTCTicketModal, BusDestination } from './components/KSRTCTicketModal';
import { StadiumTicketModal } from './components/StadiumTicketModal';
import { MessagesModal } from './components/MessagesModal';
import { BigMapModal } from './components/BigMapModal';
import { MissionsModal } from './components/MissionsModal';
import { BusinessesModal } from './components/BusinessesModal';
import { RandomSceneModal } from './components/RandomSceneModal';
import { PhotoModeModal } from './components/PhotoModeModal';
import { INITIAL_KERALA_MISSIONS } from './components/MissionsSystem';
import { RANDOM_NAATTILE_SCENES } from './components/RandomScenesData';
import { ThreeKeralaWorld } from './components/ThreeKeralaWorld';
import { soundSynth } from './audio';
import {
  WeatherMode,
  NPCEntity,
  Mission,
  RandomSceneEvent,
  PlayerOutfit,
  TimeOfDay,
  VehicleType,
  WaypointDestination,
} from './types';

const DIALOGUE_SEQUENCE: NPCEntity[] = [
  {
    id: 'babu',
    avatar: '👓',
    tag: 'AUTO',
    name: 'Babu (ബാബു • Techie)',
    malayalamName: 'ബാബു • ബാംഗ്ലൂർ റിട്ടേൺ',
    role: 'Bangalore Return Techie & Auto Friend',
    dialogue: '“ഹലോ ഉണ്ണീ! ബാംഗ്ലൂർ ടെക് പാർക്കിൽ നിന്ന് ലാപ്ടോപ്പ് ബാഗും തൂക്കി നാട്ടിൽ എത്തിയതാണ്! ഈ നീല ഷർട്ടും ലൂസ് ബീജ് പാന്റും കണ്ണടയും ഐഡി കാർഡും കണ്ടില്ലേ? നാട്ടിലെ റോഡിലൂടെ ഓട്ടോ ഓടിക്കാൻ എന്ത് ത്രില്ലാണ്! [F] അമർത്തിയാൽ എന്റെ ഓട്ടോയിൽ കയറാം!”',
  },
  {
    id: 'mohnan',
    avatar: '☕',
    tag: 'CHAYA',
    name: 'Mohanan Nair (നായർ ചേട്ടൻ)',
    malayalamName: 'നായർ ചേട്ടൻ',
    role: 'Tea Master',
    dialogue: '“മഴ കനക്കുകയാണ്! കടത്തിണ്ണയിൽ ഇരുന്ന് മനോരമ പത്രം വായിക്കൂ, ചൂട് പരിപ്പുവടയും പഴംപൊരിയും റെഡിയാണ്!”',
  },
  {
    id: 'aboobacker',
    avatar: '🕌',
    tag: 'ELDER',
    name: 'Aboobacker Kaka (അബൂബക്കർ കാക്ക)',
    malayalamName: 'അബൂബക്കർ കാക്ക',
    role: 'Community Elder',
    dialogue: '“അസ്സലാമു അലൈക്കും ഉണ്ണീ! പള്ളി റോഡിലൂടെ പതുക്കെ നടന്നോളൂ. മഴയത്ത് ഇവിടെ വരാന്തയിൽ വിശ്രമിക്കാം.”',
  },
  {
    id: 'goat',
    avatar: '🐐',
    tag: 'GOAT',
    name: 'Aadu Thoma (ആട് തോമ 🐐)',
    malayalamName: 'ആട് തോമ',
    role: 'Village Notorious Goat',
    dialogue: '“മേഹ്ഹ്ഹ്ഹ്! (നിങ്ങൾ ഏത് ജില്ലക്കാരനായാലും എന്റെ വഴിയേ വരരുത്!)”',
  },
];

const WEATHER_MODES: WeatherMode[] = ['monsoon', 'morning', 'evening'];

export default function App() {
  const [wallet, setWallet] = useState<number>(420);
  const [weather, setWeather] = useState<WeatherMode>('monsoon');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [inVehicle, setInVehicle] = useState<boolean>(false);
  const [vehicleType, setVehicleType] = useState<VehicleType>('auto');
  const [activeDialogue, setActiveDialogue] = useState<NPCEntity | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [districtModalOpen, setDistrictModalOpen] = useState<boolean>(false);
  const [activeDistrict, setActiveDistrict] = useState<string>('Kozhikode');
  const [focusTarget, setFocusTarget] = useState<'auto' | 'bus' | 'chaya' | 'mosque' | 'football' | 'ticket' | 'pond' | null>(null);
  const [teleportTarget, setTeleportTarget] = useState<{ x: number; z: number } | null>(null);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(true);
  const [isBigMapOpen, setIsBigMapOpen] = useState<boolean>(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);
  const [isSpotsOpen, setIsSpotsOpen] = useState<boolean>(false);
  const [isKSRTCOpen, setIsKSRTCOpen] = useState<boolean>(false);
  const [isStadiumTicketOpen, setIsStadiumTicketOpen] = useState<boolean>(false);
  const [hasStadiumTicket, setHasStadiumTicket] = useState<boolean>(false);
  const [newspaperStory, setNewspaperStory] = useState<string>(
    '“ഇന്ന് ഇടവപ്പാതി കനക്കും! അനന്തപുരി സൂപ്പർ ഫാസ്റ്റ് ബസ്സിന്റെ പുതിയ എയർ ഹോൺ നാട്ടിൽ ചർച്ചയായി!”'
  );
  const [playerModel, setPlayerModel] = useState<'unni' | 'babu'>('babu');
  const [playerOutfit, setPlayerOutfit] = useState<PlayerOutfit>('babu');

  // Naattile Scene System Modals & State
  const [isMissionsOpen, setIsMissionsOpen] = useState<boolean>(false);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_KERALA_MISSIONS);
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [activeWaypoint, setActiveWaypoint] = useState<WaypointDestination | null>(null);

  const [isSceneOpen, setIsSceneOpen] = useState<boolean>(false);
  const [currentSceneEvent, setCurrentSceneEvent] = useState<RandomSceneEvent | null>(null);
  const [sceneIndex, setSceneIndex] = useState<number>(0);

  const [isBusinessesOpen, setIsBusinessesOpen] = useState<boolean>(false);
  const [isPhotoModeOpen, setIsPhotoModeOpen] = useState<boolean>(false);

  const TIME_CYCLES: TimeOfDay[] = ['morning', 'afternoon', 'evening', 'night'];

  const handleCycleTimeOfDay = useCallback(() => {
    setTimeOfDay((prev) => {
      const idx = TIME_CYCLES.indexOf(prev);
      const nextTime = TIME_CYCLES[(idx + 1) % TIME_CYCLES.length];
      soundSynth.playSound('bell');
      return nextTime;
    });
  }, []);

  const handleSelectVehicle = useCallback((type: VehicleType) => {
    setVehicleType(type);
    setInVehicle(true);
    if (type === 'bus') soundSynth.playSound('airhorn');
    else if (type === 'auto') soundSynth.playSound('autohorn');
    else if (type === 'tractor') soundSynth.playSound('tractor');
    else if (type === 'bullet') soundSynth.playSound('bullet');
    else if (type === 'jeep') soundSynth.playSound('airhorn');
    else if (type === 'boat') soundSynth.playSound('splash');
  }, []);

  const handleStartMission = useCallback((missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const updated = { ...m, isActive: true };
          setActiveMission(updated);
          // Set waypoint to first step if any
          if (updated.steps[0]?.targetCoords) {
            setActiveWaypoint({
              id: updated.steps[0].id,
              name: updated.title,
              malayalamName: updated.malayalamTitle,
              icon: updated.icon,
              coords: updated.steps[0].targetCoords,
              category: 'Mission',
            });
          }
          return updated;
        }
        return { ...m, isActive: false };
      })
    );
    soundSynth.playSound('bell');
  }, []);

  const handleCancelMission = useCallback(() => {
    setMissions((prev) => prev.map((m) => ({ ...m, isActive: false })));
    setActiveMission(null);
    setActiveWaypoint(null);
    soundSynth.playSound('teaglass');
  }, []);

  const handleTriggerRandomScene = useCallback(() => {
    const nextEvent = RANDOM_NAATTILE_SCENES[sceneIndex % RANDOM_NAATTILE_SCENES.length];
    setSceneIndex((i) => i + 1);
    setCurrentSceneEvent(nextEvent);
    setIsSceneOpen(true);
    soundSynth.playSound('chenda');
  }, [sceneIndex]);

  const handleDeductMoney = useCallback((amount: number): boolean => {
    if (wallet >= amount) {
      setWallet((w) => w - amount);
      return true;
    }
    return false;
  }, [wallet]);

  const handleAddMoney = useCallback((amount: number) => {
    setWallet((w) => w + amount);
    soundSynth.playSound('coin');
  }, []);

  const handleRefuelVehicle = useCallback(() => {
    soundSynth.playSound('refuel');
  }, []);

  const handleRepairVehicle = useCallback(() => {
    soundSynth.playSound('workshop');
  }, []);

  const handleChangeOutfit = useCallback((outfit: PlayerOutfit) => {
    setPlayerOutfit(outfit);
    if (outfit === 'babu') setPlayerModel('babu');
    else setPlayerModel('unni');
    soundSynth.playSound('bell');
  }, []);

  const handleFastTravel = useCallback((coords: { x: number; z: number }, districtName: string) => {
    setTeleportTarget(coords);
    soundSynth.playSound('bell');
    soundSynth.playSound('airhorn');
    setActiveDialogue({
      id: 'fast-travel',
      avatar: '🗺️',
      tag: 'DISTRICT',
      name: `യാത്ര • ${districtName}`,
      malayalamName: districtName,
      role: 'Kizhakkumpuram Big Map Navigator',
      dialogue: `“നിങ്ങൾ കിഴക്കുംപുറം ബിഗ് മാപ്പിലെ ${districtName}-ൽ എത്തിയിരിക്കുന്നു! പ്രദേശത്തെ റോഡുകളും പുതിയ കെട്ടിടങ്ങളും വാഹനങ്ങളും ആസ്വദിക്കൂ.”`,
    });
  }, []);

  const handlePurchaseAndTravel = useCallback((dest: BusDestination) => {
    setWallet((w) => w - dest.fare);
    setTeleportTarget(dest.coords);
    soundSynth.playSound('coin');
    soundSynth.playSound('bell');
    soundSynth.playSound('airhorn');

    setActiveDialogue({
      id: 'ksrtc-conductor',
      avatar: '🚌',
      tag: 'KSRTC',
      name: 'കണ്ടക്ടർ സുകുമാരൻ (KSRTC Conductor)',
      malayalamName: 'കണ്ടക്ടർ സുകുമാരൻ',
      role: 'Super Fast Conductor (RPK 992)',
      dialogue: `“ഇറങ്ങിക്കോളൂ! ${dest.name} എത്തിയിട്ടുണ്ട്! അടുത്ത സ്റ്റോപ്പിലേക്ക് ബസ് ഉടൻ പുറപ്പെടുകയാണ്!”`,
    });
  }, []);

  const cycleWeather = useCallback(() => {
    setWeather((prev) => {
      const idx = WEATHER_MODES.indexOf(prev);
      const nextMode = WEATHER_MODES[(idx + 1) % WEATHER_MODES.length];
      if (nextMode === 'monsoon') {
        soundSynth.playSound('teaglass');
      }
      return nextMode;
    });
  }, []);

  const handleOrder = useCallback(
    (item: string, price: number) => {
      if (wallet >= price) {
        setWallet((w) => w - price);
        soundSynth.playSound('coin');
        soundSynth.playSound('teaglass');
        setActiveDialogue({
          id: 'order',
          avatar: '☕',
          tag: 'CHAYA',
          name: 'Mohanan Nair (നായർ ചേട്ടൻ)',
          malayalamName: 'നായർ ചേട്ടൻ',
          role: 'Tea Master',
          dialogue: `“ഇതാ നല്ല ചൂട് ${item}! കഴിക്ക് ഉണ്ണീ, കൂടെ ഒരു ചൂട് ചായയും ഒഴിച്ചു തരാം!”`,
        });
      } else {
        soundSynth.playSound('autohorn');
        setActiveDialogue({
          id: 'no-money',
          avatar: '☕',
          tag: 'CHAYA',
          name: 'Mohanan Nair (നായർ ചേട്ടൻ)',
          malayalamName: 'നായർ ചേട്ടൻ',
          role: 'Tea Master',
          dialogue: '“കാശു തികയില്ലല്ലോ ഉണ്ണീ! അടുത്ത തവണ വരുമ്പോൾ തന്നാൽ മതി!”',
        });
      }
    },
    [wallet]
  );

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      soundSynth.setMuted(next);
      return next;
    });
  }, []);

  const handlePurchaseStadiumTicket = useCallback(() => {
    if (wallet < 50) {
      soundSynth.playSound('autohorn');
      setActiveDialogue({
        id: 'no-ticket-money',
        avatar: '🎫',
        tag: 'TICKET',
        name: 'Koya (ടിക്കറ്റ് കോയ)',
        malayalamName: 'ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്',
        role: 'Stadium Ticket Collector',
        dialogue: '“കയ്യിൽ ₹50 രൂപ തികയില്ലല്ലോ ഉണ്ണീ! ചായക്കടയിൽ പോയി ബാക്കി കാശ് ഉണ്ടാക്കി വരൂ, ടിക്കറ്റ് തരാം!”',
      });
      return false;
    }

    setWallet((w) => w - 50);
    setHasStadiumTicket(true);
    soundSynth.playSound('coin');
    soundSynth.playSound('ticket');
    soundSynth.playSound('whistle');

    setActiveDialogue({
      id: 'ticket-koya',
      avatar: '🎫',
      tag: 'TICKET',
      name: 'Koya (ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്)',
      malayalamName: 'ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്',
      role: 'Stadium Ticket Collector',
      dialogue: '“ടിക്കറ്റ് എടുത്തതിന് നന്ദി ഉണ്ണീ! ഇതാ നിങ്ങളുടെ ₹50 രൂപയുടെ ഒഫീഷ്യൽ സെവൻസ് മാച്ച് ടിക്കറ്റ്! ഗ്രാൻഡ് സ്റ്റാൻഡ് ഗാലറിയിലും VIP പവലിയനിലും പ്രവേശിക്കാം. കളി കണ്ട് ആഘോഷിക്കൂ!”',
    });
    return true;
  }, [wallet]);

  const handleFocusPOI = useCallback((poi: 'auto' | 'bus' | 'chaya' | 'mosque' | 'football' | 'ticket' | 'pond') => {
    setFocusTarget(poi);
    if (poi === 'chaya') {
      soundSynth.playSound('teaglass');
      setActiveDialogue({
        id: 'chaya',
        avatar: '☕',
        tag: 'CHAYA',
        name: 'Mohanan Nair (നായർ ചേട്ടൻ)',
        malayalamName: 'നായർ ചേട്ടൻ',
        role: 'Tea Master',
        dialogue: '“നായർസ് ചായക്കടയിലേക്ക് സ്വാഗതം! ചൂടുള്ള സുലൈമാനിയും പഴംപൊരിയും കഴിക്കാം!”',
      });
    } else if (poi === 'mosque') {
      soundSynth.playSound('teaglass');
      setActiveDialogue({
        id: 'mosque',
        avatar: '🕌',
        tag: 'MOSQUE',
        name: 'Aboobacker Kaka (അബൂബക്കർ കാക്ക)',
        malayalamName: 'അബൂബക്കർ കാക്ക',
        role: 'Community Elder',
        dialogue: '“കിഴക്കുംപുറം ജുമാ മസ്ജിദ് ശാന്തമായ അന്തരീക്ഷം പ്രദാനം ചെയ്യുന്നു. മഴയത്ത് ഇവിടെ വിശ്രമിക്കാം.”',
      });
    } else if (poi === 'auto') {
      soundSynth.playSound('autohorn');
      setActiveDialogue({
        id: 'babu',
        avatar: '👓',
        tag: 'AUTO',
        name: 'Babu (ബാബു • Techie)',
        malayalamName: 'ബാബു • ബാംഗ്ലൂർ റിട്ടേൺ',
        role: 'Bangalore Return Techie & Auto Friend',
        dialogue: '“ഹലോ ഉണ്ണീ! ബാംഗ്ലൂർ ടെക് പാർക്കിൽ നിന്ന് ലാപ്ടോപ്പ് ബാഗും തൂക്കി നാട്ടിൽ എത്തിയതാണ്! ഈ നീല ഷർട്ടും ലൂസ് ബീജ് പാന്റും കണ്ണടയും ഐഡി കാർഡും കണ്ടില്ലേ? നാട്ടിലെ റോഡിലൂടെ ഓട്ടോ ഓടിക്കാൻ എന്ത് ത്രില്ലാണ്! [F] അമർത്തിയാൽ എന്റെ ഓട്ടോയിൽ കയറാം!”',
      });
    } else if (poi === 'bus') {
      soundSynth.playSound('airhorn');
      setActiveDialogue({
        id: 'ksrtc',
        avatar: '🚌',
        tag: 'KSRTC',
        name: 'KSRTC കൺട്രോളർ',
        malayalamName: 'KSRTC കൺട്രോളർ',
        role: 'Station Master',
        dialogue: '“ആനവണ്ടി സ്റ്റാൻഡിലേക്ക് വരികയാണ്! വേഗത്തിൽ റോഡിൽ നിന്ന് മാറുക!”',
      });
    } else if (poi === 'football') {
      soundSynth.playSound('whistle');
      setActiveDialogue({
        id: 'football_coach',
        avatar: '⚽',
        tag: 'SEVENS',
        name: 'Majeed (കോച്ച് മജീദ്)',
        malayalamName: 'കോച്ച് മജീദ് • സെവൻസ് റഫറി',
        role: 'Sevens Football Coach & Referee',
        dialogue: '“സ്വാഗതം കിഴക്കുംപുറം സെവൻസ് സ്റ്റേഡിയത്തിലേക്ക്! പുതിയ ഗ്രാൻഡ് സ്റ്റാൻഡ് ഗാലറിയും വരകളും പോസ്റ്റുകളും പന്തും ഇതാ തയ്യാറാണ്. ഓടിച്ചെന്ന് പന്ത് ചവിട്ടി നോക്കൂ! ഗോൾ അടിച്ചാൽ വിസിൽ മുഴങ്ങും!”',
      });
    } else if (poi === 'ticket') {
      soundSynth.playSound('ticket');
      setIsStadiumTicketOpen(true);
      setActiveDialogue({
        id: 'ticket_koya',
        avatar: '🎫',
        tag: 'TICKET',
        name: 'Koya (ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്)',
        malayalamName: 'ടിക്കറ്റ് കോയ • ടൗൺ സെവൻസ്',
        role: 'Stadium Ticket Counter (₹50 Entry)',
        dialogue: '“സ്വാഗതം കിഴക്കുംപുറം സെവൻസ് സ്റ്റേഡിയത്തിലേക്ക്! ഇന്നത്തെ ബിഗ് മാച്ച്: കിഴക്കുംപുറം FC vs മലപ്പുറം സെവൻസ്! പ്രവേശന ഫീസ് വെറും ₹50 രൂപ മാത്രം! ടിക്കറ്റ് എടുത്ത് ഗാലറിയിലേക്ക് കയറിക്കോളൂ!”',
      });
    } else if (poi === 'pond') {
      soundSynth.playSound('splash');
      setActiveDialogue({
        id: 'lotus_pond',
        avatar: '🌸',
        tag: 'POND',
        name: 'Devaki Amma (ദേവകി അമ്മ • പൂന്തോട്ടം)',
        malayalamName: 'ദേവകി അമ്മ • താമരക്കുളം',
        role: 'Lotus Pond Caretaker',
        dialogue: '“സ്വാഗതം കിഴക്കുംപുറം താമരക്കുളത്തിലേക്ക്! ഇവിടെ തെളിഞ്ഞ നീല വെള്ളത്തിൽ വിരിഞ്ഞുനിൽക്കുന്ന ആമ്പൽപൂക്കളും നീന്തിത്തുടിക്കുന്ന വർണ്ണമത്സ്യങ്ങളും കാണാം. കല്ലിന്മേൽ ഇരുന്ന് തണുത്ത കാറ്റേൽക്കൂ!”',
      });
    }
  }, []);

  const handleNextDialogue = useCallback(() => {
    const nextIdx = (dialogueIndex + 1) % DIALOGUE_SEQUENCE.length;
    setDialogueIndex(nextIdx);
    setActiveDialogue(DIALOGUE_SEQUENCE[nextIdx]);
    soundSynth.playSound('teaglass');
  }, [dialogueIndex]);

  const handleDriveAuto = useCallback(() => {
    // Trigger [F] event
    const event = new KeyboardEvent('keydown', { key: 'f' });
    window.dispatchEvent(event);
  }, []);

  const handleDriveBus = useCallback(() => {
    // Trigger [V] event
    const event = new KeyboardEvent('keydown', { key: 'v' });
    window.dispatchEvent(event);
  }, []);

  const handleHonk = useCallback(() => {
    soundSynth.playSound('airhorn');
  }, []);

  const handleSelectDistrict = useCallback((district: string) => {
    setActiveDistrict(district);
    soundSynth.playSound('teaglass');
    setNewspaperStory(
      `“${district} ജില്ലയിലെ കിഴക്കുംപുറം ഗ്രാമത്തിൽ കനത്ത മഴ! നാട്ടുകാർ ചായക്കടയിൽ സജീവ ചർച്ചയിൽ!”`
    );
  }, []);

  // Keyboard shortcut listener for Big Map [M], KSRTC [B], Stadium Ticket [T], Radar [R], Chaya Kada Spots [C], Missions [J], Scenes [N], Bazaar [X], Photo [P], Time [O]
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === 'm') {
        setIsBigMapOpen((prev) => !prev);
      } else if (k === 'r') {
        setIsMapOpen((prev) => !prev);
      } else if (k === 'b') {
        setIsKSRTCOpen((prev) => !prev);
      } else if (k === 't') {
        setIsStadiumTicketOpen((prev) => !prev);
      } else if (k === 'c') {
        setIsSpotsOpen((prev) => !prev);
      } else if (k === 'j') {
        setIsMissionsOpen((prev) => !prev);
      } else if (k === 'n') {
        handleTriggerRandomScene();
      } else if (k === 'x') {
        setIsBusinessesOpen((prev) => !prev);
      } else if (k === 'p') {
        setIsPhotoModeOpen((prev) => !prev);
      } else if (k === 'o') {
        handleCycleTimeOfDay();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTriggerRandomScene, handleCycleTimeOfDay]);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050c09] relative overflow-hidden font-body select-none">
      {/* Scanlines & Ambient Vignette */}
      <div className="scanlines-2k absolute inset-0 z-40 pointer-events-none opacity-30"></div>
      <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(circle_at_50%_45%,transparent_38%,rgba(4,11,8,0.85)_100%)]"></div>

      {/* 3D EMBEDDED THREE.JS VIEWPORT */}
      <ThreeKeralaWorld
        weather={weather}
        timeOfDay={timeOfDay}
        inVehicle={inVehicle}
        vehicleType={vehicleType}
        onVehicleToggle={(active, type) => {
          setInVehicle(active);
          if (type) setVehicleType(type);
        }}
        onInteractNPC={(npc) => {
          setActiveDialogue(npc);
          if (npc.tag === 'TICKET' || npc.id === 'ticket_koya') {
            setIsStadiumTicketOpen(true);
          }
        }}
        focusTarget={focusTarget}
        onClearFocus={() => setFocusTarget(null)}
        teleportTarget={teleportTarget}
        onClearTeleport={() => setTeleportTarget(null)}
        playerModel={playerModel}
      />

      {/* TOP HUD: KERALA OPEN WORLD STATUS & AUDIO CONSOLE */}
      <HeaderHUD
        weather={weather}
        onCycleWeather={cycleWeather}
        timeOfDay={timeOfDay}
        onCycleTimeOfDay={handleCycleTimeOfDay}
        wallet={wallet}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenDistrictModal={() => setDistrictModalOpen(true)}
        onToggleVehicle={handleDriveAuto}
        onToggleBus={handleDriveBus}
        inVehicle={inVehicle}
        vehicleType={vehicleType}
        onSelectVehicle={handleSelectVehicle}
        isMapOpen={isMapOpen}
        onToggleMap={() => setIsMapOpen((prev) => !prev)}
        isMessagesOpen={isMessagesOpen}
        onToggleMessages={() => setIsMessagesOpen((prev) => !prev)}
        isSpotsOpen={isSpotsOpen}
        onToggleSpots={() => setIsSpotsOpen((prev) => !prev)}
        onOpenKSRTC={() => setIsKSRTCOpen(true)}
        onOpenBigMap={() => setIsBigMapOpen(true)}
        isBigMapOpen={isBigMapOpen}
        playerModel={playerModel}
        onTogglePlayerModel={() => setPlayerModel((prev) => (prev === 'babu' ? 'unni' : 'babu'))}
        onOpenMissions={() => setIsMissionsOpen(true)}
        activeMissionCount={activeMission ? 1 : 0}
        onTriggerRandomScene={handleTriggerRandomScene}
        onOpenBusinesses={() => setIsBusinessesOpen(true)}
        onOpenPhotoMode={() => setIsPhotoModeOpen(true)}
      />

      {/* MAIN GAME UI OVERLAY WRAPPER */}
      <main className="relative flex-1 w-full h-full overflow-hidden pointer-events-none">
        {/* LEFT HUD: CIRCULAR GPS RADAR (TOGGLEABLE) */}
        {isMapOpen && (
          <div className="absolute left-4 sm:left-6 top-4 sm:top-5 z-30">
            <RadarHUD
              onFocusPOI={handleFocusPOI}
              onOpenBigMap={() => setIsBigMapOpen(true)}
              onClose={() => setIsMapOpen(false)}
            />
          </div>
        )}

        {/* RIGHT HUD: CHAYA KADA CULTURE CARD & SERENE MOSQUE CARD (COLLAPSIBLE TO ICON) */}
        {isSpotsOpen ? (
          <div className="absolute right-4 sm:right-6 top-4 sm:top-5 bottom-16 sm:bottom-20 z-30 flex justify-end">
            <RightSidebarHUD
              onOrder={handleOrder}
              onFocusMosque={() => handleFocusPOI('mosque')}
              onFocusFootball={() => handleFocusPOI('football')}
              onFocusPond={() => handleFocusPOI('pond')}
              onOpenStadiumTicket={() => setIsStadiumTicketOpen(true)}
              hasStadiumTicket={hasStadiumTicket}
              newspaperStory={newspaperStory}
              onOpenKSRTC={() => setIsKSRTCOpen(true)}
              onClose={() => setIsSpotsOpen(false)}
            />
          </div>
        ) : (
          <div className="absolute right-4 sm:right-6 top-4 sm:top-5 z-30 pointer-events-auto">
            <button
              onClick={() => setIsSpotsOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-[#061811eb] hover:bg-[#0c2e22] text-amber-300 border border-amber-500/50 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 font-mono text-xs font-bold active:scale-95 transition-all cursor-pointer group"
              title="Open Chaya Kada & Village Spots Card [C]"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">☕</span>
              <div className="flex flex-col items-start text-left">
                <span className="font-malayalam text-amber-300 text-xs leading-tight">ചായക്കട &amp; സ്പോട്ടുകൾ</span>
                <span className="text-[9px] text-emerald-300/80 font-mono">Village Info [C]</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse ml-0.5"></span>
            </button>
          </div>
        )}

        {/* BOTTOM DIALOGUE BAR */}
        <DialogueHUD
          dialogue={activeDialogue}
          onNext={handleNextDialogue}
          onDriveAuto={handleDriveAuto}
          onDismiss={() => setActiveDialogue(null)}
          onOpenStadiumTicket={() => setIsStadiumTicketOpen(true)}
        />

        {/* BOTTOM CONTROLS BAR */}
        <ControlsHUD
          onHonk={handleHonk}
          onAutoToggle={handleDriveAuto}
          onBusToggle={handleDriveBus}
          onInteract={() => handleFocusPOI('chaya')}
          onOpenKSRTC={() => setIsKSRTCOpen(true)}
          onOpenStadiumTicket={() => setIsStadiumTicketOpen(true)}
          inVehicle={inVehicle}
          vehicleType={vehicleType}
        />
      </main>

      {/* MODAL: SEVENS STADIUM 50 RUPEES TICKET COUNTER */}
      <StadiumTicketModal
        isOpen={isStadiumTicketOpen}
        onClose={() => setIsStadiumTicketOpen(false)}
        wallet={wallet}
        hasTicket={hasStadiumTicket}
        onPurchaseTicket={handlePurchaseStadiumTicket}
        onEnterStadium={() => handleFocusPOI('football')}
      />

      {/* MODAL: KSRTC BUS TICKETING & TRAVEL DESTINATIONS */}
      <KSRTCTicketModal
        isOpen={isKSRTCOpen}
        onClose={() => setIsKSRTCOpen(false)}
        wallet={wallet}
        onPurchaseAndTravel={handlePurchaseAndTravel}
      />

      {/* MODAL: KERALA DISPATCHES & MESSAGES */}
      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
        newspaperStory={newspaperStory}
      />

      {/* MODAL: KERALA DISTRICT SELECTION */}
      <DistrictModal
        isOpen={districtModalOpen}
        onClose={() => setDistrictModalOpen(false)}
        currentDistrict={activeDistrict}
        onSelectDistrict={handleSelectDistrict}
      />

      {/* MODAL: BIG MAP (12 DISTRICTS OF KIZHAKKUMPURAM) */}
      <BigMapModal
        isOpen={isBigMapOpen}
        onClose={() => setIsBigMapOpen(false)}
        onFastTravel={handleFastTravel}
      />

      {/* MODAL: NAATTILE MISSIONS */}
      <MissionsModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
        missions={missions}
        activeMission={activeMission}
        onStartMission={handleStartMission}
        onCancelMission={handleCancelMission}
        onSetWaypoint={(wp) => setActiveWaypoint(wp)}
      />

      {/* MODAL: RANDOM NAATTILE SCENE EVENT */}
      <RandomSceneModal
        event={isSceneOpen ? currentSceneEvent : null}
        onClose={() => setIsSceneOpen(false)}
        onAddMoney={handleAddMoney}
      />

      {/* MODAL: KERALA BAZAAR & LOCAL BUSINESSES */}
      <BusinessesModal
        isOpen={isBusinessesOpen}
        onClose={() => setIsBusinessesOpen(false)}
        wallet={wallet}
        onDeductMoney={handleDeductMoney}
        onRefuelVehicle={handleRefuelVehicle}
        onRepairVehicle={handleRepairVehicle}
        playerOutfit={playerOutfit}
        onChangeOutfit={handleChangeOutfit}
        vehicleType={vehicleType}
      />

      {/* MODAL: KERALA LANDSCAPE PHOTO MODE */}
      <PhotoModeModal
        isOpen={isPhotoModeOpen}
        onClose={() => setIsPhotoModeOpen(false)}
      />
    </div>
  );
}
