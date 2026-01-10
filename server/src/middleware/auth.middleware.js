// Example middleware for authentication
// Middleware will handle cross-cutting concerns

export const authenticate = (req, res, next) => {
  // Add authentication logic here
  next();
};

export const errorHandler = (err, req, res, next) => {
  // Add error handling logic here
  res.status(err.status || 500).json({ error: err.message });
};
