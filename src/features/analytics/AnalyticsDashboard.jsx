import PropTypes from "prop-types";
import { average, countGenres, getTopGenres } from "@utils/helpers";

/**
 * Enhanced analytics dashboard
 */
export default function AnalyticsDashboard({ watchedMovies }) {
  if (!watchedMovies || watchedMovies.length === 0) {
    return (
      <div className="analytics-dashboard">
        <div className="analytics-header">
          <h3>📊 Analytics Dashboard</h3>
          <p>Start watching movies to see your statistics!</p>
        </div>
      </div>
    );
  }

  // Calculate advanced statistics
  const totalMovies = watchedMovies.length;
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const totalWatchTime = watchedMovies.reduce((sum, movie) => sum + (movie.runtime || 0), 0);
  const totalWatchTimeHours = Math.round(totalWatchTime / 60);

  // Genre analysis
  const genreCounts = countGenres(watchedMovies);
  const topGenres = getTopGenres(genreCounts, 5);

  // Rating distribution
  const ratingDistribution = {
    9: watchedMovies.filter(m => m.userRating >= 9).length,
    8: watchedMovies.filter(m => m.userRating >= 8 && m.userRating < 9).length,
    7: watchedMovies.filter(m => m.userRating >= 7 && m.userRating < 8).length,
    6: watchedMovies.filter(m => m.userRating >= 6 && m.userRating < 7).length,
    5: watchedMovies.filter(m => m.userRating >= 5 && m.userRating < 6).length,
    below5: watchedMovies.filter(m => m.userRating < 5).length,
  };

  // Year analysis
  const yearStats = {};
  watchedMovies.forEach(movie => {
    const year = parseInt(movie.year);
    if (year) {
      yearStats[year] = (yearStats[year] || 0) + 1;
    }
  });

  const mostWatchedYear = Object.entries(yearStats).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h3>📊 Your Movie Analytics</h3>
        <p>Insights from your {totalMovies} watched movies</p>
      </div>

      <div className="analytics-grid">
        {/* Key Metrics */}
        <div className="analytics-card">
          <h4>🎯 Key Metrics</h4>
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-value">{totalMovies}</span>
              <span className="metric-label">Movies Watched</span>
            </div>
            <div className="metric">
              <span className="metric-value">{totalWatchTimeHours}h</span>
              <span className="metric-label">Total Watch Time</span>
            </div>
            <div className="metric">
              <span className="metric-value">{avgUserRating.toFixed(1)}</span>
              <span className="metric-label">Avg Your Rating</span>
            </div>
            <div className="metric">
              <span className="metric-value">{avgImdbRating.toFixed(1)}</span>
              <span className="metric-label">Avg IMDb Rating</span>
            </div>
          </div>
        </div>

        {/* Genre Preferences */}
        <div className="analytics-card">
          <h4>🎭 Genre Preferences</h4>
          <div className="genre-chart">
            {topGenres.map(([genre, count]) => {
              const percentage = Math.round((count / totalMovies) * 100);
              return (
                <div key={genre} className="genre-bar">
                  <div className="genre-info">
                    <span className="genre-name">{genre}</span>
                    <span className="genre-count">{count} ({percentage}%)</span>
                  </div>
                  <div className="genre-progress">
                    <div 
                      className="genre-progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="analytics-card">
          <h4>⭐ Rating Distribution</h4>
          <div className="rating-chart">
            {Object.entries(ratingDistribution).map(([range, count]) => {
              const percentage = Math.round((count / totalMovies) * 100);
              const rangeLabel = range === 'below5' ? '< 5' : `≥ ${range}`;
              return (
                <div key={range} className="rating-bar">
                  <span className="rating-label">{rangeLabel}</span>
                  <div className="rating-progress">
                    <div 
                      className="rating-progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Year Analysis */}
        <div className="analytics-card">
          <h4>📅 Year Analysis</h4>
          <div className="year-stats">
            {mostWatchedYear && (
              <div className="year-highlight">
                <span className="year-label">Most Watched Year</span>
                <span className="year-value">{mostWatchedYear[0]}</span>
                <span className="year-count">({mostWatchedYear[1]} movies)</span>
              </div>
            )}
            
            <div className="year-range">
              <span className="year-label">Year Range</span>
              <span className="year-value">
                {Math.min(...Object.keys(yearStats).map(Number))} - {Math.max(...Object.keys(yearStats).map(Number))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AnalyticsDashboard.propTypes = {
  watchedMovies: PropTypes.array.isRequired,
};
