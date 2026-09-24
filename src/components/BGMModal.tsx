import React, { useState, useEffect } from 'react';
import { soundSynth, BGMMode, BGM_MODES_INFO } from '../audio';

interface BGMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BGMModal({ isOpen, onClose }: BGMModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(soundSynth.isBGMPlaying());
  const [currentMode, setCurrentMode] = useState<BGMMode>(soundSynth.getBGMMode());
  const [volume, setVolume] = useState<number>(soundSynth.getBGMVolume());

  useEffect(() => {
    const unsubscribe = soundSynth.subscribeBGM((playing, mode) => {
      setIsPlaying(playing);
      setCurrentMode(mode);
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const currentInfo = BGM_MODES_INFO.find((m) => m.id === currentMode) || BGM_MODES_INFO[0];

  const handleTogglePlay = () => {
    soundSynth.playSound('bell');
    soundSynth.toggleBGM();
    setIsPlaying(soundSynth.isBGMPlaying());
  };

  const handleSelectMode = (mode: BGMMode) => {
    soundSynth.playSound('bell');
    soundSynth.setBGMMode(mode);
    if (!soundSynth.isBGMPlaying()) {
      soundSynth.playBGM(mode);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    soundSynth.setBGMVolume(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="relative max-w-xl w-full max-h-[90vh] bg-[#07150e] border-2 border-emerald-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/60 bg-[#0c2419] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl">
              🎵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-emerald-300 uppercase">
                  KERALA SOUNDTRACK RADIO
                </h2>
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-extrabold uppercase">
                  BGM Synth
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                NAATTILE SCENE — Original instrumental Kerala adventure soundtrack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-emerald-500 hover:text-black border border-emerald-700/60 flex items-center justify-center text-sm font-bold text-zinc-300 transition-colors cursor-pointer"
            title="Close Music Player"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Current Playing Status Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0c2619] via-[#071a10] to-[#041009] border border-emerald-500/40 shadow-inner flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-black/40 border border-emerald-500/50 flex items-center justify-center text-3xl shadow-lg relative">
                {currentInfo.icon}
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                )}
              </div>
              <div>
                <div className="text-[10px] text-amber-300 uppercase font-bold tracking-wider">
                  {isPlaying ? 'Now Playing • ലൈവ് സംഗീതം' : 'Paused • സംഗീതം നിർത്തിവെച്ചിരിക്കുന്നു'}
                </div>
                <div className="text-base font-black text-white">{currentInfo.title}</div>
                <div className="text-xs text-emerald-300 font-sans font-medium">{currentInfo.malayalam}</div>
              </div>
            </div>

            <button
              onClick={handleTogglePlay}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2 ${
                isPlaying
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-500/30 ring-2 ring-amber-300'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/30'
              }`}
            >
              <span>{isPlaying ? '⏸️ Pause' : '▶️ Play Music'}</span>
            </button>
          </div>

          {/* Volume Control */}
          <div className="p-3 rounded-xl bg-black/30 border border-emerald-900/60 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-300">
              <span>🔊</span>
              <span className="font-bold">Master Music Volume:</span>
            </div>
            <div className="flex items-center gap-3 flex-1 max-w-[200px]">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <span className="text-xs font-mono text-emerald-300 font-bold w-9 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>

          {/* Soundtrack Theme Modes Selection Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Select Soundtrack Theme &amp; Intensity
              </span>
              <span className="text-[10px] text-zinc-400">8 Adaptive Kerala Moods</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BGM_MODES_INFO.map((item) => {
                const isSelected = currentMode === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectMode(item.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                        : 'bg-[#081a11]/90 border-emerald-900/60 hover:bg-[#0c2619] hover:border-emerald-700/70'
                    }`}
                  >
                    <div className="text-2xl p-2 rounded-lg bg-black/40 border border-emerald-800/50">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="text-xs font-black text-white truncate">{item.title}</div>
                        {isSelected && (
                          <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black uppercase">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-emerald-300 font-sans">{item.malayalam}</div>
                      <p className="text-[10px] text-zinc-400 font-sans mt-0.5 leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-emerald-900/60 bg-[#0c2419] flex items-center justify-between text-[11px] text-zinc-400 font-sans">
          <span>Synthesized in real-time using Web Audio API • 100% royalty-free Kerala score</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-800 text-emerald-300 border border-emerald-700 font-bold font-mono uppercase text-[10px] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
