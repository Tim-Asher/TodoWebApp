module.exports = (err, req, res, next) => {
  const code = err.statusCode || 500;
  res.status(code).json({
    status: "faild",
    message: err.message,
  });
};
