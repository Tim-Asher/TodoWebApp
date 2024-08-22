const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todosRouter = require("./routes/todos.Router");
const usersRouter = require("./routes/users.Router");
const globalErrorHandler = require("./utils/errorHandler");
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Explicitly allow your frontend's origin
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.options("*", cors());

app.use("/api/todos", todosRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(550, "The requested route is not exist."));
});

app.use(globalErrorHandler);

module.exports = app;
