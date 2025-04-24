import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

function Cart() {
    const {
        cart,
        addToCart,
        removeFromCart,
        deleteProductFromCart,
        clearCart,
    } = useCart();

    const [localCart, setLocalCart] = useState(cart.map(p => ({ ...p, visible: true })));

    useEffect(() => {
        setLocalCart(cart.map(p => ({ ...p, visible: true })));
    }, [cart]);

    const handleDelete = (id: number) => {
        setLocalCart(prev =>
            prev.map(p =>
                p.id === id ? { ...p, visible: false } : p
            )
        );

        setTimeout(() => {
            deleteProductFromCart(id);
        }, 300);
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );

    if (cart.length === 0) {
        return <h2 style={{ padding: '1rem' }}>Your cart is empty.</h2>;
    }

    return (
        <div style={{ padding: '1rem', minHeight: 'calc(100vh - 200px)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Shopping Cart</h2>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '2rem',
                fontSize: '0.95rem'
            }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0', textAlign: 'left' }}>
                        <th style={{ padding: '0.75rem 0' }}>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {localCart.map(product => (
                        <tr
                            key={product.id}
                            style={{
                                borderBottom: '1px solid #f0f0f0',
                                opacity: product.visible ? 1 : 0,
                                transform: product.visible ? 'translateX(0)' : 'translateX(-50px)',
                                transition: 'opacity 0.3s ease, transform 0.3s ease'
                            }}
                        >
                            <td style={{ padding: '0.75rem 0' }}>{product.title}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    style={buttonStyle}
                                >−</button>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={buttonStyle}
                                >+</button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    style={deleteButtonStyle}
                                    aria-label="Delete"
                                >
                                    <img
                                        src="/trash-bin.svg"
                                        alt="Delete"
                                        style={{ width: '24px', height: '24px', display: 'block' }}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 style={{ marginBottom: '1rem' }}>Total: ${total.toFixed(2)}</h3>
            <button
                onClick={clearCart}
                style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    backgroundColor: '#333',
                    color: '#fff',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Clear Cart
            </button>
        </div>
    );
}

const buttonStyle = {
    marginRight: '0.5rem',
    padding: '0.25rem 0.5rem',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem'
};

const deleteButtonStyle = {
    ...buttonStyle,
    padding: '0.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    marginRight: 0,
    verticalAlign: 'middle'
};

export default Cart;
