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

  const url = `${OMDB_API_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err?.name === "AbortError") throw err; // propagate abort to caller
    throw new Error("Network error while contacting OMDb. Check your connection and try again.");
  }
  
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("OMDb authentication failed. Check that VITE_OMDB_API_KEY is set correctly.");
    }
    if (response.status === 429) {
      throw new Error("OMDb rate limit exceeded. Please wait a moment and try again.");
    }
    throw new Error(`Failed to fetch movies (HTTP ${response.status}). Please try again.`);
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

