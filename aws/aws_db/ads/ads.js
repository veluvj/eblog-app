const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const config = require('../../config');

aws.config.update({
    secretAccessKey:config.secretAccessKey ,
    accessKeyId: config.accessKeyId,
    region: 'us-east-1'
  });

  let docClient = new aws.DynamoDB.DocumentClient();


router.post('/post/:id',(req, res, next)=>{

    // console.log(req.body.codes);

        try {  
            
            var params = {
                TableName: 'eblogAds',
                Item: {
                    id  :  req.params.id,
              
                Info       :{ 
                "code"  :  req.body.code, 
                
                }
                }
            
            };

            return docClient.put(params, (err, result)=>{
                if(err){
                    console.log(err);
                }else {
            res.json({ success:true });
                }
            });

        }catch (err){

            console.log('error');
        }
      
});


router.get('/get/:id', (req, res, next)=>{

   
            
        var params = {
            TableName : "eblogAds",
            KeyConditionExpression: "#yr = :yyyy  " ,
            ExpressionAttributeNames:{
                "#yr": "id"
            },
            ExpressionAttributeValues: {
                ":yyyy":req.params.id,
                
            }
        };
        
            
            return docClient.query(params, (err, result)=>{
                    if( result ){
                  res.json({ success :true , ad:result.Items });
                    }else{
                      res.json({ success :false });
                    }
             });

   
});

router.delete('/delete/:id',(req, res, next)=>{

    try {  
            
        var params = {
            TableName : "eblogAds",
            Key:{
                
                "id":   req.params.id
            },
        }
        
            
            return docClient.delete(params, (err, result)=>{
                    if( err ){
                        res.json({ success: false});
                    }else{
                      res.json({ success :true });
                    }
             });

    }catch (err){

        console.log('error');
    }

});

module.exports = router;