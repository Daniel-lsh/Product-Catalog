import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    quantity?: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    deleteProductFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p =>
                    p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart(prev =>
            prev
                .map(p =>
                    p.id === id && (p.quantity || 1) > 1
                        ? { ...p, quantity: (p.quantity || 1) - 1 }
                        : p
                )
                .filter(p => (p.quantity || 1) > 0)
        );
    };

    const deleteProductFromCart = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteProductFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
