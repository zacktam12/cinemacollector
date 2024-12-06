import { useState, useEffect } from "react";
const KEY = "6e0f586"; // OMDB API key

export default function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Fetch movies based on the search query
  useEffect(() => {
    callBack?.();
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        // error handler and
        if (!res.ok) throw new Error("Something went wrong while fetching");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    //
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, error, isLoading };
}
