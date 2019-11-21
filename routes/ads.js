"use strict"
var express = require('express');
var router = express.Router();
var Ad = require('../models/ads');



router.post('/save/:id',(req, res, next)=>{
    
    const newAd = new Ad ({
        id : req.params.id,
        code : req.body.code
    })
   
    

    Ad.saveAd(newAd,(err,data)=>{

        if (err) throw err;
        res.json({ success:true});
    });

});


router.get('/get/:id',(req,res,next)=>{
    const id = req.params.id;

    Ad.getAd(id,(err, data)=>{
        if(err) throw err;
       
        res.json({ ad:data});
    });
});

router.delete('/delete/:id',(req, res, next)=>{
    const id = req.params.id;

    Ad.deleteAd(id,(err, data)=>{
        if(err) throw err;
       
        res.json({ success:true});
    });
});

module.exports = router; 