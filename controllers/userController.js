const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const { sendMailerActivation, sendMailerActivationSuccess } = require('../helpers/mailers');

// REGISTER USER
exports.signupUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body

  // // Hash password
  // const salt = await bcrypt.genSalt(10)
  // const hashedpassword = await bcrypt.hash(password, salt)

  const user = await User.create({ firstname, lastname, email, password, images: `users/${req?.file?.filename ?? "default.png"}` })

  if (user) {
    sendMailerActivation(user)
    res.status(201).json({
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        status: user.status,
        images: user.images
      }
    })
  } else {
    res.status(400)
    throw new Error('Invalid User')
  }
})

// AUTHENTICATE USER
exports.signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // if (!email || !password) {
  //   throw new Error('Please fill up all the textfield')
  // }
  // Checking user if exist
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  // Compare signin password to bcrypt password
  const comparedPassword = await user.comparePassword(password)

  if (user && comparedPassword) {
    if (user.status === 'active' && user.isVerified) {
      res.json({
        status: 'success', data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          status: user.status,
          token: user.createToken()
        }
      })
    } else {
      throw new Error("Your account is not verified yet. Please check your email and verify your account. Thankyou.")
    }
  } else {
    throw new Error('Invalid credentials')
  }
})

exports.verifyAccount = asyncHandler(async (req, res) => {
  const { id = null } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User is not exist')
  }

  if (user.isVerified && user.status === 'active') {
    throw new Error('You have already verified.')
  }

  user.isVerified = true;
  user.status = 'active';
  user.save();

  sendMailerActivationSuccess(user)
  res.json({ message: 'You are now verified.' })
})