const axios = require('axios');
const Movie = require('../models/Movie');

// Search for movies by title
const searchMovies = async (req, res) => {
  try {
    const { title } = req.query;

    // Check if the title query parameter is provided
    if (!title) {
      return res.status(400).json({ message: 'Title parameter is missing' });
    }

    // Make a request to the OMDB API
    const apiKey = 'http://www.omdbapi.com/?i=tt3896198&apikey=e714d0c9'; // Replace with your actual API key
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&s=${title}`);

    // Check if the API response contains movie data
    if (omdbResponse.data.Response === 'True') {
      const movies = omdbResponse.data.Search;

      // You can choose to save the retrieved movies to your database (optional)
      // Example: Saving movie data to your Movie model
      // movies.forEach(async (movieData) => {
      //   const newMovie = new Movie({
      //     title: movieData.Title,
      //     // Add other relevant movie data fields here
      //   });
      //   await newMovie.save();
      // });

      return res.status(200).json(movies);
    } else {
      return res.status(404).json({ message: 'No movies found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get movie details by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    // Replace 'your-omdb-api-key' with your actual OMDB API key
    const apiKey = 'your-omdb-api-key'; 

    // Make a request to the OMDB API to get movie details by IMDb ID
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);

    // Check if the API response contains movie data
    if (omdbResponse.data.Response === 'True') {
      const movie = omdbResponse.data;

      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  searchMovies,
  getMovieById,
};
