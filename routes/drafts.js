var express = require('express');
var router = express.Router();
var Draft  = require('../models/drafts');




router.post('/create/:blogUser',(req, res, next)=>{

    let newDraft = new Draft ({
    
        blogUser: req.params.blogUser,
        title: req.body.title,
        content: req.body.content,
        createdtime: new Date().toISOString(),

      });

      Draft.addDraft(newDraft,(err, data)=>{
          if(err) throw err;
          res.json({ success:true });
      });
});

router.get('/get/:blogUser',(req, res, next)=>{

     var blogUser = req.params.blogUser ;

     Draft.getDrafts(blogUser,(err, data)=>{
         if(err) throw err;
         res.json({ success:true , blog:data });
     });

});

router.get('/getcheck/:blogUser',(req, res, next)=>{

    var blogUser = req.params.blogUser ;

    Draft.getDraftsCheck(blogUser,(err, data)=>{
        if(err) throw err;
        res.json({ success:true , blog:data });
    });

});

router.get('/getbyid/:id',(req, res, next)=>{

    var id = req.params.id ;

    Draft.getDraftById(id,(err, data)=>{
        if(err) throw err;
        res.json({ success:true , blog:data });
    });

});

router.get('/delete/:id',(req, res, next)=>{

    var id = req.params.id ;

    Draft.delete(id,(err, data)=>{
        if(err) throw err;
        res.json({ success:true });
    });

});

router.post('/update/',(req, res, next)=>{

    var _id = req.body._id ;
    var content = req.body.content;
    Draft.updateOne({
        "_id":  _id
    }, {
        $set: {
            "content": content
        }
    }, function(err, results) {
        if(err) throw err;
        res.json({ success:true });
    });

});

module.exports = router ;