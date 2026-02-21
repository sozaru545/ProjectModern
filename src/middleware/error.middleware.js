module.exports = function errorHandler(err, req, res, next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(status).json({
    message: err.message || "Server error",
    details: process.env.NODE_ENV === "production" ? undefined : {
      stack: err.stack,
      path: req.originalUrl
    }
  });
};