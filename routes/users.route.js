import express from "express";

import usersController from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import userRole from "../utils/userRole.js";
import allowedTo from "../middlewares/allowedTo.js";

const router = new express.Router();

router
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRole.ADMIN, userRole.MANAGER),
    usersController.getAllUsers
  );

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

router.route("/delete/:id").delete(usersController.deleteAccount);

export default router;
