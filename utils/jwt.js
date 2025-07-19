const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
function sign(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
}
function verify(token) {
  return jwt.verify(token, jwtSecret);
}
module.exports = { sign, verify };
