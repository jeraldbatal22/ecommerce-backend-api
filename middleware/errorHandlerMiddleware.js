exports.errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: 500,
    message: 'Something went wrong, try again later',
    errors: null
  }

  // VALIDATION ERROR
  if (err.name === "ValidationError") {
    defaultError.statusCode = 400
    defaultError.errors = Object.values(err.errors).map((val) => val.message)
    defaultError.message = "Validation Error";
  }

  // MONGOSERVER ERROR
  if (err.name === "MongoServerError") {
    defaultError.statusCode = 400
    defaultError.errors = `${Object.keys(err.keyValue)} has to be unique`
    defaultError.message = "Validation Error";
  }

  // THROW ERROR
  if (err.name === "Error") {
    defaultError.statusCode = 404
    defaultError.errors = err.message
    defaultError.message = "Error";
  }

  // JSON WEBTOKEN ERROR
  if (err.name === "JsonWebTokenError") {
    defaultError.statusCode = 401
    defaultError.errors = `${err.message}, invalid token`
    defaultError.message = "Token Error";
  }

  // CAST ERROR 
  if (err.name === "CastError") {
    defaultError.statusCode = 400
    defaultError.errors = 'Resource not found'
    defaultError.message = "Cast Error";
  }

  // res.status(403).json({ status: "error", stack: process.env.NODE_ENV === 'production' ? null : err.stack, message: 'Bad request' });
  res.status(defaultError.statusCode).json({ errors: defaultError.errors ? defaultError.errors : [], message: defaultError.message });
}