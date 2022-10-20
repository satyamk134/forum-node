const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validation = require('../validators/validation');
router.route('/address').post(validation.validAddress(),userController.addAddress)
                        .put(userController.editAddress)
                        .get(userController.getAddresses)
                        .delete(validation.validDeleteReq(), userController.deleteAddress)

router.route('/active-wishmaster').get(userController.wishmaster.fetchTotal)
router.route('/wishmaster-status').put(userController.wishmaster.updateStatus)
                        
module.exports = router