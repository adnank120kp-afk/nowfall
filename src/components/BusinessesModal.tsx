import React, { useState } from 'react';
import { BusinessItem, PlayerOutfit, VehicleType } from '../types';
import { KERALA_BUSINESS_CATALOG } from './BusinessesData';
import { soundSynth } from '../audio';

interface BusinessesModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: number;
  onDeductMoney: (amount: number) => boolean;
  onRefuelVehicle: () => void;
  onRepairVehicle: () => void;
  playerOutfit: PlayerOutfit;
  onChangeOutfit: (outfit: PlayerOutfit) => void;
  vehicleType?: VehicleType;
}

export function BusinessesModal({
  isOpen,
  onClose,
  wallet,
  onDeductMoney,
  onRefuelVehicle,
  onRepairVehicle,
  playerOutfit,
  onChangeOutfit,
}: BusinessesModalProps) {
  const [activeTab, setActiveTab] = useState<'chaya' | 'fuel' | 'workshop' | 'outfit' | 'house'>('chaya');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePurchase = (item: BusinessItem) => {
    if (wallet < item.price) {
      soundSynth.playSound('autohorn');
      showNotice('കാശില്ല ചേട്ടാ! കുറച്ചു പൈസ ഉണ്ടാക്കൂ! (Insufficient ₹)');
      return;
    }

    if (!onDeductMoney(item.price)) {
      return;
    }

    soundSynth.playSound('coin');

    if (item.category === 'chaya') {
      soundSynth.playSound('teaglass');
      showNotice(`രുചിയൂറും ${item.malayalamName} കഴിച്ചു! ആരോഗ്യം കൂടി!`);
    } else if (item.category === 'fuel') {
      soundSynth.playSound('refuel');
      onRefuelVehicle();
      showNotice(`വണ്ടിയിൽ ഫുൾ ടാങ്ക് പെട്രോൾ അടിച്ചു! (Vehicle 100% Fueled)`);
    } else if (item.category === 'workshop') {
      if (item.id === 'workshop_airhorn_tune') {
        soundSynth.playSound('airhorn');
        showNotice(`പുതിയ മ്യൂസിക്കൽ എയർ ഹോൺ ഫിറ്റ് ചെയ്തു! [H]`);
      } else {
        onRepairVehicle();
        showNotice(`വണ്ടി ഡെന്റിംഗ് പൂർത്തിയായി, പുത്തൻ കണ്ടീഷൻ! (100% Repaired)`);
      }
    } else if (item.category === 'outfit') {
      if (item.id === 'outfit_kasavu') onChangeOutfit('kasavu');
      else if (item.id === 'outfit_driver') onChangeOutfit('driver');
      else if (item.id === 'outfit_sevens') onChangeOutfit('sevens');
      showNotice(`പുതിയ വേഷം ധരിച്ചു: ${item.malayalamName}!`);
    } else if (item.category === 'house') {
      showNotice(`വീട്ടിലേക്ക് ${item.malayalamName} വാങ്ങി വെച്ചു!`);
    }
  };

  const filteredItems = KERALA_BUSINESS_CATALOG.filter((item) => item.category === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-[#081a13] border border-emerald-500/40 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-emerald-800/40 bg-gradient-to-r from-[#061e16] via-[#0d2d22] to-[#061e16]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shadow-inner">
              🏪
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-heading tracking-wide text-white flex items-center gap-2">
                <span>VILLAGE BAZAAR &amp; SHOPS</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                  ചന്തയും കടകളും
                </span>
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300/80 font-mono">
                <span>Wallet Balance:</span>
                <span className="text-amber-300 font-bold font-mono">₹{wallet}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-sm font-bold active:scale-95 transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-2 px-4 sm:px-6 bg-[#05140e] border-b border-emerald-900/60 overflow-x-auto">
          {[
            { key: 'chaya', label: 'ചായക്കട', sub: 'Chaya Kada', icon: '🍵' },
            { key: 'fuel', label: 'പെട്രോൾ', sub: 'Petrol Pump', icon: '⛽' },
            { key: 'workshop', label: 'വർക്ക്ഷോപ്പ്', sub: 'Garage', icon: '🔧' },
            { key: 'outfit', label: 'വസ്ത്രങ്ങൾ', sub: 'Textiles', icon: '👕' },
            { key: 'house', label: 'സ്വന്തം വീട്', sub: 'House Items', icon: '🏠' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                soundSynth.playSound('bell');
                setActiveTab(tab.key as typeof activeTab);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-amber-500 text-black shadow-md border border-amber-300'
                  : 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-800/40'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-malayalam">{tab.label}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({tab.sub})</span>
            </button>
          ))}
        </div>

        {/* Floating Notification */}
        {notification && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-mono font-bold shadow-lg animate-bounce flex items-center gap-2">
            <span>✨</span>
            <span>{notification}</span>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => {
            const canAfford = wallet >= item.price;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#0c241c]/85 border border-emerald-800/40 hover:border-amber-400/50 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl p-2 rounded-xl bg-black/40 border border-emerald-900/50 shadow">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-heading">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-malayalam text-amber-300 font-bold">
                          {item.malayalamName}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-black font-mono font-black text-xs shadow">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-relaxed font-sans mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-emerald-900/40">
                  <span className="text-[10px] font-mono text-emerald-400">
                    {canAfford ? 'In Stock' : 'Need more ₹'}
                  </span>
                  <button
                    onClick={() => handlePurchase(item)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs shadow transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-black active:scale-95'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    }`}
                  >
                    Buy (വാങ്ങുക)
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-emerald-800/40 bg-[#05140e] flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>കൈയിൽ പൈസ ഉണ്ടെങ്കിൽ ജീവിതം കളർ!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-500/30 font-bold cursor-pointer"
          >
            Done [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
