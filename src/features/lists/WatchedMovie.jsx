import PropTypes from "prop-types";
import { getSmallPosterUrl } from "@utils/helpers";

/**
 * Single watched movie item
 */
export default function WatchedMovie({
  movie,
  onDeleteWatched,
  onEditMovie,
}) {
  const posterUrl = getSmallPosterUrl(movie.poster);

  return (
    <li>
      <img src={posterUrl} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-edit"
          onClick={() => onEditMovie(movie.imdbID)}
          title="Edit rating"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
          title="Delete"
        >
          X
        </button>
      </div>
    </li>
  );
}

WatchedMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  onDeleteWatched: PropTypes.func.isRequired,
  onEditMovie: PropTypes.func.isRequired,
};

