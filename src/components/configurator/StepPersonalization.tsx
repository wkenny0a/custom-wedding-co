import React, { useState, useEffect } from 'react';
import { BoxColorOption } from './types';

interface StepPersonalizationProps {
  message: string;
  presetMessage?: string;
  quantity?: number;
  personNames: string[];
  onChangeNames: (names: string[]) => void;
  onChangeMessage: (message: string) => void;
  includeShreddedPaper: boolean;
  onToggleShreddedPaper: (include: boolean) => void;
  includeBowTie: boolean;
  onToggleBowTie: (include: boolean) => void;
  selectedColor: BoxColorOption | null;
  onNext: () => void;
  onPrev: () => void;
}

const EXAMPLE_NAMES = ['Emma', 'Sophia', 'Lily', 'Grace', 'Olivia', 'Charlotte', 'Ava', 'Mia'];

export default function StepPersonalization({ 
  message, 
  presetMessage = 'Will you be my bridesmaid, Carly?',
  quantity = 1,
  personNames,
  onChangeNames,
  onChangeMessage,
  includeShreddedPaper,
  onToggleShreddedPaper,
  includeBowTie,
  onToggleBowTie,
  selectedColor,
  onNext, 
  onPrev 
}: StepPersonalizationProps) {

  const [previewIndex, setPreviewIndex] = useState(0);

  // ── Names state ─────────────────────────────────────────────────────────────
  const [localNames, setLocalNames] = useState<string[]>(() => {
    if (personNames.length === quantity) return personNames;
    const arr = [...personNames];
    while (arr.length < quantity) arr.push('');
    return arr.slice(0, quantity);
  });

  // ── Messages state ───────────────────────────────────────────────────────────
  const [localMessages, setLocalMessages] = useState<string[]>(() => {
    if (!message) return Array(quantity).fill(presetMessage);
    const parts = message.includes(' | ')
      ? message.split(' | ').map(p => p.replace(/^Box \d+: /, ''))
      : [message];
    while (parts.length < quantity) parts.push(presetMessage);
    return parts.slice(0, quantity);
  });

  // Sync arrays when quantity changes
  useEffect(() => {
    setLocalNames(prev => {
      if (prev.length === quantity) return prev;
      const next = [...prev];
      while (next.length < quantity) next.push('');
      return next.slice(0, quantity);
    });
    setLocalMessages(prev => {
      if (prev.length === quantity) return prev;
      const next = [...prev];
      while (next.length < quantity) next.push(presetMessage);
      return next.slice(0, quantity);
    });
  }, [quantity, presetMessage]);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const updateName = (index: number, val: string) => {
    const next = [...localNames];
    next[index] = val;
    setLocalNames(next);
  };

  const updateMessage = (index: number, val: string) => {
    const next = [...localMessages];
    next[index] = val;
    setLocalMessages(next);
  };

  const handleBlurMessages = (msgs: string[]) => {
    if (quantity === 1) {
      onChangeMessage(msgs[0]);
    } else {
      const formatted = msgs.map((msg, i) => `Box ${i + 1}: ${msg}`).join(' | ');
      onChangeMessage(formatted);
    }
  };

  const allFilled = localNames.every(n => n.trim()) && localMessages.every(m => m.trim());

  const handleNext = () => {
    onChangeNames(localNames);
    handleBlurMessages(localMessages);
    onNext();
  };

  // ── Preview subtitle ─────────────────────────────────────────────────────────
  const previewSubtitle = quantity > 1
    ? `Box ${previewIndex + 1}${localNames[previewIndex] ? ` — ${localNames[previewIndex]}` : ''}`
    : localNames[0] ? `For ${localNames[0]}` : 'Typography Preview';

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-2 text-center">Step 2: Names & Hidden Message</h3>
      <p className="text-center text-espresso-light mb-8 max-w-lg mx-auto">
        Enter each bridesmaid's name and the secret message she'll find printed inside the lid when she opens her box.
      </p>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-12">

        {/* ── Left: Live Preview Panel ─────────────────────────────── */}
        {/* Mobile: compact inline bar · Desktop: full sticky sidebar */}
        <div className="w-full md:w-5/12 flex-shrink-0 bg-white/60 p-4 md:p-8 rounded-2xl shadow-sm border border-gold-pale/30 relative overflow-hidden group md:sticky md:top-4">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 z-0" />
          
          <p className="relative z-10 text-xs text-center text-gray-400 uppercase tracking-widest mb-3 md:mb-6">Live Preview</p>
          
          {/* Typography Preview Box — compact on mobile, square on desktop */}
          <div className="w-full aspect-[2/1] md:aspect-square rounded-2xl shadow-xl relative flex items-center justify-center text-center overflow-hidden border border-gold-pale/30 group-hover:shadow-2xl transition-all duration-700 bg-white">
            {quantity > 1 && (
              <>
                <button 
                  onClick={() => setPreviewIndex(prev => prev > 0 ? prev - 1 : quantity - 1)}
                  className="absolute left-2 md:left-3 z-30 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-slate-50 border border-gold-pale/30 text-espresso/50 hover:text-espresso hover:border-gold transition-colors shadow-sm"
                >
                  ‹
                </button>
                <button 
                  onClick={() => setPreviewIndex(prev => prev < quantity - 1 ? prev + 1 : 0)}
                  className="absolute right-2 md:right-3 z-30 w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full bg-slate-50 border border-gold-pale/30 text-espresso/50 hover:text-espresso hover:border-gold transition-colors shadow-sm"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Typography layer */}
            <div className="relative z-20 w-3/4 mb-8 md:mb-16 transition-colors duration-700 text-espresso" key={`preview-${previewIndex}`}>
              <h4 className="font-serif text-xl md:text-4xl leading-tight font-medium animate-in fade-in duration-500">
                {localMessages[previewIndex] || 'Your message here...'}
              </h4>
              <p className="mt-3 md:mt-6 text-[10px] md:text-xs tracking-[0.2em] uppercase text-espresso-light">
                {previewSubtitle}
              </p>
            </div>
            
            {/* Dot Indicators */}
            {quantity > 1 && (
              <div className="absolute bottom-3 md:bottom-6 flex gap-2 z-30">
                {Array.from({ length: quantity }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${previewIndex === i ? 'w-4 bg-gold' : 'w-1.5 bg-gold-pale/40 hover:bg-gold/40'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Emotional Quote — hidden on mobile to save space */}
          <div className="hidden md:flex mt-4 bg-cream/80 border border-gold/20 rounded-xl px-5 py-4 gap-3 items-start">
            <span className="text-gold text-2xl leading-none mt-0.5">❝</span>
            <div>
              <p className="font-serif text-sm text-espresso leading-relaxed italic">
                When she opened the lid and saw 'Will You Be My Bridesmaid, Sarah?' in gold foil — she burst into tears. Worth every penny.
              </p>
              <span className="font-sans text-[11px] text-gray-400 mt-2 block">— Jessica M., Bride · May 2024 ★★★★★</span>
            </div>
          </div>
        </div>

        {/* ── Right: Per-Box Input Cards ───────────────────────────── */}
        <div className="flex-1 w-full">

          {/* Helper explainer for multi-box */}
          {quantity > 1 && (
            <div className="flex items-start gap-3 bg-gold/5 border border-gold/20 rounded-xl px-4 py-3 mb-6 text-sm font-sans text-espresso/70">
              <span className="text-gold text-lg flex-shrink-0">✦</span>
              <p>
                You're building <strong className="text-espresso">{quantity} boxes</strong> — one for each bridesmaid.
                Fill in each person's name and the message that'll be waiting inside their lid.
              </p>
            </div>
          )}

          {/* Per-box cards */}
          <div className="flex flex-col gap-5 mb-8">
            {Array.from({ length: quantity }).map((_, idx) => (
              <div
                key={idx}
                onClick={() => setPreviewIndex(idx)}
                className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
                  previewIndex === idx 
                    ? 'border-gold shadow-md bg-white/80 scale-[1.01]' 
                    : 'border-gold-pale/40 hover:border-gold/50 bg-white/40 hover:bg-white/60'
                }`}
              >
                {/* Box header badge */}
                {quantity > 1 && (
                  <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gold-pale/30">
                    <div className="w-7 h-7 bg-gold text-white rounded-full font-sans text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-serif text-lg text-espresso font-medium">
                        Box {idx + 1}
                      </span>
                      {localNames[idx] && (
                        <span className="font-serif text-espresso/40 truncate">— {localNames[idx]}</span>
                      )}
                    </div>
                    {previewIndex === idx && (
                      <span className="text-[10px] font-sans uppercase tracking-wider text-gold flex-shrink-0">Previewing ↖</span>
                    )}
                  </div>
                )}

                {/* Name Input */}
                <div className="mb-4" onClick={e => e.stopPropagation()}>
                  <label
                    htmlFor={`name-${idx}`}
                    className="block text-xs font-sans font-semibold uppercase tracking-widest text-espresso/60 mb-2"
                  >
                    {quantity > 1 ? `Bridesmaid's Name *` : `Your Bridesmaid's Name *`}
                  </label>
                  <input
                    id={`name-${idx}`}
                    type="text"
                    value={localNames[idx]}
                    onFocus={() => setPreviewIndex(idx)}
                    onChange={e => updateName(idx, e.target.value)}
                    onBlur={() => onChangeNames(localNames)}
                    placeholder={`e.g. ${EXAMPLE_NAMES[idx] ?? 'Sarah'}`}
                    className={`w-full bg-transparent border-b-2 py-2 font-serif text-2xl focus:outline-none transition-colors duration-300 placeholder:text-espresso/20 ${
                      localNames[idx] 
                        ? 'border-espresso/30 focus:border-gold text-espresso' 
                        : previewIndex === idx 
                          ? 'border-gold/50 animate-pulse' 
                          : 'border-gold-pale/40 focus:border-gold text-espresso'
                    }`}
                  />
                  {!localNames[idx] && previewIndex === idx && (
                    <p className="text-[11px] text-gold/70 mt-1 font-sans">Enter this bridesmaid's name to continue</p>
                  )}
                </div>

                {/* Message Textarea */}
                <div onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-baseline mb-2">
                    <label
                      htmlFor={`msg-${idx}`}
                      className="block text-xs font-sans font-semibold uppercase tracking-widest text-espresso/60"
                    >
                      Inside Lid Message *
                    </label>
                    <span className="text-[10px] font-sans text-espresso/30">
                      {localMessages[idx]?.length ?? 0}/60
                    </span>
                  </div>
                  <textarea
                    id={`msg-${idx}`}
                    rows={quantity > 3 ? 2 : 3}
                    value={localMessages[idx]}
                    onFocus={() => setPreviewIndex(idx)}
                    onChange={e => updateMessage(idx, e.target.value)}
                    onBlur={() => handleBlurMessages(localMessages)}
                    className="w-full bg-transparent border-b border-espresso/20 py-2 focus:outline-none focus:border-gold transition-colors duration-500 text-lg font-serif resize-none placeholder:text-espresso/20"
                    placeholder={presetMessage}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Styling Note */}
          <div className="bg-blush/20 p-4 rounded-lg border border-blush text-sm text-espresso-light mb-8">
            <span className="block font-medium mb-1">✨ Styling Note</span>
            Messages are printed in our signature gold foil script. We recommend 60 characters max for the best sizing and visual impact.
          </div>

          {/* Add-on toggles */}
          <div className="flex flex-col gap-4">
            {/* Shredded Paper */}
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

            {/* Bow Tie */}
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

      {/* Navigation */}
      <div className="flex justify-between border-t border-gold-pale/50 pt-8">
        <button
          onClick={onPrev}
          className="uppercase tracking-widest text-sm text-espresso-light hover:text-espresso transition-colors duration-300 py-4"
        >
          &larr; Back
        </button>
        <button
          onClick={handleNext}
          disabled={!allFilled}
          className={`px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 ${
            allFilled
              ? 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {allFilled ? 'I Love It — Next ›' : `Fill in all ${quantity > 1 ? `${quantity} names & ` : ''}messages to continue`}
        </button>
      </div>
    </div>
  );
}
