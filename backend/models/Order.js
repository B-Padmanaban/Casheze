const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickup: { type: mongoose.Schema.Types.ObjectId, ref: 'Pickup', required: true },
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  paymentMethod: { type: String, enum: ['UPI', 'Bank Transfer', 'Cash'], required: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
