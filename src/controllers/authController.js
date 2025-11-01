import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);

  if (rows.length === 0) return res.render("login", { error: "Usuario no encontrado" });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) return res.render("login", { error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", [username, hash]);
  res.redirect("/login");
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
