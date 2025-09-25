'use client';

import { memo } from 'react';
import { Settings, Palette, Clapperboard, Zap } from 'lucide-react';
import { ColorPicker } from '@/components/ColorPicker';
import { AnimationPicker } from '@/components/AnimationPicker';
import { CustomGradient, ButtonAnimation } from '@/types/button';
import { DebouncedInput } from '@/components/DebouncedInput';
import { IconPicker } from '@/components/IconPicker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ConfigurationPanelProps {
  collectionId: string;
  setCollectionId: (id: string) => void;
  workspaceId: string;
  setWorkspaceId: (id: string) => void;
  buttonText: string;
  setButtonText: (text: string) => void;
  customGradient: CustomGradient;
  setCustomGradient: (gradient: CustomGradient) => void;
  animations: ButtonAnimation;
  setAnimations: (animations: ButtonAnimation) => void;
  isValidConfig: boolean;
  textColor: string;
  setTextColor: (color: string) => void;
  selectedIcon: string | null;
  setSelectedIcon: (icon: string | null) => void;
}

export const ConfigurationPanel = memo(function ConfigurationPanel({
  collectionId,
  setCollectionId,
  workspaceId,
  setWorkspaceId,
  buttonText,
  setButtonText,
  customGradient,
  setCustomGradient,
  animations,
  setAnimations,
  isValidConfig,
  textColor,
  setTextColor,
  selectedIcon,
  setSelectedIcon,
}: ConfigurationPanelProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4 sticky top-8 shadow-xl">
      <Accordion type="single" defaultValue='item-1' className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Configuration</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Collection ID *
                </label>
                <DebouncedInput
                  type="text"
                  value={collectionId}
                  onChange={setCollectionId}
                  placeholder="Enter Collection ID"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Workspace ID *
                </label>
                <DebouncedInput
                  type="text"
                  value={workspaceId}
                  onChange={setWorkspaceId}
                  placeholder="Enter Workspace ID"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Button Text
                </label>
                <DebouncedInput
                  type="text"
                  value={buttonText}
                  onChange={setButtonText}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all text-sm"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Color Editor</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-4">
              <ColorPicker
                label="From Color"
                value={customGradient.from}
                onChange={(color) => setCustomGradient({ ...customGradient, from: color })}
              />
              
              <ColorPicker
                label="To Color"
                value={customGradient.to}
                onChange={(color) => setCustomGradient({ ...customGradient, to: color })}
              />
              <ColorPicker
                label="Text Color"
                value={textColor}
                onChange={setTextColor}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Icon</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <IconPicker selectedIcon={selectedIcon} onIconSelect={setSelectedIcon} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl">
            <Clapperboard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Animation Controls</h2>
        </div>
        <div className="pt-4">
          <AnimationPicker
            animations={animations}
            onChange={setAnimations}
          />
        </div>
      </div>

      {!isValidConfig && (
        <div className="bg-amber-900 bg-opacity-30 border border-amber-500 rounded-lg p-3 mt-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <p className="text-xs font-medium text-amber-300">
              Enter IDs to generate code
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
