import React, { useState } from 'react';
import { ProductItem } from './types';

interface StepProductsProps {
  catalogProducts: ProductItem[];
  selectedProducts: ProductItem[];
  onAddProduct: (product: ProductItem) => void;
  onRemoveProduct: (productId: string) => void;
  onPrev: () => void;
  onSubmit: () => void;
}

export default function StepProducts({
  catalogProducts,
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onPrev,
  onSubmit
}: StepProductsProps) {
  
  // Local state for modal when adding customizable product
  const [customizingProduct, setCustomizingProduct] = useState<ProductItem | null>(null);
  const [customName, setCustomName] = useState('');

  const handleAddClick = (product: ProductItem) => {
    if (product.isCustomizable) {
      setCustomizingProduct(product);
      setCustomName(''); // Reset
    } else {
      onAddProduct(product);
    }
  };

  const confirmCustomProduct = () => {
    if (customizingProduct && customName.trim()) {
      onAddProduct({ ...customizingProduct, customName: customName.trim() });
      setCustomizingProduct(null);
    }
  };

  const isSelected = (productId: string) => selectedProducts.some(p => p.id === productId);
  const getSelectedProduct = (productId: string) => selectedProducts.find(p => p.id === productId);

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
            <div key={product.id} className="bg-white/80 rounded-xl overflow-hidden shadow-sm border border-gold-pale/30 transition-transform duration-500 hover:-translate-y-1">
              <div val="image-container" className="h-48 bg-gray-100 relative overflow-hidden group">
                <img src={product.image || '/images/box_closed.png'} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1 min-h-[140px] gap-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-serif font-semibold text-lg leading-tight">{product.name}</h4>
                    <span className="font-sans text-sm ml-2">${product.price}</span>
                  </div>
                  {product.isCustomizable && (
                    <span className="text-xs text-gold uppercase tracking-widest block mt-1">Customizable</span>
                  )}
                  {selected && product.isCustomizable && selectedItem?.customName && (
                    <p className="text-sm italic text-espresso-light mt-2">
                      Name: "{selectedItem.customName}"
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => selected ? onRemoveProduct(product.id) : handleAddClick(product)}
                  className={`py-3 w-full text-sm uppercase tracking-wider transition-colors duration-300 border mt-auto ${
                    selected 
                      ? 'border-espresso text-espresso hover:bg-espresso hover:text-cream' 
                      : 'border-transparent bg-cream-dark text-espresso hover:bg-gold hover:text-white'
                  }`}
                >
                  {selected ? 'Remove' : (product.isCustomizable ? 'Personalize It' : 'Add to Box')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between border-t border-gold-pale/50 pt-8 items-center">
        <button
          onClick={onPrev}
          className="uppercase tracking-widest text-sm text-espresso-light hover:text-espresso transition-colors duration-300 py-4"
        >
          &larr; Back
        </button>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="block text-xs uppercase tracking-widest text-gray-400">Total Items</span>
            <span className="font-serif text-xl">{selectedProducts.length}</span>
          </div>
          <button
            onClick={onSubmit}
            className="px-8 py-4 uppercase tracking-widest text-sm bg-espresso text-cream hover:bg-espresso-light transition-colors duration-500"
          >
            Review & Checkout
          </button>
        </div>
      </div>

      {/* Modal for customizable product */}
      {customizingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-cream w-full max-w-md p-8 rounded-xl shadow-2xl relative">
            <button 
              onClick={() => setCustomizingProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-espresso"
            >
              &#x2715;
            </button>
            <h4 className="font-serif text-2xl mb-2">Personalize It</h4>
            <p className="text-sm text-espresso-light mb-6">
              Enter the name to be beautifully printed manually onto your {customizingProduct.name}.
            </p>
            <input 
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Carly"
              className="w-full bg-white border border-gold-pale p-3 mb-6 focus:outline-none focus:border-gold placeholder:text-gray-300"
              autoFocus
            />
            <button 
              onClick={confirmCustomProduct}
              disabled={!customName.trim()}
              className={`w-full py-3 uppercase tracking-widest text-sm transition-colors duration-300 ${
                customName.trim() ? 'bg-espresso text-cream hover:bg-espresso-light' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
