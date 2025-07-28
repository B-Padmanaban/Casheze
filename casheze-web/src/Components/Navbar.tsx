import React from 'react';
import logo from '../assets/logo.png';
import '../style/Navbar.css';

const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-Color shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img 
            src={logo} 
            alt="Casheze Logo" 
            style={{ height: '40px' }} 
            className="d-inline-block align-text-top"
          />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-2">
            <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/QuoteForm">Add Quote</a></li>
            <li className="nav-item"><a className="nav-link" href="/PickUpForm">Add PickUp</a></li>
            <li className="nav-item"><a className="nav-link" href="/MyQuote">My Quote</a></li>
            <li className="nav-item"><a className="nav-link" href="/MyOrder">My Order</a></li>
            <li className="nav-item"><a className="nav-link" href="/MyPickUps">My Pickups</a></li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <a className="btn btn-outline-light ms-2" href="/login">
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
