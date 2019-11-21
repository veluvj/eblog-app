"use strict";

const mongoose = require('mongoose');


// User Schema
const AdSchema = mongoose.Schema ({
  
  
   id: {
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true
  }
});

const Ad = module.exports = mongoose.model('ads', AdSchema);

module.exports.deleteAd = function(id, callback) {
  const query = ({ id: id  });
  Ad.deleteMany(query, callback);
}

module.exports.getAd = function(id, callback) {
  const query = {id: id}
  Ad.find(query, callback);
}

module.exports.saveAd = function(newAd, callback) {
 
      newAd.save(callback);
  
}

