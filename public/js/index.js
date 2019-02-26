var socket = io();
        
socket.on('connect', function() {
    console.log("Connected to server");
    
    // socket.emit('createEmail', {
    //     to:'daniel@example.com',
    //     text:'Key. This is Cesar'
    // });
    // socket.emit('createMessage',{
    //   from:'Andrew', 
    //   text:'Yup, that works for me'
    // });
});

// socket.emit('createMessage',{
//   from: 'Frank',
//   text: 'Hi'
// }, function(data){
//   console.log('Got it', data); 
// });

socket.on('disconnect', function() {
   console.log("Disconnected from server"); 
});

socket.on('newEmail', function(email){
   console.log('New email', email); 
});

socket.on('newMessage', function(message){
    //console.log('newMessage', message);
    var formattedTime = moment(message.createdAt).format('h:m a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);
    jQuery('#messages').append(li);
    
});

socket.on('newLocationMessage',function(message){
    //console.log(message);
    var formattedTime = moment(message.createdAt).format('h:m a');
    var li = jQuery('<li></li>');
    var a = jQuery(`<a target="_blank">My current location</a>`);
    
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit', function(e){
    
    var messageTextbox = jQuery('[name=message]');
    
    socket.emit('createMessage',{
        from:'User',
        text: messageTextbox.val()
    }, function(data){
        messageTextbox.val();
    });
    e.preventDefault();
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser");
    }
    
    locationButton
        .attr('disabled','disabled')
        .text('Sending location....');
   
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton
            .removeAttr('disabled')
            .text('Send location');
            
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }); 
    }, function(){
        locationButton
            .removeAttr('disabled')
            .text('Send location');
        alert('Unable to fetch location');
    });
});