const Meal = require('../models/meals.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfMealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal with id: ${id} not found`));
  }

  req.meal = meal;
  next();
});
