const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  category: String,
  brand: String,
  model: String,
  image: String,
  conditionPricing: {
    Excellent: Number,
    Good: Number,
    Fair: Number,
    Poor: Number
  },
  forSale: { type: Boolean, default: true },
  availableForBuy: { type: Boolean, default: false },
  listedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: {type: Number,required: true,
}

}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);
