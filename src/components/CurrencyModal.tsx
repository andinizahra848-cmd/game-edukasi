import React from 'react';
import { sound } from '../utils/audio';

interface CurrencyModalProps {
  isOpen: boolean;
  type: 'star' | 'gem';
  count: number;
  onClose: () => void;
  onAdd: (amount: number) => void;
}

export const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  type,
  count,
  onClose,
  onAdd,
}) => {
  if (!isOpen) return null;

  const isStar = type === 'star';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container currency-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge-icon">{isStar ? '⭐' : '💎'}</span>
            <div>
              <h2 className="modal-title">{isStar ? 'Bintang Petualang' : 'Permata Ajaib'}</h2>
              <p className="modal-subtitle">
                {isStar ? 'Hadiah dari menyelesaikan level dengan baik' : 'Permata langka untuk membuka kostum & fitur'}
              </p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="currency-current-display">
            <span className="huge-currency-icon">{isStar ? '⭐' : '💎'}</span>
            <div className="huge-currency-amount">{count}</div>
            <p className="currency-desc">
              {isStar 
                ? 'Kumpulkan bintang lebih banyak dengan menyelesaikan tantangan bangun datar!'
                : 'Dapatkan permata dengan menyelesaikan Misi Harian!'}
            </p>
          </div>

          <div className="currency-packages">
            <button
              type="button"
              className="currency-pack-btn"
              onClick={() => {
                sound.playSuccess();
                onAdd(10);
              }}
            >
              <span>Bonus Latihan (+10 {isStar ? '⭐' : '💎'})</span>
              <span className="pack-free-tag">Gratis 🎁</span>
            </button>
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
