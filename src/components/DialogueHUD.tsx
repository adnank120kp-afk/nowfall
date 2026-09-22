import React from 'react';
import { NPCEntity } from '../types';

interface DialogueHUDProps {
  dialogue: NPCEntity | null;
  onNext: () => void;
  onDriveAuto: () => void;
  onDismiss: () => void;
  onOpenStadiumTicket?: () => void;
}

export function DialogueHUD({ dialogue, onNext, onDriveAuto, onDismiss, onOpenStadiumTicket }: DialogueHUDProps) {
  if (!dialogue) return null;

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-40 w-[720px] max-w-[94vw] pointer-events-auto transition-all duration-300 select-none animate-subtle-bob">
      <div className="hud-panel p-4 rounded-2xl border-2 border-emerald-400/50 shadow-2xl flex items-start gap-4">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-tr from-amber-600 to-emerald-700 p-0.5 shadow-md flex-shrink-0">
          <div className="w-full h-full bg-[#091a13] rounded-[10px] flex items-center justify-center text-3xl">
            {dialogue.avatar}
          </div>
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-amber-400 text-black font-mono font-black text-[9px] uppercase tracking-wider">
            {dialogue.tag}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-extrabold text-sm sm:text-base text-amber-200">
              {dialogue.name}
            </h4>
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline-block">
              [E] Interact • [SPACE] Talk
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-100 mt-1.5 font-malayalam leading-relaxed">
            {dialogue.dialogue}
          </p>

          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {(dialogue.tag === 'TICKET' || dialogue.tag === 'SEVENS' || dialogue.id === 'ticket_koya') && onOpenStadiumTicket && (
              <button
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
                onClick={onOpenStadiumTicket}
              >
                <span>🎫 ടിക്കറ്റ് കൗണ്ടർ • BUY TICKET (₹50)</span>
              </button>
            )}
            <button
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
              onClick={onNext}
            >
              <span>Continue (സംസാരിക്കുക)</span>
              <span className="text-[10px] font-mono bg-black/20 px-1 rounded">SPACE</span>
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-[#0f5132] border border-emerald-700/50 text-emerald-200 text-xs transition-colors cursor-pointer active:scale-95"
              onClick={onDriveAuto}
            >
              Drive Babu's Auto [F] 🛺
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-black/50 hover:bg-black/70 text-zinc-400 hover:text-zinc-200 text-xs ml-auto transition-colors cursor-pointer"
              onClick={onDismiss}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
