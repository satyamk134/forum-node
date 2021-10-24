const express = require('express')
const app = express();
const router = express.Router();
const productController = require('../controllers/product.controller');
const tutorialController = require('../controllers/Tutorial.controller');

router.route('/').get(productController.fetchProducts);

router.route('/cart').post(productController.addToCart)
                    .put(productController.removeFromCart)


//it will become count
router.route('/cart/user').get(productController.getUserCart);


//cart details
router.route('/cart/user/details').get(productController.getCartProductDetails);

//tutorials
router.route('/tutorial').post(tutorialController.saveTutorial);
router.route('/saveProducts').post(tutorialController.saveToProducts);





module.exports = router