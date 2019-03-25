jQuery(function($){
  let socket = io.connect();
  let $messageForm = $('#send-message');
  let $messageBox = $('#message');
  let $chat = $('#chat');

  $messageForm.submit(function(e) {
    e.preventDefault()
    socket.emit('send message', $messageBox.val())
    $messageBox.val('');
  })

  socket.on('new message', function(data) {
    $chat.append(data + '<br/>')
  })
})

  //Keep track of the current user
//   let currentUser;
//   // Get the online users from the server
//   socket.emit('get online users');

//   $('#createUserBtn').click((e)=>{
//     e.preventDefault();
//     let username = $('#usernameInput').val();
//     if(username.length > 0){
//       //Emit to the server the new user
//       socket.emit('new user', $('#usernameInput').val());
//       // Save the current user when created
//       currentUser = $('#usernameInput').val();
//       $('.usernameForm').remove();
//        // Have the main page visible
//       $('.mainContainer').css('display', 'flex');
//     }
//   })

//   $('#sendChatBtn').click((e) => {
//     e.preventDefault();
//     // Get the message text value
//     let message = $('#chatInput').val();
//     // Make sure it's not empty
//     if(message.length > 0){
//       // Emit the message with the current user to the server
//       socket.emit('new message', {
//         sender : currentUser,
//         message : message,
//       });
//       $('#chatInput').val("");
//     }
//   })

//   $('#newChannelBtn').click( () => {
//     let newChannel = $('#newChannelInput').val();
  
//     if(newChannel.length > 0){
//       // Emit the new channel to the server
//       socket.emit('new channel', newChannel);
//       $('#newChannelInput').val("");
//     }
//   })

//   //socket listeners
//   socket.on('new user', (username) => {
//     console.log(`✋ ${username} has joined the chat! ✋`);
//     // $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
//     io.emit('new user', username)
//   })

//   //Listen for new messages
//   socket.on('new message', (data) => {
//     // Send that data back to ALL clients
//     console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
//     io.emit('new message', data);
//   })

//   //Output the new message
//   socket.on('new message', (data) => {
//     $('.messageContainer').append(`
//       <div class="message">
//         <p class="messageUser">${data.sender}: </p>
//         <p class="messageText">${data.message}</p>
//       </div>
//     `);
//   })

//   socket.on('get online users', (onlineUsers) => {
//     //You may have not have seen this for loop before. It's syntax is for(key in obj)
//     //Our usernames are keys in the object of onlineUsers.
//     for(username in onlineUsers){
//       $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
//     }
//   })

//   //This fires when a user closes out of the application
//   socket.on('disconnect', () => {
//     //This deletes the user by using the username we saved to the socket
//     delete onlineUsers[socket.username]
//     io.emit('user has left', onlineUsers);
//   });

//   // Add the new channel to the channels list (Fires for all clients)
//   socket.on('new channel', (newChannel) => {
//     $('.channels').append(`<div class="channel">${newChannel}</div>`);
//   });

//   // Make the channel joined the current channel. Then load the messages.
//   // This only fires for the client who made the channel.
//   socket.on('user changed channel', (data) => {
//     $('.channel-current').addClass('channel');
//     $('.channel-current').removeClass('channel-current');
//     $(`.channel:contains('${data.channel}')`).addClass('channel-current');
//     $('.channel-current').removeClass('channel');
//     $('.message').remove();
//     data.messages.forEach((message) => {
//       $('.messageContainer').append(`
//         <div class="message">
//           <p class="messageUser">${message.sender}: </p>
//           <p class="messageText">${message.message}</p>
//         </div>
//       `);
//     });
//   })

// })