const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  verifyEmail,
  loginUser, 
  getMe,
  updateDetails,
  updatePassword,
  getDashboard, 
  forgotPassword, 
  resetPassword, 
  refreshToken 
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.get('/verifyemail/:verifytoken', verifyEmail);
router.post('/login', loginUser);

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

router.get('/dashboard', protect, authorize('user', 'admin'), getDashboard);

router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/refresh', refreshToken);

module.exports = router;
