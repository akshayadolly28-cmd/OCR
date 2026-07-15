const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const complaintCtrl = require('../controllers/complaintController');
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const validate = require('../middleware/validate');
const upload = require('../middleware/upload');

router.post(
  '/',
  auth,
  upload.single('attachment'),
  [body('title').notEmpty(), body('description').notEmpty()],
  validate,
  complaintCtrl.createComplaint
);

router.get('/', auth, complaintCtrl.getUserComplaints);
router.get('/:id', auth, complaintCtrl.getComplaint);
router.put('/:id/status', auth, permit('AGENT', 'ADMIN'), complaintCtrl.updateStatus);
router.put('/:id/assign', auth, permit('ADMIN'), complaintCtrl.assignAgent);
router.put('/:id', auth, complaintCtrl.updateComplaint);
router.delete('/:id', auth, permit('ADMIN'), complaintCtrl.deleteComplaint);

module.exports = router;
