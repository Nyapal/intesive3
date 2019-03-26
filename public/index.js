jQuery(function($){
  let socket = io.connect();
  let $nickForm = $('#setNick');
  let $nickError = $('#nickError');
  let $nickBox = $('#nickname')
  let $messageForm = $('#send-message');
  let $messageBox = $('#message');
  let $chat = $('#chat');

  $nickForm.submit(function(e) {
    e.preventDefault();
    socket.emit('new users', $nickBox.val(), function(data) {
      if(data) {
        console.log('im here')
        $('#nickWrap').hide()
        $('#contentWrap').show()
      } else {
        console.log('not working :(')
        $nickError.html('Username is taken. Try again')
      }
    })
    $nickBox.val('')
  })

  $messageForm.submit(function(e) {
    e.preventDefault()
    socket.emit('send message', $messageBox.val())
    $messageBox.val('');
  })

  socket.on('new message', function(data) {
    $chat.append(data + '<br/>')
  })
})

function showLogin() {
  document.getElementById('login').style.display = "block";
  document.getElementById('landingImage').style="float:left;width:50px;height:42px;";
  document.getElementById('signUpButton').style.display = "none";
  document.getElementById('loginButton').style.display = "none";
  document.getElementById('lookInsideButton').style.display = "none";
}

function showSignUp() {
  document.getElementById('signUp').style.display = "block";
  document.getElementById('landingImage').style="float:left;width:50px;height:42px;";
  document.getElementById('signUpButton').style.display = "none";
  document.getElementById('loginButton').style.display = "none";
}