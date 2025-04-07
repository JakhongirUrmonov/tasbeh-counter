export interface Dhikr {
  id: string;
  name: string;
  arabic: string;
  targetCount: number;
  isCustom?: boolean;
}

export const DEFAULT_DHIKR_LIST: Dhikr[] = [
  {
    id: "subhanallah",
    name: "SubhanAllah",
    arabic: "سُبْحَانَ اللَّهِ",
    targetCount: 33,
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    targetCount: 33,
  },
  {
    id: "allahuakbar",
    name: "Allahu Akbar",
    arabic: "اللَّهُ أَكْبَرُ",
    targetCount: 33,
  },
  {
    id: "laillahaillallah",
    name: "La ilaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    targetCount: 100,
  },
  {
    id: "astaghfirullah",
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    targetCount: 100,
  },
];
