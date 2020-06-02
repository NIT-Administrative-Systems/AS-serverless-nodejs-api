const nusso = require('nusso');

/**
 * Mocked implementation of the nusso bindings,
 * replacing actual API calls w/ not-API calls.
 */
module.exports = {
  getSSOCookie(requestCookies) {
    return requestCookies.nusso;
  },

  // eslint-disable-next-line no-unused-vars
  async getSessionInfo(tokenId, apigeeEnv, apigeeApiKey) {
    // For the sake of testing, the cookie can be {cookie value}:{netid}
    // This lets the test harness specify "who" is logging in, to make testing
    // authorization stuff easier.

    let netid = 'nie7321';
    let ssoCookie = tokenId;

    if (tokenId.includes(':')) {
      [ssoCookie, netid] = tokenId.split(':');
    }

    if (ssoCookie !== process.env.NUSSO_MOCK_VALID_COOKIE) {
      return {
        status: 401,
        data: 'not authorized',
      };
    }

    return {
      status: 200,
      data: {
        username: netid,
        properties: {
          isDuoAuthenticated: 'true',
        },
      },
    };
  },

  isLoggedIn(sessionInfo) {
    return nusso.isLoggedIn(sessionInfo);
  },

  isDuoAuthenticated(sessionInfo) {
    return nusso.isDuoAuthenticated(sessionInfo);
  },

  // eslint-disable-next-line no-unused-vars
  async getLoginUrl(isDuoRequired, redirectUrl, apigeeEnv, apigeeApiKey) {
    return 'http://example.org/nusso-mock-login-url';
  },

  // eslint-disable-next-line no-unused-vars
  async getLogoutUrl(apigeeEnv, apigeeApiKey) {
    return 'http://example.org/nusso-mock-logout-url';
  },

  getNetID(sessionInfo) {
    return sessionInfo.data.username;
  },
};
