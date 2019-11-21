var express = require('express');
var router = express.Router();
var SM = require('../models/socialmedia');


router.post('/add',(req, res, next)=>{
     
    const _id = req.body.id;
    const fb = req.body.fb;
    const twitter = req.body.twitter;
    const insta = req.body.insta;
    const linkedin = req.body.linkedin;
    const gplus = req.body.gplus;
    const youtube = req.body.youtube;
    const github = req.body.github;



    let newSM = new SM ({
       _id : req.body.id,
       fb: req.body.fb,
       twitter:req.body.twitter,
       insta:req.body.insta,
       linkedin:req.body.linkedin,
       gplus:req.body.gplus,
       youtube:req.body.youtube,
       github:req.body.github

      });

    SM.getSM(_id, (err, result)=>{
        if(result){
            SM.updateSM(_id,fb,twitter,insta,linkedin,gplus,youtube,github, (err, result)=>{
                if(err) throw err;
                res.json({ success:true });
            });
        }else{
            SM.addSM(newSM , (err, result)=>{
                if(err) throw err;
                res.json({ success: true });
            })
        }
    })

   

});

router.post('/get/:username',(req, res, next)=>{

     var _id = req.params.username ;

     SM.getSM(_id, (err, result)=>{
         if(err) throw err;
        res.json({ data: result });
     });

});




module.exports = router ;