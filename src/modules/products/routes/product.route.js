const express = require('express')
const app = express();
const router = express.Router();
const productController = require('../controllers/product.controller');
router.route('/').get(productController.fetchProducts);

router.route('/cart').post(productController.addToCart);

//it will become count
router.route('/cart/user').get(productController.getUserCart);


//cart details
router.route('/cart/user/details').get(productController.getCartProductDetails);




module.exports = router