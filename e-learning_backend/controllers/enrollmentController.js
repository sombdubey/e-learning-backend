// controllers/enrollmentController.js

const Enrollment = require('../models/Enrollment');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private (assuming authentication required)
const enrollCourse = async (req, res, next) => {
  try {
    // Assuming user ID and course ID are available in the request body
    const { userId, courseId } = req.body;

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ success: false, error: 'User is already enrolled in this course' });
    }

    // Create a new enrollment record
    const enrollment = await Enrollment.create({ user: userId, course: courseId });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private (assuming authentication required)
const getEnrollments = async (req, res, next) => {
  try {
    // Fetch all enrollments
    const enrollments = await Enrollment.find();

    res.status(200).json({ success: true, data: enrollments });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel enrollment in a course
// @route   DELETE /api/enrollments/:id
// @access  Private (assuming authentication required)
const cancelEnrollment = async (req, res, next) => {
  try {
    // Assuming enrollment ID is provided in the request parameters
    const enrollmentId = req.params.id;

    // Find the enrollment record by ID
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ success: false, error: 'Enrollment not found' });
    }

    // Delete the enrollment record
    await enrollment.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = { enrollCourse, getEnrollments, cancelEnrollment };
