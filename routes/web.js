const express = require('express');
const { version } = require('../package.json');
const authenticate = require('../middleware/authentication');
const authorize = require('../middleware/authorization');

const HealthController = require('../controllers/health');
const UserController = require('../controllers/user');

const router = express.Router();

// Can pop this open w/ the spread operator -- routes
// will take an unlimited # of functions as args
const authMiddlewareGroup = [authenticate, authorize];

// Meta stuff (home, health, etc)
// ------------------------------
router.get('/', (req, res, next) => {
  res.json({
    name: 'Example NodeJS API',
    version,
  });
});

router.get('/health', HealthController.index);

// Example
// ------------------------------
router.get('/user', ...authMiddlewareGroup, UserController.index);

module.exports = router;
