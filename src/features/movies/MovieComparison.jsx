import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMovieDetails } from "@services/omdbApi";
import { Loader } from "@components/ui";

/**
 * Movie comparison tool - compare up to 3 movies side by side
 */
export default function MovieComparison({ movieIds, onClose }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      try {
        const moviePromises = movieIds.map((id) => getMovieDetails(id));
        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
      } catch (error) {
        console.error("Error fetching movies for comparison:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (movieIds && movieIds.length > 0) {
      fetchMovies();
    }
  }, [movieIds]);

  if (isLoading) {
    return (
      <div className="movie-comparison">
        <Loader />
      </div>
    );
  }

  const compareFields = [
    { key: "Title", label: "Title" },
    { key: "Year", label: "Year" },
    { key: "Rated", label: "Rating" },
    { key: "Runtime", label: "Runtime" },
    { key: "Genre", label: "Genre" },
    { key: "Director", label: "Director" },
    { key: "Actors", label: "Actors" },
    { key: "imdbRating", label: "IMDb Rating" },
    { key: "Metascore", label: "Metascore" },
    { key: "BoxOffice", label: "Box Office" },
    { key: "Awards", label: "Awards" },
  ];

  return (
    <div className="movie-comparison">
      <div className="comparison-header">
        <h2>🎬 Movie Comparison</h2>
        <button className="btn-close-comparison" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="comparison-grid">
        {/* Posters Row */}
        <div className="comparison-posters">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="comparison-poster-container">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/200x300?text=No+Poster"
                }
                alt={`${movie.Title} poster`}
                className="comparison-poster"
              />
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="comparison-table">
          {compareFields.map((field) => (
            <div key={field.key} className="comparison-row">
              <div className="comparison-field-label">{field.label}</div>
              {movies.map((movie) => (
                <div key={movie.imdbID} className="comparison-field-value">
                  {movie[field.key] !== "N/A" ? movie[field.key] : "—"}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Plot Comparison */}
        <div className="comparison-plots">
          <div className="comparison-field-label">Plot</div>
          {movies.map((movie) => (
            <div key={movie.imdbID} className="comparison-plot">
              <p>{movie.Plot !== "N/A" ? movie.Plot : "No plot available"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

MovieComparison.propTypes = {
  movieIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

