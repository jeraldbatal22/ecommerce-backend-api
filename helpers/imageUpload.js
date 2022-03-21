const multer = require('multer');

exports.storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/users');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

exports.storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('22')
    cb(null, 'images/products');
  },
  filename: (req, file, cb) => {
    console.log('21')
    cb(null, Date.now() + "-" + file.originalname)
  }
})