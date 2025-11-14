const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const showProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.render('user/profile', { title: 'Perfil', user, success: null, error: null });
  } catch (error) {
    console.error(error);
    return res.status(500).render('user/profile', { title: 'Perfil', user: null, error: 'Error loading profile' });
  }
};

const showEditProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.render('user/edit', { title: 'Editar Perfil', user, success: null, error: null });
  } catch (error) {
    console.error(error);
    return res.status(500).render('user/edit', { title: 'Editar Perfil', user: null, error: 'Error loading profile for edit' });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, password } = req.body;

  try {
    if (!name || name.length < 2) {
      return res.render("user/edit", {
        title: "Editar Perfil",
        user: req.user,
        error: "El nombre debe tener al menos 2 caracteres.",
        success: null,
      });
    }

    let hashedPassword = null;
    if (password && password.trim() !== "") {
      const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!strongPassword.test(password)) {
        return res.render("user/edit", {
          title: "Editar Perfil",
          user: req.user,
          error:
            "La contraseña debe tener mínimo 8 caracteres, incluir minúscula, mayúscula, número y símbolo.",
          success: null,
        });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const fields = [];
    const values = [];

    fields.push("name = ?");
    values.push(name);

    if (hashedPassword) {
      fields.push("password = ?");
      values.push(hashedPassword);
    }

    values.push(userId);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    await db.query(query, values);

    const newToken = jwt.sign(
      {
        id: userId,
        name: name,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.render("user/edit", {
      title: "Editar Perfil",
      user: { ...req.user, name },
      success: "Perfil actualizado correctamente.",
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("user/edit", {
      title: "Editar Perfil",
      user: req.user,
      error: "Error al actualizar el perfil.",
      success: null,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await User.delete(req.user.id);
    res.clearCookie('token');
    return res.redirect('/auth/register');
  } catch (error) {
    console.error(error);
    return res.status(500).render('/user/profile', { title: 'Perfil', user: req.user, error: 'Error deleting account' });
  }
};

module.exports = { showProfile, showEditProfile, updateProfile, deleteAccount };
