'use client';

import { memo, useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonStyle, CustomGradient } from '@/types/button';
import { defaultButtonStyles } from '@/lib/button-styles';
import { ButtonGalleryItem } from './ButtonGalleryItem';

interface ButtonGalleryProps {
  selectedStyle: ButtonStyle;
  customGradient: CustomGradient;
  onStyleSelect: (style: ButtonStyle) => void;
}

const ITEMS_PER_PAGE = 12;

export const ButtonGallery = memo(function ButtonGallery({
  selectedStyle,
  customGradient,
  onStyleSelect,
}: ButtonGalleryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(defaultButtonStyles.length / ITEMS_PER_PAGE);

  const paginatedStyles = defaultButtonStyles.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Button Gallery</h2>
          <span className="px-4 py-2 bg-violet-900 border border-violet-500 text-violet-300 text-sm font-semibold rounded-full">
            {defaultButtonStyles.length} Designs
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevPage} className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button onClick={handleNextPage} className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedStyles.map((style) => (
          <ButtonGalleryItem
            key={style.id}
            style={style}
            isSelected={selectedStyle.id === style.id}
            customGradient={customGradient}
            onStyleSelect={onStyleSelect}
          />
        ))}
      </div>
    </div>
  );
});
