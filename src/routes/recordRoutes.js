const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const {recordSchema} = require('../validators/recordValidator')
const { validateObjectId } = require('../middleware/validateRecord');
const zodMiddleware=require('../middleware/zodMiddleware')
const {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require('../controller/recordController');

router.post('/', authMiddleware, roleMiddleware('admin'), zodMiddleware(recordSchema), createRecord);
router.get('/', authMiddleware, roleMiddleware('viewer', 'analyst', 'admin'), getAllRecords);
router.get('/:id', authMiddleware, roleMiddleware('viewer', 'analyst', 'admin'), validateObjectId, getRecordById);
router.put('/:id', authMiddleware, roleMiddleware('admin'), validateObjectId,zodMiddleware(recordSchema),  updateRecord);
router.delete('/:id', authMiddleware, roleMiddleware('admin'),validateObjectId, zodMiddleware(recordSchema),  deleteRecord);

module.exports = router;