import React from 'react';

interface ControlsHUDProps {
  onHonk: () => void;
  onAutoToggle: () => void;
  onInteract: () => void;
  onOpenKSRTC?: () => void;
  onOpenStadiumTicket?: () => void;
  inVehicle: boolean;
}

export function ControlsHUD({
  onHonk,
  onAutoToggle,
  onInteract,
  onOpenKSRTC,
  onOpenStadiumTicket,
  inVehicle,
}: ControlsHUDProps) {
  return (
    <>
      {/* Desktop Keyboard Controls Bar */}
      <div className="absolute bottom-2.5 left-6 z-20 hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-300 bg-black/75 px-4 py-1.5 rounded-full border border-emerald-900/60 backdrop-blur-md shadow-lg pointer-events-auto select-none">
        <span className="text-emerald-400 font-bold">KERALA CONTROLS:</span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">W A S D</span> Walk
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200">SPACE</span> Jump
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">H</span> Air Horn
        <span className="text-zinc-600">|</span>
        <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">F</span> {inVehicle ? 'Exit Auto' : 'Auto'}
        <span className="text-zinc-600">|</span>
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

        <button
          className="px-3.5 py-2.5 rounded-xl bg-emerald-900/80 border border-emerald-400/50 text-emerald-200 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg active:scale-95"
          onClick={onAutoToggle}
        >
          <span>🛺 {inVehicle ? 'Exit' : 'Auto'}</span>
        </button>
      </div>
    </>
  );
}
