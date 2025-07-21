const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Redirect trang chủ về /login
router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", authController.getLoginPage);
router.get("/register", authController.getRegisterPage);

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/chat", authController.getChatPage);

module.exports = router;
