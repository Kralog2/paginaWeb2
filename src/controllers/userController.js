const User = require('../models/User');

const showProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.render('user/profile', { title: 'User Profile', user });
    } catch (error) {
        console.error(error);
        res.render('user/profile', { title: 'User Profile', user: null, error: 'Error loading profile' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        await User.update(req.user.id, name, email);
        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.render('user/profile', { title: 'User Profile', user: req.user, error: 'Error updating profile' });
    }
}

const deleteAccount = async (req, res) => {
    try {
        await User.delete(req.user.id);
        res.clearCookie('token');
        res.redirect('/register');
    } catch (error) {
        console.error(error);
        res.render('user/profile', { title: 'User Profile', user: req.user, error: 'Error deleting account' });
    }
}
module.exports = { showProfile, updateProfile, deleteAccount };