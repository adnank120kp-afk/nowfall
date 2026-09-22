import React from 'react';
import { soundSynth } from '../audio';
import { WeatherMode } from '../types';

interface HeaderHUDProps {
  weather: WeatherMode;
  onCycleWeather: () => void;
  wallet: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenDistrictModal: () => void;
  onToggleVehicle: () => void;
  inVehicle: boolean;
  isMapOpen: boolean;
  onToggleMap: () => void;
  isMessagesOpen: boolean;
  onToggleMessages: () => void;
  isSpotsOpen: boolean;
  onToggleSpots: () => void;
  onOpenKSRTC: () => void;
  onOpenBigMap?: () => void;
  isBigMapOpen?: boolean;
  playerModel?: 'unni' | 'babu';
  onTogglePlayerModel?: () => void;
}

const WEATHER_LABELS: Record<WeatherMode, { label: string; icon: string }> = {
  monsoon: { label: 'കേരള മൺസൂൺ (Monsoon Active)', icon: '🌧️' },
  morning: { label: 'മൂടൽമഞ്ഞുള്ള പ്രഭാതം (Misty Sunrise)', icon: '🌫️' },
  evening: { label: 'സന്ധ്യാ സൂര്യൻ (Golden Evening)', icon: '🌅' },
};

export function HeaderHUD({
  weather,
  onCycleWeather,
  wallet,
  isMuted,
  onToggleMute,
  onOpenDistrictModal,
  onToggleVehicle,
  inVehicle,
  isMapOpen,
  onToggleMap,
  isMessagesOpen,
  onToggleMessages,
  isSpotsOpen,
  onToggleSpots,
  onOpenKSRTC,
  onOpenBigMap,
  isBigMapOpen = false,
  playerModel = 'babu',
  onTogglePlayerModel,
}: HeaderHUDProps) {
  const currentWeatherData = WEATHER_LABELS[weather];

  return (
    <header className="relative z-50 flex items-center justify-between px-3 sm:px-6 py-2.5 border-b border-emerald-800/40 bg-[#06140ee8] backdrop-blur-xl shadow-xl select-none">
      {/* Game Logo & Kerala Authentic Tagline */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        <div
          className="relative flex items-center justify-center w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-500 to-[#a83822] p-[1px] shadow-lg shadow-emerald-950/80 cursor-pointer transition-transform hover:scale-105"
          onClick={onOpenDistrictModal}
          title="Change Kerala District"
        >
          <div className="w-full h-full bg-[#081711] rounded-[11px] flex items-center justify-center text-lg sm:text-xl">
            🌴
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 px-1 items-center justify-center rounded-full bg-amber-400 text-[8px] font-mono font-black text-black border border-[#081711] tracking-wider">
            KERALA
          </span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-sm sm:text-lg font-extrabold tracking-wider text-white uppercase flex items-center gap-1.5 sm:gap-2">
              <span>NAATTILE SCENE</span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded font-malayalam font-black bg-[#0f5132] text-emerald-300 border border-emerald-400/40 tracking-normal">
                ഇത് കേരളമാണ്!
              </span>
            </h1>
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              <span className="text-[10px] font-mono font-extrabold text-emerald-200">2K QHD • 120 FPS</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-300/85 font-medium mt-0.5">
            <span className="font-malayalam text-amber-300 flex items-center gap-1 font-semibold text-[10px] sm:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span>കിഴക്കുംപുറം വില്ലേജ് (Kizhakkumpuram)</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-emerald-500 hidden sm:inline-block"></span>
            <span className="font-mono text-[11px] text-zinc-300 hidden md:inline-block">SH-17 Highway • കോഴിക്കോട് 24 KM</span>
          </div>
        </div>
      </div>

      {/* Center: TOP ICONS FOR BIG MAP, RADAR, MESSAGES & KSRTC BOARDING */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* 🗺️ BIG MAP (12 DISTRICTS) BUTTON */}
        {onOpenBigMap && (
          <button
            onClick={onOpenBigMap}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md ${
              isBigMapOpen
                ? 'bg-amber-500 text-black border-amber-300 shadow-amber-950/80 ring-2 ring-amber-300'
                : 'bg-gradient-to-r from-emerald-900 via-[#0d2a1b] to-emerald-900 hover:from-emerald-800 hover:to-[#123824] text-emerald-200 border-emerald-500/60'
            }`}
            title="Open Big Map: 12 Districts of Kizhakkumpuram"
          >
            <span className="text-sm">🗺️</span>
            <span className="font-extrabold text-amber-300">BIG MAP</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-black font-mono font-black hidden sm:inline">
              12
            </span>
          </button>
        )}

        {/* 🧭 RADAR MINI-MAP TOGGLE ICON */}
        <button
          onClick={onToggleMap}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md ${
            isMapOpen
              ? 'bg-emerald-700/80 text-white border-emerald-400 shadow-emerald-950/80'
              : 'bg-[#0a2318]/90 hover:bg-[#0f3424] text-emerald-300 border-emerald-700/40'
          }`}
          title="Toggle GPS Radar Map"
        >
          <span className="text-sm">🧭</span>
          <span className="hidden md:inline font-malayalam">റഡാർ</span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-80">(Radar)</span>
          {isMapOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          )}
        </button>

        {/* 💬 MESSAGES / DISPATCHES TOGGLE ICON */}
        <button
          onClick={onToggleMessages}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md ${
            isMessagesOpen
              ? 'bg-cyan-800/80 text-white border-cyan-400 shadow-cyan-950/80'
              : 'bg-[#072428]/90 hover:bg-[#0c363c] text-cyan-300 border-cyan-700/40'
          }`}
          title="Toggle Messages & Dispatches"
        >
          <span className="text-sm">💬</span>
          <span className="hidden md:inline font-malayalam">വാർത്തകൾ</span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-80">(News)</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </button>

        {/* ☕ CHAYA KADA & VILLAGE SPOTS TOGGLE ICON */}
        <button
          onClick={onToggleSpots}
          className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md ${
            isSpotsOpen
              ? 'bg-amber-600/80 text-white border-amber-300 shadow-amber-950/80'
              : 'bg-[#291708]/90 hover:bg-[#38200d] text-amber-300 border-amber-600/40'
          }`}
          title="Toggle Chaya Kada, Mosque & Village Bus Card"
        >
          <span className="text-sm">☕</span>
          <span className="hidden md:inline font-malayalam">ചായക്കട</span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-80">(Spots)</span>
          {isSpotsOpen && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
          )}
        </button>

        {/* 🚌 ENTER KSRTC BUS (BOARD & CHOOSE DESTINATION / MONEY FARE) */}
        <button
          onClick={onOpenKSRTC}
          className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-black transition-all border border-amber-400/80 bg-gradient-to-r from-[#8b1517] via-[#b31d22] to-[#7f1315] hover:from-[#a31a1e] hover:to-[#911619] text-white flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-lg shadow-red-950/60"
          title="Board KSRTC Bus & Choose Destination"
        >
          <span className="text-sm animate-bounce">🚌</span>
          <span className="font-malayalam font-extrabold text-amber-300 text-xs sm:text-sm">
            KSRTC കേറുക
          </span>
          <span className="hidden lg:inline text-[10px] font-mono text-amber-200/90 font-medium">
            (Board Bus)
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-black font-black font-mono">
            ₹
          </span>
        </button>

        {/* 👓 CHARACTER SKIN TOGGLE (BABU DIAGRAM TECHIE / TRADITIONAL UNNI) */}
        {onTogglePlayerModel && (
          <button
            onClick={onTogglePlayerModel}
            className="px-2 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border border-blue-400/50 bg-[#0c243b]/90 hover:bg-[#133554] text-cyan-200 flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md"
            title="Toggle Character Avatar: Babu (Techie Diagram) / Unni (Traditional Mundu)"
          >
            <span className="text-sm">👓</span>
            <span className="font-malayalam text-amber-200 text-xs hidden md:inline">
              {playerModel === 'babu' ? 'ബാബു (Techie)' : 'ഉണ്ണി (Traditional)'}
            </span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/30 text-cyan-300 font-mono hidden sm:inline">
              Skin
            </span>
          </button>
        )}
      </div>

      {/* Right: Audio Action Buttons & Audio Toggle */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Center: Live Weather Status (Hidden on smaller screens) */}
        <div className="hidden xl:flex items-center gap-2 hud-panel px-3 py-1 rounded-full border border-emerald-500/30">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-zinc-400 text-[10px]">Weather:</span>
            <span className="text-cyan-300 font-bold font-malayalam text-xs">
              {currentWeatherData.icon} {currentWeatherData.label}
            </span>
          </div>
          <button
            className="px-2 py-0.5 rounded-md bg-[#0f5132] hover:bg-emerald-700 text-[10px] text-emerald-200 transition-all border border-emerald-400/40 font-mono font-bold cursor-pointer"
            onClick={onCycleWeather}
          >
            Sky 🌦️
          </button>
        </div>

        {/* Quick Audio Horn Buttons */}
        <div className="hidden md:flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-emerald-900/60">
          <button
            className="px-2 py-1 rounded-lg bg-emerald-950/80 hover:bg-[#0f5132] text-amber-300 border border-amber-400/30 text-xs font-mono font-bold transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
            onClick={() => soundSynth.playSound('airhorn')}
            title="Kerala Bus Musical Air Horn [H]"
          >
            <span>🎺 Horn</span>
          </button>
          <button
            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-transform active:scale-95 flex items-center gap-1 cursor-pointer ${
              inVehicle
                ? 'bg-amber-500 text-black border border-amber-300 animate-pulse'
                : 'bg-emerald-950/80 hover:bg-[#0f5132] text-yellow-300 border border-yellow-500/30'
            }`}
            onClick={onToggleVehicle}
            title="Babu Auto Horn / Ride [F]"
          >
            <span>🛺 {inVehicle ? 'Exit Auto' : 'Auto [F]'}</span>
          </button>
        </div>

        {/* Mobile quick toggle sky */}
        <button
          className="xl:hidden px-2 py-1 rounded-lg bg-[#0f5132] text-emerald-200 text-xs font-mono font-bold border border-emerald-400/40"
          onClick={onCycleWeather}
          title="Toggle Weather"
        >
          {currentWeatherData.icon}
        </button>

        {/* Wallet Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2 hud-panel px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-emerald-700/30">
          <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
            ₹
          </div>
          <div>
            <div className="text-[8px] sm:text-[9px] uppercase text-zinc-400 font-mono leading-none">Wallet</div>
            <div className="text-xs font-bold text-emerald-300 font-mono">₹{wallet}</div>
          </div>
        </div>

        {/* Download Project ZIP Button */}
        <a
          href="/naattile-scene-kerala.zip"
          download="naattile-scene-kerala-3d.zip"
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black text-xs font-mono font-extrabold shadow-md border border-amber-300/60 active:scale-95 transition-transform cursor-pointer"
          title="Download complete project ZIP file"
        >
          <span>📦</span>
          <span className="hidden sm:inline">ZIP</span>
        </a>

        {/* Mute/Sound Button */}
        <button
          className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-black/40 border border-emerald-900/60 flex items-center justify-center text-emerald-300 hover:bg-emerald-800/40 text-xs sm:text-sm shadow-md cursor-pointer transition-colors"
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </header>
  );
}
