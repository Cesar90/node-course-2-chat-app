// const path = require('path');
// const publicPath = path.join(__dirname,'../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user connected');
    
    socket.emit('newMessage',{
       from:'Admin',
       text:'Welcome to the chat app',
       createdAt: new Date().getTime()
    });
    
    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', {
       from:'Admin',
       text:'New user joined',
       createdAt: new Date().getTime()
    });
    
    // socket.emit('newMessage', {
    //   from:'John',
    //   text:'See you then',
    //   createdAt: 123123
    // });
    
    //socket.emit from Admin text welcome to the chat app
    //socket.broadcast.emit from admin text New user joined
    
    socket.on('createMessage', (message) => {
        // console.log('createMessage', message);
        // io.emit('newMessage',{
        //   from: message.from,
        //   text: message.text,
        //   createtAt: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });
    
    // socket.emit('newEmail', {
    //     from:'cesar@test.test',
    //     text:'Hey. What is going on',
    //     createdAt: 123
    // });
    
    // socket.on('createEmail', (newEmail) =>{
    //   console.log('createEmail', newEmail); 
    // });
    
    socket.on('disconnect', ()=>{
       console.log('User was disconnect'); 
    });
});

server.listen(port, () =>{
    console.log(`Server is up on ${port}`);
});