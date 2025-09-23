'use client';

import { memo } from 'react';
import { AnimationOption, ButtonAnimation } from '@/types/button';
import { hoverAnimations, entranceAnimations } from '@/lib/animations';
import { Play, MousePointer } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AnimationPickerProps {
  animations: ButtonAnimation;
  onChange: (animations: ButtonAnimation) => void;
}

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

  const handleEntranceChange = (id: string) => {
    const entrance = entranceAnimations.find(a => a.id === id);
    onChange({
      ...animations,
      entrance: entrance && entrance.id !== 'none' ? entrance : null
    });
  };

  return (
    <div className="space-y-4">
      {/* Hover Animations */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Hover Effect
        </label>
        <Select onValueChange={handleHoverChange} value={animations.hover?.id || 'none'}>
          <SelectTrigger>
            <div className="flex items-center space-x-2">
              <MousePointer className="w-4 h-4 text-blue-400" />
              <SelectValue placeholder="Select hover effect" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {hoverAnimations.map((animation) => (
              <SelectItem key={animation.id} value={animation.id}>
                {animation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Entrance Animations */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Entrance Effect
        </label>
        <Select onValueChange={handleEntranceChange} value={animations.entrance?.id || 'none'}>
          <SelectTrigger>
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4 text-green-400" />
              <SelectValue placeholder="Select entrance effect" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {entranceAnimations.map((animation) => (
              <SelectItem key={animation.id} value={animation.id}>
                {animation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
});
