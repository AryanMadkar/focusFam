const User = require('../models/userSchema');
const { uploadToCloudinary } = require('../middlewares/fileuploade');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

// Helper function to create and send token with cookie
const createSendToken = (user, statusCode, res, message = 'Success') => {
  const token = generateToken(user._id);
  
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'strict' // CSRF protection
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user
  });
};

// Register new user
exports.registerUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      username,
      gender,
      age,
      course,
      subjects
    } = req.body;

    // Validate required fields
    if (!email || !password || !username || !course || !subjects) {
      return next({
        statusCode: 400,
        message: 'Please provide email, password, username, course, and subjects'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'username';
      return next({
        statusCode: 400,
        message: `User with this ${field} already exists`
      });
    }

    // Handle profile image upload
    let profileImage;
    if (req.file) {
      try {
        profileImage = await uploadToCloudinary(req.file.path);
      } catch (uploadError) {
        return next({
          statusCode: 500,
          message: 'Error uploading profile image'
        });
      }
    }

    // Parse course and subjects if they're strings
    const parsedCourse = typeof course === 'string' ? JSON.parse(course) : course;
    const parsedSubjects = typeof subjects === 'string' ? JSON.parse(subjects) : subjects;

    // Create user data object
    const userData = {
      email: email.toLowerCase(),
      password,
      username: username.trim(),
      gender,
      age: age ? parseInt(age) : undefined,
      profileImage,
      course: parsedCourse,
      subjects: parsedSubjects
    };

    // Create new user
    const user = await User.create(userData);

    // Update last active
    await user.updateLastActive();

    // Send response with token and cookie
    createSendToken(user, 201, res, 'User registered successfully');

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return next({
        statusCode: 400,
        message: errors.join('. ')
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return next({
        statusCode: 400,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
      });
    }

    next(error);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return next({
        statusCode: 400,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return next({
        statusCode: 401,
        message: 'Incorrect email or password'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return next({
        statusCode: 401,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Update last active
    await user.updateLastActive();

    // Send response with token and cookie
    createSendToken(user, 200, res, 'Logged in successfully');

  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  // Clear the JWT cookie
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Get current user profile
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return next({
        statusCode: 404,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const {
      username,
      gender,
      age,
      course,
      subjects
    } = req.body;

    // Fields that can be updated
    const allowedFields = {
      username: username?.trim(),
      gender,
      age: age ? parseInt(age) : undefined,
      course: typeof course === 'string' ? JSON.parse(course) : course,
      subjects: typeof subjects === 'string' ? JSON.parse(subjects) : subjects
    };

    // Remove undefined fields
    Object.keys(allowedFields).forEach(key => {
      if (allowedFields[key] === undefined) {
        delete allowedFields[key];
      }
    });

    // Handle profile image upload
    if (req.file) {
      try {
        allowedFields.profileImage = await uploadToCloudinary(req.file.path);
      } catch (uploadError) {
        return next({
          statusCode: 500,
          message: 'Error uploading profile image'
        });
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      allowedFields,
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return next({
        statusCode: 404,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return next({
        statusCode: 400,
        message: errors.join('. ')
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return next({
        statusCode: 400,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
      });
    }

    next(error);
  }
};

// Change password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next({
        statusCode: 400,
        message: 'Please provide current password and new password'
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.comparePassword(currentPassword))) {
      return next({
        statusCode: 400,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Send response with new token
    createSendToken(user, 200, res, 'Password changed successfully');

  } catch (error) {
    next(error);
  }
};

// Delete account
exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return next({
        statusCode: 404,
        message: 'User not found'
      });
    }

    // Clear cookie
    res.cookie('jwt', 'deleted', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Account deactivated successfully'
    });

  } catch (error) {
    next(error);
  }
};