var express = require('express'),
 router = express.Router(),
 aws = require('aws-sdk'),
 multer = require('multer'),
 multerS3 = require('multer-s3'),
 s3 = new aws.S3()
 config = require('../config')
const User = require('../../admin/models/user');
const fs = require('fs');
const fmt = require('fmt')
const crypto = require("crypto");



aws.config.update({
  secretAccessKey:config.secretAccessKey ,
  accessKeyId: config.accessKeyId,
  region: config.region
});

var upload = multer({
   storage: multerS3({
       s3: s3,
       bucket: 'eblogimages',
       ACL: 'public-read',
       metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname,ContentType: 'image/jpeg'
        });
      },
      key: function (req, file, cb) {
        cb(null, 'blog_pic/' + req.params.key);
      }
  })
});


//use by upload form
router.post('/upload/:key',upload.single('file',1),function ( req, res, next) {       
     
  res.json({ data:req.param.key });

});


// delete image
router.delete('/delete/:key', (req, res, next)=>{
     
      s3.deleteObject({
        Bucket: 'eblogimages',
        Key: 'blog_pic/'+ req.params.key
      },function (err,data){

        if(err){
          console.log(err);
        }else{
          res.json({ success: true });
        }
      })
    console.log(req.params.key);
});



module.exports = router;