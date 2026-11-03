import React, { useState } from 'react';
import type { StudentProfile, Mission, TabType } from '../../types';
import { sound } from '../../utils/audio';

interface HomeTabProps {
  profile: StudentProfile;
  mission: Mission;
  onOpenProfile: () => void;
  onOpenStars: () => void;
  onOpenGems: () => void;
  onOpenSettings: () => void;
  onOpenMissions: () => void;
  onStartAdventure: () => void;
  onOpenKenaliBangunDatar: () => void;
  onTabChange: (tab: TabType) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  profile,
  mission,
  onOpenProfile,
  onOpenStars,
  onOpenGems,
  onOpenSettings,
  onOpenMissions,
  onStartAdventure,
  onOpenKenaliBangunDatar,
  onTabChange,
}) => {
  const [characterQuote, setCharacterQuote] = useState<string | null>(null);

  const handleCharacterClick = () => {
    sound.playPop();
    const quotes = [
      `Halo ${profile.name}! Aku Segitiga, ayo berpetualang! 🎒✨`,
      'Aku punya 3 sisi dan 3 titik sudut! 📐',
      'Ayo selesaikan tantangan hari ini! ⭐',
      'Teman-temanku menunggumu! 🔴 🟦 🟣',
    ];
    setCharacterQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeout(() => setCharacterQuote(null), 3000);
  };

  return (
    <div className="home-screen-view">

      {/* ====================================================
          Hotspot transparan di atas elemen bawaan background.
          Tidak ada HTML visual — hanya area klik yang fungsional.
          ==================================================== */}

      {/* Profil (kiri atas) */}
      <button
        type="button"
        className="hs hs-profile"
        onClick={() => { sound.playPop(); onOpenProfile(); }}
        aria-label="Buka Profil"
      />

      {/* Bintang (kanan atas, pill 1) */}
      <button
        type="button"
        className="hs hs-stars"
        onClick={() => { sound.playPop(); onOpenStars(); }}
        aria-label="Lihat Bintang"
      />

      {/* Permata (kanan atas, pill 2) */}
      <button
        type="button"
        className="hs hs-gems"
        onClick={() => { sound.playPop(); onOpenGems(); }}
        aria-label="Lihat Permata"
      />

      {/* Pengaturan (pojok kanan atas) */}
      <button
        type="button"
        className="hs hs-settings"
        onClick={() => { sound.playPop(); onOpenSettings(); }}
        aria-label="Pengaturan"
      />

      {/* Misi Hari Ini (kanan, bawah pill) */}
      <button
        type="button"
        className="hs hs-mission"
        onClick={() => { sound.playPop(); onOpenMissions(); }}
        aria-label={`Misi: ${mission.title}`}
      />

      {/* Tombol Mulai Petualangan (tengah) */}
      <button
        type="button"
        className="hs hs-play"
        onClick={() => { sound.playAdventureStart(); onStartAdventure(); }}
        aria-label="Mulai Petualangan"
      />

      {/* Papan Kayu — Kenali Bangun Datar (kiri bawah) */}
      <button
        type="button"
        className="hs hs-wooden-sign"
        onClick={() => { sound.playPop(); onOpenKenaliBangunDatar(); }}
        aria-label="Kenali Bangun Datar"
      />

      {/* Karakter Segitiga (tengah bawah) */}
      <div
        className="hs hs-character"
        role="button"
        tabIndex={0}
        onClick={handleCharacterClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCharacterClick()}
        aria-label="Sapa Segitiga"
      >
        {characterQuote && (
          <div className="character-speech-bubble">
            {characterQuote}
            <div className="bubble-arrow" />
          </div>
        )}
      </div>

      {/* Navigasi bawah (5 tab) */}
      <div className="home-bottom-nav-hotspots">
        <button type="button" className="bottom-hotspot"
          onClick={() => { sound.playPop(); onTabChange('beranda'); }}
          aria-label="Beranda" />
        <button type="button" className="bottom-hotspot"
          onClick={() => { sound.playPop(); onTabChange('peta'); }}
          aria-label="Peta" />
        <button type="button" className="bottom-hotspot"
          onClick={() => { sound.playPop(); onTabChange('prestasi'); }}
          aria-label="Prestasi" />
        <button type="button" className="bottom-hotspot"
          onClick={() => { sound.playPop(); onTabChange('materi'); }}
          aria-label="Materi" />
        <button type="button" className="bottom-hotspot"
          onClick={() => { sound.playPop(); onTabChange('profil'); }}
          aria-label="Profil" />
      </div>

    </div>
  );
};
