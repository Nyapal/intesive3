$(document).ready(() => {
  //Connect to the socket.io server
  const socket = io.connect();

  $('#createUserBtn').click((e)=>{
    e.preventDefault();
    let username = $('#usernameInput').val();
    if(username.length > 0){
      //Emit to the server the new user
      socket.emit('new user', username);
      $('.usernameForm').remove();
    }
  })

  //socket listeners
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the chat! ✋`);
  })


})