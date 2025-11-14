const User = require('../models/User');

const adminDashboard = async (req, res) => {
  try {
    const users = await User.getAll();
    return res.render('admin/dashboard', { title: 'Admin Dashboard', users, error: null });
  } catch (error) {
    console.error(error);
    return res.render('admin/dashboard', { title: 'Admin Dashboard', users: [], error: 'Error loading dashboard' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.delete(id);
    return res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    return res.render('admin/dashboard', { title: 'Admin Dashboard', users: [], error: 'Error deleting user' });
  }
};

module.exports = { adminDashboard, deleteUser };
