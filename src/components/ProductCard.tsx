import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        height: '100%',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'contain',
          marginBottom: '1rem'
        }}
      />
      <h4
        style={{
          fontSize: '1rem',
          margin: '0.5rem 0',
          color: '#222',
          textAlign: 'left'
        }}
      >
        {product.title}
      </h4>
      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.25rem' }}>
        {product.category}
      </p>
      <p style={{ fontWeight: 600, color: '#000', marginBottom: '1rem' }}>
        ${product.price.toFixed(2)}
      </p>
      <button
        onClick={() => addToCart(product)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          marginTop: 'auto'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
