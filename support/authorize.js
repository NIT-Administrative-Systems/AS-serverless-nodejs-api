const { ApiError } = require('../models/api-error');

module.exports = (permission, user) => {
  if (user.permissions[permission] === true) {
    return true;
  }

  throw new ApiError({
    status: 403,
    code: 'forbidden',
    title: 'Access Denied',
    detail: 'You do not have permission to use this endpoint',
  });
};
