'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Palette, Layers, Rocket, Clapperboard, Star, Heart, Download, Upload, Lock, Unlock, ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle } from 'lucide-react';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { ButtonGallery } from '@/components/ButtonGallery';
import { LivePreview } from '@/components/LivePreview';
import { ExportCode } from '@/components/ExportCode';
import { defaultButtonStyles } from '@/lib/button-styles';
import { generatePostmanButtonHtml, generateInlineButtonHtml } from '@/lib/html-generator';
import { ButtonStyle, CustomGradient, ButtonAnimation } from '@/types/button';
import { AnimatedDiv } from '@/components/AnimatedDiv';

const iconComponents = {
  Rocket, Heart, Star, Download, Upload, Lock, Unlock,
  ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle
};

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<ButtonStyle>(defaultButtonStyles[0]);
  const [customGradient, setCustomGradient] = useState<CustomGradient>({
    from: selectedStyle.gradientFrom,
    to: selectedStyle.gradientTo
  });
  const [collectionId, setCollectionId] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [buttonText, setButtonText] = useState('Run in Postman');
  const [animations, setAnimations] = useState<ButtonAnimation>({
    hover: null,
    entrance: null
  });
  const [textColor, setTextColor] = useState(selectedStyle.textColor);
  const [selectedIcon, setSelectedIcon] = useState<string | null>('Rocket');

  const handleStyleSelect = useCallback((style: ButtonStyle) => {
    setSelectedStyle(style);
    setCustomGradient({
      from: style.gradientFrom,
      to: style.gradientTo
    });
    setTextColor(style.textColor);
  }, []);

  const livePreviewStyle = useMemo(() => ({
    ...selectedStyle,
    textColor,
  }), [selectedStyle, textColor]);

  const isValidConfig = useMemo(() => collectionId.trim() !== '' && workspaceId.trim() !== '', [collectionId, workspaceId]);

  const generatedHtml = useMemo(() => {
    if (!isValidConfig) return null;
    
    let iconSvg = '';
    if (selectedIcon) {
      const IconComponent = iconComponents[selectedIcon as keyof typeof iconComponents];
      if (IconComponent) {
        const getIconSize = () => {
          if (selectedStyle.id === 'icon-heavy') return '32';
          if (selectedStyle.id === 'retro-vintage') return '20';
          return '16';
        };
        const iconSize = getIconSize();

        const iconElement = React.createElement(IconComponent, { size: iconSize });
        let svgString = renderToStaticMarkup(iconElement);

        // Add margin if the button has text
        const hasText = selectedStyle.id !== 'minimalist-icon';
        if (hasText) {
          svgString = svgString.replace('<svg', '<svg style="margin-right: 8px;"');
        }
        iconSvg = svgString;
      }
    }

    const options = {
      collectionId: collectionId.trim(),
      workspaceId: workspaceId.trim(),
      style: { ...selectedStyle, textColor },
      customGradient,
      buttonText,
      animations,
      icon: selectedIcon ? { name: selectedIcon, svg: iconSvg } : undefined,
    };

    return {
      full: generatePostmanButtonHtml(options),
      inline: generateInlineButtonHtml(options)
    };
  }, [isValidConfig, collectionId, workspaceId, selectedStyle, customGradient, buttonText, animations, textColor, selectedIcon]);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Lightweight Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600 opacity-5 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 opacity-5 rounded-full"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <AnimatedDiv>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-white leading-tight">
            Postman Button{' '}
            <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
              Studio
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Craft stunning, professional-grade Run in Postman buttons with unique designs, 
            advanced animations, and custom gradient colors. Elevate your API documentation.
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>{defaultButtonStyles.length} Unique Styles</span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>Custom Gradients</span>
            </div>
            <div className="flex items-center gap-2">
              <Clapperboard className="w-4 h-4" />
              <span>8 Animations</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span>Export Ready</span>
            </div>
          </div>
        </AnimatedDiv>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Configuration Panel */}
          <AnimatedDiv className="xl:col-span-1 order-2 xl:order-1" delay={0.4}>
            <ConfigurationPanel
              collectionId={collectionId}
              setCollectionId={setCollectionId}
              workspaceId={workspaceId}
              setWorkspaceId={setWorkspaceId}
              buttonText={buttonText}
              setButtonText={setButtonText}
              customGradient={customGradient}
              setCustomGradient={setCustomGradient}
              textColor={textColor}
              setTextColor={setTextColor}
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
              animations={animations}
              setAnimations={setAnimations}
              isValidConfig={isValidConfig}
            />
          </AnimatedDiv>

          {/* Main Content */}
          <div className="xl:col-span-3 order-1 xl:order-2 space-y-8">
            <AnimatedDiv>
              <ButtonGallery
                selectedStyle={selectedStyle}
                customGradient={customGradient}
                onStyleSelect={handleStyleSelect}
              />
            </AnimatedDiv>
            
            <AnimatedDiv delay={0.2}>
              <LivePreview
                selectedStyle={livePreviewStyle}
                customGradient={customGradient}
                animations={animations}
                textColor={textColor}
                selectedIcon={selectedIcon}
                buttonText={buttonText}
              />
            </AnimatedDiv>
            
            {isValidConfig && (
              <AnimatedDiv delay={0.4}>
                <ExportCode generatedHtml={generatedHtml} />
              </AnimatedDiv>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}