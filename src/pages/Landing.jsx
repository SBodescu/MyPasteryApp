import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard/ProductCard';
import '../styles/_landing.scss';

const Landing = () => {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.products);
  const featured = items.slice(0, 3);

  return (
    <div className="landing-view">

      <section className="hero-container">
        <div className="hero-badge">New Collection 2026</div>
        <h1>Sweetness in <br/> Every Detail</h1>
        <p>Premium artisan desserts crafted with love and natural ingredients.</p>
        
        <button className="btn-primary-gradient" onClick={() => navigate('/dashboard')}>
          Explore Catalog
        </button>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Top Rated</h2>
          <button onClick={() => navigate('/dashboard')}>See all</button>
        </div>
        
        <div className="featured-list">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;