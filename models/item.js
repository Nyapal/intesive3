const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = mongoose.model('Item', {
  name: String,
  desc: String,
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = Item;