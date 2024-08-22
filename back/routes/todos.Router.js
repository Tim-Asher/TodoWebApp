const express = require("express");
const {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
  deleteTodos,
  getTodosByUser,
} = require("../controllers/todoControllers");

const { protect } = require("../controllers/usersControllers");

const router = express.Router();

router
  .route("/")
  .get(protect, getTodosByUser)
  .post(
    protect,
    (req, res, next) => {
      req.body.author = req.user._id;
      next();
    },
    setTodo
  );

router.route("/deleteAll").delete(deleteTodos);

router.route("/:id").patch(updateTodo).delete(deleteTodo);

module.exports = router;
