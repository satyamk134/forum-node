const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller');

router.route('/test').get(controller.merchant.test);
router.route('/').get(controller.merchant.getMerchantList);
router.route('/upload').get(controller.merchant.uploadMyFile);


router.route('/services/:shopId').get(controller.merchant.fetchSerivcesOffered);
router.route('/service/:id').get(controller.merchant.getService);
router.route('/service/details/:serviceId').get(controller.merchant.serviceDetails);









module.exports = router;                     