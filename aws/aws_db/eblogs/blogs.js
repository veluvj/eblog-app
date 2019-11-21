var express = require('express'),
 router = express.Router(),
 aws = require('aws-sdk'),
 config = require('../../config')
 const crypto = require("crypto");



 aws.config.update({
  secretAccessKey:config.secretAccessKey ,
  accessKeyId: config.accessKeyId,
  region: 'us-east-1'
});


let docClient = new aws.DynamoDB.DocumentClient();


//post
  router.post('/create/:key/:user', (req, res, next)=>{
   
        
    var params = {
        TableName: 'eblogs',
        Item: {
          eblogTitle :  req.body.title,
          blogUser   : req.params.user,
          Info       :{ 

          "content"  :  req.body.body, 
        "category"   :  req.body.categories,
     "createdtime"   :  new Date().toISOString(),
           "id"      :  req.params.key
          }
        }
    
    };
      
      return docClient.put(params, (err, result)=>{
           if(err) throw err;
          res.json({ success:true });
       });
   
  });

  //getbyuser
  router.get('/read/:user', (req, res, next)=>{
   
        
    var params = {
      TableName : "eblogs",
      KeyConditionExpression: "#yr = :yyyy",
      ExpressionAttributeNames:{
          "#yr": "blogUser"
      },
      ExpressionAttributeValues: {
          ":yyyy":req.params.user
      }
  };
  
      
      return docClient.query(params, (err, result)=>{
           if(err) throw err;
           res.json({  blog : result.Items });
       });
   
  });


    //getall
    router.get('/read', (req, res, next)=>{
   
    
      var params = {
        TableName : 'eblogs',
        // IndexName : 'city_index',
        // KeyConditionExpression : 'city = :cityVal', 
        // ExpressionAttributeValues : {
        //     ':cityVal' : 'london'        
        // }
    };
        
      docClient.scan(params, (err, data)=>{
          if(err){
            console.log(err);
            
          }else{ 
           
            return res.json({ blog : data.Items});
         }
     
    });

  });
  //getbytitle
  router.post('/get/:user/:title', (req, res, next)=>{
   

    const title = req.params.title.replace( '%3f','?');
        // console.log(req.params.title);
        var params = {
         
            TableName: "eblogs",
            Key:{
                "blogUser": req.params.user,
                "eblogTitle": title
            }
        
      };
       
  
      
      return docClient.get(params, (err, result)=>{
              if( result.Item ){

                 res.json({ success: true , blog : result.Item});
                
              }else {

                  res.json({ success: false });
              }
              
          
       });
   
  });


//update
  router.put('/update/', (req, res, next)=>{
   
    
        // console.log(req.body.createdTime);
    var params = {
        TableName: 'eblogs',
        Key: {
          
          blogUser : req.body.blogUser,
        eblogTitle: req.body.eblogTitle,
         
        },
        UpdateExpression: "set Info.content = :r",
        ExpressionAttributeValues:{
            ":r":req.body.Info.content,
           
        },
        ReturnValues:"UPDATED_NEW"
    
    };
      
      return docClient.update(params, (err, result)=>{
           if(err) throw err;
           res.json({ success: true });
       });
   
  });

  // delete 
  router.post('/delete/:username/:title', (req, res, next)=>{
   
   
    var params = {
      TableName:'eblogs',
      Key:{
          "blogUser":req.params.username,
       "eblogTitle": req.params.title
      },
     
  };
  
 
  docClient.delete(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
         res.json({ success: true,  });
      }
    });

  
  });


module.exports = router ;