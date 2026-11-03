import React from 'react';
import type { TabType } from '../types';
import { sound } from '../utils/audio';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    {
      id: 'beranda' as TabType,
      label: 'Beranda',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: 'peta' as TabType,
      label: 'Peta',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
    },
    {
      id: 'prestasi' as TabType,
      label: 'Prestasi',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
          <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
          <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
          <line x1="12" y1="16" x2="12" y2="21" />
          <line x1="8" y1="21" x2="16" y2="21" />
        </svg>
      ),
    },
    {
      id: 'materi' as TabType,
      label: 'Materi',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      ),
    },
    {
      id: 'profil' as TabType,
      label: 'Profil',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              sound.playPop();
              onTabChange(tab.id);
            }}
          >
            <div className={`nav-icon-wrapper ${isActive ? 'active-icon-pill' : ''}`}>
              {tab.icon}
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
