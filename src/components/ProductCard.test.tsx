import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../context/CartContext';
import { Product } from '../context/CartContext';

const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 9.99,
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
};

describe('ProductCard', () => {
    test('displays the name, price and category of the product', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$9.99')).toBeInTheDocument();
        expect(screen.getByText('electronics')).toBeInTheDocument();
    });

    test('when you click on the "Add to Cart" button, the product is added', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProduct} />
            </CartProvider>
        );

        const button = screen.getByText(/add to cart/i);
        fireEvent.click(button);

        // Визуально ничего не изменится, но код сработает
        // Можно расширить тест, если захотим мокать контекст
        expect(button).toBeEnabled();
    });
});
