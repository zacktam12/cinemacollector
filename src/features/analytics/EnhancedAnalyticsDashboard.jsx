import PropTypes from "prop-types";
import { average, countGenres, getTopGenres } from "@utils/helpers";
import ProgressBar from "@components/ui/ProgressBar";
import BarChart from "@components/ui/BarChart";

/**
 * Enhanced analytics dashboard with visual charts
 */
export default function EnhancedAnalyticsDashboard({ watchedMovies }) {
  if (!watchedMovies || watchedMovies.length === 0) {
    return (
      <div className="analytics-dashboard">
        <div className="analytics-header">
          <h3>📊 Enhanced Analytics</h3>
          <p>Start watching movies to see your statistics!</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalMovies = watchedMovies.length;
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const totalWatchTime = watchedMovies.reduce((sum, movie) => sum + (movie.runtime || 0), 0);

  // Genre analysis
  const genreCounts = countGenres(watchedMovies);
  const topGenres = getTopGenres(genreCounts, 10);

  // Rating distribution
  const ratingDistribution = [
    { label: "1-2", value: watchedMovies.filter((m) => m.userRating >= 1 && m.userRating < 3).length },
    { label: "3-4", value: watchedMovies.filter((m) => m.userRating >= 3 && m.userRating < 5).length },
    { label: "5-6", value: watchedMovies.filter((m) => m.userRating >= 5 && m.userRating < 7).length },
    { label: "7-8", value: watchedMovies.filter((m) => m.userRating >= 7 && m.userRating < 9).length },
    { label: "9-10", value: watchedMovies.filter((m) => m.userRating >= 9).length },
  ];

  // Year distribution
  const yearCounts = {};
  watchedMovies.forEach((movie) => {
    const year = parseInt(movie.year);
    if (year) {
      const decade = Math.floor(year / 10) * 10;
      yearCounts[decade] = (yearCounts[decade] || 0) + 1;
    }
  });

  const yearData = Object.entries(yearCounts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .slice(-10)
    .map(([decade, count]) => ({
      label: `${decade}s`,
      value: count,
    }));

  return (
    <div className="analytics-dashboard enhanced">
      <div className="analytics-header">
        <h3>📊 Enhanced Analytics</h3>
        <p>Visual insights from your {totalMovies} watched movies</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🎬</div>
          <div className="metric-content">
            <div className="metric-value">{totalMovies}</div>
            <div className="metric-label">Movies Watched</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <div className="metric-value">{Math.round(totalWatchTime / 60)}h</div>
            <div className="metric-label">Total Watch Time</div>
            <div className="metric-sublabel">{totalWatchTime} minutes</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <div className="metric-value">{avgUserRating.toFixed(1)}</div>
            <div className="metric-label">Your Avg Rating</div>
            <ProgressBar value={avgUserRating} max={10} showPercentage={false} color="success" />
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🌟</div>
          <div className="metric-content">
            <div className="metric-value">{avgImdbRating.toFixed(1)}</div>
            <div className="metric-label">Avg IMDb Rating</div>
            <ProgressBar value={avgImdbRating} max={10} showPercentage={false} color="warning" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="analytics-charts">
        {/* Rating Distribution Chart */}
        <div className="chart-card">
          <h4>⭐ Your Rating Distribution</h4>
          <BarChart data={ratingDistribution} height={180} />
        </div>

        {/* Genre Preferences */}
        <div className="chart-card">
          <h4>🎭 Top Genres</h4>
          <div className="genre-bars">
            {topGenres.slice(0, 8).map(([genre, count]) => (
              <ProgressBar
                key={genre}
                label={genre}
                value={count}
                max={totalMovies}
                color="primary"
              />
            ))}
          </div>
        </div>

        {/* Decade Distribution */}
        {yearData.length > 0 && (
          <div className="chart-card full-width">
            <h4>📅 Movies by Decade</h4>
            <BarChart data={yearData} height={180} />
          </div>
        )}
      </div>

      {/* Additional Stats */}
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Highest Rated</span>
          <span className="stat-value">
            {Math.max(...watchedMovies.map((m) => m.userRating))} ⭐
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Lowest Rated</span>
          <span className="stat-value">
            {Math.min(...watchedMovies.map((m) => m.userRating))} ⭐
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Movies Rated 9+</span>
          <span className="stat-value">
            {watchedMovies.filter((m) => m.userRating >= 9).length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Average Runtime</span>
          <span className="stat-value">
            {Math.round(totalWatchTime / totalMovies)} min
          </span>
        </div>
      </div>
    </div>
  );
}

EnhancedAnalyticsDashboard.propTypes = {
  watchedMovies: PropTypes.array.isRequired,
};

