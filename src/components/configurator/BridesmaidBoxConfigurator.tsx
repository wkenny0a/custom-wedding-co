'use client';

import React, { useState } from 'react';
import { BoxColorOption, ProductItem, ConfiguratorState } from './types';
import StepBoxColor from './StepBoxColor';
import StepPersonalization from './StepPersonalization';
import StepProducts from './StepProducts';

export default function BridesmaidBoxConfigurator({ catalogProducts = [] }: { catalogProducts?: ProductItem[] }) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [state, setState] = useState<ConfiguratorState>({
    boxColor: null,
    personalizationMessage: 'Will you be my bridesmaid, Carly?', // Default sample setup
    includeShreddedPaper: false,
    includeBowTie: false,
    selectedProducts: [],
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const setBoxColor = (color: BoxColorOption) => setState(s => ({ ...s, boxColor: color }));
  const setPersonalizationMessage = (msg: string) => setState(s => ({ ...s, personalizationMessage: msg }));
  const setIncludeShreddedPaper = (include: boolean) => setState(s => ({ ...s, includeShreddedPaper: include }));
  const setIncludeBowTie = (include: boolean) => setState(s => ({ ...s, includeBowTie: include }));
  const addProduct = (product: ProductItem) => setState(s => ({ ...s, selectedProducts: [...s.selectedProducts, product] }));
  const removeProduct = (productId: string) => setState(s => ({ ...s, selectedProducts: s.selectedProducts.filter(p => p.id !== productId) }));

  const handleSubmit = () => {
    // Logic to add the composite item to Snipcart or Swell Cart
    alert(`Configurator Submitted!\nBox Color: ${state.boxColor?.name}\nMessage: ${state.personalizationMessage}\nShredded Paper: ${state.includeShreddedPaper ? 'Yes' : 'No'}\nBow Tie Ribbon: ${state.includeBowTie ? 'Yes' : 'No'}\nItems: ${state.selectedProducts.length}`);
  };

  // Progress Bar
  const steps = [
    { num: 1, label: 'Box Color' },
    { num: 2, label: 'Inner Lid' },
    { num: 3, label: 'Fill Box' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/40 backdrop-blur-md border border-gold-pale/20 shadow-xl rounded-3xl p-6 md:p-12">
      
      {/* Stepper Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2 md:gap-4 w-full max-w-2xl">
          {steps.map((step, index) => (
            <React.Fragment key={step.num}>
              <div 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => step.num <= currentStep && setCurrentStep(step.num)}
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
          />
        )}
      </div>

    </div>
  );
}
