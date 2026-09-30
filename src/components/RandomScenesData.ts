import { RandomSceneEvent } from '../types';

export const RANDOM_NAATTILE_SCENES: RandomSceneEvent[] = [
  // 1. KASARAGOD
  {
    id: 'scene_kasaragod_cow',
    title: '1. Kasaragod — Gomatha Village Road Blockage (പശു റോഡിൽ!)',
    malayalamTitle: 'കാസർഗോഡ്: പശു റോഡിൽ ധ്യാനത്തിൽ! 🐄',
    desc: 'On a narrow village laterite road near Bekal, a royal Kasaragod dwarf cow is comfortably reclining in the center of the tarmac.',
    malayalamDesc: 'ബേക്കൽ കോട്ടയിലേക്കുള്ള ഇടുങ്ങിയ ചെങ്കൽ റോഡിൽ ഒരു നാടൻ പശു വഴിമുടക്കി കിടക്കുന്നു! ഇരുവശത്തും വാഹനങ്ങൾ കാത്തുനിൽക്കുന്നു.',
    avatar: '🐄',
    location: 'Kasaragod • Bekal Village Road',
    choices: [
      {
        text: 'Offer tender banana leaf from nearby coconut farm',
        malayalamText: 'ഒരു പച്ച വാഴയില കാണിച്ച് റോഡരികിലേക്ക് മാറ്റുക',
        reward: 60,
        reaction: 'The cow contentedly follows the green leaf off the road into the grass. The whole village smiles: “നല്ല മനസ്സിന് നന്ദി മോനേ!”',
        malayalamReaction: 'പശു വാഴയില കണ്ട് പതുക്കെ എഴുന്നേറ്റ് പുല്ലിലേക്ക് മാറി. വഴി ക്ലിയർ!',
        sound: 'coin',
      },
      {
        text: 'Blow the musical vehicle horn patiently',
        malayalamText: 'പതുക്കെ ഹോൺ അടിച്ച് ശ്രദ്ധ ക്ഷണിക്കുക',
        reward: 30,
        reaction: 'The cow lets out a gentle “അമ്മാഹ്ഹ്ഹ്!” and lazily ambles to the roadside coconut tree.',
        malayalamReaction: 'പശു പതുക്കെ എഴുന്നേറ്റ് തെങ്ങിൻ ചുവട്ടിലേക്ക് നടന്നു.',
        sound: 'moo',
      },
    ],
  },

  // 2. KANNUR
  {
    id: 'scene_kannur_beach',
    title: '2. Kannur — Muzhappilangad Beach & Theyyam Rehearsal (ബീച്ചും തെയ്യവും!)',
    malayalamTitle: 'കണ്ണൂർ: ഡ്രൈവ്-ഇൻ ബീച്ചിലെ തെയ്യച്ചുവടുകൾ! 🏖️',
    desc: 'At Muzhappilangad drive-in beach, coastal fishermen and a Theyyam ritual artist troupe are preparing for the upcoming Kaliyattam festival.',
    malayalamDesc: 'മുഴപ്പിലങ്ങാട് കടൽത്തീരത്ത് തെയ്യത്തിന്റെ ചിലമ്പൊലിയും തീരദേശ വള്ളങ്ങളും! ചെണ്ടമേളത്തിന്റെ അകമ്പടിയോടെ കച്ചമുറുക്കുന്നു.',
    avatar: '🏖️',
    location: 'Kannur • Muzhappilangad Drive-in Beach',
    choices: [
      {
        text: 'Stop car on the wet sand and watch the Theyyam footwork',
        malayalamText: 'വണ്ടി മണലിൽ നിർത്തി തെയ്യച്ചുവടുകൾ കാണുക',
        reward: 80,
        reaction: 'The master artist blesses you with traditional turmeric rice and yellow flowers: “ഗുരുക്കന്മാരുടെ അനുഗ്രഹം ഉണ്ടാവട്ടെ!”',
        malayalamReaction: 'തെയ്യം കലാകാരൻ മഞ്ഞളരി വിതറി അനുഗ്രഹിച്ചു: “നല്ലൊരു യാത്ര നേരുന്നു!”',
        sound: 'chenda',
      },
      {
        text: 'Buy freshly fried Kallummakkaya (mussels) from beach stall',
        malayalamText: 'ചൂട് കല്ലുമ്മക്കായ നിറച്ചത് വാങ്ങി കഴിക്കുക',
        reward: 50,
        reaction: 'Crispy spiced Kannur seafood delight! Pure coastal flavor fills the air.',
        malayalamReaction: 'നല്ല എരിവുള്ള നാടൻ കല്ലുമ്മക്കായ ഫ്രൈ! നാവിൽ കൊതിയൂറുന്ന രുചി!',
        sound: 'coin',
      },
    ],
  },

  // 3. KOZHIKODE
  {
    id: 'scene_kozhikode_traffic',
    title: '3. Kozhikode — SM Street Traffic Jam & Halwa Rush (മിഠായിത്തെരുവ് തിരക്ക്!)',
    malayalamTitle: 'കോഴിക്കോട്: മിഠായിത്തെരുവിൽ സൂപ്പർ ട്രാഫിക്! 🏙️',
    desc: 'Near Sweet Meat Street (SM Street), a convoy of delivery autos and shopping crowds creates a lively, sweet-smelling urban gridlock.',
    malayalamDesc: 'മിഠായിത്തെരുവിലേക്ക് കോഴിക്കോടൻ ഹൽവ വാങ്ങാൻ എത്തിയവരുടെ വാഹനങ്ങൾ നിരന്നു! നഗരം ആകെ ഉത്സവപ്രതീതിയിലാണ്.',
    avatar: '🏙️',
    location: 'Kozhikode • SM Street Junction',
    choices: [
      {
        text: 'Step out to Sankaran Bakery and buy Black Kozhikodan Halwa',
        malayalamText: 'ശങ്കരൻ ബേക്കറിയിൽ നിന്ന് കറുത്ത ഹൽവ പൊതിഞ്ഞെടുക്കുക',
        reward: 75,
        reaction: 'Ghee-dripping tender halwa shared with traffic uncles! Everyone happily lets your vehicle pass first: “കോഴിക്കോട്ടേക്ക് സ്വാഗതം!”',
        malayalamReaction: 'നല്ല നെയ്മണമുള്ള ഹൽവ! നാട്ടുകാർ സന്തോഷത്തോടെ വഴി ഒഴിഞ്ഞു തന്നു.',
        sound: 'coin',
      },
      {
        text: 'Guide the two autos to reverse into the side lane',
        malayalamText: 'ഓട്ടോക്കാരെ റിവേഴ്സ് എടുപ്പിച്ച് ട്രാഫിക് ക്ലിയർ ചെയ്യുക',
        reward: 90,
        reaction: 'Expert traffic navigation! The police officer gives a crisp salute: “സൂപ്പർ ഡ്രൈവർ!”',
        malayalamReaction: 'വഴിയൊരുക്കി കൊടുത്തതിന് ട്രാഫിക് പോലീസ് ബിഗ് സല്യൂട്ട് നൽകി!',
        sound: 'whistle',
      },
    ],
  },

  // 4. WAYANAD
  {
    id: 'scene_wayanad_fog',
    title: '4. Wayanad — Foggy Mountain Ghat Drive & Wild Elephant (ചുരത്തിലെ മൂടൽമഞ്ഞ്!)',
    malayalamTitle: 'വയനാട്: ചുരത്തിൽ കനത്ത മൂടൽമഞ്ഞും കാട്ടാനയും! 🌧️',
    desc: 'Dense mountain fog envelops Hairpin Bend 7 of Thamarassery Ghat, while a wild Asiatic tusker grazes calmly near the roadside bamboo.',
    malayalamDesc: 'താമരശ്ശേരി ചുരത്തിലെ 7-ാം വളവിൽ കനത്ത മൂടൽമഞ്ഞ്! വഴിയരികിലെ മുളങ്കാടുകളിൽ ഒരു കൊമ്പനാന നിൽക്കുന്നു.',
    avatar: '⛰️',
    location: 'Wayanad • Thamarassery Ghat Hairpin 7',
    choices: [
      {
        text: 'Switch on yellow fog lamps and stop at safe distance',
        malayalamText: 'ഫോഗ് ലാമ്പ് ഇട്ട് സുരക്ഷിതമായ അകലത്തിൽ നിർത്തുക',
        reward: 100,
        reaction: 'The gentle giant trumpets softly and disappears majestically into the high mist forest. An unforgettable sight!',
        malayalamReaction: 'ആന ശാന്തമായി കാട്ടിലേക്ക് കയറിപ്പോയി. മനോഹരമായ കാഴ്ച!',
        sound: 'bell',
      },
      {
        text: 'Sip hot cardamom tea from the cliffside stall while waiting',
        malayalamText: 'ചുരത്തിലെ തട്ടുകടയിൽ നിന്ന് ഏലക്കായ ചായ കുടിക്കുക',
        reward: 60,
        reaction: 'Steaming hot Wayanad tea warms your soul against the freezing mountain drizzle.',
        malayalamReaction: 'തണുത്ത കാറ്റത്ത് നല്ല ചൂട് സുലൈമാനി! ഉന്മേഷം ഇരട്ടിയായി!',
        sound: 'teaglass',
      },
    ],
  },

  // 5. MALAPPURAM
  {
    id: 'scene_malappuram_football',
    title: '5. Malappuram — Sevens Football Tournament Mania (സെവൻസ് ഫുട്ബോൾ ആവേശം!)',
    malayalamTitle: 'മലപ്പുറം: ഗ്രാമീണ സെവൻസ് ഫൈനൽ മത്സരം! ⚽',
    desc: 'Under radiant floodlights at the village stadium, Kizhakkumpuram FC and Malappuram Stars are tied 2-2 in injury time!',
    malayalamDesc: 'ഗ്രാമത്തിലെ സെവൻസ് സ്റ്റേഡിയം തിങ്ങിനിറഞ്ഞു! അവസാന നിമിഷത്തെ പെനാൽറ്റി കിക്ക് എടുക്കാൻ ആളുകൾ എഴുന്നേറ്റു നിൽക്കുന്നു!',
    avatar: '⚽',
    location: 'Malappuram • Sevens Ground Stadium',
    choices: [
      {
        text: 'Cheer with the grandstand gallery: “കമോൺ കേരളാ!”',
        malayalamText: 'ഗാലറിക്കൊപ്പം നിന്ന് ആർത്തുവിളിക്കുക!',
        reward: 110,
        reaction: 'Goooaaal! A thunderous curling strike finds the top corner! The entire stadium erupts in celebratory whistles!',
        malayalamReaction: 'ഗോൾ! പന്ത് നേരെ വലയിലേക്ക്! സ്റ്റേഡിയം ആകെ ആർത്തുവിളിച്ചു!',
        sound: 'goal',
      },
      {
        text: 'Sound the airhorn in sync with the team victory drum',
        malayalamText: 'വിക്ടറി ഡ്രമ്മിനൊപ്പം വാഹനത്തിന്റെ ഹോൺ മുഴക്കുക',
        reward: 70,
        reaction: 'The team captain runs over to high-five you through the vehicle window!',
        malayalamReaction: 'ടീം ക്യാപ്റ്റൻ സന്തോഷത്തോടെ കൈതന്ന് നന്ദി പറഞ്ഞു!',
        sound: 'airhorn',
      },
    ],
  },

  // 6. PALAKKAD
  {
    id: 'scene_palakkad_tractor',
    title: '6. Palakkad — Paddy Field Tractor in Mud Bund (നെൽപ്പാടത്തെ ട്രാക്ടർ!)',
    malayalamTitle: 'പാലക്കാട്: വരമ്പത്ത് കുടുങ്ങിയ ഫാം ട്രാക്ടർ! 🚜',
    desc: 'In the vast open paddy fields of the Palakkad Gap, a red farm tractor’s rear tire is spinning in deep monsoon clay.',
    malayalamDesc: 'പാലക്കാടൻ നെൽപ്പാടത്ത് കർഷകന്റെ ട്രാക്ടർ ചെളിയിൽ കുടുങ്ങി! വരമ്പിലൂടെ കാറ്റു വീശിയടിക്കുന്നു.',
    avatar: '🚜',
    location: 'Palakkad • Vast Emerald Paddy Fields',
    choices: [
      {
        text: 'Hook tow cable to your vehicle and pull the tractor out',
        malayalamText: 'വണ്ടി ഉപയോഗിച്ച് ട്രാക്ടർ ചെളിയിൽ നിന്ന് വലിച്ച് കയറ്റുക',
        reward: 120,
        reaction: 'Vrrroooom! The tractor pulls free with applause from the local farmers! They gift you a sack of fragrant Palakkadan Matta rice!',
        malayalamReaction: 'ട്രാക്ടർ റോഡിലേക്ക് കയറി! കർഷകർ സന്തോഷത്തോടെ പാലക്കാടൻ മട്ടയരി സമ്മാനിച്ചു!',
        sound: 'tractor',
      },
      {
        text: 'Cheer the farmer and share tender coconuts',
        malayalamText: 'കർഷകർക്ക് കരിക്കിൻ വെള്ളം വാങ്ങി നൽകുക',
        reward: 50,
        reaction: 'Refreshing sweet tender coconut under the breezy Palakkad Gap sun. True Kerala camaraderie!',
        malayalamReaction: 'തണുത്ത കരിക്ക് കുടിച്ച് വിശ്രമിച്ചു. മനസ്സ് നിറഞ്ഞു!',
        sound: 'coin',
      },
    ],
  },

  // 7. THRISSUR
  {
    id: 'scene_thrissur_pooram',
    title: '7. Thrissur — Pooram Chenda Melam & Royal Procession (തൃശൂർ പൂരം മേളം!)',
    malayalamTitle: 'തൃശൂർ: തേക്കിൻകാട് മൈതാനത്തെ ഇലഞ്ഞിത്തറ മേളം! 🎉',
    desc: 'At Thekkinkadu Maidan, hundreds of Chenda drummers and caparisoned elephants create the unforgettable rhythm of Kerala’s greatest festival.',
    malayalamDesc: 'തേക്കിൻകാട് മൈതാനത്ത് താളപ്പെരുമഴ! വർണ്ണക്കുടകളും നെറ്റിപ്പട്ടവും അണിഞ്ഞ ഗജവീരന്മാർ അണിനിരന്നു!',
    avatar: '🎉',
    location: 'Thrissur • Thekkinkadu Maidan Pooram Grounds',
    choices: [
      {
        text: 'Immerse in the Pandi Melam tempo and raise hands in rhythm',
        malayalamText: 'പാണ്ടിമേളത്തിന്റെ താളത്തിൽ കൈകളുയർത്തി ആവേശം കൊള്ളുക',
        reward: 130,
        reaction: 'The thundering crescendo of 250 master percussionists shakes the ground! Pure goosebumps!',
        malayalamReaction: 'മേളപ്പെരുമഴ! ആയിരക്കണക്കിന് ആളുകൾക്കൊപ്പം ആവേശം വാനോളമുയർന്നു!',
        sound: 'chenda',
      },
      {
        text: 'Photograph the majestic Kudamattom umbrella exchange',
        malayalamText: 'വർണ്ണശബളമായ കുടമാറ്റത്തിന്റെ മനോഹര ചിത്രം പകർത്തുക',
        reward: 85,
        reaction: 'Vibrant silk parasols flash into view against the golden evening sky. A masterpiece snapshot!',
        malayalamReaction: 'സ്വർണ്ണ വർണ്ണത്തിലുള്ള കുടമാറ്റം ക്യാമറയിൽ പതിഞ്ഞു! അത്ഭുത കാഴ്ച!',
        sound: 'bell',
      },
    ],
  },

  // 8. ERNAKULAM
  {
    id: 'scene_ernakulam_metro',
    title: '8. Ernakulam — Marine Drive & Pune Purple Line Metro Overhead (പർപ്പിൾ ലൈൻ മെട്രോ!)',
    malayalamTitle: 'എറണാകുളം: മറൈൻ ഡ്രൈവിലെ പർപ്പിൾ ലൈൻ മെട്രോ! 🚇',
    desc: 'Along the bustling high-rise coastal boulevard, the striking Pune Metro Purple Line train (Titagarh Firema coach) roars overhead with glowing amber destination displays and pantograph.',
    malayalamDesc: 'പർപ്പിൾ ലൈൻ മെട്രോ ട്രെയിൻ മുകളിലൂടെ ചീറിപ്പായുന്നു! താഴെ മറൈൻ ഡ്രൈവിലെ തിരക്കിൽ ടാക്സികളും ബസുകളും സാവധാനം നീങ്ങുന്നു.',
    avatar: '🚇',
    location: 'Ernakulam • Marine Drive Metro Viaduct',
    choices: [
      {
        text: 'Take the scenic bypass lane toward the Harbour Bridge',
        malayalamText: 'ഹാർബർ ബ്രിഡ്ജ് വഴിയുള്ള കടലോര പാതയിലേക്ക് മാറുക',
        reward: 95,
        reaction: 'Smooth sailing with a refreshing sea breeze and views of Chinese fishing nets and container ships!',
        malayalamReaction: 'കടൽക്കാറ്റേറ്റ് പാലത്തിലൂടെയുള്ള ഡ്രൈവിംഗ് അതിമനോഹരമായിരുന്നു!',
        sound: 'coin',
      },
      {
        text: 'Tune the FM radio to Malayalam retro beats and cruise',
        malayalamText: 'മലയാളം ഗാനങ്ങൾ വെച്ച് വൈകുന്നേരത്തെ ഡ്രൈവ് ആസ്വദിക്കുക',
        reward: 60,
        reaction: 'Classic Yesudas melody on the car speakers makes the city lights feel truly magical.',
        malayalamReaction: 'നല്ല പാട്ടുകൾ കേട്ട് നഗരത്തിന്റെ രാത്രിവെളിച്ചം ആസ്വദിച്ചു!',
        sound: 'bell',
      },
    ],
  },

  // 9. IDUKKI
  {
    id: 'scene_idukki_dam',
    title: '9. Idukki — Mountain Rain & Arch Dam Reservoir (ഇടുക്കി ഡാമിലെ മഴ!)',
    malayalamTitle: 'ഇടുക്കി: ആർച്ച് ഡാമിന് മുകളിലെ മലയോര മഴ! 🌧️',
    desc: 'Torrential mountain rain sweeps across Asia’s largest Arch Dam, sending misty clouds tumbling over Kuravan and Kurathi peaks.',
    malayalamDesc: 'കുറവൻ-കുറത്തി മലകൾക്കിടയിലെ കൂറ്റൻ ആർച്ച് ഡാമിൽ ശക്തമായ മഴ! തണുത്തുറഞ്ഞ കാറ്റും കോടമഞ്ഞും അണക്കെട്ടിനെ മൂടുന്നു.',
    avatar: '🌿',
    location: 'Idukki • Arch Dam Reservoir Overlook',
    choices: [
      {
        text: 'Pull over to the viewpoint and witness the misty reservoir spillway',
        malayalamText: 'ഡാം വ്യൂ പോയിന്റിൽ വണ്ടി ഒതുക്കി പ്രകൃതിഭംഗി കാണുക',
        reward: 120,
        reaction: 'Massive cascades of crystal mountain water crashing into the gorge below! The power of nature is breathtaking!',
        malayalamReaction: 'മഴയിൽ കുളിച്ചുനിൽക്കുന്ന കൂറ്റൻ ആർച്ച് ഡാം! ഗംഭീരമായ അനുഭവം!',
        sound: 'splash',
      },
      {
        text: 'Drive cautiously along the winding tea-carpeted slopes',
        malayalamText: 'തേയിലത്തോട്ടങ്ങളുടെ വളവുകളിലൂടെ ശ്രദ്ധയോടെ വണ്ടി ഓടിക്കുക',
        reward: 80,
        reaction: 'Perfect hair-pin control on the wet asphalt. The tea fragrance after fresh rain is divine.',
        malayalamReaction: 'മഴ നനഞ്ഞ തേയിലത്തോട്ടങ്ങളിലൂടെ മനോഹരമായ ഒരു ഡ്രൈവ്!',
        sound: 'bell',
      },
    ],
  },

  // 10. KOTTAYAM
  {
    id: 'scene_kottayam_rubber',
    title: '10. Kottayam — Rubber Estate Morning Latex Route (റബ്ബർ തോട്ടത്തിലെ പ്രഭാതം!)',
    malayalamTitle: 'കോട്ടയം: റബ്ബർ വെട്ടും വെളുപ്പാൻകാല യാത്രയും! 🌳',
    desc: 'On a winding country road flanked by tall rubber estates, tappers with headlamps are carrying pails of fresh white natural latex.',
    malayalamDesc: 'മീനച്ചിലാറിന്റെ തീരത്തെ റബ്ബർ തോട്ടങ്ങളിലൂടെ കർഷകർ പാൽപ്പാത്രങ്ങളുമായി പോകുന്നു. പുലർകാലത്തെ മഞ്ഞ് തങ്ങിനിൽക്കുന്നു.',
    avatar: '🌴',
    location: 'Kottayam • Rubber Estate Midland Lane',
    choices: [
      {
        text: 'Give a lift to Pappachan Chettan and his latex canister',
        malayalamText: 'പാപ്പച്ചൻ ചേട്ടന് റബ്ബർ സൊസൈറ്റിയിലേക്ക് ലിഫ്റ്റ് നൽകുക',
        reward: 90,
        reaction: 'Pappachan tells fascinating stories of old Kottayam printing presses and gives you hot Kappa & Meen Curry at his home!',
        malayalamReaction: 'പാപ്പച്ചൻ ചേട്ടൻ സന്തോഷത്തോടെ വീട്ടിൽ നിന്ന് നല്ല കപ്പയും മീൻകറിയും തന്നു സൽക്കരിച്ചു!',
        sound: 'coin',
      },
      {
        text: 'Buy freshly baked hot plum cake from the heritage bakery',
        malayalamText: 'കോട്ടയത്തെ പാരമ്പര്യ ബേക്കറിയിൽ നിന്ന് പ്ലം കേക്ക് വാങ്ങുക',
        reward: 60,
        reaction: 'Rich spiced Kottayam fruit cake melted in your mouth. Best companion for the morning road trip!',
        malayalamReaction: 'നല്ല ചൂട് പ്ലം കേക്ക്! വായയിൽ അലിയുന്ന രുചി!',
        sound: 'bell',
      },
    ],
  },

  // 11. ALAPPUZHA
  {
    id: 'scene_alappuzha_boats',
    title: '11. Alappuzha — Backwater Boat Traffic & Snake Boat Sprint (കായലിലെ ചുണ്ടൻ വള്ളം!)',
    malayalamTitle: 'ആലപ്പുഴ: കായൽ പരപ്പിലൂടെ പാഞ്ഞുവരുന്ന ചുണ്ടൻ വള്ളം! 🚤',
    desc: 'At the backwater junction where the canal meets Vembanad lake, a 100-oarsmen Chundan Vallam is practicing with thunderous Vanchipattu songs!',
    malayalamDesc: '“ആരപ്പോ... ഇരപ്പോ...” വഞ്ചിപ്പാട്ടിന്റെ താളത്തിൽ 100 തുഴച്ചിൽക്കാർ അണിനിരന്ന ചുണ്ടൻ വള്ളം കായൽ കീറിമുറിച്ച് പായുന്നു!',
    avatar: '🚤',
    location: 'Alappuzha • Punnamada Backwater Canal',
    choices: [
      {
        text: 'Board the tourist speedboat to pace alongside the snake boat',
        malayalamText: 'സ്പീഡ് ബോട്ടിൽ കയറി ചുണ്ടൻ വള്ളത്തിനൊപ്പം റേസ് ചെയ്യുക',
        reward: 140,
        reaction: 'Water sprays everywhere as the oarsmen hit 40 strokes per minute! The rhythm of the Vanchipattu echoes across the canals!',
        malayalamReaction: 'കായലിൽ ആവേശം തിരതല്ലി! വഞ്ചിപ്പാട്ടിന്റെ താളത്തിൽ ചുണ്ടൻ വള്ളം പറന്നു!',
        sound: 'splash',
      },
      {
        text: 'Wave from the wooden bridge and clap to the Vanchipattu',
        malayalamText: 'പാലത്തിൽ നിന്ന് കൈവീശി വഞ്ചിപ്പാട്ടിനൊപ്പം താളം പിടിക്കുക',
        reward: 70,
        reaction: 'The master helmsman waves his golden oar at you in gratitude!',
        malayalamReaction: 'തുഴച്ചിൽക്കാർ ഒന്നിച്ച് കൈവീശി ആവേശം പങ്കുവെച്ചു!',
        sound: 'bell',
      },
    ],
  },

  // 12. PATHANAMTHITTA
  {
    id: 'scene_pathanamthitta_forest',
    title: '12. Pathanamthitta — Sabarimala Pilgrim Forest Trail (പമ്പാ തീരത്തെ വനപാത!)',
    malayalamTitle: 'പത്തനംതിട്ട: നിബിഡ വനത്തിലൂടെയുള്ള തീർത്ഥാടന പാത! 🌲',
    desc: 'Through the towering teak and rosewood reserve forest along the holy Pamba river, rows of chanting pilgrims trek peacefully.',
    malayalamDesc: 'പമ്പാ നദിക്കരയിലെ കാട്ടുപാതയിലൂടെ തീർത്ഥാടകർ ശാന്തമായി നടന്നുപോകുന്നു. കാടിന്റെ തണുപ്പും ചന്ദനത്തിരിയുടെ സുഗന്ധവും.',
    avatar: '🌲',
    location: 'Pathanamthitta • Pamba River Forest Sanctuary',
    choices: [
      {
        text: 'Distribute cool drinking water cans to the trekking pilgrims',
        malayalamText: 'കാൽനടയായി പോകുന്നവർക്ക് ശുദ്ധജലം വിതരണം ചെയ്യുക',
        reward: 120,
        reaction: 'A chorus of “സ്വാമി ശരണമയ്യപ്പാ!” echoes through the forest trees. Immense inner peace fills your heart.',
        malayalamReaction: 'തീർത്ഥാടകർ നിറഞ്ഞ മനസ്സോടെ അനുഗ്രഹിച്ചു. കാടിന് നടുവിൽ വലിയ ആശ്വാസം!',
        sound: 'bell',
      },
      {
        text: 'Cross the swinging wooden footbridge over the rocky river rapids',
        malayalamText: 'പുഴയ്ക്ക് കുറുകെയുള്ള തടിയുടെ തൂക്കുപാലത്തിലൂടെ നടക്കുക',
        reward: 75,
        reaction: 'Crystal-clear river pebbles visible through emerald water. Nature in its purest, untouched form.',
        malayalamReaction: 'തൂക്കുപാലത്തിൽ നിന്ന് കണ്ട പുഴയുടെ ഭംഗി മനസ്സ് കവർന്നു!',
        sound: 'splash',
      },
    ],
  },

  // 13. KOLLAM
  {
    id: 'scene_kollam_harbour',
    title: '13. Kollam — Historic Fishing Harbour & Fresh Catch Auction (തുറമുഖത്തെ ലേലം!)',
    malayalamTitle: 'കൊല്ലം: തുറമുഖത്ത് വള്ളങ്ങൾ അടുക്കുന്നു, വലിയ മീൻ ലേലം! 🎣',
    desc: 'At Tangasseri fishing wharf on Ashtamudi Lake, colorful marine trawlers are landing crates of fresh Kingfish, prawns, and sardine.',
    malayalamDesc: 'തങ്കശ്ശേരി ലൈറ്റ്ഹൗസിന് താഴെ മീൻപിടുത്ത വള്ളങ്ങൾ അടുക്കുന്നു! “വിളിക്ക് മക്കളേ!” ലേലക്കാരന്റെ ഉച്ചത്തിലുള്ള വിളി മുഴങ്ങുന്നു.',
    avatar: '🌊',
    location: 'Kollam • Tangasseri Fishing Harbour Wharf',
    choices: [
      {
        text: 'Bid for a freshly landed crate of premium Tiger Prawns',
        malayalamText: 'പുതിയ കൊഞ്ചും നെയ്മീനും അടങ്ങിയ പെട്ടി ലേലത്തിൽ പിടിക്കുക',
        reward: 135,
        reaction: 'Won the auction at a bargain price! The wharf crowd cheers your sharp trading skills!',
        malayalamReaction: 'സൂപ്പർ ലേലം! നല്ല ഫ്രഷ് കടൽമത്സ്യങ്ങൾ സ്വന്തമാക്കി!',
        sound: 'coin',
      },
      {
        text: 'Climb the spiral stairs of Tangasseri red-and-white lighthouse',
        malayalamText: 'ചുവപ്പും വെളുപ്പും ലൈറ്റ്ഹൗസിന്റെ മുകളിലേക്ക് കയറുക',
        reward: 80,
        reaction: 'Panoramic 360-degree vista of the Arabian Sea meeting the 8-branched Ashtamudi Lake!',
        malayalamReaction: 'ലൈറ്റ്ഹൗസിന്റെ മുകളിൽ നിന്നുള്ള കടലിന്റെയും കായലിന്റെയും അത്ഭുത കാഴ്ച!',
        sound: 'bell',
      },
    ],
  },

  // 14. THIRUVANANTHAPURAM
  {
    id: 'scene_trivandrum_capital',
    title: '14. Thiruvananthapuram — Secretariat Junction Capital City Traffic (തലസ്ഥാന നഗരത്തിരക്ക്!)',
    malayalamTitle: 'തിരുവനന്തപുരം: സെക്രട്ടറിയേറ്റ് ജംഗ്ഷനിലെ വി.ഐ.പി ട്രാഫിക്! 🌆',
    desc: 'In front of the grand colonial pillars and clock tower of the Kerala Government Secretariat, government convoys and public city buses converge.',
    malayalamDesc: 'കേരള സെക്രട്ടറിയേറ്റിന്റെ ക്ലോക്ക് ടവറിന് മുന്നിൽ വലിയ നഗരത്തിരക്ക്! യൂണിവേഴ്സിറ്റി കോളേജും എം.ജി റോഡും സജീവമാണ്.',
    avatar: '🏛️',
    location: 'Thiruvananthapuram • Secretariat MG Road Junction',
    choices: [
      {
        text: 'Skillfully navigate the roundabout toward Kovalam Beach Highway',
        malayalamText: 'കോവളം ബീച്ച് ഹൈവേ ലക്ഷ്യമാക്കി സാവധാനം വണ്ടി തിരിക്കുക',
        reward: 150,
        reaction: 'Flawless driving through the capital city! The traffic warden signals a friendly thumbs up! Kovalam crescent sea awaits!',
        malayalamReaction: 'തലസ്ഥാന നഗരത്തിലൂടെ രാജകീയ ഡ്രൈവിംഗ്! കോവളം കടൽത്തീരത്തേക്ക് സുഗമമായ യാത്ര!',
        sound: 'airhorn',
      },
      {
        text: 'Stop by the historic Indian Coffee House for hot Cutlet & Coffee',
        malayalamText: 'ഇന്ത്യൻ കോഫി ഹൗസിൽ നിന്ന് ബീറ്റ്റൂട്ട് കട്ട്ലറ്റും കാപ്പിയും കഴിക്കുക',
        reward: 85,
        reaction: 'Iconic red brick architecture and authentic filtered Kerala coffee. The perfect conclusion to the North-to-South Mega Map journey!',
        malayalamReaction: 'പഴയ കോഫി ഹൗസിലെ ചൂട് കാപ്പിയും കട്ട്ലറ്റും! കേരള യാത്രയുടെ മധുര സമാപനം!',
        sound: 'teaglass',
      },
    ],
  },
];
