const express = require("express");
const router = express.Router();
const {
  showLogin,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.get("/login", showLogin);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
