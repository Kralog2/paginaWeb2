const express = require('express');
const {adminDashboard, deleteUser} = require('../controllers/adminController');
const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.get("/dashboard", verifyToken, isAdmin, adminDashboard);
router.post("/dashboard/delete/:id", verifyToken, isAdmin, deleteUser);


module.exports = router;