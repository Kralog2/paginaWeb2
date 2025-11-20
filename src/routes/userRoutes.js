const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { showProfile, updateProfile, showEditProfile } = require('../controllers/userController');

const router = express.Router();

router.get("/profile", verifyToken, showProfile);

router.get("/profile/edit", verifyToken, showEditProfile);

router.post("/profile/update", verifyToken, updateProfile);

router.get("/profile/delete-confirm", verifyToken, (req, res) => {
  res.render("user/deleteConfirm", { title: "Confirmar eliminación", user: req.user });
});

router.post("/profile/delete-account", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.delete(userId);
    res.clearCookie("token");
    return res.redirect("/auth/register");
  } catch (error) {
    console.error(error);
    return res.status(500).render("user/profile", { title: "Perfil", user: req.user, error: "Error al eliminar la cuenta." });
  }
});

router.get("/gamePages/skyrim", verifyToken, (req, res) => {
  res.render("pages/gamePages/skyrim", { title: "Skyrim", user: req.user });
});
router.get("/gamePages/fallout4", verifyToken, (req, res) => {
  res.render("pages/gamePages/fallout4", { title: "Fallout 4", user: req.user });
});
router.get("/gamePages/falloutnv", verifyToken, (req, res) => {
  res.render("pages/gamePages/falloutnv", { title: "Fallout New Vegas", user: req.user });
});
router.get("/gamePages/kofxv", verifyToken, (req, res) => {
  res.render("pages/gamePages/kofxv", { title: "The King of Fighters XIV", user: req.user });
});

module.exports = router;
