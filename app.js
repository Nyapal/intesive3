require('dotenv').config();
//app.js
const express = require('express')
const app = express()
const engines = require('consolidate');
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
// const fileUpload = require('express-fileupload');
const multer = require("multer");
const fs = require('fs');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lost-and-found', { useNewUrlParser: true });

const items = require('./controllers/items')
const auth = require('./controllers/auth.js')
const photos = require('./controllers/photos.js')

app.engine('jade', engines.jade);
//app.engine('handlebars', engines.handlebars);
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
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
photos(app)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
  });
  const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
  });
  const parser = multer({ storage: storage })

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!')
})

app.post('/api/images', parser.single("image"), (req, res) => {
  console.log(req.file) // to see what is returned to you
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;
  Image.create(image) // save image information in database
    .then(newImage => res.json(newImage))
    .catch(err => console.log(err));
});

module.exports = app