import React, { useState } from 'react';
import { KERALA_14_DISTRICTS, DistrictInfo } from './BigMapBuilder';

interface DistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: string;
  onSelectDistrict: (district: string) => void;
  onFastTravel?: (coords: { x: number; z: number }, districtName: string) => void;
}

export function DistrictModal({
  isOpen,
  onClose,
  currentDistrict,
  onSelectDistrict,
  onFastTravel,
}: DistrictModalProps) {
  const [selectedId, setSelectedId] = useState<string>(() => {
    const found = KERALA_14_DISTRICTS.find(d => d.name.toLowerCase().includes(currentDistrict.toLowerCase()) || d.id.toLowerCase() === currentDistrict.toLowerCase());
    return found ? found.id : KERALA_14_DISTRICTS[2].id; // Kozhikode default
  });

  const [activeCategory, setActiveCategory] = useState<'ALL' | 'North' | 'Central' | 'South' | 'High Range'>('ALL');

  if (!isOpen) return null;

  const currentDistObj = KERALA_14_DISTRICTS.find(d => d.id === selectedId) || KERALA_14_DISTRICTS[0];

  const filteredDistricts = activeCategory === 'ALL'
    ? KERALA_14_DISTRICTS
    : KERALA_14_DISTRICTS.filter(d => d.category === activeCategory);

  function handleConfirm() {
    onSelectDistrict(currentDistObj.name);
    if (onFastTravel) {
      onFastTravel(currentDistObj.coords, currentDistObj.name);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="relative max-w-2xl w-full max-h-[92vh] bg-[#091b13] border-2 border-emerald-500/70 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden text-white font-mono">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-emerald-800/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl border border-emerald-500/40 shrink-0">
              🌴
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-white text-base sm:text-lg">
                  ഇത് കേരളമാണ്! Kerala Mega Map (14 Districts)
                </h3>
                <span className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded-full font-extrabold uppercase">
                  14 Districts
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Kasaragod in the North → Thiruvananthapuram in the South
              </p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-emerald-400 hover:text-black text-zinc-400 flex items-center justify-center text-sm transition-colors cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-3 pb-1 flex-wrap">
          <span className="text-[10px] text-zinc-400 uppercase font-bold mr-1">Region:</span>
          {(['ALL', 'North', 'Central', 'South', 'High Range'] as const).map(reg => (
            <button
              key={reg}
              onClick={() => setActiveCategory(reg)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                activeCategory === reg
                  ? 'bg-emerald-500 text-black'
                  : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60'
              }`}
            >
              {reg} {reg === 'ALL' ? '(14)' : ''}
            </button>
          ))}
        </div>

        {/* Districts Scrollable List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-2 pr-1 my-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredDistricts.map((d) => {
              const isSelected = d.id === selectedId;
              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedId(d.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-emerald-900/60 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-black/40 border-emerald-900/50 hover:bg-emerald-950/40 hover:border-emerald-700/60'
                  }`}
                >
                  <span className="text-2xl shrink-0 p-1 rounded-lg bg-black/40">{d.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="text-xs font-bold text-white truncate">{d.name}</div>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/60 text-zinc-400 border border-zinc-700/50">
                        {d.category}
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-300 font-sans truncate">{d.malayalamName}</div>
                    <p className="text-[10px] text-zinc-400 font-sans line-clamp-1 mt-0.5">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected District Highlight Card */}
        <div className="p-3 rounded-2xl bg-black/50 border border-emerald-500/40 flex items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0">{currentDistObj.icon}</span>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-amber-300 truncate">
                {currentDistObj.name} ({currentDistObj.malayalamName})
              </div>
              <div className="text-[10px] text-zinc-300 font-sans line-clamp-1">
                {currentDistObj.desc}
              </div>
              <div className="text-[9px] text-emerald-400 font-mono mt-0.5">
                Coordinates: X:{currentDistObj.coords.x}, Z:{currentDistObj.coords.z} • {currentDistObj.category} Region
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 hover:from-amber-300 hover:to-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          onClick={handleConfirm}
        >
          <span>Travel to {currentDistObj.name.split('—')[0]} 🌴</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
}
