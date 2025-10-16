import PropTypes from "prop-types";
import { getSmallPosterUrl } from "@utils/helpers";

/**
 * Single movie in favorites list
 */
export default function FavoriteMovie({ movie, onToggleFavorite, onSelectMovie }) {
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
          onClick={() => onToggleFavorite(movie)}
          title="Remove from favorites"
          style={{ backgroundColor: "var(--color-red)" }}
        >
          💔
        </button>
      </div>
    </li>
  );
}

FavoriteMovie.propTypes = {
  movie: PropTypes.object.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

