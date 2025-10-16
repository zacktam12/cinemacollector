import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Advanced search filters component
 */
export default function AdvancedFilters({ onApplyFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: "all", // all, movie, series
    yearFrom: "",
    yearTo: "",
    genre: "all",
    minRating: "",
  });

  const genres = [
    "all",
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  const currentYear = new Date().getFullYear();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    setShowFilters(false);
  };

  const handleReset = () => {
    const resetFilters = {
      type: "all",
      yearFrom: "",
      yearTo: "",
      genre: "all",
      minRating: "",
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value, idx) => idx === 0 ? value !== "all" : value !== "" && value !== "all"
  );

  return (
    <div className="advanced-filters">
      <button
        className={`btn-filters ${hasActiveFilters ? "active" : ""}`}
        onClick={() => setShowFilters(!showFilters)}
        title="Advanced Filters"
      >
        <span>🔍</span>
        <span>Filters</span>
        {hasActiveFilters && <span className="filter-badge">•</span>}
      </button>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Advanced Filters</h3>
            <button
              className="btn-close-filters"
              onClick={() => setShowFilters(false)}
            >
              ×
            </button>
          </div>

          <div className="filters-content">
            {/* Type Filter */}
            <div className="filter-group">
              <label htmlFor="filter-type">Type</label>
              <select
                id="filter-type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="all">All</option>
                <option value="movie">Movies</option>
                <option value="series">TV Series</option>
              </select>
            </div>

            {/* Year Range */}
            <div className="filter-group">
              <label>Year Range</label>
              <div className="filter-range">
                <input
                  type="number"
                  placeholder="From"
                  min="1900"
                  max={currentYear}
                  value={filters.yearFrom}
                  onChange={(e) => handleFilterChange("yearFrom", e.target.value)}
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="To"
                  min="1900"
                  max={currentYear}
                  value={filters.yearTo}
                  onChange={(e) => handleFilterChange("yearTo", e.target.value)}
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div className="filter-group">
              <label htmlFor="filter-genre">Genre</label>
              <select
                id="filter-genre"
                value={filters.genre}
                onChange={(e) => handleFilterChange("genre", e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div className="filter-group">
              <label htmlFor="filter-rating">Minimum IMDb Rating</label>
              <input
                id="filter-rating"
                type="number"
                placeholder="e.g., 7.0"
                min="1"
                max="10"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => handleFilterChange("minRating", e.target.value)}
              />
            </div>
          </div>

          <div className="filters-actions">
            <button className="btn-secondary" onClick={handleReset}>
              Reset
            </button>
            <button className="btn" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

AdvancedFilters.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
};

