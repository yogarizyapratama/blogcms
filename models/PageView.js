const mongoose = require('mongoose');
const pageViewSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('PageView', pageViewSchema);
