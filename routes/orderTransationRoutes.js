const express = require('express');
const { addOrderTransaction } = require('../controllers/orderTransactionController');
const router = express.Router();

router.post('/', addOrderTransaction)

module.exports = router