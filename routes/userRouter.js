import express from "express";

import userController from "../controllers/userControllers.js";

import authtenticate from "../middlewars/authtenticate.js";

const authRouter = express.Router();

authRouter.post("/register", userController.register);

authRouter.post("/login", userController.login);

authRouter.get("/current", authtenticate, userController.getCurrent);

authRouter.post("/logout", authtenticate, userController.logout);

export default authRouter;