const Meal = require('../models/meals.models');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, price } = req.body;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id,
  });
  return res.status(201).json({
    status: 'Success',
    message: `The meal has been added to restaurant's menu`,
    meal,
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
  });
  return res.status(200).json({
    status: 'Success',
    results: meals.length,
    meals,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { meal } = req;

  return res.status(200).json({
    status: 'Success',
    meal,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({ name, price });

  return res.status(200).json({
    status: 'Success',
    meal,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'Success',
    meal,
  });
});
