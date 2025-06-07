const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  type: { 
    type: String, 
    enum: ['tab-change', 'app-minimize', 'emergency-exit'],
    required: true 
  }
});

const focusSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, required: true },
  endTime: Date,
  intendedDuration: { type: Number, required: true }, // in minutes
  actualDuration: Number, // in minutes
  violations: [violationSchema],
  videoWatched: { type: String, ref: 'Video' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  scoreEarned: { type: Number, default: 0 },
  penaltyApplied: { type: Number, default: 0 }
});

// Calculate actual duration and penalties
focusSessionSchema.pre('save', function(next) {
  // Calculate actual duration
  if (this.endTime) {
    this.actualDuration = (this.endTime - this.startTime) / (1000 * 60);
  }
  
  // Calculate penalty (30% reduction per violation after 3)
  if (this.violations.length > 3) {
    const extraViolations = this.violations.length - 3;
    this.penaltyApplied = extraViolations * 0.3 * this.scoreEarned;
    this.scoreEarned -= this.penaltyApplied;
  }
  
  next();
});

module.exports = mongoose.model('FocusSession', focusSessionSchema);
