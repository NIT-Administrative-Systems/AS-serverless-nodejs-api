const { ApiError } = require('../models/api-error');
const { ErrorPresenter } = require('../api-resources/error');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = req.app.get('env') === 'development' ? err.message : 'There was an internal server error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err);

  const statusCode = err.status || 500;
  const serverError = new ApiError({
    status: statusCode,
    code: err.code || 'internal-server-error',
    title: err.title || 'Internal Server Error',
    detail: res.locals.message || err.detail,
  });

  // render the error page
  res.status(statusCode).json(new ErrorPresenter([serverError]));
};
