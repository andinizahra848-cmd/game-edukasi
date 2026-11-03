import React from 'react';
import type { Mission } from '../types';
import { sound } from '../utils/audio';

interface DailyMissionCardProps {
  mission: Mission;
  onClick: () => void;
}

export const DailyMissionCard: React.FC<DailyMissionCardProps> = ({ mission, onClick }) => {
  const percentage = Math.min(100, Math.round((mission.progress / mission.total) * 100));

  return (
    <div 
      className="daily-mission-card"
      onClick={() => {
        sound.playPop();
        onClick();
      }}
      role="button"
      tabIndex={0}
    >
      <div className="mission-icon-container">
        {/* Blue Clipboard Icon matching photo */}
        <svg viewBox="0 0 36 40" width="32" height="34" fill="none">
          <rect x="3" y="6" width="30" height="32" rx="6" fill="#38bdf8" />
          <rect x="6" y="9" width="24" height="26" rx="4" fill="#ffffff" />
          {/* Clipboard Top Clip */}
          <rect x="12" y="3" width="12" height="6" rx="2" fill="#0284c7" />
          <circle cx="18" cy="6" r="1.5" fill="#ffffff" />
          {/* Check lines */}
          <path d="M10 16L13 19L19 13" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="10" y1="23" x2="22" y2="23" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="28" x2="18" y2="28" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mission-info">
        <div className="mission-header-row">
          <span className="mission-title">{mission.title}</span>
          <svg className="mission-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <div className="mission-desc">{mission.description}</div>
        <div className="mission-progress-row">
          <div className="mission-progress-track">
            <div 
              className="mission-progress-fill" 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="mission-progress-text">{mission.progress}/{mission.total}</span>
        </div>
      </div>
    </div>
  );
};
