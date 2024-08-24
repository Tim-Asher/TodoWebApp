// Define a custom error class extending the built-in Error class
class AppError extends Error {
  // Constructor to initialize the error with a status code and message
  constructor(statusCode, message) {
    // Call the parent class constructor with the error message
    super(message);
    // Set the status code property on the error instance
    this.statusCode = statusCode;
  }
}

// Export the AppError class to be used in other parts of the application
module.exports = AppError;
