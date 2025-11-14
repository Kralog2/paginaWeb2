const express = require("express");
const router = express.Router();
const {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser,
} = require("../controllers/authController");

router.get("/login", showLogin);
router.post("/login", loginUser);

router.get("/register", showRegister);
router.post("/register", registerUser);

router.post("/logout", logoutUser);

module.exports = router;

