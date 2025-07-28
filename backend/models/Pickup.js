const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  scheduledDate: Date,
  pickupAgent: String,
  pickupStatus: { type: String, enum: ['Scheduled', 'Completed', 'Missed'], default: 'Scheduled' }
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
