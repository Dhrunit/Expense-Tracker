const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? err.code : res.statusCode;
  statusCode === "ENOENT" ? (statusCode = 200) : (statusCode = statusCode);
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
