import express from "express";

import userController from "../controllers/userControllers.js";

import authtenticate from "../middlewars/authtenticate.js";

import upload from "../middlewars/upload.js"

const authRouter = express.Router();

authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/current", authtenticate, userController.getCurrent);

authRouter.post("/logout", authtenticate, userController.logout);

authRouter.patch(
    "/avatars",
    upload.single("photo"),
    authtenticate,
    userController.changeAvatar
  );

export default authRouter;