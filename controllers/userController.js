const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: 'Username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, username, password: hash });
    res.status(201).json({ id: user._id, name: user.name, username: user.username, createdAt: user.createdAt, updatedAt: user.updatedAt });
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.user._id.toString() !== req.params.id) return res.status(403).json({ message: 'Forbidden' });
    const { name, password } = req.body;
    const update = {};
    if (name) update.name = name;
    if (password) update.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};
exports.delete = async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.id) return res.status(403).json({ message: 'Forbidden' });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
