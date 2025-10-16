import { useState, useMemo } from "react";
import PropTypes from "prop-types";

/**
 * Collections view - filter movies by custom tags
 */
export default function CollectionsView({ movies, movieTags, onSelectMovie }) {
  const [selectedTag, setSelectedTag] = useState("all");

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    Object.values(movieTags).forEach((movieTagList) => {
      movieTagList.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [movieTags]);

  // Filter movies by selected tag
  const filteredMovies = useMemo(() => {
    if (selectedTag === "all") {
      return movies;
    }
    return movies.filter((movie) => movieTags[movie.imdbID]?.includes(selectedTag));
  }, [movies, movieTags, selectedTag]);

  // Count movies per tag
  const tagCounts = useMemo(() => {
    const counts = {};
    allTags.forEach((tag) => {
      counts[tag] = movies.filter((movie) =>
        movieTags[movie.imdbID]?.includes(tag)
      ).length;
    });
    return counts;
  }, [allTags, movies, movieTags]);

  if (allTags.length === 0) {
    return (
      <div className="collections-view">
        <div className="collections-empty">
          <p>🏷️ No collections yet</p>
          <p className="collections-hint">
            Add tags to your movies to create custom collections
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="collections-view">
      <div className="collections-header">
        <h3>🏷️ Collections</h3>
      </div>

      {/* Tag Filter */}
      <div className="tag-filter">
        <button
          className={`tag-filter-btn ${selectedTag === "all" ? "active" : ""}`}
          onClick={() => setSelectedTag("all")}
        >
          All ({movies.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`tag-filter-btn ${selectedTag === tag ? "active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag} ({tagCounts[tag]})
          </button>
        ))}
      </div>

      {/* Filtered Movies */}
      <div className="collections-movies">
        {filteredMovies.length === 0 ? (
          <p className="no-movies">No movies in this collection</p>
        ) : (
          <ul className="list list-movies">
            {filteredMovies.map((movie) => (
              <li
                key={movie.imdbID}
                className="list-movie"
                onClick={() => onSelectMovie(movie.imdbID)}
              >
                <img
                  src={
                    movie.poster !== "N/A" && movie.poster
                      ? movie.poster
                      : "https://via.placeholder.com/40x60?text=No+Poster"
                  }
                  alt={`${movie.title} poster`}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>
                    <span>📅 {movie.year}</span>
                  </p>
                  {movieTags[movie.imdbID] && movieTags[movie.imdbID].length > 0 && (
                    <div className="movie-tags-inline">
                      {movieTags[movie.imdbID].map((tag) => (
                        <span key={tag} className="tag-mini">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

CollectionsView.propTypes = {
  movies: PropTypes.array.isRequired,
  movieTags: PropTypes.object.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

