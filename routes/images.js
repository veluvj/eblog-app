// "use strict";

const express = require('express');
const router = express.Router();
const Multer = require('multer');
const fs = require('fs')
const cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');



cloudinary.config({ 
  cloud_name: 'ebloginc', 
  api_key: '472934591659992', 
  api_secret: '82ODUS0iZLi9zc6h4qTuB4q5MTU' 
});

 
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'eblogpostimages',
  allowedFormats: ['jpg', 'png', 'gif'],
  filename: function (req, file, cb) {
    cb(undefined, req.params.key);
  }
});
 
var multer = Multer({ storage: storage });

router.post('/upload/:key',multer.single('file',1), function (req, res) {
     
    res.json({ success:true  });

  

});

router.post('/uploadbyurl/:key', function (req, res) {
     
  cloudinary.v2.uploader.upload(req.body.URL, {public_id:
   req.params.key, folder:'eblogpostimages'},
  function(error, result){
     res.json({ success:true });
  });


});


router.delete('/delete/:key', function (req, res) {
    
    var key = 'eblogpostimages/'+req.params.key;
   
     cloudinary.v2.uploader.destroy(key, 
    {invalidate: true }, function(error, result) {
      res.json({success:true})
    });

});



module.exports = router;