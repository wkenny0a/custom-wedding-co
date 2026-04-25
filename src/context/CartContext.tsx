'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import swell from '@/lib/swell'

// Define the shape of our Cart Context
interface CartContextType {
    cart: any | null;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    addToCart: (productId: string, quantity: number, options?: any[], metadata?: any, suppressDrawer?: boolean) => Promise<any>;
    addMultipleToCart: (items: { productId: string; quantity: number; options: any[], metadata?: any }[]) => Promise<void>;
    removeFromCart: (itemId: string) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<any | null>(null)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Fetch the cart on initial load
    const fetchCart = async () => {
        setIsLoading(true)
        try {
            const currentCart = await swell.cart.get()
            setCart(currentCart)
        } catch (error) {
            console.error('Error fetching Swell cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const addToCart = async (productId: string, quantity: number, options: any[] = [], metadata?: any, suppressDrawer: boolean = false) => {
        setIsLoading(true)
        try {
            const itemPayload: any = {
                product_id: productId,
                quantity,
                options
            }
            if (metadata) {
                itemPayload.metadata = metadata
            }
            const updatedCart: any = await swell.cart.addItem(itemPayload)
            if (updatedCart?.errors) {
                // Extract generic Swell error message
                const errorMessages = Object.values(updatedCart.errors)
                    .map((e: any) => e.message)
                    .join(' | ')
                throw new Error(errorMessages || 'Validation error adding item to cart')
            }
            setCart(updatedCart)
            if (!suppressDrawer) {
                setIsCartOpen(true) // Open drawer automatically if not silenced
            }
            return updatedCart;
        } catch (error: any) {
            console.error('Error adding to cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const addMultipleToCart = async (items: { productId: string; quantity: number; options: any[], metadata?: any }[]) => {
        setIsLoading(true)
        try {
            let updatedCart = null
            for (const item of items) {
                const itemPayload: any = {
                    product_id: item.productId,
                    quantity: item.quantity,
                    options: item.options
                }
                if (item.metadata) {
                    itemPayload.metadata = item.metadata
                }
                updatedCart = await swell.cart.addItem(itemPayload)
                if ((updatedCart as any)?.errors) {
                    const errorMessages = Object.values((updatedCart as any).errors)
                        .map((e: any) => e.message)
                        .join(' | ')
                    throw new Error(errorMessages || 'Validation error adding items to cart')
                }
            }
            if (updatedCart) {
                setCart(updatedCart)
                setIsCartOpen(true)
            }
        } catch (error: any) {
            console.error('Error adding multiple items to cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const removeFromCart = async (itemId: string) => {
        setIsLoading(true)
        try {
            const updatedCart = await swell.cart.removeItem(itemId)
            setCart(updatedCart)
        } catch (error) {
            console.error('Error removing item from cart:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const updateQuantity = async (itemId: string, quantity: number) => {
        setIsLoading(true)
        try {
            const updatedCart = await swell.cart.updateItem(itemId, { quantity })
            setCart(updatedCart)
        } catch (error) {
            console.error('Error updating cart quantity:', error)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                addMultipleToCart,
                removeFromCart,
                updateQuantity,
                isLoading
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
