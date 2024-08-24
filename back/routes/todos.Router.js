// Import the express package to create an Express router
const express = require("express");

// Import the controller functions for handling todo-related routes
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  getTodosByUser,
} = require("../controllers/todoControllers");

// Import the protect middleware to ensure routes are accessed by authenticated users
const { protect } = require("../controllers/usersControllers");

// Create a new Express router instance
const router = express.Router();

// Define routes for the "/" path
router
  .route("/")
  // Handle GET requests to fetch todos by the authenticated user
  .get(protect, getTodosByUser)
  // Handle POST requests to create a new todo
  .post(
    // Apply the protect middleware to ensure the user is authenticated
    protect,
    // Middleware to add the authenticated user's ID to the request body
    (req, res, next) => {
      req.body.author = req.user._id;
      // Proceed to the next middleware or route handler
      next();
    },
    // Handle the creation of a new todo
    setTodo
  );

// Define a route for deleting all todos
router.route("/deleteAll").delete(deleteTodos);

// Define routes for a specific todo item based on the ID
router
  .route("/:id")
  // Handle PATCH requests to update a specific todo item
  .patch(updateTodo)
  // Handle DELETE requests to delete a specific todo item
  .delete(deleteTodo);

// Export the router to be used in other parts of the application
module.exports = router;
