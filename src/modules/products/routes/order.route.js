const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller');

router.route('/test').get(controller.order.test);
router.route('/assign').post(controller.order.assignOrderForPickup)
                       .get(controller.order.getAssignedOrder);
router.route('/autoAssign').post(controller.order.autoAssign)
                
                       



//after pickup order needs to be updated, like dry wash 4 clothes, wash - 2kg  
router.route('/').post(controller.order.addOrderDetails)
                 .get(controller.order.fetchOrderDetails);
router.route('/getAll').get(controller.order.getPlacedOrders);

router.route('/slot').post(controller.order.bookPickupSlot);

router.route('/cart').put(controller.order.addItemsInCart)
                     .get(controller.order.getCart);



module.exports = router;                     