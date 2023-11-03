import React from "react";
import "../navbar.css";

// import { Router } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import Signup from './SignUp';
import Login from './Login';
// import ContactUs from './../screens/Contact';

function Navbar({ isAuthenticated, toggleAuthentication }) {

  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        {/* Added 'navbar-custom' class for custom styling */}
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            TranScribo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse nav-items bg-white" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link navpage" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link navpage" to="/reservation-form">
                    Book Rooms
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navpage" to="/mybooking">
                    My Booking
                  </Link>
                </li>
              </>
              )}
             
              <li className="nav-item">
                <Link className="nav-link navpage" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navpage" to="/contact">
                  ContactUs
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
            {isAuthenticated ? (
              // If authenticated, show Logout button
              <li className="nav-item">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    toggleAuthentication(false); // Set isAuthenticated to false
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              // If not authenticated, show Sign Up and Login buttons
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary py-1" to="/login">
                    Login
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link btn btn-primary py-1" to="/login">
                    Login
                  </Link>
                </li> */}
              </>
            )}
          </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
