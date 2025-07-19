const jwt = require('../utils/jwt');
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');

async function authOptional(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = undefined;
    return next();
  }
  try {
    const token = authHeader.split(' ')[1];
    const blacklisted = await TokenBlacklist.findOne({ token });
    if (blacklisted) {
      req.user = undefined;
      return next();
    }
    const decoded = jwt.verify(token);
    req.user = await User.findById(decoded.id).select('-password');
    return next();
  } catch (err) {
    req.user = undefined;
    return next();
  }
}

module.exports = authOptional;
