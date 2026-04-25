import React, { useState } from 'react';
import { BoxColorOption } from './types';

interface StepPersonalizationProps {
  message: string;
  presetMessage?: string;
  onChangeMessage: (message: string) => void;
  includeShreddedPaper: boolean;
  onToggleShreddedPaper: (include: boolean) => void;
  includeBowTie: boolean;
  onToggleBowTie: (include: boolean) => void;
  selectedColor: BoxColorOption | null;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepPersonalization({ 
  message, 
  presetMessage = 'Will you be my bridesmaid, Carly?',
  onChangeMessage,
  includeShreddedPaper,
  onToggleShreddedPaper,
  includeBowTie,
  onToggleBowTie,
  selectedColor,
  onNext, 
  onPrev 
}: StepPersonalizationProps) {
  
  const [localMessage, setLocalMessage] = useState(message || presetMessage);

  const handleBlur = () => {
    onChangeMessage(localMessage);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-2 text-center">Step 2: Add a Hidden Message</h3>
      <p className="text-center text-espresso-light mb-8 max-w-lg mx-auto">
        This message will be elegantly printed on the inside lid of the box, waiting to surprise them when they open it.
      </p>

      <div className="flex flex-col md:flex-row gap-12 items-start mb-12">
        {/* Preview Panel */}
        <div className="flex-1 w-full bg-white/60 p-8 rounded-2xl shadow-sm border border-gold-pale/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 z-0" />
          
          <p className="relative z-10 text-xs text-center text-gray-400 uppercase tracking-widest mb-6">Preview</p>
          
          {/* Clean White Typography Preview */}
          <div 
            className="w-full aspect-square rounded-2xl shadow-xl relative flex items-center justify-center text-center overflow-hidden border border-gold-pale/30 group-hover:shadow-2xl transition-all duration-700 bg-white"
          >
            {/* Typography layer */}
            <div className="relative z-20 w-3/4 mb-16 transition-colors duration-700 text-espresso">
              <h4 className="font-serif text-3xl md:text-5xl leading-tight font-medium">
                {localMessage || 'Your message here...'}
              </h4>
               <p className="mt-8 text-xs tracking-[0.2em] uppercase text-espresso-light">Typography Preview</p>
            </div>
          </div>

          {/* Emotional Proof Quote */}
          <div className="mt-4 bg-cream/80 border border-gold/20 rounded-xl px-5 py-4 flex gap-3 items-start">
            <span className="text-gold text-2xl leading-none mt-0.5">❝</span>
            <div>
              <p className="font-serif text-sm text-espresso leading-relaxed italic">
                When she opened the lid and saw 'Will You Be My Bridesmaid, Sarah?' in gold foil — she burst into tears. Worth every penny.
              </p>
              <span className="font-sans text-[11px] text-gray-400 mt-2 block">— Jessica M., Bride · May 2024 ★★★★★</span>
            </div>
          </div>
        </div>

        {/* Input Panel */}
        <div className="flex-1 w-full">
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-3 font-medium">
              Inner Lid Message
            </label>
            <textarea
              id="message"
              rows={4}
              value={localMessage}
              onChange={(e) => setLocalMessage(e.target.value)}
              onBlur={handleBlur}
              className="w-full bg-transparent border-b border-espresso/30 py-3 focus:outline-none focus:border-gold transition-colors duration-500 text-xl font-serif resize-none"
              placeholder={presetMessage}
            />
          </div>
          
          <div className="bg-blush/20 p-4 rounded-lg border border-blush text-sm text-espresso-light mb-8">
            <span className="block font-medium mb-1">Styling Note</span>
            Messages are printed in our signature gold foil script by default. Max 60 characters recommended for best sizing.
          </div>

          <div className="flex flex-col gap-4">
            {/* Shredded Paper Toggle */}
            <div 
              className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                includeShreddedPaper ? 'border-gold bg-gold-pale/10 shadow-sm' : 'border-gray-200 hover:border-gold-pale'
              }`}
              onClick={() => onToggleShreddedPaper(!includeShreddedPaper)}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    includeShreddedPaper ? 'bg-gold border-gold text-white' : 'border-gray-300'
                  }`}>
                    {includeShreddedPaper && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-serif text-lg font-medium tracking-wide">Colour-Matched Crinkle Paper</h5>
                    <span className="text-sm font-medium text-gold">+$4.99</span>
                  </div>
                  <p className="text-sm text-espresso-light/80">
                    The detail that frames everything inside. Premium crinkle paper, perfectly colour-matched to your box — the first thing she sees when the lid opens.
                  </p>
                </div>
              </div>
            </div>

            {/* Bow Tie Toggle */}
            <div 
              className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                includeBowTie ? 'border-gold bg-gold-pale/10 shadow-sm' : 'border-gray-200 hover:border-gold-pale'
              }`}
              onClick={() => onToggleBowTie(!includeBowTie)}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    includeBowTie ? 'bg-gold border-gold text-white' : 'border-gray-300'
                  }`}>
                    {includeBowTie && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-serif text-lg font-medium tracking-wide">Hand-Tied Satin Ribbon</h5>
                    <span className="text-sm font-medium text-gold">+$3.99</span>
                  </div>
                  <p className="text-sm text-espresso-light/80">
                    The very first thing she sees when it arrives at her door. A beautifully hand-tied satin bow on the exterior — because presentation is everything.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-between border-t border-gold-pale/50 pt-8">
        <button
          onClick={onPrev}
          className="uppercase tracking-widest text-sm text-espresso-light hover:text-espresso transition-colors duration-300 py-4"
        >
          &larr; Back
        </button>
        <button
          onClick={() => {
            onChangeMessage(localMessage);
            onNext();
          }}
          disabled={!localMessage.trim()}
          className={`px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 ${
            localMessage.trim()
              ? 'bg-espresso text-cream hover:bg-espresso-light'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          I Love It — Next ›
        </button>
      </div>
    </div>
  );
}
