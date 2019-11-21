"use strict";

const mongoose = require('mongoose');


// User Schema
const SMSchema = mongoose.Schema ({
  
  
  
  _id: {
    type: String,
    required: true
  
  },
  fb:{
    type:String,  
  },
  twitter:{
    type:String,  
  },
  insta:{
    type:String,  
  },
  linkedin:{
    type:String,  
  },
  gplus:{
    type:String,  
  },
  youtube:{
    type:String,  
  },
  github:{
    type:String,  
  },
  
});

const SM = module.exports = mongoose.model('socialmedia', SMSchema);

module.exports.addSM = function(newSM, callback){

    newSM.save(callback);
}

module.exports.getSM = function ( _id, callback ){

    const query = { _id: _id  }
    SM.findOne(query , callback);

}

module.exports.updateSM = function ( _id,fb,twitter,insta,linkedin,gplus,youtube,github, callback ){

  const query = { _id: _id  }
  const values = { $set: { fb : fb,
                           twitter: twitter,
                           insta : insta,
                           linkedin : linkedin,
                           gplus : gplus,
                          youtube : youtube,
                          github : github } }
  SM.updateOne(query ,values, callback);

}
