const Item = require('../models/item')
const User = require('../models/user')

function items (app) {
  
  // INDEX 
  app.get('/', (req, res) => {
    let currentUser = req.user;
    Item.find().populate('author')
    .then(items => {
      res.render('items-index', { items, currentUser });
    })
    .catch(err => {
      console.log(err);
    })
  })

  // NEW
  app.get('/items/new', (req, res) => {
    let currentUser = req.user;
    res.render('items-new', {title: "New Item" , currentUser});
  })

  app.post('/items/new', (req, res) => {
    // let currentUser = req.user;
    if (req.user) {
      var item = new Item(req.body);
      item.author = req.user._id;
      
      item.save()
        .then(item => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.items.unshift(item);
          user.save();
          // REDIRECT TO THE NEW ITEM
          res.redirect(`/items/${item._id}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  })

  // SHOW
  app.get('/items/:id', (req, res) => {
    let currentUser = req.user;
    Item.findById(req.params.id).then((item) => {
      res.render('items-show', { item, currentUser })
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // EDIT
  app.get('/items/:id/edit', (req, res) => {
    let currentUser = req.user;
    Item.findById(req.params.id, function(err, item) {
      res.render('items-edit', {item, title: "Edit Item"});
    })
  })

  // UPDATE
  app.put('/items/:id', (req, res) => {
    let currentUser = req.user;
    Item.findByIdAndUpdate(req.params.id, req.body)
      .then(item => {
        res.redirect(`/items/${item._id}`)
      })
      .catch(err => {
        console.log(err.message)
    })
  })

  // DELETE
  app.delete('/items/:id', function (req, res) {
    let currentUser = req.user;
    console.log("DELETED item")
    Item.findByIdAndRemove(req.params.id).then((item) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
}

module.exports = items