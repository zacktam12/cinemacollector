import { OMDB_API_KEY, OMDB_API_BASE_URL } from "@utils/constants";
import { getCachedData, setCachedData, generateCacheKey } from "@utils/cache";

/**
 * Search for movies by query
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @param {AbortSignal} signal - Abort signal for cancellation
 * @returns {Promise<Object>} - Search results
 */
export const searchMovies = async (query, page = 1, signal) => {
  // Check cache first
  const cacheKey = generateCacheKey("search", query, page);
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const url = `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&s=${query}&page=${page}`;
  
  const response = await fetch(url, { signal });
  
  if (!response.ok) {
    throw new Error("Something went wrong while fetching movies. Please try again.");
  }

  const data = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  const result = {
    movies: data.Search || [],
    totalResults: parseInt(data.totalResults) || 0,
  };

  // Cache the result
  setCachedData(cacheKey, result);

  return result;
};

/**
 * Get detailed information about a movie by ID
 * @param {string} movieId - IMDb ID
 * @returns {Promise<Object>} - Movie details
 */
export const getMovieDetails = async (movieId) => {
  // Check cache first
  const cacheKey = generateCacheKey("details", movieId);
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  const url = `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movieId}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  
  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  // Cache the result
  setCachedData(cacheKey, data);

  return data;
};

