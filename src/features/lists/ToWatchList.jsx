import PropTypes from "prop-types";
import ToWatchMovie from "./ToWatchMovie";

/**
 * List of movies to watch
 */
export default function ToWatchList({ toWatch, onDelete, onSelectMovie }) {
  return (
    <>
      <div className="summary">
        <h2>Movies to watch</h2>
        <p>{toWatch.length} movies in your list</p>
      </div>
      <ul className="list">
        {toWatch.map((movie) => (
          <ToWatchMovie
            key={movie.imdbID}
            movie={movie}
            onDelete={onDelete}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}

ToWatchList.propTypes = {
  toWatch: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

