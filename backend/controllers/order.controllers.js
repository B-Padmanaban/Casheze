const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { quoteId,pickupId, paymentMethod } = req.body;

    const order = new Order({
      user: req.user._id,
      pickup: pickupId,
      quote: quoteId,
      paymentMethod,
      status: 'Pending'
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('quote')
      .populate('pickup');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};