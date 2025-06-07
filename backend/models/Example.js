const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Example', ExampleSchema);