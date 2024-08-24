// Import the mongoose package to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema (structure) for a todo document in MongoDB
const todoSchema = new mongoose.Schema({
  // The title of the todo item, stored as a string
  title: String,

  // A description of the todo item, stored as a string
  desc: String,

  // The date associated with the todo item, stored as a string
  date: String,

  // The time associated with the todo item, stored as a string
  time: String,

  // A string indicating if the todo item is urgent
  urgent: String,

  // Reference to the user who created the todo item
  author: {
    // Store the author's ID as an ObjectId, which references the User model
    type: mongoose.Schema.ObjectId,

    // Set up a relationship with the "User" model
    ref: "User",

    // Make the author field required, with a custom error message if not provided
    required: [true, "Todo must have an author!"],
  },
});

// Create a Mongoose model named "Todo" using the todoSchema
const Todo = mongoose.model("Todo", todoSchema);

// Export the Todo model so it can be used in other parts of the application
module.exports = Todo;
