// Import the mongoose package to interact with MongoDB
const mongoose = require("mongoose");

// Import bcryptjs for hashing passwords
const bcrypt = require("bcryptjs");

// Import crypto for generating cryptographic functions (not used in this snippet but often used for token generation)
const crypto = require("crypto");

// Define the schema (structure) for a user document in MongoDB
const userSchema = new mongoose.Schema({
  // User's email address
  email: {
    type: String,
    // Ensure the email field is required with a custom error message
    required: [true, "The user must have an email"],
    // Ensure the email is unique in the collection
    unique: true,
  },

  // User's password
  password: {
    type: String,
    // Ensure the password has a minimum length with a custom error message
    minLength: [4, "The password must be at least 4 characters."],
    // Exclude the password field from queries by default
    select: false,
    // Ensure the password field is required with a custom error message
    require: [true, "The password is required."],
  },

  // Confirmation password field used for validation during signup
  passwordConfirm: {
    type: String,
    // Ensure the passwordConfirm has a minimum length with a custom error message
    minLength: [4, "The password must be at least 4 characters."],
    // Exclude the passwordConfirm field from queries by default
    select: false,
    // Ensure the passwordConfirm field is required with a custom error message
    require: [true, "The rePassword is required."],
    // Validate that passwordConfirm matches the password field
    validate: {
      // Custom validator function to compare passwordConfirm with password
      validator: function (el) {
        return this.password === el;
      },
      // Custom error message if validation fails
      message: "The passwords do not match",
    },
  },
});

// Define a virtual field for the user's todos
userSchema.virtual("todos", {
  // Reference to the "Todo" model
  ref: "Todo",
  // Field in the Todo model that links to the User model
  foreignField: "author",
  // Field in the User model that links to the Todo model
  localField: "_id",
});

// Middleware to populate the todos field for find queries
userSchema.pre(/^find/, function (next) {
  // Populate the todos field in the query results
  this.populate({
    path: "todos",
  });
  // Proceed to the next middleware or query handler
  next();
});

// Middleware to hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (this.isModified("password")) {
    // Generate a salt with 8 rounds
    const salt = await bcrypt.genSalt(8);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Remove the passwordConfirm field
    this.passwordConfirm = undefined;
  }
  // Proceed to the next middleware or query handler
  next();
});

// Method to check if a provided password matches the hashed password
userSchema.methods.checkPassword = async function (password, hashedPassword) {
  // Compare the provided password with the stored hashed password
  return await bcrypt.compare(password, hashedPassword);
};

// Create a Mongoose model named "User" using the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;
