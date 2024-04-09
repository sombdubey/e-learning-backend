// index.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/config');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/courses', require('./routes/course'));
app.use('/api/enrollments', require('./routes/enrollment'));

// Error handler middleware
app.use(require('./utils/errorHandler'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
