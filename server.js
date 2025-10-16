import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import dotenv from "dotenv";
import hpp from "hpp";
import mongoose from "mongoose";
import logger from "./utils/logger.js";
import usersRouter from "./routes/users.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);
app.use(hpp());

app.use(requestLogger);

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    logger.info(`Database is connected ${connect.connection.host}`);
  } catch (err) {
    logger.error(`Database is failed to connect ${err.message}`);
    process.exit(1);
  }
};

app.use("/api/users", usersRouter);

app.use(errorHandler);

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    logger.info(`Environment : ${process.env.NODE_ENV}`);
  });
};
startServer();
