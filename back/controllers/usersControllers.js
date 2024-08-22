const User = require("../models/usersModal");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.createOne = async (req, res, next) => {
  try {
    const newDoc = User.create(req.body);
    res.status(200).json({
      status: "success",
      doc: newDoc,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError(500, "Details are missing."));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError(500, "User has not found!"));
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError(403, "Email or password is incorrect"));
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    // expires: new Date(Date.now() + 86_400_000 * 14),
  });

  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {
  // 1. extract token from : a req.header or b from cookies
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, "Please login!"));
  const token = req.cookies.jwt;

  // 2. verify token and extract payload data
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded || !decoded.exp >= Date.now() / 1000) {
    return next(new AppError(403, "please login!"));
  }

  // 3. find user by id .
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(403, "please login!"));

  // if(user.passwordChangedAt > decoded.iat) return next(new AppError(401, "Login again"))

  // 4. upload user to req object.
  req.user = user;

  // 5. check if user rol
  // if(req.user.role !== 'premium' && req.usee is premium ==> later will refactor to a different function.role !== 'admin')
  //     return next(new AppError(403, 'Please subscribe to Premium to use this feature'))

  // go to the next function
  next();
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", {
    secure: true,
    httpOnly: true,
    sameSite: "None",
    // expires: new Date(Date.now() + 86_400_000 * 14),
  });

  res.status(200).json({
    status: "success",
    message: null,
  });
};
