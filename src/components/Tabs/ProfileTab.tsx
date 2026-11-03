import React, { useState } from 'react';
import type { StudentProfile } from '../../types';
import { sound } from '../../utils/audio';
import { AvatarRenderer, avatarList } from '../AvatarRenderer';

interface ProfileTabProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onOpenSettings: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  onUpdateProfile,
  onOpenSettings,
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);

  const handleSaveName = () => {
    if (name.trim()) {
      sound.playSuccess();
      onUpdateProfile({ name: name.trim() });
      setEditing(false);
    }
  };

  const handleSelectAvatar = (avatarId: string) => {
    sound.playPop();
    onUpdateProfile({ avatarId });
  };

  return (
    <div className="tab-scroll-page profile-page">
      <div className="tab-page-header">
        <h2 className="tab-page-title">👤 Profil Siswa</h2>
        <p className="tab-page-desc">Informasi akun dan catatan belajar</p>
      </div>

      <div className="profile-tab-card">
        <div className="avatar-big-circle">
          <AvatarRenderer avatarId={profile.avatarId || 'boy1'} size={82} />
        </div>

        {editing ? (
          <div className="name-edit-box">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input-field"
              placeholder="Ketik nama siswa..."
              autoFocus
            />
            <button type="button" className="btn-save-name" onClick={handleSaveName}>
              Simpan
            </button>
          </div>
        ) : (
          <div className="name-display-box">
            <h3 className="profile-student-name">{profile.name}</h3>
            <button
              type="button"
              className="btn-edit-pencil"
              onClick={() => {
                sound.playPop();
                setName(profile.name);
                setEditing(true);
              }}
            >
              ✏️ Ganti Nama
            </button>
          </div>
        )}

        <div className="student-badge-pill">
          {profile.role} • Level {profile.level} • SDN 1 Cerdas
        </div>

        {/* Avatar Selection Pills */}
        <div className="avatar-picker-section in-tab">
          <h4 className="avatar-picker-title">Pilih Karakter Avatar:</h4>
          <div className="avatar-options-grid in-tab-grid">
            {avatarList.map((av) => {
              const isSelected = (profile.avatarId || 'boy1') === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  className={`avatar-option-btn in-tab-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectAvatar(av.id)}
                  title={av.name}
                >
                  <AvatarRenderer avatarId={av.id} size={40} />
                  <span className="avatar-opt-name">{av.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="profile-stats-row">
          <div className="p-stat">
            <span className="p-num">{profile.stars} ⭐</span>
            <span className="p-sub">Bintang Petualang</span>
          </div>
          <div className="p-stat">
            <span className="p-num">{profile.gems} 💎</span>
            <span className="p-sub">Permata Ajaib</span>
          </div>
          <div className="p-stat">
            <span className="p-num">Level {profile.level} 🎖️</span>
            <span className="p-sub">Peringkat Siswa</span>
          </div>
        </div>

        <div className="profile-actions-list">
          <button
            type="button"
            className="profile-menu-btn"
            onClick={() => {
              sound.playPop();
              onOpenSettings();
            }}
          >
            <span>⚙️ Pengaturan & Info Game</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
};
