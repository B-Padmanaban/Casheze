import React from 'react';
import '../style/Footer.css'; 

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-section">
        <h2 className="footer-logo">Casheze</h2>
        <p className="footer-tagline">Your trusted gadget marketplace</p>
      </div>

      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Casheze. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
