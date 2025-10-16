import PropTypes from "prop-types";
import { getSmallPosterUrl } from "@utils/helpers";

/**
 * Single movie in "To Watch" list
 */
export default function ToWatchMovie({ movie, onDelete, onSelectMovie }) {
  const posterUrl = getSmallPosterUrl(movie.poster);

  return (
    <li>
      <img
        src={posterUrl}
        alt={`${movie.title} poster`}
        onClick={() => onSelectMovie(movie.imdbID)}
        style={{ cursor: "pointer" }}
      />
      <h3
        onClick={() => onSelectMovie(movie.imdbID)}
        style={{ cursor: "pointer" }}
      >
        {movie.title}
      </h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.year}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDelete(movie.imdbID)}
          title="Remove"
        >
          X
        </button>
      </div>
    </li>
  );
}

ToWatchMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

