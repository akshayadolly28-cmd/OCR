const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');

const router = express.Router();

const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Register
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validate,
  authController.register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  authController.login
);

// Profile
router.get(
  '/profile',
  authMiddleware,
  authController.profile
);

module.exports = router;