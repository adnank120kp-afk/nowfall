import React, { useState } from 'react';
import { KERALA_14_DISTRICTS, DistrictInfo } from './BigMapBuilder';

interface BigMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFastTravel: (coords: { x: number; z: number }, districtName: string) => void;
  playerPos?: { x: number; z: number };
}

export function BigMapModal({ isOpen, onClose, onFastTravel, playerPos }: BigMapModalProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>(KERALA_14_DISTRICTS[7]); // default Ernakulam / Town Center
  const [filterRegion, setFilterRegion] = useState<'ALL' | 'North' | 'Central' | 'South' | 'High Range'>('ALL');

  if (!isOpen) return null;

  const filteredDistricts = filterRegion === 'ALL'
    ? KERALA_14_DISTRICTS
    : KERALA_14_DISTRICTS.filter(d => d.category === filterRegion);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="relative max-w-4xl w-full max-h-[92vh] bg-[#07150e] border-2 border-emerald-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-emerald-800/60 bg-[#0c2419] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-wide text-emerald-300 uppercase">
                  NAATTILE SCENE — KERALA MEGA MAP (14 DISTRICTS)
                </h2>
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-extrabold uppercase">
                  14 Districts
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans">
                Full Kerala geography from Kasaragod in the North to Thiruvananthapuram in the South • Western Ghats &amp; Arabian Sea.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-emerald-500 hover:text-black border border-emerald-700/60 flex items-center justify-center text-sm font-bold text-zinc-300 transition-colors cursor-pointer"
            title="Close Big Map"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Split between Interactive ASCII / Diagram Map & 14 Districts Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. ASCII Map Schematic with Live Interactive Hotspots */}
          <div className="bg-[#030d08] border border-emerald-500/40 rounded-2xl p-3 sm:p-4 text-emerald-400 text-[11px] sm:text-xs overflow-x-auto shadow-inner">
            <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider mb-2 flex items-center justify-between">
              <span>🗺️ Kerala Open-World Arterial Highway Blueprint</span>
              <span className="text-amber-300 font-mono">NORTH ▲ | ▼ SOUTH</span>
            </div>

            {/* Visual ASCII Map Diagram */}
            <pre className="font-mono leading-relaxed text-zinc-300 select-text">
{`                         NORTH
                           ↑
      🏔️ WESTERN GHATS / FOREST
      ╔═══════════════════════════════════════════════════════╗
      ║  🌲  ⛰️  🌲  🐘  ⛰️  🌲  (Highland Forest Range)       ║
      ║                                                       ║
      ║  [01] KASARAGOD ───────── [02] KANNUR                 ║
      ║         │                       │                     ║
SEA ← ║         │                [03] KOZHIKODE               ║ → GHATS
      ║         │                       │                     ║
      ║  [05] MALAPPURAM ──────── [04] WAYANAD (Ghats)        ║
      ║         │                       │                     ║
      ║  [06] PALAKKAD ────────── [07] THRISSUR (Pooram)      ║
      ║                 │               │                     ║
      ║             [08] ERNAKULAM ─ [09] IDUKKI (Arch Dam)   ║
      ║                 │               │                     ║
      ║             [10] KOTTAYAM ──────┘                     ║
      ║                 │                                     ║
      ║             [11] ALAPPUZHA ── Backwaters & Houseboat  ║
      ║                 │                                     ║
      ║             [12] PATHANAMTHITTA ── [13] KOLLAM Port   ║
      ║                 │                                     ║
      ║             [14] THIRUVANANTHAPURAM (Capital Coast)   ║
      ╚═══════════════════════════════════════════════════════╝
                           ↓
                         SOUTH`}
            </pre>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-zinc-400 uppercase font-bold mr-1">Region Filter:</span>
            {(['ALL', 'North', 'Central', 'South', 'High Range'] as const).map(reg => (
              <button
                key={reg}
                onClick={() => setFilterRegion(reg)}
                className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                  filterRegion === reg
                    ? 'bg-emerald-500 text-black'
                    : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60'
                }`}
              >
                {reg} {reg === 'ALL' ? '(14)' : ''}
              </button>
            ))}
          </div>

          {/* 2. 14 Major Districts Card Selection Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Select District to Fast-Travel
              </span>
              <span className="text-[11px] text-zinc-400">Click any district to inspect and teleport</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {filteredDistricts.map((d) => {
                const isSelected = selectedDistrict.id === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDistrict(d)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                        : 'bg-[#081a11]/90 border-emerald-900/60 hover:bg-[#0c2619] hover:border-emerald-700/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-1.5 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{d.icon}</span>
                          <div>
                            <div className="text-xs font-black text-white">{d.name}</div>
                            <div className="text-[10px] text-emerald-300 font-sans font-medium">{d.malayalamName}</div>
                          </div>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-zinc-400 border border-zinc-700/50 whitespace-nowrap">
                          {d.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-300 font-sans line-clamp-2 mt-1 leading-relaxed">
                        {d.desc}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-emerald-900/50 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-400 font-mono text-[9px]">
                        X:{d.coords.x} Z:{d.coords.z}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onFastTravel(d.coords, d.name);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-[10px] tracking-wider uppercase transition-colors shadow cursor-pointer active:scale-95"
                      >
                        Visit Now ➔
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Selected District Quick Action Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#062013] to-emerald-950 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-xl bg-black/40 border border-emerald-700/50">
                {selectedDistrict.icon}
              </div>
              <div>
                <div className="text-xs text-amber-300 font-bold uppercase">Selected Destination</div>
                <div className="text-sm font-black text-white">{selectedDistrict.name} ({selectedDistrict.malayalamName})</div>
                <div className="text-xs text-zinc-300 font-sans">{selectedDistrict.desc}</div>
              </div>
            </div>

            <button
              onClick={() => {
                onFastTravel(selectedDistrict.coords, selectedDistrict.name);
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              Teleport to {selectedDistrict.name} 🌴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
