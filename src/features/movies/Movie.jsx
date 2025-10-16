import PropTypes from "prop-types";
import { getSmallPosterUrl } from "@utils/helpers";

/**
 * Single movie item in search results
 */
export default function Movie({ movie, onSelectMovie }) {
  const posterUrl = getSmallPosterUrl(movie.Poster);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/40x60/2c2c2c/ffffff?text=No+Poster";
    e.target.onerror = null; // Prevent infinite loop
  };

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img 
        src={posterUrl} 
        alt={`${movie.Title} poster`}
        onError={handleImageError}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

