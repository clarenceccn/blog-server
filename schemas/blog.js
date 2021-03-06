const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blog = new Schema(
  {
    title: String,
    body: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blog);