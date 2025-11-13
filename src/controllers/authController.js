const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

const showRegister = (req, res) => {
  res.render("auth/register", { title: "Registro", error: null });
};

const registerUser = async (req, res) => {
  const { name, email, password, role} = req.body;
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
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    res.render("auth/register", {
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
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.render("pages/login", {
      title: "Iniciar sesión",
      error: "Error del servidor",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};

module.exports = {
  showLogin,
  loginUser,
  showRegister,
  registerUser,
  logoutUser
};