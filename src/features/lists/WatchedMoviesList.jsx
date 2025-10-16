import { useState } from "react";
import PropTypes from "prop-types";
import WatchedMovie from "./WatchedMovie";

/**
 * List of watched movies with sort and filter controls
 */
export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
  onEditMovie,
  favorites,
  onToggleFavorite,
}) {
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterRating, setFilterRating] = useState(0);

  let sortedMovies = [...watched];

  // Apply filtering
  if (filterRating > 0) {
    sortedMovies = sortedMovies.filter(
      (movie) => movie.userRating >= filterRating
    );
  }

  // Apply sorting
  switch (sortBy) {
    case "dateAdded":
      sortedMovies.sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );
      break;
    case "title":
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "userRating":
      sortedMovies.sort((a, b) => b.userRating - a.userRating);
      break;
    case "imdbRating":
      sortedMovies.sort((a, b) => b.imdbRating - a.imdbRating);
      break;
    case "year":
      sortedMovies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      break;
    default:
      break;
  }

  return (
    <>
      <div className="controls">
        <div className="control-row">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="dateAdded">Date Added</option>
            <option value="title">Title</option>
            <option value="userRating">Your Rating</option>
            <option value="imdbRating">IMDb Rating</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div className="control-row">
          <label>Min Rating:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
          >
            <option value="0">All</option>
            <option value="7">7+ ⭐</option>
            <option value="8">8+ ⭐</option>
            <option value="9">9+ ⭐</option>
          </select>
        </div>
      </div>
      <ul className="list list-watched">
        {sortedMovies.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onDeleteWatched={onDeleteWatched}
            onEditMovie={onEditMovie}
            isFavorite={favorites.some((f) => f.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    </>
  );
}

WatchedMoviesList.propTypes = {
  watched: PropTypes.array.isRequired,
  onDeleteWatched: PropTypes.func.isRequired,
  onEditMovie: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

