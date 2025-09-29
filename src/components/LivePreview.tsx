'use client';

import { memo } from 'react';
import { Zap } from 'lucide-react';
import { ButtonPreview } from '@/components/ButtonPreview';
import { ButtonStyle, CustomGradient, ButtonAnimation } from '@/types/button';

interface LivePreviewProps {
  selectedStyle: ButtonStyle;
  customGradient: CustomGradient;
  animations: ButtonAnimation;
  textColor: string;
  selectedIcon: string | null;
  buttonText: string;
  collectionId: string;
  workspaceId: string;
}

export const LivePreview = memo(function LivePreview({
  selectedStyle,
  customGradient,
  animations,
  textColor,
  selectedIcon,
  buttonText,
  collectionId,
  workspaceId,
}: LivePreviewProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center space-x-3 mb-10">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Live Preview</h2>
        <span className="px-4 py-2 bg-emerald-900 border border-emerald-500 text-emerald-300 text-sm font-semibold rounded-full">
          {selectedStyle.name}
        </span>
      </div>
      
      <div className="flex justify-center p-16 bg-gray-800 rounded-2xl border border-gray-700">
        <ButtonPreview
          style={{...selectedStyle, textColor}}
          customGradient={customGradient}
          animations={animations}
          selectedIcon={selectedIcon}
          buttonText={buttonText}
          isLivePreview
          collectionId={collectionId}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
});
