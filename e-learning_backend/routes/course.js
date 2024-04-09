// routes/course.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Create a new course
router.post('/create', courseController.createCourse);

// Get all courses
router.get('/course', courseController.getCourses);

// Get a course by ID
router.get('/:id', courseController.getCourse);

// Update a course by ID
router.put('/:id', courseController.updateCourse);

// Delete a course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;

