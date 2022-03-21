const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true
  },
  status: {
    type: String,
    default: 'active'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)