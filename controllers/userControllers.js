import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Jimp from "jimp";
import fs from "fs/promises";
import path from "path";
import {nanoid} from "nanoid";

import * as userServices from "../services/userServices.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const avatarUrl = gravatar.url(email, { r: "pg" }, true);
    const newUser = await authServices.register(...req.body, avatarUrl);
    const verificationToken = nanoid();

    const verifyEmail = {
      to: [email],
      subject: "Verify email",
      html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to verify</a>`,
    };
  
    await sendEmail(verifyEmail);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
      avatarUrl: newUser.avatarUrl,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.findUser({ email });
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
    await userServices.setToken(user._id, token);

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
    await userServices.setToken(_id);

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

    const lenna = await Jimp.read(oldPath);
    await lenna.resize(250, 250).writeAsync(`${avatarsDir}/${filename}`);
    await fs.unlink(oldPath);

    const avatarUrl = path.join("avatars", filename);

    await userServices.setAvatar(_id, avatarUrl);

    return res.json({ avatarUrl });
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res) => {
  const { verificationToken } = req.body;
  const user = await userServices.findUser({
    verificationToken,
  });

  if(!user) throw HttpError(404);

  await usersService.updateUser(
    { _id: user._id },
    { verify: true, verificationToken: "null" }
  );

  res.status(200).json({ message: "Verification successful" });
}

const verifyAgain = async (req, res) => {
  const { email } = req.body;
  const user = await usersService.findUser({ email });

  if (!user) throw HttpError(404);

  if (user.verify) {
    return res.status(400).json({
      message: "Verification has already been passed",
    });
  }

  const verifyEmail = {
    to: [email, "artem_tokarev@ukr.net"],
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to verify</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};


export default {
  register,
  login,
  getCurrent,
  logout,
  changeAvatar,
  verify,
  verifyAgain,
};