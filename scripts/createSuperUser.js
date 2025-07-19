const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

async function createSuperUser() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const username = 'superadmin';
  const password = 'superpassword';
  const name = 'Super Admin';
  const exists = await User.findOne({ username });
  if (exists) {
    console.log('Super user already exists');
    process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, username, password: hash });
  console.log('Super user created:', { username, password });
  process.exit(0);
}

createSuperUser();
