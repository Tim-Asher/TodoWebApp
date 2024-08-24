// Export a function to handle errors in the Express application
module.exports = (err, req, res, next) => {
  // Determine the HTTP status code from the error object or default to 500 (Internal Server Error)
  const code = err.statusCode || 500;

  // Send a JSON response with the status code and error message
  res.status(code).json({
    status: "faild", // Note: "faild" seems to be a typo; it should be "failed" or "failure"
    message: err.message, // Include the error message from the error object
  });
};
