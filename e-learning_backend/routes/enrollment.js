// routes/enrollment.js

const express = require('express');
const router = express.Router();
const { enrollCourse, getEnrollments, cancelEnrollment } = require('../controllers/enrollmentController');

// Enroll in a course
router.post('/enroll', enrollCourse);

// Get all enrollments
router.get('/', getEnrollments);

// Cancel enrollment in a course
router.delete('/:id', cancelEnrollment);

module.exports = router;
