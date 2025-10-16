import PropTypes from "prop-types";
import { useState } from "react";

/**
 * Trailer button component with modal
 */
export default function TrailerButton({ movieTitle, movieYear }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate YouTube search URL for movie trailer
  const getTrailerUrl = () => {
    const searchQuery = `${movieTitle} ${movieYear} official trailer`;
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.youtube.com/results?search_query=${encodedQuery}`;
  };

  const handleTrailerClick = () => {
    // Open YouTube search in new tab
    window.open(getTrailerUrl(), '_blank');
  };

  return (
    <>
      <button
        className="btn-trailer"
        onClick={handleTrailerClick}
        title={`Watch trailer for ${movieTitle}`}
      >
        <span className="trailer-icon">🎥</span>
        <span className="trailer-text">Watch Trailer</span>
      </button>

      {/* Future: Modal implementation for embedded trailer */}
      {isModalOpen && (
        <div className="trailer-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="trailer-modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className="trailer-content">
              <p>Trailer modal would go here</p>
              <p>Currently opens YouTube search in new tab</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

TrailerButton.propTypes = {
  movieTitle: PropTypes.string.isRequired,
  movieYear: PropTypes.string.isRequired,
};
