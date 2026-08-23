import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'emblem' | 'horizontal';
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * ExpressMove Official Monogram Emblem (Exact replica of Image 3)
 * Features the 3-bar velocity 'E' in emerald green and the faceted origami 'M' in deep dark forest green
 */
export const ExpressMoveIcon: React.FC<{
  className?: string;
  size?: number | string;
}> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 170 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        <defs>
          {/* Vibrant Green Gradient for 'E' Velocity Bars */}
          <linearGradient id="em-e-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="em-e-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id="em-e-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          {/* Faceted Deep Forest Shading for 'M' Origami */}
          <linearGradient id="em-m-facet-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B301B" />
            <stop offset="100%" stopColor="#051C0F" />
          </linearGradient>
          <linearGradient id="em-m-facet-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14532D" />
            <stop offset="100%" stopColor="#09311A" />
          </linearGradient>
          <linearGradient id="em-m-facet-mid2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#051C0F" />
            <stop offset="100%" stopColor="#0B301B" />
          </linearGradient>
          <linearGradient id="em-m-facet-right" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A2C17" />
            <stop offset="100%" stopColor="#04160B" />
          </linearGradient>
        </defs>

        {/* --- 'E' 3 SPEED BARS (SLANTED 18 DEG) --- */}
        {/* Top Bar of E */}
        <polygon
          points="20,20 100,20 90,38 10,38"
          fill="url(#em-e-grad-1)"
        />

        {/* Middle Bar of E (Connects smoothly with M apex) */}
        <polygon
          points="14,52 64,52 54,70 4,70"
          fill="url(#em-e-grad-2)"
        />

        {/* Bottom Bar of E */}
        <polygon
          points="0,84 80,84 70,102 -10,102"
          fill="url(#em-e-grad-3)"
        />

        {/* --- 'M' FACETED 3D GEOMETRIC SHAPES (EXACT FACETS AS IN IMAGE 3) --- */}
        {/* Left Outer Leg / Upper Diamond of M */}
        <polygon
          points="100,20 128,20 84,74 64,52"
          fill="url(#em-m-facet-left)"
        />

        {/* Left Inner Valley Facet */}
        <polygon
          points="64,52 84,74 94,62"
          fill="#062212"
        />

        {/* Center Peak Forward Fold */}
        <polygon
          points="84,74 94,62 118,102 96,102"
          fill="url(#em-m-facet-mid)"
        />

        {/* Right Valley Facet */}
        <polygon
          points="94,62 128,20 148,20 118,102"
          fill="url(#em-m-facet-mid2)"
        />

        {/* Right Descending Column / Leg of M */}
        <polygon
          points="148,20 168,20 138,102 118,102"
          fill="url(#em-m-facet-right)"
        />
      </svg>
    </div>
  );
};

/**
 * ExpressMove Complete Brand Logo (Image 3 exact typography, lines & tagline)
 */
export const ExpressMoveLogo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'auto',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';

  if (variant === 'icon' || variant === 'emblem') {
    return <ExpressMoveIcon className={className} />;
  }

  // Size configurations
  const sizeStyles = {
    sm: {
      icon: 'w-7 h-5',
      title: 'text-lg',
      sub: 'text-[7.5px] tracking-[0.28em]',
      tagline: 'text-[6px] tracking-[0.22em]',
      divider: 'h-7',
      barHeight: 'h-[1.5px]',
    },
    md: {
      icon: 'w-9 h-6 sm:w-10 sm:h-7',
      title: 'text-xl sm:text-2xl',
      sub: 'text-[8.5px] sm:text-[9.5px] tracking-[0.32em]',
      tagline: 'text-[6.5px] sm:text-[7.5px] tracking-[0.25em]',
      divider: 'h-8 sm:h-9',
      barHeight: 'h-[1.5px]',
    },
    lg: {
      icon: 'w-12 h-8 sm:w-14 sm:h-10',
      title: 'text-2xl sm:text-3xl',
      sub: 'text-[10px] sm:text-[11px] tracking-[0.35em]',
      tagline: 'text-[8px] sm:text-[9px] tracking-[0.28em]',
      divider: 'h-11 sm:h-12',
      barHeight: 'h-[2px]',
    },
    xl: {
      icon: 'w-16 h-11 sm:w-20 sm:h-14',
      title: 'text-3xl sm:text-4xl',
      sub: 'text-xs tracking-[0.38em]',
      tagline: 'text-[9.5px] sm:text-[10.5px] tracking-[0.32em]',
      divider: 'h-14 sm:h-16',
      barHeight: 'h-[2px]',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none group cursor-pointer ${className}`}>
      {/* 1. EM Stylized Geometric Emblem */}
      <ExpressMoveIcon className={sizeStyles.icon} />

      {/* 2. Vertical Divider (as shown in Image 3) */}
      <div
        className={`w-[1.5px] bg-slate-300 dark:bg-slate-700 ${sizeStyles.divider} self-center`}
      />

      {/* 3. Typography & Subtitles Unit */}
      <div className="flex flex-col text-left justify-center">
        {/* Express (Black Italic Bold) + Move (Green Italic Bold) */}
        <div className={`leading-none flex items-baseline font-extrabold italic tracking-tight font-['Plus_Jakarta_Sans',sans-serif] ${sizeStyles.title}`}>
          <span className={isDark ? 'text-white' : 'text-[#0F172A]'}>
            Express
          </span>
          <span className="text-[#16A34A] ml-0.5">
            Move
          </span>
        </div>

        {/* — LOGISTICS — with centered green lines */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
          <div className={`flex-1 bg-[#16A34A] ${sizeStyles.barHeight}`} />
          <span className={`font-black uppercase text-slate-800 dark:text-slate-200 leading-none ${sizeStyles.sub}`}>
            LOGISTICS
          </span>
          <div className={`flex-1 bg-[#16A34A] ${sizeStyles.barHeight}`} />
        </div>

        {/* WE MOVE. YOU MOVE FORWARD. (Shown on md, lg, xl sizes) */}
        {size !== 'sm' && (
          <div className={`font-bold uppercase text-slate-600 dark:text-slate-400 mt-1 leading-none ${sizeStyles.tagline}`}>
            WE MOVE. YOU MOVE FORWARD.
          </div>
        )}
      </div>
    </div>
  );
};

// Aliases for seamless backwards compatibility
export const XpressMovementIcon = ExpressMoveIcon;
export const XpressMovementLogo = ExpressMoveLogo;
