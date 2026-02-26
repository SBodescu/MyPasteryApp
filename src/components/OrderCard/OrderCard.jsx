import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../../store/orderSlice';
import './OrderCard.scss';

export default function OrderCard({ order }) {
  const { user, isAdmin, isWorker } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id, items, status, total_price } = order;

  return (
    <div className="order-card">
      <div className="order-header">
        <h3>Order #{id.slice(0, 8)}</h3>
        <span className={`status-badge ${status}`}>{status}</span>
      </div>

      <div className="order-body">
        <ul className="items-list">
          {items?.map((item, idx) => (
            <li key={idx}>
              <span className="item-name">
                {item.name} x {item.quantity}
              </span>
              <span className="item-price">{item.price * item.quantity} RON</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-footer">
        <div className="total-section">
          <span>Total</span>
          <div className="total-amount">{total_price} RON</div>
        </div>

        {isAdmin && (
          <div className="order-actions">
            <button
              className="reject-btn"
              onClick={() => dispatch(updateOrderStatus({ orderId: id, newStatus: 'rejected' }))}
            >
              Reject
            </button>
            <button
              className="accept-btn"
              onClick={() => dispatch(updateOrderStatus({ orderId: id, newStatus: 'accepted' }))}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
