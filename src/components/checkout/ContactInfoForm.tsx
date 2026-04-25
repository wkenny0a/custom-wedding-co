'use client';

import { useState } from 'react';
import { useCheckout, ContactInfo } from './CheckoutProvider';

export default function ContactInfoForm() {
  const { contact, saveContact, isWorking, step, setStep } = useCheckout();

  const [form, setForm] = useState<ContactInfo>({
    email: contact.email,
    firstName: contact.firstName,
    lastName: contact.lastName,
  });
  const [errors, setErrors] = useState<Partial<ContactInfo>>({});

  const validate = () => {
    const e: Partial<ContactInfo> = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email';
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    await saveContact(form);
  };

  const isComplete = step > 1;

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-gold-pale/30 rounded-2xl overflow-hidden">
      {/* Header — clickable when completed */}
      <button
        type="button"
        onClick={() => isComplete && setStep(1)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gold-pale/20 hover:bg-white/40 transition-colors text-left"
        disabled={!isComplete}
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${isComplete ? 'bg-espresso text-cream' : 'bg-gold text-white'}`}>
            {isComplete ? '✓' : '1'}
          </div>
          <h2 className="font-serif text-xl text-espresso">Contact Information</h2>
        </div>
        {isComplete && (
          <span className="text-xs font-sans text-gold uppercase tracking-wider">Edit</span>
        )}
      </button>

      {/* Collapsed summary */}
      {isComplete && step !== 1 && (
        <div className="px-6 py-3 bg-cream/30">
          <p className="text-sm font-sans text-espresso/70">
            {form.firstName} {form.lastName} · {form.email}
          </p>
        </div>
      )}

      {/* Form */}
      {step === 1 && (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="co-email" className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">
              Email Address *
            </label>
            <input
              id="co-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className={`w-full bg-white border px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors rounded-lg ${errors.email ? 'border-red-400' : 'border-gold-pale/40 focus:border-gold'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="co-first" className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">
                First Name *
              </label>
              <input
                id="co-first"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                placeholder="Sarah"
                className={`w-full bg-white border px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors rounded-lg ${errors.firstName ? 'border-red-400' : 'border-gold-pale/40 focus:border-gold'}`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="co-last" className="block text-xs font-sans uppercase tracking-widest text-espresso/60 mb-2">
                Last Name *
              </label>
              <input
                id="co-last"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                placeholder="Johnson"
                className={`w-full bg-white border px-4 py-3 font-sans text-espresso focus:outline-none focus:ring-2 focus:ring-gold/30 transition-colors rounded-lg ${errors.lastName ? 'border-red-400' : 'border-gold-pale/40 focus:border-gold'}`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <p className="text-[11px] font-sans text-espresso/40">
            We'll send your order confirmation and proof preview to this email.
          </p>

          <button
            type="submit"
            disabled={isWorking}
            className={`w-full py-4 font-sans text-sm uppercase tracking-widest transition-all duration-300 rounded-lg flex items-center justify-center gap-2 ${isWorking ? 'bg-espresso/40 text-cream/60 cursor-not-allowed' : 'bg-espresso text-cream hover:bg-espresso-light shadow-sm hover:-translate-y-0.5'}`}
          >
            {isWorking ? (
              <><Spinner /> Saving…</>
            ) : (
              'Continue to Shipping →'
            )}
          </button>
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
