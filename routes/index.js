const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protectedRoutesMiddleware');
const useRouter = require('./userRoutes')
const productRouter = require('./productRoutes');
const categoryRouter = require('./categoryRoutes');
const orderTransactionRouter = require('./orderTransationRoutes');
const paymentRouter = require('./paymentRoutes');
const { authorizeOnly } = require('../helpers/authorizeOnly');

router.use('/users', useRouter);
router.use('/products', productRouter);
router.use('/category', protect, authorizeOnly("admin"), categoryRouter);
router.use('/order_transaction', protect, authorizeOnly("user"), orderTransactionRouter);
router.use('/payment', protect, paymentRouter);

module.exports = router