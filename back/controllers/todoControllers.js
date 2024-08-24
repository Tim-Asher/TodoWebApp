// Import the Todo model
const Todo = require("../models/todoModel");

// Import asyncHandler middleware to catch errors in async routes
const asyncHandler = require("express-async-handler");

// Get all todos from the database
exports.getTodos = async (req, res, next) => {
  try {
    // Fetch all todo documents from the MongoDB collection
    const data = await Todo.find();

    // Respond with status 200 and send the fetched documents
    res.status(200).json({
      status: "success",
      docs: data,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Get todos by the current authenticated user
exports.getTodosByUser = async (req, res, next) => {
  try {
    // Fetch todo documents where the author field matches the authenticated user's ID
    const data = await Todo.find({ author: req.user._id });

    // Respond with status 200 and send the fetched documents
    res.status(200).json({
      status: "success",
      docs: data,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Create a new todo item
exports.setTodo = async (req, res, next) => {
  try {
    // Create a new todo document in the MongoDB collection using the request body
    const newItem = await Todo.create(req.body);

    // Respond with status 200 and send the created document
    res.status(200).json({
      status: "success",
      doc: newItem,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Update an existing todo item
exports.updateTodo = async (req, res, next) => {
  try {
    // Find the todo document by ID and update it with the request body
    const updatedItem = await Todo.findByIdAndUpdate(req.params.id, req.body);

    // Respond with status 200 and send the updated document
    res.status(200).json({
      status: "success",
      data: updatedItem,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Delete a specific todo item
exports.deleteTodo = async (req, res, next) => {
  try {
    // Find the todo document by ID and delete it from the MongoDB collection
    await Todo.findByIdAndDelete(req.params.id);

    // Respond with status 200 and indicate the deletion was successful
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Delete all todo items
exports.deleteTodos = async (req, res, next) => {
  try {
    // Delete all todo documents from the MongoDB collection
    await Todo.deleteMany();

    // Respond with status 200 and indicate the deletion was successful
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};
