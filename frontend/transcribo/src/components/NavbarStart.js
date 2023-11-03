import React from "react";
import "../navbar.css";

// import { Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Signup from './SignUp';
import Login from './Login';

function NavbarStart() {
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

          <div className="collapse navbar-collapse nav-items" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservation-form">
                  Bookrooms
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/mybooking">
                  MyBooking
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link btn btn-primary mx-2" to="/signup">
                  Signup
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link btn btn-primary mx-2" to="/Login">
                  Login
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarStart;
