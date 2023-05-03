const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfRestaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found`));
  }

  req.restaurant = restaurant;
  next();
});

exports.validRestaurantForReview = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: 'active',
    },
  });

  if (!restaurant) {
    return next(new AppError(`Restaurant with id: ${id} not found`));
  }

  req.restaurant = restaurant;
  next();
});
