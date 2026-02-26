import { useNavigate } from 'react-router-dom';
import CartList from '../../components/CartList/CartList';
import './Cart.scss';

export default function Cart() {
  const navigate = useNavigate();
  return (
    <div className="cart-container">
      <header className="cart-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          &#8592; Back
        </button>
        <h1>My Cart</h1>
      </header>
      <CartList />
    </div>
  );
}
