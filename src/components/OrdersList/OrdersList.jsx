import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../store/orderSlice';
import OrderCard from '../OrderCard/OrderCard';
import { useEffect, useState } from 'react';
import './OrdersList.scss';

export default function OrderList() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const { allOrders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allOrders.length === 0) {
      dispatch(fetchOrders());
    }
  }, [dispatch, allOrders.length]);

  const totalOrdersCount = allOrders.length;
  const totalPages = Math.ceil(totalOrdersCount / itemsPerPage) || 1;
  const startIndex = page * itemsPerPage;

  const displayedItems = allOrders.slice(startIndex, startIndex + itemsPerPage);

  if (displayedItems.length === 0 && !loading) {
    return <p>There is no order right now</p>;
  }

  return (
    <div className="orders-container">
      <div className="orders-list">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          displayedItems.map((order) => <OrderCard key={order.id} order={order} />)
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
