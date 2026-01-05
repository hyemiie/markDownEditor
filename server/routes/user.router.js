const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/login', userController.Login);
router.post('/register', userController.Register);
router.get('/current-user', userController.getCurrentUser);

module.exports = router;