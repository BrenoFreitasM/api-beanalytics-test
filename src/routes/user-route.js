const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.put('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;