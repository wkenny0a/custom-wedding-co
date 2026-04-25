import React, { useState, useEffect } from 'react';
import { BoxColorOption } from './types';

export const BOX_COLORS: BoxColorOption[] = [
  { id: 'c1', name: 'Navy Blue', hexCode: '#3b5998', imageUrl: '/images/boxes/box_closed_navy_blue.png' },
  { id: 'c2', name: 'Sky Blue', hexCode: '#88d8ed', imageUrl: '/images/boxes/box_closed_sky_blue.png' },
  { id: 'c3', name: 'Vibrant Red', hexCode: '#e32636', imageUrl: '/images/boxes/box_closed_vibrant_red.png' },
  { id: 'c4', name: 'Premium Cream', hexCode: '#f3f1ea', imageUrl: '/images/boxes/box_closed_premium_cream.png' },
  { id: 'c5', name: 'Light Pink', hexCode: '#f5c4c9', imageUrl: '/images/boxes/box_closed_light_pink.png' },
  { id: 'c6', name: 'Orange', hexCode: '#e64a19', imageUrl: '/images/boxes/box_closed_orange.png' },
  { id: 'c7', name: 'Yellow', hexCode: '#ffd54f', imageUrl: '/images/boxes/box_closed_yellow.png' },
  { id: 'c8', name: 'Matte Black', hexCode: '#212121', imageUrl: '/images/boxes/box_closed_matte_black.png' },
  { id: 'c9', name: 'Champagne Gold', hexCode: '#d1b777', imageUrl: '/images/boxes/box_closed_champagne_gold.png' },
  { id: 'c10', name: 'Forest Green', hexCode: '#2e4333', imageUrl: '/images/boxes/box_closed_forest_green.png' }
];

interface StepBoxColorProps {
  selectedColor: BoxColorOption | null;
  onSelectColor: (color: BoxColorOption) => void;
  onNext: () => void;
}

export default function StepBoxColor({ selectedColor, onSelectColor, onNext }: StepBoxColorProps) {
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (selectedColor) {
      setImageLoading(true);
    }
  }, [selectedColor?.id]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-6 text-center">Step 1: Choose Your Box Color</h3>
      
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-8">
        
        {/* Left: Dynamic Graphic Preview */}
        <div className="flex-1 w-full max-w-sm mx-auto relative group">
          <div className="relative w-full aspect-square bg-gray-50 border border-gold-pale/30 rounded-3xl overflow-hidden flex items-center justify-center shadow-xl">
            {/* Loading Spinner Overlay */}
            {imageLoading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-50/50 backdrop-blur-sm">
                <svg className="animate-spin h-8 w-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
            
            {/* Display the explicit generated physical image for the selected box color */}
            {selectedColor ? (
              <img 
                src={selectedColor.imageUrl} 
                alt={`${selectedColor.name} Box`} 
                onLoad={() => setImageLoading(false)}
                className={`relative z-10 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`} 
              />
            ) : (
              <img 
                src="/images/box_closed.png" 
                alt="Select a Box Color" 
                className="relative z-10 w-[85%] h-[85%] object-contain opacity-50 transition-transform duration-700 group-hover:scale-105 pointer-events-none" 
              />
            )}
          </div>
          {selectedColor && (
            <div className="text-center mt-6 text-espresso-light font-serif text-lg italic absolute w-full -bottom-10 transition-opacity duration-500">
              Selected: {selectedColor.name}
            </div>
          )}
        </div>

        {/* Right: Choices Grid */}
        <div className="flex-1 w-full pt-4 md:pt-0">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium text-center md:text-left">Select a base color</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {BOX_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onSelectColor(color)}
                className={`flex flex-col items-center gap-2 p-3 border rounded-xl transition-all duration-500 hover:-translate-y-1 ${
                  selectedColor?.id === color.id
                    ? 'border-gold shadow-md bg-white/60'
                    : 'border-transparent hover:border-gold-pale hover:bg-white/30'
                }`}
              >
                <div 
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-inner border border-black/5 transition-transform duration-500 ${
                    selectedColor?.id === color.id ? 'scale-110' : ''
                  }`}
                  style={{ backgroundColor: color.hexCode }}
                />
                <span className="font-sans text-xs font-medium text-center leading-tight">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-gold-pale/50 pt-8 mt-12">
        <button
          onClick={onNext}
          disabled={!selectedColor}
          className={`px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 ${
            selectedColor
              ? 'bg-espresso text-cream hover:bg-espresso-light'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
