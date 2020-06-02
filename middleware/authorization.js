const { ApiError } = require('../models/api-error');
const { ErrorPresenter } = require('../api-resources/error');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  const unauthorizedError = new ApiError({
    status: 403,
    code: 'forbidden',
    title: 'Access Denied',
    detail: 'You do not have permission to use this API',
  });

  if (req.netid == null) {
    return res.status(403).json(new ErrorPresenter([unauthorizedError]));
  }

  let user;
  try {
    // @TODO: Enter your own authorization logic here!
    user = new User(req.netid);
  } catch (error) {
    user = null;

    return next(error);
  }

  if (user == null) {
    return res.status(403).json(new ErrorPresenter([unauthorizedError]));
  }

  req.user = user;
  return next();
};
