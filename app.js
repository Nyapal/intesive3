require('dotenv').config();
//app.js
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  socket.on('send message', function(data) {
    io.sockets.emit('new message', data);
  })
})

// //Socket.io
// //We'll store our online users here
// let onlineUsers = {};
// io.on("connection", (socket) => {
//   //Make sure to send the users to our chat file
//   require('./sockets/chat.js')(io, socket, onlineUsers);
// })

//more app.js 
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://localhost/lost-and-found', { useNewUrlParser: true });

const items = require('./controllers/items')
const auth = require('./controllers/auth.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use('/public', express.static('public'))

var checkAuth = (req, res, next) => {
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};

app.use(checkAuth);

items(app)
auth(app)

//socket.io

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

server.listen(3000, () => {
  console.log('listening on port 3000!')
})

module.exports = app