const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controller/userController');

router.post('/', authMiddleware, roleMiddleware('admin'), createUser);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateUser);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);

module.exports = router;