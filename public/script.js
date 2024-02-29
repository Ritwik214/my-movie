document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const movieList = document.getElementById('movie-list');
  
    searchButton.addEventListener('click', async function () {
      // Get the user's search query
      const query = searchInput.value.trim();
  
      // Clear previous search results
      movieList.innerHTML = '';
  
      if (query !== '') {
        try {
          // Make an API request to fetch movie data based on the query
          const response = await fetch(`/api/movies?query=${query}`); // Update the API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch movie data');
          }
          const movieData = await response.json();
  
          // Display search results
          movieData.forEach(function (movie) {
            const listItem = document.createElement('li');
            listItem.classList.add('movie-item');
  
            // Create an image element for the movie poster
            const posterImg = document.createElement('img');
            posterImg.src = movie.poster;
            posterImg.alt = movie.title;
            posterImg.classList.add('movie-poster');
  
            // Create a div for movie details
            const movieDetails = document.createElement('div');
            movieDetails.classList.add('movie-details');
  
            // Create a heading for movie title
            const titleHeading = document.createElement('h3');
            titleHeading.textContent = movie.title;
            titleHeading.classList.add('movie-title');
  
            // Append elements to the list item
            movieDetails.appendChild(titleHeading);
            listItem.appendChild(posterImg);
            listItem.appendChild(movieDetails);
  
            // Append the list item to the movie list
            movieList.appendChild(listItem);
          });
        } catch (error) {
          console.error(error);
          // Handle the error, e.g., display an error message to the user
        }
      }
    });
  });
  