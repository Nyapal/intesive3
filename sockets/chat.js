//chat.js
module.exports = (io, socket, onlineUsers) => {

  // Listen for "new user" socket emits
  socket.on('new user', (username) => {
    //Save the username as key to access the user's socket id
    onlineUsers[username] = socket.id;
    //Save the username to socket as well. This is important for later.
    socket["username"] = username;
    console.log(`✋ ${username} has joined the chat! ✋`);
    io.emit("new user", username);
  })
    
  //Listen for new messages
  socket.on('new message', (data) => {
  // Send that data back to ALL clients
  console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
  io.emit('new message', data);
  })

  //Listen for all users currently online
  socket.on('get online users', () => {
    //Send over the onlineUsers
    socket.emit('get online users', onlineUsers);
  })


}