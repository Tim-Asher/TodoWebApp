const Todo = require("../models/todoModel");
const asyncHandler = require("express-async-handler");

exports.getTodos = async (req, res, next) => {
  try {
    const data = await Todo.find();
    res.status(200).json({
      status: "success",
      docs: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.getTodosByUser = async (req, res, next) => {
  try {
    const data = await Todo.find({ author: req.user._id });
    res.status(200).json({
      status: "success",
      docs: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.setTodo = async (req, res, next) => {
  try {
    const newItem = await Todo.create(req.body);
    res.status(200).json({
      status: "success",
      doc: newItem,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updatedItem = await Todo.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: updatedItem,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};

exports.deleteTodos = async (req, res, next) => {
  try {
    await Todo.deleteMany();
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err,
    });
  }
};
