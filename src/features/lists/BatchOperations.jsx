import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Batch operations component for multi-select actions
 */
export default function BatchOperations({ 
  movies, 
  onBatchDelete, 
  onBatchTag, 
  onBatchMove,
  availableTags = [] 
}) {
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [showActions, setShowActions] = useState(false);

  const toggleSelectAll = () => {
    if (selectedMovies.size === movies.length) {
      setSelectedMovies(new Set());
    } else {
      setSelectedMovies(new Set(movies.map((m) => m.imdbID)));
    }
  };

  const toggleSelectMovie = (movieId) => {
    const newSelected = new Set(selectedMovies);
    if (newSelected.has(movieId)) {
      newSelected.delete(movieId);
    } else {
      newSelected.add(movieId);
    }
    setSelectedMovies(newSelected);
  };

  const handleBatchDelete = () => {
    if (window.confirm(`Delete ${selectedMovies.size} selected movies?`)) {
      onBatchDelete(Array.from(selectedMovies));
      setSelectedMovies(new Set());
      setShowActions(false);
    }
  };

  const handleBatchTag = (tag) => {
    onBatchTag(Array.from(selectedMovies), tag);
    setShowActions(false);
  };

  const handleBatchMove = (destination) => {
    onBatchMove(Array.from(selectedMovies), destination);
    setSelectedMovies(new Set());
    setShowActions(false);
  };

  const selectedCount = selectedMovies.size;

  return (
    <div className="batch-operations">
      {/* Selection Controls */}
      <div className="batch-controls">
        <label className="batch-select-all">
          <input
            type="checkbox"
            checked={selectedMovies.size === movies.length && movies.length > 0}
            onChange={toggleSelectAll}
          />
          <span>Select All ({selectedCount} selected)</span>
        </label>

        {selectedCount > 0 && (
          <button
            className="btn-batch-actions"
            onClick={() => setShowActions(!showActions)}
          >
            Actions ▾
          </button>
        )}
      </div>

      {/* Movie Selection List */}
      <div className="batch-movie-list">
        {movies.map((movie) => (
          <label key={movie.imdbID} className="batch-movie-item">
            <input
              type="checkbox"
              checked={selectedMovies.has(movie.imdbID)}
              onChange={() => toggleSelectMovie(movie.imdbID)}
            />
            <img
              src={
                movie.poster !== "N/A" && movie.poster
                  ? movie.poster
                  : "https://via.placeholder.com/40x60?text=No+Poster"
              }
              alt={`${movie.title} poster`}
              className="batch-movie-poster"
            />
            <div className="batch-movie-info">
              <span className="batch-movie-title">{movie.title}</span>
              <span className="batch-movie-year">{movie.year}</span>
            </div>
          </label>
        ))}
      </div>

      {/* Batch Actions Menu */}
      {showActions && selectedCount > 0 && (
        <div className="batch-actions-menu">
          <button
            className="batch-action-btn delete"
            onClick={handleBatchDelete}
          >
            🗑️ Delete Selected
          </button>

          {onBatchMove && (
            <>
              <button
                className="batch-action-btn"
                onClick={() => handleBatchMove("watched")}
              >
                ✅ Move to Watched
              </button>
              <button
                className="batch-action-btn"
                onClick={() => handleBatchMove("toWatch")}
              >
                📌 Move to To Watch
              </button>
              <button
                className="batch-action-btn"
                onClick={() => handleBatchMove("favorites")}
              >
                ❤️ Move to Favorites
              </button>
            </>
          )}

          {availableTags.length > 0 && (
            <div className="batch-tag-section">
              <p className="batch-tag-label">Add Tag:</p>
              {availableTags.slice(0, 5).map((tag) => (
                <button
                  key={tag}
                  className="batch-action-btn"
                  onClick={() => handleBatchTag(tag)}
                >
                  🏷️ {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

BatchOperations.propTypes = {
  movies: PropTypes.array.isRequired,
  onBatchDelete: PropTypes.func.isRequired,
  onBatchTag: PropTypes.func,
  onBatchMove: PropTypes.func,
  availableTags: PropTypes.array,
};

