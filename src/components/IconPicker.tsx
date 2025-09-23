'use client';

import { memo } from 'react';
import {
  Rocket, Heart, Star, Download, Upload, Lock, Unlock,
  ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle
} from 'lucide-react';

interface IconPickerProps {
  selectedIcon: string | null;
  onIconSelect: (icon: string | null) => void;
}

const iconComponents = {
  Rocket, Heart, Star, Download, Upload, Lock, Unlock,
  ThumbsUp, ThumbsDown, Gift, Send, Settings, Trash2, PlusCircle, MinusCircle
};
const iconNames = Object.keys(iconComponents);

export const IconPicker = memo(function IconPicker({
  selectedIcon,
  onIconSelect,
}: IconPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">
        Button Icon
      </label>
      <div className="grid grid-cols-5 gap-2">
        <button
          onClick={() => onIconSelect(null)}
          className={`w-full aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
            !selectedIcon
              ? 'border-violet-500 ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-900 shadow-lg'
              : 'border-gray-700 hover:border-gray-500'
          }`}
        >
          <span className="text-gray-400 text-xs">None</span>
        </button>
        {iconNames.map((name) => {
          const LucideIcon = iconComponents[name as keyof typeof iconComponents];
          return (
            <button
              key={name}
              onClick={() => onIconSelect(name)}
              className={`w-full aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                selectedIcon === name
                  ? 'border-violet-500 ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-900 shadow-lg'
                  : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <LucideIcon className="w-5 h-5 text-white" />
            </button>
          );
        })}
      </div>
    </div>
  );
});
