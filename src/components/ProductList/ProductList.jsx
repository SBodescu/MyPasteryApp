import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { useEffect, useState } from 'react';
import filterAndSortProducts from '../../utils/filterHelpers';
import Filters from '../ProductFilters/ProductFilters';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

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
  if (displayedItems == 0) {
    return <p>Nu am găsit niciun produs conform filtrelor.</p>;
  }
  return (
    <div className="product-list-container">
      <Filters />
      <div className="product-list">
        {loading && items.length === 0 ? (
          <p>Se încarcă produsele...</p>
        ) : (
          displayedItems.map((item) => <ProductCard key={item.id} product={item} onEdit={onEdit} />)
        )}
      </div>
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
