import React, { useState, useEffect } from 'react';
import { ProductItem } from './types';

interface StepProductsProps {
  catalogProducts: ProductItem[];
  selectedProducts: ProductItem[];
  onAddProduct: (product: ProductItem) => void;
  onRemoveProduct: (productId: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  emptyCategoryText?: string;
  quantity?: number;
  personNames?: string[];
}

export default function StepProducts({
  catalogProducts,
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onPrev,
  onSubmit,
  isSubmitting = false,
  emptyCategoryText = 'No products found.',
  quantity: rawQuantity,
  personNames = []
}: StepProductsProps) {
  const quantity = rawQuantity ?? 1;

  // Modal state — now info-only (no customization inputs)
  const [viewingProduct, setViewingProduct] = useState<ProductItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (viewingProduct) setCurrentImageIndex(0);
  }, [viewingProduct]);

  // ── Core add logic: names auto-injected, no modal needed ────────────────────
  const handleAddClick = (product: ProductItem) => {
    if (product.isCustomizable && personNames.length > 0) {
      const nameValue = personNames.length === 1
        ? personNames[0]
        : personNames.join(', ');
      onAddProduct({
        ...product,
        customOptions: [{ name: 'Personalization', value: nameValue }]
      });
    } else {
      onAddProduct(product);
    }
  };

  const isSelected = (productId: string) => selectedProducts.some(p => p.id === productId);
  const getSelectedProduct = (productId: string) => selectedProducts.find(p => p.id === productId);

  // ── Carousel helpers ─────────────────────────────────────────────────────────
  const getModalImages = () => {
    if (!viewingProduct) return [];
    const swellImages = viewingProduct.swellData?.images || [];
    if (swellImages.length > 0) return swellImages.map((img: any) => img.file?.url).filter((url?: string) => !!url);
    return [viewingProduct.image || '/images/box_closed.png'];
  };
  const modalImages = getModalImages();
  const activeModalImageUrl = modalImages[currentImageIndex] || '/images/box_closed.png';
  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % modalImages.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + modalImages.length) % modalImages.length);

  const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-2 text-center">Step 3: Fill Your Box</h3>
      <p className="text-center text-espresso-light mb-2 max-w-lg mx-auto">
        Select bespoke items to include.
      </p>
      <p className="text-center text-xs text-gold uppercase tracking-widest mb-8 font-semibold">
        ✦ Brides typically choose 4 items for the perfect unboxing experience
      </p>

      {/* Names confirmation banner — only shown if names are set */}
      {personNames.length > 0 && (
        <div className="mb-8 bg-white/60 border border-gold/20 rounded-2xl px-6 py-4">
          <div className="flex items-start gap-3">
            <span className="text-gold text-xl flex-shrink-0 mt-0.5">✨</span>
            <div>
              <p className="font-sans text-xs uppercase tracking-wider text-gold font-semibold mb-2">
                Personalization Ready
              </p>
              <div className="flex flex-wrap gap-2">
                {personNames.map((name, i) => (
                  <div key={i} className="flex items-center gap-1.5 bg-cream-dark/40 border border-gold-pale/30 rounded-full px-3 py-1">
                    {personNames.length > 1 && (
                      <div className="w-4 h-4 bg-espresso text-cream rounded-full text-[9px] flex items-center justify-center font-sans font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                    )}
                    <span className="font-serif text-sm text-espresso">{name}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-sans text-espresso/40 mt-2">
                {personNames.length === 1
                  ? `Personalizable items will be made for ${personNames[0]}.`
                  : `Personalizable items will be made with each person's name — one per box.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {catalogProducts.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-espresso-light">
            <p>{emptyCategoryText}</p>
          </div>
        )}

        {catalogProducts.map((product) => {
          const selectedItem = getSelectedProduct(product.id);
          const selected = !!selectedItem;
          const isBestseller = catalogProducts.indexOf(product) < 2;

          return (
            <div
              key={product.id}
              className={`bg-white/80 rounded-xl overflow-hidden shadow-sm border transition-all duration-500 hover:-translate-y-1 flex flex-col ${
                selected ? 'border-gold shadow-md' : 'border-gold-pale/30'
              }`}
            >
              {/* Product Image */}
              <div className="h-48 bg-gray-100 relative overflow-hidden group">
                <img
                  src={product.image || '/images/box_closed.png'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {isBestseller && !selected && (
                  <div className="absolute top-3 left-3 bg-gold text-white text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    💛 Best Seller
                  </div>
                )}
                {selected && (
                  <div className="absolute top-3 left-3 bg-espresso text-cream text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                    ✓ In Your Box
                  </div>
                )}
                {product.isCustomizable && !selected && (
                  <div className="absolute top-3 right-3 bg-white/90 text-gold text-[10px] font-sans uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm border border-gold/20">
                    ✨ Personalized
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Product Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-serif font-semibold text-lg leading-tight">{product.name}</h4>
                    <span className="font-sans text-sm ml-2 flex-shrink-0">${product.price.toFixed(2)}</span>
                  </div>

                  {/* Show applied personalization after adding */}
                  {selected && selectedItem?.customOptions && selectedItem.customOptions.length > 0 && (
                    <div className="mt-2 bg-gold/5 border border-gold/20 rounded-lg px-3 py-2 text-xs text-espresso/70 space-y-0.5">
                      {selectedItem.customOptions.map((opt, i) => (
                        <p key={i}><span className="font-semibold text-espresso">{opt.name}:</span> {opt.value}</p>
                      ))}
                    </div>
                  )}

                  {/* Personalization hint for personalizable + not yet added */}
                  {product.isCustomizable && !selected && personNames.length > 0 && (
                    <div className="mt-2 text-[11px] font-sans text-gold/70">
                      ✨ Will be personalized with {personNames.length === 1 ? `"${personNames[0]}"` : `${personNames.length} names`}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-1.5 mt-auto">
                  {/* Primary CTA — always immediate, never opens modal */}
                  <button
                    disabled={isSubmitting}
                    onClick={() => selected ? onRemoveProduct(product.id) : handleAddClick(product)}
                    className={`py-3 w-full text-sm uppercase tracking-wider transition-colors duration-300 border ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      selected
                        ? 'border-espresso text-espresso hover:bg-espresso hover:text-cream'
                        : 'border-transparent bg-cream-dark text-espresso hover:bg-gold hover:text-white'
                    }`}
                  >
                    {selected ? '✓ Remove from Box' : 'Add to Box'}
                  </button>

                  {/* Secondary: View Details link */}
                  <button
                    type="button"
                    onClick={() => setViewingProduct(product)}
                    className="text-[11px] font-sans text-espresso/35 hover:text-espresso/70 transition-colors py-1 uppercase tracking-wider"
                  >
                    ⓘ View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Bar: Back + Live Total + Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gold-pale/50 pt-8 gap-4">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className={`uppercase tracking-widest text-sm transition-colors duration-300 py-4 ${isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-espresso-light hover:text-espresso'}`}
        >
          &larr; Back
        </button>

        {/* Live Total Panel */}
        <div className="flex items-center gap-6 bg-cream-dark/40 border border-gold/20 rounded-xl px-6 py-3">
          <div className="text-center">
            <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans">Items</span>
            <span className="font-serif text-xl text-espresso">{selectedProducts.length}</span>
          </div>
          <div className="w-px h-8 bg-gold/20" />
          <div className="text-center">
            <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans">Box Total</span>
            <span className="font-serif text-xl text-espresso">
              ${(selectedProducts.reduce((sum, p) => sum + p.price, 0) * quantity).toFixed(2)}
            </span>
          </div>
          {quantity > 1 && (
            <>
              <div className="w-px h-8 bg-gold/20" />
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-sans">{quantity} Boxes</span>
                <span className="font-serif text-xl text-espresso">
                  ${(selectedProducts.reduce((sum, p) => sum + p.price, 0) * quantity).toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onSubmit}
          disabled={isSubmitting || selectedProducts.length === 0}
          className={`px-6 md:px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 flex items-center justify-center ${
            (isSubmitting || selectedProducts.length === 0)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:-translate-y-0.5'
          }`}
        >
          {isSubmitting && <SpinnerIcon />}
          {isSubmitting ? 'Preparing Your Order...' : 'Review My Box & Checkout →'}
        </button>
      </div>

      {/* ── Info Modal (View Details — no customization inputs) ──────────────── */}
      {viewingProduct && typeof document !== 'undefined' && require('react-dom').createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-4 sm:p-6 overflow-hidden">
          <div className="bg-cream w-full max-w-4xl max-h-[95vh] rounded-2xl shadow-2xl relative flex flex-col md:flex-row overflow-hidden">

            {/* Close */}
            <button 
              onClick={() => setViewingProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-espresso transition-colors"
            >
              &#x2715;
            </button>

            {/* Left: Image Carousel */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex-shrink-0 relative group">
              <img 
                src={activeModalImageUrl} 
                alt={viewingProduct.name} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {modalImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-espresso shadow-lg transition-transform hover:scale-105 opacity-0 group-hover:opacity-100"
                  >
                    &larr;
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-espresso shadow-lg transition-transform hover:scale-105 opacity-0 group-hover:opacity-100"
                  >
                    &rarr;
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {modalImages.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-gold' : 'bg-white/50 hover:bg-white/80'}`}
                      />
                    ))}
                  </div>
                </>
              )}
              <div className="absolute inset-0 border-r border-gold-pale/30 hidden md:block pointer-events-none" />
            </div>

            {/* Right: Product Info + Personalization Preview */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <span className="text-xs text-gold uppercase tracking-widest mb-2 block">Product Details</span>
              <h4 className="font-serif text-3xl mb-1">{viewingProduct.name}</h4>
              <p className="font-sans text-xl text-espresso/70 mb-5">
                ${viewingProduct.price.toFixed(2)}
              </p>

              {/* Product description */}
              {viewingProduct.swellData?.description && (
                <div 
                  className="text-sm font-sans text-espresso/60 leading-relaxed mb-6 border-b border-gold-pale/30 pb-6 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: viewingProduct.swellData.description }}
                />
              )}

              <div className="flex-1">
                {/* Personalization preview for personalizable products */}
                {viewingProduct.isCustomizable && personNames.length > 0 ? (
                  <div className="bg-gold/5 border border-gold/20 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-gold">✨</span>
                      <span className="text-xs font-sans uppercase tracking-widest text-gold font-semibold">
                        Personalization — Auto-Applied
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {personNames.map((name, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {personNames.length > 1 && (
                            <div className="w-6 h-6 bg-espresso text-cream rounded-full text-[10px] flex items-center justify-center font-bold font-sans flex-shrink-0">
                              {i + 1}
                            </div>
                          )}
                          <div>
                            <span className="font-serif text-espresso text-base">{name}</span>
                            {personNames.length > 1 && (
                              <span className="text-[10px] text-espresso/40 font-sans ml-2">Box {i + 1}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-espresso/40 font-sans leading-relaxed">
                      {personNames.length === 1
                        ? `This item will be made for "${personNames[0]}" — no extra input needed.`
                        : `Each item will be personalized with the exact name for that box. No extra input needed.`}
                    </p>
                  </div>
                ) : viewingProduct.isCustomizable && personNames.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <p className="text-sm font-sans text-amber-800">
                      ⚠ Go back to Step 2 to enter your bridesmaids' names — they'll be used to personalize this item automatically.
                    </p>
                  </div>
                ) : (
                  <div className="bg-cream/40 border border-gold-pale/20 rounded-xl p-4 mb-6">
                    <p className="text-sm font-sans text-espresso/60">
                      This item is included as-is — beautifully packaged inside your chosen box.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal CTA */}
              <div className="pt-6 border-t border-gold-pale/30 space-y-3">
                {isSelected(viewingProduct.id) ? (
                  <button
                    onClick={() => {
                      onRemoveProduct(viewingProduct.id);
                      setViewingProduct(null);
                    }}
                    disabled={isSubmitting}
                    className="w-full py-4 border border-espresso text-espresso uppercase tracking-widest text-sm hover:bg-espresso hover:text-cream transition-all duration-300 disabled:opacity-50"
                  >
                    ✓ Remove from Box
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleAddClick(viewingProduct);
                      setViewingProduct(null);
                    }}
                    disabled={isSubmitting || (viewingProduct.isCustomizable && personNames.length === 0)}
                    className={`w-full py-4 uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      (isSubmitting || (viewingProduct.isCustomizable && personNames.length === 0))
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting && <SpinnerIcon />}
                    {quantity > 1 && personNames.length > 1
                      ? `Add to Box — ${personNames.length} Names Applied`
                      : 'Add to Box'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setViewingProduct(null)}
                  className="w-full text-center text-xs font-sans text-espresso/40 hover:text-espresso/70 transition-colors py-2 uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
