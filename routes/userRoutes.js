const express = require('express');
const multer = require('multer');
const { signinUser, signupUser, verifyAccount } = require('../controllers/userController');
const { storageUser } = require('../helpers/imageUpload');
const router = express.Router();

// AUTH
router.post('/signin', signinUser)

// REGISTER
router.post('/signup', multer({
  storage: storageUser
}).single('images'), signupUser)

// USERS
router.get('/:id', (req, res) => {
  res.json({ user: 'GET USER REQUEST' })
})

router.get('/', (req, res) => {
  res.json({ user: 'GET ALL USERS REQUEST' })
})

// VERIFY ACCOUNT

router.get('/activate_account/:id', verifyAccount)


module.exports = router