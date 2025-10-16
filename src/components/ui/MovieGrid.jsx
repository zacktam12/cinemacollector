import PropTypes from "prop-types";

/**
 * Movie grid view component
 */
export default function MovieGrid({ movies, onSelectMovie, isCompact = false }) {
  return (
    <div className={`movie-grid ${isCompact ? "compact" : ""}`}>
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-grid-item"
          onClick={() => onSelectMovie(movie.imdbID)}
        >
          <div className="movie-grid-poster">
            <img
              src={
                movie.Poster !== "N/A" && movie.Poster
                  ? movie.Poster
                  : movie.poster !== "N/A" && movie.poster
                  ? movie.poster
                  : "https://via.placeholder.com/200x300?text=No+Poster"
              }
              alt={`${movie.Title || movie.title} poster`}
              loading="lazy"
            />
            {movie.imdbRating && (
              <div className="movie-grid-rating">
                ⭐ {movie.imdbRating}
              </div>
            )}
            {movie.userRating && (
              <div className="movie-grid-user-rating">
                ⭐ {movie.userRating}
              </div>
            )}
          </div>
          <div className="movie-grid-info">
            <h4 className="movie-grid-title">{movie.Title || movie.title}</h4>
            <p className="movie-grid-year">{movie.Year || movie.year}</p>
            {!isCompact && movie.genre && (
              <p className="movie-grid-genre">{movie.genre}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  isCompact: PropTypes.bool,
};

