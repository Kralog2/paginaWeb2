import express from "express";
import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", (req, res) => res.render("login"));
router.post("/login", login);
router.get("/register", (req, res) => res.render("register"));
router.post("/register", register);
router.get("/logout", logout);

export default router;
