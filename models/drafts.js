"use strict";

const mongoose = require('mongoose');


// User Schema
const DraftSchema = mongoose.Schema ({
  
  
  blogUser: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  
  },
  createdtime :{
    type: String,
    required: true
  }
});

const Draft = module.exports = mongoose.model('drafts', DraftSchema);


module.exports.addDraft = function(newDraft, callback) {
 
      newDraft.save(callback);
  
}


module.exports.getDrafts = function (blogUser, callback){
    const query = {blogUser: blogUser}
    Draft.find(query,callback);
}

module.exports.getDraftsCheck = function (blogUser, callback){
  const query = {blogUser: blogUser}
  Draft.find(query,callback);
}
module.exports.getDraftById = function (id, callback){
  const query = {_id: id}
  Draft.find(query,callback);
}

module.exports.delete = function (id, callback){
  const query = {_id: id}
   Draft.deleteMany(query,callback);
}

module.exports.update = function(id,content, callback){
  const query =  { _id: id  };
  const values = { $set: { content : content } };
  Draft.update(query,values,callback);

 
}
