const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videos: [{
    videoId: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: Number, required: true }, // in seconds
    publishedAt: { type: Date, required: true },
    channel: { type: String, required: true },
    relevanceScore: { type: Number, default: 0 } // AI-calculated
  }]
});

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  levels: [String], // e.g., ["Semester 1", "Semester 2"]
  subjects: [subjectSchema]
});

module.exports = mongoose.model('Course', courseSchema);