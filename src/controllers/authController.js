const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");

const showLogin = (req, res) => {
  res.render("pages/login", { title: "Iniciar sesión", error: null });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.render("pages/login", {
        title: "Iniciar sesión",
        error: "Usuario no encontrado",
      });
    }
    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("pages/login", {
        title: "Iniciar sesión",
        error: "Contraseña incorrecta",
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
  logoutUser
};