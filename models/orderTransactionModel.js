const mongoose = require('mongoose');

const orderTransactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User is required.'],
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product is required.'],
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  status: {
    type: String,
    default: 'pending'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('OrderTransaction', orderTransactionSchema)