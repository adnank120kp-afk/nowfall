import React, { useState } from 'react';
import {
  FarmlandPlot,
  HouseModelType,
  PlayerHouse,
  PlayerInventory,
  ReligionType,
  OnlinePlayerInfo,
  SIMULATED_ONLINE_PLAYERS,
} from './KeralaLifeSystem';
import { KERALA_14_DISTRICTS } from './BigMapBuilder';
import { PlayerOutfit, VehicleType } from '../types';

interface KeralaLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: number;
  onUpdateWallet: (delta: number) => void;
  farmlands: FarmlandPlot[];
  onHarvest: (plotId: 'coconut' | 'banana' | 'rice') => void;
  inventory: PlayerInventory;
  onUpdateInventory: (updater: (prev: PlayerInventory) => PlayerInventory) => void;
  playerHouse: PlayerHouse;
  onBuildHouse: (district: string, model: HouseModelType) => void;
  currentOutfit: PlayerOutfit;
  onChangeOutfit: (outfit: PlayerOutfit) => void;
  currentReligion: ReligionType;
  onChangeReligion: (rel: ReligionType) => void;
  onPray: (place: 'masjid' | 'temple' | 'church') => void;
  onBuyVehicle: (type: VehicleType, price: number) => void;
  ownedVehicles: VehicleType[];
  onFastTravel: (x: number, z: number, locationName: string) => void;
}

type TabType = 'farms' | 'market' | 'house' | 'wardrobe' | 'showroom' | 'faith' | 'online';

export function KeralaLifeModal({
  isOpen,
  onClose,
  wallet,
  onUpdateWallet,
  farmlands,
  onHarvest,
  inventory,
  onUpdateInventory,
  playerHouse,
  onBuildHouse,
  currentOutfit,
  onChangeOutfit,
  currentReligion,
  onChangeReligion,
  onPray,
  onBuyVehicle,
  ownedVehicles,
  onFastTravel,
}: KeralaLifeModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('farms');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Malappuram');
  const [selectedHouseModel, setSelectedHouseModel] = useState<HouseModelType>('nalukettu');
  const [statusMsg, setStatusMsg] = useState<string>('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(''), 3500);
  };

  // SELL PRODUCE
  const handleSell = (item: 'coconuts' | 'bananas' | 'riceSacks', pricePerUnit: number) => {
    const count = inventory[item];
    if (count <= 0) {
      showNotification('വിൽപ്പനയ്ക്ക് സാധനങ്ങൾ സ്റ്റോക്കിൽ ഇല്ല! (No items in inventory to sell)');
      return;
    }
    const earnings = count * pricePerUnit;
    onUpdateInventory((prev) => ({ ...prev, [item]: 0 }));
    onUpdateWallet(earnings);
    showNotification(`വിറ്റു! ₹${earnings} ലഭിച്ചു! (Sold ${count} units for ₹${earnings})`);
  };

  // BUY MATERIALS
  const handleBuyStones = () => {
    const cost = 240; // 2 bundles of granite stones
    if (wallet < cost) {
      showNotification('കയ്യിൽ മതിയായ പണമില്ല! (Not enough money to buy stones)');
      return;
    }
    onUpdateWallet(-cost);
    onUpdateInventory((prev) => ({ ...prev, stones: prev.stones + 10 }));
    showNotification('10 കരിങ്കല്ലുകൾ വാങ്ങി! (Purchased 10 Granite Stones)');
  };

  const handleBuyCement = () => {
    const cost = 380; // 1 cement bag
    if (wallet < cost) {
      showNotification('കയ്യിൽ മതിയായ പണമില്ല! (Not enough money to buy cement)');
      return;
    }
    onUpdateWallet(-cost);
    onUpdateInventory((prev) => ({ ...prev, cementBags: prev.cementBags + 2 }));
    showNotification('2 ചാക്ക് സിമന്റ് വാങ്ങി! (Purchased 2 Bags of Kerala Cement)');
  };

  // START HOME CONSTRUCTION
  const handleStartConstruction = () => {
    const landCost = 800;
    if (wallet < landCost) {
      showNotification('സ്ഥലം വാങ്ങാൻ ₹800 ആവശ്യമാണ്! (Land plot costs ₹800)');
      return;
    }
    if (inventory.stones < 10 || inventory.cementBags < 2) {
      showNotification('നിർമ്മാണത്തിന് 10 കരിങ്കല്ലും 2 ചാക്ക് സിമന്റും വേണം! (Need 10 Stones & 2 Cement bags)');
      return;
    }

    onUpdateWallet(-landCost);
    onUpdateInventory((prev) => ({
      ...prev,
      stones: prev.stones - 10,
      cementBags: prev.cementBags - 2,
    }));
    onBuildHouse(selectedDistrict, selectedHouseModel);
    showNotification(`അഭിനന്ദനങ്ങൾ! ${selectedDistrict} ൽ വീട് നിർമ്മാണം ആരംഭിച്ചു! 🏡`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#071a12] border-2 border-emerald-500/60 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#0a2f20] to-teal-950 p-4 border-b border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌴</span>
            <div>
              <h2 className="text-xl font-black text-amber-300 font-mono tracking-wide flex items-center gap-2">
                KERALA LIFE SIMULATOR • കേരള ജീവിതം
              </h2>
              <p className="text-xs text-emerald-300 font-medium">
                Live, Farm, Build, Work & Pray across 14 Districts of God's Own Country
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Wallet Chip */}
            <div className="bg-black/60 border border-amber-400/60 px-3.5 py-1.5 rounded-full flex items-center gap-2">
              <span className="text-base text-amber-400">💰</span>
              <span className="font-mono text-base font-black text-amber-300">₹{wallet}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-black/40 border-b border-emerald-900/60 overflow-x-auto select-none">
          {[
            { id: 'farms', label: '🌾 Farmlands', malayalam: 'തോട്ടങ്ങൾ' },
            { id: 'market', label: '🛒 Produce Market', malayalam: 'വിപണി' },
            { id: 'house', label: '🏡 Dream Home', malayalam: 'സ്വന്തം വീട്' },
            { id: 'wardrobe', label: '👕 Wardrobe', malayalam: 'വസ്ത്രങ്ങൾ' },
            { id: 'showroom', label: '🚗 Showroom', malayalam: 'വാഹനങ്ങൾ' },
            { id: 'faith', label: '🕌 Prayer & Faith', malayalam: 'പ്രാർത്ഥന' },
            { id: 'online', label: '🌐 Online (24)', malayalam: 'കളിക്കാർ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-0.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-400/50'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 font-normal">{tab.malayalam}</span>
            </button>
          ))}
        </div>

        {/* Notification Toast */}
        {statusMsg && (
          <div className="bg-amber-500/20 border-b border-amber-400/50 px-4 py-2 text-center text-xs font-mono font-bold text-amber-300 animate-in slide-in-from-top-2">
            🔔 {statusMsg}
          </div>
        )}

        {/* Main Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: FARMLANDS & HARVEST */}
          {activeTab === 'farms' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                    <span>🌾</span> YOUR 3 FREE KERALA FARMLAND PLOTS
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    Drive your Auto Rickshaw to each plot, harvest the ripe crops, and sell them at the produce mandi for cash!
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-emerald-300 bg-black/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <div>🥥 Coconuts: <span className="font-bold text-white">{inventory.coconuts}</span></div>
                  <div>🍌 Bananas: <span className="font-bold text-white">{inventory.bananas}</span></div>
                  <div>🌾 Rice: <span className="font-bold text-white">{inventory.riceSacks}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {farmlands.map((plot) => (
                  <div
                    key={plot.id}
                    className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:border-emerald-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-4xl">{plot.cropIcon}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-[10px] font-mono text-emerald-300 border border-emerald-400/40">
                          {plot.district}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-zinc-100 mt-2">{plot.name}</h4>
                      <p className="text-xs text-amber-300/80">{plot.malayalamName}</p>
                      <div className="mt-3 text-xs text-zinc-300 space-y-1">
                        <div>Crop: <span className="font-bold text-white">{plot.cropName}</span></div>
                        <div>Market Rate: <span className="font-mono text-amber-300">₹{plot.pricePerUnit} / {plot.cropUnit}</span></div>
                        <div>Expected Yield: <span className="font-bold text-emerald-300">+{plot.yieldAmount} {plot.cropUnit}</span></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-900/60 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onHarvest(plot.id);
                          showNotification(`വിളവെടുത്തു! +${plot.yieldAmount} ${plot.cropName} ലഭിച്ചു!`);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs cursor-pointer active:scale-95 shadow transition-all"
                      >
                        🌾 വിളവെടുക്കുക (Harvest)
                      </button>
                      <button
                        onClick={() => {
                          onFastTravel(plot.coords.x, plot.coords.z, plot.name);
                          onClose();
                        }}
                        className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono border border-zinc-600 cursor-pointer"
                        title="Drive Auto Rickshaw directly to this farm plot"
                      >
                        🛺 Travel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCE MARKET & MANDI */}
          {activeTab === 'market' && (
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <span>🛒</span> KERALA WHOLESALE MANDI & PRODUCE MARKET (പച്ചക്കറിക്കട)
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  “വരൂ ചേട്ടാ! നാടൻ വിളവുകൾ ഏറ്റവും നല്ല വിലയിൽ ഇവിടെ വിൽക്കാം!” Sell your freshly harvested coconuts, bananas, and rice to earn cash.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Coconut Sell */}
                <div className="bg-[#0b291d] border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🥥</span>
                      <span className="text-xs font-mono font-bold text-amber-300">₹35 / nut</span>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Bekal Coconuts (തേങ്ങ)</h4>
                    <p className="text-xs text-zinc-400 mt-1">In Inventory: <span className="font-bold text-white font-mono">{inventory.coconuts}</span> nuts</p>
                    <p className="text-xs text-emerald-300 mt-0.5">Total Value: ₹{inventory.coconuts * 35}</p>
                  </div>
                  <button
                    onClick={() => handleSell('coconuts', 35)}
                    disabled={inventory.coconuts <= 0}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 disabled:opacity-50 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all shadow"
                  >
                    Sell All Coconuts (₹{inventory.coconuts * 35})
                  </button>
                </div>

                {/* Banana Sell */}
                <div className="bg-[#0b291d] border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🍌</span>
                      <span className="text-xs font-mono font-bold text-amber-300">₹85 / bunch</span>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Nendran Bananas (നേന്ത്രപ്പഴം)</h4>
                    <p className="text-xs text-zinc-400 mt-1">In Inventory: <span className="font-bold text-white font-mono">{inventory.bananas}</span> bunches</p>
                    <p className="text-xs text-emerald-300 mt-0.5">Total Value: ₹{inventory.bananas * 85}</p>
                  </div>
                  <button
                    onClick={() => handleSell('bananas', 85)}
                    disabled={inventory.bananas <= 0}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 disabled:opacity-50 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all shadow"
                  >
                    Sell All Bananas (₹{inventory.bananas * 85})
                  </button>
                </div>

                {/* Rice Sacks Sell */}
                <div className="bg-[#0b291d] border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">🌾</span>
                      <span className="text-xs font-mono font-bold text-amber-300">₹180 / sack</span>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Kuttanad Rice Sacks (നെല്ല്)</h4>
                    <p className="text-xs text-zinc-400 mt-1">In Inventory: <span className="font-bold text-white font-mono">{inventory.riceSacks}</span> sacks</p>
                    <p className="text-xs text-emerald-300 mt-0.5">Total Value: ₹{inventory.riceSacks * 180}</p>
                  </div>
                  <button
                    onClick={() => handleSell('riceSacks', 180)}
                    disabled={inventory.riceSacks <= 0}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 disabled:opacity-50 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all shadow"
                  >
                    Sell All Rice Sacks (₹{inventory.riceSacks * 180})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DREAM HOME CONSTRUCTION */}
          {activeTab === 'house' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <span>🏡</span> BUILD YOUR DREAM KERALA HOME (സ്വന്തം വീട് നിർമ്മാണം)
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Purchase land in any of the 14 Kerala districts, procure Granite Stones & Kerala Cement, select your architectural model, and watch the 3D home build automatically!
                </p>
              </div>

              {/* Status Banner */}
              <div className="bg-black/50 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
                <div className="text-xs text-zinc-300">
                  Current Home Status:{' '}
                  <span className="font-bold text-white">
                    {playerHouse.isBuilt
                      ? `Complete in ${playerHouse.district} (${playerHouse.model})`
                      : playerHouse.isConstructing
                      ? `Under Construction (Stage ${playerHouse.constructionStage}/4)`
                      : 'No home built yet — Ready to purchase plot!'}
                  </span>
                </div>
                {playerHouse.isBuilt && (
                  <button
                    onClick={() => {
                      onFastTravel(playerHouse.coords.x, playerHouse.coords.z, 'My Home');
                      onClose();
                    }}
                    className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white cursor-pointer"
                  >
                    🏠 Go Home
                  </button>
                )}
              </div>

              {/* Step 1: Buy Building Materials */}
              <div className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-300 tracking-wider">
                  STEP 1: BUILDING MATERIALS INVENTORY
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-black/40 border border-zinc-700 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-zinc-100">🧱 Granite Building Stones (കരിങ്കല്ല്)</div>
                      <div className="text-xs text-zinc-400">Owned: <span className="font-bold text-white">{inventory.stones}</span> units (Need 10)</div>
                    </div>
                    <button
                      onClick={handleBuyStones}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-amber-500/40 text-amber-300 text-xs font-bold cursor-pointer"
                    >
                      Buy 10 (₹240)
                    </button>
                  </div>

                  <div className="bg-black/40 border border-zinc-700 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-zinc-100">🏗️ Kerala Cement Bags (സിമന്റ്)</div>
                      <div className="text-xs text-zinc-400">Owned: <span className="font-bold text-white">{inventory.cementBags}</span> bags (Need 2)</div>
                    </div>
                    <button
                      onClick={handleBuyCement}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-amber-500/40 text-amber-300 text-xs font-bold cursor-pointer"
                    >
                      Buy 2 (₹380)
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Choose District & Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* District Choice */}
                <div className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4">
                  <h4 className="text-xs font-mono font-bold text-amber-300 tracking-wider mb-2">
                    STEP 2: CHOOSE DISTRICT (ജില്ല തിരഞ്ഞെടുക്കുക)
                  </h4>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/60 border border-emerald-500/50 text-sm font-bold text-emerald-200 focus:outline-none"
                  >
                    {KERALA_14_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} — {d.malayalamName}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Plot Registration Fee: <span className="font-mono text-amber-300 font-bold">₹800</span>
                  </p>
                </div>

                {/* Model Choice */}
                <div className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4">
                  <h4 className="text-xs font-mono font-bold text-amber-300 tracking-wider mb-2">
                    STEP 3: CHOOSE ARCHITECTURAL MODEL (മോഡൽ)
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'nalukettu', label: 'Traditional Nalukettu', icon: '🏛️' },
                      { id: 'modern_villa', label: 'Contemporary Villa', icon: '🏢' },
                      { id: 'plantation_cottage', label: 'Estate Cottage', icon: '🏡' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedHouseModel(m.id as HouseModelType)}
                        className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          selectedHouseModel === m.id
                            ? 'bg-emerald-800 border-amber-400 text-white font-bold'
                            : 'bg-black/40 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="text-xl">{m.icon}</span>
                        <span className="text-[10px] leading-tight">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Trigger Build */}
              <button
                onClick={handleStartConstruction}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600 hover:brightness-110 text-white font-black text-sm shadow-xl active:scale-98 transition-all cursor-pointer border border-amber-400/50 flex items-center justify-center gap-2"
              >
                <span>🏗️</span>
                <span>BUILD HOME AUTOMATICALLY IN {selectedDistrict.toUpperCase()} (₹800 Land + Materials)</span>
              </button>
            </div>
          )}

          {/* TAB 4: WARDROBE & DRESSING ROOM */}
          {activeTab === 'wardrobe' && (
            <div className="space-y-4">
              <div className="bg-purple-950/40 border border-purple-500/40 rounded-2xl p-4">
                <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
                  <span>👕</span> DRESSING ROOM & TRADITIONAL KERALA WARDROBE
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Change outfits anytime from your home's dressing room or on the go! Start with the authentic daily Lungi & Banyan (ലുങ്കിയും ബനിയനും).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  {
                    id: 'babu',
                    name: 'Lungi & Banyan (മുണ്ട് & ബനിയൻ)',
                    desc: 'The iconic traditional Kerala daily outfit with cotton thorthu towel.',
                    icon: '👕',
                    tag: 'STARTER DEFAULT',
                  },
                  {
                    id: 'kasavu',
                    name: 'Kasavu Mundu & Kurta (കസവ് മുണ്ട്)',
                    desc: 'Golden bordered festive Kerala attire for temple festivals and Onam.',
                    icon: '🥻',
                    tag: 'FESTIVE',
                  },
                  {
                    id: 'driver',
                    name: 'Auto Driver Khaki (ഡ്രൈവർ കാക്കി)',
                    desc: 'Official Kerala auto and bus transport driver uniform.',
                    icon: '🦺',
                    tag: 'TRANSPORT',
                  },
                  {
                    id: 'sevens',
                    name: 'Sevens Arena Puthanathani Jersey',
                    desc: 'Malappuram floodlit football turf team jersey for kicking goals!',
                    icon: '⚽',
                    tag: 'SPORTS',
                  },
                  {
                    id: 'unni',
                    name: 'Bangalore Techie Jeans & Shirt',
                    desc: 'Casual techie return outfit with laptop strap and spectacles.',
                    icon: '🕶️',
                    tag: 'CASUAL',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onChangeOutfit(item.id as PlayerOutfit);
                      showNotification(`വസ്ത്രം മാറ്റി: ${item.name}!`);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      currentOutfit === item.id
                        ? 'bg-purple-950/80 border-purple-400 shadow-lg'
                        : 'bg-[#0b291d] border-zinc-700/70 hover:border-zinc-500'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-black/40 text-purple-300 border border-purple-500/40">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-100 mt-2">{item.name}</h4>
                      <p className="text-xs text-zinc-400 mt-1 leading-snug">{item.desc}</p>
                    </div>

                    <button
                      className={`mt-4 w-full py-1.5 rounded-xl text-xs font-bold ${
                        currentOutfit === item.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {currentOutfit === item.id ? '✓ Currently Wearing' : 'Wear Outfit'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: VEHICLE SHOWROOM */}
          {activeTab === 'showroom' && (
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <span>🚗</span> KERALA VINTAGE & MODERN VEHICLE SHOWROOM (ഷോറൂം)
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Use your farming earnings to buy new vehicles! All vehicles support interactive Interior Cockpit [C] and Exterior Chase cameras.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'auto', name: 'Bajaj RE 2024 Auto Rickshaw', price: 0, icon: '🛺', desc: 'Free starter auto for farming and city rides.' },
                  { id: 'bus', name: 'Varahi Modern Luxury Coach Bus', price: 1800, icon: '🚌', desc: '12-meter air-conditioned coach with Varahi livery & air horn.' },
                  { id: 'tractor', name: 'Kerala Paddy Tractor', price: 950, icon: '🚜', desc: 'Heavy duty agricultural tractor for muddy fields.' },
                  { id: 'jeep', name: 'Kerala 4x4 Mountain Jeep', price: 1200, icon: '🚙', desc: 'Wayanad high-range off-road exploration jeep.' },
                  { id: 'mustang', name: 'Classic Mustang Muscle Car', price: 2400, icon: '🏎️', desc: 'High-speed highway cruiser with deep V8 exhaust roar.' },
                  { id: 'tipper', name: 'Kerala 10-Wheel Tipper Lorry', price: 1600, icon: '🚚', desc: 'Commercial heavy transport lorry for granite stones & sand.' },
                  { id: 'boat', name: 'Alappuzha Motor Backwater Boat', price: 1100, icon: '🚤', desc: 'Cruising through Vembanad backwater canals.' },
                ].map((veh) => {
                  const isOwned = ownedVehicles.includes(veh.id as VehicleType) || veh.price === 0;
                  return (
                    <div
                      key={veh.id}
                      className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{veh.icon}</span>
                          <span className="font-mono text-xs font-bold text-amber-300">
                            {veh.price === 0 ? 'FREE' : `₹${veh.price}`}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-zinc-100 mt-2">{veh.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-snug">{veh.desc}</p>
                      </div>

                      <button
                        onClick={() => {
                          if (isOwned) {
                            showNotification(`${veh.name} drives via [F] or [V]!`);
                          } else {
                            if (wallet < veh.price) {
                              showNotification('വാങ്ങാൻ മതിയായ പണമില്ല! (Not enough money to buy vehicle)');
                              return;
                            }
                            onUpdateWallet(-veh.price);
                            onBuyVehicle(veh.id as VehicleType, veh.price);
                            showNotification(`അഭിനന്ദനങ്ങൾ! ${veh.name} വാങ്ങി!`);
                          }
                        }}
                        className={`mt-4 w-full py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          isOwned
                            ? 'bg-emerald-800 text-emerald-200 border border-emerald-600'
                            : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white shadow'
                        }`}
                      >
                        {isOwned ? '✓ Owned (Drive in World)' : `Buy for ₹${veh.price}`}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: PRAYER & PLACES OF WORSHIP */}
          {activeTab === 'faith' && (
            <div className="space-y-4">
              <div className="bg-sky-950/40 border border-sky-500/40 rounded-2xl p-4">
                <h3 className="text-base font-bold text-sky-300 flex items-center gap-2">
                  <span>🕌</span> SPIRITUAL PLACES & RESPECT ACROSS ALL FAITHS
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Select your faith or visit all sacred sites in peace. Visit the Grand Juma Masjid, Traditional Kerala Temple, or Historic Church to offer prayers.
                </p>
              </div>

              {/* Faith Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'universal', label: 'Universal Respect', icon: '🕊️' },
                  { id: 'muslim', label: 'Muslim (ഇസ്ലാം)', icon: '🕌' },
                  { id: 'hindu', label: 'Hindu (ഹിന്ദു)', icon: '🛕' },
                  { id: 'christian', label: 'Christian (ക്രൈസ്തവം)', icon: '⛪' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      onChangeReligion(f.id as ReligionType);
                      showNotification(`Faith selected: ${f.label}`);
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-all ${
                      currentReligion === f.id
                        ? 'bg-sky-900 border-amber-400 text-white font-bold'
                        : 'bg-black/40 border-zinc-700 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="text-2xl">{f.icon}</span>
                    <span className="text-xs">{f.label}</span>
                  </button>
                ))}
              </div>

              {/* Prayer Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0b291d] border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-3xl">🕌</span>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Grand Juma Masjid (പള്ളി)</h4>
                    <p className="text-xs text-zinc-400 mt-1">Offer Namaz prayer with peaceful Adhan blessing.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        onPray('masjid');
                        showNotification('നിസ്കാരം നിർവഹിച്ചു (Prayer completed at Masjid) 🤲');
                      }}
                      className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white cursor-pointer"
                    >
                      🤲 നിസ്കരിക്കുക (Pray)
                    </button>
                    <button
                      onClick={() => {
                        onFastTravel(-105, 45, 'Grand Masjid');
                        onClose();
                      }}
                      className="p-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      Visit
                    </button>
                  </div>
                </div>

                <div className="bg-[#0b291d] border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-3xl">🛕</span>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Traditional Temple (ക്ഷേത്രം)</h4>
                    <p className="text-xs text-zinc-400 mt-1">Ring the bronze bell & receive temple prasadam.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        onPray('temple');
                        showNotification('ക്ഷേത്ര ദർശനം നടത്തി (Pooja completed at Temple) 🙏');
                      }}
                      className="flex-1 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-xs font-bold text-white cursor-pointer"
                    >
                      🙏 പ്രാർത്ഥിക്കുക (Pooja)
                    </button>
                    <button
                      onClick={() => {
                        onFastTravel(115, 55, 'Traditional Temple');
                        onClose();
                      }}
                      className="p-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      Visit
                    </button>
                  </div>
                </div>

                <div className="bg-[#0b291d] border border-pink-500/40 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-3xl">⛪</span>
                    <h4 className="font-bold text-sm text-zinc-100 mt-2">Historic Church (പള്ളി)</h4>
                    <p className="text-xs text-zinc-400 mt-1">Light candles and hear church bell hymns.</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        onPray('church');
                        showNotification('പള്ളിയിൽ പ്രാർത്ഥിച്ചു (Prayer at Church) ✝️');
                      }}
                      className="flex-1 py-2 rounded-xl bg-pink-800 hover:bg-pink-700 text-xs font-bold text-white cursor-pointer"
                    >
                      ✝️ പ്രാർത്ഥിക്കുക (Pray)
                    </button>
                    <button
                      onClick={() => {
                        onFastTravel(65, 145, 'Historic Church');
                        onClose();
                      }}
                      className="p-2 rounded-xl bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700"
                    >
                      Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: ONLINE PLAYERS */}
          {activeTab === 'online' && (
            <div className="space-y-4">
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE PLAYERS IN KERALA ONLINE WORLD (24 PLAYERS)
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1">
                    See other active players traveling on highways, swimming at Puthanathani Sevens turf, and farming across Kerala!
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-400/50 text-xs font-mono text-emerald-200">
                  Server: Kerala-Main-1
                </div>
              </div>

              <div className="space-y-2">
                {SIMULATED_ONLINE_PLAYERS.map((pl) => (
                  <div
                    key={pl.id}
                    className="bg-[#0b291d] border border-zinc-700/60 rounded-xl p-3 flex items-center justify-between hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👤</span>
                      <div>
                        <div className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                          <span>{pl.name}</span>
                          <span className="px-1.5 py-0.2 rounded bg-black/40 text-[10px] font-mono text-emerald-300">
                            {pl.district}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          {pl.activity} • Vehicle: <span className="text-amber-300">{pl.vehicle}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-emerald-400">{pl.pingMs} ms</div>
                      <div className="text-[10px] text-zinc-500">{pl.outfit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
