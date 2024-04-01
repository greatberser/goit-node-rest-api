import express from "express";

import userController from "../controllers/userControllers.js";

import authtenticate from "../middlewars/authtenticate.js";

const userRouter = express.Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.get("/current", authtenticate, userController.getCurrent);

userRouter.post("/logout", authtenticate, userController.logout);

userRouter.patch(
    "/users/avatars",
    upload.single("photo"),
    authtenticate,
    authController.changeAvatar
);

export default userRouter;
