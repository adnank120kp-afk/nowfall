import React, { useState } from 'react';
import { VehicleType } from '../types';

interface ControlsHUDProps {
  onHonk: () => void;
  onAutoToggle: () => void;
  onBusToggle?: () => void;
  onInteract: () => void;
  onOpenKSRTC?: () => void;
  onOpenStadiumTicket?: () => void;
  onOpenThattukada?: () => void;
  inVehicle: boolean;
  vehicleType?: VehicleType;
}

export function ControlsHUD({
  onHonk,
  onAutoToggle,
  onBusToggle,
  onInteract,
  onOpenKSRTC,
  onOpenStadiumTicket,
  onOpenThattukada,
  inVehicle,
  vehicleType = 'auto',
}: ControlsHUDProps) {
  const [show360Panel, setShow360Panel] = useState<boolean>(true);

  const handle360Camera = () => {
    window.dispatchEvent(new CustomEvent('kerala360Camera'));
  };

  const handle360Turn = () => {
    window.dispatchEvent(new CustomEvent('kerala360Turn'));
  };

  const handleRotateLeft = () => {
    window.dispatchEvent(new CustomEvent('keralaRotateCamLeft'));
  };

  const handleRotateRight = () => {
    window.dispatchEvent(new CustomEvent('keralaRotateCamRight'));
  };

  const handleResetCamera = () => {
    window.dispatchEvent(new CustomEvent('keralaResetCamera'));
  };

  return (
    <>
      {/* Floating 360° Orbit & Turn Controller Widget */}
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 z-20 pointer-events-auto select-none">
        {show360Panel ? (
          <div className="bg-[#051710e6] border border-cyan-500/50 backdrop-blur-md rounded-2xl p-3 shadow-2xl flex flex-col gap-2.5 w-[220px] sm:w-[240px] text-white animate-in fade-in zoom-in-95 duration-150">
            {/* Widget Title Header */}
            <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/30">
              <div className="flex items-center gap-1.5">
                <span className="text-base text-cyan-400 animate-spin" style={{ animationDuration: '6s' }}>🔄</span>
                <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">360° CONTROLS</span>
              </div>
              <button
                onClick={() => setShow360Panel(false)}
                className="text-zinc-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700"
                title="Minimize 360 panel"
              >
                ✕
              </button>
            </div>

            {/* Primary 360 Actions */}
            <div className="flex flex-col gap-1.5">
              <button
                onClick={handle360Camera}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-between cursor-pointer border border-cyan-400/40"
                title="Perform smooth 360° panoramic camera orbit (Key: 3)"
              >
                <span className="flex items-center gap-1.5">
                  <span>🔄</span>
                  <span>360° Cam Orbit</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-[10px] text-cyan-200">[3]</span>
              </button>

              <button
                onClick={handle360Turn}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-between cursor-pointer border border-emerald-400/40"
                title={inVehicle ? 'Perform 360° vehicle donut drift stunt (Key: Z)' : 'Perform 360° character pirouette turn (Key: Z)'}
              >
                <span className="flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>{inVehicle ? '360° Donut Spin' : '360° Pirouette'}</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/30 font-mono text-[10px] text-emerald-200">[Z]</span>
              </button>
            </div>

            {/* Step Rotation & View Reset */}
            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-zinc-700/60">
              <button
                onClick={handleRotateLeft}
                className="py-1 px-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono font-bold border border-zinc-600/50 flex items-center justify-center gap-0.5 active:scale-95 transition-transform"
                title="Turn camera 45° left [Q]"
              >
                <span>⟲</span> 45°
              </button>
              <button
                onClick={handleResetCamera}
                className="py-1 px-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/40 flex items-center justify-center gap-0.5 active:scale-95 transition-transform"
                title="Reset camera directly behind you"
              >
                <span>🎯</span> Reset
              </button>
              <button
                onClick={handleRotateRight}
                className="py-1 px-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-[11px] font-mono font-bold border border-zinc-600/50 flex items-center justify-center gap-0.5 active:scale-95 transition-transform"
                title="Turn camera 45° right"
              >
                45° <span>⟳</span>
              </button>
            </div>

            {/* Drag & Tip Hint */}
            <p className="text-[9.5px] font-mono text-cyan-200/70 text-center leading-tight">
              🖱️ Drag view to orbit 360° freely • Double-click to reset
            </p>
          </div>
        ) : (
          <button
            onClick={() => setShow360Panel(true)}
            className="px-3 py-2 rounded-2xl bg-[#051710e6] hover:bg-[#0c2e22] text-cyan-300 border border-cyan-500/60 shadow-2xl backdrop-blur-xl flex items-center gap-2 font-mono text-xs font-bold active:scale-95 transition-all cursor-pointer group"
            title="Open 360° Turning Controls"
          >
            <span className="text-base group-hover:rotate-180 transition-transform duration-500">🔄</span>
            <span>360° Turn</span>
          </button>
        )}
      </div>

      {/* Desktop Keyboard Controls Bar */}
      <div className="absolute bottom-2.5 left-6 z-20 hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-300 bg-black/80 px-4 py-1.5 rounded-full border border-emerald-900/60 backdrop-blur-md shadow-lg pointer-events-auto select-none">
        <span className="text-emerald-400 font-bold">KERALA CONTROLS:</span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">W A S D</span> {inVehicle ? 'Drive' : 'Walk'}
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">SPACE</span> Jump
        <span className="text-zinc-600">|</span>
        <button
          onClick={handle360Camera}
          className="px-2 py-0.5 rounded bg-sky-950 text-cyan-300 border border-cyan-500/50 hover:bg-sky-900 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          title="Panoramic 360 camera orbit"
        >
          <span className="text-xs">🔄</span> [3] 360° View
        </button>
        <span className="text-zinc-600">|</span>
        <button
          onClick={handle360Turn}
          className="px-2 py-0.5 rounded bg-teal-950 text-emerald-300 border border-emerald-500/50 hover:bg-teal-900 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          title="Turn 360 degrees on spot / donut"
        >
          <span className="text-xs">⚡</span> [Z] 360° Turn
        </button>
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">H</span> Air Horn
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-100 border border-zinc-500/40 font-bold">V</span>
        <span className="text-zinc-200">{inVehicle && vehicleType === 'bus' ? 'Exit Bus' : '🚌 Bus Mode'}</span>
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">F</span>
        <span className="text-emerald-300">
          {inVehicle && vehicleType === 'mustang' ? '🏎️ Exit Mustang' : inVehicle && vehicleType === 'auto' ? 'Exit Auto' : '🛺 Auto'}
        </span>
        <span className="text-zinc-600">|</span>
        {onOpenThattukada && (
          <>
            <button
              onClick={onOpenThattukada}
              className="px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-500/50 hover:bg-emerald-900 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>C</span> 🍵 തട്ടുകട (Menu)
            </button>
            <span className="text-zinc-600">|</span>
          </>
        )}
        {onOpenStadiumTicket && (
          <>
            <button
              onClick={onOpenStadiumTicket}
              className="px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-amber-400/50 hover:bg-emerald-900 transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>T</span> 🎫 Stadium Ticket (₹50)
            </button>
            <span className="text-zinc-600">|</span>
          </>
        )}
        {onOpenKSRTC && (
          <>
            <button
              onClick={onOpenKSRTC}
              className="px-2 py-0.5 rounded bg-red-950 text-amber-300 border border-red-500/50 hover:bg-red-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="font-bold">B</span> 🚌 Board KSRTC
            </button>
            <span className="text-zinc-600">|</span>
          </>
        )}
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">E</span> Talk
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">M</span> 🗺️ Big Map
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">U</span> 🎵 BGM Radio
      </div>

      {/* Mobile Touch Quick Controls Bar */}
      <div className="md:hidden absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto select-none">
        <div className="flex items-center gap-2">
          <button
            className="w-11 h-11 rounded-xl bg-black/80 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center justify-center shadow-lg active:scale-95"
            onClick={onInteract}
            title="Interact"
          >
            [E]
          </button>
          <button
            className="w-11 h-11 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-lg flex items-center justify-center shadow-lg active:scale-95"
            onClick={onHonk}
            title="Air Horn"
          >
            🎺
          </button>
          <button
            className="w-11 h-11 rounded-xl bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 text-base font-bold flex items-center justify-center shadow-lg active:scale-95"
            onClick={handle360Camera}
            title="360° Camera View"
          >
            🔄
          </button>
          <button
            className="w-11 h-11 rounded-xl bg-teal-950/90 border border-teal-400/60 text-teal-300 text-base font-bold flex items-center justify-center shadow-lg active:scale-95"
            onClick={handle360Turn}
            title="360° Donut Turn"
          >
            ⚡
          </button>
          {onOpenStadiumTicket && (
            <button
              className="px-2.5 h-11 rounded-xl bg-emerald-900/90 border border-amber-400/60 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 shadow-lg active:scale-95"
              onClick={onOpenStadiumTicket}
              title="Stadium Ticket (₹50)"
            >
              <span>🎫</span>
              <span className="font-mono">₹50</span>
            </button>
          )}
          {onOpenKSRTC && (
            <button
              className="px-3 h-11 rounded-xl bg-red-900/90 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center justify-center gap-1 shadow-lg active:scale-95"
              onClick={onOpenKSRTC}
              title="Board KSRTC"
            >
              <span>🚌</span>
              <span className="font-malayalam">ടിക്കറ്റ്</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onBusToggle && (
            <button
              className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 shadow-lg active:scale-95 ${
                inVehicle && vehicleType === 'bus'
                  ? 'bg-white text-black border-white'
                  : 'bg-zinc-900/90 border-zinc-500/60 text-zinc-100'
              }`}
              onClick={onBusToggle}
            >
              <span>🚌 {inVehicle && vehicleType === 'bus' ? 'Exit' : 'Bus'}</span>
            </button>
          )}

          <button
            className={`px-3 py-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1 shadow-lg active:scale-95 ${
              inVehicle && vehicleType === 'auto'
                ? 'bg-amber-400 text-black border-amber-300'
                : 'bg-emerald-900/80 border-emerald-400/50 text-emerald-200'
            }`}
            onClick={onAutoToggle}
          >
            <span>🛺 {inVehicle && vehicleType === 'auto' ? 'Exit' : 'Auto'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
