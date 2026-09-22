import React, { useState } from 'react';
import { RandomSceneEvent } from '../types';
import { soundSynth } from '../audio';

interface RandomSceneModalProps {
  event: RandomSceneEvent | null;
  onClose: () => void;
  onAddMoney: (amount: number) => void;
}

export function RandomSceneModal({ event, onClose, onAddMoney }: RandomSceneModalProps) {
  const [selectedReaction, setSelectedReaction] = useState<{
    reaction: string;
    malayalamReaction: string;
    reward?: number;
  } | null>(null);

  if (!event) return null;

  const handleChoice = (choice: (typeof event.choices)[0]) => {
    if (choice.sound) {
      soundSynth.playSound(choice.sound as Parameters<typeof soundSynth.playSound>[0]);
    }
    if (choice.reward) {
      onAddMoney(choice.reward);
    }
    setSelectedReaction({
      reaction: choice.reaction,
      malayalamReaction: choice.malayalamReaction,
      reward: choice.reward,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0a1f17] border-2 border-amber-400/60 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Decorative Top Accent Banner */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-black flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2 font-mono font-black text-xs tracking-wider uppercase">
            <span className="text-base animate-spin">🌴</span>
            <span>NAATTILE SCENE EVENT • നാട്ടിലെ സീൻ!</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 font-bold">
            {event.location}
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0 shadow-lg animate-bounce">
              {event.avatar}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-heading">
                {event.title}
              </h3>
              <p className="text-sm font-malayalam font-bold text-amber-300 mt-0.5">
                {event.malayalamTitle}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-emerald-900/60 space-y-1.5">
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">{event.desc}</p>
            <p className="text-xs text-amber-200/90 font-malayalam leading-relaxed">
              {event.malayalamDesc}
            </p>
          </div>

          {/* If a choice has been made, display the funny reaction */}
          {selectedReaction ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-400/60 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wide">
                  Scene Outcome (ഫലം)
                </span>
                {selectedReaction.reward && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-black font-mono font-black text-xs shadow">
                    +₹{selectedReaction.reward}
                  </span>
                )}
              </div>
              <p className="text-xs text-white font-medium">{selectedReaction.reaction}</p>
              <p className="text-xs text-amber-300 font-malayalam font-bold">
                {selectedReaction.malayalamReaction}
              </p>
              <button
                onClick={() => {
                  setSelectedReaction(null);
                  onClose();
                }}
                className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-black font-mono font-black text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Continue Adventure (യാത്ര തുടരുക)
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase font-bold tracking-wider">
                Choose your reaction (നിങ്ങൾ എന്ത് ചെയ്യും?):
              </span>
              {event.choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-3 rounded-xl bg-[#0e2c22] hover:bg-[#133d2f] border border-emerald-700/40 hover:border-amber-400/60 transition-all cursor-pointer active:scale-98 group flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-200">
                      {choice.text}
                    </div>
                    <div className="text-[11px] font-malayalam text-emerald-300/80 group-hover:text-emerald-200">
                      {choice.malayalamText}
                    </div>
                  </div>
                  {choice.reward && (
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold border border-amber-400/30">
                      +₹{choice.reward}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
