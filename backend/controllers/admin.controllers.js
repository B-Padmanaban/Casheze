const User = require('../models/User.js');
const Order = require('../models/Order.js');
const Device = require('../models/Device.js');

exports.getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const orders = await Order.countDocuments();
    const devices = await Device.countDocuments();
    res.json({ users, orders, devices });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};