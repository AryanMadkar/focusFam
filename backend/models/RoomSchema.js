const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  joinedAt: { type: Date, default: Date.now },
  leftAt: Date,
  completedVideo: { type: Boolean, default: false },
  focusViolations: { type: Number, default: 0 }
});

const chatMessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isBreakMessage: { type: Boolean, default: true } // Only allowed during breaks
});

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessType: { 
    type: String, 
    enum: ['open', 'locked'],
    default: 'open'
  },
  password: { type: String, select: false },
  subject: { type: String, required: true },
  currentVideo: {
    videoId: { type: String, required: true },
    startTime: { type: Date, default: Date.now },
    duration: { type: Number, required: true }, // in seconds
    scheduledEnd: Date
  },
  participants: [participantSchema],
  maxParticipants: { type: Number, default: 5, max: 5 },
  chatHistory: [chatMessageSchema],
  scheduledBreaks: [{
    startTime: Date,
    duration: Number // in minutes
  }],
  doubtHistory: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: String,
    answer: String,
    timestamp: Date
  }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Auto-set scheduledEnd based on video duration
roomSchema.pre('save', function(next) {
  if (this.currentVideo.videoId && !this.currentVideo.scheduledEnd) {
    const endTime = new Date(this.currentVideo.startTime);
    endTime.setSeconds(endTime.getSeconds() + this.currentVideo.duration);
    this.currentVideo.scheduledEnd = endTime;
  }
  next();
});

// Prevent exceeding max participants
roomSchema.pre('save', function(next) {
  if (this.participants.length > this.maxParticipants) {
    throw new Error(`Room capacity exceeded (max ${this.maxParticipants})`);
  }
  next();
});

module.exports = mongoose.model('Room', roomSchema);