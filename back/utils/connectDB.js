// Import the mongoose package to interact with MongoDB
const mongoose = require("mongoose");

// Define an asynchronous function to connect to the MongoDB database
exports.connectDB = async (conStr) => {
  try {
    // Attempt to connect to the database using the provided connection string
    const con = await mongoose.connect(conStr);
    // If the connection is successful, log a message with the host information
    if (con) console.log(`The db is connected to ${con.connection.host}`);
  } catch (err) {
    // If an error occurs, log the error
    console.log(err);
  }
};
