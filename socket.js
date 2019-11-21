var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());



var chat = {
	start: function(){
		server.listen(4567, function(err, res){
            if (err) throw err;
            console.log('socket on port 4567');
        });
		io.set("origins", "*:*");
 
		io.on('connection', function (socket) {         // line 12
			socket.on('newMessage', function (data) {
				socket.emit('chatUpdate',data);
				socket.broadcast.emit('chatUpdate',data);
			});
			socket.on('newUser', function (data) {
				socket.emit('chatUpdate',
					{'userName':'','text':data+' has entered the room'});
				socket.broadcast.emit('chatUpdate',
					{'userName':'','text':data+' has entered the room'});
			});
		});	
	}
}
 
app.use('/',(req, res, next)=>{
	   res.send('socket');
});


module.exports = chat;