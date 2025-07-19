const PageView = require('../models/PageView');
const Article = require('../models/Article');
const mongoose = require('mongoose');
exports.track = async (req, res, next) => {
  try {
    const { article } = req.body;
    if (!article) return res.status(400).json({ message: 'Article ID required' });
    const exists = await Article.findById(article);
    if (!exists) return res.status(404).json({ message: 'Article not found' });
    await PageView.create({ article });
    res.status(201).json({ message: 'Page view tracked' });
  } catch (err) {
    next(err);
  }
};
exports.count = async (req, res, next) => {
  try {
    const { article, startAt, endAt } = req.query;
    const filter = {};
    if (article) filter.article = article;
    if (startAt || endAt) filter.createdAt = {};
    if (startAt) filter.createdAt.$gte = new Date(startAt);
    if (endAt) filter.createdAt.$lte = new Date(endAt);
    const count = await PageView.countDocuments(filter);
    res.json({ count });
  } catch (err) {
    next(err);
  }
};
exports.aggregateDate = async (req, res, next) => {
  try {
    const { article, startAt, endAt, interval } = req.query;
    let groupFormat;
    if (interval === 'hourly') groupFormat = { $dateToString: { format: '%Y-%m-%dT%H:00:00Z', date: '$createdAt' } };
    else if (interval === 'monthly') groupFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };
    else groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    const match = {};
    if (article) match.article = new mongoose.Types.ObjectId(article);
    if (startAt || endAt) match.createdAt = {};
    if (startAt) match.createdAt.$gte = new Date(startAt);
    if (endAt) match.createdAt.$lte = new Date(endAt);
    const data = await PageView.aggregate([
      { $match: match },
      { $group: { _id: groupFormat, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(data.map(d => ({ date: d._id, count: d.count })));
  } catch (err) {
    next(err);
  }
};
