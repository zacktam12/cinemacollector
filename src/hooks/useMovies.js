import { useState, useEffect } from "react";
import { searchMovies } from "@services/omdbApi";
import { MIN_SEARCH_LENGTH } from "@utils/constants";

/**
 * Custom hook for fetching movies from OMDb API
 * @param {string} query - Search query
 * @param {Function} callback - Optional callback after search
 * @param {number} page - Page number for pagination
 * @returns {Object} - { movies, error, isLoading, totalResults }
 */
export default function useMovies(query, callback, page = 1) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    callback?.();

    if (query.length < MIN_SEARCH_LENGTH) {
      setMovies([]);
      setTotalResults(0);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const data = await searchMovies(query, page, controller.signal);

        setMovies(data.movies);
        setTotalResults(data.totalResults);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();

    return () => controller.abort();
  }, [query, page, callback]);

  return { movies, error, isLoading, totalResults };
}

