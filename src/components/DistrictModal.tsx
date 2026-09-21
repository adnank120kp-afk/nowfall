import React, { useState } from 'react';

interface DistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDistrict: string;
  onSelectDistrict: (district: string) => void;
}

const DISTRICTS = [
  { id: 'Kozhikode', name: 'Kozhikode • കോഴിക്കോട്', desc: 'Famous for Halwa, Mittai Theruvu & warm hospitality' },
  { id: 'Malappuram', name: 'Malappuram • മലപ്പുറം', desc: 'Heart of Sevens Football, rich history & scenic hills' },
  { id: 'Thrissur', name: 'Thrissur • തൃശൂർ', desc: 'Cultural Capital of Kerala, Pooram & Vadakkumnathan' },
  { id: 'Ernakulam', name: 'Ernakulam • എറണാകുളം', desc: 'Cochin port, Chinese fishing nets & modern hub' },
  { id: 'Alappuzha', name: 'Alappuzha • ആലപ്പുഴ', desc: 'Venice of the East, Backwaters & Houseboats' },
  { id: 'Thiruvananthapuram', name: 'Thiruvananthapuram • തിരുവനന്തപുരം', desc: 'Capital city, Padmanabhaswamy Temple & Kovalam' },
  { id: 'Kannur', name: 'Kannur • കണ്ണൂർ', desc: 'Land of Looms, Lores & Theyyam rituals' },
  { id: 'Wayanad', name: 'Wayanad • വയനാട്', desc: 'Misty hills, tea plantations & Western Ghats' },
];

export function DistrictModal({
  isOpen,
  onClose,
  currentDistrict,
  onSelectDistrict,
}: DistrictModalProps) {
  const [selected, setSelected] = useState(currentDistrict);

  if (!isOpen) return null;

  function handleConfirm() {
    onSelectDistrict(selected);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="relative max-w-md w-full bg-[#0d1e17] border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl flex flex-col">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl">
            🌴
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-extrabold text-white text-xl">
              ഇത് കേരളമാണ്! Choose District
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Explore authentic Kerala village life in 3D.
            </p>
          </div>
          <button
            className="w-7 h-7 rounded-full bg-black/50 hover:bg-emerald-400 hover:text-black text-zinc-400 flex items-center justify-center text-xs transition-colors cursor-pointer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-emerald-200 mb-1.5 font-mono">
            Select District • <span className="font-malayalam">നിങ്ങളുടെ ജില്ല</span>
          </label>
          <select
            className="w-full bg-[#08150f] border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 font-mono cursor-pointer"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Selected district snippet */}
          <div className="mt-2.5 p-2 rounded-lg bg-black/40 border border-emerald-900/50 text-xs text-zinc-300 font-mono">
            {DISTRICTS.find((d) => d.id === selected)?.desc}
          </div>
        </div>

        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
          onClick={handleConfirm}
        >
          Explore Kizhakkumpuram 🌴
        </button>
      </div>
    </div>
  );
}
