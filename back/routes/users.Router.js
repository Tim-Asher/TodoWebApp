// Import the express package to create an Express router
const express = require("express");

// Import controller functions for user-related operations
const {
  createOne,
  login,
  protect,
  logout,
} = require("../controllers/usersControllers");

// Create an instance of an Express router
const router = express.Router();

// Define a route to handle POST requests for user registration
router.route("/register").post(createOne);

// Define a route to handle POST requests for user login
router.route("/login").post(login);

// Define a route to handle POST requests for user logout
router.route("/logout").post(logout);

// Define a route to validate the JWT token and return user data
router.route("/validateToken").post(protect, (req, res, next) => {
  // Respond with status 200 and the authenticated user's data
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

// Export the router to be used in other parts of the application
module.exports = router;
