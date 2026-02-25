import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart } from '../../store/productSlice';
import { placeOrder } from '../../store/orderSlice';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';

export default function Cart() {
  const { cart } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
        dispatch(clearCart());
        alert('Comanda a fost înregistrată cu succes!');
        navigate('/catalogue');
      } else {
        alert('Eroare la plasarea comenzii: ' + result.payload);
      }
    });
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          &#8592; Back
        </button>
        <h1>My Cart</h1>
      </header>

      <div className="cart-items-list">
        {cart.length > 0 ? (
          cart.map((item) => (
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
          ))
        ) : (
          <p className="empty-msg">Your cart is empty. Time for some cake?</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-checkout-footer">
          <div className="total-row">
            <span>Total amount:</span>
            <span className="total-price">{total} RON</span>
          </div>
          <button className="btn-finalize" onClick={handleCheckout} disabled={loading}>
            {loading ? 'Processing...' : 'Finalize Order'}
          </button>
        </div>
      )}
    </div>
  );
}
