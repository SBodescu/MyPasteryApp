import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Catalogue from './pages/Catalogue/Catalogue';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

export default function App() {
  const { user, isAdmin } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/cart" element={user && !isAdmin ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}
