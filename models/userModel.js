const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validateEmail = require('../helpers/emailValidators');
const generateToken = require('../helpers/generateToken');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required']
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  status: {
    type: String,
    default: 'pending'
  },
  images: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: 'user'
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createToken = function () {
  return generateToken(this._id)
}

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}


module.exports = mongoose.model('User', userSchema)