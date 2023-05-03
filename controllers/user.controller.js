const Order = require('../models/orders.model');
const User = require('../models/users.models');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Order,
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

exports.update = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;
  const oldInfo = user;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User information has been updated',
    oldInfo: { name: oldInfo.name, email: oldInfo.email },
    newInfo: { name: user.name, email: user.email },
  });
});

exports.delete = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
