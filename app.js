require('dotenv').config();
//app.js
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server);
let nicknames = [];

io.sockets.on('connection', function(socket){
  socket.on('new user', function(data, callback) {
    console.log('a new user has connected')
    if (nicknames.indexOf(data) != -1) {
      console.log('username taken')
      callback(false)
    } else {
      console.log('username not taken')
      callback(true)
      socket.nickname = data;
      nicknames.push(socket.nickname)
      io.sockets.emit('usernames', nicknames)
    }
  })
  
  socket.on('send message', function(data) {
    io.sockets.emit('new message', data);
  })
})

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

server.listen(3000, () => {
  console.log('listening on port 3000!')
})

module.exports = app