require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sentry = require('@sentry/node');
const serverlessSecretLoader = require('./middleware/load-ssm-secrets');
const errorHandler = require('./middleware/error-handler');
const routes = require('./routes/web');

const app = express();

const useSentry = (process.env.SENTRY_DSN !== undefined && process.env.SENTRY_DSN !== '');
if (useSentry === true) {
  Sentry.init({ dsn: process.env.SENTRY_DSN });

  // The Sentry request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());
}

app.use(logger(process.env.SERVERLESS_RUNTIME === '1' ? 'tiny' : 'dev'));
app.use(serverlessSecretLoader);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handlers
if (useSentry === true) {
  app.use(Sentry.Handlers.errorHandler());
}

// Render the error properly for JSON:API
app.use(errorHandler);

module.exports = app;
