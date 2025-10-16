import mongoose from "mongoose";
import validator from "validator";
import userRole from "../utils/userRole.js";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    token: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: [userRole.ADMIN, userRole.MANAGER, userRole.USER],
      default: userRole.USER,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);
export default User;
