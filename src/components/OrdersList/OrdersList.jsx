import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../store/orderSlice';
import OrderCard from '../OrderCard/OrderCard';
import { useEffect } from 'react';
import './OrdersList.scss';

export default function OrderList() {
  const { allOrders, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="orders-list">
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        allOrders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
}
