import React from 'react';
import { Mission, WaypointDestination } from '../types';
import { soundSynth } from '../audio';

interface MissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: Mission[];
  activeMission: Mission | null;
  onStartMission: (missionId: string) => void;
  onCancelMission: () => void;
  onSetWaypoint: (wp: WaypointDestination) => void;
}

export function MissionsModal({
  isOpen,
  onClose,
  missions,
  activeMission,
  onStartMission,
  onCancelMission,
  onSetWaypoint,
}: MissionsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#091a13] border border-emerald-500/40 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-emerald-800/40 bg-gradient-to-r from-emerald-950 via-[#0a231b] to-emerald-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
              🎯
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-heading tracking-wide text-white flex items-center gap-2">
                <span>NAATTILE MISSIONS</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                  നാട്ടിലെ മിഷനുകൾ
                </span>
              </h2>
              <p className="text-[11px] text-emerald-300/80 font-mono">
                Explore Kizhakkumpuram, complete local errands, earn ₹ rupees
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-sm font-bold active:scale-95 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Active Mission Banner (if any) */}
          {activeMission && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/60 to-emerald-950/80 border border-amber-400/50 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">{activeMission.icon}</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                      ACTIVE MISSION (നടന്നുകൊണ്ടിരിക്കുന്നു)
                    </span>
                    <h3 className="text-sm font-bold text-white font-malayalam">
                      {activeMission.malayalamTitle}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-mono font-black text-xs">
                    ₹{activeMission.reward}
                  </span>
                  <button
                    onClick={() => {
                      soundSynth.playSound('whistle');
                      onCancelMission();
                    }}
                    className="px-2 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-500/40 text-[10px] font-mono font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-300 mb-3">{activeMission.desc}</p>

              {/* Steps list */}
              <div className="space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-emerald-900/50">
                {activeMission.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className={`flex items-start justify-between text-xs p-1.5 rounded-lg ${
                      step.isDone
                        ? 'text-emerald-400 line-through opacity-70 bg-emerald-950/30'
                        : idx === activeMission.currentStepIndex
                        ? 'text-amber-200 bg-amber-950/40 font-bold border border-amber-500/30'
                        : 'text-zinc-400'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span>{step.isDone ? '✅' : idx === activeMission.currentStepIndex ? '👉' : '⏳'}</span>
                      <div>
                        <div>{step.desc}</div>
                        <div className="text-[10px] font-malayalam opacity-80">{step.malayalamDesc}</div>
                      </div>
                    </div>
                    {step.targetCoords && !step.isDone && idx === activeMission.currentStepIndex && (
                      <button
                        onClick={() => {
                          soundSynth.playSound('bell');
                          onSetWaypoint({
                            id: `step_${step.id}`,
                            name: `GPS: ${step.desc.slice(0, 24)}...`,
                            malayalamName: step.malayalamDesc,
                            icon: '📍',
                            coords: step.targetCoords!,
                            category: 'Mission',
                          });
                          onClose();
                        }}
                        className="shrink-0 px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-mono font-bold shadow"
                        title="Plot GPS Waypoint"
                      >
                        📍 GPS
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mission List */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>Available Missions ({missions.length})</span>
              <span className="text-[10px] text-zinc-400 font-normal">Select a story mission to embark</span>
            </h3>

            {missions.map((mission) => {
              const isCurrActive = activeMission?.id === mission.id;
              return (
                <div
                  key={mission.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                    isCurrActive
                      ? 'bg-amber-950/30 border-amber-400/50'
                      : mission.isCompleted
                      ? 'bg-emerald-950/20 border-emerald-600/30 opacity-80'
                      : 'bg-[#0b221a]/90 hover:bg-[#0e2c22] border-emerald-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-black/40 border border-emerald-900/60 shadow">
                        {mission.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-heading">
                            {mission.title}
                          </h4>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-300 font-mono border border-emerald-500/30">
                            {mission.category}
                          </span>
                        </div>
                        <p className="text-xs font-malayalam text-amber-300/90 font-medium mt-0.5">
                          {mission.malayalamTitle}
                        </p>
                        <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                          {mission.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-black font-mono font-black text-xs shadow-md">
                        ₹{mission.reward}
                      </span>

                      {mission.isCompleted ? (
                        <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                          <span>✅</span> Completed
                        </span>
                      ) : isCurrActive ? (
                        <span className="text-xs font-mono font-bold text-amber-300 animate-pulse">
                          In Progress...
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            soundSynth.playSound('bell');
                            onStartMission(mission.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black font-mono font-black text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
                        >
                          Start Mission
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-emerald-800/40 bg-[#06140e] flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>നല്ലൊരു യാത്ര ആശംസിക്കുന്നു!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/30 font-bold cursor-pointer"
          >
            Close [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
