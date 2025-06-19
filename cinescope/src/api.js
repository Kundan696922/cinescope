import axios from 'axios';

// Load the API key from environment variables
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Search for movies by title
 * @param {string} query
 * @returns {Promise<Array>} List of movie summaries
 */
export const searchMovies = async (query) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
      },
    });
    return res.data.Search || [];
  } catch (err) {
    console.error('API Error:', err);
    return [];
  }
};

/**
 * Get detailed info about a movie by IMDb ID
 * @param {string} imdbID
 * @returns {Promise<Object|null>} Movie details
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    return res.data;
  } catch (err) {
    console.error('Detail API Error:', err);
    return null;
  }
};
