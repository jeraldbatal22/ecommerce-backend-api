const express = require('express');
const { paymentCheckout, retrieveCheckout } = require('../controllers/paymentController');
const router = express.Router();

router.post('/checkout', paymentCheckout)
router.post('/retrieve_checkout', retrieveCheckout)

module.exports = router