const Restaurant = require('./restaurants.model');
const Review = require('./reviews.models');
const Order = require('./orders.model');
const Meal = require('./meals.models');
const User = require('./users.models');

const associationModel = () => {
  // 1. Restaurant <----> N Reviews
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  // 1. Restaurant <----> N meals
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  // 1. User <----> N Reviews
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1. User <----> N Orders
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1. Meal <----> 1. Order
  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = associationModel;
