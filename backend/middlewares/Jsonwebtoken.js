const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

// Protect routes - check for valid JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // Check if token exists
    if (!token) {
      return next({
        statusCode: 401,
        message: 'You are not logged in. Please log in to access this resource.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return next({
        statusCode: 401,
        message: 'The user belonging to this token no longer exists.'
      });
    }

    // Check if user account is active
    if (!user.isActive) {
      return next({
        statusCode: 401,
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    // Update last active timestamp
    await user.updateLastActive();

    // Grant access to protected route
    req.user = user;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next({
        statusCode: 401,
        message: 'Invalid token. Please log in again.'
      });
    } else if (error.name === 'TokenExpiredError') {
      return next({
        statusCode: 401,
        message: 'Your token has expired. Please log in again.'
      });
    }
    
    next({
      statusCode: 401,
      message: 'Authentication failed'
    });
  }
};

// Middleware to check if user is logged in (for optional authentication)
const isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // Check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user || !user.isActive) {
      return next();
    }

    // Update last active timestamp
    await user.updateLastActive();

    // Set user in request
    req.user = user;
    next();

  } catch (error) {
    // If token is invalid, just continue without authentication
    next();
  }
};

// Restrict access to specific roles (if you want to add roles later)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next({
        statusCode: 403,
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Middleware to ensure user is not authenticated (for login/register routes)
const preventLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // Check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists and is active
    const user = await User.findById(decoded.id).select('-password');
    if (user && user.isActive) {
      return next({
        statusCode: 400,
        message: 'You are already logged in'
      });
    }

    next();

  } catch (error) {
    // If token is invalid, allow access to login/register
    next();
  }
};

// Middleware to check if the user owns the resource
const checkOwnership = (resourceModel, resourceField = 'user') => {
  return async (req, res, next) => {
    try {
      const resource = await resourceModel.findById(req.params.id);
      
      if (!resource) {
        return next({
          statusCode: 404,
          message: 'Resource not found'
        });
      }

      // Check if user owns this resource
      if (resource[resourceField].toString() !== req.user.id) {
        return next({
          statusCode: 403,
          message: 'You do not have permission to access this resource'
        });
      }

      req.resource = resource;
      next();

    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  protect,
  isLoggedIn,
  restrictTo,
  preventLoggedIn,
  checkOwnership
};