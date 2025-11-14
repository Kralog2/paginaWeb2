const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

const showRegister = (req, res) => {
  res.render("auth/register", { title: "Registro", error: null });
};

const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  try {
    const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUsers.length > 0) {
      return res.render("auth/register", {
        title: "Registro",
        error: "El correo electrónico ya está registrado",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role]
    );
    return res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    return res.render("auth/register", {
      title: "Registro",
      error: "Error del servidor",
    });
  }
};

const showLogin = (req, res) => {
  res.render("auth/login", { title: "Iniciar sesión", error: null });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Correo electrónico o contraseña incorrectos",
      });
    }
    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Correo electrónico o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Error del servidor",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth/login");
};

module.exports = {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser,
};
