const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
}

module.exports = generateToken;
