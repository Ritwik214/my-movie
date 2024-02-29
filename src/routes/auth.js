const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already in use' });
    }

    // Create a new user
    const newUser = new User({ username, password });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// User login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If authentication is successful, the user is logged in
  return res.status(200).json({ message: 'Login successful' });
});

module.exports = router;
