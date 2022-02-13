const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller');

router.route('/test').get(controller.merchant.test);
router.route('/').get(controller.merchant.getMerchantList);

router.route('/services').get(controller.merchant.fetchSerivcesOffered);
router.route('/upload').get(controller.merchant.uploadMyFile);

router.route('/service').get(controller.merchant.getServiceDetails);





module.exports = router;                     