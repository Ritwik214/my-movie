const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (assuming a user-based system)
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie', // Reference to the Movie model
    },
  ],
  isPublic: {
    type: Boolean,
    default: true, // Playlists are public by default, but you can change this
  },
  // Add other playlist-related fields as needed
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
