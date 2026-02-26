import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const validateField = (name, value) => {
    setFormErrors((prev) => {
      const errors = { ...prev };
      if (name === 'email') {
        if (!value.trim()) {
          errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Invalid email format.';
        } else {
          delete errors.email;
        }
      } else if (name === 'password') {
        if (!value) {
          errors.password = 'Password is required.';
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters.';
        } else {
          delete errors.password;
        }
      }
      return errors;
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length) {
      return;
    }

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            className={formErrors.email ? 'input-error' : ''}
            required
          />
          {formErrors.email && <span className="field-error">{formErrors.email}</span>}
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField('password', e.target.value);
            }}
            className={formErrors.password ? 'input-error' : ''}
            required
          />
          {formErrors.password && <span className="field-error">{formErrors.password}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Connect'}
        </button>
      </form>
    </div>
  );
}
