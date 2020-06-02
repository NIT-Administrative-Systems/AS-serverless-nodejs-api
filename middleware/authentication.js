const { ApiError } = require('../models/api-error');
const { ErrorPresenter } = require('../api-resources/error');

// eslint-disable-next-line import/order
const nusso = process.env.NUSSO_MOCK_IMPL === 'true' ? require('../support/nusso-mock') : require('nusso');

const makeUnauthorized = async (AUTH_MFA, redirectTo, AUTH_ENV, AUTH_API_KEY) => {
  const loginUrl = await nusso.getLoginUrl(AUTH_MFA, redirectTo, AUTH_ENV, AUTH_API_KEY);

  const error = new ApiError({
    status: 401,
    code: 'unauthortized',
    title: 'Unauthorized',
    detail: 'You are not logged in',
    links: {
      login: loginUrl,
    },
  });

  return new ErrorPresenter([error]);
};

module.exports = async (req, res, next) => {
  const { AUTH_API_KEY, AUTH_ENV, AUTH_MFA } = process.env;

  const redirectTo = encodeURIComponent(req.header('Referer')) || '';

  // Express cookie_parser parses cookies to json object stored in req.cookies
  // Check for 'nusso' cookie. If none, send to login
  const ssoCookie = nusso.getSSOCookie(req.cookies);

  if (!ssoCookie) {
    return res.status(401).json(await makeUnauthorized(AUTH_MFA, redirectTo, AUTH_ENV, AUTH_API_KEY));
  }

  // If cookie exists, getSessionInfo
  const sessionInfo = await nusso.getSessionInfo(ssoCookie, AUTH_ENV, AUTH_API_KEY);

  // Use session info to determine whether they are authenticated
  const isLoggedIn = nusso.isLoggedIn(sessionInfo); // helper method which returns presence of netid in sessionInfo

  // If not => redirect to login
  if (!isLoggedIn) {
    return res.status(401).json(await makeUnauthorized(AUTH_MFA, redirectTo, AUTH_ENV, AUTH_API_KEY));
  }

  // If using MFA, verify their session whether has gone through the MFA process
  if (AUTH_MFA) {
    const isDuoAuthenticated = nusso.isDuoAuthenticated(sessionInfo);

    if (!isDuoAuthenticated) {
      return res.status(401).json(await makeUnauthorized(AUTH_MFA, redirectTo, AUTH_ENV, AUTH_API_KEY));
    }
  }

  // Make the netID available to controllers
  req.netid = nusso.getNetID(sessionInfo);

  // pass continuation to next middleware
  return next();
};
