const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Authentication
  authProvider: {
    type: String,
    enum: ['email', 'google', 'github'],
    required: true
  },
  providerId: String, // ID from Google/GitHub
  email: { 
    type: String, 
    required: function() { return this.authProvider === 'email'; },
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
  },
  password: { 
    type: String, 
    required: function() { return this.authProvider === 'email'; } 
  },
  
  // Profile
  username: { type: String, required: true, unique: true },
  profileImage: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer-not-to-say'] },
  age: { type: Number, min: 13 },
  
  // Education
  course: {
    name: { type: String, required: true }, // e.g., "Computer Science"
    level: { type: String, required: true } // e.g., "Semester 3"
  },
  subjects: [{ type: String }], // AI-populated subjects
  
  // Stats
  focusScore: { type: Number, default: 100 },
  violations: { type: Number, default: 0 },
  streaks: { type: Number, default: 0 },
  totalFocusTime: { type: Number, default: 0 }, // in minutes
  
  // Social
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Timestamps
  lastActive: Date,
  createdAt: { type: Date, default: Date.now }
});

// Password hashing for email-based users
userSchema.pre('save', async function(next) {
  if (this.authProvider !== 'email' || !this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update last active timestamp
userSchema.methods.updateLastActive = function() {
  this.lastActive = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema);