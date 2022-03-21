const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const Product = require('../models/productModel')

exports.getProducts = asyncHandler(async (req, res) => {
  const product = await Product.find()
    .populate({ path: 'category', select: ['name', '_id'] })
    .populate({ path: 'user', select: ['_id', 'firstname', 'lastname', 'status', 'isVerified'] });
  res.status(201).json({ data: product });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({ path: 'category', select: ['name', '_id'] })
    .populate({ path: 'user', select: ['_id', 'firstname', 'lastname', 'status', 'isVerified'] });
  res.status(201).json({ data: product });
});

// ADMIN ACCESS

exports.getProductsByAdmin = asyncHandler(async (req, res) => {
  const product = await Product.find({ user: req.user.id })
    .populate({ path: 'category', select: ['name', '_id'] })
    .populate({ path: 'user', select: ['_id', 'firstname', 'lastname', 'status', 'isVerified'] });
  res.status(201).json({ data: product });
});

exports.addProduct = asyncHandler(async (req, res) => {
  const { name, category, user, stocks, amount } = req.body;
  const product = await Product.create({
    name,
    category,
    user,
    stocks,
    amount,
    images: 'images/' + `products/${req?.file?.filename ?? "product_default_image.png"}`
  });

  res.status(201).json({ data: product });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new Error('Product id is not exist')
  }

  product.remove()

  res.json({ message: `Successfully deleted ${product.name}` });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // const { name, category, stocks, amount } = req.body
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })

  if (!product) {
    throw new Error('Product id is not exist')
  }

  res.status(201).json({ message: 'Successfully Updated', data: product });
});