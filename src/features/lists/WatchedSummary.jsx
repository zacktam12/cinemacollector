import PropTypes from "prop-types";
import { average, countGenres, getTopGenres } from "@utils/helpers";

/**
 * Statistics summary for watched movies
 */
export default function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  // Genre breakdown
  const genreCounts = countGenres(watched);
  const topGenres = getTopGenres(genreCounts, 5);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
      {topGenres.length > 0 && (
        <div className="genre-stats">
          {topGenres.map(([genre, count]) => (
            <span key={genre} className="genre-pill">
              {genre} ({count})
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

WatchedSummary.propTypes = {
  watched: PropTypes.array.isRequired,
};

