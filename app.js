const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/lost-and-found', { useNewUrlParser: true });


// let items = [
//     { name: "iPhone", desc: "n/a" },
//     { name: "Notebook", desc: "black leatherbound journal" }
//   ]

const Item = mongoose.model('Item', {
name: String,
desc: String,
// If an item is lost it is false, if it is found it is true. Lost is default setting
status: Boolean
});

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

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
});

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

app.listen(3000, () => {
  console.log('listening on port 3000!')
})