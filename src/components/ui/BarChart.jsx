import PropTypes from "prop-types";

/**
 * Simple bar chart component
 */
export default function BarChart({ data, maxValue, height = 200 }) {
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="bar-chart" style={{ height: `${height}px` }}>
      <div className="bar-chart-bars">
        {data.map((item, index) => {
          const percentage = (item.value / max) * 100;
          return (
            <div key={index} className="bar-chart-item">
              <div className="bar-chart-bar-container">
                <div
                  className="bar-chart-bar"
                  style={{ height: `${percentage}%` }}
                  title={`${item.label}: ${item.value}`}
                >
                  <span className="bar-chart-value">{item.value}</span>
                </div>
              </div>
              <div className="bar-chart-label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
  maxValue: PropTypes.number,
  height: PropTypes.number,
};

