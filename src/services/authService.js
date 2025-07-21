// src/services/authService.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.registerUser = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return await User.create({ username, password: hashed });
};

exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};
