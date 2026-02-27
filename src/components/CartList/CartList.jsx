import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../../store/productSlice';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../../store/orderSlice';
import './CartList.scss';

export default function CartList() {
  const [notification, setNotification] = useState(null);
  const { cart } = useSelector((state) => state.products);
  const { user, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const renderNotification = () => {
    if (!notification) return null;
    return <div className={`cart-notif ${notification.type}`}>{notification.message}</div>;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const orderData = {
      user_id: user.id,
      items: cart,
      total_price: total,
      status: 'pending',
    };

    dispatch(placeOrder(orderData)).then((result) => {
      if (!result.error) {
        setNotification({ type: 'success', message: 'Your order was successfully placed!' });
        setTimeout(() => {
          dispatch(clearCart());
          setNotification(null);
          navigate('/catalogue');
        }, 2000);
      } else {
        setNotification({
          type: 'error',
          message: 'Eroare at checkout ' + result.payload,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    });
  };

  if (cart.length == 0) {
    return <p className="empty-msg">Your cart is empty. Time for some cake?</p>;
  }

  return (
    <div className="cart-list-container">
      {renderNotification()}
      <div className="cart-items-list">
        {cart.map((item) => (
          <div key={item.id} className="cart-item-card">
            <div className="item-img">
              <img src={item.image_url} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Qty: {item.quantity}</p>
              <span className="item-price">{item.price * item.quantity} RON</span>
            </div>
            <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-checkout-footer">
        <div className="total-row">
          <span>Total amount:</span>
          <span className="total-price">{total} RON</span>
        </div>
        <button className="btn-finalize" onClick={handleCheckout} disabled={loading}>
          {loading ? 'Processing...' : 'Finalize Order'}
        </button>
      </div>
    </div>
  );
}
