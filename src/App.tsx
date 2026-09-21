import { useState, useCallback, useEffect } from 'react';
import { HeaderHUD } from './components/HeaderHUD';
import { RadarHUD } from './components/RadarHUD';
import { RightSidebarHUD } from './components/RightSidebarHUD';
import { DialogueHUD } from './components/DialogueHUD';
import { ControlsHUD } from './components/ControlsHUD';
import { DistrictModal } from './components/DistrictModal';
import { KSRTCTicketModal, BusDestination } from './components/KSRTCTicketModal';
import { MessagesModal } from './components/MessagesModal';
import { ThreeKeralaWorld } from './components/ThreeKeralaWorld';
import { soundSynth } from './audio';
import { WeatherMode, NPCEntity } from './types';

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
  const [inVehicle, setInVehicle] = useState<boolean>(false);
  const [activeDialogue, setActiveDialogue] = useState<NPCEntity | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [districtModalOpen, setDistrictModalOpen] = useState<boolean>(false);
  const [activeDistrict, setActiveDistrict] = useState<string>('Kozhikode');
  const [focusTarget, setFocusTarget] = useState<'auto' | 'bus' | 'chaya' | 'mosque' | null>(null);
  const [teleportTarget, setTeleportTarget] = useState<{ x: number; z: number } | null>(null);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(true);
  const [isMessagesOpen, setIsMessagesOpen] = useState<boolean>(false);
  const [isSpotsOpen, setIsSpotsOpen] = useState<boolean>(false);
  const [isKSRTCOpen, setIsKSRTCOpen] = useState<boolean>(false);
  const [newspaperStory, setNewspaperStory] = useState<string>(
    '“ഇന്ന് ഇടവപ്പാതി കനക്കും! അനന്തപുരി സൂപ്പർ ഫാസ്റ്റ് ബസ്സിന്റെ പുതിയ എയർ ഹോൺ നാട്ടിൽ ചർച്ചയായി!”'
  );
  const [playerModel, setPlayerModel] = useState<'unni' | 'babu'>('babu');

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

  const handleFocusPOI = useCallback((poi: 'auto' | 'bus' | 'chaya' | 'mosque') => {
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

  // Keyboard shortcut listener for KSRTC [B], Map [M], and Chaya Kada Spots [C]
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === 'b') {
        setIsKSRTCOpen((prev) => !prev);
      } else if (k === 'm') {
        setIsMapOpen((prev) => !prev);
      } else if (k === 'c') {
        setIsSpotsOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#050c09] relative overflow-hidden font-body select-none">
      {/* Scanlines & Ambient Vignette */}
      <div className="scanlines-2k absolute inset-0 z-40 pointer-events-none opacity-30"></div>
      <div className="absolute inset-0 pointer-events-none z-30 bg-[radial-gradient(circle_at_50%_45%,transparent_38%,rgba(4,11,8,0.85)_100%)]"></div>

      {/* 3D EMBEDDED THREE.JS VIEWPORT */}
      <ThreeKeralaWorld
        weather={weather}
        inVehicle={inVehicle}
        onVehicleToggle={setInVehicle}
        onInteractNPC={(npc) => setActiveDialogue(npc)}
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
        wallet={wallet}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenDistrictModal={() => setDistrictModalOpen(true)}
        onToggleVehicle={handleDriveAuto}
        inVehicle={inVehicle}
        isMapOpen={isMapOpen}
        onToggleMap={() => setIsMapOpen((prev) => !prev)}
        isMessagesOpen={isMessagesOpen}
        onToggleMessages={() => setIsMessagesOpen((prev) => !prev)}
        isSpotsOpen={isSpotsOpen}
        onToggleSpots={() => setIsSpotsOpen((prev) => !prev)}
        onOpenKSRTC={() => setIsKSRTCOpen(true)}
        playerModel={playerModel}
        onTogglePlayerModel={() => setPlayerModel((prev) => (prev === 'babu' ? 'unni' : 'babu'))}
      />

      {/* MAIN GAME UI OVERLAY WRAPPER */}
      <main className="relative flex-1 w-full h-full overflow-hidden pointer-events-none">
        {/* LEFT HUD: CIRCULAR GPS RADAR (TOGGLEABLE) */}
        {isMapOpen && (
          <div className="absolute left-4 sm:left-6 top-4 sm:top-5 z-30">
            <RadarHUD onFocusPOI={handleFocusPOI} onClose={() => setIsMapOpen(false)} />
          </div>
        )}

        {/* RIGHT HUD: CHAYA KADA CULTURE CARD & SERENE MOSQUE CARD (COLLAPSIBLE TO ICON) */}
        {isSpotsOpen ? (
          <div className="absolute right-4 sm:right-6 top-4 sm:top-5 bottom-16 sm:bottom-20 z-30 flex justify-end">
            <RightSidebarHUD
              onOrder={handleOrder}
              onFocusMosque={() => handleFocusPOI('mosque')}
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
        />

        {/* BOTTOM CONTROLS BAR */}
        <ControlsHUD
          onHonk={handleHonk}
          onAutoToggle={handleDriveAuto}
          onInteract={() => handleFocusPOI('chaya')}
          onOpenKSRTC={() => setIsKSRTCOpen(true)}
          inVehicle={inVehicle}
        />
      </main>

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
    </div>
  );
}
