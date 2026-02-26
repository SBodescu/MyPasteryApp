import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../store/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import withLoading from '../../utils/hocs/loadingHoc';
import './Home.scss';

function MostRatedItemsGrid({ products }) {
  return (
    <div className="featured-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

const MostRatedItemsWithLoading = withLoading(MostRatedItemsGrid);

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const featured = items.filter((item) => !item.isDeleted).slice(0, 3);

  return (
    <div className="landing-view">
      <section className="hero-container">
        <div className="hero-badge">New Collection 2026</div>
        <h1>
          Sweetness in <br /> Every Detail
        </h1>
        <p>Premium artisan desserts crafted with love and natural ingredients.</p>

        <button className="btn-primary-gradient" onClick={() => navigate('/catalogue')}>
          Explore Catalog
        </button>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Top Rated</h2>
          <button onClick={() => navigate('/catalogue')}>See all</button>
        </div>

        <MostRatedItemsWithLoading
          isLoading={loading}
          loadingMessage="Loading the most appreciated products..."
          products={featured}
        />
      </section>
    </div>
  );
}
