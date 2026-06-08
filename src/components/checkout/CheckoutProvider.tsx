'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import swell from '@/lib/swell';
import { useCart } from '@/context/CartContext';
import { trackInitiateCheckout } from '@/lib/analytics';

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
  checkoutError: string | null;
  setCheckoutError: (e: string | null) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);
export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be inside CheckoutProvider');
  return ctx;
};

// The Express Shipping product created in Swell
const EXPRESS_SHIPPING_PRODUCT_ID = '6a269ab4ca51510012a16442';

const DEFAULT_SHIPPING_RATES: ShippingRate[] = [
  { id: 'standard', name: 'Standard Shipping', price: 0, description: 'Arrives 8–10 days' },
  { id: 'express', name: 'Express Shipping', price: 15, description: 'Arrives 4–6 days' }
];

// The Personal Concierge product — already exists in Swell from CartDrawer
const ORDER_BUMP_PRODUCT_ID = '69e9a9c652ca2a001272aa14';

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const { cart, addToCart, removeFromCart, updateCart } = useCart();

  const [step, setStep] = useState(1); // 1=Contact, 2=Address, 3=Shipping, 4=Payment
  const [isWorking, setIsWorking] = useState(false);
  const [bumpAdded, setBumpAddedState] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const [contact, setContact] = useState<ContactInfo>({
    email: '', firstName: '', lastName: '',
  });
  const [address, setAddress] = useState<ShippingAddress>({
    address1: '', address2: '', city: '', state: '', zip: '', country: 'US',
  });
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>(DEFAULT_SHIPPING_RATES);
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>({
    id: 'standard', name: 'Standard Shipping', price: 0, description: 'Arrives 8–10 days'
  });

  const hasTrackedCheckoutRef = React.useRef(false);
  React.useEffect(() => {
    if (cart?.items?.length > 0 && !hasTrackedCheckoutRef.current) {
      hasTrackedCheckoutRef.current = true;
      trackInitiateCheckout({
        items: cart.items.map((i: any) => ({
          id: i.product_id || i.product?.id || '',
          name: i.product?.name || 'Unknown Product',
          price: i.price || 0,
          quantity: i.quantity || 1,
        })),
        total: cart.sub_total ?? cart.subTotal ?? cart.total ?? 0,
      });
    }
  }, [cart]);

  // Sync selectedRate state with cart items on mount/update
  React.useEffect(() => {
    if (cart) {
      const hasExpress = cart.items?.some((i: any) => i.product?.id === EXPRESS_SHIPPING_PRODUCT_ID);
      if (hasExpress) {
        setSelectedRate({ id: 'express', name: 'Express Shipping', price: 15, description: 'Arrives 4–6 days' });
      } else {
        setSelectedRate({ id: 'standard', name: 'Standard Shipping', price: 0, description: 'Arrives 8–10 days' });
      }
    }
  }, [cart]);

  const saveContact = useCallback(async (c: ContactInfo) => {
    setIsWorking(true);
    setCheckoutError(null);
    try {
      const res: any = await swell.cart.update({
        account: { email: c.email },
        billing: { first_name: c.firstName, last_name: c.lastName, name: `${c.firstName} ${c.lastName}` },
      } as any);
      
      if (res?.errors) {
        const errorMessages = Object.values(res.errors).map((e: any) => e.message).join(' | ');
        setCheckoutError(errorMessages || 'Validation error updating contact info.');
        return;
      }

      updateCart(res);
      setContact(c);
      setStep(2);
    } catch (e: any) {
      setCheckoutError(e?.message || 'Something went wrong updating contact info.');
    } finally {
      setIsWorking(false);
    }
  }, [updateCart]);

  const saveAddress = useCallback(async (a: ShippingAddress) => {
    setIsWorking(true);
    setCheckoutError(null);
    try {
      const res: any = await swell.cart.update({
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

      if (res?.errors) {
        const errorMessages = Object.values(res.errors).map((e: any) => e.message).join(' | ');
        setCheckoutError(errorMessages || 'Validation error updating address.');
        return;
      }

      updateCart(res);
      setAddress(a);
      setShippingRates(DEFAULT_SHIPPING_RATES);
      setStep(3);
    } catch (e: any) {
      setCheckoutError(e?.message || 'Something went wrong updating address.');
    } finally {
      setIsWorking(false);
    }
  }, [contact, updateCart]);

  const saveShippingRate = useCallback(async (rate: ShippingRate) => {
    setIsWorking(true);
    setCheckoutError(null);
    try {
      let updatedCart = cart;
      const hasExpressInCart = cart?.items?.some((i: any) => i.product?.id === EXPRESS_SHIPPING_PRODUCT_ID);

      if (rate.id === 'express' && !hasExpressInCart) {
        updatedCart = await swell.cart.addItem({
          product_id: EXPRESS_SHIPPING_PRODUCT_ID,
          quantity: 1
        });
      } else if (rate.id === 'standard' && hasExpressInCart) {
        const item = cart?.items?.find((i: any) => i.product?.id === EXPRESS_SHIPPING_PRODUCT_ID);
        if (item) {
          updatedCart = await swell.cart.removeItem(item.id);
        }
      }

      const res: any = await swell.cart.update({
        shipping: {
          service: rate.id,
          service_name: rate.name,
        },
      } as any);

      if (res?.errors) {
        const errorMessages = Object.values(res.errors).map((e: any) => e.message).join(' | ');
        setCheckoutError(errorMessages || 'Validation error updating shipping method.');
        return;
      }

      updateCart(res); // Sync the global cart state with the new totals!
      setSelectedRate(rate);
      setStep(4);
    } catch (e: any) {
      setCheckoutError(e?.message || 'Something went wrong updating shipping method.');
    } finally {
      setIsWorking(false);
    }
  }, [cart, updateCart]);

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
      checkoutError, setCheckoutError,
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}
