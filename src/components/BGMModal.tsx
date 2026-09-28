import React, { useState, useEffect } from 'react';
import { soundSynth, BGMMode, BGM_MODES_INFO } from '../audio';

interface BGMModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AI_MUSIC_PROMPT_TEXT = `Create an original instrumental background soundtrack for a 3D open-world game called “NAATTILE SCENE — ഇത് കേരളമാണ്!”.

Theme: Kerala-inspired open-world adventure and road trip.

Start with a peaceful Kerala village atmosphere using soft chenda-inspired percussion, bamboo flute, subtle edakka-style rhythmic textures, warm acoustic guitar and gentle ambient pads. Gradually build into an energetic cinematic groove suitable for driving through Kerala roads.

Blend traditional South Indian/Kerala-inspired percussion with modern cinematic drums, bass, acoustic guitar and subtle electronic elements.

The music should feel:
- joyful
- adventurous
- nostalgic
- energetic
- rural Kerala
- modern but traditional
- suitable for a huge open-world game

Include subtle environmental ambience such as distant birds, light wind, rain texture and roadside atmosphere, but keep the music clearly audible.

Structure:
0:00–0:20 — peaceful village intro
0:20–0:50 — main melody enters
0:50–1:30 — energetic road-trip section
1:30–2:00 — cinematic exploration section
2:00–2:30 — memorable main theme
2:30–3:00 — smooth loop-friendly ending

Instrumental only. No vocals. No copyrighted melodies. Make the ending transition smoothly back into the beginning so it can loop continuously in a game.

Style: high-quality AAA open-world game soundtrack, Kerala atmosphere, cinematic, immersive, dynamic, clean mix.`;

export const AI_WEATHER_PROMPT_TEXT = `Add a fully automatic Dynamic Weather System to my 3D open-world game “NAATTILE SCENE — ഇത് കേരളമാണ്! (Kizhakkumpuram 3D Open World)”.

🌦️ Dynamic Weather
Create a realistic weather system that automatically changes during gameplay without the player manually selecting it.

Weather types:
☀️ Clear Sunny
🌤️ Partly Cloudy
☁️ Overcast
🌧️ Light Rain
🌧️ Heavy Monsoon Rain
⛈️ Thunderstorm
🌫️ Morning/Mountain Fog
🌈 Post-Rain Clear Weather

🔄 Automatic Weather Changes
Weather should change naturally over time:
Sunny → Cloudy → Light Rain → Heavy Rain → Cloudy → Clear
Sometimes remain sunny for a long period.
Sometimes suddenly become cloudy before rain.
Mountain areas should have more fog and rain.
Coastal areas should have changing clouds and wind.
Monsoon season should produce frequent rain.
Weather changes should be smooth, not instant.

🌧️ Rain Effects
When it rains:
Realistic rain particles, wet roads, road reflections, water puddles, water dripping from roofs, vehicle headlights reflecting on wet roads.

⚡ Thunderstorm
Dark clouds, lightning flashes, thunder sounds with random timing, stronger rain, wind movement in trees.

🌫️ Fog
Dynamic fog density, reduced visibility, foggy roads, mist around hills and waterfalls.

🌈 After Rain
Rain gradually stops, clouds slowly clear, roads remain wet, puddles remain temporarily, sunlight returns gradually, add a possible rainbow.`;

export function BGMModal({ isOpen, onClose }: BGMModalProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(soundSynth.isBGMPlaying());
  const [currentMode, setCurrentMode] = useState<BGMMode>(soundSynth.getBGMMode());
  const [volume, setVolume] = useState<number>(soundSynth.getBGMVolume());
  const [activeTab, setActiveTab] = useState<'player' | 'prompt' | 'weather'>('player');
  const [copiedType, setCopiedType] = useState<string | null>(null);

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

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    soundSynth.playSound('coin');
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="relative max-w-2xl w-full max-h-[92vh] bg-[#07150e] border-2 border-emerald-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/60 bg-[#0c2419] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl">
              🎵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-emerald-300 uppercase">
                  KERALA SOUNDTRACK &amp; MUSIC PROMPT
                </h2>
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-extrabold uppercase">
                  BGM Synth
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                NAATTILE SCENE — Original instrumental Kerala soundtrack &amp; AI Music Prompts
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-5 pt-3 border-b border-emerald-900/50 bg-[#06140d]">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all rounded-t-xl cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'player'
                ? 'bg-[#0c2619] text-amber-300 border-t-2 border-x-2 border-emerald-500/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>📻</span> Live Radio Synth
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all rounded-t-xl cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prompt'
                ? 'bg-[#0c2619] text-amber-300 border-t-2 border-x-2 border-emerald-500/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>📋</span> AI Music Generator Prompt
          </button>
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all rounded-t-xl cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'weather'
                ? 'bg-[#0c2619] text-amber-300 border-t-2 border-x-2 border-emerald-500/60'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <span>🌦️</span> Weather System Prompt
          </button>
        </div>

        {/* Tab 1: Live Radio Player */}
        {activeTab === 'player' && (
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
                  8 Adaptive Intensity Levels
                </span>
                <span className="text-[10px] text-zinc-400">Audition Any Track</span>
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
        )}

        {/* Tab 2: AI Music Generator Prompt */}
        {activeTab === 'prompt' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-300 uppercase">
                  🎵 Main Background Music Prompt
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Ready to copy into Suno, Udio, MusicGen, or any AI music generator:
                </p>
              </div>
              <button
                onClick={() => handleCopyText(AI_MUSIC_PROMPT_TEXT, 'music')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{copiedType === 'music' ? '✓ Copied!' : '📋 Copy Prompt'}</span>
              </button>
            </div>

            {/* Official Theme Titles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-800/60 text-center">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Theme 1</span>
                <span className="text-xs font-black text-amber-300">NAATTILE SCENE — NAMMUDE NAADU</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-800/60 text-center">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Theme 2</span>
                <span className="text-xs font-black text-emerald-300">KIZHAKKUMPURAM DRIVE</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-800/60 text-center">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Theme 3</span>
                <span className="text-xs font-black text-cyan-300">ITHU KERALAANU</span>
              </div>
            </div>

            {/* Prompt Codebox */}
            <div className="p-4 rounded-2xl bg-[#040e09] border border-emerald-500/40 relative shadow-inner">
              <pre className="text-xs text-emerald-200/90 whitespace-pre-wrap font-mono leading-relaxed select-text">
                {AI_MUSIC_PROMPT_TEXT}
              </pre>
            </div>

            {/* Stems & Intensity Guide */}
            <div className="p-3.5 rounded-xl bg-[#0a1e14] border border-emerald-700/50 space-y-1.5 text-xs text-zinc-300">
              <div className="text-[11px] uppercase font-bold text-amber-300 mb-1">🎮 Adaptive Intensity Levels for Game:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div>🌴 <strong className="text-white">Village:</strong> Flute + soft edakka</div>
                <div>🛣️ <strong className="text-white">Highway:</strong> Drums + bass + guitar</div>
                <div>🏙️ <strong className="text-white">City:</strong> Modern electronic beat</div>
                <div>⛰️ <strong className="text-white">Mountains:</strong> Flute + ambient pads</div>
                <div>🌧️ <strong className="text-white">Rain:</strong> Soft arpeggios + rain</div>
                <div>🏖️ <strong className="text-white">Beach:</strong> Relaxed guitar + waves</div>
                <div>🎯 <strong className="text-white">Mission:</strong> Chenda melam sprint</div>
                <div>🌙 <strong className="text-white">Night:</strong> Atmospheric ambient</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dynamic Weather System Prompt */}
        {activeTab === 'weather' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-cyan-300 uppercase">
                  🌦️ Dynamic Automatic Weather System Prompt
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  The specification prompt powering the in-game dynamic automatic weather engine:
                </p>
              </div>
              <button
                onClick={() => handleCopyText(AI_WEATHER_PROMPT_TEXT, 'weather')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider shadow cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>{copiedType === 'weather' ? '✓ Copied!' : '📋 Copy Prompt'}</span>
              </button>
            </div>

            {/* Weather System Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">☀️</span>
                <span className="font-bold text-amber-300">Clear Sunny</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">🌤️</span>
                <span className="font-bold text-zinc-200">Partly Cloudy</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">☁️</span>
                <span className="font-bold text-zinc-400">Overcast Gloom</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">🌧️</span>
                <span className="font-bold text-sky-300">Light / Monsoon</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">⛈️</span>
                <span className="font-bold text-yellow-300">Thunderstorm</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">🌫️</span>
                <span className="font-bold text-zinc-300">Mountain Fog</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">🌈</span>
                <span className="font-bold text-pink-300">Post-Rain Rainbow</span>
              </div>
              <div className="p-2 rounded-lg bg-black/40 border border-emerald-800/50 text-center">
                <span className="block text-lg">🔄</span>
                <span className="font-bold text-emerald-300">Auto Changing</span>
              </div>
            </div>

            {/* Prompt Codebox */}
            <div className="p-4 rounded-2xl bg-[#040e09] border border-cyan-500/40 relative shadow-inner">
              <pre className="text-xs text-cyan-200/90 whitespace-pre-wrap font-mono leading-relaxed select-text">
                {AI_WEATHER_PROMPT_TEXT}
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-emerald-900/60 bg-[#0c2419] flex items-center justify-between text-[11px] text-zinc-400 font-sans">
          <span>Synthesized in real-time with Web Audio API • 100% royalty-free Kerala score</span>
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
