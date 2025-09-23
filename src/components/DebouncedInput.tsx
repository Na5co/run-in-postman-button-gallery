'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

interface DebouncedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  debounceTimeout?: number;
}

export const DebouncedInput = ({
  value: parentValue,
  onChange,
  debounceTimeout = 300,
  ...props
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(parentValue);
  const debouncedOnChange = useRef(debounce(onChange, debounceTimeout)).current;

  useEffect(() => {
    setLocalValue(parentValue);
  }, [parentValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return <input {...props} value={localValue} onChange={handleChange} />;
};
