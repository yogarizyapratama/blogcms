const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Article', articleSchema);
