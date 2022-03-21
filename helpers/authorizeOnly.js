exports.authorizeOnly = (...roles) => function (req, res, next) {
  if (!roles.includes(req.user.role)) {
    throw new Error("Unauthorized access");
  }

  next();
}