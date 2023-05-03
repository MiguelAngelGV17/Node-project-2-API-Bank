const Restaurant = require('../models/restaurants.model');
const Review = require('../models/reviews.models');
const catchAsync = require('../utils/catchAsync');

exports.create = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { restaurant, sessionUser } = req;

  const review = await Review.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'The review has been created successfully',
    review,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { review, restaurant } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });

  return res.status(200).json({
    status: 'Success',
    message: 'The review has been updated',
    newReview: review,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'deleted',
  });

  return res.status(200).json({
    status: 'Success',
    message: 'The review has been deleted',
  });
});
