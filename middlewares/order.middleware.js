const Meal = require('../models/meals.models');
const Order = require('../models/orders.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfOrderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const ordersUserOwner = await Order.findOne({
    where: {
      userId: sessionUser.id,
    },
  });

  if (!ordersUserOwner) {
    return next(
      new AppError(
        `User with id: ${sessionUser.id} is not the owner of current order`
      )
    );
  }
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!order) {
    return next(new AppError(`Order with id: ${sessionUser.id} not found`));
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
    return next(new AppError(`Meal with id: ${mealId} not found`));
  }

  req.meal = meal;
  next();
});
