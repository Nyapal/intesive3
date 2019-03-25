// jQuery(function($){
//   let socket = io.connect();
//   let $messageForm = $('#send-message');
//   let $messageBox = $('#message');
//   let $chat = $('#chat');

//   console.log($messageBox)
//   $messageForm.submit(function(e) {
//     e.preventDefault()
//     socket.emit('send message', $messageBox.val())
//     console.log($messageBox.val())
//     $messageBox.val('');
//   })

//   socket.on('new message', function(data) {
//     $chat.append(data + '<br/>')
//   })
// })
//chat.js
// module.exports = (io, socket, onlineUsers, channels) => {

//   // Listen for "new user" socket emits
//   socket.on('new user', (username) => {
//     //Save the username as key to access the user's socket id
//     onlineUsers[username] = socket.id;
//     //Save the username to socket as well. This is important for later.
//     socket["username"] = username;
//     console.log(`✋ ${username} has joined the chat! ✋`);
//     io.emit("new user", username);
//   })
    
//   //Listen for new messages
//   socket.on('new message', (data) => {
//   // Send that data back to ALL clients
//   console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
//   io.emit('new message', data);
//   })

//   //Listen for all users currently online
//   socket.on('get online users', () => {
//     //Send over the onlineUsers
//     socket.emit('get online users', onlineUsers);
//   })

//   //....
//   socket.on('new channel', (newChannel) => {
//     //Save the new channel to our channels object. The array will hold the messages.
//     channels[newChannel] = [];
//     //Have the socket join the new channel room.
//     socket.join(newChannel);
//     //Inform all clients of the new channel.
//     io.emit('new channel', newChannel);
//     //Emit to the client that made the new channel, to change their channel to the one they made.
//     socket.emit('user changed channel', {
//       channel : newChannel,
//       messages : channels[newChannel]
//     });
//   })


// }