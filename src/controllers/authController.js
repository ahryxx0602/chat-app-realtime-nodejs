// src/controllers/authController.js
const { generateToken } = require("../utils/jwt");
const authService = require("../services/authService");

exports.getLoginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

exports.getRegisterPage = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.registerUser(username, password);
  res.redirect("/login"); // redirect sau khi đăng ký
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUser(username, password);

  if (!user) {
    return res
      .status(401)
      .render("error", { title: "Đăng nhập thất bại", layout: false });
  }

  const token = generateToken({ id: user._id, username: user.username });
  res.redirect(
    `/chat?username=${encodeURIComponent(user.username)}&token=${token}`
  );
};

exports.getChatPage = (req, res) => {
  const { username, token } = req.query;
  if (!username || !token) {
    return res.redirect("/login");
  }
  res.render("chat", { username, token, title: "Chat Room" });
};
