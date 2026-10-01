import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'mark';
  theme?: 'light' | 'dark' | 'auto';
  showBadge?: boolean;
}

export const AlexaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  theme = 'light',
  showBadge = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension presets
  const dimensions = {
    sm: { height: 28, iconSize: 28, textClass: 'text-sm' },
    md: { height: 36, iconSize: 36, textClass: 'text-lg' },
    lg: { height: 46, iconSize: 46, textClass: 'text-xl' },
    xl: { height: 58, iconSize: 58, textClass: 'text-2xl' },
  }[size];

  const textColor = theme === 'dark' ? 'text-white' : 'text-stone-900';

  // Icon only
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/vantox-logo.png"
          alt="VanTox Ai Logo"
          className="rounded-xl object-cover shadow-2xs border border-stone-800/10"
          style={{ width: `${dimensions.iconSize}px`, height: `${dimensions.iconSize}px` }}
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              (e.target as HTMLImageElement).src = '/logo.png';
            }
          }}
        />
      </div>
    );
  }

  // Full Wordmark: Icon + "VanTox" + "Ai" + optional badge
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative shrink-0">
        <img
          src="/vantox-logo.png"
          alt="VanTox Ai Logo"
          className="rounded-xl object-cover shadow-2xs border border-stone-800/10"
          style={{ width: `${dimensions.iconSize}px`, height: `${dimensions.iconSize}px` }}
          onError={(e) => {
            if (!imageError) {
              setImageError(true);
              (e.target as HTMLImageElement).src = '/logo.png';
            }
          }}
        />
      </div>

      <div className="flex items-center font-extrabold tracking-tight leading-none">
        <span className={`${dimensions.textClass} ${textColor} tracking-tight font-extrabold`}>
          VanTox
        </span>
        <span className={`${dimensions.textClass} bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent ml-1 font-black`}>
          Ai
        </span>

        {showBadge && (
          <span className="ml-2 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 hidden sm:inline-block">
            Official
          </span>
        )}
      </div>
    </div>
  );
};

// Export aliases
export const VanToxLogo = AlexaLogo;
export const BrandLogo = AlexaLogo;
