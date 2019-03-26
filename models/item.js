const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = mongoose.model('Item', {
  name: String,
  desc: String,
  img: { data: Buffer, contentType: String },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = Item;