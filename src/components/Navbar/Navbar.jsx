import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import './NavBar.scss';

export default function Navbar() {
  const { user, isAdmin, isWorker } = useSelector((state) => state.auth);
  const isStaff = isAdmin || isWorker;
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          Sweet <span>Lab</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/catalogue" className="login-btn">
          Catalog
        </Link>

        {user && !isStaff && (
          <Link to="/cart" className="login-btn">
            My cart
          </Link>
        )}

        {isAdmin && (
          <Link to="/inventory" className="login-btn">
            Inventory
          </Link>
        )}

        {isStaff && (
          <Link to="/orders" className="login-btn">
            Orders
          </Link>
        )}

        {user ? (
          <button onClick={() => dispatch(logout())} className="login-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
