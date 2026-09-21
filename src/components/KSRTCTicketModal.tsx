import { useState } from 'react';
import { soundSynth } from '../audio';

export interface BusDestination {
  id: string;
  name: string;
  englishName: string;
  description: string;
  stage: string;
  distance: string;
  fare: number;
  coords: { x: number; z: number };
  tag: string;
  icon: string;
}

export const KSRTC_DESTINATIONS: BusDestination[] = [
  {
    id: 'kizhakkumpuram',
    name: 'കിഴക്കുംപുറം കവല',
    englishName: 'Kizhakkumpuram Junction',
    description: 'മോഹനൻ നായരുടെ ചായക്കട, ഓട്ടോ സ്റ്റാൻഡ് & ഗ്രാമ വഴികൾ',
    stage: 'Stage 1',
    distance: 'Local (0.2 km)',
    fare: 10,
    coords: { x: -3, z: -8 },
    tag: 'Village Center',
    icon: '☕',
  },
  {
    id: 'mosque',
    name: 'പള്ളിത്തറ ജംഗ്ഷൻ',
    englishName: 'Juma Masjid Grounds',
    description: 'പുരാതന ജുമാ മസ്ജിദ്, കായൽത്തീര പാലം & തെങ്ങിൻ തണൽ',
    stage: 'Stage 2',
    distance: '0.9 km (2 min)',
    fare: 15,
    coords: { x: 48, z: -42 },
    tag: 'Mosque & River',
    icon: '🕌',
  },
  {
    id: 'ksrtc_stand',
    name: 'KSRTC സെൻട്രൽ സ്റ്റാൻഡ് & ഡിപ്പോ',
    englishName: 'KSRTC Main Terminal & Depot',
    description: 'പ്ലാറ്റ്‌ഫോം ബേ 1, സ്റ്റേഷൻ മാസ്റ്റർ ഓഫീസ്, കൺട്രോൾ റൂം & ആനവണ്ടി കഫേ',
    stage: 'Stage 3',
    distance: '1.8 km (4 min)',
    fare: 25,
    coords: { x: 26, z: -46 },
    tag: 'Main Depot',
    icon: '🚌',
  },
  {
    id: 'shelter',
    name: 'ഹൈവേ ബസ് കാത്തിരിപ്പ് കേന്ദ്രം',
    englishName: 'Highway Bus Shelter & Eranhikkal Bay',
    description: 'SH-17 റോഡ് വശം, എരഞ്ഞിക്കൽ പ്രൈവറ്റ് ബസ് ബേ & കിളി നൗഷാദ് സ്റ്റാൻഡ്',
    stage: 'Stage 4',
    distance: '2.6 km (5 min)',
    fare: 30,
    coords: { x: 22, z: 12 },
    tag: 'Highway Bay',
    icon: '🚏',
  },
  {
    id: 'backwaters',
    name: 'കായൽത്തീരം ബോട്ട് ജെട്ടി',
    englishName: 'Scenic Backwaters & Canal Bay',
    description: 'വേമ്പനാട് കായലോരം, തോണിപ്പാലം, കാറ്റും ഓളങ്ങളും',
    stage: 'Stage 6',
    distance: '4.5 km (8 min)',
    fare: 45,
    coords: { x: -65, z: 22 },
    tag: 'Backwaters',
    icon: '🛶',
  },
  {
    id: 'kozhikode',
    name: 'കോഴിക്കോട് മിഠായിത്തെരുവ്',
    englishName: 'Kozhikode SM Street & Beach',
    description: 'ഹൽവ അങ്ങാടി, ബീച്ച് റോഡ്, കോഴിക്കോട് ഈസ്റ്റ് ഹൈവേ പ്രവേശന കവാടം',
    stage: 'Stage 9',
    distance: '24 km (Fast Run)',
    fare: 70,
    coords: { x: 90, z: -3 },
    tag: 'City Eastern Gate',
    icon: '🌆',
  },
  {
    id: 'trivandrum',
    name: 'തിരുവനന്തപുരം തമ്പാനൂർ',
    englishName: 'Trivandrum Central Terminal',
    description: 'കൊച്ചിൻ എക്സ്പ്രസ്സ് ടെർമിനസ്, സെക്രട്ടേറിയറ്റ് ഹൈവേ മെയിൻ റൂട്ട്',
    stage: 'Stage 14',
    distance: '185 km (Super Fast)',
    fare: 95,
    coords: { x: -95, z: 3 },
    tag: 'State Capital',
    icon: '🏛️',
  },
];

interface KSRTCTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: number;
  onPurchaseAndTravel: (dest: BusDestination) => void;
}

export function KSRTCTicketModal({
  isOpen,
  onClose,
  wallet,
  onPurchaseAndTravel,
}: KSRTCTicketModalProps) {
  const [selectedDest, setSelectedDest] = useState<BusDestination>(KSRTC_DESTINATIONS[2]);
  const [printedTicket, setPrintedTicket] = useState<{
    dest: BusDestination;
    pnr: string;
    time: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSelectAndBuy = (dest: BusDestination) => {
    if (wallet < dest.fare) {
      soundSynth.playSound('autohorn');
      return;
    }

    setSelectedDest(dest);
    soundSynth.playSound('ticket');
    soundSynth.playSound('bell');

    const randomPNR = `KL-SF-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setPrintedTicket({
      dest,
      pnr: randomPNR,
      time: timeString,
    });
  };

  const handleConfirmBoarding = () => {
    if (!printedTicket) return;
    soundSynth.playSound('airhorn');
    soundSynth.playSound('bell');
    onPurchaseAndTravel(printedTicket.dest);
    setPrintedTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-[#081510] border-2 border-amber-400/50 shadow-2xl shadow-emerald-950/90 overflow-hidden text-zinc-100 font-body">
        
        {/* TOP HEADER: KSRTC SUPER FAST TICKET MACHINE HEADER */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#8b1517] via-[#a31a1e] to-[#7f1315] border-b border-amber-400/40 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl shadow-inner">
              🚌
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-white text-base sm:text-lg tracking-wider">
                  KSRTC SUPER FAST
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400 text-black font-extrabold uppercase">
                  ETM v4.2
                </span>
              </div>
              <div className="text-amber-200 text-xs font-malayalam flex items-center gap-1.5 font-medium">
                <span>കേരള സ്റ്റേറ്റ് റോഡ് ട്രാൻസ്പോർട്ട് കോർപ്പറേഷൻ • ഇലക്ട്രോണിക് ടിക്കറ്റിംഗ് മെഷീൻ</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/40 hover:bg-black/70 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer text-sm font-bold"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* CONDUCTOR SPEECH BANNER */}
        <div className="px-5 py-2.5 bg-emerald-950/70 border-b border-emerald-800/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎫</span>
            <div>
              <span className="font-bold text-amber-300 font-malayalam text-xs sm:text-sm">
                കണ്ടക്ടർ സുകുമാരൻ:
              </span>{' '}
              <span className="text-zinc-200 font-malayalam text-xs sm:text-sm">
                “ടിക്കറ്റ് വേണം! എങ്ങോട്ടാ പോവേണ്ടത്? സ്ഥലം തിരഞ്ഞെടുത്ത് ടിക്കറ്റ് എടുക്കൂ, വണ്ടി ഉടൻ പുറപ്പെടും!”
              </span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 border border-emerald-500/30 text-[11px] font-mono shrink-0">
            <span className="text-zinc-400">Wallet:</span>
            <span className="font-bold text-emerald-300">₹{wallet}</span>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar">
          {!printedTicket ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
                <span className="uppercase tracking-wider">Select Destination & Route Stage (വ്യത്യസ്ത നിരക്കുകൾ):</span>
                <span className="text-amber-400 font-bold">7 Stops Available</span>
              </div>

              {/* Destination Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {KSRTC_DESTINATIONS.map((dest) => {
                  const canAfford = wallet >= dest.fare;
                  const isSelected = selectedDest.id === dest.id;

                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDest(dest)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#152a20] border-amber-400 shadow-md shadow-emerald-950/80'
                          : 'bg-[#0b1b14]/80 hover:bg-[#0f241c] border-emerald-900/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg p-1 rounded-lg bg-black/40 border border-white/10">
                              {dest.icon}
                            </span>
                            <div>
                              <h3 className="font-malayalam font-bold text-white text-xs sm:text-sm leading-tight">
                                {dest.name}
                              </h3>
                              <span className="text-[10px] text-zinc-400 font-mono">
                                {dest.englishName}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                              ₹ {dest.fare}
                            </span>
                            <div className="text-[9px] font-mono text-zinc-400 mt-0.5">
                              {dest.stage}
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-300 font-malayalam mt-2 line-clamp-1">
                          {dest.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-emerald-400/80 flex items-center gap-1">
                          <span>📍</span> {dest.distance}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAndBuy(dest);
                          }}
                          disabled={!canAfford}
                          className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all text-[11px] flex items-center gap-1 cursor-pointer ${
                            canAfford
                              ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-sm active:scale-95'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? (
                            <>
                              <span>ടിക്കറ്റ് എടുക്കുക</span>
                              <span>➔</span>
                            </>
                          ) : (
                            'കാശു തികയില്ല'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* PRINTED KSRTC BUS TICKET DISPLAY */
            <div className="flex flex-col items-center justify-center py-2 animate-scaleUp">
              <div className="w-full max-w-md bg-[#faf7eb] text-zinc-900 p-5 rounded-lg shadow-2xl border-2 border-dashed border-zinc-400 font-mono relative overflow-hidden">
                {/* Top Perforation zig-zag notch */}
                <div className="text-center pb-2 border-b-2 border-dashed border-zinc-400">
                  <div className="text-xs font-black tracking-widest text-[#8b1517] uppercase">
                    KERALA STATE ROAD TRANSPORT CORP.
                  </div>
                  <div className="text-[11px] font-bold text-zinc-700 font-malayalam mt-0.5">
                    ആനവണ്ടി ഇലക്ട്രോണിക് ടിക്കറ്റ് (COCHIN XPRESS)
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-600 mt-1">
                    <span>BUS: KL-15-A-1764 (RPK 992)</span>
                    <span>DEPOT: PARAVUR</span>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="py-3 space-y-1.5 text-xs border-b-2 border-dashed border-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">TICKET PNR:</span>
                    <span className="font-bold text-zinc-900">{printedTicket.pnr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">TIME & DATE:</span>
                    <span className="font-bold">{printedTicket.time} • TODAY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">SERVICE TYPE:</span>
                    <span className="font-black text-[#8b1517]">SUPER FAST (SF)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">FROM:</span>
                    <span className="font-bold font-malayalam">കിഴക്കുംപുറം ടെർമിനൽ</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-200/60 p-1 rounded">
                    <span className="text-zinc-600 font-bold">DESTINATION:</span>
                    <span className="font-black text-sm text-[#8b1517] font-malayalam">
                      {printedTicket.dest.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">ROUTE STAGE:</span>
                    <span className="font-bold">{printedTicket.dest.stage}</span>
                  </div>
                </div>

                {/* Fare & Barcode */}
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase">Total Fare Paid</div>
                    <div className="text-2xl font-black text-[#8b1517]">
                      ₹ {printedTicket.dest.fare}.00
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black tracking-widest text-zinc-800">
                      ||||| | ||||| | |||
                    </div>
                    <div className="text-[9px] text-zinc-500">KSRTC PASSENGER COPY</div>
                  </div>
                </div>

                <div className="mt-3 text-center text-[10px] text-zinc-500 font-malayalam italic">
                  “ആനവണ്ടിയിൽ യാത്ര ചെയ്യൂ • സുരക്ഷിതമായ യാത്ര ആശംസിക്കുന്നു!”
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-3 w-full max-w-md">
                <button
                  onClick={() => setPrintedTicket(null)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold transition-colors cursor-pointer text-center"
                >
                  ← വേറെ സ്ഥലം കാണുക
                </button>

                <button
                  onClick={handleConfirmBoarding}
                  className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black text-xs font-mono font-black shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-transform cursor-pointer"
                >
                  <span>🚌 ബസ്സിൽ കയറുക (Go to Destination)</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="px-5 py-3 bg-[#06110c] border-t border-emerald-900/60 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Speed: 45 km/h • Conductor Sukumaran on duty</span>
          </div>
          <div className="text-[11px] text-amber-300 font-malayalam">
            തിരുവനന്തപുരം ➔ കോഴിക്കോട് ഫാസ്റ്റ് പാസഞ്ചർ & സൂപ്പർ ഫാസ്റ്റ്
          </div>
        </div>
      </div>
    </div>
  );
}
