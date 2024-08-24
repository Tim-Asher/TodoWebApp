// Import the required packages and modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todosRouter = require("./routes/todos.Router");
const usersRouter = require("./routes/users.Router");
const globalErrorHandler = require("./utils/errorHandler");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware for logging HTTP requests and responses
app.use(morgan("dev"));

// Middleware to parse cookies from requests
app.use(cookieParser());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
// Allows requests from http://localhost:3000 and supports credentials (cookies)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Pre-flight requests (OPTIONS) handler for CORS
app.options("*", cors());

// Mount the todos router to handle routes starting with /api/todos
app.use("/api/todos", todosRouter);

// Mount the users router to handle routes starting with /api/users
app.use("/api/users", usersRouter);

// Middleware to handle all undefined routes (404 errors)
app.all("*", (req, res, next) => {
  next(new AppError(550, "The requested route does not exist."));
});

// Middleware to handle and format errors globally
app.use(globalErrorHandler);

// Export the Express application instance
module.exports = app;
