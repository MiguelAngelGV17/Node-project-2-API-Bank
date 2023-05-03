const Meal = require('../models/meals.models');
const Order = require('../models/orders.model');
const Restaurant = require('../models/restaurants.model');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { meal, sessionUser } = req;
  const { quantity } = req.body;

  const order = await Order.create({
    quantity,
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice: meal.price * quantity,
  });

  return res.status(201).json({
    status: 'Success',
    message: `The order has been registered`,
    order,
  });
});

exports.findMe = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      userId: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Meal,
        include: [
          {
            model: Restaurant,
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    order,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'Success',
    order,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'Success',
    order,
  });
});
