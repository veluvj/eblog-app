var express = require('express');
var router  = express.Router();
var Mob  = require('../models/postMob');
var client = require('../cache');


router.post('/create/:blogUser',(req, res, next)=>{
      
       var newMob = new Mob ({
        _id : req.body._id,
        blogUser : req.params.blogUser,
        title : req.body.title,
        content  : req.body.content,
        createdtime : new Date().toISOString()

       })

     Mob.addPost( newMob,(err, result)=>{
          if(err){
              console.log(err);
          }else{
              res.json({ success:true , blog:result});
          

          Mob.getPosts((err, result)=>{
            if(err){
                console.log(err);
            }else{
                // res.json({ blog:result });
            }
    

        client.setex('stories',86400,JSON.stringify(result),function(){
         
            client.del(newMob.blogUser+':stories');
        });
    
    });

    Mob.getPostByUsername(req.params.username , (err, result)=> {
        if(err){
            console.log(err);
        }else{
            // res.json({ blog:result });
            
        }

        client.setex(req.params.username+':stories',86400,JSON.stringify(result),()=>{
        });
        });
}
     });  
});

router.post('/getbybloguser/',(req, res, next)=>{
    var blogUser = req.body.username ;


    client.get(blogUser+ ':stories',(err, result)=>{
        
        if(result !== null || undefined){
            res.json({ blog:JSON.parse(result) });
        }else{
        Mob.getPostByUsername(blogUser , (err, result)=> {
            if(err){
                console.log(err);
            }else{
                res.json({ blog:result });
                
            }

            client.setex(blogUser+':stories',86400,JSON.stringify(result),()=>{
            });
            });
        }
    })

       
});


router.post('/get/content/id',(req, res, next)=>{

    var _id = req.body._id ;

    client.get(_id, (err, result)=>{
      if(result !== null || undefined){
          res.json({ blog:JSON.parse(result)});
      }else{
        Mob.getPostById(_id , (err, result)=> {
            if(err){
                console.log(err);
            }else{
                res.json({ blog:result });
               
                
            }

            client.setex(_id,86400,JSON.stringify(result),(err, result)=>{
                    
            });
           });
      }
    });

});


router.get('/getexceptusername/:id',(req, res, next)=>{
    var _id = req.params.id ;

       Mob.getPostByExceptUsername(_id , (err, result)=> {
        if(err){
            console.log(err);
        }else{
            res.json({ blog:result });
           
            
        }
       });
});

router.get('/getposts/',(req, res, next)=>{

    client.get('stories',function(err, result){
         if(result !== null && undefined){
             res.json({blog:JSON.parse(result)});
         }else{
            Mob.getPosts((err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json({ blog:result });
                }
        

            client.setex('stories',86400,JSON.stringify(result),function(){
             
            });
        });
         }
    })
    
});

router.get('/check/',(req, res, next)=>{
   
    Mob.getCheck((err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.json({ blog:result });
        }
    });
});

router.delete('/delete/:id/:username',(req, res, next)=>{




    var id = req.params.id;

    Mob.delete(id, (err, result)=>{
        if(err) throw err;
        res.json({ success:true });
    });

    client.del(id,(err, result)=>{

    });
    Mob.getPosts((err, result)=>{
        if(err){
            console.log(err);
        }else{
            // res.json({ blog:result });
        }


    client.setex('stories',86400,JSON.stringify(result),function(){
     
    });
});
Mob.getPostByUsername(req.params.username , (err, result)=> {
    if(err){
        console.log(err);
    }else{
        
    }

    client.setex(req.params.username+':stories',86400,JSON.stringify(result),()=>{
    });
    });


})
module.exports = router ;