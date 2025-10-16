/**
 * Calculate the average of an array of numbers
 * @param {number[]} arr - Array of numbers
 * @returns {number} - Average value
 */
export const average = (arr) =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length || 0;

/**
 * Get a fallback poster URL if the poster is missing or invalid
 * @param {string} poster - Poster URL from API
 * @returns {string} - Valid poster URL
 */
export const getPosterUrl = (poster) => {
  if (poster && poster !== "N/A") {
    return poster;
  }
  return "https://via.placeholder.com/200x300?text=No+Poster";
};

/**
 * Get a small fallback poster URL for list items
 * @param {string} poster - Poster URL from API
 * @returns {string} - Valid poster URL
 */
export const getSmallPosterUrl = (poster) => {
  if (poster && poster !== "N/A") {
    return poster;
  }
  return "https://via.placeholder.com/40x60?text=No+Poster";
};

/**
 * Parse runtime string to number
 * @param {string} runtime - Runtime string (e.g., "120 min")
 * @returns {number} - Runtime in minutes
 */
export const parseRuntime = (runtime) => {
  if (!runtime) return 0;
  return Number(runtime.split(" ")[0]) || 0;
};

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

/**
 * Extract genres from a movie
 * @param {Object} movie - Movie object
 * @returns {string[]} - Array of genres
 */
export const extractGenres = (movie) => {
  if (!movie.genre) return [];
  return movie.genre.split(", ");
};

/**
 * Count genres across all movies
 * @param {Object[]} movies - Array of movies
 * @returns {Object} - Genre counts
 */
export const countGenres = (movies) => {
  const genreCounts = {};
  movies.forEach((movie) => {
    const genres = extractGenres(movie);
    genres.forEach((genre) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  return genreCounts;
};

/**
 * Get top N genres
 * @param {Object} genreCounts - Genre count object
 * @param {number} limit - Number of top genres to return
 * @returns {Array} - Array of [genre, count] tuples
 */
export const getTopGenres = (genreCounts, limit = 5) => {
  return Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit);
};

