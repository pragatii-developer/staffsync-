const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateBody } = require('../middleware/validationMiddleware');

router.post('/register', validateBody(['name', 'email', 'password']), registerUser);
router.post('/login', validateBody(['email', 'password']), loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
