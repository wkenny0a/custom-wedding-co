'use client';

import { useCheckout } from './CheckoutProvider';

export default function ShippingMethodSelector() {
  const { shippingRates, selectedRate, saveShippingRate, isWorking, step, setStep } = useCheckout();

  const isLocked = step < 3;
  const isComplete = step > 3;

  return (
    <div className={`bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden transition-opacity duration-300 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Header */}
      <button
        type="button"
        onClick={() => isComplete && setStep(3)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gold-pale/20 hover:bg-white/40 transition-colors text-left"
        disabled={!isComplete}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${isComplete ? 'bg-espresso text-cream' : isLocked ? 'bg-cream-dark text-gray-400' : 'bg-gold text-white'}`}>
            {isComplete ? '✓' : '3'}
          </div>
          <h2 className="font-serif text-xl text-espresso">Shipping Method</h2>
        </div>
        {isComplete && selectedRate && (
          <span className="text-xs font-sans text-gold uppercase tracking-wider">Edit</span>
        )}
      </button>

      {/* Collapsed summary */}
      {isComplete && selectedRate && step !== 3 && (
        <div className="px-6 py-3 bg-cream/30">
          <p className="text-sm font-sans text-espresso/70">
            {selectedRate.name} — {selectedRate.price === 0 ? 'Free' : `$${selectedRate.price.toFixed(2)}`}
          </p>
        </div>
      )}

      {/* Rate Selector */}
      {step === 3 && (
        <div className="px-6 py-6 space-y-4">
          {shippingRates.length === 0 ? (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">🚚</div>
              <p className="font-serif text-espresso">Free Standard Shipping</p>
              <p className="text-xs font-sans text-espresso/50 mt-1">Estimated 5–7 business days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {shippingRates.map(rate => (
                <button
                  key={rate.id}
                  type="button"
                  onClick={() => saveShippingRate(rate)}
                  disabled={isWorking}
                  className={`w-full flex items-center justify-between px-5 py-4 border-2 rounded-xl transition-all duration-200 text-left ${selectedRate?.id === rate.id ? 'border-gold bg-gold/5 shadow-sm' : 'border-gold-pale/30 hover:border-gold/50 hover:bg-white/40'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedRate?.id === rate.id ? 'border-gold' : 'border-gray-300'}`}>
                      {selectedRate?.id === rate.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                    </div>
                    <div>
                      <p className="font-serif text-espresso font-medium">{rate.name}</p>
                      {rate.description && <p className="text-xs font-sans text-espresso/50 mt-0.5">{rate.description}</p>}
                    </div>
                  </div>
                  <span className="font-sans font-semibold text-espresso ml-4 flex-shrink-0">
                    {rate.price === 0 ? <span className="text-green-700">Free</span> : `$${rate.price.toFixed(2)}`}
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-3 border border-gold-pale/40 font-sans text-sm text-espresso/60 hover:text-espresso hover:border-espresso/30 transition-colors rounded-lg"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={isWorking || (shippingRates.length > 0 && !selectedRate)}
              onClick={() => shippingRates.length === 0 ? setStep(4) : selectedRate && saveShippingRate(selectedRate)}
              className={`flex-1 py-3 font-sans text-sm uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${(isWorking || (shippingRates.length > 0 && !selectedRate)) ? 'bg-espresso/40 text-cream/60 cursor-not-allowed' : 'bg-espresso text-cream hover:bg-espresso-light shadow-sm hover:-translate-y-0.5'}`}
            >
              {isWorking ? <><Spinner />Saving…</> : 'Continue to Payment →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
