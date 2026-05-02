'use client';

import React, { useState, useRef, useCallback } from 'react';
import { DesignOption } from './WelcomeBoxTypes';
import { useCart } from '@/context/CartContext';

// ── Design Data ─────────────────────────────────────────────────────────────
const DESIGNS: DesignOption[] = [
  { id: 1,  name: 'Classic Monogram',  imageUrl: '/images/gift-box/design-1.jpg',  isCustomUpload: false },
  { id: 2,  name: 'Floral Wreath',     imageUrl: '/images/gift-box/design-2.jpg',  isCustomUpload: false },
  { id: 3,  name: 'Elegant Script',    imageUrl: '/images/gift-box/design-3.jpg',  isCustomUpload: false },
  { id: 4,  name: 'Botanical Frame',   imageUrl: '/images/gift-box/design-4.jpg',  isCustomUpload: false },
  { id: 5,  name: 'Gold Crest',        imageUrl: '/images/gift-box/design-5.jpg',  isCustomUpload: false },
  { id: 6,  name: 'Minimalist Line',   imageUrl: '/images/gift-box/design-6.jpg',  isCustomUpload: false },
  { id: 7,  name: 'Watercolor Bloom',  imageUrl: '/images/gift-box/design-7.jpg',  isCustomUpload: false },
  { id: 8,  name: 'Art Deco',          imageUrl: '/images/gift-box/design-8.jpg',  isCustomUpload: false },
  { id: 9,  name: 'Rustic Wreath',     imageUrl: '/images/gift-box/design-9.jpg',  isCustomUpload: false },
  { id: 10, name: 'Coastal',           imageUrl: '/images/gift-box/design-10.jpg', isCustomUpload: false },
  { id: 11, name: 'Garden Party',      imageUrl: '/images/gift-box/design-11.jpg', isCustomUpload: false },
  { id: 12, name: 'Upload Your Own',   imageUrl: '/images/gift-box/design-custom.jpg', isCustomUpload: true },
];

// ── Props ───────────────────────────────────────────────────────────────────
interface StepDesignSelectorProps {
  selectedDesign: DesignOption | null;
  onSelectDesign: (design: DesignOption) => void;
  namesOrInitials: string;
  onChangeNamesOrInitials: (val: string) => void;
  eventDate: string;
  onChangeEventDate: (val: string) => void;
  customUploadUrl: string;
  customUploadFilename: string;
  onUploadComplete: (url: string, filename: string) => void;
  welcomeMessage: string;
  onChangeWelcomeMessage: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepDesignSelector({
  selectedDesign,
  onSelectDesign,
  namesOrInitials,
  onChangeNamesOrInitials,
  eventDate,
  onChangeEventDate,
  customUploadUrl,
  customUploadFilename,
  onUploadComplete,
  welcomeMessage,
  onChangeWelcomeMessage,
  onNext,
  onPrev,
}: StepDesignSelectorProps) {
  const { cart } = useCart();

  // ── Upload modal state ──────────────────────────────────────────────────
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadPreview, setUploadPreview] = useState<string>(customUploadUrl || '');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Image error fallback tracking ───────────────────────────────────────
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const handleImageError = (designId: number) => {
    setFailedImages(prev => new Set(prev).add(designId));
  };

  // ── Design selection ────────────────────────────────────────────────────
  const handleSelectDesign = (design: DesignOption) => {
    onSelectDesign(design);
    if (design.isCustomUpload) {
      setShowUploadModal(true);
    }
  };

  // ── Upload logic ────────────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    setUploadError('');

    // Client-side validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setUploadError('Invalid file type. Only JPG, PNG, and WEBP are allowed.');
      return;
    }
    if (file.size > 4718592) {
      setUploadError('File is too large. Maximum size is 4.5MB.');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => setUploadPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('cartId', cart?.id || '');

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onUploadComplete(data.url, file.name);
      setUploadPreview(data.url);
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed. Please try again.');
      setUploadPreview('');
    } finally {
      setIsUploading(false);
    }
  }, [cart?.id, onUploadComplete]);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // ── Next button disabled logic ──────────────────────────────────────────
  const isDesign12 = selectedDesign?.isCustomUpload === true;
  const canProceed = selectedDesign
    ? isDesign12
      ? customUploadUrl !== ''
      : namesOrInitials.trim() !== '' && eventDate.trim() !== ''
    : false;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-2 text-center">Step 2: Choose Your Lid Design</h3>
      <p className="text-center text-espresso-light mb-8 max-w-lg mx-auto">
        Select a design for the lid of every box. Personalize with your names and event date.
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Left: Live Preview Panel ──────────────────────────────────── */}
        <div className="lg:w-[340px] flex-shrink-0 order-first">
          <div className="sticky top-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium text-center lg:text-left">
              Lid Preview
            </p>
            <div className="relative w-full aspect-square bg-white/60 border border-gold-pale/30 rounded-3xl overflow-hidden flex items-center justify-center shadow-xl">
              {selectedDesign ? (
                <>
                  <img
                    src={
                      isDesign12 && (customUploadUrl || uploadPreview)
                        ? customUploadUrl || uploadPreview
                        : selectedDesign.imageUrl
                    }
                    alt={selectedDesign.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Overlay text for designs 1–11 */}
                  {!isDesign12 && (namesOrInitials || eventDate) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px]">
                      {namesOrInitials && (
                        <span className="font-serif text-2xl text-white drop-shadow-lg text-center px-4 leading-tight">
                          {namesOrInitials}
                        </span>
                      )}
                      {eventDate && (
                        <span className="font-sans text-sm text-white/90 drop-shadow-md mt-2 tracking-wider">
                          {eventDate}
                        </span>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-espresso/30">
                  <span className="text-5xl">📎</span>
                  <span className="text-xs uppercase tracking-widest font-sans">Select a design</span>
                </div>
              )}
            </div>
            {selectedDesign && (
              <p className="text-center mt-4 text-espresso-light font-serif text-base italic">
                {selectedDesign.name}
              </p>
            )}
          </div>
        </div>

        {/* ── Right: Design Grid + Fields ───────────────────────────────── */}
        <div className="flex-1">
          {/* Design Grid */}
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-medium">Select a lid design</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-8">
            {DESIGNS.map((design) => {
              const isSelected = selectedDesign?.id === design.id;
              const hasFailed = failedImages.has(design.id);
              // For Design 12 after upload, show uploaded image as thumbnail
              const showUploadedThumb = design.isCustomUpload && customUploadUrl;

              return (
                <button
                  key={design.id}
                  onClick={() => handleSelectDesign(design)}
                  className={`relative flex flex-col items-center gap-2 rounded-xl overflow-hidden border-2 transition-all duration-500 hover:-translate-y-1 group ${
                    isSelected
                      ? 'border-gold shadow-lg bg-white/60 scale-[1.02]'
                      : 'border-transparent hover:border-gold-pale hover:bg-white/30'
                  }`}
                >
                  {/* Image */}
                  <div className="w-full aspect-square bg-gray-50 relative overflow-hidden">
                    {hasFailed && !showUploadedThumb ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-espresso/20">
                        <span className="text-3xl mb-1">{design.isCustomUpload ? '✦' : '📎'}</span>
                        <span className="text-[9px] uppercase tracking-wider font-sans">{design.name}</span>
                      </div>
                    ) : (
                      <img
                        src={showUploadedThumb ? customUploadUrl : design.imageUrl}
                        alt={design.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => handleImageError(design.id)}
                      />
                    )}
                    {/* Gold checkmark overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center shadow-lg text-sm font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                    {/* Custom upload badge */}
                    {design.isCustomUpload && (
                      <div className="absolute top-2 left-2 bg-gold/90 text-white text-[8px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full">
                        ✦ Upload
                      </div>
                    )}
                  </div>
                  {/* Name */}
                  <span className="font-sans text-xs font-medium text-center leading-tight pb-2 px-1">
                    {design.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Personalization Fields (Designs 1–11) ──────────────────── */}
          {selectedDesign && !isDesign12 && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 bg-white/60 border border-gold-pale/30 rounded-2xl p-6 mb-6">
              <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-5">
                ✨ Personalize Your Lid
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-espresso/60 font-sans font-semibold mb-2">
                    Names or Initials <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={namesOrInitials}
                    onChange={(e) => onChangeNamesOrInitials(e.target.value)}
                    placeholder="J & S, The Millers, Emily + Michael"
                    className="w-full px-4 py-3 bg-white border border-gold-pale/40 rounded-xl font-serif text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-espresso/60 font-sans font-semibold mb-2">
                    Event Date <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => onChangeEventDate(e.target.value)}
                    placeholder="June 14, 2025"
                    className="w-full px-4 py-3 bg-white border border-gold-pale/40 rounded-xl font-serif text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Design 12 Upload Status ────────────────────────────────── */}
          {selectedDesign && isDesign12 && (
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 bg-white/60 border border-gold-pale/30 rounded-2xl p-6 mb-6">
              {customUploadUrl ? (
                <div className="flex items-center gap-4">
                  <img src={customUploadUrl} alt="Uploaded design" className="w-16 h-16 rounded-xl object-cover border border-gold-pale/30" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-green-600 text-sm">✓</span>
                      <span className="text-xs uppercase tracking-widest text-green-700 font-sans font-semibold">Design Uploaded</span>
                    </div>
                    <p className="text-sm font-sans text-espresso/60">{customUploadFilename}</p>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="text-xs uppercase tracking-widest text-gold hover:text-espresso transition-colors font-sans font-semibold"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full py-4 border-2 border-dashed border-gold/40 rounded-xl text-center hover:border-gold hover:bg-gold/5 transition-all duration-300"
                >
                  <span className="text-2xl block mb-1">✦</span>
                  <span className="text-xs uppercase tracking-widest font-sans text-espresso/60">
                    Click to upload your custom design
                  </span>
                </button>
              )}
            </div>
          )}

          {/* ── Welcome Message ─────────────────────────────────────────── */}
          <div className="bg-white/40 border border-gold-pale/20 rounded-2xl p-6 mb-8">
            <label className="block text-xs uppercase tracking-widest text-espresso/60 font-sans font-semibold mb-2">
              Welcome Message <span className="text-espresso/30">(Optional)</span>
            </label>
            <textarea
              value={welcomeMessage}
              onChange={(e) => onChangeWelcomeMessage(e.target.value)}
              placeholder="Welcome to our wedding celebration! We're so glad you're here..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gold-pale/40 rounded-xl font-serif text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
            />
            <p className="text-[11px] font-sans text-espresso/40 mt-2">
              This message will be printed on the inside of the lid — the same message for all boxes.
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <div className="flex justify-between border-t border-gold-pale/50 pt-8 mt-4 items-center">
        <button
          onClick={onPrev}
          className="uppercase tracking-widest text-sm text-espresso-light hover:text-espresso transition-colors duration-300 py-4"
        >
          &larr; Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 ${
            canProceed
              ? 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Fill Your Box →
        </button>
      </div>

      {/* ── Upload Modal (Design 12) ───────────────────────────────────── */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-4">
          <div className="bg-cream w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold-pale/30">
              <div>
                <h4 className="font-serif text-xl text-espresso">Upload Your Design</h4>
                <p className="text-xs font-sans text-espresso/50 mt-1">JPG, PNG, or WEBP · Max 4.5MB</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-espresso transition-colors"
              >
                &#x2715;
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-gold bg-gold/10 scale-[1.02]'
                    : 'border-gold-pale/50 hover:border-gold/50'
                }`}
              >
                {uploadPreview && !isUploading ? (
                  <div className="space-y-4">
                    <img
                      src={uploadPreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl mx-auto shadow-md border border-gold-pale/30"
                    />
                    {customUploadUrl && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-sans font-semibold">Uploaded successfully</span>
                      </div>
                    )}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs uppercase tracking-widest text-gold hover:text-espresso font-sans font-semibold transition-colors"
                    >
                      Replace Image
                    </button>
                  </div>
                ) : isUploading ? (
                  <div className="flex flex-col items-center gap-4 py-4">
                    <svg className="animate-spin h-10 w-10 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-sm font-sans text-espresso/60">Uploading your design...</p>
                  </div>
                ) : (
                  <div className="py-4">
                    <span className="text-4xl block mb-3">📁</span>
                    <p className="font-serif text-lg text-espresso mb-2">Drag & drop your design here</p>
                    <p className="text-xs font-sans text-espresso/40 mb-4">or</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 bg-espresso text-cream text-xs uppercase tracking-widest font-sans rounded-lg hover:bg-espresso-light transition-colors"
                    >
                      Browse Files
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Error */}
              {uploadError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm font-sans text-red-700">
                  {uploadError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 py-3 border border-gold-pale/40 text-espresso text-xs uppercase tracking-widest font-sans rounded-lg hover:bg-white/60 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                disabled={!customUploadUrl}
                className={`flex-1 py-3 text-xs uppercase tracking-widest font-sans rounded-lg transition-all ${
                  customUploadUrl
                    ? 'bg-espresso text-cream hover:bg-espresso-light'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
