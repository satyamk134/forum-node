const express = require('express')
const router = express.Router();
let googleApi = require('../oauth/google.auth');
const validator = require('../oauth/validator');



router.get('/google',googleApi.google);

router.post('/login',validator.validateLogin(),googleApi.login);

router.post('/user',  
validator.validateUser(),
googleApi.createUser);

router.get('/token', googleApi.token)
      .post('/token', googleApi.decodeJwtToken) /**login or create user */

router.get('/name',googleApi.name);
router.post('/name',googleApi.name);

router.get('/getUserInfo',googleApi.getUserInfo);

router.post('/authorizeUser', googleApi.authorizeUser) /**login or create user */

// router.get('/decode', googleApi.decodeToken)

module.exports = router;