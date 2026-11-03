import React, { useState } from 'react';
import type { StudentProfile } from '../types';
import { sound } from '../utils/audio';
import { AvatarRenderer, avatarList } from './AvatarRenderer';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(profile.name);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarId || 'boy1');

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (inputName.trim()) {
      sound.playSuccess();
      onUpdateProfile({ name: inputName.trim() });
      setIsEditing(false);
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    sound.playPop();
    setSelectedAvatar(avatarId);
    onUpdateProfile({ avatarId });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">👤</span>
            <div>
              <h2 className="modal-title">Profil Petualang</h2>
              <p className="modal-subtitle">Kartu identitas siswa dan pencapaian</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Hero Profile Card */}
          <div className="profile-hero-card">
            <div className="profile-avatar-large">
              <AvatarRenderer avatarId={selectedAvatar} size={74} />
            </div>

            <div className="profile-identity">
              {isEditing ? (
                <div className="edit-name-group">
                  <input
                    type="text"
                    className="name-input-field"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    maxLength={20}
                    placeholder="Ketik nama..."
                    autoFocus
                  />
                  <button type="button" className="btn-save-name" onClick={handleSaveName}>
                    Simpan
                  </button>
                </div>
              ) : (
                <div className="display-name-group">
                  <h3 className="profile-name-title">{profile.name}</h3>
                  <button
                    type="button"
                    className="btn-edit-pencil"
                    onClick={() => {
                      sound.playPop();
                      setInputName(profile.name);
                      setIsEditing(true);
                    }}
                    title="Ubah Nama Siswa"
                  >
                    ✏️
                  </button>
                </div>
              )}
              <span className="profile-role-tag">{profile.role} • Kelas 4 SD</span>
            </div>
          </div>

          {/* Avatar Selector Section */}
          <div className="avatar-picker-section">
            <h4 className="avatar-picker-title">🎨 Pilih Karakter Avatar</h4>
            <div className="avatar-options-grid">
              {avatarList.map((av) => {
                const isSelected = (profile.avatarId || 'boy1') === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    className={`avatar-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectAvatar(av.id)}
                    title={av.name}
                  >
                    <AvatarRenderer avatarId={av.id} size={46} />
                    <span className="avatar-opt-name">{av.name.split(' ')[0]}</span>
                    {isSelected && <span className="avatar-check-badge">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <span className="stat-number">{profile.stars}</span>
              <span className="stat-label">Bintang</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">💎</span>
              <span className="stat-number">{profile.gems}</span>
              <span className="stat-label">Permata</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🎖️</span>
              <span className="stat-number">Level {profile.level}</span>
              <span className="stat-label">Peringkat</span>
            </div>
          </div>

          {/* XP Bar */}
          <div className="xp-section">
            <div className="xp-labels">
              <span>Pengalaman (XP)</span>
              <span>
                {profile.currentXp} / {profile.nextLevelXp} XP
              </span>
            </div>
            <div className="xp-track">
              <div
                className="xp-bar"
                style={{ width: `${Math.min(100, (profile.currentXp / profile.nextLevelXp) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-huge-action" onClick={onClose}>
            Simpan & Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
