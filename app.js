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
// const upload = multer({dest: 'uploads/'})
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/lost-and-found', { useNewUrlParser: true });

const items = require('./controllers/items')
const auth = require('./controllers/auth.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use('/public', express.static('public'))

// app.use(multer({ dest: './uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

// app.post('/photos/upload', )

// rename: function (fieldname, filename) {
//   return filename;
// },

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// app.post('/upload', upload.single('image'), function (req, res, next) {
//   console.log(req.file)
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('/upload', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('/upload', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('/upload', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

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


server.listen(process.env.PORT || 3000, () => {
  console.log('listening on port 3000!')
})


module.exports = app