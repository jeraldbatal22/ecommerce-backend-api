const { asyncHandler } = require("../middleware/asyncHandlerMiddleware");
const OrderTransaction = require("../models/orderTransactionModel");
const Product = require("../models/productModel");
const paymentModel = require("../models/paymentModel");
const axios = require("axios").default;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Basic' + ' ' + Buffer.from(`${process.env.PAYMAYA_PUBLIC_KEY}`, 'utf8').toString("base64")
}

exports.paymentCheckout = asyncHandler(async (req, res) => {
  const { transaction } = req.body
  const orderTransaction = await OrderTransaction.findById(transaction)
  const product = await Product.findById(orderTransaction.product)
  const options = {
    method: 'POST',
    url: process.env.PAYMENT_CHECKOUT_URL_V1,
    headers,
    data: {
      totalAmount: {
        currency: 'PHP',
        value: orderTransaction.amount * orderTransaction.quantity,
        // details: {
        //   discount: '100.00',
        //   serviceCharge: '0.00',
        //   shippingFee: '200.00',
        //   tax: '120.00',
        //   subtotal: '780.00'
        // }
      },
      buyer: {
        firstName: req.user.firstname,
        lastName: req.user.lastname
      },
      items: [
        {
          amount: { details: {}, value: orderTransaction.amount },
          totalAmount: { details: {}, value: orderTransaction.amount * orderTransaction.quantity },
          name: product.name,
          quantity: orderTransaction.quantity
        }
      ],
      redirectUrl: {
        success: `http://google.com`,
        failure: 'https://youtube.com',
        cancel: 'https://www.merchantsite.com/cancel?id=5fc10b93-bdbd-4f31-b31d-4575a3785009'
      },
      requestReferenceNumber: orderTransaction._id
    }
  };

  const result = await axios.request(options)

  if (result) {
    console.log(result)
    res.json({ data: result.data, test: JSON.parse(result.config.data) })
  }

})

exports.retrieveCheckout = asyncHandler(async (req, res) => {
  const options = {
    method: 'GET',
    url: `${process.env.PAYMENT_CHECKOUT_URL_V1}/${req.body.checkout_id}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic' + ' ' + Buffer.from(`${process.env.PAYMAYA_SECRET_KEY}`, 'utf8').toString("base64")
    }
  };

  const result = await axios.request(options)
  const payment = await paymentModel.findOne({ transaction: result.data.requestReferenceNumber })

  if (result) {
    if (payment) {
      res.status(400)
      throw new Error('Transaction is already made.')
    }
    console.log(result.data)

    if (result.data.status === "COMPLETED") {
      const data = await paymentModel.create({
        user: req.user._id,
        transaction: result.data.requestReferenceNumber,
        payment: "paymaya",
        account_name: result.data.buyer.firstName + " " + result.data.buyer.lastName,
        reference_number: result.data?.paymentDetails?.responses?.efs?.paymentTransactionReferenceNo,
        payment_id: result.data.id,
        amount: result.data.items[0].totalAmount.value,
        status: result.data.status,
        success_at: result.data.paymentDetails.paymentAt
      })
      await OrderTransaction.findOneAndUpdate({ _id: result.data.requestReferenceNumber }, { status: 'COMPLETED' }, { new: true })
      return res.json({ data, test: result.data })
    }
    if (result.data.status === "CREATED") {
      return res.json({ message: 'Pending checkout', checkout_url: `${process.env.PAYMENT_CHECKOUT_URL_V1}?id=${result.data.id}` })
    } else {
      throw new Error('Error checkout')
    }
  } else {
    throw new Error('Error')
  }
})