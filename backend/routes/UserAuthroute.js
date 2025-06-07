const express = require('express');
const multer = require('multer');
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateProfile,
  changePassword,
  deleteAccount
} = require('../controllers/UserController');
const { protect, preventLoggedIn } = require('../middlewares/Jsonwebtoken');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Public routes
router.post('/register', preventLoggedIn, upload.single('profileImage'), registerUser);
router.post('/login', preventLoggedIn, loginUser);

// Middleware to protect all routes below
router.use(protect);

// Authenticated user routes
router.post('/logout', logoutUser);
router.get('/me', getMe);
router.patch('/update_profile', upload.single('profileImage'), updateProfile);
router.patch('/change_password', changePassword);
router.delete('/delete_account', deleteAccount);

module.exports = router;
