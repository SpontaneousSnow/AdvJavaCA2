const Folder = require ('../models/Folder.js');
const mongoose = require('mongoose');

// declare fields
const FolderSchema = mongoose.Schema({
  name: String,
  description: String,
  size: Number,
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Folder', FolderSchema);