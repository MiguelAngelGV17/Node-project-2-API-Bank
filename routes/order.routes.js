const express = require('express');

// Controllers
const orderController = require('../controllers/order.controller');

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const orderMiddleware = require('../middlewares/order.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.post(
  '/',
  validationMiddleware.createOrder,
  orderMiddleware.validIfExistMealForOrder,
  orderController.create
);

router.get('/me', orderController.findMe);

router
  .use('/:id', orderMiddleware.validIfOrderExist)
  .route('/:id')
  .patch(orderController.update)
  .delete(orderController.delete);

module.exports = router;
