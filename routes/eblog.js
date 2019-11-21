"use strict";

var express = require('express');
var router  = express.Router();
var Blog = require('../models/eblog');
var client = require('../cache');





router.post('/create/:blogUser', (req, res, next) =>{

    let newBlog = new Blog ({
        blogUser: req.params.blogUser,
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        tags:req.body.tags,
        createdtime: new Date().toISOString(),

      });

      Blog.addBlog(newBlog, (err, data) => {
        if(err) {
        console.log(err);
          
        } else {
          res.json({success: true, msg: 'successfully created', res:data});
        
        Blog.getBlogs((err,data)=> {
          if(err) throw err;
          // res.json({ blog:data });
      client.setex('eBlogs' ,86400, JSON.stringify(data),function(err,reply){
                  client.del(newBlog.blogUser+':eBlogs');
              }); 

        
       });



       Blog.getBlogByBlogUser(req.params.blogUser , (err, data)=> {
        if(err) throw err;

        client.setex(req.params.blogUser+':eBlogs',86400,JSON.stringify(data),(err, result)=>{

        });
    });
      }
      });

}); 

router.post('/readbyusername/',(req, res, next)=>{

       var blogUser = req.body.username ;

       client.get(blogUser+':eBlogs',(err, result)=>{
         if(result !== null || undefined){
           res.json({ blog:JSON.parse(result) })
         }else{

          Blog.getBlogByBlogUser(blogUser , (err, data)=> {
            if(err) throw err;
            res.json({ blog: data });

            client.setex(blogUser+':eBlogs',86400,JSON.stringify(data),(err, result)=>{

            });
        });
         }
       });
});


router.get('/readbyid/',(req, res, next)=>{

  var _id = req.body.id ;

  client.get(_id,(err, result)=>{
   if(result !== null || undefined){
     res.json({ blog:JSON.parse(result) })
   }else{
    Blog.getBlogByBlogUser(_id , (err, data)=> {
      if(err) throw err;
      res.json({ blog: data });

      client.setex(_id,86400,JSON.stringify(data),(err,data)=>{

      });
  });
   }
  });

});

router.post('/readbyexceptid/',(req, res, next)=>{

  var _id = req.body.id ;

  Blog.getBlogtByExceptId(_id , (err, data)=> {
      if(err) throw err;
      res.json({ blog: data });
  });
});

router.get('/check/:blogUser',(req, res, next)=>{

  var blogUser = req.params.blogUser ;

  Blog.getCheckByBlogUser(blogUser , (err, data)=> {
      if(err) throw err;
      res.json({ blog: data });
  });
});


router.get('/read',(req, res, next) => {


  client.get('eBlogs',function(err,reply){
    if(reply !== null || undefined ){
       res.json({blog: JSON.parse(reply)});
    }
    else {

       Blog.getBlogs((err,data)=> {
          if(err) throw err;
          res.json({ blog:data });


      client.setex('eBlogs' ,86400, JSON.stringify(data),function(err,reply){
                  // console.log(reply);
              }); 

        
       });
    }
  })

  
});


router.get('/check',(req, res, next) => {

  Blog.getCheck((err,data)=> {
    if(err) throw err;
    res.json({ blog:data });
  });
});


router.post('/getbytitle/',(req, res, next)=>{
      
            var encoding = 'utf8';
      
      const  _id  = req.body.id;
      const  blogUser = req.params.username

      client.get(_id,(err, result)=>{
    if(result !== null || undefined){
      res.json({ success: true , blog:JSON.parse(result)  })
    }else{
      Blog.getBlogContent(_id,(err, data)=> {

        if(err) throw err;
        // console.log(data);
        res.json({ success: true , blog: data });

        client.setex(_id,86400,JSON.stringify(data),()=>{

        });

    });
    }
      });
     
});

router.get('/getbyid/:id',(req, res, next)=>{
      


const  _id  = req.params.id;

client.get(_id,(err, result)=>{
  if(result !== null || undefined){
    res.json({ success: true , blog:JSON.parse(result)  })
  }else{
    Blog.getBlogContentById(_id,(err, data)=> {

      if(err) throw err;
      // console.log(data);
      res.json({ success: true , blog: data });

      client.setex(_id,86400,JSON.stringify(data),()=>{

      });

  });
  }
    });
});

router.post('/update',(req, res, next)=>{


     const _id = req.body._id;
     const content = req.body.content;
   

     Blog.updateBlog(_id,content, (err, data)=>{

      if(err) throw err;
      res.json({ success: true });
     
      client.del(_id,()=>{});

      Blog.getBlogs((err,data)=> {
        if(err) throw err;
        // res.json({ blog:data });
    client.setex('eBlogs' ,86400, JSON.stringify(data),function(err,reply){
                // console.log(reply);
            }); 

      
     });
     } );
           
});

router.post('/delete/:id/:username',(req, res, next)=>{
           const _id = req.params.id;
          
           Blog.deleteEblog(_id,(err, data)=>{
            if(err) throw err;
            res.json({ success: true });
          client.del(_id,()=>{});

          Blog.getBlogs((err,data)=> {
            if(err) throw err;
            // res.json({ blog:data });
        client.setex('eBlogs' ,86400, JSON.stringify(data),function(err,reply){
                    // console.log(reply);
                }); 
  
          
         });

         Blog.getBlogByBlogUser(req.params.username , (err, data)=> {
          if(err) throw err;
          res.json({ blog: data });

          client.setex(req.params.username+':eBlogs',86400,JSON.stringify(data),(err, result)=>{

          });
      });


           });
});

router.post('/validtitle/',(req, res, next)=>{
     
       const title = req.body.title;
       Blog.getTitle(title, (err,  data)=>{
        if(!data){
          return res.json({success: true});
         }else{
          return res.json({success: false });
         }
       })
});







module.exports = router ;