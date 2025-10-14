import express from "express";

const router = new express.Router();
import * as usersController from "../controllers/users.controller.js";
import { validationSchema } from "../middlewares/validationSchema.js";

router.route("/").get(usersController.getAllUsers);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

export default router;
