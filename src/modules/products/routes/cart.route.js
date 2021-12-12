const express = require('express');

const router = express.Router();
const controller = require('../controllers/index.controller');
console.log("came inside cart route");
router.route('/test').get(controller.cart.test);
router.route('/cart').post(controller.cart.addToCart)
                     .put(controller.cart.removeFromCart);


//it will become count
router.route('/cart/user').get(controller.cart.getUserCart);


//cart details
router.route('/cart/user/details').get(controller.cart.getCartProductDetails);






module.exports = router;
