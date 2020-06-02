const { PaginatedSet } = require('./helpers/paginated-set');
const { User } = require('../models/user');

// @TODO: Add your own logic!
exports.all = async (page) => {
  const dummyUsers = [new User('nick'), new User('brent'), new User('brett'), new User('casey'), new User('jason')];

  return new PaginatedSet(dummyUsers.length, 10, dummyUsers);
};
