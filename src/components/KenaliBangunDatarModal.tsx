import React, { useState } from 'react';
import { sound } from '../utils/audio';
import type { BangunDatarItem } from '../types';

interface KenaliBangunDatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const shapesData: BangunDatarItem[] = [
  {
    id: 'segitiga',
    name: 'Segitiga',
    englishName: 'Triangle',
    color: '#f59e0b',
    description: 'Bangun datar yang dibatasi oleh 3 sisi dan memiliki 3 buah sudut.',
    sisi: 3,
    sudut: 3,
    luasRumus: 'Luas = 1/2 × alas × tinggi',
    kelilingRumus: 'Keliling = sisi A + sisi B + sisi C',
    contoh: ['Potongan Pizza 🍕', 'Atap Rumah 🏠', 'Rambu Lalu Lintas ⚠️', 'Sandwich 🥪'],
    funFact: 'Jumlah ketiga sudut di dalam segitiga selalu menghasilkan 180°!',
  },
  {
    id: 'persegi',
    name: 'Persegi',
    englishName: 'Square',
    color: '#0284c7',
    description: 'Bangun datar beraturan dengan 4 sisi yang sama panjang dan 4 sudut siku-siku (90°).',
    sisi: 4,
    sudut: 4,
    luasRumus: 'Luas = sisi × sisi (s²)',
    kelilingRumus: 'Keliling = 4 × sisi',
    contoh: ['Papan Catur ♟️', 'Ubin Keramik 🟲', 'Jendela Kotak 🪟', 'Biskuit Persegi 🍪'],
    funFact: 'Persegi memiliki 4 sumbu simetri lipat dan 4 simetri putar!',
  },
  {
    id: 'lingkaran',
    name: 'Lingkaran',
    englishName: 'Circle',
    color: '#ef4444',
    description: 'Bangun datar berbentuk kurva lengkung tertutup dengan semua titik berjarak sama ke pusat.',
    sisi: '1 (sisi lengkung)',
    sudut: '0 (tidak ada sudut)',
    luasRumus: 'Luas = π × r² (r = jari-jari)',
    kelilingRumus: 'Keliling = 2 × π × r',
    contoh: ['Roda Sepeda 🚲', 'Uang Koin 🪙', 'Jam Dinding ⏰', 'Piring Makan 🍽️'],
    funFact: 'Lingkaran memiliki sumbu simetri yang tak terhingga!',
  },
  {
    id: 'persegi-panjang',
    name: 'Persegi Panjang',
    englishName: 'Rectangle',
    color: '#10b981',
    description: 'Bangun datar dengan 2 pasang sisi sejajar berhadapan sama panjang dan 4 sudut siku-siku.',
    sisi: 4,
    sudut: 4,
    luasRumus: 'Luas = panjang × lebar (p × l)',
    kelilingRumus: 'Keliling = 2 × (panjang + lebar)',
    contoh: ['Pintu Kamar 🚪', 'Layar HP / Tablet 📱', 'Buku Tulis 📖', 'Uang Kertas 💵'],
    funFact: 'Semua persegi adalah persegi panjang, tapi tidak semua persegi panjang adalah persegi!',
  },
  {
    id: 'trapesium',
    name: 'Trapesium',
    englishName: 'Trapezoid',
    color: '#8b5cf6',
    description: 'Bangun datar segiempat yang memiliki tepat sepasang sisi yang sejajar.',
    sisi: 4,
    sudut: 4,
    luasRumus: 'Luas = 1/2 × (a + b) × tinggi',
    kelilingRumus: 'Keliling = jumlah semua sisinya',
    contoh: ['Perahu Kertas ⛵', 'Kap Lampu Meja 🛋️', 'Pot Bunga 🪴'],
    funFact: 'Ada 3 jenis trapesium: sama kaki, siku-siku, dan sembarang!',
  },
  {
    id: 'jajar-genjang',
    name: 'Jajar Genjang',
    englishName: 'Parallelogram',
    color: '#ec4899',
    description: 'Bangun segiempat dengan sisi-sisi berhadapan sejajar dan sama panjang.',
    sisi: 4,
    sudut: 4,
    luasRumus: 'Luas = alas × tinggi (a × t)',
    kelilingRumus: 'Keliling = 2 × (alas + sisi miring)',
    contoh: ['Penghapus Miring ✏️', 'Motif Batik 🎨', 'Atap Garasi 🚗'],
    funFact: 'Sudut-sudut yang berhadapan pada jajar genjang besarnya selalu sama!',
  },
];

export const KenaliBangunDatarModal: React.FC<KenaliBangunDatarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedShape, setSelectedShape] = useState<BangunDatarItem>(shapesData[0]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container shapes-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">📐</span>
            <div>
              <h2 className="modal-title">Kenali Bangun Datar</h2>
              <p className="modal-subtitle">Jelajahi dan kenali sifat-sifat bangun datar!</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Horizontal Shape Selector Pills */}
          <div className="shapes-pills-row">
            {shapesData.map((shape) => {
              const isSelected = shape.id === selectedShape.id;
              return (
                <button
                  key={shape.id}
                  type="button"
                  className={`shape-pill-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    sound.playPop();
                    setSelectedShape(shape);
                  }}
                  style={{
                    borderColor: isSelected ? shape.color : 'transparent',
                    backgroundColor: isSelected ? shape.color : '#f1f5f9',
                    color: isSelected ? '#ffffff' : '#334155',
                  }}
                >
                  {shape.name}
                </button>
              );
            })}
          </div>

          {/* Selected Shape Detail Card */}
          <div className="shape-detail-card">
            <div className="shape-header-card" style={{ borderLeftColor: selectedShape.color }}>
              <div className="shape-title-main">
                <h3 style={{ color: selectedShape.color }}>{selectedShape.name}</h3>
                <span className="shape-eng-name">({selectedShape.englishName})</span>
              </div>
              <p className="shape-desc">{selectedShape.description}</p>
            </div>

            {/* Properties Grid */}
            <div className="shape-properties-grid">
              <div className="prop-box">
                <span className="prop-label">Jumlah Sisi</span>
                <span className="prop-val">{selectedShape.sisi}</span>
              </div>
              <div className="prop-box">
                <span className="prop-label">Jumlah Titik Sudut</span>
                <span className="prop-val">{selectedShape.sudut}</span>
              </div>
            </div>

            {/* Formulas */}
            <div className="formulas-card">
              <h4 className="formula-header">📐 Rumus Matematika</h4>
              <div className="formula-item">
                <span className="f-tag">Luas</span>
                <code>{selectedShape.luasRumus}</code>
              </div>
              <div className="formula-item">
                <span className="f-tag">Keliling</span>
                <code>{selectedShape.kelilingRumus}</code>
              </div>
            </div>

            {/* Real Life Examples */}
            <div className="examples-card">
              <h4 className="examples-header">🌍 Contoh Benda di Kehidupan Nyata</h4>
              <div className="examples-tags">
                {selectedShape.contoh.map((item, idx) => (
                  <span key={idx} className="example-badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun Fact */}
            <div className="fun-fact-box">
              💡 <strong>Tahukah Kamu?</strong> {selectedShape.funFact}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn-huge-action"
            onClick={() => {
              sound.playSuccess();
              onClose();
            }}
          >
            Mengerti! Siap Berpetualang 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
