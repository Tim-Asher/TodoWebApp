const express = require("express");
const {
  createOne,
  login,
  protect,
  logout,
} = require("../controllers/usersControllers");

const router = express.Router();

router.route("/register").post(createOne);

router.route("/login").post(login);

router.route("/logout").post(logout);

router.route("/validateToken").post(protect, (req, res, next) => {
  res.status(200).json({
    status: "success",
  });
});

module.exports = router;
