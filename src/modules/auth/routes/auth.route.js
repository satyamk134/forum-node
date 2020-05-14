const express = require('express')
const router = express.Router();
let googleApi = require('../oauth/google.auth');

router.get('/google',googleApi.google);

router.post('/login',googleApi.login);

router.post('/user',googleApi.createUser)

router.get('/token', googleApi.token);

router.get('/name',googleApi.name);

router.get('/getUserInfo',googleApi.getUserInfo);

router.post('/authorizeUser', googleApi.authorizeUser) /**login or create user */

// router.get('/decode', googleApi.decodeToken)

module.exports = router;