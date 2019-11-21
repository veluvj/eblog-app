"use strict";

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const MobSchema = mongoose.Schema ({
  
    _id:{
        type: String,
        required: true
    },
    blogUser: {
        type: String,
        required: true
      },
      title:{
         type: String,
         required:true
 
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

const Mob = module.exports = mongoose.model('postMob', MobSchema);

 module.exports.addPost = function (newMob, callback){
     newMob.save(callback);
 }

 module.exports.getPostByUsername = function(blogUser, callback){
     const query = { blogUser : blogUser }
     Mob.find (query,callback);
 }

 module.exports.getPostById= function(_id, callback){
    const query = { _id : _id }
    Mob.find (query,callback);
}


 module.exports.getPostByExceptUsername = function(_id, callback){
    Mob.find({
        _id: {
            $ne: _id
        }
    }).exec( callback );
}


 module.exports.getPosts = function( callback){
  
    Mob.find (callback);
}
module.exports.getCheck = function( callback){
  
    Mob.find (callback);
}

 module.exports.delete = function(id, callback){
     var query = { _id : id  }
     Mob.deleteMany(query, callback);
 }