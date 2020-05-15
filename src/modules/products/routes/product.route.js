const express = require('express')
const app = express();
const router = express.Router();
const productController = require('../controllers/product.controller');
router.route('/').get(productController.fetchProducts);

module.exports = router