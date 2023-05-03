const Review = require('../models/reviews.models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfReviewExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;

  const review = await Review.findOne({
    where: {
      id,
      status: 'active',
    },
  });

  if (!review) {
    return next(new AppError(`Review with id: ${id} not found`));
  }

  const UsersReview = await Review.findOne({
    where: {
      userId: sessionUser.id,
    },
  });

  if (!UsersReview) {
    return next(new AppError(`You aren't the owner of this review`));
  }

  req.review = review;
  next();
});
