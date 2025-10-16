import { useRef } from "react";
import PropTypes from "prop-types";
import { useKey } from "@hooks";

/**
 * Search bar component with history dropdown
 */
export default function SearchBar({
  query,
  setQuery,
  onSearch,
  searchHistory,
  showHistory,
  setShowHistory,
  onClearHistory,
  onSelectHistory,
}) {
  const inputEl = useRef();

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      if (query.length >= 3) {
        onSearch(query);
      }
      return;
    }
    inputEl.current.focus();
    setQuery("");
  });

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    setShowHistory(value.length === 0 && searchHistory.length > 0);
  }

  return (
    <div className="search-wrapper">
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        onFocus={() =>
          setShowHistory(query.length === 0 && searchHistory.length > 0)
        }
        onBlur={() => setTimeout(() => setShowHistory(false), 200)}
        ref={inputEl}
      />
      {showHistory && searchHistory.length > 0 && (
        <div className="search-history">
          {searchHistory.map((term, index) => (
            <div
              key={index}
              className="search-history-item"
              onClick={() => onSelectHistory(term)}
            >
              <span>{term}</span>
              <span>🔍</span>
            </div>
          ))}
          <div className="search-history-clear" onClick={onClearHistory}>
            Clear History
          </div>
        </div>
      )}
    </div>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchHistory: PropTypes.array.isRequired,
  showHistory: PropTypes.bool.isRequired,
  setShowHistory: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  onSelectHistory: PropTypes.func.isRequired,
};

