import { useState } from 'react';
import './App.css';
import type { TabType, StudentProfile, Mission, GameLevel } from './types';
import { initialLevels } from './data/levelsData';
import { HomeTab } from './components/Tabs/HomeTab';
import { MapTab } from './components/Tabs/MapTab';
import { AchievementsTab } from './components/Tabs/AchievementsTab';
import { MaterialsTab } from './components/Tabs/MaterialsTab';
import { ProfileTab } from './components/Tabs/ProfileTab';
import { BottomNav } from './components/BottomNav';
import { MulaiAdventureModal } from './components/MulaiAdventureModal';
import { KenaliBangunDatarModal } from './components/KenaliBangunDatarModal';
import { SettingsModal } from './components/SettingsModal';
import { ProfileModal } from './components/ProfileModal';
import { CurrencyModal } from './components/CurrencyModal';
import { DailyMissionsModal } from './components/DailyMissionsModal';
import { sound } from './utils/audio';

function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('beranda');

  // Levels progression state with persistence in localStorage
  const [levels, setLevels] = useState<GameLevel[]>(() => {
    try {
      const saved = localStorage.getItem('petualangan_levels');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return initialLevels;
  });

  const [activeLevelId, setActiveLevelId] = useState<number>(1);

  // Student profile initialized with exact details from the design photo
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('petualangan_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return {
      name: 'Rizki',
      role: 'Siswa',
      level: 3,
      currentXp: 450,
      nextLevelXp: 600,
      stars: 120,
      gems: 45,
    };
  });

  // Daily missions initialized with exact details from the design photo
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'm1',
      title: 'Misi Hari Ini',
      description: 'Selesaikan 3 level dengan nilai sempurna',
      progress: 1,
      total: 3,
      rewardType: 'star',
      rewardAmount: 50,
      claimed: false,
    },
    {
      id: 'm2',
      title: 'Kenali 4 Bangun Datar',
      description: 'Buka dan pelajari 4 jenis bangun datar',
      progress: 4,
      total: 4,
      rewardType: 'gem',
      rewardAmount: 20,
      claimed: false,
    },
    {
      id: 'm3',
      title: 'Tantangan Lembah Segitiga',
      description: 'Jawab semua kuis segitiga tanpa salah',
      progress: 1,
      total: 1,
      rewardType: 'star',
      rewardAmount: 30,
      claimed: false,
    },
  ]);

  // Modals state
  const [isAdventureOpen, setIsAdventureOpen] = useState(false);
  const [isShapesOpen, setIsShapesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currencyModalType, setCurrencyModalType] = useState<'star' | 'gem' | null>(null);
  const [isMissionsOpen, setIsMissionsOpen] = useState(false);

  // Rewards handler
  const handleRewardStars = (amount: number) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        stars: prev.stars + amount,
      };
      try {
        localStorage.setItem('petualangan_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleRewardGems = (amount: number) => {
    setProfile((prev) => {
      const updated = {
        ...prev,
        gems: prev.gems + amount,
      };
      try {
        localStorage.setItem('petualangan_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => {
      const next = {
        ...prev,
        ...updated,
      };
      try {
        localStorage.setItem('petualangan_profile', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Automatic level progression handler:
  // Completing level N automatically unlocks level N + 1!
  const handleCompleteLevel = (levelId: number, starsEarned: number) => {
    setLevels((prevLevels) => {
      const updated = prevLevels.map((lvl) => {
        if (lvl.id === levelId) {
          return {
            ...lvl,
            completed: true,
            stars: Math.max(lvl.stars, starsEarned >= 3 ? 3 : starsEarned >= 2 ? 2 : 1),
          };
        }
        // AUTOMATICALLY UNLOCK NEXT LEVEL!
        if (lvl.id === levelId + 1) {
          return {
            ...lvl,
            unlocked: true,
          };
        }
        return lvl;
      });

      try {
        localStorage.setItem('petualangan_levels', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Advance daily mission progress
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === 'm1') {
          return { ...m, progress: Math.min(m.total, m.progress + 1) };
        }
        return m;
      })
    );

    // Add student XP & advance level if full
    setProfile((prev) => {
      const nextXp = prev.currentXp + 60;
      let nextLvl = prev.level;
      let finalXp = nextXp;
      let finalNextXp = prev.nextLevelXp;
      if (nextXp >= prev.nextLevelXp) {
        nextLvl += 1;
        finalXp = nextXp - prev.nextLevelXp;
        finalNextXp = Math.round(prev.nextLevelXp * 1.3);
      }
      const updated = {
        ...prev,
        level: nextLvl,
        currentXp: finalXp,
        nextLevelXp: finalNextXp,
      };
      try {
        localStorage.setItem('petualangan_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClaimMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && !m.claimed) {
          if (m.rewardType === 'star') {
            handleRewardStars(m.rewardAmount);
          } else {
            handleRewardGems(m.rewardAmount);
          }
          return { ...m, claimed: true };
        }
        return m;
      })
    );
  };

  const handleResetProgress = () => {
    setLevels(initialLevels);
    try {
      localStorage.removeItem('petualangan_levels');
      localStorage.removeItem('petualangan_profile');
    } catch {}
    setProfile({
      name: 'Rizki',
      role: 'Siswa',
      level: 3,
      currentXp: 450,
      nextLevelXp: 600,
      stars: 120,
      gems: 45,
    });
    sound.playSuccess();
  };

  return (
    <div className="game-app-wrapper">
      {/* Mobile Game Container */}
      <div className={`game-mobile-container tab-${currentTab}`}>
        {/* Main Tab View */}
        <main className="game-screen-content">
          {currentTab === 'beranda' && (
            <HomeTab
              profile={profile}
              mission={missions[0]}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenStars={() => setCurrencyModalType('star')}
              onOpenGems={() => setCurrencyModalType('gem')}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenMissions={() => setIsMissionsOpen(true)}
              onStartAdventure={() => {
                // Open highest unlocked level
                const highest = [...levels].reverse().find((l) => l.unlocked) || levels[0];
                setActiveLevelId(highest.id);
                setIsAdventureOpen(true);
              }}
              onOpenKenaliBangunDatar={() => setIsShapesOpen(true)}
              onTabChange={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'peta' && (
            <MapTab
              levels={levels}
              onSelectLevel={(lvlId) => {
                setActiveLevelId(lvlId);
                setIsAdventureOpen(true);
              }}
              profile={profile}
              mission={missions[0]}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenStars={() => setCurrencyModalType('star')}
              onOpenGems={() => setCurrencyModalType('gem')}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenMissions={() => setIsMissionsOpen(true)}
            />
          )}

          {currentTab === 'prestasi' && <AchievementsTab />}

          {currentTab === 'materi' && <MaterialsTab />}

          {currentTab === 'profil' && (
            <ProfileTab
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onOpenSettings={() => setIsSettingsOpen(true)}
            />
          )}
        </main>

        {/* Docked Floating Bottom Navigation Bar (Shown on other tabs) */}
        {currentTab !== 'beranda' && (
          <BottomNav
            currentTab={currentTab}
            onTabChange={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* Interactive Adventure Modal (Kept inside mobile container to enforce exact 576:1024 phone ratio) */}
        <MulaiAdventureModal
          isOpen={isAdventureOpen}
          levels={levels}
          initialLevelId={activeLevelId}
          onClose={() => setIsAdventureOpen(false)}
          onRewardStars={handleRewardStars}
          onCompleteLevel={handleCompleteLevel}
        />
      </div>

      {/* Interactive Modals */}
      <KenaliBangunDatarModal
        isOpen={isShapesOpen}
        onClose={() => setIsShapesOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetProgress={handleResetProgress}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />

      <CurrencyModal
        isOpen={currencyModalType !== null}
        type={currencyModalType || 'star'}
        count={currencyModalType === 'star' ? profile.stars : profile.gems}
        onClose={() => setCurrencyModalType(null)}
        onAdd={(amount) => {
          if (currencyModalType === 'star') handleRewardStars(amount);
          else handleRewardGems(amount);
        }}
      />

      <DailyMissionsModal
        isOpen={isMissionsOpen}
        onClose={() => setIsMissionsOpen(false)}
        missions={missions}
        onClaim={handleClaimMission}
      />
    </div>
  );
}

export default App;