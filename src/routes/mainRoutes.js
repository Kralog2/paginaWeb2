import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/dashboard", verifyToken, (req, res) => res.render("dashboard", { user: req.user }));

export default router;
