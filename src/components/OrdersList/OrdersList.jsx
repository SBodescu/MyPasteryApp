import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../store/orderSlice';
import { useEffect, useState } from 'react';
import OrderCard from '../OrderCard/OrderCard';
import withLoading from '../../utils/hocs/loadingHoc';
import './OrdersList.scss';

function OrdersGrid({ orders }) {
  return (
    <div className="orders-list">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

const OrdersGridWithLoading = withLoading(OrdersGrid);

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
      <OrdersGridWithLoading
        isLoading={loading}
        loadingMessage="Loadin orders..."
        orders={displayedItems}
      />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            Back
          </button>

          <span>
            Page {page + 1} of {totalPages}
          </span>

          <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
