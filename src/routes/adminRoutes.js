const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');
const { adminDashboard, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get("/dashboard", verifyToken, isAdmin, adminDashboard);
router.post("/dashboard/delete/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
