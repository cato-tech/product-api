const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pid: {
    type: String,
    required: true,
    unique: false
  },
  pname: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);