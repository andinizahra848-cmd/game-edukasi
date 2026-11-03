import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onResetProgress,
}) => {
  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(!sound.isMuted());
  const [hapticsOn, setHapticsOn] = useState(true);

  if (!isOpen) return null;

  const handleToggleSfx = () => {
    const nextVal = !sfxOn;
    setSfxOn(nextVal);
    sound.setMuted(!nextVal);
    if (nextVal) sound.playPop();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">⚙️</span>
            <div>
              <h2 className="modal-title">Pengaturan Game</h2>
              <p className="modal-subtitle">Atur kenyamanan bermain dan info proyek</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="setting-toggle-row">
            <div className="setting-label">
              <span className="setting-name">🎵 Musik Latar</span>
              <span className="setting-hint">Musik petualangan ceria</span>
            </div>
            <button 
              type="button" 
              className={`toggle-switch ${musicOn ? 'on' : 'off'}`}
              onClick={() => {
                sound.playPop();
                setMusicOn(!musicOn);
              }}
            >
              <div className="toggle-thumb" />
            </button>
          </div>

          <div className="setting-toggle-row">
            <div className="setting-label">
              <span className="setting-name">🔊 Efek Suara (SFX)</span>
              <span className="setting-hint">Suara tombol, bintang, dan kemenangan</span>
            </div>
            <button 
              type="button" 
              className={`toggle-switch ${sfxOn ? 'on' : 'off'}`}
              onClick={handleToggleSfx}
            >
              <div className="toggle-thumb" />
            </button>
          </div>

          <div className="setting-toggle-row">
            <div className="setting-label">
              <span className="setting-name">📳 Getaran (Haptics)</span>
              <span className="setting-hint">Umpan balik saat menyentuh tombol di HP</span>
            </div>
            <button 
              type="button" 
              className={`toggle-switch ${hapticsOn ? 'on' : 'off'}`}
              onClick={() => {
                sound.playPop();
                setHapticsOn(!hapticsOn);
              }}
            >
              <div className="toggle-thumb" />
            </button>
          </div>

          <div className="info-box-dev">
            <h4>📖 Informasi Game & Akademik</h4>
            <div className="info-line">
              <strong>Judul Game:</strong> Petualangan Bangun Datar
            </div>
            <div className="info-line">
              <strong>Platform:</strong> Mobile Web & Android (Capacitor)
            </div>
            <div className="info-line">
              <strong>Tujuan:</strong> Pembelajaran Geometri Interaktif Siswa SD
            </div>
            <div className="info-line">
              <strong>Status:</strong> Siap untuk Evaluasi Dosen 🎓
            </div>
          </div>

          <div className="danger-zone">
            <button 
              type="button" 
              className="btn-danger-reset"
              onClick={() => {
                sound.playPop();
                if (window.confirm('Apakah kamu yakin ingin mereset progres game ke awal?')) {
                  onResetProgress();
                  onClose();
                }
              }}
            >
              🔄 Reset Progres Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
