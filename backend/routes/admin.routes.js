const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { getAllOrders } = require('../controllers/admin.controllers');
const Order = require('../models/Order');
const Pickup = require('../models/Pickup');
const Quote = require('../models/Quote');


// ✅ Get all orders
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  const orders = await Order.find().populate('quote').populate('pickup').populate('user');
  res.json(orders);
});

// ✅ Update order status
router.put('/orders/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

// ✅ Get all pickups
router.get('/pickups', authMiddleware, adminMiddleware, async (req, res) => {
  const pickups = await Pickup.find().populate('user').populate('quote');
  res.json(pickups);
});

// ✅ Get all quotes
router.get('/quotes', authMiddleware, adminMiddleware, async (req, res) => {
  const quotes = await Quote.find().populate('user');
  res.json(quotes);
});

module.exports = router;
