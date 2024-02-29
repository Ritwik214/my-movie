const Playlist = require('../models/Playlist');
const User = require('../models/User');

// Create a new playlist
const createPlaylist = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const creatorId = req.user._id; // Assuming you use Passport.js for authentication

    // Create a new playlist
    const newPlaylist = new Playlist({
      name,
      creator: creatorId,
      isPublic,
      movies: [], // You can initialize the playlist with an empty movie array
    });

    // Save the playlist to the database
    await newPlaylist.save();

    return res.status(201).json({ message: 'Playlist created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create playlist' });
  }
};

// Get a playlist by ID
const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the playlist by its ID
    const playlist = await Playlist.findById(id).populate('creator', 'username');

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    // Check if the playlist is public or belongs to the authenticated user (if logged in)
    if (!playlist.isPublic && (!req.isAuthenticated() || req.user._id.toString() !== playlist.creator._id.toString())) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.status(200).json(playlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch playlist' });
  }
};

module.exports = {
  createPlaylist,
  getPlaylistById,
};
