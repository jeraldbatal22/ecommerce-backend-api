const express = require('express');
const { addCategory, getCategories, deleteCategory, editCategory, getCategory } = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getCategories)
router.get('/:id', getCategory)
router.delete('/:id', deleteCategory)
router.put('/:id', editCategory)
router.post('/', addCategory)

module.exports = router