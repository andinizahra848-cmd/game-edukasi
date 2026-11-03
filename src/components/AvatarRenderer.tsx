import React from 'react';

export type AvatarId = 'boy1' | 'girl1' | 'boy2' | 'girl2' | 'triangle' | 'cat';

export interface AvatarOption {
  id: AvatarId;
  name: string;
}

export const avatarList: AvatarOption[] = [
  { id: 'boy1', name: 'Rizki (Petualang)' },
  { id: 'girl1', name: 'Dina (Pintar)' },
  { id: 'boy2', name: 'Budi (Kacamata)' },
  { id: 'girl2', name: 'Siti (Ceria)' },
  { id: 'triangle', name: 'Teman Segitiga' },
  { id: 'cat', name: 'Milo Si Kucing' },
];

interface AvatarRendererProps {
  avatarId?: string;
  size?: number;
  className?: string;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  avatarId = 'boy1',
  size = 44,
  className = '',
}) => {
  switch (avatarId) {
    case 'girl1':
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Background */}
          <circle cx="32" cy="32" r="30" fill="#f472b6" />
          {/* Ponytail Hair */}
          <path d="M14 26C14 16 22 10 32 10C42 10 50 16 50 26C50 36 46 44 46 44C46 44 38 42 32 42C26 42 18 44 18 44C18 44 14 36 14 26Z" fill="#78350f" />
          <circle cx="16" cy="22" r="7" fill="#78350f" />
          <circle cx="48" cy="22" r="7" fill="#78350f" />
          <circle cx="16" cy="22" r="3" fill="#f43f5e" />
          <circle cx="48" cy="22" r="3" fill="#f43f5e" />
          {/* Face */}
          <ellipse cx="32" cy="34" rx="13" ry="14" fill="#fed7aa" />
          {/* Bangs */}
          <path d="M20 22C24 26 28 26 32 23C36 26 40 26 44 22C42 18 36 16 32 16C28 16 22 18 20 22Z" fill="#92400e" />
          {/* Eyes */}
          <circle cx="27" cy="32" r="2.5" fill="#1e293b" />
          <circle cx="37" cy="32" r="2.5" fill="#1e293b" />
          <circle cx="27.8" cy="31.2" r="0.9" fill="#ffffff" />
          <circle cx="37.8" cy="31.2" r="0.9" fill="#ffffff" />
          {/* Cheeks */}
          <ellipse cx="24" cy="36" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.6" />
          <ellipse cx="40" cy="36" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.6" />
          {/* Smile */}
          <path d="M29 38C30.5 40.5 33.5 40.5 35 38" stroke="#be123c" strokeWidth="1.8" strokeLinecap="round" />
          {/* Shirt */}
          <path d="M22 47C22 43 26 42 32 42C38 42 42 43 42 47V52H22V47Z" fill="#fb7185" />
          <circle cx="32" cy="46" r="2" fill="#fef08a" />
        </svg>
      );

    case 'boy2':
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Background */}
          <circle cx="32" cy="32" r="30" fill="#34d399" />
          {/* Hair */}
          <path d="M16 26C16 16 24 10 32 10C40 10 48 16 48 26C48 30 46 32 44 32C42 26 40 24 36 24C32 24 30 27 26 27C22 27 18 26 16 26Z" fill="#451a03" />
          {/* Face */}
          <ellipse cx="32" cy="34" rx="13" ry="14" fill="#fed7aa" />
          {/* Glasses */}
          <circle cx="26" cy="32" r="5" stroke="#1e293b" strokeWidth="2" fill="#e0f2fe" opacity="0.7" />
          <circle cx="38" cy="32" r="5" stroke="#1e293b" strokeWidth="2" fill="#e0f2fe" opacity="0.7" />
          <line x1="31" y1="32" x2="33" y2="32" stroke="#1e293b" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="26" cy="32" r="1.8" fill="#1e293b" />
          <circle cx="38" cy="32" r="1.8" fill="#1e293b" />
          {/* Smile */}
          <path d="M29 39C30.5 41 33.5 41 35 39" stroke="#9a3412" strokeWidth="1.6" strokeLinecap="round" />
          {/* Shirt */}
          <path d="M22 47C22 43 26 42 32 42C38 42 42 43 42 47V52H22V47Z" fill="#059669" />
          <path d="M29 42L32 46L35 42" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );

    case 'girl2':
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Background */}
          <circle cx="32" cy="32" r="30" fill="#a78bfa" />
          {/* Short Bob Hair */}
          <path d="M16 26C16 16 24 12 32 12C40 12 48 16 48 26C48 38 46 40 44 40C42 34 40 28 36 28C32 28 30 30 26 30C22 30 18 34 16 40Z" fill="#18181b" />
          <ellipse cx="32" cy="34" rx="13" ry="14" fill="#fed7aa" />
          <path d="M18 24C22 26 28 26 32 24C36 26 42 26 46 24C44 20 38 18 32 18C26 18 20 20 18 24Z" fill="#27272a" />
          {/* Eyes */}
          <circle cx="27" cy="33" r="2.2" fill="#1e293b" />
          <circle cx="37" cy="33" r="2.2" fill="#1e293b" />
          <circle cx="27.8" cy="32.2" r="0.8" fill="#ffffff" />
          <circle cx="37.8" cy="32.2" r="0.8" fill="#ffffff" />
          {/* Smile */}
          <path d="M29 39C30.5 41 33.5 41 35 39" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shirt */}
          <path d="M22 47C22 43 26 42 32 42C38 42 42 43 42 47V52H22V47Z" fill="#7c3aed" />
        </svg>
      );

    case 'triangle':
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Background */}
          <circle cx="32" cy="32" r="30" fill="#fef08a" />
          {/* Cute Yellow Triangle Mascot */}
          <polygon points="32 14 50 48 14 48" fill="#f59e0b" stroke="#d97706" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="32 18 46 45 18 45" fill="#fde047" />
          {/* Big Cute Eyes */}
          <circle cx="28" cy="34" r="3.2" fill="#1e293b" />
          <circle cx="36" cy="34" r="3.2" fill="#1e293b" />
          <circle cx="29" cy="33" r="1.2" fill="#ffffff" />
          <circle cx="37" cy="33" r="1.2" fill="#ffffff" />
          {/* Cute Open Smile */}
          <path d="M28 40C29.5 43 34.5 43 36 40" fill="#be123c" stroke="#9f1239" strokeWidth="1.5" />
          {/* Cheeks */}
          <circle cx="24" cy="38" r="2" fill="#f43f5e" opacity="0.5" />
          <circle cx="40" cy="38" r="2" fill="#f43f5e" opacity="0.5" />
        </svg>
      );

    case 'cat':
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Background */}
          <circle cx="32" cy="32" r="30" fill="#fed7aa" />
          {/* Cat Ears */}
          <polygon points="20 16 26 26 14 28" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <polygon points="19 19 24 25 16 26" fill="#fbcfe8" />
          <polygon points="44 16 50 28 38 26" fill="#f97316" stroke="#c2410c" strokeWidth="1.5" />
          <polygon points="45 19 48 26 40 25" fill="#fbcfe8" />
          {/* Cat Head */}
          <circle cx="32" cy="34" r="15" fill="#fb923c" />
          {/* Eyes */}
          <ellipse cx="26" cy="33" rx="2.5" ry="3.5" fill="#1e293b" />
          <ellipse cx="38" cy="33" rx="2.5" ry="3.5" fill="#1e293b" />
          <circle cx="26.8" cy="32" r="1" fill="#ffffff" />
          <circle cx="38.8" cy="32" r="1" fill="#ffffff" />
          {/* Nose & Mouth */}
          <polygon points="32 37 30 35 34 35" fill="#f43f5e" />
          <path d="M29 38C30.5 40 32 40 32 38C32 40 33.5 40 35 38" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
          {/* Whiskers */}
          <line x1="18" y1="35" x2="23" y2="36" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="18" y1="39" x2="23" y2="38" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="46" y1="35" x2="41" y2="36" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="46" y1="39" x2="41" y2="38" stroke="#431407" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'boy1':
    default:
      return (
        <svg
          className={className}
          viewBox="0 0 64 64"
          width={size}
          height={size}
          fill="none"
        >
          {/* Matching boy in photo */}
          <circle cx="32" cy="32" r="30" fill="#86efac" />
          {/* Hair */}
          <path d="M16 28C16 18 24 12 34 12C44 12 48 18 48 26C48 30 46 32 44 32C42 26 40 24 36 24C32 24 30 27 26 27C22 27 18 26 16 28Z" fill="#1e293b" />
          <path d="M20 20C22 14 30 14 36 14C42 14 46 17 46 22C44 20 40 18 36 19C30 20 26 23 20 20Z" fill="#0f172a" />
          {/* Face */}
          <ellipse cx="32" cy="34" rx="14" ry="15" fill="#fde047" opacity="0.3" />
          <ellipse cx="32" cy="35" rx="13" ry="14" fill="#fed7aa" />
          {/* Ears */}
          <circle cx="18" cy="36" r="3.5" fill="#fed7aa" />
          <circle cx="46" cy="36" r="3.5" fill="#fed7aa" />
          {/* Eyes */}
          <circle cx="28" cy="33" r="2.2" fill="#1e293b" />
          <circle cx="36" cy="33" r="2.2" fill="#1e293b" />
          <circle cx="28.8" cy="32.2" r="0.8" fill="#ffffff" />
          <circle cx="36.8" cy="32.2" r="0.8" fill="#ffffff" />
          {/* Smile */}
          <path d="M29 39C30.5 41 33.5 41 35 39" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
          {/* Shirt */}
          <path d="M22 48C22 44 26 43 32 43C38 43 42 44 42 48V52H22V48Z" fill="#0284c7" />
          <path d="M28 43L32 47L36 43" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
};
