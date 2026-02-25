import OrderList from '../../components/OrdersList/OrdersList';
import './OrdersManager.scss';

export default function OrdersManager() {
  return (
    <div className="orders-manager-layout">
      <h1>Orders Manager</h1>
      <p>Manage all customer orders here.</p>
      <OrderList />
    </div>
  );
}
