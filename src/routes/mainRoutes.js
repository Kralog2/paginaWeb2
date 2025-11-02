const express = require("express");
const verifyToken = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", (req, res) => res.render("pages/index" , { title: "Home" }));
router.get("/dashboard", verifyToken, (req, res) => res.render("pages/dashboard", { user: req.user }));

module.exports = router;
