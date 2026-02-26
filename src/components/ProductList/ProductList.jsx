import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { useEffect, useState } from 'react';
import filterAndSortProducts from '../../utils/filterHelpers';
import Filters from '../ProductFilters/ProductFilters';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';
import withLoading from '../../utils/hocs/loadingHoc';

function ProductsGrid({ items, onEdit }) {
  return (
    <div className="product-list">
      {items.map((item) => (
        <ProductCard key={item.id} product={item} onEdit={onEdit} />
      ))}
    </div>
  );
}

const ProductsGridWithLoading = withLoading(ProductsGrid);

export default function ProductList({ onEdit }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;
  const { items, filters, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length == 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    setPage(0);
  }, [filters]);

  const allFilteredItems = filterAndSortProducts(items, filters);
  const totalFilteredCount = allFilteredItems.filter((item) => !item.isDeleted).length;
  const totalPages = Math.ceil(totalFilteredCount / itemsPerPage) || 1;
  const startIndex = page * itemsPerPage;
  const displayedItems = allFilteredItems
    .filter((item) => !item.isDeleted)
    .slice(startIndex, startIndex + itemsPerPage);

  if (displayedItems.length === 0 && !loading) {
    return <p>There are no products matching selected filters</p>;
  }

  return (
    <div className="product-list-container">
      <Filters />
      <ProductsGridWithLoading
        isLoading={loading}
        loadingMessage="Loading products catalogue..."
        items={displayedItems}
        onEdit={onEdit}
      />
      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Înapoi
          </button>

          <span>
            Pagina {page + 1} din {totalPages}
          </span>

          <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
            Înainte
          </button>
        </div>
      )}
    </div>
  );
}
