import React from 'react';

interface RadarHUDProps {
  onFocusPOI: (poi: 'auto' | 'bus' | 'chaya' | 'mosque') => void;
  onClose?: () => void;
}

export function RadarHUD({ onFocusPOI, onClose }: RadarHUDProps) {
  return (
    <div className="flex flex-col gap-3 pointer-events-auto w-60 sm:w-64 select-none animate-fadeIn">
      {/* Circular Kerala GPS Radar tracking Babu's Auto, KSRTC Bus, Chaya Kada, Mosque */}
      <div className="hud-panel p-3 sm:p-3.5 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-800/50">
          <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]"></span>
            GPS RADAR • കിഴക്കുംപുറം
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-cyan-300 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-500/40 font-bold">
              LIVE
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="w-5 h-5 rounded bg-emerald-950/80 hover:bg-emerald-800/60 text-zinc-400 hover:text-white flex items-center justify-center text-[10px] cursor-pointer border border-emerald-700/40"
                title="Minimize Map"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Circular Radar Screen */}
        <div className="relative w-full h-40 sm:h-44 rounded-full bg-[#06140c] border-2 border-emerald-500/50 overflow-hidden flex items-center justify-center shadow-inner mx-auto">
          {/* Radar Sweep Animation */}
          <div className="radar-sweep absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(149,212,172,0.38)_360deg)] pointer-events-none"></div>

          {/* Concentric Distance Rings */}
          <div className="absolute w-28 sm:w-32 h-28 sm:h-32 rounded-full border border-emerald-800/40 pointer-events-none"></div>
          <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-emerald-800/30 pointer-events-none"></div>

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-900/40"></div>
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-900/40"></div>

          {/* Radar Blips */}
          {/* 1. Player (Center) */}
          <div
            className="absolute w-3 h-3 rounded-full bg-white border border-emerald-400 shadow-[0_0_8px_#ffffff] z-10"
            title="Player (Unni)"
          ></div>

          {/* 2. Babu Auto (Yellow blip) */}
          <div
            className="absolute top-9 sm:top-10 left-10 sm:left-12 flex flex-col items-center cursor-pointer group"
            onClick={() => onFocusPOI('auto')}
            title="Babu Chettan Auto (KL-11)"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></div>
            <span className="text-[8px] font-mono text-yellow-300 bg-black/80 px-1 rounded -mt-2.5 font-bold">
              🛺 Auto
            </span>
          </div>

          {/* 3. KSRTC Fast Passenger (Red blip) */}
          <div
            className="absolute top-7 sm:top-8 right-8 sm:right-10 flex flex-col items-center cursor-pointer group"
            onClick={() => onFocusPOI('bus')}
            title="KSRTC Bus Stand & Depot (ആനവണ്ടി സ്റ്റാൻഡ്)"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[8px] font-mono text-red-300 bg-black/80 px-1 rounded -mt-2.5 font-bold">
              🚌 Stand
            </span>
          </div>

          {/* 4. Nair's Chaya Kada (Amber blip) */}
          <div
            className="absolute bottom-8 sm:bottom-9 left-8 sm:left-9 flex flex-col items-center cursor-pointer group"
            onClick={() => onFocusPOI('chaya')}
            title="Nair's Chaya Kada"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <span className="text-[8px] font-mono text-amber-300 bg-black/80 px-1 rounded -mt-2.5 font-bold">
              ☕ Chaya
            </span>
          </div>

          {/* 5. Peaceful Mosque (Green blip) */}
          <div
            className="absolute bottom-9 sm:bottom-10 right-7 sm:right-8 flex flex-col items-center cursor-pointer group"
            onClick={() => onFocusPOI('mosque')}
            title="Juma Masjid"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            <span className="text-[8px] font-mono text-emerald-300 bg-black/80 px-1 rounded -mt-2.5 font-bold">
              🕌 Masjid
            </span>
          </div>
        </div>

        {/* Quick Fast-Travel / POI Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-2 border-t border-emerald-900/50 text-[10px] font-mono">
          <button
            className="py-1 px-1.5 rounded bg-emerald-950/70 hover:bg-[#0f5132] text-emerald-200 border border-emerald-700/40 text-left truncate flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => onFocusPOI('chaya')}
          >
            <span>☕</span> Nair Chaya
          </button>
          <button
            className="py-1 px-1.5 rounded bg-emerald-950/70 hover:bg-[#0f5132] text-emerald-200 border border-emerald-700/40 text-left truncate flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => onFocusPOI('mosque')}
          >
            <span>🕌</span> Juma Masjid
          </button>
          <button
            className="py-1 px-1.5 rounded bg-emerald-950/70 hover:bg-[#0f5132] text-emerald-200 border border-emerald-700/40 text-left truncate flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => onFocusPOI('auto')}
          >
            <span>🛺</span> Babu Auto
          </button>
          <button
            className="py-1 px-1.5 rounded bg-emerald-950/70 hover:bg-[#0f5132] text-emerald-200 border border-emerald-700/40 text-left truncate flex items-center gap-1 cursor-pointer transition-colors"
            onClick={() => onFocusPOI('bus')}
          >
            <span>🚌</span> KSRTC Stand
          </button>
        </div>
      </div>

      {/* Authentic Roadside Milestone & Infrastructure Info Box */}
      <div className="hud-panel p-3 rounded-2xl flex items-center gap-3 border border-emerald-500/30 shadow-xl">
        {/* Milestone Graphic */}
        <div className="w-10 h-14 bg-white rounded-t-full border-2 border-zinc-400 flex flex-col items-center justify-between p-1 shadow-md flex-shrink-0">
          <div className="w-full h-4 bg-amber-400 rounded-t-full flex items-center justify-center text-[7px] font-mono font-black text-black">
            SH-17
          </div>
          <div className="text-[8px] font-malayalam font-extrabold text-black text-center leading-none">
            കിഴക്കും<br />പുറം
          </div>
          <div className="text-[9px] font-mono font-bold text-zinc-900 leading-none">0 KM</div>
        </div>

        <div className="text-xs">
          <div className="text-[9px] font-mono text-amber-300 font-bold uppercase">Roadside Milestone</div>
          <div className="font-malayalam font-bold text-white text-xs">വെയിറ്റിംഗ് ഷെഡ് &amp; പോസ്റ്റ്</div>
          <div className="text-[10px] text-zinc-300 font-mono mt-0.5">കോഴിക്കോട് 24 KM | ഷൊർണ്ണൂർ 36 KM</div>
        </div>
      </div>
    </div>
  );
}
