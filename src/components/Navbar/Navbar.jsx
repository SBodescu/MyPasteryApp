import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

export default function Navbar(){
    const {user,isAdmin} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    return(
        <nav className="navbar">
            <div className="logo"><Link to="/">Sweet Lab</Link></div>
            <div className="nav-links">
                <Link to="/dashboard">Catalog</Link>
                
                {isAdmin && <Link to="/admin">Admin Panel</Link>}
                
                {user ? (
                <button onClick={() => dispatch(logout())}>Logout</button>
                ) : (
                <Link to="/login" className="login-btn">Login</Link>
                )}
            </div>
        </nav>
    )
}