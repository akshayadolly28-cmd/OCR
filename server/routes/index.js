const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const complaintRoutes = require('./complaints');
const feedbackRoutes = require('./feedback');
const chatRoutes = require('./chat');
const adminRoutes = require('./admin');

router.use('/auth', authRoutes);
router.use('/complaints', complaintRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/chat', chatRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
