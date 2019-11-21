"use strict";

const mongoose = require('mongoose');


// User Schema
const ReadListSchema = mongoose.Schema ({
  

  uid:{
    type: String,
    required: true
  },
  rid:{
    type: String,
    required: true
  }
});

const ReadList = module.exports = mongoose.model('readlists', ReadListSchema);

// module.exports.deleteRid = function(uid,callback) {
//   const query = ({rid : rid });
//   ReadList.deleteMany(query, callback);
// }

module.exports.getRid = function(uid, callback) {
  const query = {uid: uid}
  ReadList.find(query, callback);
}

module.exports.saveRid = function(newRid, callback) {
 
        newRid.save(callback);
  
}

