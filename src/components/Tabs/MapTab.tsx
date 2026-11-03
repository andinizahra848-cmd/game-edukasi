import React, { useState } from 'react';
import type { GameLevel, StudentProfile, Mission } from '../../types';
import { sound } from '../../utils/audio';

// Full 576x1024 Adventure Map artwork
import fullMapImg from '../../assets/islands/full_map.jpg';

interface MapTabProps {
  levels: GameLevel[];
  onSelectLevel: (lvl: number) => void;
  profile: StudentProfile;
  mission: Mission;
  onOpenProfile: () => void;
  onOpenStars: () => void;
  onOpenGems: () => void;
  onOpenSettings: () => void;
  onOpenMissions: () => void;
}

export const MapTab: React.FC<MapTabProps> = ({
  levels: _levels,
  onSelectLevel,
  profile,
  mission,
  onOpenProfile,
  onOpenStars,
  onOpenGems,
  onOpenSettings,
  onOpenMissions,
}) => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleIslandClick = (id: number, name: string) => {
    sound.playPop();
    if (id === 1) {
      onSelectLevel(1);
    } else {
      showToast(`🔒 Selesaikan Pulau Bentuk untuk membuka ${name}!`);
    }
  };

  return (
    <div className="mpt-fullscreen-page">
      {/* ── Base 1-Screen Map Art (576x1024, zero scroll) ── */}
      <img
        src={fullMapImg}
        alt="Peta Petualangan Geometri"
        className="mpt-fullscreen-bg"
      />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="mpt-toast">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TOP BAR INTERACTIVE HOTSPOTS & DYNAMIC OVERLAYS
         ══════════════════════════════════════════════════════ */}

      {/* 1. Profil Siswa */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-profil"
        onClick={() => { sound.playPop(); onOpenProfile(); }}
        title={`Profil Siswa: ${profile.name} (Level ${profile.level})`}
      >
        <span className="mpt-live-name">{profile.name}</span>
        <span className="mpt-live-level">Level {profile.level}</span>
      </button>

      {/* 2. Bintang (Stars) */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-stars"
        onClick={() => { sound.playPop(); onOpenStars(); }}
        title={`Bintang: ${profile.stars}`}
      >
        <span className="mpt-live-stars-text">{profile.stars}</span>
      </button>

      {/* 3. Permata (Gems) */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-gems"
        onClick={() => { sound.playPop(); onOpenGems(); }}
        title={`Permata: ${profile.gems}`}
      >
        <span className="mpt-live-gems-text">{profile.gems}</span>
      </button>

      {/* 4. Pengaturan (Settings Gear) */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-settings"
        onClick={() => { sound.playPop(); onOpenSettings(); }}
        title="Pengaturan Game"
      />

      {/* ══════════════════════════════════════════════════════
          HEADER ROW HOTSPOTS
         ══════════════════════════════════════════════════════ */}

      {/* 5. Tombol Kembali (‹) */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-back"
        onClick={() => sound.playPop()}
        title="Kembali"
      />

      {/* 6. Banner Judul Peta */}
      <div
        className="mpt-hotspot-btn mpt-hs-title"
        onClick={() => {
          sound.playPop();
          showToast('🗺️ Jelajahi 5 Pulau Geometri dan kumpulkan semua bentuk!');
        }}
        title="Peta Petualangan Bangun Datar"
      />

      {/* 7. Kartu Misi Hari Ini */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-mission"
        onClick={() => { sound.playPop(); onOpenMissions(); }}
        title={`Misi: ${mission.title} (${mission.progress}/${mission.total})`}
      />

      {/* ══════════════════════════════════════════════════════
          PULAU 1: PULAU BENTUK (INTERACTIVE NODES)
         ══════════════════════════════════════════════════════ */}

      {/* Island 1 General Tap Area */}
      <div
        className="mpt-island-hitbox mpt-island-1-hitbox"
        onClick={() => handleIslandClick(1, 'Pulau Bentuk')}
        title="Pulau Bentuk (Level 1-3)"
      />

      {/* Node 1: Active Blue Level 1 Button with Pulsing Glow Ring */}
      <button
        type="button"
        className="mpt-node-btn mpt-node-1-active"
        onClick={(e) => {
          e.stopPropagation();
          sound.playPop();
          onSelectLevel(1);
        }}
        title="Mulai Level 1: Gerbang Pulau Bentuk"
      >
        <span className="mpt-pulse-ring" />
      </button>

      {/* Node 2: Level 2 Button */}
      <button
        type="button"
        className="mpt-node-btn mpt-node-2"
        onClick={(e) => {
          e.stopPropagation();
          sound.playPop();
          onSelectLevel(2);
        }}
        title="Level 2: Hutan Bentuk"
      />

      {/* Node 3: Level 3 Button */}
      <button
        type="button"
        className="mpt-node-btn mpt-node-3"
        onClick={(e) => {
          e.stopPropagation();
          sound.playPop();
          onSelectLevel(3);
        }}
        title="Level 3: Kastil Bentuk"
      />

      {/* ══════════════════════════════════════════════════════
          PULAU 2 - 5 HITBOXES (TAP FOR LOCK MESSAGE)
         ══════════════════════════════════════════════════════ */}

      {/* Pulau 2: Hutan Segi Empat */}
      <div
        className="mpt-island-hitbox mpt-island-2-hitbox"
        onClick={() => handleIslandClick(2, 'Hutan Segi Empat')}
        title="Pulau 2: Hutan Segi Empat (Terkunci)"
      />

      {/* Pulau 3: Pegunungan Segitiga */}
      <div
        className="mpt-island-hitbox mpt-island-3-hitbox"
        onClick={() => handleIslandClick(3, 'Pegunungan Segitiga')}
        title="Pulau 3: Pegunungan Segitiga (Terkunci)"
      />

      {/* Pulau 4: Danau Lingkaran */}
      <div
        className="mpt-island-hitbox mpt-island-4-hitbox"
        onClick={() => handleIslandClick(4, 'Danau Lingkaran')}
        title="Pulau 4: Danau Lingkaran (Terkunci)"
      />

      {/* Pulau 5: Kastil Geometri */}
      <div
        className="mpt-island-hitbox mpt-island-5-hitbox"
        onClick={() => handleIslandClick(5, 'Kastil Geometri')}
        title="Pulau 5: Kastil Geometri (Terkunci)"
      />

      {/* ══════════════════════════════════════════════════════
          KOLEKSI BENTUK (TREASURE CHEST)
         ══════════════════════════════════════════════════════ */}
      <button
        type="button"
        className="mpt-hotspot-btn mpt-hs-chest"
        onClick={() => {
          sound.playPop();
          showToast('🏆 Koleksi Bentuk: 8 dari 24 bangun datar terkumpul!');
        }}
        title="Koleksi Bentuk (8/24)"
      />
    </div>
  );
};
