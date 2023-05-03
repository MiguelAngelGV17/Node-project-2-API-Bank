const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.models');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'The restaurant has been created successfully',
    restaurant,
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: restaurant.length,
    restaurant,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  return res.status(200).json({
    status: 'Success',
    restaurant,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  return res.status(200).json({
    status: 'success',
    message: 'Restaurant information has been updated',
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: `The Restaurant with id: ${restaurant.id} has been deleted`,
  });
});
