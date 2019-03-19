const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/lost-and-found', { useNewUrlParser: true });

const items = require('./controllers/items')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

items(app)

app.listen(3000, () => {
  console.log('listening on port 3000!')
})

module.exports = app