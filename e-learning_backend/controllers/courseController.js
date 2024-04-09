// controllers/courseController.js

const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (only accessible to admins)
const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, level } = req.body;
    const instructor = req.user.id; // Assuming user ID is available in the request (after authentication)

    const course = await Course.create({ title, description, category, level, instructor });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a course by ID
// @route   PUT /api/courses/:id
// @access  Private (only accessible to admins)
const updateCourse = async (req, res, next) => {
  try {
    const { title, description, category, level } = req.body;

    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    course = await Course.findByIdAndUpdate(req.params.id, { title, description, category, level }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a course by ID
// @route   DELETE /api/courses/:id
// @access  Private (only accessible to admins)
const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }

    await course.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse
};

