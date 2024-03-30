import bcrypt from "bcrypt";

import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const findUserById = (id) => User.findById(id);

export const register = async (data) => {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  return User.create({ ...data, password: hashPassword });
};

export const setToken = (id, token = "") =>
  User.findByIdAndUpdate(id, { token });

export const setAvatar = (id, avatarUrl) =>
  User.findByIdAndUpdate(id, { avatarUrl });
