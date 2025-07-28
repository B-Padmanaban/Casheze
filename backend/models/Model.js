const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  image: String,
  basePrice: Number
}, { timestamps: true });

module.exports = mongoose.model('Model', modelSchema);
