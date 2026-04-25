'use client';

import React, { useState } from 'react';
import { BoxColorOption, ProductItem, ConfiguratorState } from './types';
import StepBoxColor from './StepBoxColor';
import StepPersonalization from './StepPersonalization';
import StepProducts from './StepProducts';
import { useCart } from '@/context/CartContext';

export default function BridesmaidBoxConfigurator({ 
  catalogProducts = [],
  baseBoxProduct = null
}: { 
  catalogProducts?: ProductItem[],
  baseBoxProduct?: any
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart, addMultipleToCart, removeFromCart, setIsCartOpen, cart } = useCart();
  
  const [state, setState] = useState<ConfiguratorState>({
    boxColor: null,
    personalizationMessage: '',
    includeShreddedPaper: false,
    includeBowTie: false,
    selectedProducts: [],
    baseBoxCartItemId: undefined
  });

  const handleInjectBaseBox = async () => {
    if (!baseBoxProduct) return;
    setIsSubmitting(true);
    try {
      if (state.baseBoxCartItemId) {
         try { await removeFromCart(state.baseBoxCartItemId); } catch(e) {}
      }
      
      const baseOptions = [];
      if (state.boxColor) baseOptions.push({ name: 'Box Color', value: state.boxColor.name });
      if (state.includeShreddedPaper) baseOptions.push({ name: 'Matching Shredded Paper', value: 'Yes' });
      if (state.includeBowTie) baseOptions.push({ name: 'Exterior Bow Tie Ribbon', value: 'Yes' });
      if (state.personalizationMessage.trim()) baseOptions.push({ name: 'Inner Lid Message', value: state.personalizationMessage });

      const updatedCart = await addToCart(baseBoxProduct.id, 1, baseOptions, null, true);
      
      if (updatedCart && updatedCart.items && updatedCart.items.length > 0) {
        const newestItem = updatedCart.items[updatedCart.items.length - 1];
        setState(s => ({ ...s, baseBoxCartItemId: newestItem.id }));
      }
    } catch (error) {
      console.error("Failed to inject base box silently:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep = async (targetStep: number) => {
    if (targetStep === 3 && currentStep < 3) {
      await handleInjectBaseBox();
    }
    setCurrentStep(targetStep);
    
    // Auto-scroll to the top of the configurator gracefully
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => goToStep(Math.min(currentStep + 1, 3));
  const prevStep = () => goToStep(Math.max(currentStep - 1, 1));

  const setBoxColor = (color: BoxColorOption) => setState(s => ({ ...s, boxColor: color }));
  const setPersonalizationMessage = (msg: string) => setState(s => ({ ...s, personalizationMessage: msg }));
  const setIncludeShreddedPaper = (include: boolean) => setState(s => ({ ...s, includeShreddedPaper: include }));
  const setIncludeBowTie = (include: boolean) => setState(s => ({ ...s, includeBowTie: include }));
  const addProduct = async (product: ProductItem) => {
    setIsSubmitting(true);
    try {
      let itemOptions: any[] = [];
      if (product.isCustomizable && product.customOptions && product.customOptions.length > 0) {
        itemOptions = product.customOptions.map(opt => ({
          name: opt.name,
          value: opt.value
        }));
      }

      const updatedCart = await addToCart(product.id, 1, itemOptions, null, true);
      const newestItem = updatedCart?.items?.[updatedCart.items.length - 1];
      
      const newProduct = { ...product, cartItemId: newestItem?.id };
      setState(s => ({ ...s, selectedProducts: [...s.selectedProducts, newProduct] }));
    } catch (error) {
      console.error("Cart addition failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProduct = async (productId: string) => {
    const productToRemove = state.selectedProducts.find(p => p.id === productId);
    if (!productToRemove) return;

    setIsSubmitting(true);
    try {
      if (productToRemove.cartItemId) {
        await removeFromCart(productToRemove.cartItemId);
      }
      setState(s => ({ ...s, selectedProducts: s.selectedProducts.filter(p => p.id !== productId) }));
    } catch (error) {
      console.error("Cart removal failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    const checkoutLink = cart?.checkoutUrl || cart?.checkout_url;
    if (checkoutLink) {
       window.location.href = checkoutLink;
    } else {
       setIsCartOpen(true);
    }
  };

  // Progress Bar
  const steps = [
    { num: 1, label: 'Box Color' },
    { num: 2, label: 'Inner Lid' },
    { num: 3, label: 'Fill Box' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-md border border-gold-pale/20 shadow-xl rounded-3xl p-6 md:p-12">
      
      {/* Step 1 Introduction Header */}
      {currentStep === 1 && (
        <div className="text-center mb-10 animate-in fade-in duration-700">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Design Your Bridesmaid Box</h2>
          <p className="text-espresso-light/80 text-lg max-w-2xl mx-auto">
            Create a beautifully curated, personalized gift experience for your bridal party.
          </p>
        </div>
      )}

      {/* Stepper Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2 md:gap-4 w-full max-w-2xl">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => step.num <= currentStep && goToStep(step.num)}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg transition-colors duration-500 ${
                    currentStep === step.num 
                      ? 'bg-gold text-white' 
                      : currentStep > step.num 
                        ? 'bg-espresso text-cream' 
                        : 'bg-cream-dark text-gray-400'
                  }`}
                >
                  {step.num}
                </div>
                <span className={`text-xs uppercase tracking-widest mt-2 hidden md:block transition-colors duration-300 ${
                  currentStep >= step.num ? 'text-espresso' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-[1px] bg-gold-pale/50 mb-6 md:mb-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Components */}
      <div className="w-full min-h-[400px]">
        {currentStep === 1 && (
          <StepBoxColor 
            selectedColor={state.boxColor} 
            onSelectColor={setBoxColor} 
            onNext={nextStep} 
          />
        )}
        
        {currentStep === 2 && (
          <StepPersonalization 
            message={state.personalizationMessage} 
            onChangeMessage={setPersonalizationMessage}
            includeShreddedPaper={state.includeShreddedPaper}
            onToggleShreddedPaper={setIncludeShreddedPaper}
            includeBowTie={state.includeBowTie}
            onToggleBowTie={setIncludeBowTie}
            selectedColor={state.boxColor}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <StepProducts 
            catalogProducts={catalogProducts}
            selectedProducts={state.selectedProducts}
            onAddProduct={addProduct}
            onRemoveProduct={removeProduct}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

    </div>
  );
}
