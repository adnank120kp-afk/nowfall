import React, { useState } from 'react';
import { soundSynth } from '../audio';

interface StadiumTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: number;
  hasTicket: boolean;
  onPurchaseTicket: () => boolean; // returns true if purchase successful
  onEnterStadium?: () => void;
}

export function StadiumTicketModal({
  isOpen,
  onClose,
  wallet,
  hasTicket,
  onPurchaseTicket,
  onEnterStadium,
}: StadiumTicketModalProps) {
  const [justPurchased, setJustPurchased] = useState(false);
  const [ticketSerial] = useState(() => `KZP-SEVENS-${Math.floor(1000 + Math.random() * 9000)}`);
  const [purchaseTime, setPurchaseTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  if (!isOpen) return null;

  const handleBuy = () => {
    if (wallet < 50) {
      soundSynth.playSound('autohorn');
      return;
    }

    const ok = onPurchaseTicket();
    if (ok) {
      soundSynth.playSound('ticket');
      soundSynth.playSound('whistle');
      setJustPurchased(true);
      const d = new Date();
      setPurchaseTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleEnter = () => {
    soundSynth.playSound('whistle');
    onClose();
    if (onEnterStadium) {
      onEnterStadium();
    }
  };

  const canAfford = wallet >= 50;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-[#0a2318] via-[#05160e] to-[#020b07] border-2 border-amber-400/60 shadow-2xl overflow-hidden flex flex-col">
        {/* Stadium Floodlight Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-emerald-500/20 blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="relative flex items-center justify-between px-6 py-4 border-b border-emerald-500/30 bg-[#061e14]/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-2xl shadow-inner">
              🎫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-white text-base sm:text-lg tracking-wide">
                  Sevens Stadium Ticket Counter
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/50">
                  ₹50 ENTRY
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 font-malayalam">
                കിഴക്കുംപുറം സെവൻസ് ഫുട്ബോൾ സ്റ്റേഡിയം • ടിക്കറ്റ് കൗണ്ടർ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center font-bold text-sm border border-zinc-600/50 cursor-pointer active:scale-95 transition-all"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Authentic Kerala Sevens Football Match Ticket */}
          <div className="relative rounded-2xl bg-gradient-to-r from-[#0d3b25] via-[#0a311f] to-[#082619] border-2 border-amber-400/80 p-5 shadow-2xl text-white overflow-hidden">
            {/* Ticket Decorative Notches */}
            <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#05160e] border border-amber-400/60" />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-[#05160e] border border-amber-400/60" />

            {/* Ticket Watermark */}
            <div className="absolute right-4 bottom-2 text-7xl opacity-10 pointer-events-none select-none">
              ⚽
            </div>

            {/* Ticket Top Ribbon */}
            <div className="flex items-center justify-between border-b border-amber-400/30 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase block">
                  ALL KERALA FLOODLIT SEVENS LEAGUE 2026
                </span>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-white">
                  KIZHAKKUMPURAM SEVENS CUP
                </h4>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-emerald-300 block">ADMIT ONE</span>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-extrabold text-xs font-mono">
                  ₹50.00
                </span>
              </div>
            </div>

            {/* Match Teams Faceoff */}
            <div className="bg-black/40 rounded-xl p-3 border border-emerald-500/30 flex items-center justify-between gap-2">
              <div className="flex-1 text-center">
                <span className="text-[10px] font-mono text-emerald-300 uppercase block">HOME TEAM</span>
                <span className="font-extrabold text-xs sm:text-sm text-yellow-300 font-heading block">
                  Kizhakkumpuram FC
                </span>
                <span className="text-[10px] text-zinc-300 font-malayalam">കിഴക്കുംപുറം എഫ്.സി</span>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-red-900/80 border border-red-500/50 text-[11px] font-mono font-black text-amber-300 flex-shrink-0 animate-pulse">
                VS
              </div>

              <div className="flex-1 text-center">
                <span className="text-[10px] font-mono text-emerald-300 uppercase block">AWAY TEAM</span>
                <span className="font-extrabold text-xs sm:text-sm text-sky-300 font-heading block">
                  Malappuram Sevens
                </span>
                <span className="text-[10px] text-zinc-300 font-malayalam">മലപ്പുറം സെവൻസ്</span>
              </div>
            </div>

            {/* Match Information Rows */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-2 text-[11px] font-mono text-zinc-200">
              <div className="bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                <span className="text-[9px] text-emerald-400 block uppercase">VENUE</span>
                <span className="font-bold text-white text-[10px]">Town Stadium</span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                <span className="text-[9px] text-emerald-400 block uppercase">TIME</span>
                <span className="font-bold text-amber-300 text-[10px]">8:30 PM (Night)</span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                <span className="text-[9px] text-emerald-400 block uppercase">STAND</span>
                <span className="font-bold text-white text-[10px]">East Gallery</span>
              </div>
              <div className="bg-black/30 p-2 rounded-lg border border-emerald-500/20">
                <span className="text-[9px] text-emerald-400 block uppercase">SERIAL NO</span>
                <span className="font-bold text-amber-400 text-[10px]">{ticketSerial}</span>
              </div>
            </div>

            {/* Ticket Status Bar & Barcode */}
            <div className="mt-4 pt-3 border-t border-dashed border-amber-400/40 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {hasTicket || justPurchased ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-black font-extrabold text-xs font-mono flex items-center gap-1 shadow-lg">
                    <span>✓</span> VALID MATCH PASS
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 font-mono text-xs font-bold flex items-center gap-1">
                    <span>⏳</span> UNPAID • ₹50 ENTRY
                  </span>
                )}
                <span className="text-[10px] font-mono text-zinc-400">
                  {hasTicket || justPurchased ? `Issued at ${purchaseTime}` : 'Pay at counter'}
                </span>
              </div>

              {/* Barcode Visual */}
              <div className="flex items-center gap-0.5 bg-white/90 px-2 py-1 rounded">
                {[4, 2, 6, 2, 4, 3, 5, 2, 4, 2, 7, 3, 2, 5, 3].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-black inline-block"
                    style={{ height: `${h * 2 + 10}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Ticket Vendor Dialogue */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-emerald-600/30">
            <div className="text-3xl p-2 rounded-xl bg-amber-950/80 border border-amber-500/30 flex-shrink-0">
              👳‍♂️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xs text-amber-300">
                  Koya (ടിക്കറ്റ് കോയ)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Stadium Ticket Collector</span>
              </div>
              <p className="text-xs text-zinc-200 font-malayalam leading-relaxed mt-1">
                {hasTicket || justPurchased
                  ? '“ടിക്കറ്റ് കിട്ടിയല്ലോ ഉണ്ണീ! ഗാലറി നിറഞ്ഞു കവിയുകയാണ്! വേഗം പോയി ഫ്രണ്ട് റോയിൽ ഇരിപ്പിടം പിടിച്ചോളൂ! പന്ത് മൈതാനത്തുണ്ട്, ഒരു വെടിക്കെട്ട് ഗോൾ അടിക്കൂ!”'
                  : '“നമസ്കാരം! അഖിലേന്ത്യാ സെവൻസ് ടൂർണമെന്റിലേക്ക് സ്വാഗതം! പ്രവേശന ഫീസ് വെറും ₹50 രൂപ മാത്രം. ടിക്കറ്റ് എടുത്ത് ഗാലറിയിലേക്ക് കയറാം!”'}
              </p>
            </div>
          </div>

          {/* Wallet Balance & Purchase Controls */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#072015] border border-emerald-500/40">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400">YOUR WALLET BALANCE</span>
              <span className="text-base sm:text-lg font-mono font-bold text-emerald-300">
                ₹{wallet}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hasTicket || justPurchased ? (
                <button
                  onClick={handleEnter}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-xl active:scale-95 cursor-pointer transition-all"
                >
                  <span>🏟️ Enter Stadium (പ്രവേശിക്കുക)</span>
                  <span>➜</span>
                </button>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={!canAfford}
                  className={`py-2.5 px-5 rounded-xl font-extrabold text-xs sm:text-sm font-mono flex items-center gap-2 shadow-xl active:scale-95 cursor-pointer transition-all ${
                    canAfford
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black shadow-amber-500/20'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                  }`}
                >
                  <span>🎫 ടിക്കറ്റ് എടുക്കുക • BUY TICKET</span>
                  <span className="bg-black/20 px-1.5 py-0.5 rounded text-xs">₹50</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
