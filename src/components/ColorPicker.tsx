'use client';

import { memo, useState, useEffect, useRef } from 'react';
import { colorOptions } from '@/lib/button-styles';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  colors?: { name: string; value: string }[];
}

export const ColorPicker = memo(function ColorPicker({ 
  label, 
  value, 
  onChange, 
  colors = colorOptions 
}: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedOnChange = useRef(debounce(onChange, 200)).current;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-400">
        {label}
      </label>
      
      <div className="grid grid-cols-4 gap-2">
        {colors.map((color) => (
          <button
            key={color.value}
            className={`w-full aspect-square rounded-lg border-2 transition-all duration-200 ${
              localValue.toLowerCase() === color.value.toLowerCase()
                ? 'border-violet-500 ring-2 ring-violet-500 ring-offset-2 ring-offset-gray-900 shadow-lg' 
                : 'border-gray-700 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color.value }}
            onClick={() => handleChange(color.value)}
            title={color.name}
          />
        ))}
      </div>
      
      <div className="flex items-center space-x-2 p-2 bg-gray-800 rounded-lg border border-gray-700">
        <div className="relative w-8 h-8">
          <div 
            className="w-full h-full rounded-md border border-gray-600"
            style={{ backgroundColor: localValue }}
          ></div>
          <input
            type="color"
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={localValue.toUpperCase()}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-2 py-1 bg-transparent text-sm font-mono text-white placeholder-gray-500 focus:outline-none"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
});
