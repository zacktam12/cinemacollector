import PropTypes from "prop-types";
import { useDragAndDrop } from "@hooks/useDragAndDrop";

/**
 * Draggable movie list component
 */
export default function DraggableMovieList({ 
  movies, 
  onReorder, 
  onSelectMovie,
  onDelete,
  renderMovieActions 
}) {
  const {
    draggedItem,
    draggedOver,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop(movies, onReorder);

  return (
    <ul className="list list-movies draggable-list">
      {movies.map((movie, index) => {
        const isDragging = draggedItem?.index === index;
        const isDraggedOver = draggedOver === index;

        return (
          <li
            key={movie.imdbID}
            className={`list-movie draggable-item ${isDragging ? "dragging" : ""} ${
              isDraggedOver ? "drag-over" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, movie, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="drag-handle" title="Drag to reorder">
              ⋮⋮
            </div>
            
            <img
              src={
                movie.poster !== "N/A" && movie.poster
                  ? movie.poster
                  : "https://via.placeholder.com/40x60?text=No+Poster"
              }
              alt={`${movie.title} poster`}
              onClick={() => onSelectMovie(movie.imdbID)}
            />
            
            <div className="movie-content" onClick={() => onSelectMovie(movie.imdbID)}>
              <h3>{movie.title}</h3>
              <div className="movie-details">
                <span>📅 {movie.year}</span>
                {movie.userRating && <span>⭐ {movie.userRating}</span>}
                {movie.runtime && <span>⏱️ {movie.runtime} min</span>}
              </div>
            </div>

            {renderMovieActions && (
              <div className="movie-actions">
                {renderMovieActions(movie)}
              </div>
            )}

            {onDelete && (
              <button
                className="btn-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(movie.imdbID);
                }}
              >
                ✕
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

DraggableMovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onReorder: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  renderMovieActions: PropTypes.func,
};

