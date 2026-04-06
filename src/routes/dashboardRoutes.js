const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controller/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get(
  '/summary',
  authMiddleware,
  roleMiddleware('viewer', 'analyst', 'admin'),
  getDashboardSummary
);

module.exports = router;