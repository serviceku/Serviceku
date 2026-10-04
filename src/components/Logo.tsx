import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  light = false,
}) => {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-5xl',
  }[size];

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Logo Emblem matching WhatsApp Image 3 */}
      <div className={`relative flex-shrink-0 ${iconDimensions}`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular gradient border arc */}
          <defs>
            <linearGradient id="blueGradient" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="waveGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Top circular arch */}
          <path
            d="M 45 130 A 72 72 0 1 1 170 120"
            stroke="url(#blueGradient)"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />

          {/* Snowflake (Pendingin - Kulkas & AC) */}
          <g transform="translate(68, 74) scale(0.65)" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round">
            {/* Main 6 axes */}
            <line x1="0" y1="-38" x2="0" y2="38" />
            <line x1="-33" y1="-19" x2="33" y2="19" />
            <line x1="-33" y1="19" x2="33" y2="-19" />
            
            {/* Crystal branches */}
            <line x1="0" y1="-26" x2="-10" y2="-32" />
            <line x1="0" y1="-26" x2="10" y2="-32" />
            <line x1="0" y1="26" x2="-10" y2="32" />
            <line x1="0" y1="26" x2="10" y2="32" />

            <line x1="-22" y1="-13" x2="-28" y2="-4" />
            <line x1="-22" y1="-13" x2="-18" y2="-23" />
            <line x1="22" y1="13" x2="28" y2="4" />
            <line x1="22" y1="13" x2="18" y2="23" />

            <line x1="-22" y1="13" x2="-28" y2="4" />
            <line x1="-22" y1="13" x2="-18" y2="23" />
            <line x1="22" y1="-13" x2="28" y2="-4" />
            <line x1="22" y1="-13" x2="18" y2="-23" />

            {/* Central diamond */}
            <circle cx="0" cy="0" r="4.5" fill="#0284c7" />
          </g>

          {/* Gear teeth outline on the right */}
          <g transform="translate(136, 92)" fill="url(#gearGradient)">
            {/* Gear circle with notch teeth */}
            <path
              d="M 0 -45 
                 L 5 -45 L 7 -39 A 38 38 0 0 1 20 -33 L 26 -38 L 32 -33 L 30 -25 A 38 38 0 0 1 39 -12 L 46 -13 L 48 -5 L 43 2 A 38 38 0 0 1 40 18 L 45 25 L 39 31 L 32 27 A 38 38 0 0 1 19 36 L 17 44 L 9 44 L 5 37 A 38 38 0 0 1 -8 37 L -13 43 L -21 40 L -20 32 A 38 38 0 0 1 -32 21 L -39 25 L -44 19 L -39 12 A 38 38 0 0 1 -41 -3 L -48 -6 L -47 -14 L -39 -17 A 38 38 0 0 1 -31 -28 L -34 -36 L -27 -40 L -21 -34 A 38 38 0 0 1 -7 -38 Z"
              opacity="0.88"
            />
            {/* Inner cutout */}
            <circle cx="0" cy="0" r="22" fill="#f8fafc" />
          </g>

          {/* Diagonal Wrench (Kunci Pas) crossing into gear */}
          <g transform="translate(118, 86) rotate(-35)" fill="url(#blueGradient)">
            {/* Wrench handle */}
            <rect x="-8" y="-30" width="16" height="66" rx="5" />
            {/* Wrench head opening */}
            <path
              d="M -16 -28 C -22 -15 -18 5 -5 10 C -2 11 -2 2 -2 -2 C 2 -2 2 11 5 10 C 18 5 22 -15 16 -28 C 10 -40 -10 -40 -16 -28 Z"
              transform="translate(0, -32) rotate(180)"
            />
            {/* Cutout notch for wrench jaw */}
            <polygon points="-8,-66 8,-66 6,-46 -6,-46" fill="#f8fafc" />
          </g>

          {/* Water waves at the bottom */}
          <path
            d="M 25 135 C 55 120 75 145 110 135 C 145 125 165 142 185 132 C 165 152 135 146 105 152 C 70 159 45 150 25 135 Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M 38 148 C 65 136 85 155 120 146 C 150 138 168 152 180 145 C 160 162 130 158 100 162 C 68 167 48 160 38 148 Z"
            fill="#0369a1"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Brand Typographic Identity */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${titleSizes} ${
              light
                ? 'text-white drop-shadow-md'
                : 'bg-gradient-to-r from-blue-900 via-blue-700 to-sky-600 bg-clip-text text-transparent font-["Outfit",sans-serif]'
            }`}
          >
            Serviceku
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse hidden sm:inline-block" />
        </div>

        {showSubtitle && (
          <>
            <div className="flex items-center gap-1 my-0.5">
              <span className={`h-[1.5px] w-4 ${light ? 'bg-cyan-400' : 'bg-blue-600'}`} />
              <span
                className={`font-extrabold tracking-widest uppercase ${subSizes} ${
                  light ? 'text-cyan-200' : 'text-blue-900 font-["Outfit",sans-serif]'
                }`}
              >
                ELEKTRONIK TERBAIK
              </span>
              <span className={`h-[1.5px] w-4 ${light ? 'bg-cyan-400' : 'bg-blue-600'}`} />
            </div>

            <p
              className={`font-bold tracking-tight text-[8px] sm:text-[9.5px] uppercase ${
                light ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              - Spesialis Pendingin & Mesin Elektronik -
            </p>
          </>
        )}
      </div>
    </div>
  );
};
