const express = require('express');

// Controllers
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/review.controller');

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');
const reviewMiddleware = require('../middlewares/review.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');

const router = express.Router();

router.get(
  '/',
  // restaurantMiddleware.validIfRestaurantExist,
  restaurantController.findAll
);

router.get(
  '/:id',
  restaurantMiddleware.validIfRestaurantExist,
  restaurantController.findOne
);

router.use(authMiddleware.protect);

router.post(
  '/reviews/:id',
  validationMiddleware.createUpdateRestaurantReview,
  restaurantMiddleware.validIfRestaurantExist,
  reviewController.create
);
router.patch(
  '/reviews/:restaurantId/:id',
  validationMiddleware.createUpdateRestaurantReview,
  restaurantMiddleware.validRestaurantForReview,
  reviewMiddleware.validIfReviewExist,
  reviewController.update
);
router.delete(
  '/reviews/:restaurantId/:id',
  restaurantMiddleware.validRestaurantForReview,
  reviewMiddleware.validIfReviewExist,
  reviewController.delete
);

router
  .use(authMiddleware.restrictTo('admin'))
  .post('/', validationMiddleware.createRestaurant, restaurantController.create)
  .patch(
    '/:id',
    validationMiddleware.updateRestaurant,
    restaurantMiddleware.validIfRestaurantExist,
    restaurantController.update
  )
  .delete(
    '/:id',
    restaurantMiddleware.validIfRestaurantExist,
    restaurantController.delete
  );

module.exports = router;
