import React, { useState, useEffect } from 'react';
import type { GameLevel } from '../types';
import { levelQuestionsMap } from '../data/levelsData';
import type { LevelQuestion, QuizOption } from '../data/levelsData';
import { sound } from '../utils/audio';

// Background images for each screen
import screen1Img from '../assets/game/screen_1.jpg';
import screen2Img from '../assets/game/screen_2.jpg';
import screen3Img from '../assets/game/screen_3.jpg';
import screen4Img from '../assets/game/screen_4.jpg';

interface MulaiAdventureModalProps {
  isOpen: boolean;
  levels: GameLevel[];
  initialLevelId?: number;
  onClose: () => void;
  onRewardStars: (amount: number) => void;
  onCompleteLevel: (levelId: number, starsEarned: number) => void;
}

type GameState = 'detail' | 'explore' | 'quiz' | 'result';

/* ── Shape Icon SVG Components ── */
function ShapeIcon({ type, size = 24 }: { type: string; size?: number }) {
  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 22,21 2,21" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'square') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" rx="2" />
      </svg>
    );
  }
  if (type === 'rectangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 28 24" fill="none">
        <rect x="2" y="5" width="24" height="14" fill="#22c55e" stroke="#15803d" strokeWidth="2" rx="2" />
      </svg>
    );
  }
  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
      </svg>
    );
  }
  return null;
}

/* ── House Visual for Quiz ── */
function HouseVisual() {
  return (
    <div className="adv-quiz-visual-card">
      <svg viewBox="0 0 220 180" width="100%" height="100%" fill="none" style={{ maxWidth: 240, maxHeight: 180 }}>
        {/* Sky */}
        <rect width="220" height="180" rx="16" fill="#e0f2fe" />
        {/* Clouds */}
        <ellipse cx="55" cy="32" rx="22" ry="10" fill="white" opacity="0.7" />
        <ellipse cx="170" cy="28" rx="18" ry="8" fill="white" opacity="0.6" />
        {/* Ground */}
        <ellipse cx="40" cy="155" rx="55" ry="28" fill="#86efac" />
        <ellipse cx="170" cy="155" rx="65" ry="32" fill="#86efac" />
        <rect x="0" y="150" width="220" height="30" fill="#4ade80" rx="0" />
        {/* Trees */}
        <ellipse cx="28" cy="130" rx="14" ry="20" fill="#22c55e" />
        <rect x="25" y="143" width="6" height="12" fill="#92400e" rx="1" />
        <ellipse cx="195" cy="128" rx="12" ry="18" fill="#16a34a" />
        <rect x="192" y="140" width="6" height="14" fill="#92400e" rx="1" />
        {/* Chimney */}
        <rect x="148" y="38" width="16" height="32" fill="#b91c1c" rx="2" />
        <rect x="145" y="36" width="22" height="6" fill="#991b1b" rx="2" />
        {/* Roof (Triangle) */}
        <polygon points="110,22 180,82 40,82" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="110,32 170,78 50,78" fill="#f87171" opacity="0.35" />
        {/* House body */}
        <rect x="52" y="82" width="116" height="70" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="3" />
        {/* Door */}
        <rect x="64" y="105" width="26" height="47" fill="#92400e" stroke="#78350f" strokeWidth="1.5" rx="3" />
        <circle cx="84" cy="128" r="2.5" fill="#fbbf24" />
        {/* Window */}
        <rect x="112" y="98" width="36" height="34" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" rx="3" />
        <line x1="130" y1="98" x2="130" y2="132" stroke="#0284c7" strokeWidth="2" />
        <line x1="112" y1="115" x2="148" y2="115" stroke="#0284c7" strokeWidth="2" />
      </svg>
    </div>
  );
}

/* ── Quiz Visual for different question types ── */
function QuizVisual({ question }: { question: LevelQuestion }) {
  if (question.visualType === 'house') return <HouseVisual />;
  if (question.visualType === 'triangle') {
    return (
      <div className="adv-quiz-visual-card">
        <svg viewBox="0 0 160 140" width="140" height="120" fill="none">
          <rect width="160" height="140" rx="16" fill="#fefce8" />
          <polygon points="80,20 140,120 20,120" fill="#fbbf24" stroke="#d97706" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (question.visualType === 'square') {
    return (
      <div className="adv-quiz-visual-card">
        <svg viewBox="0 0 140 140" width="130" height="130" fill="none">
          <rect width="140" height="140" rx="16" fill="#eff6ff" />
          <rect x="25" y="25" width="90" height="90" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" rx="6" />
        </svg>
      </div>
    );
  }
  if (question.visualType === 'rectangle') {
    return (
      <div className="adv-quiz-visual-card">
        <svg viewBox="0 0 170 120" width="160" height="110" fill="none">
          <rect width="170" height="120" rx="16" fill="#f0fdf4" />
          <rect x="20" y="25" width="130" height="70" fill="#4ade80" stroke="#15803d" strokeWidth="3" rx="6" />
        </svg>
      </div>
    );
  }
  if (question.visualType === 'circle') {
    return (
      <div className="adv-quiz-visual-card">
        <svg viewBox="0 0 140 140" width="130" height="130" fill="none">
          <rect width="140" height="140" rx="16" fill="#fdf2f8" />
          <circle cx="70" cy="70" r="45" fill="#f43f5e" stroke="#be123c" strokeWidth="3" />
        </svg>
      </div>
    );
  }
  // Fallback: emoji
  return (
    <div className="adv-quiz-visual-card">
      <span style={{ fontSize: 64 }}>{question.shapeVisual}</span>
    </div>
  );
}

/* ── Option Background Colors ── */
const OPTION_COLORS: Record<string, { bg: string; border: string }> = {
  triangle: { bg: '#fef9c3', border: '#facc15' },
  square: { bg: '#dbeafe', border: '#60a5fa' },
  rectangle: { bg: '#dcfce7', border: '#4ade80' },
  circle: { bg: '#fce7f3', border: '#f472b6' },
  none: { bg: '#f1f5f9', border: '#cbd5e1' },
};

/* ── Collectible Items ── */
interface CollectibleItem {
  id: number;
  type: 'coin' | 'triangle' | 'square' | 'circle';
  label: string;
  x: number;
  y: number;
}

const COLLECTIBLES_DATA: CollectibleItem[] = [
  { id: 1, type: 'coin', label: '🪙', x: 48, y: 32 },
  { id: 2, type: 'coin', label: '🪙', x: 56, y: 30 },
  { id: 3, type: 'coin', label: '🪙', x: 38, y: 55 },
  { id: 4, type: 'triangle', label: '🔺', x: 34, y: 62 },
  { id: 5, type: 'square', label: '🟦', x: 52, y: 46 },
  { id: 6, type: 'circle', label: '🔴', x: 68, y: 65 },
];

export const MulaiAdventureModal: React.FC<MulaiAdventureModalProps> = ({
  isOpen,
  levels,
  initialLevelId = 1,
  onClose,
  onRewardStars,
  onCompleteLevel,
}) => {
  const [currentLevelId, setCurrentLevelId] = useState(initialLevelId);
  const [gameState, setGameState] = useState<GameState>('detail');

  // Explore state
  const [charX, setCharX] = useState(38);
  const [charY, setCharY] = useState(42);
  const [isJumping, setIsJumping] = useState(false);
  const [coins, setCoins] = useState(12);
  const [collectedShapes, setCollectedShapes] = useState<number[]>([1, 2, 4]);
  const [floatingScore, setFloatingScore] = useState<string | null>(null);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (initialLevelId) setCurrentLevelId(initialLevelId);
  }, [initialLevelId]);

  useEffect(() => {
    if (isOpen) {
      setGameState('detail');
      setCharX(38);
      setCharY(42);
      setIsJumping(false);
      setCoins(12);
      setCollectedShapes([1, 2, 4]);
      setCurrentQIndex(0);
      setSelectedOpt(null);
      setShowFeedback(false);
      setCorrectAnswers(0);
      setTotalScore(0);
      setFloatingScore(null);
    }
  }, [isOpen, currentLevelId]);

  if (!isOpen) return null;

  const currentLevel = levels.find((l) => l.id === currentLevelId) || levels[0];
  const questions = levelQuestionsMap[currentLevelId] || levelQuestionsMap[1];
  const currentQ = questions[currentQIndex] || questions[0];

  /* ── EXPLORE ACTIONS ── */
  const handleCollect = (item: CollectibleItem) => {
    if (collectedShapes.includes(item.id)) return;
    sound.playPop();
    const updated = [...collectedShapes, item.id];
    setCollectedShapes(updated);
    const pts = item.type === 'coin' ? 4 : 20;
    setCoins((c) => c + pts);
    setFloatingScore(item.type === 'coin' ? '+4 🪙' : '+20 ✨');
    setTimeout(() => setFloatingScore(null), 900);

    if (updated.length >= 5) {
      setTimeout(() => {
        sound.playSuccess();
        setGameState('quiz');
        setCurrentQIndex(0);
        setSelectedOpt(null);
        setShowFeedback(false);
      }, 700);
    }
  };

  const handleMove = (dir: 'left' | 'right') => {
    sound.playPop();
    setCharX((prev) => {
      const next = dir === 'left' ? Math.max(14, prev - 12) : Math.min(82, prev + 12);
      COLLECTIBLES_DATA.forEach((item) => {
        if (!collectedShapes.includes(item.id) && Math.abs(item.x - next) < 14) {
          handleCollect(item);
        }
      });
      return next;
    });
  };

  const handleJump = () => {
    if (isJumping) return;
    sound.playPop();
    setIsJumping(true);
    setCharY(26);
    COLLECTIBLES_DATA.forEach((item) => {
      if (!collectedShapes.includes(item.id) && Math.abs(item.x - charX) < 16 && item.y < 50) {
        handleCollect(item);
      }
    });
    setTimeout(() => {
      setCharY(42);
      setTimeout(() => setIsJumping(false), 200);
    }, 450);
  };

  /* ── QUIZ ACTIONS ── */
  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowFeedback(true);
    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      sound.playSuccess();
      setCorrectAnswers((c) => c + 1);
      setTotalScore((s) => s + 100);
    } else {
      sound.playPop();
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex((p) => p + 1);
      setSelectedOpt(null);
      setShowFeedback(false);
    } else {
      sound.playSuccess();
      const finalStars = correctAnswers >= 4 ? 3 : correctAnswers >= 2 ? 2 : 1;
      onRewardStars(finalStars * 5);
      onCompleteLevel(currentLevelId, finalStars);
      setGameState('result');
    }
  };

  const handleRestartLevel = () => {
    sound.playPop();
    setGameState('detail');
    setCoins(12);
    setCollectedShapes([1, 2, 4]);
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setShowFeedback(false);
    setCorrectAnswers(0);
    setTotalScore(0);
  };

  const handleContinueNextLevel = () => {
    sound.playPop();
    const nextId = currentLevelId + 1;
    const nextLevel = levels.find((l) => l.id === nextId);
    if (nextLevel && nextLevel.unlocked) {
      setCurrentLevelId(nextId);
      handleRestartLevel();
    } else {
      onClose();
    }
  };

  const bgForState = gameState === 'detail' ? screen1Img
    : gameState === 'explore' ? screen2Img
    : gameState === 'quiz' ? screen3Img
    : screen4Img;

  return (
    <div className="adv-overlay-modal" role="dialog" aria-modal="true">
      {/* Background image layer (decorative, covers full modal) */}
      <div className="adv-bg-layer" style={{ backgroundImage: `url(${bgForState})` }} />

      {/* ══════════════════════════════════════════════════════
          SCREEN 1: DETAIL LEVEL
         ══════════════════════════════════════════════════════ */}
      {gameState === 'detail' && (
        <div className="adv-screen-full">
          {/* Top bar */}
          <div className="adv-topbar">
            <button type="button" className="adv-circle-btn" onClick={() => { sound.playPop(); onClose(); }}>
              ‹
            </button>
            <div className="adv-topbar-right">
              <span className="adv-coin-pill">⭐ 0</span>
              <span className="adv-coin-pill green">💎 0</span>
            </div>
          </div>

          {/* Level Badge */}
          <div className="adv-detail-center">
            <div className="adv-wooden-badge">Level {currentLevelId}</div>
            <div className="adv-blue-subbadge">{currentLevel.name}</div>

            {/* Info Card */}
            <div className="adv-info-card">
              <div className="adv-info-label">Tujuan:</div>
              <div className="adv-info-desc">{currentLevel.description}</div>

              <div className="adv-stars-row">
                <span className="adv-star-blue">★</span>
                <span className="adv-star-blue">★</span>
                <span className="adv-star-blue">★</span>
              </div>

              <div className="adv-meta-row">
                <span className="adv-meta-chip">⏱️ 3-5 menit</span>
                <span className="adv-meta-chip">🎯 {questions.length} tantangan</span>
              </div>
            </div>
          </div>

          {/* Character area (bottom half shows through background) */}
          <div style={{ flex: 1 }} />

          {/* Mulai Button */}
          <button
            type="button"
            className="adv-mulai-btn"
            onClick={() => {
              sound.playAdventureStart();
              setGameState('explore');
            }}
          >
            Mulai
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SCREEN 2: EKSPLORASI & KUMPULKAN
         ══════════════════════════════════════════════════════ */}
      {gameState === 'explore' && (
        <div className="adv-screen-full">
          {/* Top bar */}
          <div className="adv-topbar">
            <button type="button" className="adv-circle-btn" onClick={() => { sound.playPop(); onClose(); }}>
              ⏸
            </button>
            <span className="adv-coin-pill">🪙 {coins}</span>
            <div className="adv-topbar-right">
              <span className="adv-star-blue">★</span>
              <span className="adv-star-blue">★</span>
              <span className="adv-star-blue dim">★</span>
            </div>
          </div>

          {/* Quest Banner */}
          <div className="adv-quest-card">
            <div className="adv-quest-title">Kumpulkan semua bentuk!</div>
            <div className="adv-quest-shapes-row">
              <ShapeIcon type="triangle" size={22} />
              <ShapeIcon type="square" size={22} />
              <ShapeIcon type="circle" size={22} />
              <span className="adv-quest-count">{Math.min(collectedShapes.length, COLLECTIBLES_DATA.length)}/{COLLECTIBLES_DATA.length}</span>
            </div>
          </div>

          {/* Playfield */}
          <div className="adv-playfield">
            {/* Floating score */}
            {floatingScore && (
              <div className="adv-float-score" style={{ left: `${charX}%`, top: `${charY - 10}%` }}>
                {floatingScore}
              </div>
            )}

            {/* Collectibles */}
            {COLLECTIBLES_DATA.map(
              (item) =>
                !collectedShapes.includes(item.id) && (
                  <button
                    key={item.id}
                    type="button"
                    className="adv-collectible"
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    onClick={() => handleCollect(item)}
                  >
                    {item.label}
                  </button>
                )
            )}

            {/* Character */}
            <div
              className={`adv-char ${isJumping ? 'jumping' : ''}`}
              style={{ left: `${charX}%`, top: `${charY}%` }}
            >
              🔺
            </div>
          </div>

          {/* D-Pad Controls */}
          <div className="adv-dpad-bar">
            <div className="adv-dpad-group">
              <button type="button" className="adv-dpad-btn" onClick={() => handleMove('left')}>⬅</button>
              <button type="button" className="adv-dpad-btn" onClick={() => handleMove('right')}>➡</button>
            </div>
            <button type="button" className="adv-dpad-btn adv-dpad-jump" onClick={handleJump}>⬆</button>
          </div>

          {/* Quick skip */}
          <button
            type="button"
            className="adv-skip-pill"
            onClick={() => { sound.playSuccess(); setGameState('quiz'); }}
          >
            Lanjut Soal ➔
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SCREEN 3: SOAL / TANTANGAN
         ══════════════════════════════════════════════════════ */}
      {gameState === 'quiz' && (
        <div className="adv-screen-full adv-screen-quiz-full">
          {/* Top bar */}
          <div className="adv-topbar">
            <button type="button" className="adv-circle-btn" onClick={() => { sound.playPop(); onClose(); }}>
              ⏸
            </button>
            <span className="adv-coin-pill" style={{ fontSize: 12 }}>⏱ 4:{(5 - currentQIndex).toString().padStart(2, '0')}</span>
            <div className="adv-topbar-right">
              <span className="adv-quiz-counter">{currentQIndex + 1}/{questions.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="adv-quiz-progress-bar">
            <div className="adv-quiz-progress-fill" style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }} />
          </div>

          {/* Scrollable quiz content */}
          <div className="adv-quiz-scroll">
            {/* Question Card */}
            <div className="adv-quiz-qcard">
              <div className="adv-quiz-qtext">{currentQ.question}</div>
              <QuizVisual question={currentQ} />
            </div>

            {/* Options */}
            <div className="adv-quiz-options">
              {currentQ.options.map((opt: QuizOption, idx: number) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentQ.correctIndex;
                const colorSet = OPTION_COLORS[opt.shapeType] || OPTION_COLORS['none'];

                let optClass = 'adv-quiz-opt-btn';
                if (isSelected && isCorrect) optClass += ' opt-correct';
                else if (isSelected && !isCorrect) optClass += ' opt-wrong';
                else if (showFeedback && isCorrect) optClass += ' opt-correct';

                return (
                  <button
                    key={idx}
                    type="button"
                    className={optClass}
                    style={{
                      background: isSelected ? undefined : colorSet.bg,
                      borderColor: isSelected ? undefined : colorSet.border,
                    }}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOpt !== null}
                  >
                    <span className="adv-opt-left">
                      <ShapeIcon type={opt.shapeType} size={22} />
                      <span className="adv-opt-label">{opt.label}</span>
                    </span>
                    {isSelected && isCorrect && (
                      <span className="adv-check-icon">✓</span>
                    )}
                    {isSelected && !isCorrect && (
                      <span className="adv-wrong-icon">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Next */}
            {showFeedback && (
              <div className="adv-quiz-feedback-area">
                <div className={`adv-quiz-hint ${selectedOpt === currentQ.correctIndex ? 'hint-correct' : 'hint-wrong'}`}>
                  {selectedOpt === currentQ.correctIndex ? '🎉 ' : '💡 '}
                  {currentQ.explanation}
                </div>
                <button type="button" className="adv-quiz-next-btn" onClick={handleNextQuestion}>
                  {currentQIndex + 1 < questions.length ? 'Soal Selanjutnya ➔' : '🏆 Lihat Hasil Level'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          SCREEN 4: HASIL LEVEL
         ══════════════════════════════════════════════════════ */}
      {gameState === 'result' && (
        <div className="adv-screen-full adv-screen-result-full">
          {/* Confetti */}
          <span className="adv-confetti c1">✨</span>
          <span className="adv-confetti c2">⭐</span>
          <span className="adv-confetti c3">🎉</span>
          <span className="adv-confetti c4">✨</span>

          {/* Stars */}
          <div className="adv-result-stars">
            {[1, 2, 3].map((s) => (
              <span key={s} className={`adv-result-star ${correctAnswers >= s * Math.ceil(questions.length / 3) ? 'earned' : ''}`}>
                ★
              </span>
            ))}
          </div>

          {/* Banner */}
          <div className="adv-result-banner">Level Selesai!</div>

          {/* Character celebrate */}
          <div className="adv-result-char">🔺</div>

          {/* Stats Card */}
          <div className="adv-result-stats">
            <div className="adv-stat-row">
              <span className="adv-stat-icon">⭐</span>
              <span className="adv-stat-label">Skor</span>
              <span className="adv-stat-value">{totalScore + coins}</span>
            </div>
            <div className="adv-stat-row">
              <span className="adv-stat-icon xp">XP</span>
              <span className="adv-stat-label">XP</span>
              <span className="adv-stat-value xp-val">
                <span className="adv-xp-badge">XP</span> +{correctAnswers * 20}
              </span>
            </div>
            <div className="adv-stat-divider" />
            <div className="adv-stat-row">
              <span className="adv-stat-icon">📋</span>
              <span className="adv-stat-label">Jawaban</span>
              <span className="adv-stat-value correct-val">
                ✅ {correctAnswers} benar / {questions.length}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="adv-result-actions">
            <button type="button" className="adv-btn-lanjutkan" onClick={handleContinueNextLevel}>
              Lanjutkan
            </button>
            <button type="button" className="adv-btn-ulangi" onClick={handleRestartLevel}>
              🔄 Ulangi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
