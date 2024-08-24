// Import the User model
const User = require("../models/usersModal");

// Import the AppError class for handling and returning errors
const AppError = require("../utils/AppError");

// Import the jsonwebtoken package for creating and verifying JWT tokens
const jwt = require("jsonwebtoken");

// Destructure the promisify function from the util module for converting callbacks to promises
const { promisify } = require("util");

// Controller to create a new user document
exports.createOne = async (req, res, next) => {
  try {
    // Create a new user document using the data from the request body
    const newDoc = User.create(req.body);

    // Respond with status 200 and send the created document
    res.status(200).json({
      status: "success",
      doc: newDoc,
    });
  } catch (err) {
    // Handle errors by responding with status 500 and the error object
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

// Controller to log in a user and generate a JWT token
exports.login = async (req, res, next) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password)
    return next(new AppError(500, "Details are missing."));

  // Find the user by email and include the password in the query
  const user = await User.findOne({ email }).select("+password");

  // Check if the user exists
  if (!user) return next(new AppError(500, "User not found!"));

  // Verify if the provided password matches the user's password
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError(403, "Email or password is incorrect"));

  // Generate a JWT token with the user's ID as payload
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Set the JWT token as a cookie in the response
  res.cookie("jwt", token, {
    secure: true, // Ensure the cookie is only sent over HTTPS
    httpOnly: true, // Make the cookie inaccessible to JavaScript on the client-side
    sameSite: "None", // Allow the cookie to be sent across different domains
    // expires: new Date(Date.now() + 86_400_000 * 14), // Uncomment to set an expiration date for the cookie
  });

  // Respond with status 200 and send the generated token
  res.status(200).json({
    status: "success",
    token,
  });
};

// Middleware to protect routes and ensure the user is authenticated
exports.protect = async (req, res, next) => {
  // 1. Extract the JWT token from the request headers or cookies
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, "Please login!"));
  const token = req.cookies.jwt;

  // 2. Verify the token and extract the payload data
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the token is valid and has not expired
  if (!decoded || decoded.exp < Date.now() / 1000) {
    return next(new AppError(403, "Please login!"));
  }

  // 3. Find the user by the ID from the token payload
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(403, "Please login!"));

  // 4. Attach the user object to the request object for access in subsequent middleware/functions
  req.user = user;

  // Move on to the next middleware or route handler
  next();
};

// Controller to log out a user by clearing the JWT cookie
exports.logout = (req, res, next) => {
  // Clear the JWT cookie by setting it to an empty string
  res.cookie("jwt", "", {
    secure: true, // Ensure the cookie is only sent over HTTPS
    httpOnly: true, // Make the cookie inaccessible to JavaScript on the client-side
    sameSite: "None", // Allow the cookie to be sent across different domains
    // expires: new Date(Date.now() + 86_400_000 * 14), // Uncomment to set an expiration date for the cookie
  });

  // Respond with status 200 and send a success message
  res.status(200).json({
    status: "success",
    message: null,
  });
};
