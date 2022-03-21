const jwt = require('jsonwebtoken');
const { asyncHandler } = require('./asyncHandlerMiddleware');
const User = require('../models/userModel');

// PROTECTED ROUTES USER ONLY
exports.protect = asyncHandler(async (req, res, next) => {

  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

    // get token from header
    token = req.headers.authorization.split(' ')[1]

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // get user from the token
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user) {
      throw new Error('Not Authorized, no token')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not Authorized, no token')
  }

  next();
})