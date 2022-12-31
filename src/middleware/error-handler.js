const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({ err: "something went wrong,please try again" });
};

module.exports = errorHandlerMiddleware;
