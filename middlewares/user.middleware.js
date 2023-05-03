const Order = require('../models/orders.model');
const User = require('../models/users.models');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Order,
      },
    ],
  });

  if (!user) {
    return next(new AppError(`User with id => ${id} not found`, 404));
  }

  req.user = user;
  next();
});
