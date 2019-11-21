var express = require('express');
var router = express.Router();

var ReadList = require('../models/readlist');



router.post('/add/:id',(req, res, next)=>{


      const newRid = new ReadList ({
       uid : req.params.id,
       rid : req.body.rid,
       createdTime: new Date().toISOString()
    })
   
    

    ReadList.saveRid(newRid,(err,data)=>{

        if (err) throw err;
        res.json({ success:true});
    });

});
router.post('/get/:uid',(req, res, next)=>{

    var uid = req.params.uid;

   ReadList.getRid(uid,(err, data)=>{
    
    if (err) throw err;
    res.json({ rid:data});

   });

});
// router.post('/remove/:id',(req, res, next)=>{

//     var uid = req.params.id;

//     ReadList.removeRid(uid,(err, data)=>{
    
//         if (err) throw err;
//         res.json({ success:true});
    
//        });
// });

module.exports = router;