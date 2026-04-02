const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getDashboard, forgotPassword, resetPassword, refreshToken } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', protect, authorize('user', 'admin'), getDashboard);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/refresh', refreshToken);

module.exports = router;
