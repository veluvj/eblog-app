var express = require('express'),
 router = express.Router(),
 aws = require('aws-sdk'),
 multer = require('multer'),
 multerS3 = require('multer-s3'),
 s3 = new aws.S3()
 config = require('../config')
const User = require('../../admin/models/user');


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
        cb(null,'profile_pic/' + req.params.name);
      }
  })
});


//use by upload form
router.post('/upload/:name', upload.single('file',1), function (req, res, next) {
  res.send('Successfully uploaded '+req.files);
      console.log(aws.config);
   var username = req.params.name
            
   User.update({username: username}, {
    imageURL : 'https://s3.ap-south-1.amazonaws.com/eblogimages/profile_pic/'+ username  
},function(err, numberAffected, rawResponse) {
  
});
});



router.get('/getprofile/:name',(req, res, next)=>{

  var params = { Bucket: 'eblogimages', Key:'profile_pic/' +  req.params.name };
  s3.getObject(params, function(err, data) {

    if(data){
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.write(data.Body, 'binary');
      res.end(null, 'binary');
    }else{
      
    }
  });

});

module.exports = router;