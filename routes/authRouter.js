import express from "express";

import authController from "../controllers/authControllers";

import authtenticate from "../middlewars/authtenticate";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);

authRouter.post("/signin", authController.signin);

authRouter.get("/current", authtenticate, authController.getCurrent);

authRouter.post("/signout", authtenticate, authController.signout);

export default authRouter;