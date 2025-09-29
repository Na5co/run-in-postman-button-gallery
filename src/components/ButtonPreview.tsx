'use client';

import React, { memo, useMemo } from 'react';
import { ButtonStyle, CustomGradient, ButtonAnimation } from '@/types/button';
import { getCombinedAnimationClass, getAnimationCSS } from '@/lib/animations';
import { getButtonDynamicStyles } from '@/lib/button-styles';
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
  isLivePreview?: boolean;
  collectionId?: string;
  workspaceId?: string;
}

export const ButtonPreview = memo(function ButtonPreview({ 
  style, 
  customGradient, 
  onClick,
  isSelected = false,
  animations,
  selectedIcon,
  buttonText = 'Run in Postman',
  isLivePreview = false,
  collectionId,
  workspaceId,
}: ButtonPreviewProps) {
  const gradientFrom = customGradient?.from || style.gradientFrom;
  const gradientTo = customGradient?.to || style.gradientTo;

  const buttonStyles = useMemo(() => {
    return getButtonDynamicStyles(style, gradientFrom, gradientTo);
  }, [style, gradientFrom, gradientTo]);

  const shouldAnimate = isLivePreview || isSelected;
  const animationClass = shouldAnimate && animations ? getCombinedAnimationClass(animations.hover, animations.entrance) : '';
  
  const animationCSS = useMemo(() => {
    if (!shouldAnimate || !animations) {
      return '';
    }
    const cssParts = [];
    if (animations.entrance && animations.entrance.id !== 'none') {
      cssParts.push(getAnimationCSS(animations.entrance, `.${animations.entrance.cssClass}`));
    }
    if (animations.hover && animations.hover.id !== 'none') {
      cssParts.push(getAnimationCSS(animations.hover, `.${animations.hover.cssClass}:hover`));
    }
    return cssParts.join('\n');
  }, [shouldAnimate, animations]);
  
  const handleLivePreviewClick = () => {
    if (collectionId && workspaceId) {
      const url = `https://app.getpostman.com/run-collection/${collectionId}?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D${collectionId}%26entityType%3Dcollection%26workspaceId%3D${workspaceId}`;
      window.open(url, '_blank');
    }
  };
  
  const containerClasses = isLivePreview
    ? 'relative p-6 rounded-2xl'
    : `relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${
        isSelected
          ? 'border-violet-500 bg-violet-900/50 shadow-2xl scale-105'
          : 'border-gray-700 hover:border-gray-600 hover:shadow-lg bg-gray-800'
      }`;

  return (
    <div>
      {animationCSS && (
        <style dangerouslySetInnerHTML={{ __html: animationCSS }} />
      )}
      <div
        className={containerClasses}
        onClick={isLivePreview ? handleLivePreviewClick : onClick}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center items-center min-h-[80px] w-full">
            <div
              className={`inline-flex items-center gap-2 select-none transition-all duration-300 ${isLivePreview ? 'cursor-pointer' : ''} ${animationClass}`}
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
