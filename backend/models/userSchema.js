const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication - Simplified to email/password only
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  
  // Profile
  username: { 
    type: String, 
    required: [true, 'Username is required'], 
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  profileImage: { 
    type: String, 
    default: 'https://images.unsplash.com/photo-1542702937-506268e68902?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    default: 'prefer-not-to-say'
  },
  age: { 
    type: Number, 
    min: [13, 'Age must be at least 13'],
    max: [100, 'Please enter a valid age']
  },
  
  // Education
  course: {
    name: { type: String, required: [true, 'Course name is required'] },
    level: { type: String, required: [true, 'Course level is required'] }
  },
  subjects: [{ 
    type: String,
    trim: true
  }],
  
  // Stats
  focusScore: { type: Number, default: 100 },
  violations: { type: Number, default: 0 },
  streaks: { type: Number, default: 0 },
  totalFocusTime: { type: Number, default: 0 }, // in minutes
  
  // Social
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Account status
  isEmailVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  
  // Password reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Timestamps
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });

// Password hashing middleware
userSchema.pre('save', async function(next) {
  // Only hash password if it's modified
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update last active timestamp
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save({ validateBeforeSave: false });
};

// Generate password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = require('crypto').randomBytes(32).toString('hex');
  
  this.passwordResetToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);