import PropTypes from "prop-types";

/**
 * Progress bar component for visual data representation
 */
export default function ProgressBar({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  color = "primary" 
}) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <div className="progress-bar-container">
      {label && (
        <div className="progress-bar-label">
          <span>{label}</span>
          {showPercentage && <span>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="progress-bar-track">
        <div
          className={`progress-bar-fill progress-bar-${color}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {!label && showPercentage && (
            <span className="progress-bar-text">{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  label: PropTypes.string,
  showPercentage: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "success", "warning", "danger", "info"]),
};

