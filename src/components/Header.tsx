import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <header style={{
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      padding: '1rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333',
          fontWeight: 600,
          fontSize: '1.1rem'
        }}>
          Home
        </Link>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/cart" style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: 500
          }}>
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
