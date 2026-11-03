import React, { useState } from 'react';
import { shapesData } from '../KenaliBangunDatarModal';
import { sound } from '../../utils/audio';

export const MaterialsTab: React.FC = () => {
  const [activeShapeId, setActiveShapeId] = useState(shapesData[0].id);

  const selectedShape = shapesData.find((s) => s.id === activeShapeId) || shapesData[0];

  return (
    <div className="tab-scroll-page materials-page">
      <div className="tab-page-header">
        <h2 className="tab-page-title">📖 Materi Bangun Datar</h2>
        <p className="tab-page-desc">Pelajari definisi, sifat-sifat, dan rumus bangun datar lengkap!</p>
      </div>

      {/* Tabs */}
      <div className="materials-pills-row">
        {shapesData.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`material-pill-item ${s.id === activeShapeId ? 'active' : ''}`}
            onClick={() => {
              sound.playPop();
              setActiveShapeId(s.id);
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="material-content-card">
        <div className="mat-header" style={{ borderLeftColor: selectedShape.color }}>
          <h3 style={{ color: selectedShape.color }}>{selectedShape.name}</h3>
          <span className="mat-eng">({selectedShape.englishName})</span>
          <p className="mat-desc">{selectedShape.description}</p>
        </div>

        <div className="mat-section">
          <h4>📌 Sifat-sifat Karakteristik</h4>
          <ul className="mat-list">
            <li>Memiliki <strong>{selectedShape.sisi}</strong> sisi</li>
            <li>Memiliki <strong>{selectedShape.sudut}</strong> titik sudut</li>
          </ul>
        </div>

        <div className="mat-section">
          <h4>📐 Rumus Matematika</h4>
          <div className="mat-formula-box">
            <div className="mf-row">
              <span className="mf-tag">Luas</span>
              <code>{selectedShape.luasRumus}</code>
            </div>
            <div className="mf-row">
              <span className="mf-tag">Keliling</span>
              <code>{selectedShape.kelilingRumus}</code>
            </div>
          </div>
        </div>

        <div className="mat-section">
          <h4>🏠 Contoh di Kehidupan Sehari-hari</h4>
          <div className="mat-examples-pills">
            {selectedShape.contoh.map((c, i) => (
              <span key={i} className="mat-badge">{c}</span>
            ))}
          </div>
        </div>

        <div className="mat-fun-fact">
          💡 <strong>Tahukah Kamu?</strong> {selectedShape.funFact}
        </div>
      </div>
    </div>
  );
};
