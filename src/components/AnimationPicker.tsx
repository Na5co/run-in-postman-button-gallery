'use client';

import { memo } from 'react';
import { ButtonAnimation } from '@/types/button';
import { hoverAnimations } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimationPickerProps {
  animations: ButtonAnimation;
  onChange: (animations: ButtonAnimation) => void;
}

interface AnimationButtonProps {
  animation: { id: string; name: string };
  selected: boolean;
  onClick: (id: string) => void;
}

const AnimationButton = ({ animation, selected, onClick }: AnimationButtonProps) => (
  <button
    onClick={() => onClick(animation.id)}
    className={cn(
      'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500',
      selected
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
    )}
  >
    {animation.name}
  </button>
);

export const AnimationPicker = memo(function AnimationPicker({ 
  animations, 
  onChange 
}: AnimationPickerProps) {

  const handleHoverChange = (id: string) => {
    const hover = hoverAnimations.find(a => a.id === id);
    onChange({
      ...animations,
      hover: hover && hover.id !== 'none' ? hover : null
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-semibold text-slate-300 mb-4">
          Hover Effect
        </label>
        <div className="flex flex-wrap gap-3">
          {hoverAnimations.map((animation) => (
            <AnimationButton
              key={animation.id}
              animation={animation}
              selected={animations.hover?.id === animation.id || (animation.id === 'none' && !animations.hover)}
              onClick={handleHoverChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
