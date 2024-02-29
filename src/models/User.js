const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add other user-related fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
