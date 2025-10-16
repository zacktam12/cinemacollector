import PropTypes from "prop-types";

/**
 * View toggle component - switch between list and grid views
 */
export default function ViewToggle({ view, onViewChange, showCompactToggle = true, isCompact, onCompactToggle }) {
  return (
    <div className="view-toggle">
      <div className="view-type-toggle">
        <button
          className={`view-btn ${view === "list" ? "active" : ""}`}
          onClick={() => onViewChange("list")}
          title="List view"
          aria-label="List view"
        >
          ☰
        </button>
        <button
          className={`view-btn ${view === "grid" ? "active" : ""}`}
          onClick={() => onViewChange("grid")}
          title="Grid view"
          aria-label="Grid view"
        >
          ⊞
        </button>
      </div>

      {showCompactToggle && (
        <button
          className={`compact-toggle ${isCompact ? "active" : ""}`}
          onClick={onCompactToggle}
          title={isCompact ? "Normal view" : "Compact view"}
        >
          {isCompact ? "◫" : "◰"} {isCompact ? "Normal" : "Compact"}
        </button>
      )}
    </div>
  );
}

ViewToggle.propTypes = {
  view: PropTypes.oneOf(["list", "grid"]).isRequired,
  onViewChange: PropTypes.func.isRequired,
  showCompactToggle: PropTypes.bool,
  isCompact: PropTypes.bool,
  onCompactToggle: PropTypes.func,
};

