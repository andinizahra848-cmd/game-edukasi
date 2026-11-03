import React from 'react';
import type { StudentProfile } from '../types';
import { sound } from '../utils/audio';

interface TopBarProps {
  profile: StudentProfile;
  onOpenProfile: () => void;
  onOpenStars: () => void;
  onOpenGems: () => void;
  onOpenSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  profile,
  onOpenProfile,
  onOpenStars,
  onOpenGems,
  onOpenSettings,
}) => {
  return (
    <header className="top-bar">
      {/* Profile Card */}
      <button 
        type="button" 
        className="profile-badge" 
        onClick={() => { sound.playPop(); onOpenProfile(); }}
        title="Lihat Profil Siswa"
      >
        <div className="avatar-wrapper">
          {/* Cartoon boy avatar matching the photo */}
          <svg className="avatar-svg" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" fill="#38bdf8" />
            {/* Hair */}
            <path d="M16 28C16 18 24 12 34 12C44 12 48 18 48 26C48 30 46 32 44 32C42 26 40 24 36 24C32 24 30 27 26 27C22 27 18 26 16 28Z" fill="#1e293b" />
            <path d="M20 20C22 14 30 14 36 14C42 14 46 17 46 22C44 20 40 18 36 19C30 20 26 23 20 20Z" fill="#0f172a" />
            {/* Face */}
            <ellipse cx="32" cy="34" rx="14" ry="15" fill="#fde047" opacity="0.3" />
            <ellipse cx="32" cy="35" rx="13" ry="14" fill="#fed7aa" />
            {/* Ears */}
            <circle cx="18" cy="36" r="3.5" fill="#fed7aa" />
            <circle cx="46" cy="36" r="3.5" fill="#fed7aa" />
            {/* Eyes */}
            <circle cx="28" cy="33" r="2.2" fill="#1e293b" />
            <circle cx="36" cy="33" r="2.2" fill="#1e293b" />
            <circle cx="28.8" cy="32.2" r="0.8" fill="#ffffff" />
            <circle cx="36.8" cy="32.2" r="0.8" fill="#ffffff" />
            {/* Smile */}
            <path d="M29 39C30.5 41 33.5 41 35 39" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
            {/* Shirt / Collar */}
            <path d="M22 48C22 44 26 43 32 43C38 43 42 44 42 48V52H22V48Z" fill="#0284c7" />
            <path d="M28 43L32 47L36 43" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="profile-details">
          <div className="profile-role">{profile.role || 'Siswa'}</div>
          <div className="profile-name">{profile.name}</div>
          <div className="level-bar-container">
            <div 
              className="level-bar-fill" 
              style={{ width: `${Math.min(100, Math.max(10, (profile.currentXp / profile.nextLevelXp) * 100))}%` }}
            />
            <span className="level-text">Level {profile.level}</span>
          </div>
        </div>
      </button>

      {/* Currencies & Settings */}
      <div className="top-right-group">
        {/* Stars */}
        <button 
          type="button" 
          className="currency-pill star-pill"
          onClick={() => { sound.playPop(); onOpenStars(); }}
          title="Bintang Petualang"
        >
          <div className="currency-icon star-icon-glow">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path 
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                fill="#fbbf24" 
                stroke="#d97706" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />
              <path 
                d="M12 5L14 9.5L18.5 10.2L15 13.5L16 18L12 15.5L8 18L9 13.5L5.5 10.2L10 9.5L12 5Z" 
                fill="#fef08a" 
              />
            </svg>
          </div>
          <span className="currency-count">{profile.stars}</span>
          <span className="plus-btn">+</span>
        </button>

        {/* Gems */}
        <button 
          type="button" 
          className="currency-pill gem-pill"
          onClick={() => { sound.playPop(); onOpenGems(); }}
          title="Permata Ajaib"
        >
          <div className="currency-icon gem-icon-glow">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path 
                d="M6 3L2 9L12 21L22 9L18 3H6Z" 
                fill="#38bdf8" 
                stroke="#0284c7" 
                strokeWidth="1.5" 
                strokeLinejoin="round" 
              />
              <path 
                d="M2 9H22M12 21L7 9L10 3M12 21L17 9L14 3" 
                stroke="#bae6fd" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
          <span className="currency-count">{profile.gems}</span>
          <span className="plus-btn">+</span>
        </button>

        {/* Settings Button */}
        <button 
          type="button" 
          className="settings-circle-btn"
          onClick={() => { sound.playPop(); onOpenSettings(); }}
          title="Pengaturan"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  );
};
