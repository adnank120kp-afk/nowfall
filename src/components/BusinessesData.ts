import { BusinessItem } from '../types';

export const KERALA_BUSINESS_CATALOG: BusinessItem[] = [
  // 🍵 CHAYA KADA MENU
  {
    id: 'chaya_sulaimani',
    name: 'Malabar Lemon Sulaimani',
    malayalamName: 'മലബാർ സുലൈമാനി 🍋',
    price: 15,
    icon: '☕',
    desc: 'Piping hot spiced black tea brewed with crushed cardamom, clove and fresh squeezed lemon. Restores stamina.',
    category: 'chaya',
  },
  {
    id: 'chaya_pazhampori',
    name: 'Crispy Nendran Pazhampori',
    malayalamName: 'പഴംപൊരി (ഏത്തയ്ക്ക അപ്പം) 🍌',
    price: 15,
    icon: '🍌',
    desc: 'Golden fried ripe Kerala plantain fritter crispy on the outside, meltingly sweet inside. Classic 4 PM snack.',
    category: 'chaya',
  },
  {
    id: 'chaya_parippuvada',
    name: 'Crunchy Parippu Vada',
    malayalamName: 'പരിപ്പുവട & മുളക് 🧆',
    price: 15,
    icon: '🧆',
    desc: 'Crispy lentil fritters spiced with ginger, shallots, and green chilies. The sound of Kerala rain companion.',
    category: 'chaya',
  },
  {
    id: 'chaya_halwa',
    name: 'Kozhikodan Black Halwa',
    malayalamName: 'കോഴിക്കോടൻ കറുത്ത ഹൽവ 🍫',
    price: 40,
    icon: '🍫',
    desc: 'Pure coconut oil jaggery halwa simmered in copper cauldrons with cashew nuts.',
    category: 'chaya',
  },

  // ⛽ PETROL PUMP REFUELING
  {
    id: 'fuel_refill_full',
    name: 'Full Tank Petrol Refill',
    malayalamName: 'ഫുൾ ടാങ്ക് പെട്രോൾ ⛽',
    price: 100,
    icon: '⛽',
    desc: 'Fill up your active vehicle (Auto, Bus, Jeep, Tractor, Bullet) to 100% fuel tank capacity.',
    category: 'fuel',
  },
  {
    id: 'fuel_oil_service',
    name: 'Engine 2T Oil & Air Check',
    malayalamName: 'ഓയിൽ സർവീസ് & എയർ 💨',
    price: 50,
    icon: '🛢️',
    desc: 'Top-grade lubrication for smooth engine purr and maximum vehicle acceleration.',
    category: 'fuel',
  },

  // 🔧 WORKSHOP & GARAGE
  {
    id: 'workshop_repair',
    name: 'Full Body Dent & Engine Repair',
    malayalamName: 'കംപ്ലീറ്റ് സർവീസ് & ഡെന്റിംഗ് 🔧',
    price: 120,
    icon: '🔧',
    desc: 'Fix all vehicle body scratches and restore vehicle health to 100% mint condition.',
    category: 'workshop',
  },
  {
    id: 'workshop_airhorn_tune',
    name: 'High-Tone Musical Air Horn Tuning',
    malayalamName: 'മ്യൂസിക്കൽ എയർ ഹോൺ ട്യൂണിംഗ് 🎺',
    price: 80,
    icon: '🎺',
    desc: 'Upgrade vehicle horn to a reverberating 4-tone Kerala tourist bus melodic fanfare.',
    category: 'workshop',
  },

  // 👕 OUTFITS
  {
    id: 'outfit_kasavu',
    name: 'Traditional Kasavu Mundu & Melmundu',
    malayalamName: 'കസവ് മുണ്ടും കുപ്പായവും 🥻',
    price: 180,
    icon: '🥻',
    desc: 'Dignified gold-bordered traditional Onam attire with golden kasavu shawl.',
    category: 'outfit',
  },
  {
    id: 'outfit_driver',
    name: 'Kerala Heavy Driver Khaki Uniform',
    malayalamName: 'ഡ്രൈവർ കാക്കി കുപ്പായം 👔',
    price: 120,
    icon: '👔',
    desc: 'Official starched khaki uniform worn by experienced KSRTC and private bus captains.',
    category: 'outfit',
  },
  {
    id: 'outfit_sevens',
    name: 'Kerala Sevens Yellow Football Jersey',
    malayalamName: 'സെവൻസ് ഫുട്ബോൾ ജേഴ്സി ⚽',
    price: 150,
    icon: '⚽',
    desc: 'Vibrant yellow number 10 jersey celebrating Malabar sevens football passion.',
    category: 'outfit',
  },

  // 🏠 PLAYER HOUSE CUSTOMIZATION
  {
    id: 'house_veranda_swing',
    name: 'Teakwood Veranda Swing (ആട്ടുകട്ടിൽ)',
    malayalamName: 'തേക്ക് തടി ആട്ടുകട്ടിൽ 🛋️',
    price: 300,
    icon: '🛋️',
    desc: 'Handcrafted hanging brass-chain teak swing for your player house porch overlooking the coconut palms.',
    category: 'house',
  },
  {
    id: 'house_garage_canopy',
    name: 'Rain-Proof Terracotta Vehicle Canopy',
    malayalamName: 'ഓടുമേഞ്ഞ പോർച്ച് & ഗാരേജ് 🚗',
    price: 450,
    icon: '🚗',
    desc: 'Spacious sheltered portico to park and showcase your collected vehicles in style.',
    category: 'house',
  },
];
