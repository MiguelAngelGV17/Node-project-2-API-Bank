const Meal = require('../models/meals.models');
const Order = require('../models/orders.model');
const User = require('../models/users.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfOrderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!order) {
    return next(new AppError(`Order with id: ${id} not found`));
  }

  req.order = order;
  next();
});

exports.validIfExistMealForOrder = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meal.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`));
  }

  req.meal = meal;
  next();
});
