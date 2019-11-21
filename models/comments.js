"use strict";

const mongoose = require('mongoose');


// User Schema
const CommentSchema = mongoose.Schema ({
  
  id:{
    type: String,
    required: true
  },
  commentuser: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },
  createdTime:{
    type: String,
    required: true
  }
});

const Comment = module.exports = mongoose.model('comments', CommentSchema);

module.exports.deleteCmt = function(id,callback) {
  const query = ({id: id });
  Comment.deleteMany(query, callback);
}

module.exports.getCmt = function(id, callback) {
  const query = {id: id}
      Comment.find(query, callback);
}

module.exports.saveCmt = function(newCmt, callback) {
 
        newCmt.save(callback);
  
}

