const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id is required.'],
    ref: 'User'
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Category id is required.'],
    ref: 'Category'
  },
  stocks: {
    type: Number,
    required: [true, 'Stocks is required.'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required.'],
  },
  images: {
    type: Object,
    // data: Buffer,
    // contentType: String
  },
  status: {
    type: String,
    default: 'active'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema)