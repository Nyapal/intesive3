const Item = require('../models/item')

function items (app) {

  // INDEX 
  app.get('/', (req, res) => {
    Item.find()
    .then(items => {
      res.render('items-index', { items: items });
    })
    .catch(err => {
      console.log(err);
    })
  })

  // NEW
  app.get('/items/new', (req, res) => {
    res.render('items-new', {title: "New Item"});
  })

  // CREATE
  app.post('/items', (req, res) => {
    Item.create(req.body).then((item) => {
      console.log(item);
      res.redirect(`/items/${item._id}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // SHOW
  app.get('/items/:id', (req, res) => {
    Item.findById(req.params.id).then((item) => {
      res.render('items-show', { item: item })
    }).catch((err) => {
      console.log(err.message);
    })
  })

  // EDIT
  app.get('/items/:id/edit', (req, res) => {
    Item.findById(req.params.id, function(err, item) {
      res.render('items-edit', {item: item, title: "Edit Item"});
    })
  })

  // UPDATE
  app.put('/items/:id', (req, res) => {
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
    console.log("DELETE item")
    Item.findByIdAndRemove(req.params.id).then((item) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
}

module.exports = items