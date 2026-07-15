const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    let user;
    if (global.mockDB) {
      user = await global.mockDB.users.findById(decoded.id);
      if (user) {
        const u = { ...user };
        delete u.password;
        req.user = u;
      }
    } else {
      user = await User.findById(decoded.id).select('-password');
      if (user) req.user = user;
    }
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = auth;
