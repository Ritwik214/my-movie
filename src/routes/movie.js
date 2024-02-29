const express = require('express');
const axios = require('axios');

const router = express.Router();

// Replace 'your-omdb-api-key' with your actual OMDB API key
const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=e714d0c9'; // Replace this with your key

// Search for movies by title
router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;

    // Check if the title query parameter is provided
    if (!title) {
      return res.status(400).json({ message: 'Title parameter is missing' });
    }

    // Make a request to the OMDB API
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);

    // Check if the API response contains movie data
    if (omdbResponse.data.Response === 'True') {
      const movies = omdbResponse.data.Search;
      return res.status(200).json(movies);
    } else {
      return res.status(404).json({ message: 'No movies found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Add more movie-related routes as needed

module.exports = router;
