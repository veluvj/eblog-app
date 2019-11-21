// "use strict";

const express = require('express');
const router = express.Router();
const Multer = require('multer');
const fs = require('fs')
const cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var User = require('../models/user');


cloudinary.config({ 
  cloud_name: 'ebloginc', 
  api_key: '472934591659992', 
  api_secret: '82ODUS0iZLi9zc6h4qTuB4q5MTU' 
});

 
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'ebloguserimages',
  // cr/opping : 'server', 
  // eager: { crop: "imagga_scale", width: 150, height: 200 },
  // cropping_aspect_ratio : 1, 
  invalidate: true,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, req.param.key);
  }
});
 
var multer = Multer({ storage: storage });

router.post('/upload/:key',multer.single('file',1), function (req, res) {
  // console.log(res);
res.json({ success: true }) 

});

router.post('/uploadbyurl/:key', function (req, res) {
  cloudinary.v2.uploader.upload(req.body.URL, {public_id:
   req.params.key, folder:'ebloguserimages'},
  function(error, result){
    // console.log(result);
     res.json({ success:true });
  });
});

router.post('/update/:key',function(req, res, next){
    
  var key = 'ebloguserimages'+req.params.key
  console.log(key);
  cloudinary.v2.uploader.update(key, {invalidate: true },function(error, result) {
      console.log(result)
   });


})



module.exports = router;