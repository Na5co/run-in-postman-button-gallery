'use client';

import { memo } from 'react';
import { ButtonPreview } from '@/components/ButtonPreview';
import { ButtonStyle, CustomGradient } from '@/types/button';

interface ButtonGalleryItemProps {
  style: ButtonStyle;
  isSelected: boolean;
  customGradient: CustomGradient;
  onStyleSelect: (style: ButtonStyle) => void;
}

export const ButtonGalleryItem = memo(function ButtonGalleryItem({
  style,
  isSelected,
  customGradient,
  onStyleSelect,
}: ButtonGalleryItemProps) {
  const handleClick = () => {
    onStyleSelect(style);
  };

  return (
    <ButtonPreview
      style={style}
      customGradient={isSelected ? customGradient : undefined}
      onClick={handleClick}
      isSelected={isSelected}
    />
  );
});
