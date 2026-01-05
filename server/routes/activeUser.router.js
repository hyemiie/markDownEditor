// routes/activeUser.routes.js
const express = require('express');
const router = express.Router();
const activeUserController = require('../controller/activeUser.controller');

router.get('/content/:contentId', activeUserController.getActiveUsers);

module.exports = router;