import logger from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  logger.http(`${req.method} - ${req.url} - ${req.ip}`);
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? "red" : "green";
    logger.http(
      `${req.method} - ${req.originalUrl} - ${res.statusCode} - ${duration}ms `,
      { color: statusColor }
    );
    originalEnd.call(this, chunk, encoding);
  };
  next();
};
