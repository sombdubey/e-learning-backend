// controllers/userController.js

const User = require('../models/User');

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, password });

    // Save user to database
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};
