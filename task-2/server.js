
const express  = require('express');
const app = express();
const http = require('http');
const expressServer = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(expressServer);


io.on("connection", function(socket){
    console.log('New connected');
    socket.on("disconnect", function(){
        console.log('Disconnected');
    });

    
    // Broadcasting
    io.sockets.emit('msgBroadcasting', 'Hello Everybody')

});


let adminRoom = io.of('/admin');
adminRoom.on("connection", function(socket){
    console.log('New admin connected');
    socket.on("disconnect", function(){
        console.log('Admin disconnected');
    });

    adminRoom.emit('msgBroadcasting', 'Welcome to Admin Room')
})

let userRoom = io.of('/user');
userRoom.on("connection", function(socket){
    console.log('New user connected');
    socket.on("disconnect", function(){
        console.log('User disconnected');
    });

    userRoom.emit('msgBroadcasting', 'Welcome to User Room')
})


app.get('/', function(req, res){
    res.sendFile(__dirname +'/index.html');
});


app.get('/admin', function(req, res){
    res.sendFile(__dirname +'/admin.html');
});

app.get('/user', function(req, res){
    res.sendFile(__dirname +'/user.html');
});

expressServer.listen(4000, function(){
    console.log('Server run @4000');
    
})