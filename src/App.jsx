import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import Admin from './pages/Admin';


export default function App() {
  const { user, isAdmin } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={isAdmin ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}