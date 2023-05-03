const express = require('express');

// Middlewares
const userMiddleware = require('./../middlewares/user.middleware');
const validationMiddleware = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

// Controllers
const userController = require('./../controllers/user.controller');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router.post('/signup', validationMiddleware.createUser, authController.signup);
router.post('/login', validationMiddleware.loginUser, authController.login);

router.use(authMiddleware.protect);

router.get('/orders', userController.findAll);
router.get(
  '/orders/:id',
  userMiddleware.validIfExistUser,
  userController.findOne
);

router
  .use(
    '/:id',
    userMiddleware.validIfExistUser,
    authMiddleware.protectAccountOwner
  )
  .route('/:id')
  .patch(validationMiddleware.updateUser, userController.update)
  .delete(userController.delete);

module.exports = router;
