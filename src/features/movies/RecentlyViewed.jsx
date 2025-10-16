import PropTypes from "prop-types";
import Movie from "./Movie";

/**
 * Recently viewed movies component
 */
export default function RecentlyViewed({ recentMovies, onSelectMovie, onClear }) {
  if (!recentMovies || recentMovies.length === 0) {
    return null;
  }

  return (
    <div className="recently-viewed">
      <div className="recently-viewed-header">
        <h3>👁️ Recently Viewed</h3>
        <button className="btn-clear-recent" onClick={onClear} title="Clear history">
          Clear
        </button>
      </div>
      <ul className="list list-movies recent-list">
        {recentMovies.map((movie) => (
          <Movie 
            key={movie.imdbID} 
            movie={movie} 
            onSelectMovie={onSelectMovie} 
          />
        ))}
      </ul>
    </div>
  );
}

RecentlyViewed.propTypes = {
  recentMovies: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

