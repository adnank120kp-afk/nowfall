import { useState } from 'react';
import { soundSynth } from '../audio';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  newspaperStory: string;
  onSelectPersonDialogue?: (id: string) => void;
}

export function MessagesModal({
  isOpen,
  onClose,
  newspaperStory,
  onSelectPersonDialogue,
}: MessagesModalProps) {
  const [activeTab, setActiveTab] = useState<'news' | 'bus' | 'villagers'>('news');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[88vh] flex flex-col rounded-2xl bg-[#081510] border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/90 overflow-hidden text-zinc-100 font-body">
        
        {/* HEADER */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0d3b27] via-[#0f462f] to-[#0a2f1f] border-b border-emerald-500/40 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shadow-inner">
              💬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-white text-base sm:text-lg tracking-wider">
                  KERALA DISPATCHES & MESSAGES
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400 text-black font-extrabold uppercase">
                  LIVE
                </span>
              </div>
              <div className="text-emerald-300 text-xs font-malayalam">
                നാട്ടുവാർത്തകൾ, ബസ് അറിയിപ്പുകൾ & ചായക്കട വർത്തമാനങ്ങൾ
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

        {/* TABS */}
        <div className="flex border-b border-emerald-800/40 bg-[#06120c] px-4 pt-2 gap-2 text-xs font-mono">
          <button
            onClick={() => {
              setActiveTab('news');
              soundSynth.playSound('teaglass');
            }}
            className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'news'
                ? 'bg-[#0f2d1e] text-emerald-300 border-t border-x border-emerald-600/50 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>📰 ഗ്രാമവാർത്തകൾ</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('bus');
              soundSynth.playSound('airhorn');
            }}
            className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'bus'
                ? 'bg-[#0f2d1e] text-amber-300 border-t border-x border-amber-600/50 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>🚌 ബസ് അറിയിപ്പ്</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('villagers');
              soundSynth.playSound('teaglass');
            }}
            className={`px-3 py-1.5 rounded-t-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'villagers'
                ? 'bg-[#0f2d1e] text-cyan-300 border-t border-x border-cyan-600/50 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>🗣️ സംഭാഷണങ്ങൾ</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {activeTab === 'news' && (
            <div className="space-y-3">
              {/* Daily Newspaper Story */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <span>📰</span> മലയാള മനോരമ • പ്രത്യേക വാർത്ത
                  </span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">
                    ഇന്നത്തെ തലക്കെട്ട്
                  </span>
                </div>
                <p className="font-malayalam text-zinc-100 text-sm leading-relaxed">
                  {newspaperStory}
                </p>
              </div>

              {/* Village Flash Bulletins */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 space-y-2 text-xs">
                <div className="font-mono text-emerald-400 font-bold text-[11px] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  കിഴക്കുംപുറം ഫ്ലാഷ് ന്യൂസ്
                </div>

                <div className="space-y-1.5 text-zinc-300 font-malayalam">
                  <div className="flex items-start gap-2 bg-black/30 p-2 rounded-lg">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>
                      നായരുടെ ചായക്കടയിൽ ചൂട് പരിപ്പുവടയും സുലൈമാനിയും തയ്യാറാണ്. മഴ തുടങ്ങിയതോടെ കടത്തിണ്ണയിൽ വലിയ തിരക്ക്!
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-black/30 p-2 rounded-lg">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>
                      ഓട്ടോ ബാബുവിന്റെ പുതിയ എയർ ഹോൺ പരീക്ഷണ ഓട്ടം വിജയകരം. [F] അമർത്തി ആർക്കും ഓട്ടോ ടെസ്റ്റ് ഡ്രൈവ് ചെയ്യാം!
                    </span>
                  </div>
                  <div className="flex items-start gap-2 bg-black/30 p-2 rounded-lg">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>
                      കിഴക്കുംപുറം ജുമാ മസ്ജിദ് ശാന്തമായ അന്തരീക്ഷത്തിൽ സഞ്ചാരികളെ സ്വാഗതം ചെയ്യുന്നു.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bus' && (
            <div className="space-y-3">
              {/* KSRTC Super Fast Status */}
              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚏</span>
                    <div>
                      <h4 className="font-bold text-white text-xs font-mono uppercase">
                        KSRTC SUPER FAST (RPK 992)
                      </h4>
                      <span className="text-[10px] text-amber-300 font-malayalam">
                        വടക്കൻ പറവൂർ ➔ തിരുവനന്തപുരം • കൊച്ചിൻ എക്സ്പ്രസ്സ്
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    ACTIVE BAY 1
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-malayalam bg-black/30 p-2 rounded-lg">
                  വൈറ്റില മൊബിലിറ്റി ഹബ്ബ്, ആലപ്പുഴ, കൊല്ലം വഴി തിരുവനന്തപുരം സൂപ്പർ ഫാസ്റ്റ് സർവീസ്. ടിക്കറ്റ് നിരക്ക് ₹10 മുതൽ ആരംഭിക്കുന്നു.
                </p>
              </div>

              {/* Private Bus Eranhikkal */}
              <div className="p-3.5 rounded-xl bg-pink-950/30 border border-pink-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🚌</span>
                    <div>
                      <h4 className="font-bold text-white text-xs font-mono uppercase">
                        ERANHIKKAL (SAMMAS)
                      </h4>
                      <span className="text-[10px] text-pink-300 font-malayalam">
                        കോഴിക്കോട് ➔ മഞ്ചേരി • ലിമിറ്റഡ് സ്റ്റോപ്പ് (KL 10 AV 8847)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-bold">
                    2020 CLUB EDITION
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-malayalam bg-black/30 p-2 rounded-lg">
                  കിളി നൗഷാദ് ബോർഡിംഗ് വാതിലിൽ യാത്രക്കാരെ കാത്തിരിക്കുന്നു. കൊണ്ടോട്ടി, രാമനാട്ടുകര വഴി അതിവേഗ സർവീസ്!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'villagers' && (
            <div className="space-y-2.5">
              {[
                {
                  name: 'ഓട്ടോ ബാബു (Babu Chettan)',
                  role: 'Auto Union Secretary',
                  icon: '🛺',
                  dialogue: '“ഇത് കേരളമാണ് ഉണ്ണീ! ആനവണ്ടിയുടെ മുന്നിൽ ഓട്ടോ കേറ്റിയാൽ ഡ്രൈവർ പറപ്പിക്കും! [F] അമർത്തി കേറിക്കോ!”',
                },
                {
                  name: 'നായർ ചേട്ടൻ (Mohanan Nair)',
                  role: 'Tea Master',
                  icon: '☕',
                  dialogue: '“മഴ കനക്കുകയാണ്! കടത്തിണ്ണയിൽ ഇരുന്ന് മനോരമ പത്രം വായിക്കൂ, ചൂട് പരിപ്പുവടയും പഴംപൊരിയും റെഡിയാണ്!”',
                },
                {
                  name: 'സ്റ്റേഷൻ മാസ്റ്റർ ദാമോദരൻ പിള്ള',
                  role: 'KSRTC Station Master',
                  icon: '👨‍✈️',
                  dialogue: '“കിഴക്കുംപുറം ഡിപ്പോയിലേക്ക് സ്വാഗതം! ബേ 1 ൽ തിരുവനന്തപുരം സൂപ്പർ ഫാസ്റ്റ് റെഡിയാണ്!”',
                },
                {
                  name: 'കിളി നൗഷാദ് (Noushad)',
                  role: 'Private Bus Door Boy',
                  icon: '🚩',
                  dialogue: '“കോഴിക്കോട്... കോഴിക്കോട്... ലിമിറ്റഡ് സ്റ്റോപ്പ്! എരഞ്ഞിക്കൽ ക്ലബ്ബ് എഡിഷൻ! കയറിപ്പിടിച്ചോ വേഗം!”',
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-black/40 border border-emerald-900/50 flex items-start gap-3 hover:border-emerald-500/40 transition-colors"
                >
                  <span className="text-2xl p-1.5 rounded-lg bg-[#0c2419] border border-emerald-700/30">
                    {v.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-xs font-malayalam">
                        {v.name}
                      </h4>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        ({v.role})
                      </span>
                    </div>
                    <p className="text-xs text-emerald-200/90 font-malayalam mt-1">
                      {v.dialogue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-2.5 bg-[#06110c] border-t border-emerald-900/60 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Kizhakkumpuram Local Council • 2026</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-emerald-800/40 hover:bg-emerald-700/50 text-emerald-200 text-[11px] font-bold transition-colors cursor-pointer"
          >
            ശരി, അടയ്ക്കുക (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
