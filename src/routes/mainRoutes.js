const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", (req, res) => res.render("pages/index", { title: "Home" }));

router.get("/dashboard", verifyToken, (req, res) => {
  if (req.user && req.user.role === "admin") {
    return res.redirect("/admin/dashboard");
  } else {
    return res.redirect("/user/profile");
  }
});

module.exports = router;

