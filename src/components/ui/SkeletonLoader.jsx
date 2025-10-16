import PropTypes from "prop-types";

/**
 * Skeleton loader component for better perceived performance
 */
export default function SkeletonLoader({ type = "movie", count = 5 }) {
  return (
    <>
      {type === "movie" && (
        <ul className="list list-movies">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} className="skeleton-movie">
              <div className="skeleton-poster"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-year"></div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {type === "details" && (
        <div className="skeleton-details">
          <div className="skeleton-header">
            <div className="skeleton-poster-large"></div>
            <div className="skeleton-info">
              <div className="skeleton-title-large"></div>
              <div className="skeleton-meta"></div>
              <div className="skeleton-meta"></div>
              <div className="skeleton-rating"></div>
            </div>
          </div>
          <div className="skeleton-plot"></div>
          <div className="skeleton-plot short"></div>
        </div>
      )}

      {type === "card" && (
        <div className="skeleton-card">
          <div className="skeleton-card-header"></div>
          <div className="skeleton-card-body">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      )}
    </>
  );
}

SkeletonLoader.propTypes = {
  type: PropTypes.oneOf(["movie", "details", "card"]),
  count: PropTypes.number,
};

