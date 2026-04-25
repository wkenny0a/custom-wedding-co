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
}

export default function StepProducts({
  catalogProducts,
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onPrev,
  onSubmit,
  isSubmitting = false
}: StepProductsProps) {
  
  const [customizingProduct, setCustomizingProduct] = useState<ProductItem | null>(null);
  const [customOptions, setCustomOptions] = useState<Record<string, string>>({});
  
  // Carousel State
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (customizingProduct) {
      // Reset image index
      setCurrentImageIndex(0);

      // Initialize option mapping
      if (customizingProduct.swellData?.options) {
        const initial: Record<string, string> = {};
        customizingProduct.swellData.options.forEach((opt: any) => {
          if (opt.values && opt.values.length > 0) {
            initial[opt.name] = opt.values[0].name; // Automatic pre-selection for Dropdowns
          } else {
            initial[opt.name] = ''; // Text-inputs remain empty
          }
        });
        setCustomOptions(initial);
      }
    }
  }, [customizingProduct]);

  const handleAddClick = (product: ProductItem) => {
    if (product.isCustomizable) {
      setCustomizingProduct(product);
    } else {
      onAddProduct(product);
    }
  };

  const handleOptionChange = (optionName: string, value: string) => {
    setCustomOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const confirmCustomProduct = () => {
    if (customizingProduct) {
      const optionsArray = Object.keys(customOptions).map(key => ({
        name: key,
        value: customOptions[key]
      }));

      onAddProduct({ 
        ...customizingProduct, 
        customOptions: optionsArray 
      });
      setCustomizingProduct(null);
    }
  };

  const isSelected = (productId: string) => selectedProducts.some(p => p.id === productId);
  const getSelectedProduct = (productId: string) => selectedProducts.find(p => p.id === productId);

  const isCustomizationComplete = () => {
    if (!customizingProduct || !customizingProduct.swellData?.options) return true;
    return customizingProduct.swellData.options.every((opt: any) => !!customOptions[opt.name]?.trim());
  };

  // Carousel Logic
  const getModalImages = () => {
    if (!customizingProduct) return [];
    const swellImages = customizingProduct.swellData?.images || [];
    if (swellImages.length > 0) {
      return swellImages.map((img: any) => img.file?.url).filter((url?: string) => !!url);
    }
    return [customizingProduct.image || '/images/box_closed.png'];
  };

  const modalImages = getModalImages();
  const activeModalImageUrl = modalImages[currentImageIndex] || '/images/box_closed.png';

  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % modalImages.length);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + modalImages.length) % modalImages.length);

  // Reusable loading spinner SVG
  const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h3 className="font-serif text-3xl mb-2 text-center">Step 3: Fill Your Box</h3>
      <p className="text-center text-espresso-light mb-8 max-w-lg mx-auto">
        Select bespoke items to include. We recommend 3-5 items for the perfect presentation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {catalogProducts.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-espresso-light">
            <p>No products found in the "bridesmaid-box" category.</p>
          </div>
        )}
        {catalogProducts.map((product) => {
          const selectedItem = getSelectedProduct(product.id);
          const selected = !!selectedItem;

          return (
            <div key={product.id} className={`bg-white/80 rounded-xl overflow-hidden shadow-sm border transition-all duration-500 hover:-translate-y-1 ${selected ? 'border-gold shadow-md' : 'border-gold-pale/30'}`}>
              <div val="image-container" className="h-48 bg-gray-100 relative overflow-hidden group">
                <img src={product.image || '/images/box_closed.png'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 min-h-[140px] gap-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-serif font-semibold text-lg leading-tight">{product.name}</h4>
                    <span className="font-sans text-sm ml-2">${product.price.toFixed(2)}</span>
                  </div>
                  {product.isCustomizable && (
                    <span className="text-xs text-gold uppercase tracking-widest block mt-1">Customizable</span>
                  )}
                  {selected && selectedItem.customOptions && selectedItem.customOptions.length > 0 && (
                    <div className="mt-3 bg-white/50 p-2 rounded text-xs text-espresso/80 space-y-1">
                      {selectedItem.customOptions.map((opt, i) => (
                        <p key={i}><span className="font-semibold">{opt.name}:</span> {opt.value}</p>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  disabled={isSubmitting}
                  onClick={() => selected ? onRemoveProduct(product.id) : handleAddClick(product)}
                  className={`py-3 w-full text-sm uppercase tracking-wider transition-colors duration-300 border mt-auto ${
                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  } ${
                    selected 
                      ? 'border-espresso text-espresso hover:bg-espresso hover:text-cream' 
                      : 'border-transparent bg-cream-dark text-espresso hover:bg-gold hover:text-white'
                  }`}
                >
                  {selected ? 'Remove Selection' : (product.isCustomizable ? 'Personalize It' : 'Add to Box')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between border-t border-gold-pale/50 pt-8 items-center">
        <button
          onClick={onPrev}
          disabled={isSubmitting}
          className={`uppercase tracking-widest text-sm transition-colors duration-300 py-4 ${isSubmitting ? 'text-gray-300 cursor-not-allowed' : 'text-espresso-light hover:text-espresso'}`}
        >
          &larr; Back
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right hidden sm:block">
            <span className="block text-xs uppercase tracking-widest text-gray-400">Total Items</span>
            <span className="font-serif text-xl">{selectedProducts.length}</span>
          </div>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className={`px-6 md:px-8 py-4 uppercase tracking-widest text-sm transition-all duration-500 flex items-center justify-center ${
              isSubmitting ? 'bg-espresso-light text-cream/70 cursor-not-allowed' : 'bg-espresso text-cream hover:bg-espresso-light shadow-md'
            }`}
          >
            {isSubmitting && <SpinnerIcon />}
            {isSubmitting ? 'Syncing...' : 'Review Cart & Checkout'}
          </button>
        </div>
      </div>

      {/* Epic 2-Column Quick View Modal for Customizable Products */}
      {customizingProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300 p-4 pt-10 md:pt-20 overflow-y-auto">
          <div className="bg-cream w-full max-w-4xl rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row my-auto md:my-0">
            
            <button 
              onClick={() => setCustomizingProduct(null)}
              disabled={isSubmitting}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-espresso transition-colors disabled:opacity-50"
            >
              &#x2715;
            </button>

            {/* Left Column: Interactive Swell Carousel */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 flex-shrink-0 relative group">
               <img 
                 src={activeModalImageUrl} 
                 alt={customizingProduct.name} 
                 className="w-full h-full object-cover transition-opacity duration-300"
               />
               
               {/* Gallery Controls (Only appear if > 1 image exists) */}
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
                   
                   {/* Dots Indicator */}
                   <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                     {modalImages.map((_, i) => (
                       <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentImageIndex ? 'bg-gold' : 'bg-white/50'}`} />
                     ))}
                   </div>
                 </>
               )}

               <div className="absolute inset-0 border-r border-gold-pale/30 hidden md:block pointer-events-none" />
            </div>

            {/* Right Column: Dynamic Form UI */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
              <span className="text-xs text-gold uppercase tracking-widest mb-2 block">Quick View</span>
              <h4 className="font-serif text-3xl mb-2">{customizingProduct.name}</h4>
              <p className="font-sans text-lg text-espresso/80 mb-8 border-b border-gold-pale/30 pb-6">
                 ${customizingProduct.price.toFixed(2)}
              </p>

              <div className="flex-1 space-y-6">
                {(customizingProduct.swellData?.options || []).map((opt: any) => (
                  <div key={opt.id}>
                    <label className="block text-xs uppercase tracking-widest text-espresso mb-2">
                      {opt.name} {opt.required ? '*' : ''}
                    </label>
                    {opt.values && opt.values.length > 0 ? (
                      <select 
                        value={customOptions[opt.name] || ''}
                        onChange={(e) => handleOptionChange(opt.name, e.target.value)}
                        disabled={isSubmitting}
                        className="w-full bg-white border border-gold-pale p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors disabled:opacity-50"
                      >
                        <option value="" disabled>Select {opt.name}</option>
                        {opt.values.map((v: any) => (
                          <option key={v.id || v.name} value={v.name}>{v.name}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type="text"
                        value={customOptions[opt.name] || ''}
                        onChange={(e) => handleOptionChange(opt.name, e.target.value)}
                        disabled={isSubmitting}
                        placeholder={`Enter ${opt.name}`}
                        className="w-full bg-white border border-gold-pale p-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-gray-300 disabled:opacity-50"
                      />
                    )}
                  </div>
                ))}

                {(!customizingProduct.swellData?.options || customizingProduct.swellData.options.length === 0) && (
                   <p className="text-sm text-espresso-light italic">No options required for this product.</p>
                )}
              </div>

              <div className="mt-10 pt-6 border-t border-gold-pale/30">
                <button 
                  onClick={confirmCustomProduct}
                  disabled={!isCustomizationComplete() || isSubmitting}
                  className={`w-full py-4 uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center ${
                    (isCustomizationComplete() && !isSubmitting)
                      ? 'bg-espresso text-cream hover:bg-espresso-light shadow-md hover:-translate-y-0.5' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting && <SpinnerIcon />}
                  {isCustomizationComplete() ? (isSubmitting ? 'Saving...' : 'Confirm Customization') : 'Complete All Fields'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
