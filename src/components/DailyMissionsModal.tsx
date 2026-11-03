import React from 'react';
import type { Mission } from '../types';
import { sound } from '../utils/audio';

interface DailyMissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  missions: Mission[];
  onClaim: (missionId: string) => void;
}

export const DailyMissionsModal: React.FC<DailyMissionsModalProps> = ({
  isOpen,
  onClose,
  missions,
  onClaim,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container missions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">📋</span>
            <div>
              <h2 className="modal-title">Misi Hari Ini</h2>
              <p className="modal-subtitle">Selesaikan tugas harian untuk dapat hadiah!</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="missions-list">
            {missions.map((m) => {
              const isCompleted = m.progress >= m.total;
              const pct = Math.min(100, Math.round((m.progress / m.total) * 100));

              return (
                <div key={m.id} className={`mission-list-card ${isCompleted ? 'completed' : ''}`}>
                  <div className="mission-list-top">
                    <div className="mission-list-title-group">
                      <span className="mission-list-icon">{m.rewardType === 'star' ? '⭐' : '💎'}</span>
                      <div>
                        <div className="mission-list-title">{m.title}</div>
                        <div className="mission-list-desc">{m.description}</div>
                      </div>
                    </div>
                    <div className="mission-reward-tag">
                      +{m.rewardAmount} {m.rewardType === 'star' ? '⭐' : '💎'}
                    </div>
                  </div>

                  <div className="mission-list-bottom">
                    <div className="mission-progress-track">
                      <div className="mission-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="mission-progress-text">{m.progress}/{m.total}</span>

                    {isCompleted ? (
                      <button
                        type="button"
                        className={`btn-claim-reward ${m.claimed ? 'claimed' : 'active'}`}
                        disabled={m.claimed}
                        onClick={() => {
                          if (!m.claimed) {
                            sound.playSuccess();
                            onClaim(m.id);
                          }
                        }}
                      >
                        {m.claimed ? 'Selesai ✓' : 'Klaim Hadiah 🎁'}
                      </button>
                    ) : (
                      <span className="in-progress-badge">Sedang Berjalan</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-huge-action" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
