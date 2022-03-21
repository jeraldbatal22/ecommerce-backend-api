const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User is required.'],
    ref: 'User'
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'OrderTransaction is required.'],
    ref: 'OrderTransaction',
  },
  payment: {
    type: String,
    required: [true, 'Payment method is required.'],
  },
  account_name: {
    type: String
  },
  account_number: {
    type: Number
  },
  payment_id: {
    type: String
  },
  reference_number: {
    type: String,
    default: null
  },
  receiptPath: {
    type: String
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  status: {
    type: String
  },
  success_at: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);