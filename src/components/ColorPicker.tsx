'use client';

import { memo } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = memo(function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="p-1 h-10 w-full block bg-gray-800 border border-gray-700 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 uppercase text-sm font-mono">
          {value}
        </span>
      </div>
    </div>
  );
});
