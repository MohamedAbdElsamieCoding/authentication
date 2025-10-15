import express from "express";

import usersController from "../controllers/users.controller.js";

const router = new express.Router();

router.route("/").get(usersController.getAllUsers);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

router.route("/delete/:id").delete(usersController.deleteAccount);

export default router;
