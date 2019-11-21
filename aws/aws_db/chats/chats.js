var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var config = require('../../config');



 aws.config.update({
  secretAccessKey:config.secretAccessKey ,
  accessKeyId: config.accessKeyId,
  region: 'us-east-1'
});


let docClient = new aws.DynamoDB.DocumentClient();



router.post('/post',(req, res, next)=>{

    var params = {
        TableName: 'eblogChats',
        Item: {
             
           username  :  req.body.username,
         createTime  : new Date().toISOString(),
          Info       :{ 
            "message":  req.body.text, 
        
        
          }
        }
    
    };
      
      return docClient.put(params, (err, result)=>{
           if(err) throw err;
          res.json({ success:true });
       });
   
});

router.get('/get',(req, res, next)=>{
    
   
   
    
        var params = {
          TableName : 'eblogChats',
      
      };
          
        docClient.scan(params, (err, data)=>{
            if(err){
              console.log(err);
              
            }else{ 
             
              return res.json({ chats : data.Items});
           }
       
      });
  
});

module.exports = router ;