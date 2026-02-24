import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import logoImg from '../../assets/logo.png';
import './NavBar.scss';

export default function Navbar() {
  const { user, isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Sweet Lab</Link>
      </div>
      <div className="nav-links">
        <button className="catalog-btn">
          <Link to="/catalogue">Catalog</Link>
        </button>

        {user && !isAdmin && (
          <button className="orders-btn">
            <Link to="/cart">My cart</Link>
          </button>
        )}

        {isAdmin && (
          <button className="admin-btn">
            <Link to="/admin">Admin Panel</Link>
          </button>
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
