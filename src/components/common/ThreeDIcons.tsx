import React from 'react';

interface IconProps {
  className?: string;
  size?: number | string;
}

/**
 * 3D Open Moving Box (Vecteezy 3D clay/glossy style with emerald ribbons and kraft paper depth)
 */
export const ThreeDBoxIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="box-top-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#65A30D" />
        </radialGradient>
        <linearGradient id="box-left-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#4D7C0F" />
        </linearGradient>
        <linearGradient id="box-right-face" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4D7C0F" />
          <stop offset="100%" stopColor="#1A2E05" />
        </linearGradient>
        <linearGradient id="box-inside" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#14532D" />
          <stop offset="100%" stopColor="#052E16" />
        </linearGradient>
        <linearGradient id="tape-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#FACC15" />
        </linearGradient>
      </defs>
      
      {/* Box Interior Shadow */}
      <polygon points="60,25 95,45 60,65 25,45" fill="url(#box-inside)" />
      
      {/* Left Outer Flap Opened */}
      <polygon points="25,45 10,35 45,20 60,25" fill="#65A30D" />
      <polygon points="25,45 10,35 10,42 25,52" fill="#365314" opacity="0.6" />

      {/* Right Outer Flap Opened */}
      <polygon points="60,25 75,20 110,35 95,45" fill="#84CC16" />

      {/* Left Front Face */}
      <polygon points="25,45 60,65 60,105 25,85" fill="url(#box-left-face)" />
      
      {/* Right Front Face */}
      <polygon points="60,65 95,45 95,85 60,105" fill="url(#box-right-face)" />

      {/* 3D Highlight & Seams */}
      <line x1="60" y1="65" x2="60" y2="105" stroke="#ECFCCB" strokeWidth="2" opacity="0.6" />
      <line x1="25" y1="45" x2="60" y2="65" stroke="#ECFCCB" strokeWidth="1.5" opacity="0.7" />

      {/* Fragile Glass / Express Stamp on Left Wall */}
      <circle cx="42" cy="72" r="7" fill="#FEF08A" opacity="0.9" />
      <path d="M40 70 L44 70 L42 75 Z" fill="#713F12" />
    </svg>
  </div>
);

/**
 * 3D Logistics Moving Truck (Vecteezy Heavy Freight Style)
 */
export const ThreeDTruckIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="truck-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#4D7C0F" />
        </linearGradient>
        <linearGradient id="truck-cab" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="truck-window" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <radialGradient id="wheel-rim" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#1E293B" />
        </radialGradient>
      </defs>

      {/* Truck Cargo Box */}
      <rect x="15" y="32" width="60" height="48" rx="6" fill="url(#truck-body)" />
      
      {/* Box Top Bevel */}
      <path d="M15 38 C15 34 18 32 22 32 H73 C74 32 75 34 75 38 V42 H15 Z" fill="#A3E635" />

      {/* Cargo Brand Speed Stripe */}
      <path d="M20 54 H68 L64 62 H16 Z" fill="#FFFFFF" opacity="0.85" />
      <circle cx="34" cy="58" r="2.5" fill="#4D7C0F" />

      {/* Truck Cab / Cabin */}
      <path d="M75 48 H94 C99 48 104 53 105 58 L108 68 C109 71 109 80 105 80 H75 Z" fill="url(#truck-cab)" />

      {/* Windshield */}
      <path d="M78 52 H91 L98 64 H78 Z" fill="url(#truck-window)" />

      {/* Front Headlight */}
      <rect x="104" y="68" width="4" height="6" rx="2" fill="#FDE047" />

      {/* Wheels */}
      <circle cx="35" cy="84" r="11" fill="#0F172A" />
      <circle cx="35" cy="84" r="5" fill="url(#wheel-rim)" />

      <circle cx="88" cy="84" r="11" fill="#0F172A" />
      <circle cx="88" cy="84" r="5" fill="url(#wheel-rim)" />
    </svg>
  </div>
);

/**
 * 3D House / Home Relocation Badge (Vecteezy 3D Isometric Home)
 */
export const ThreeDHomeIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="home-roof-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>
        <linearGradient id="home-roof-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4D7C0F" />
          <stop offset="100%" stopColor="#1E3A10" />
        </linearGradient>
        <linearGradient id="home-wall-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="home-door" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
      </defs>

      {/* Roof Left */}
      <polygon points="60,20 20,48 30,52 60,30" fill="url(#home-roof-left)" />
      
      {/* Roof Main */}
      <polygon points="60,20 100,48 90,52 60,30" fill="url(#home-roof-right)" />

      {/* Main Front Wall */}
      <polygon points="28,50 92,50 92,95 28,95" fill="url(#home-wall-front)" />

      {/* Door */}
      <rect x="50" y="65" width="20" height="30" rx="3" fill="url(#home-door)" />
      <circle cx="66" cy="80" r="1.5" fill="#FEF08A" />

      {/* Window */}
      <rect x="34" y="58" width="12" height="14" rx="2" fill="#38BDF8" opacity="0.8" />
      <rect x="74" y="58" width="12" height="14" rx="2" fill="#38BDF8" opacity="0.8" />

      {/* Base Foundation */}
      <rect x="22" y="93" width="76" height="6" rx="3" fill="#94A3B8" />
    </svg>
  </div>
);

/**
 * 3D Commercial Corporate Office Building
 */
export const ThreeDOfficeIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="bldg-front" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#4D7C0F" />
        </linearGradient>
        <linearGradient id="bldg-side" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#365314" />
          <stop offset="100%" stopColor="#142407" />
        </linearGradient>
      </defs>

      {/* Tower Main Front */}
      <path d="M30 25 H72 V98 H30 Z" fill="url(#bldg-front)" />
      
      {/* Tower Right Perspective */}
      <polygon points="72,25 92,38 92,98 72,98" fill="url(#bldg-side)" />

      {/* Glass Windows Grid */}
      {[34, 46, 58, 70, 82].map((y, i) => (
        <g key={i}>
          <rect x="36" y={y} width="8" height="7" rx="1.5" fill="#ECFCCB" opacity="0.9" />
          <rect x="48" y={y} width="8" height="7" rx="1.5" fill="#ECFCCB" opacity="0.9" />
          <rect x="60" y={y} width="8" height="7" rx="1.5" fill="#ECFCCB" opacity="0.9" />
          {/* Side Windows */}
          <polygon points={`76,${y+3} 86,${y+6} 86,${y+11} 76,${y+8}`} fill="#65A30D" opacity="0.7" />
        </g>
      ))}

      {/* Modern Entrance Canopy */}
      <rect x="42" y="88" width="18" height="10" rx="2" fill="#FEF08A" />
    </svg>
  </div>
);

/**
 * 3D Gold & Emerald Goods-In-Transit Insurance Shield
 */
export const ThreeDShieldIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="shield-core" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="50%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#14532D" />
        </radialGradient>
        <linearGradient id="shield-gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>
      </defs>

      {/* Gold 3D Bevel Border */}
      <path
        d="M60 18 L94 32 C94 65 78 88 60 98 C42 88 26 65 26 32 Z"
        fill="url(#shield-gold-border)"
      />

      {/* Emerald Core */}
      <path
        d="M60 25 L88 37 C88 64 74 83 60 91 C46 83 32 64 32 37 Z"
        fill="url(#shield-core)"
      />

      {/* 3D Checkmark */}
      <path
        d="M48 56 L56 64 L74 44"
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 56 L56 64 L74 44"
        stroke="#FEF08A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

/**
 * 3D GPS Location Navigation Pin (Vecteezy 3D Pin Style)
 */
export const ThreeDMapPinIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <radialGradient id="pin-head" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="60%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#1E3A10" />
        </radialGradient>
      </defs>

      {/* Pin Shadow on Ground */}
      <ellipse cx="60" cy="102" rx="18" ry="6" fill="#0F172A" opacity="0.3" />

      {/* Pin Body */}
      <path
        d="M60 18 C42 18 28 32 28 50 C28 72 56 98 60 102 C64 98 92 72 92 50 C92 32 78 18 60 18 Z"
        fill="url(#pin-head)"
      />

      {/* Inner Sphere */}
      <circle cx="60" cy="48" r="14" fill="#FFFFFF" />
      <circle cx="60" cy="48" r="8" fill="#4D7C0F" />
      
      {/* Specular Glint */}
      <ellipse cx="50" cy="32" rx="6" ry="3" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 50 32)" />
    </svg>
  </div>
);

/**
 * 3D Customer Support Headset (Step 1 of How It Works)
 */
export const ThreeDHeadsetIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="headset-band" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="50%" stopColor="#ECFCCB" />
          <stop offset="100%" stopColor="#65A30D" />
        </linearGradient>
        <radialGradient id="ear-cup" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#1E3A10" />
        </radialGradient>
      </defs>

      {/* Headband Arch */}
      <path
        d="M30 62 C30 35 43 22 60 22 C77 22 90 35 90 62"
        stroke="url(#headset-band)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Left Ear Cushion */}
      <rect x="20" y="54" width="18" height="28" rx="8" fill="url(#ear-cup)" />
      
      {/* Right Ear Cushion */}
      <rect x="82" y="54" width="18" height="28" rx="8" fill="url(#ear-cup)" />

      {/* Microphone Arm */}
      <path
        d="M86 72 C86 88 74 96 58 96"
        stroke="#4D7C0F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Mic Tip */}
      <ellipse cx="54" cy="96" rx="6" ry="4" fill="#FACC15" />
    </svg>
  </div>
);

/**
 * 3D Clipboard Moving Plan (Step 2 of How It Works)
 */
export const ThreeDClipboardIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="board-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
      </defs>

      {/* Clipboard Backing */}
      <rect x="30" y="24" width="60" height="76" rx="8" fill="url(#board-bg)" />
      
      {/* Paper Sheet */}
      <rect x="36" y="34" width="48" height="60" rx="4" fill="#FFFFFF" />

      {/* Metallic Top Clip */}
      <rect x="48" y="18" width="24" height="12" rx="4" fill="#FACC15" />
      <circle cx="60" cy="22" r="2.5" fill="#713F12" />

      {/* Checkmarks & Plan Lines */}
      {[44, 56, 68, 80].map((y, i) => (
        <g key={i}>
          <circle cx="44" cy={y} r="3" fill="#84CC16" />
          <line x1="52" y1={y} x2="76" y2={y} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  </div>
);

/**
 * 3D WhatsApp Glossy Badge with Authentic Official Icon
 */
export const ThreeDWhatsAppIcon: React.FC<IconProps> = ({ className = 'w-12 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        fill="#FFFFFF"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      />
    </svg>
  </div>
);

/**
 * 3D Stylized Nigerian Geopolitical Map
 */
export const ThreeDNigeriaMap: React.FC<IconProps> = ({ className = 'w-16 h-12' }) => (
  <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
    <svg viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="ng-map-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="50%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
      </defs>
      {/* Stylized Nigeria Shape */}
      <path
        d="M20 40 L35 25 L65 15 L95 20 L125 35 L120 70 L95 85 L70 90 L40 85 L15 65 Z"
        fill="url(#ng-map-grad)"
      />
      {/* 3 Major Hub Dots */}
      <circle cx="35" cy="65" r="4" fill="#FEF08A" /> {/* Lagos */}
      <circle cx="68" cy="48" r="4" fill="#FFFFFF" /> {/* Abuja */}
      <circle cx="72" cy="78" r="4" fill="#FEF08A" /> {/* Port Harcourt */}
    </svg>
  </div>
);
