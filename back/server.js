// Import the dotenv package to load environment variables from a .env file
const dotenv = require("dotenv");
// Import the connectDB function to establish a connection to the MongoDB database
const { connectDB } = require("./utils/connectDB");
// Import the Express application instance
const app = require("./app");

// Load environment variables from the .env file
dotenv.config();

// Construct the MongoDB connection string by replacing placeholders with actual values
const connectionStr = process.env.MONGO_DB_ATLAS.replace(
  "<password>",
  process.env.MONGO_DB_ATLAS_PASSWORD
).replace("<username>", process.env.MONGO_DB_ATLAS_USERNAME);

// Connect to the MongoDB database using the constructed connection string
connectDB(connectionStr);

// Define the port number for the server; fallback to 8001 if 8000 is not available
const port = 8000 || 8001;

// Start the Express server, listening on the specified port and IP address
app.listen(port, "127.0.0.1", () => {
  // Log a message indicating that the server is running and listening on the specified port
  console.log(`Server is listening to port ${port}`);
});
