const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", authController.getLoginPage);
router.get("/register", authController.getRegisterPage);
router.get("/chat", authController.getChatPage);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
