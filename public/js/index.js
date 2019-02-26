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
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
    
});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery(`<a target="_blank">My current location</a>`);
    
    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit', function(e){
    socket.emit('createMessage',{
        from:'User',
        text: jQuery("[name=message]").val()
    }, function(data){
        console.log("This is a big example");
    });
    e.preventDefault();
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){
  if(!navigator.geolocation){
      return alert("Geolocation not supported by your browser");
  }
   
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }); 
    }, function(){
      alert('Unable to fetch location');
    });
});