////https://getstartednode-ccordero.c9users.io.
// const path = require('path');
// const publicPath = path.join(__dirname,'../public');
// console.log(__dirname + '/../public');
// console.log(publicPath);
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('New user connected');
    
    // socket.emit('newMessage', 
    //     generateMessage('Admin','Welcome to the chat app'));
    
    // //socket.broadcast.emit from Admin text New user joined
    // socket.broadcast.emit('newMessage',
    //     generateMessage('Admin','New user joined'));
        
    socket.on('join',(params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }
        
        //socket.leave('The office Fans')
        //io.emit -> io.to('The office Fans').emit
        //socket.broadcast.emit -socket.broadcast.to('The office fans').emit
        //socket.emit
        //io.to(params.room).emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        
        callback();
    });
    
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        
        if(user && isRealString(message.text)){
            io.to(user.room)
                .emit('newMessage', 
                    generateMessage(user.name, message.text));
        }
        
        // io.emit('newMessage',
        //     generateMessage(message.from,message.text));
        //callback('This is from server');
        callback();
    
    // socket.emit('newMessage', {
    //   from:'John',
    //   text:'See you then',
    //   createdAt: 123123
    // });
    
    //socket.emit from Admin text welcome to the chat app
    //socket.broadcast.emit from admin text New user joined
    
        // console.log('createMessage', message);
        // io.emit('newMessage',{
        //   from: message.from,
        //   text: message.text,
        //   createtAt: new Date().getTime()
        // });
        //socket.broadcast.emit('newMessage',
    });
    
    socket.on('createLocationMessage', (coords) => {
       //io.emit('newMessage', generateMessage('Admin',`${coords.latitude}, ${coords.longitude}`)); 
       var user = users.getUser(socket.id);
        if(user){
            io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
        }
       
       //io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude, coords.longitude));
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
       //console.log('User was disconnect');
       var user = users.removeUser(socket.id);
       
       if(user){
           io.to(user.room).emit('updateUserList', users.getUserList(user.room));
           io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left`));
       }
    });
});

server.listen(port, () =>{
    console.log(`Server is up on ${port}`);
});