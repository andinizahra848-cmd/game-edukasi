import React from 'react';
import { sound } from '../../utils/audio';

export const AchievementsTab: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Penjelajah Pemula',
      desc: 'Memulai petualangan bangun datar pertamamu',
      icon: '🧭',
      unlocked: true,
      progress: '1/1',
    },
    {
      id: 2,
      title: 'Pakar Segitiga',
      desc: 'Menjawab 5 pertanyaan segitiga dengan sempurna',
      icon: '🔺',
      unlocked: true,
      progress: '5/5',
    },
    {
      id: 3,
      title: 'Kolektor Bintang 100+',
      desc: 'Kumpulkan total lebih dari 100 bintang',
      icon: '⭐',
      unlocked: true,
      progress: '120/100',
    },
    {
      id: 4,
      title: 'Raja Segi Empat',
      desc: 'Selesaikan tantangan Persegi dan Persegi Panjang',
      icon: '🟦',
      unlocked: false,
      progress: '2/4',
    },
    {
      id: 5,
      title: 'Ahli Geometri Cilik',
      desc: 'Selesaikan semua level dengan nilai bintang 3',
      icon: '👑',
      unlocked: false,
      progress: '2/5',
    },
  ];

  return (
    <div className="tab-scroll-page achievements-page">
      <div className="tab-page-header">
        <h2 className="tab-page-title">🏆 Prestasi & Lencana</h2>
        <p className="tab-page-desc">Koleksi piala dari keberhasilan belajarmu!</p>
      </div>

      <div className="achievements-list">
        {achievements.map((item) => (
          <div 
            key={item.id} 
            className={`achievement-card ${item.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => sound.playPop()}
          >
            <div className="achievement-icon-box">
              <span className="badge-emoji">{item.icon}</span>
            </div>
            <div className="achievement-details">
              <div className="achievement-title">{item.title}</div>
              <div className="achievement-desc">{item.desc}</div>
              <div className="achievement-progress-tag">
                {item.unlocked ? '✅ Tercapai!' : `Progres: ${item.progress}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
