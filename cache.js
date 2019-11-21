var redis = require('redis');
var client = redis.createClient({
    
    port:'13464',
    host: 'redis-13464.c100.us-east-1-4.ec2.cloud.redislabs.com',
    password: '3JfttHxwy0P6tVsA90M0yVGGUl93EJsI'
    
});



module.exports = client;


