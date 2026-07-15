const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const chatCtrl = require('../controllers/chatController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/', auth, [body('complaintId').notEmpty(), body('message').notEmpty()], validate, chatCtrl.addMessage);
router.get('/:complaintId', auth, chatCtrl.getMessages);

module.exports = router;
