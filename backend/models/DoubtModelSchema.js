const mongoose = require('mongoose');

const doubtSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  askedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
  aiConfidence: { type: Number, default: 0 } // 0-100 confidence score
});

module.exports = mongoose.model('Doubt', doubtSchema);