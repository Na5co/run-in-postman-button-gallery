'use client';

import React, { memo, useMemo } from 'react';
import { ButtonStyle, CustomGradient, ButtonAnimation } from '@/types/button';
import { getCombinedAnimationClass, getAnimationCSS } from '@/lib/animations';
import { shadeColor } from '@/lib/colors';
import {
  Rocket, Heart, Star, Download, Upload, Lock, Unlock,
  ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle
} from 'lucide-react';

const iconComponents = {
  Rocket, Heart, Star, Download, Upload, Lock, Unlock,
  ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle
};

interface ButtonPreviewProps {
  style: ButtonStyle;
  customGradient?: CustomGradient;
  onClick?: () => void;
  isSelected?: boolean;
  animations?: ButtonAnimation;
  selectedIcon?: string | null;
  buttonText?: string;
}

export const ButtonPreview = memo(function ButtonPreview({ 
  style, 
  customGradient, 
  onClick,
  isSelected = false,
  animations,
  selectedIcon,
  buttonText = 'Run in Postman',
}: ButtonPreviewProps) {
  const gradientFrom = customGradient?.from || style.gradientFrom;
  const gradientTo = customGradient?.to || style.gradientTo;

  const buttonStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      color: style.textColor,
      borderRadius: style.borderRadius,
      padding: style.padding,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      boxShadow: style.shadow,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
    };

    // Special handling for different button types
    if (style.id === 'outlined-minimal') {
      return {
        ...baseStyles,
        background: 'transparent',
        border: `2px solid ${gradientFrom}`,
        boxShadow: 'none',
        color: gradientFrom,
      };
    }

    if (style.id === 'glassmorphism') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}40, ${gradientTo}40)`,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)'
      };
    }

    if (style.id === 'retro-vintage') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        textTransform: 'uppercase' as const,
        letterSpacing: '1px'
      };
    }

    if (style.id === 'elevated-3d') {
      const darkerColor = shadeColor(gradientTo, -20);
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 8px 0 ${darkerColor}, 0 12px 25px ${gradientTo}66`,
      };
    }
    
    if (style.id === 'pixel-art') {
      const shadowColor = shadeColor(gradientTo, -40);
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `4px 4px 0px ${shadowColor}`,
        border: `4px solid ${shadeColor(gradientTo, -50)}`
      };
    }

    if (style.id === 'subtle-shimmer') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 10px 20px ${gradientTo}33`,
      };
    }

    if (style.id === 'skewed-dynamic') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 10px 20px ${gradientTo}33`,
        transform: 'skew(-10deg)',
      };
    }

    if (style.id === 'minimalist-icon') {
        return {
            ...baseStyles,
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 4px 10px ${gradientTo}4d`,
            borderRadius: '50%',
            padding: '16px',
        }
    }

    if (style.id === 'bold-block') {
      const textColor = shadeColor(gradientFrom, -50);
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 0 0 4px ${textColor}`,
        color: textColor,
        border: `2px solid ${textColor}`
      };
    }

    if (style.id === 'comic-book') {
      const shadowColor = shadeColor(gradientTo, -50);
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `3px solid ${shadowColor}`,
        boxShadow: `6px 6px 0px ${shadowColor}`,
        color: shadowColor,
        fontWeight: '900',
      };
    }

    if (style.id === 'caution-tape') {
      return {
        ...baseStyles,
        backgroundImage: `repeating-linear-gradient(45deg, ${gradientFrom}, ${gradientFrom} 30px, ${gradientTo} 30px, ${gradientTo} 60px)`,
        color: shadeColor(gradientTo, -60),
        fontWeight: '800',
        border: `4px solid ${shadeColor(gradientTo, -60)}`,
      };
    }

    if (style.id === 'cyberpunk-glitch') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 0 15px ${gradientTo}`,
        textShadow: `2px 2px 0px ${gradientFrom}`,
      };
    }

    if (style.id === 'hand-drawn') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `3px solid ${shadeColor(gradientTo, -20)}`,
        borderRadius: '16px 4px 16px 4px / 4px 16px 4px 16px',
        color: shadeColor(gradientTo, -20),
      };
    }

    if (style.id === 'ugly-90s') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `4px solid ${style.textColor}`,
        boxShadow: `4px 4px 0px ${style.textColor}`,
        color: style.textColor,
        fontWeight: '900',
      };
    }

    if (style.id === 'baroque-luxury') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        border: `2px solid ${shadeColor(gradientFrom, -20)}`,
        boxShadow: `0 0 15px ${gradientFrom}`,
        fontFamily: 'serif',
      };
    }

    if (style.id === 'wood-grain') {
      return {
        ...baseStyles,
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo}), linear-gradient(to right, rgba(255,255,255,0.2) 50%, transparent 50%), linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%)`,
        backgroundBlendMode: 'screen',
        backgroundSize: '100%, 8px 8px, 8px 8px',
        border: `2px solid ${shadeColor(gradientFrom, -20)}`,
      };
    }

    if (style.id === 'liquid-metal') {
      return {
        ...baseStyles,
        background: `radial-gradient(circle at 100% 100%, ${gradientFrom} 0, ${gradientTo} 100%)`,
        boxShadow: `0 0 15px ${gradientTo}`,
        color: shadeColor(gradientTo, -40),
      };
    }

    if (style.id === 'blueprint') {
      return {
        ...baseStyles,
        background: gradientFrom,
        border: `2px dashed ${gradientTo}`,
        color: gradientTo,
      };
    }

    if (style.id === 'rusted-metal') {
      return {
        ...baseStyles,
        backgroundImage: `linear-gradient(${gradientFrom}, ${gradientTo}), repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 2px, transparent 2px, transparent 4px)`,
        boxShadow: `inset 0 0 10px ${shadeColor(gradientFrom, -30)}`,
      };
    }

    if (style.id === 'satin-finish') {
      return {
        ...baseStyles,
        background: `linear-gradient(180deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `inset 0 1px 0 ${shadeColor(gradientFrom, 20)}, 0 10px 20px rgba(0,0,0,0.1)`,
        color: style.textColor,
      };
    }

    if (style.id === 'letterpress') {
      return {
        ...baseStyles,
        background: gradientFrom,
        boxShadow: `inset 0 2px 4px ${shadeColor(gradientFrom, -10)}, 0 1px 1px ${shadeColor(gradientFrom, 10)}`,
        textShadow: `0 1px 1px ${shadeColor(gradientFrom, 10)}`,
        color: style.textColor,
      };
    }

    if (style.id === 'dual-tone') {
      return {
        ...baseStyles,
        background: `linear-gradient(90deg, ${gradientFrom} 50%, ${gradientTo} 50%)`,
        color: style.textColor,
      };
    }

    if (style.id === 'aurora') {
      return {
        ...baseStyles,
        backgroundImage: `radial-gradient(ellipse at bottom, ${gradientFrom}, transparent), radial-gradient(ellipse at top, ${gradientTo}, transparent)`,
        boxShadow: `0 0 20px ${gradientTo}`,
        color: style.textColor,
      };
    }

    if (style.id === 'minimalist-stroke') {
      return {
        ...baseStyles,
        background: 'transparent',
        border: `2px solid ${gradientFrom}`,
        color: gradientFrom,
      };
    }

    if (style.id === 'neumorphism') {
      return {
        ...baseStyles,
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      };
    }

    // Default gradient background
    return {
      ...baseStyles,
      background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`
    };
  }, [style, gradientFrom, gradientTo]);

  const getIconSize = () => {
    if (style.id === 'icon-heavy') return { width: '24', height: '24' };
    if (style.id === 'retro-vintage') return { width: '20', height: '20' };
    return { width: '16', height: '16' };
  };

  const animationClass = isSelected && animations ? getCombinedAnimationClass(animations.hover, animations.entrance) : '';
  const animationCSS = isSelected && animations ? 
    [
      animations.entrance ? getAnimationCSS(animations.entrance, animationClass) : '',
      animations.hover ? getAnimationCSS(animations.hover, `${animationClass}:hover`) : ''
    ].join('\n') : '';

  return (
    <div>
      {animationCSS && (
        <style dangerouslySetInnerHTML={{ __html: animationCSS }} />
      )}
    <div 
      className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
        isSelected 
          ? 'border-violet-500 bg-violet-900/50 shadow-2xl scale-105' 
          : 'border-gray-700 hover:border-gray-600 hover:shadow-lg bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center min-h-[80px] w-full">
          <div
            className={`inline-flex items-center gap-2 select-none cursor-pointer transition-all duration-300 ${animationClass}`}
            style={buttonStyles}
          >
            {selectedIcon && React.createElement(iconComponents[selectedIcon as keyof typeof iconComponents], { className: 'w-4 h-4' })}
            {style.id === 'icon-heavy' ? 'Run' : style.id === 'minimalist-icon' ? '' : buttonText}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold text-white text-lg">{style.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{style.description}</p>
        </div>
      </div>
    </div>
    </div>
  );
});
