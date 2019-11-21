
var express = require('express');
var router = express();
var mongoose = require('mongoose');
var mongooseQ = require('mongoose-q')(mongoose);
var Promise = require("bluebird");
var Blog = require('./models/eblog');
var sm = require('sitemap');
var async = require('async');
var sitemap = require('express-sitemap'); 
var fs = require('fs');
var sm = require('sitemap');




router.get('/:username/:title/sitemap.xml',function(req, res, next){

     var blogUser = req.params.username;
     var title = req.params.title;
     
     Blog.getBlogContent(title,blogUser,(err,  data)=>{
      //  console.log(data);
      
      var sm = require('sitemap')
    , fs = require('fs');

var sitemap = sm.createSitemap({
    hostname: 'https://www.ebloginc.info',
    cacheTime: 600000,  //600 sec (10 min) cache purge period
    urls: [
        { url: req.params.username + '/' + req.params.title ,
         changefreq: 'weekly', 
         priority: 0.8, 
         lastmodrealtime: true,  
          img: "https://storage.googleapis.com/eblogpostimages/"+ data._id  },
    ]
});

fs.writeFile("sitemap.xml", sitemap.toString());
res.end();

});
});

module.exports = router;