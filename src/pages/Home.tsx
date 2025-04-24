import { useEffect, useState } from 'react';
import { Product } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products
    .filter(p =>
      (filter === 'all' || p.category === filter) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        backgroundColor: '#f9f9f9',
        padding: '1rem',
        borderRadius: '8px'
      }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: '180px',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <label style={{ fontWeight: 500 }}>Category:</label>
          <select
            onChange={e => setFilter(e.target.value)}
            value={filter}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minWidth: '120px'
            }}
          >
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label style={{ fontWeight: 500 }}>Sort:</label>
          <select
            onChange={e => setSort(e.target.value as 'asc' | 'desc')}
            value={sort}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              minWidth: '120px'
            }}
          >
            <option value="asc">Price: Low → High</option>
            <option value="desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        alignItems: 'stretch'
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
