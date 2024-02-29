const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number, // Change type to Number
  },
  imdbID: {
    type: String,
    unique: true,
    required: true,
  },
  poster: {
    type: String,
  },
  // Add other movie-related fields as needed
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
