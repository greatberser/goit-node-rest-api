import express from "express";

import userController from "../controllers/userControllers.js";

import authtenticate from "../middlewars/authtenticate.js";

import upload from "../middlewars/upload.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/current", authtenticate, userController.getCurrent);

userRouter.post("/logout", authtenticate, userController.logout);

userRouter.patch(
    "/avatars",
    upload.single("photo"),
    authtenticate,
    userController.changeAvatar
);

userRouter.get("/verify/:verificationToken", userController.verify);

userRouter.post("/verify", userController.verifyAgain);

export default userRouter;
