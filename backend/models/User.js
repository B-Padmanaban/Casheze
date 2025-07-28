const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String, // hashed
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  address: {
    street: String,
    city: String,
    pincode: String,
    state: String
  },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);