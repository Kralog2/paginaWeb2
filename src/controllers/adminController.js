const User = require('../models/User');

const adminDashboard = async (req, res) => {
    try {
        const users = await User.getAll();
        res.render('admin/dashboard', { title: 'Admin Dashboard', users });
    } catch (error) {
        console.error(error);
        res.render('admin/dashboard', { title: 'Admin Dashboard', error: 'Error loading dashboard' });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.delete(id);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.render('admin/dashboard', { title: 'Admin Dashboard', error: 'Error deleting user' });
    }
}
 module.exports = { adminDashboard, deleteUser };