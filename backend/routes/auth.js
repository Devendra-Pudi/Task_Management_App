const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);

// Protected route to get current user's info
router.get('/me', auth, async (req, res) => {
  try {
    // Since the auth middleware adds the user to req.user, we can just return it
    // But first remove the password
    const user = req.user.toObject();
    delete user.password;
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error in /me endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
