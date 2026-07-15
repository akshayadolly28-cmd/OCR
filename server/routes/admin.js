const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const auth = require('../middleware/auth');
const { permit } = require('../middleware/roles');

router.post('/agents', auth, permit('ADMIN'), adminCtrl.createAgent);
router.put('/agents/:id', auth, permit('ADMIN'), adminCtrl.updateAgent);
router.delete('/agents/:id', auth, permit('ADMIN'), adminCtrl.deleteAgent);
router.get('/analytics', auth, permit('ADMIN'), adminCtrl.analytics);

module.exports = router;
