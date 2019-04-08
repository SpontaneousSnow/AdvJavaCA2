const Comment = require('../models/Comment.js');
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  username: String,
  description: String,
  post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }
});

module.exports = mongoose.model('Comment', CommentSchema);
