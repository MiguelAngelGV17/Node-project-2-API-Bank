const express = require('express');

// Controllers
const mealController = require('../controllers/meal.controller');

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const mealMiddleware = require('../middlewares/meal.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.get('/', mealController.findAll);
router.get('/:id', mealMiddleware.validIfMealExist, mealController.findOne);

router.use('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'));
router
  .route('/:id')
  .post(
    restaurantMiddleware.validIfRestaurantExist,
    validationMiddleware.createMeal,
    mealController.create
  )
  .patch(
    validationMiddleware.updateMeal,
    mealMiddleware.validIfMealExist,
    mealController.update
  )
  .delete(mealMiddleware.validIfMealExist, mealController.delete);

module.exports = router;
