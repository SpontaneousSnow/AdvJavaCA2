const Posts = require ('../models/Posts.js');
const mongoose = require('mongoose');

const PostsSchema = mongoose.Schema({
  name: String,
  genre: String,
  // url: String,
  description: String,
  // likes: Number,
  // Comments: String,
  folder_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'}
});

module.exports = mongoose.model('Posts', PostsSchema);