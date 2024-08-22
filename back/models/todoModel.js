const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: String,
  time: String,
  urgent: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Todo must have a author!"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
