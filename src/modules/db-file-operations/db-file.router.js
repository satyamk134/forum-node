const express = require('express')
const app = express();
const router = express.Router();
let chatController = require('./db-file-controller');

console.log("came to router")
router.post('/user', chatController.insertUsers);

router.post('/classTest',chatController.classTest);

router.get('/users',chatController.fetchUsers)

module.exports = router