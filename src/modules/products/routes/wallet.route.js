const express = require('express');
const router = express.Router();
const controller = require('../controllers/index.controller');

router.route('/test').get(controller.wallet.test);
router.route('/addToWallet').post(controller.wallet.addOrDecuctFromWallet);
router.route('/wallet').get(controller.wallet.getWalletDetails);
router.route('/withdraw').put(controller.wallet.addOrDecuctFromWallet);






module.exports = router;                     