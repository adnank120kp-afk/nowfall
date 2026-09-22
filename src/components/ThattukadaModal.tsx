import React, { useState } from 'react';
import {
  THATTUKADA_MENU,
  MenuItem,
  REPUTATION_LEVELS,
  ThattukadaReputationLevel,
} from './ThattukadaData';
import { soundSynth } from '../audio';

interface ThattukadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: number;
  onDeductMoney: (amount: number) => boolean;
  onAddReputation?: (points: number) => void;
  totalOrdersCount: number;
  onOrderSuccess: (item: MenuItem) => void;
}

type MenuCategory = 'chaya' | 'breakfast' | 'meals' | 'snacks' | 'drinks' | 'combos';

export function ThattukadaModal({
  isOpen,
  onClose,
  wallet,
  onDeductMoney,
  totalOrdersCount,
  onOrderSuccess,
}: ThattukadaModalProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('chaya');
  const [lastOrderedItem, setLastOrderedItem] = useState<MenuItem | null>(null);
  const [showReadyBanner, setShowReadyBanner] = useState<boolean>(false);
  const [notEnoughMoneyMsg, setNotEnoughMoneyMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate reputation level
  const currentRepLevel: ThattukadaReputationLevel =
    [...REPUTATION_LEVELS]
      .reverse()
      .find((lvl) => totalOrdersCount >= lvl.ordersRequired) || REPUTATION_LEVELS[0];

  const nextRepLevel = REPUTATION_LEVELS.find(
    (lvl) => lvl.ordersRequired > totalOrdersCount
  );

  const progressToNext = nextRepLevel
    ? Math.min(
        100,
        Math.round(
          ((totalOrdersCount - currentRepLevel.ordersRequired) /
            (nextRepLevel.ordersRequired - currentRepLevel.ordersRequired)) *
            100
        )
      )
    : 100;

  // Filter items for active category + unlocked items
  const categoryItems = THATTUKADA_MENU.filter((item) => {
    if (activeCategory === 'combos') {
      return item.category === 'combos';
    }
    return item.category === activeCategory;
  });

  // Unlocked items for this user
  const unlockedItems = THATTUKADA_MENU.filter(
    (item) =>
      item.category === 'unlocked' &&
      item.requiredReputationLevel &&
      currentRepLevel.level >= item.requiredReputationLevel
  );

  const handleBuy = (item: MenuItem) => {
    setNotEnoughMoneyMsg(null);
    const success = onDeductMoney(item.price);
    if (success) {
      soundSynth.playSound('coin');
      soundSynth.playSound('teaglass');
      setLastOrderedItem(item);
      setShowReadyBanner(true);
      onOrderSuccess(item);

      setTimeout(() => {
        setShowReadyBanner(false);
      }, 5500);
    } else {
      soundSynth.playSound('autohorn');
      setNotEnoughMoneyMsg(
        `കാശു തികയില്ലല്ലോ ഉണ്ണീ! ₹${item.price} രൂപ വേണം. കയ്യിൽ ₹${wallet} രൂപ മാത്രമാണുള്ളത്!`
      );
      setTimeout(() => setNotEnoughMoneyMsg(null), 4000);
    }
  };

  const CATEGORY_TABS: { key: MenuCategory; label: string; malayalam: string; icon: string }[] = [
    { key: 'chaya', label: 'Tea & Hot', malayalam: '🍵 ചായ', icon: '☕' },
    { key: 'breakfast', label: 'Breakfast', malayalam: '🍳 Breakfast', icon: '🍳' },
    { key: 'meals', label: 'Meals & Specials', malayalam: '🍗 Meals', icon: '🍗' },
    { key: 'snacks', label: 'Snacks', malayalam: '🍟 Snacks', icon: '🍟' },
    { key: 'drinks', label: 'Cold Drinks', malayalam: '🥤 Drinks', icon: '🥤' },
    { key: 'combos', label: 'Combos', malayalam: '⭐ Combos', icon: '⭐' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in font-body select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b1b13] border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl shadow-2xl shadow-emerald-950/80 overflow-hidden text-zinc-100">
        
        {/* TOP BANNER / HEADER */}
        <div className="relative px-5 py-4 bg-gradient-to-r from-[#042f20] via-[#064e3b] to-[#0d3f2d] border-b border-emerald-500/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-2xl shadow-inner">
              🍵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-lg sm:text-xl text-amber-300 tracking-wide">
                  തട്ടുകട — THATTUKADA
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400 text-black">
                  നായർ ചേട്ടൻ
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-malayalam">
                കിഴക്കുംപുറം കവല • ചൂടുള്ള ചായയും നാടൻ പലഹാരങ്ങളും
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet pill */}
            <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-emerald-400/40 flex items-center gap-2">
              <span className="text-amber-400 font-bold text-xs">കയ്യിലുള്ള പണം:</span>
              <span className="font-mono font-black text-sm text-emerald-300">₹{wallet}</span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-600/40 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* CHEFTAN GREETING & REPUTATION BAR */}
        <div className="px-5 py-3 bg-[#072418] border-b border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-bounce">🧔🏾‍♂️</span>
            <div>
              <span className="text-sm sm:text-base font-bold text-amber-200 font-malayalam">
                “എന്താ വേണ്ടത് ചേട്ടാ?”
              </span>
              <span className="text-xs text-zinc-400 ml-2 font-mono">
                (Mohanan Nair: "What would you like to have, bro?")
              </span>
            </div>
          </div>

          {/* Reputation status */}
          <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-xl border border-emerald-700/30 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">🏅</span>
              <span className="font-bold text-zinc-200">{currentRepLevel.malayalamTitle}</span>
              <span className="text-[10px] text-zinc-400 font-mono">({currentRepLevel.title})</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-300">
              <span>{totalOrdersCount} ഓർഡറുകൾ</span>
            </div>
          </div>
        </div>

        {/* ORDER READY NOTIFICATION / ERROR TOAST */}
        {showReadyBanner && lastOrderedItem && (
          <div className="mx-4 mt-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 border-2 border-emerald-300 shadow-xl flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{lastOrderedItem.icon}</span>
              <div>
                <h4 className="font-heading font-black text-sm text-amber-200">
                  “ഓർഡർ റെഡി! ചൂടോടെ കഴിച്ചോളൂ 😋”
                </h4>
                <p className="text-xs text-white font-malayalam">
                  ഇതാ നിങ്ങളുടെ ചൂട് <span className="font-bold underline">{lastOrderedItem.malayalamName}</span>! (₹{lastOrderedItem.price})
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-black/40 text-amber-300 px-2.5 py-1 rounded-lg">
              +1 REPUTATION
            </span>
          </div>
        )}

        {notEnoughMoneyMsg && (
          <div className="mx-4 mt-3 px-4 py-2.5 rounded-xl bg-red-950/90 border border-red-500/60 text-red-200 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span className="font-malayalam font-bold">{notEnoughMoneyMsg}</span>
          </div>
        )}

        {/* CATEGORY SELECTOR BUTTONS [Requested exact button design] */}
        <div className="px-5 pt-3 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-emerald-900/40">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveCategory(tab.key);
                  soundSynth.playSound('bell');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/20 font-black'
                    : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/60'
                }`}
              >
                <span>{tab.malayalam}</span>
                <span className="text-[10px] opacity-75 font-mono">({tab.label})</span>
              </button>
            );
          })}
        </div>

        {/* MAIN SCROLLABLE MENU CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Active Category Header */}
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-amber-300 flex items-center gap-2">
              <span>{CATEGORY_TABS.find((t) => t.key === activeCategory)?.malayalam}</span>
              <span className="text-xs text-zinc-400 font-normal font-mono">
                ({categoryItems.length} items)
              </span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400/80">
              Freshly made • ആവി പറക്കുന്ന വിഭവങ്ങൾ
            </span>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {categoryItems.map((item) => {
              const canAfford = wallet >= item.price;
              return (
                <div
                  key={item.id}
                  className="group relative p-3.5 rounded-2xl bg-[#0d261b] hover:bg-[#113123] border border-emerald-700/40 hover:border-amber-400/60 transition-all duration-200 shadow-md flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-black/40 border border-emerald-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-heading font-bold text-sm text-zinc-100 truncate group-hover:text-amber-200">
                          {item.malayalamName}
                        </h4>
                        <span className="font-mono font-black text-sm text-emerald-400 whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-300/80 mt-1 font-malayalam line-clamp-2 leading-snug">
                        {item.malayalamDescription}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                      {item.isHot && <span className="text-amber-400">🔥 Hot</span>}
                      {item.isSpicy && <span className="text-red-400">🌶️ Spicy</span>}
                      {item.isVeg && <span className="text-green-400">🌱 Veg</span>}
                    </div>

                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                        canAfford
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold shadow'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                      }`}
                    >
                      <span>ഓർഡർ ചെയ്യുക</span>
                      <span className="font-mono">₹{item.price}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* UNLOCKED REPUTATION DISHES SECTION */}
          {unlockedItems.length > 0 && (
            <div className="pt-4 border-t border-amber-500/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">👑</span>
                <h4 className="font-heading font-black text-sm sm:text-base text-amber-300">
                  തട്ടുകട VIP സ്പെഷ്യൽസ് (Unlocked Specials)
                </h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  {currentRepLevel.malayalamTitle}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {unlockedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#172517] to-[#1e3422] border-2 border-amber-400/70 shadow-lg flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-heading font-bold text-sm text-amber-200">
                            {item.malayalamName}
                          </h5>
                          <span className="text-[9px] font-mono font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded">
                            VIP
                          </span>
                        </div>
                        <p className="text-xs text-zinc-300 font-malayalam">
                          {item.malayalamDescription}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBuy(item)}
                      disabled={wallet < item.price}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs shadow-md cursor-pointer hover:brightness-110 active:scale-95 whitespace-nowrap"
                    >
                      ഓർഡർ ₹{item.price}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* THATTUKADA REPUTATION PROGRESS CARD */}
          <div className="p-4 rounded-2xl bg-[#071d13] border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <h5 className="font-heading font-bold text-sm text-amber-200">
                  തട്ടുകട കസ്റ്റമർ പ്രസ്റ്റീജ് (Thattukada Reputation)
                </h5>
              </div>
              <p className="text-xs text-zinc-300 font-malayalam">
                {currentRepLevel.perkDescription}
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 flex-shrink-0">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{currentRepLevel.malayalamTitle}</span>
                {nextRepLevel ? (
                  <span>അടുത്ത ലെവലിലേക്ക്: {nextRepLevel.ordersRequired - totalOrdersCount} ഓർഡർ</span>
                ) : (
                  <span className="text-amber-400">MAX LEVEL!</span>
                )}
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-emerald-700/40">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-500"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM QUICK FOOTER */}
        <div className="px-5 py-3 bg-[#061910] border-t border-emerald-900/60 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-malayalam text-emerald-300">
              ഓർഡറുകൾ മിനിറ്റുകൾക്കകം റെഡിയാകും!
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-700/50 cursor-pointer font-bold text-xs"
          >
            മടങ്ങിപ്പോവുക [Esc]
          </button>
        </div>
      </div>
    </div>
  );
}
