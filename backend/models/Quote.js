const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  condition: { type: String, required: true },
  issues: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);
