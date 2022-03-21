const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const OrderTransaction = require('../models/orderTransactionModel')
const Product = require('../models/productModel')

exports.addOrderTransaction = asyncHandler(async (req, res) => {
  const { quantity, product: product_id } = req.body
  const product = await Product.findById(product_id)

  if (!product) {
    throw new Error("Cannot find Product")
  }

  if (product.stocks === 0) {
    throw new Error(`No stocks available`)
  }

  if (quantity > product.stocks) {
    throw new Error(`The available stocks is ${product.stocks}`)
  }

  // await Product.findOneAndUpdate({ _id: product_id }, { stocks: product.stocks > 0 ? product.stocks - quantity : 0 }, { new: true })

  const order_transaction = await OrderTransaction.create({
    user: req.user._id,
    quantity,
    product: product_id,
    amount: product.amount
  })

  res.status(201).json({ data: order_transaction })
})