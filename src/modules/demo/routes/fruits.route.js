const express = require('express')
const app = express();
const router = express.Router();
const fruitController = require('../controllers/fruits.controller');
console.log("came here fruit routes")
router.route('/').get(fruitController.getfruits)
.post(fruitController.insertFruits);

module.exports = router
