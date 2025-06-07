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
const { protect, preventLoggedIn } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Please upload only image files'), false);
    }
  }
});

// Public routes (no authentication required)
router.post('/register', preventLoggedIn, upload.single('profileImage'), registerUser);
router.post('/login', preventLoggedIn, loginUser);

// Protected routes (authentication required)
router.use(protect); // All routes after this middleware are protected

router.post('/logout', logoutUser);
router.get('/me', getMe);
router.patch('/update-profile', upload.single('profileImage'), updateProfile);
router.patch('/change-password', changePassword);
router.delete('/delete-account', deleteAccount);

module.exports = router;