const express = require('express')
const app = express();
const router = express.Router();
let dbFileController = require('./db-file-controller');

console.log("came to router")
router.post('/user', dbFileController.insertUsers);

router.post('/classTest',dbFileController.classTest);

router.get('/users',dbFileController.fetchUsers);

router.post('/addProducts',dbFileController.addProducts)

router.post('/slugcsv', dbFileController.slugcsv);

router.post('/csvToPremiumJson', dbFileController.csvToPremiumJson);

router.post('/sqlmigration', dbFileController.sqlmigration)

module.exports = router