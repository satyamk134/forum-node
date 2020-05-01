const express = require('express')
const app = express();
const router = express.Router();
let chatController = require('../controllers/chat-bot.controller');

console.log("came to router")
router.get('/world', chatController.getHelloWorld);

module.exports = router
