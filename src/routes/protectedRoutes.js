const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get(
  '/admin-only',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res) => {
    res.json({ message: 'Welcome, admin!' });
  }
);

router.get(
  '/analyst-or-admin',
  authMiddleware,
  roleMiddleware('analyst', 'admin'),
  (req, res) => {
    res.json({ message: 'Welcome, analyst or admin!' });
  }
);

router.get(
  '/all-users',
  authMiddleware,
  roleMiddleware('viewer', 'analyst', 'admin'),
  (req, res) => {
    res.json({ message: 'Welcome, any user role!' });
  }
);

module.exports = router;