const express = require('express');

// Middlewares
const validations = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

// Controllers
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', validations.createUser, authController.signup);
router.post('/login', validations.loginUser, authController.login);

module.exports = router;
