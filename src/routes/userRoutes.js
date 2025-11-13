const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { showProfile, updateProfile, deleteAccount} = require('../controllers/userController');

const router = express.Router();

router.get("/profile", verifyToken, showProfile);
router.post("/profile/update", verifyToken, updateProfile);
router.post("/profile/delete", verifyToken, deleteAccount);


module.exports = router;