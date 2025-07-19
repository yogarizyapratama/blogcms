require('dotenv').config();
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/blogcms',
};
