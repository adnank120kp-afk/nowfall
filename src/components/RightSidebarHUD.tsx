import React from 'react';

interface RightSidebarHUDProps {
  onOrder: (item: string, price: number) => void;
  onFocusMosque: () => void;
  onFocusFootball?: () => void;
  onFocusPond?: () => void;
  onOpenStadiumTicket?: () => void;
  hasStadiumTicket?: boolean;
  newspaperStory: string;
  onOpenKSRTC?: () => void;
  onClose?: () => void;
}

export function RightSidebarHUD({
  onOrder,
  onFocusMosque,
  onFocusFootball,
  onFocusPond,
  onOpenStadiumTicket,
  hasStadiumTicket,
  newspaperStory,
  onOpenKSRTC,
  onClose,
}: RightSidebarHUDProps) {
  return (
    <div className="w-[360px] sm:w-[390px] max-w-[90vw] flex flex-col gap-3 pointer-events-auto overflow-y-auto pr-1 select-none animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Top Header & Minimize Button */}
      {onClose && (
        <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#061811eb] border border-emerald-500/40 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-2">
            <span className="text-base">☕</span>
            <div className="flex flex-col">
              <span className="font-malayalam font-bold text-xs text-amber-300 leading-none">
                ചായക്കട &amp; വില്ലേജ് സ്പോട്ടുകൾ
              </span>
              <span className="font-mono text-[9px] text-zinc-400 mt-0.5">Village Spots &amp; Bus Tracker</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center gap-1 font-mono text-xs border border-zinc-600/50 cursor-pointer active:scale-95 transition-all"
            title="Minimize into top icon"
          >
            <span>Minimize</span>
            <span className="font-bold">✕</span>
          </button>
        </div>
      )}

      {/* 1. ACTIVE CHAYA KADA CULTURE CARD (നായർസ് ചായക്കട) */}
      <div className="hud-panel-amber p-4 rounded-2xl shadow-2xl relative overflow-hidden border border-amber-500/50">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-[10px] font-mono font-bold text-amber-200 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            ചായക്കട കൾച്ചർ • CHAYA KADA SPOT
          </span>
          <span className="text-xs font-mono font-bold text-amber-300">Hot &amp; Fresh</span>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className="text-3xl p-2 bg-amber-950/80 rounded-xl border border-amber-500/40">☕</div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-white tracking-wide">
              Mohanan Nair's Chaya Kada
            </h3>
            <p className="text-xs text-amber-200/90 font-malayalam font-medium mt-0.5">
              "ചൂടുള്ള ഏലക്കാ സുലൈമാനിയും മൊരിഞ്ഞ പഴംപൊരിയും!"
            </p>
          </div>
        </div>

        {/* Live Order Actions */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-amber-500/30">
          <button
            className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            onClick={() => onOrder('പഴംപൊരി (Pazhampori)', 15)}
          >
            <span>🍌 ഓർഡർ പഴംപൊരി</span>
            <span className="text-[10px] font-mono bg-black/20 px-1 rounded">₹15</span>
          </button>
          <button
            className="py-2 px-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
            onClick={() => onOrder('സുലൈമാനി (Sulaimani)', 10)}
          >
            <span>☕ സുലൈമാനി ചായ</span>
            <span className="text-[10px] font-mono bg-black/30 px-1 rounded">₹10</span>
          </button>
        </div>

        {/* Newspaper Gossip Readout */}
        <div className="mt-3 p-2.5 rounded-xl bg-black/60 border border-amber-400/30">
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
            <span className="flex items-center gap-1">📰 മലയാള മനോരമ • ദിനപത്രം</span>
            <span className="text-amber-300 font-bold">LATEST GOSSIP</span>
          </div>
          <p className="text-[11px] text-amber-100 font-malayalam leading-relaxed">
            {newspaperStory}
          </p>
        </div>
      </div>

      {/* 2. SERENE MOSQUE QUARTER CARD (കിഴക്കുംപുറം ജുമാ മസ്ജിദ്) */}
      <div className="hud-panel-mosque p-4 rounded-2xl shadow-xl relative overflow-hidden border border-emerald-400/40">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            പള്ളി റോഡ് • SERENE MOSQUE QUARTER
          </span>
          <span className="text-xs font-mono font-bold text-emerald-300">Peaceful</span>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-500/40">🕌</div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-white tracking-wide">
              Kizhakkumpuram Juma Masjid
            </h3>
            <p className="text-xs text-emerald-200/90 font-malayalam font-medium mt-0.5">
              ശാന്തമായ മിനാരവും പച്ച താഴികക്കുടവും
            </p>
          </div>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-[#081b14] border border-emerald-600/30 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300 mb-1">
            <span>COMMUNITY ELDER</span>
            <span className="font-bold">Aboobacker Kaka</span>
          </div>
          <p className="text-zinc-200 font-malayalam leading-relaxed text-[11px]">
            “അസ്സലാമു അലൈക്കും ഉണ്ണീ! മഴയത്ത് നടക്കാതെ പള്ളിയുടെ വരാന്തയിൽ കയറി നിൽക്കൂ. സ്കൂളും കടകളും അടുത്താണ്.”
          </p>
          <button
            className="mt-2 w-full py-1.5 rounded-lg bg-emerald-800/40 hover:bg-emerald-700/50 border border-emerald-500/30 text-emerald-200 text-[11px] font-mono flex items-center justify-center gap-1 cursor-pointer transition-colors"
            onClick={onFocusMosque}
          >
            <span>Visit Mosque Grounds</span> 📍
          </button>
        </div>
      </div>

      {/* 2B. KERALA SEVENS STADIUM & TICKET COUNTER (സെവൻസ് സ്റ്റേഡിയം & ടിക്കറ്റ് കൗണ്ടർ) */}
      <div className="hud-panel p-4 rounded-2xl shadow-xl relative overflow-hidden border border-emerald-500/40 bg-gradient-to-b from-[#092b18]/90 to-[#04140b]/95">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-200 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            സെവൻസ് സ്റ്റേഡിയം • SEVENS STADIUM
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${hasStadiumTicket ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`}>
            {hasStadiumTicket ? '✓ PASS VALID' : '₹50 ENTRY'}
          </span>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className="text-3xl p-2 bg-emerald-950/90 rounded-xl border border-emerald-500/40">🏟️</div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-white tracking-wide">
              Kizhakkumpuram Sevens Stadium
            </h3>
            <p className="text-xs text-amber-200/90 font-malayalam font-medium mt-0.5">
              ഗ്രാൻഡ് സ്റ്റാൻഡ് ഗാലറി &amp; ടിക്കറ്റ് കൗണ്ടർ
            </p>
          </div>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-[#081b14] border border-emerald-600/30 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300 mb-1">
            <span>TICKET COLLECTOR</span>
            <span className="font-bold text-amber-300">Koya (കോയ) • ₹50</span>
          </div>
          <p className="text-zinc-200 font-malayalam leading-relaxed text-[11px]">
            “കിഴക്കുംപുറം FC vs മലപ്പുറം സെവൻസ് മാച്ച്! ടിക്കറ്റ് കൗണ്ടറിൽ നിന്ന് ₹50 ടിക്കറ്റ് എടുത്ത് ഗാലറിയിലേക്ക് കയറിക്കോളൂ!”
          </p>

          <div className="grid grid-cols-2 gap-2 mt-2.5">
            {onOpenStadiumTicket && (
              <button
                className={`py-2 px-2 rounded-lg font-bold text-xs font-mono flex items-center justify-center gap-1 cursor-pointer shadow-lg active:scale-98 transition-all ${
                  hasStadiumTicket
                    ? 'bg-emerald-700/80 hover:bg-emerald-600 text-emerald-100 border border-emerald-500/50'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black border border-amber-400/60'
                }`}
                onClick={onOpenStadiumTicket}
              >
                <span>🎫</span>
                <span>{hasStadiumTicket ? 'Pass Active' : 'Ticket (₹50)'}</span>
              </button>
            )}

            {onFocusFootball && (
              <button
                className="py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1 cursor-pointer shadow-lg active:scale-98 transition-all"
                onClick={onFocusFootball}
              >
                <span>⚽ Enter Pitch</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2C. TRANQUIL LOTUS POND (കിഴക്കുംപുറം ആമ്പൽക്കുളം / താമരക്കുളം) */}
      <div className="hud-panel p-4 rounded-2xl shadow-xl relative overflow-hidden border border-cyan-400/40 bg-gradient-to-b from-[#06262d]/90 to-[#031519]/95">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/25 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-200 uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            താമരക്കുളം • SCENIC LOTUS POND
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            TRANQUIL
          </span>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className="text-3xl p-2 bg-cyan-950/90 rounded-xl border border-cyan-500/40">🌸</div>
          <div>
            <h3 className="font-heading text-base font-extrabold text-white tracking-wide">
              Kizhakkumpuram Lotus Pond
            </h3>
            <p className="text-xs text-cyan-200/90 font-malayalam font-medium mt-0.5">
              ആമ്പൽപൂക്കളും വർണ്ണമത്സ്യങ്ങളും • കരിങ്കൽ തീരം
            </p>
          </div>
        </div>

        <div className="mt-3 p-2.5 rounded-xl bg-[#041d22] border border-cyan-600/30 text-xs">
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-1">
            <span>POND CARETAKER</span>
            <span className="font-bold text-pink-300">Devaki Amma (ദേവകി അമ്മ)</span>
          </div>
          <p className="text-zinc-200 font-malayalam leading-relaxed text-[11px]">
            “തെളിഞ്ഞ നീല വെള്ളത്തിൽ ഒഴുകിനടക്കുന്ന താമരയിലകളും വിരിഞ്ഞ ആമ്പൽപൂക്കളും! കല്ലിന്മേൽ ഇരുന്ന് തണുത്ത കാറ്റേൽക്കൂ!”
          </p>

          {onFocusPond && (
            <button
              className="mt-2.5 w-full py-2 px-2 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-98 transition-all border border-cyan-400/40"
              onClick={onFocusPond}
            >
              <span>🌸</span>
              <span>Visit Lotus Pond Shore</span>
              <span>📍</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. KERALA BUS FLEET TRACKER */}
      <div className="hud-panel p-3.5 rounded-2xl border border-emerald-700/30 text-xs shadow-xl space-y-3">
        {/* KSRTC Super Fast */}
        <div>
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-emerald-800/50">
            <span className="font-mono text-[10px] text-zinc-300 font-bold uppercase flex items-center gap-1.5">
              <span>🚏</span> KSRTC SUPER FAST (RPK 992)
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              KL.15.A.1764
            </span>
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex flex-col text-zinc-300 bg-emerald-950/40 p-1.5 rounded-xl border border-emerald-900/40">
              <div className="flex items-center justify-between">
                <span className="text-amber-300 font-bold font-malayalam text-[10.5px]">വടക്കൻ പറവൂർ ➔ തിരുവനന്തപുരം</span>
                <span className="text-[9px] text-emerald-400 font-bold">Cochin Xpress</span>
              </div>
              <span className="text-[9.5px] text-zinc-400 font-malayalam mt-0.5">വൈറ്റില • ആലപ്പുഴ • കൊല്ലം വഴി</span>
            </div>
            {onOpenKSRTC && (
              <button
                onClick={onOpenKSRTC}
                className="w-full mt-1.5 py-1 px-2 rounded-lg bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-mono font-bold text-[10px] flex items-center justify-center gap-1.5 border border-red-500/40 shadow-sm cursor-pointer active:scale-95 transition-transform"
              >
                <span>🚌 KSRTC കേറുക &amp; ടിക്കറ്റ് എടുക്കൂ</span>
                <span className="text-amber-300 font-bold">➔</span>
              </button>
            )}
          </div>
        </div>

        {/* Kerala Private Bus (ERANHIKKAL) */}
        <div>
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-pink-800/50">
            <span className="font-mono text-[10px] text-pink-300 font-bold uppercase flex items-center gap-1.5">
              <span>🚌</span> PRIVATE BUS: ERANHIKKAL
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
              KL.10.AV.8847
            </span>
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex flex-col text-zinc-300 bg-pink-950/30 p-1.5 rounded-xl border border-pink-900/40">
              <div className="flex items-center justify-between">
                <span className="text-pink-300 font-bold font-malayalam text-[10.5px]">കോഴിക്കോട് ➔ മഞ്ചേരി (ലിമിറ്റഡ് സ്റ്റോപ്പ്)</span>
                <span className="text-[9px] text-yellow-300 font-bold">SAMMAS</span>
              </div>
              <span className="text-[9.5px] text-zinc-400 font-malayalam mt-0.5">2020 CLUB EDITION • കൊണ്ടോട്ടി വഴി</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300 bg-pink-950/20 p-1 rounded-lg border border-pink-900/30 text-[9.5px]">
              <span className="text-zinc-300">Shelter Bay & Highway</span>
              <span className="text-pink-300 font-bold">Cruising & Boarding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
