const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const fbCtrl = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/', auth, [body('complaintId').notEmpty(), body('rating').isInt({ min: 1, max: 5 })], validate, fbCtrl.addFeedback);
router.get('/:complaintId', auth, fbCtrl.getFeedbacks);

module.exports = router;
