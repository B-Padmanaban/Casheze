import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './index.css'; 
import ProtectedRoute from './Components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import QuoteForm from './pages/QuoteForm';
import MyQuotes from './pages/MyQuote';
import PickupForm from './pages/PickUpForm';
import MyPickups from './pages/MyPickUps';
import OrderConfirmation from './pages/OrderConfirmation';
import MyOrders from './pages/MyOrder';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './Components/Footer'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/quote" element={<ProtectedRoute><QuoteForm /></ProtectedRoute>} />
        <Route path="/my-quotes" element={<ProtectedRoute><MyQuotes /></ProtectedRoute>} />
        <Route path="/schedule-pickup" element={<ProtectedRoute><PickupForm /></ProtectedRoute>} />
        <Route path="/my-pickups" element={<ProtectedRoute><MyPickups /></ProtectedRoute>} />
        <Route path="/confirm-order" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/MyOrder" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;
