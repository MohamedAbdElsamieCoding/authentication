import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";

export const verifyToken = (req, res, next) => {
  const authHeaders =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeaders) {
    const error = new AppError("token is required", 401);
    return next(error);
  }
  const token = authHeaders.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = new AppError("invalid Token", 401, httpStatusText.FAIL);
    return next(error);
  }
};
