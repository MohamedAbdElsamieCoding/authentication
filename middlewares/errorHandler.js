import httpStatusText from "../utils/httpStatusText.js";

export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    message: err.message || "Internal server error",
  });
};
