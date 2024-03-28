import bcrypt from "bcrypt";

import user from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const findUserById = (id) => User.findById(id);

export const signup = async (data) => {
  const { password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  return user.create({ ...data, password: hashPassword });
};

export const setToken = (id, token = "") =>
  user.findByIdAndUpdate(id, { token });