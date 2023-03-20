const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  category: String,
});

module.exports = mongoose.model("Menu", menuSchema);
