import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/userServices.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const newUser = await authServices.signup(req.body);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid"); 
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid"); 
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await authServices.setToken(user._id, token);

    res.json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authServices.setToken(_id);

    res.json({
      message: "Signout success",
    });
  } catch (error) {
    next(error);
  }
};

const changeAvatar = async (req, res, next) => {
    try {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;

    Jimp.read(oldPath, (err, lenna) => {
        if (err) throw err;
        lenna.resize(250, 250).write(`${avatarsDir}\\${filename}`);
        fs.rm(oldPath);
    });
    const avatarURL = path.join("avatars", filename);

    await authServices.setAvatar(_id, avatarURL);
    return res.json({ avatarURL });
    } catch (error) {
    next(error);
    }
};

export default {
  register,
  login,
  getCurrent,
  logout,
  changeAvatar,
};