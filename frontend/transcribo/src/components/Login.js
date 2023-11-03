import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Signup from './SignUp';
import '../css/login.css';

const Login = ({ toggleAuthentication }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send login data to your authentication API
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        setIsAdmin(data.isAdmin);

        if (data.isAdmin) {
          // Redirect to admin page if needed
          // You can use React Router or window.location for redirection
        } else {
          // Set isAuthenticated to true
          toggleAuthentication(true);
          // alert('Login successful');

          // Redirect to the home page
          navigate('/');
        }
      } else {
        alert("invalid user")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container custom-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card custom-card">
            {/* Animated background GIF */}
            <div className="card-background"></div>
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control custom-input ${
                        errors.username ? 'is-invalid' : ''
                      }`}
                      placeholder="Username"
                      name="username"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      type="password"
                      className={`form-control custom-input ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary custom-button mt-3"
                  >
                    <i className="fas fa-sign-in-alt mr-2"></i> Login
                  </button>
                  <p className="mt-3">
                    Don't have an account?{' '}
                    <Link to="/signup">Register here.</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
