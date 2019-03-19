const mongoose = require('mongoose');

const Item = mongoose.model('Item', {
  name: String,
  desc: String
});

module.exports = Item;