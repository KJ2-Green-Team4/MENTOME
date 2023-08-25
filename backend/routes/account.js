const express = require('express');

const router = express.Router();

const accountController = require('../controllers/account');

router.post('/api/account/signup', accountController.signUp);

router.post('/api/account/login', accountController.logIn);

router.get('/api/account/getUserInfo', accountController.getUserInfo);

module.exports = router;
