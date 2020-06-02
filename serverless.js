const serverless = require('serverless-http');
const app = require('./app');

process.env.SERVERLESS_RUNTIME = '1'; // pretending to be an env var, eh
process.env.DEBUG_COLORS = '0';

module.exports.handler = serverless(app, {
  request: (req, event) => {
    /*
    * serverless-http isn't capturing the cookies from the v2.0 API Gateway message,
    * so pull them from the API Gateway event and put them into the request Express
    * is using.
    *
    * See <https://github.com/dougmoscrop/serverless-http/issues/159> -- this may get
    * fixed upstream!
    */
    if (event.cookies !== undefined && event.cookies.length > 0) {
      req.headers.cookie = event.cookies.join(';');
    }

    return req;
  },
});
