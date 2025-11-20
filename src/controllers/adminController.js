const User = require('../models/User');

const adminDashboard = async (req, res) => {
  try {
    const search = req.query.search || "";
    const role = req.query.role || "";
    let users;

    if (search && role) {
      users = await User.searchByNameOrEmail(search);
      users = users.filter(u => u.role === role);
    } else if (search) {
      users = await User.searchByNameOrEmail(search);
    } else if (role) {
      users = await User.filterByRole(role);
    } else {
      users = await User.getAll();
    }

    res.render('admin/dashboard', {
      title: 'Panel de Administración',
      users,
      user: req.user,
      search,
      role
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/404', { title: 'Error', error: 'No se pudo cargar el dashboard.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.delete(userId);
    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('errors/404', { title: 'Error', error: 'No se pudo eliminar el usuario.' });
  }
};


module.exports = { adminDashboard, deleteUser };