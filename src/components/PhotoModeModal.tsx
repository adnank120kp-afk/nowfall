import React, { useState } from 'react';
import { soundSynth } from '../audio';

interface PhotoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onZoomChange?: (zoom: number) => void;
  onFilterChange?: (filter: string) => void;
}

export function PhotoModeModal({
  isOpen,
  onClose,
  onZoomChange,
  onFilterChange,
}: PhotoModeModalProps) {
  const [activeFilter, setActiveFilter] = useState<'normal' | 'monsoon' | 'golden' | 'vintage'>('normal');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [capturedNotice, setCapturedNotice] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleFilterSelect = (filter: 'normal' | 'monsoon' | 'golden' | 'vintage') => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
    soundSynth.playSound('bell');
  };

  const handleZoom = (val: number) => {
    setZoomLevel(val);
    onZoomChange?.(val);
  };

  const handleCapture = () => {
    soundSynth.playSound('shutter');
    setCapturedNotice(true);

    // Capture WebGL canvas to download link
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        const link = document.createElement('a');
        link.download = `naattile-scene-kerala-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    } catch {
      // ignore cross-origin if any
    }

    setTimeout(() => setCapturedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto flex flex-col justify-between p-4 sm:p-6 select-none bg-black/20">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-black/75 backdrop-blur-md border border-emerald-500/40 text-white shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-xl animate-pulse">📸</span>
          <div>
            <h3 className="text-xs sm:text-sm font-bold font-heading uppercase tracking-wider text-amber-300">
              PHOTO MODE • ഫോട്ടോ മോഡ്
            </h3>
            <p className="text-[10px] text-zinc-300 font-mono">
              Capture Kerala scenery, vehicles, and village memories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
              showGrid
                ? 'bg-amber-500 text-black border-amber-300'
                : 'bg-zinc-800/80 text-zinc-300 border-zinc-600'
            }`}
          >
            # Grid
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-red-900/70 hover:bg-red-800 text-white flex items-center justify-center font-bold text-sm border border-red-500/50 cursor-pointer"
            title="Exit Photo Mode"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Center Viewfinder Overlays (Grid lines & Watermark) */}
      <div className="relative flex-1 pointer-events-none flex flex-col justify-between my-2">
        {/* Rule-of-thirds grid */}
        {showGrid && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 border border-white/10 opacity-30">
            <div className="border-r border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-r border-b border-white/25"></div>
            <div className="border-b border-white/25"></div>
            <div className="border-r border-white/25"></div>
            <div className="border-r border-white/25"></div>
            <div></div>
          </div>
        )}

        {/* Center Focus Reticle */}
        <div className="m-auto w-16 h-16 border border-amber-400/50 rounded-full flex items-center justify-center pointer-events-none opacity-40">
          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
        </div>

        {/* Kerala Stamp Watermark in bottom right */}
        <div className="self-end mr-6 mb-4 px-3 py-1.5 rounded-xl bg-black/60 border border-white/20 text-right backdrop-blur-sm">
          <div className="text-[10px] font-mono tracking-widest text-emerald-300 font-black uppercase">
            NAATTILE SCENE 🌴
          </div>
          <div className="text-[9px] font-malayalam text-amber-300">
            കിഴക്കുംപുറം വില്ലേജ് • KERALA 2026
          </div>
        </div>

        {/* Shutter flash feedback notification */}
        {capturedNotice && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl bg-amber-500 text-black font-mono font-black text-sm shadow-2xl animate-bounce flex items-center gap-2">
            <span>📸</span>
            <span>PHOTO SAVED! (ഫോട്ടോ സേവ് ചെയ്തു)</span>
          </div>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-md border border-emerald-500/40 shadow-2xl">
        {/* Cinematic Filters */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-zinc-400 uppercase mr-1">Filter:</span>
          {[
            { key: 'normal', label: 'Natural', icon: '☀️' },
            { key: 'monsoon', label: 'Monsoon Teal', icon: '🌧️' },
            { key: 'golden', label: 'Golden Hour', icon: '🌅' },
            { key: 'vintage', label: 'Vintage 90s', icon: '🎞️' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilterSelect(f.key as typeof activeFilter)}
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                activeFilter === f.key
                  ? 'bg-emerald-500 text-black border border-emerald-300 shadow'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Zoom Slider */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
          <span>Zoom:</span>
          <input
            type="range"
            min="0.7"
            max="2.2"
            step="0.1"
            value={zoomLevel}
            onChange={(e) => handleZoom(parseFloat(e.target.value))}
            className="w-24 accent-amber-400 cursor-pointer"
          />
          <span className="w-8 text-amber-300 font-bold">{zoomLevel.toFixed(1)}x</span>
        </div>

        {/* Big Shutter Button */}
        <button
          onClick={handleCapture}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-mono font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
        >
          <span className="text-lg">🔘</span>
          <span>SNAP PHOTO</span>
        </button>
      </div>
    </div>
  );
}
