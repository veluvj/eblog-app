"use strict";

const mongoose = require('mongoose');


// User Schema
const BlogSchema = mongoose.Schema ({
  
  
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
  category:{
    type:String,
    required:true
    
  },
  tags: [
    { name : {type:String ,
    required : true}
  }
    ],

  createdtime :{
    type: String,
    required: true
  }
});

const Blog = module.exports = mongoose.model('eblogs', BlogSchema);

module.exports.getBlogContent = function(_id, callback) {
  const query = ({ _id: _id  });
  Blog.findOne(query, callback);
}

module.exports.getBlogContentById = function(_id,callback){
  const query = ({ _id: _id });
  Blog.findOne(query, callback);
}

module.exports.getBlogByBlogUser = function(blogUser, callback) {
  const query = {blogUser: blogUser}
  Blog.find(query, callback);
}

module.exports.getBlogById = function(_id, callback) {
  const query = {_id: _id}
  Blog.find(query, callback);
}

module.exports.getCheckByBlogUser = function(blogUser, callback) {
  const query = {blogUser: blogUser}
  Blog.find(query, callback);
}

module.exports.getBlogtByExceptId = function(_id, callback){
  Blog.find({
      _id: {
          $ne: _id
      }
  }).exec( callback );
}

module.exports.addBlog = function(newBlog, callback) {
 
      newBlog.save(callback);
  
}

module.exports.getTitle = function(title, callback){

  const query = {title: title}
  Blog.findOne(query, callback);
}
module.exports.deleteEblog = function(_id, callback){
   const query = ({ _id: _id  });
   Blog.deleteMany(query, callback);
}
module.exports.updateBlog = function(_id,content, callback){
     const query =  { _id: _id  };
     const values = { $set: { content : content } };
     Blog.update(query,values,callback);
   
    
}

module.exports.getBlogs = function ( callback){

     Blog.find(callback);
}
module.exports.getCheck = function ( callback){
  Blog.find(callback);
}