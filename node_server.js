var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
var cors = require('cors');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/users');
var profilePic = require('./routes/profilePic');
var images = require('./routes/images');
var eblog  = require('./routes/eblog');
var postM  = require('./routes/postMob');
var drafts = require('./routes/drafts');
var comments = require('./routes/comments');
var ad = require('./routes/ads');
var config =require('./models/config/db');
var User = require('./models/user');
var generateToken,sendToken = require('./models/config/passport');
var expressSanitizer = require('express-sanitizer');
var fs = require('fs');
var https = require('https');
var sitemap = require('./sitemap-generater');
var readlist = require('./routes/readlist');
var socialmedia = require('./routes/socialmedia');
var redisStore = require('connect-redis')(session);
const axios = require('axios');
var client = require('./cache');
const port = process.env.port || 4000;
const host = 'localhost';


// redisCached
client.on('connect', () => {
    console.log(`connected to redis`);
});
client.on('error', err => {
    console.log(`Error: ${err}`);
});






//db
mongoose.connect(config.db);

mongoose.connection.on('connected',()=>{
    console.log('connected to db'+config.db);
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });



 //cors
var corsOption = {
    origin: true,
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    exposeHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true,parameterLimit: 1000000}));
app.use('/users', routes);
app.use('/profilepic', profilePic);
app.use('/eblogimage', images);
app.use('/eblog',eblog);
app.use('/ad', ad);
app.use('/comments', comments);
app.use('/sitemap', sitemap);
app.use('/drafts',drafts);
app.use('/postM', postM);
app.use('/readlist',readlist);
app.use('/socialmedia', socialmedia);


app.use(expressSanitizer());
app.use(passport.initialize());
app.use(passport.session());


// session
app.use(cookieParser('abcdefg'));
app.use(session({
    cookie:{secure:true},
    secret : 'abcdefg',
    // store: new redisStore({client:client, ttl:3600}),
    resave: true,
    saveUninitialized: true

}));



// static files

app.use(express.static(path.join(__dirname, 'public/dist/sample')));

app.use('*', express.static(__dirname + '/public/dist/sample/index.html'));



//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());




//port
app.listen(port,host,(err, res)=>{
    if(err) throw err;
    console.log('server is on ');
});



