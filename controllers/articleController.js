const Article = require('../models/Article');
exports.getAll = async (req, res, next) => {
  try {
    const filter = { status: 'published' };
    console.log('req.user', req.user);

    if (req.user) {
      filter.$or = [
        { status: 'published' },
        { status: 'draft', user: req.user._id }
      ];
      delete filter.status;
    }
    const articles = await Article.find(filter).populate('user', 'name username');
    res.json(articles);
  } catch (err) {
    next(err);
  }
};
exports.getOne = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).populate('user', 'name username');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    if (article.status === 'draft' && (!req.user || req.user._id.toString() !== article.user._id.toString())) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(article);
  } catch (err) {
    next(err);
  }
};
exports.create = async (req, res, next) => {
  try {
    const { title, content, status } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });
    const article = await Article.create({ title, content, status: status || 'draft', user: req.user._id });
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};
exports.update = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    if (article.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    const { title, content, status } = req.body;
    if (title) article.title = title;
    if (content) article.content = content;
    if (status) article.status = status;
    await article.save();
    res.json(article);
  } catch (err) {
    next(err);
  }
};
exports.delete = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    if (article.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    next(err);
  }
};
