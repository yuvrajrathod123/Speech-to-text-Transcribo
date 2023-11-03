import React, { useState } from 'react';
import zxcvbn from 'zxcvbn';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// import Signup from './SignUp';
import Login from './Login';


const Signup = () => {

  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });

        if (e.target.name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(e.target.value)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email format',
                });
            } else {
                setErrors({
                    ...errors,
                    email: '',
                });
            }
        } else if (e.target.name === 'password') {
            const passwordStrength = zxcvbn(e.target.value);
            if (e.target.value.length < 6) {
                setErrors({
                    ...errors,
                    password: 'Password must be at least 6 characters long',
                });
            } else if (!/[A-Z]/.test(e.target.value)) {
                setErrors({
                    ...errors,
                    password: 'Password must contain at least one uppercase letter',
                });
            } else if (passwordStrength.score < 2) {
                setErrors({
                    ...errors,
                    password: 'Password is weak. Try a stronger password.',
                });
            } else {
                setErrors({
                    ...errors,
                    password: '',
                });
            }
        } else if (e.target.name === 'confirmPassword') {
            if (e.target.value !== formData.password) {
                setErrors({
                    ...errors,
                    confirmPassword: 'Passwords do not match',
                });
            } else {
                setErrors({
                    ...errors,
                    confirmPassword: '',
                });
            }
        } else if (e.target.name === 'username') {
            if (e.target.value.trim() === '') {
                setErrors({
                    ...errors,
                    username: 'Username cannot be empty',
                });
            } else {
                setErrors({
                    ...errors,
                    username: '',
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if there are any validation errors
        if (
            errors.email ||
            errors.password ||
            errors.confirmPassword ||
            errors.username
        ) {
            // Handle validation errors
            return;
        }

        // Send signup data to your authentication API
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.status === 201) {
                // Registration successful
                // You can redirect the user to the login page or display a success message
                alert("successful")
                navigate("/login");
            } else {
                alert("user already exit")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card custom-card mt-4">
                <div className="card-background"></div>
                <div className="card-body">
                  <h2 className="card-title text-center">Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Username"
                        className={`form-control custom-input ${
                          errors.username ? 'is-invalid' : ''
                        }`}
                        name="username"
                        onChange={handleChange}
                        required
                      />
                      {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Email"
                        className={`form-control custom-input ${
                          errors.email ? 'is-invalid' : ''
                        }`}
                        name="email"
                        onChange={handleChange}
                        required
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Password"
                        className={`form-control custom-input ${
                          errors.password ? 'is-invalid' : ''
                        }`}
                        name="password"
                        onChange={handleChange}
                        required
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className={`form-control custom-input ${
                          errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                        name="confirmPassword"
                        onChange={handleChange}
                        required
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary custom-button mt-3"
                      >
                        <i className="fas fa-user-plus mr-2"></i> Sign Up
                      </button>
                      <p className="mt-3">
                        Already have an account?  <Link to="/Login">
                  Login here
                </Link>
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

export default Signup;
