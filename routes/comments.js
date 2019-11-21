var express = require('express');
var router = express.Router();
var cmt = require('../models/comments')


router.post('/addcomment/:commentuser/:id',(req, res, next)=>{

    const newCmt= new cmt ({
        id : req.params.id,
        commentuser : req.params.commentuser,
        comments : req.body.comment,
        createdTime: new Date().toISOString()
    })
   
    

    cmt.saveCmt(newCmt,(err,data)=>{

        if (err) throw err;
        res.json({ success:true});
    });
});

router.get('/getcomment/:id',(req, res, next)=>{
    
    const id = req.params.id;

    cmt.getCmt(id,(err, data)=>{
        if(err) throw err;
       
        res.json({ cmt:data});
    });
});

router.delete('/removecomment/:id',(req,res,next)=>{
    const id = req.params.id;

    cmt.deleteCmt(id,(err, data)=>{
        if(err) throw err;
       
        res.json({ success: true});
    });
});

module.exports = router; 