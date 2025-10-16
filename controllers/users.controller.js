import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import User from "../models/User.js";
import { AppError } from "../utils/appError.js";
import httpStatusText from "../utils/httpStatusText.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJwt } from "../utils/generateJwt.js";

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).skip(skip).limit(limit);
  res.status(200).json({ status: "success", data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = new AppError("user already exists", 400, httpStatusText.FAIL);
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateJwt({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });

  newUser.token = token;
  await newUser.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "user registered successfully",
    data: { user: newUser },
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new AppError(
      "email and password are required",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    const error = new AppError(
      "invalid email or password",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = generateJwt({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    user.token = token;
    await user.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = new AppError(
      "invalid email or password",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }
});

const deleteAccount = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    const error = new AppError("user not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "user deleted successfully",
    data: { user },
  });
});
export default { getAllUsers, register, login, deleteAccount };
