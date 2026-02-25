import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { useEffect } from 'react';
import filterAndSortProducts from '../../utils/filterHelpers';
import Filters from '../Filters/Filters';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

export default function ProductList({ onEdit }) {
  const { items, filters, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayedItems = filterAndSortProducts(items, filters);
  return (
    <div className="product-list-container">
      <Filters />
      <div className="product-list">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          displayedItems
            .filter((item) => !item.isDeleted)
            .map((item) => <ProductCard key={item.id} product={item} onEdit={onEdit} />)
        )}
      </div>
    </div>
  );
}
