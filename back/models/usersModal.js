const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "The user must have an email"],
      unique: true,
    },
    password: {
      type: String,
      minLength: [4, "The password must be at least 4 characters."],
      select: false,
      require: [true, "The password is required."],
    },
    passwordConfirm: {
      type: String,
      minLength: [4, "The password must be at least 4 characters."],
      select: false,
      require: [true, "The rePassword is required."],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "The passwords are not match",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("todos", {
  ref: "Todo",
  foreignField: "user",
  localField: "_id",
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "todos",
  });
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
  }
  next();
});

userSchema.methods.checkPassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
