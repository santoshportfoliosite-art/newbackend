export default function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || "Internal Server Error"
  };
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
}
