const { asyncHandler } = require('../middleware/asyncHandlerMiddleware')
const Category = require('../models/categoryModel')

exports.addCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body)
  res.status(201).json({ data: category })
})

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find()
  res.status(201).json({ data: categories })
})

exports.getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
  res.status(201).json({ data: category })
})

exports.editCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

  if (!category) {
    throw new Error('Product id is not exist')
  }

  res.status(201).json({ data: category })
})

exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findOneAndDelete({ _id: req.params.id })

  if (!category) {
    throw new Error('Product id is not exist')
  }

  res.status(201).json({ message: `Successfully deleted ${category.name}` })
})