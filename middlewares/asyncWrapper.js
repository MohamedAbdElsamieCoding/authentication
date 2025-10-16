import logger from "../utils/logger.js";

export const asyncWrapper = (asyncFn) => {
  return (req, res, next) => {
    asyncFn(req, res, next).catch((err) => {
      logger.error(`Error occurred: ${err.message}`);
      next(err);
    });
  };
};
