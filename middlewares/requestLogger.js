import logger from "../utils/logger.js";

const requestLogger = (req, res, next) => {
  const start = Date.now();
  logger.http(`${req.method} - ${req.url} - ${req.ip}`);

  next();
};
