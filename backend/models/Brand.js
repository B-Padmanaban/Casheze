const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  logoUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
