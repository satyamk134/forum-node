const express = require('express')
const app = express();
const router = express.Router();
const productController = require('../controllers/product.controller');
router.route('/').get(productController.fetchProducts);

router.route('/cart').post(productController.addToCart)

module.exports = router