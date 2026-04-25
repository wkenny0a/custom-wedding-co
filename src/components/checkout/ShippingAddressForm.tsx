'use client';

import { useState } from 'react';
import { useCheckout, ShippingAddress } from './CheckoutProvider';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
];

export default function ShippingAddressForm() {
  const { address, saveAddress, isWorking, step, setStep, contact } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>({
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    state: address.state,
    zip: address.zip,
    country: address.country || 'US',
  });
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  const validate = () => {
    const e: Partial<ShippingAddress> = {};
    if (!form.address1.trim()) e.address1 = 'Street address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state.trim()) e.state = 'State is required';
    if (!form.zip.match(/^\d{5}(-\d{4})?$/)) e.zip = 'Valid ZIP code required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    await saveAddress(form);
  };

  const isComplete = step > 2;
  const isLocked = step < 2;

  const field = (
    id: string,
    label: string,
    key: keyof ShippingAddress,
    opts?: { placeholder?: string; autoComplete?: string; required?: boolean }
  ) => (
    <div>
      <label htmlFor={id} className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">
        {label} {opts?.required !== false ? '*' : ''}
      </label>
      <input
        id={id}
        type="text"
        autoComplete={opts?.autoComplete}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={opts?.placeholder}
        className={`w-full bg-white border px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors rounded-lg ${(errors as any)[key] ? 'border-red-400' : 'border-gold-pale/40 focus:border-gold'}`}
      />
      {(errors as any)[key] && <p className="text-red-500 text-xs mt-1">{(errors as any)[key]}</p>}
    </div>
  );

  return (
    <div className={`bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden transition-opacity duration-300 ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Header */}
      <button
        type="button"
        onClick={() => isComplete && setStep(2)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gold-pale/20 hover:bg-white/40 transition-colors text-left"
        disabled={!isComplete}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${isComplete ? 'bg-espresso text-cream' : isLocked ? 'bg-cream-dark text-gray-400' : 'bg-gold text-white'}`}>
            {isComplete ? '✓' : '2'}
          </div>
          <h2 className="font-serif text-xl text-espresso">Shipping Address</h2>
        </div>
        {isComplete && (
          <span className="text-xs font-sans text-gold uppercase tracking-wider">Edit</span>
        )}
      </button>

      {/* Collapsed summary */}
      {isComplete && step !== 2 && (
        <div className="px-6 py-3 bg-cream/30">
          <p className="text-sm font-sans text-espresso/70">
            {contact.firstName} {contact.lastName} · {form.address1}{form.address2 ? `, ${form.address2}` : ''}, {form.city}, {form.state} {form.zip}
          </p>
        </div>
      )}

      {/* Form */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {field('sa-addr1', 'Street Address', 'address1', { placeholder: '123 Rose Lane', autoComplete: 'address-line1' })}
          {field('sa-addr2', 'Apt / Suite / Unit', 'address2', { placeholder: 'Optional', autoComplete: 'address-line2', required: false })}

          <div className="grid grid-cols-2 gap-4">
            {field('sa-city', 'City', 'city', { placeholder: 'Nashville', autoComplete: 'address-level2' })}
            <div>
              <label htmlFor="sa-state" className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">State *</label>
              <select
                id="sa-state"
                value={form.state}
                onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                className={`w-full bg-white border px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors rounded-lg ${errors.state ? 'border-red-400' : 'border-gold-pale/40 focus:border-gold'}`}
              >
                <option value="">Select…</option>
                {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {field('sa-zip', 'ZIP Code', 'zip', { placeholder: '90210', autoComplete: 'postal-code' })}
            <div>
              <label htmlFor="sa-country" className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">Country *</label>
              <select
                id="sa-country"
                value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                className="w-full bg-white border border-gold-pale/40 px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors rounded-lg"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-5 py-3 border border-gold-pale/40 font-sans text-sm text-espresso/60 hover:text-espresso hover:border-espresso/30 transition-colors rounded-lg"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={isWorking}
              className={`flex-1 py-3 font-sans text-sm uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${isWorking ? 'bg-espresso/40 text-cream/60 cursor-not-allowed' : 'bg-espresso text-cream hover:bg-espresso-light shadow-sm hover:-translate-y-0.5'}`}
            >
              {isWorking ? <><Spinner />Finding Rates…</> : 'Continue to Shipping →'}
            </button>
          </div>
        </form>
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
