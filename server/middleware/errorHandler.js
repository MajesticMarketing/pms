// page not found, return
export const pageNotFound = (req, res, next) => {
  try {
    const error = new Error(`Page Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  } catch (error) {
    res.status(500).Error(error.message);
  }
};
// Error handler for apis
export const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
  next();
};
