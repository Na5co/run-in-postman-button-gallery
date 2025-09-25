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
        const iconElement = React.createElement(IconComponent);
        const renderedString = renderToStaticMarkup(iconElement);
        const svgContentsMatch = renderedString.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        if (svgContentsMatch && svgContentsMatch[1]) {
          iconSvg = svgContentsMatch[1];
        }
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
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-violet-900 border border-violet-500 rounded-full mb-8">
            <Star className="w-4 h-4 mr-2 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">Professional Button Designer</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent leading-tight [text-shadow:0_4px_20px_rgba(138,43,226,0.3)]">
            Postman Button
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Studio
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Craft stunning, professional-grade Run in Postman buttons with unique designs, 
            advanced animations, and custom gradient colors. Elevate your API documentation.
          </p>

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
        </div>
      </section>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-1 order-2 xl:order-1">
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
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 order-1 xl:order-2 space-y-8">
            <ButtonGallery
              selectedStyle={selectedStyle}
              customGradient={customGradient}
              onStyleSelect={handleStyleSelect}
            />
            
            <LivePreview
              selectedStyle={livePreviewStyle}
              customGradient={customGradient}
              animations={animations}
              textColor={textColor}
              selectedIcon={selectedIcon}
              buttonText={buttonText}
            />
            
            {isValidConfig && <ExportCode generatedHtml={generatedHtml} />}
          </div>
        </div>
      </div>
    </div>
  );
}