const express = require('express');
const multer = require('multer');
const { addProduct, getProducts, deleteProduct, getProductsByAdmin, getProduct, updateProduct } = require('../controllers/productController');
const router = express.Router();
const { storageProduct } = require('../helpers/imageUpload')
const { authorizeOnly } = require('../helpers/authorizeOnly');
const { protect } = require('../middleware/protectedRoutesMiddleware');

router.get('/', getProducts)
router.get('/:id', getProduct)

router.get('/', protect, authorizeOnly("admin"), getProductsByAdmin)
router.delete('/:id', protect, authorizeOnly("admin"), deleteProduct)
router.put('/:id', protect, authorizeOnly("admin"), multer({ storage: storageProduct }).single('images'), updateProduct)
router.post('/', protect, authorizeOnly("admin"), multer({ storage: storageProduct }).single('images'), addProduct)

module.exports = router