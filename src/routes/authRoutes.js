const express = require("express");
const { loginController, registerController, logoutController } = require("../controllers/authController");
const router = express.Router();

router.get("/login", (req, res) => res.render("pages/login"));
router.post("/login", loginController);
router.get("/register", (req, res) => res.render("pages/register"));
router.post("/register", registerController);
router.get("/logout", logoutController);

module.exports = router;
