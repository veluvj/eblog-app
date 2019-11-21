"use strict";

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../models/config/db');
const User = require('../models/user');
var client = require('../cache');

require('../models/config/passport')(passport);


// Register
router.post('/register', (req, res, next) => {
  let newUser = new User ({
  
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    createdtime: new Date().toISOString(),
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      // res.json({success: false, msg: 'Failed to register user'});
      console.log(err);
    } else {
     
        res.json({success: true, data:user});
        
   
   
    }

    User.getUsers(req.body.username, function(err, callback){
      if(callback){
        // res.json({ success: true , user: callback });
        
    }else{
        res.json({ success: false});
      
    }

    client.setex('users',86400,JSON.stringify(callback),(err, result)=>{

    });
    });
    
  
  });
});

// Authenticate
router.post('/login', (req, res, next) => {

  
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
      console.log('User not found');
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 86400 // 1 day
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          }
        })
        // console.log('User  found');
        client.setex('sessionUser',86400,JSON.stringify(user),(err, result)=>{
        });

      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  
    client.get('sessionUser',(err, result)=>{
        if (err) throw err;
        res.json({user: JSON.parse(result)});
    });

});



// getUsers
router.post('/getusers/',(req, res, next)=>{
          var username = req.body.username;
     

      

          User.getUsers(username, function(err, callback){
            if(callback){
              res.json({ success: true , user: callback });
              
          }else{
              res.json({ success: false});
            
          }

          
          });
            
});

router.get('/getuserbyusername/:username',(req, res, next)=>{
       
        var username = req.params.username;
       User.getUserByUsername(username, (err, user) => {
          if(err) throw err;
          if(!user) {
            return res.json({success: false});
        
          }else{
            return res.json({data: user});
          }
        });
});

router.post('/validusername/',(req, res, next)=>{

     var username = req.body.username;

     User.getUsername(username,(err,data)=>{
       if(!data){
        return res.json({success: true});
       }else{
        return res.json({success: false });
       }
     });
});

router.post('/validemail/',(req, res, next)=>{

  var email = req.body.email;

  User.getemail(email,(err,data)=>{
    if(!data){
     return res.json({success: true});
    }else{
     return res.json({success: false });
    }
  });
})

module.exports = router;
