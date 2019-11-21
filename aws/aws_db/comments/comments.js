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

//addcomment
router.post('/addcomment/:commentUser/:id', (req,res,next)=>{

         
    var params = {
        TableName: 'eblogComments',
        Item: {
             
                 id  :  req.params.id,
        createdTime  : new Date().toISOString(),
          Info       :{ 
            "comment":  req.body.comment, 
        "commentUser":  req.params.commentUser,
        
          }
        }
    
    };
      
      return docClient.put(params, (err, result)=>{
           if(err) throw err;
          res.json({ success:true });
       });
   
});

//getcomment
router.get('/getcomment/:id', (req,res,next)=>{

         
       
    var params = {
        TableName : "eblogComments",
        KeyConditionExpression: "#yr = :yyyy  ",
        ExpressionAttributeNames:{
            "#yr": "id",
            // "ti": "title "
        },
        ExpressionAttributeValues: {
            ":yyyy":req.params.id ,
            // ":value":req.params.title
        }
    };
    
        
        return docClient.query(params, (err, result)=>{
                if( result ){
              res.json({ success :true , comment: result.Items });
                }else{
                  console.log(err);
                }
         });
   
});

 // delete 
 router.post('/removecomment/:key/', (req, res, next)=>{
   
     
  var params = {
    TableName : "eblogComments",
    KeyConditionExpression: "#yr = :yyyy  ",
    ExpressionAttributeNames:{
        "#yr": "id",
        // "ti": "title "
    },
    ExpressionAttributeValues: {
        ":yyyy":req.params.key ,
        // ":value":req.params.title
    }
};

  
 
  docClient.query(params, function(err, data) {
      if (err) {
        // res.json({ success: false });
        // console.log(err);
      } else {
        console.log(data.Items);
        for(var i = 0; i < data.Items.length ;i++ ){

          // console.log(data.Items[i].createdTime);
          
          var params = {
            TableName : "eblogComments",
            Key:{
              "id" : req.params.key,
              "createdTime" : data.Items[i].createdTime
            },
           
        };
        docClient.delete(params, function(err, data){
          if(err){
            return  res.json({ success: false});
          }else{
             return res.json({ success: true});
          }
        })
        }
        // console.log(data.Items[0].createdTime);
         
      }
    });

  
  });



module.exports = router ; 