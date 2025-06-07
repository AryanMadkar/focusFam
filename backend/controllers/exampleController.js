const Example = require('../models/Example');

// @desc    Get all examples
// @route   GET /api/examples
// @access  Public
exports.getExamples = async (req, res, next) => {
  try {
    const examples = await Example.find();
    res.status(200).json({ success: true, count: examples.length, data: examples });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new example
// @route   POST /api/examples
// @access  Public
exports.createExample = async (req, res, next) => {
  try {
    const example = await Example.create(req.body);
    res.status(201).json({ success: true, data: example });
  } catch (err) {
    next(err);
  }
};