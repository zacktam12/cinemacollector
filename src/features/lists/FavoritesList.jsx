import PropTypes from "prop-types";
import FavoriteMovie from "./FavoriteMovie";

/**
 * List of favorite movies
 */
export default function FavoritesList({
  favorites,
  onToggleFavorite,
  onSelectMovie,
}) {
  return (
    <>
      <div className="summary">
        <h2>Your Favorite Movies</h2>
        <p>{favorites.length} favorites</p>
      </div>
      <ul className="list">
        {favorites.map((movie) => (
          <FavoriteMovie
            key={movie.imdbID}
            movie={movie}
            onToggleFavorite={onToggleFavorite}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </>
  );
}

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

