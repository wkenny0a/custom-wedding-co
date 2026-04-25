'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import swell from '@/lib/swell';
import { useCart } from '@/context/CartContext';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ContactInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ShippingAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  price: number;
  description?: string;
}

interface CheckoutContextType {
  step: number;
  setStep: (s: number) => void;
  contact: ContactInfo;
  setContact: (c: ContactInfo) => void;
  address: ShippingAddress;
  setAddress: (a: ShippingAddress) => void;
  shippingRates: ShippingRate[];
  selectedRate: ShippingRate | null;
  setSelectedRate: (r: ShippingRate) => void;
  isWorking: boolean;
  saveContact: (c: ContactInfo) => Promise<void>;
  saveAddress: (a: ShippingAddress) => Promise<void>;
  saveShippingRate: (r: ShippingRate) => Promise<void>;
  submitOrder: () => Promise<string | null>;
  bumpAdded: boolean;
  setBumpAdded: (v: boolean) => void;
  orderBumpProductId: string;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be inside CheckoutProvider');
  return ctx;
};

// The Personal Concierge product — already exists in Swell from CartDrawer
const ORDER_BUMP_PRODUCT_ID = '69e9a9c652ca2a001272aa14';

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const [step, setStep] = useState(1); // 1=Contact, 2=Address, 3=Shipping, 4=Payment
  const [isWorking, setIsWorking] = useState(false);
  const [bumpAdded, setBumpAddedState] = useState(false);

  const [contact, setContact] = useState<ContactInfo>({
    email: '', firstName: '', lastName: '',
  });
  const [address, setAddress] = useState<ShippingAddress>({
    address1: '', address2: '', city: '', state: '', zip: '', country: 'US',
  });
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null);

  const saveContact = useCallback(async (c: ContactInfo) => {
    setIsWorking(true);
    try {
      await swell.cart.update({
        account: { email: c.email, first_name: c.firstName, last_name: c.lastName },
      } as any);
      setContact(c);
      setStep(2);
    } finally {
      setIsWorking(false);
    }
  }, []);

  const saveAddress = useCallback(async (a: ShippingAddress) => {
    setIsWorking(true);
    try {
      await swell.cart.update({
        shipping: {
          name: `${contact.firstName} ${contact.lastName}`,
          address1: a.address1,
          address2: a.address2 || undefined,
          city: a.city,
          state: a.state,
          zip: a.zip,
          country: a.country,
        },
      } as any);
      setAddress(a);
      // Fetch shipping rates after address is saved
      const ratesResponse: any = await swell.cart.getShippingRates();
      const services: ShippingRate[] = (ratesResponse?.services || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        price: s.price ?? 0,
        description: s.description || '',
      }));
      setShippingRates(services);
      // If no rates returned, still go to payment (free shipping scenario)
      setStep(3);
    } finally {
      setIsWorking(false);
    }
  }, [contact]);

  const saveShippingRate = useCallback(async (rate: ShippingRate) => {
    setIsWorking(true);
    try {
      await swell.cart.update({
        shipping: { service_id: rate.id },
      } as any);
      setSelectedRate(rate);
      setStep(4);
    } finally {
      setIsWorking(false);
    }
  }, []);

  const setBumpAdded = useCallback(async (val: boolean) => {
    setBumpAddedState(val);
    const alreadyInCart = cart?.items?.some((i: any) => i.product?.id === ORDER_BUMP_PRODUCT_ID);
    if (val && !alreadyInCart) {
      try { await addToCart(ORDER_BUMP_PRODUCT_ID, 1, [], undefined, true); } catch (e) { console.warn('Order bump add failed', e); }
    } else if (!val && alreadyInCart) {
      const item = cart?.items?.find((i: any) => i.product?.id === ORDER_BUMP_PRODUCT_ID);
      if (item) { try { await removeFromCart(item.id); } catch (e) { console.warn('Order bump remove failed', e); } }
    }
  }, [cart, addToCart, removeFromCart]);

  const submitOrder = useCallback(async (): Promise<string | null> => {
    setIsWorking(true);
    try {
      const order: any = await swell.cart.submitOrder();
      if (order?.id) {
        return order.id;
      }
      return null;
    } catch (e) {
      console.error('Order submit failed', e);
      return null;
    } finally {
      setIsWorking(false);
    }
  }, []);

  return (
    <CheckoutContext.Provider value={{
      step, setStep,
      contact, setContact,
      address, setAddress,
      shippingRates, selectedRate, setSelectedRate,
      isWorking,
      saveContact, saveAddress, saveShippingRate,
      submitOrder,
      bumpAdded, setBumpAdded,
      orderBumpProductId: ORDER_BUMP_PRODUCT_ID,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}
