var mongoose  = require('mongoose');
var Photo = require('../models/photo');
var upload = require('./upload');

function photos (app) {

  app.get('/upload', function(req, res) {
    Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
      if(err) throw err;
      res.render('index', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });
    });
  })

  // app.get('/upload', function(req, res) {
  //   res.render('upload')
  // })

  app.get('/gallery', function(req, res) {
    res.render('gallery')
  })
  
}

module.exports = photos



// app.use(multer({ dest: __dirname + '../public/uploads/',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));

//  app.post('/api/photo',function(req,res){
//   var newItem = new Item();
//   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//   newItem.img.contentType = 'image/png';
//   newItem.save();
//  });


// const Item = require('../models/item')
// const User = require('../models/user')

// var uploading = multer({
//   dest: __dirname + '../public/uploads/',
//   limits: {fileSize: 1000000, files:1}
// })

// router.post('/upload', function(req, res) {

// })


// function images (app) {
//   app.post('/upload', uploading, function(req, res) {


//   });

// }

// module.exports = router