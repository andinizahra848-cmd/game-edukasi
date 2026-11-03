export type TabType = 'beranda' | 'peta' | 'prestasi' | 'materi' | 'profil';

export interface StudentProfile {
  name: string;
  role: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  stars: number;
  gems: number;
  avatarUrl?: string;
  avatarId?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  rewardType: 'star' | 'gem';
  rewardAmount: number;
  claimed: boolean;
}

export interface BangunDatarItem {
  id: string;
  name: string;
  englishName: string;
  color: string;
  description: string;
  sisi: number | string;
  sudut: number | string;
  luasRumus: string;
  kelilingRumus: string;
  contoh: string[];
  funFact: string;
}

export interface GameLevel {
  id: number;
  name: string;
  worldName: string;
  unlocked: boolean;
  completed: boolean;
  stars: number;
  description: string;
  emoji: string;
}

