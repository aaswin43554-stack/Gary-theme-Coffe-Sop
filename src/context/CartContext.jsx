import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('oneEstateCart');
            if (savedCart) setCartItems(JSON.parse(savedCart));
        } catch (error) {
            console.error('Failed to load cart:', error);
            localStorage.removeItem('oneEstateCart');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('oneEstateCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (!existing) alert('Min 2 is packed is complusion.');
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 2 }];
        });
    };

    const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.id !== id));

    const updateQuantity = (id, quantity) => {
        if (quantity < 2) { alert('Min 2 is packed is complusion.'); return; }
        setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    };

    const clearCart = () => setCartItems([]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal }}>
            {children}
        </CartContext.Provider>
    );
};
