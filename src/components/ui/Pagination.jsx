import PropTypes from "prop-types";

/**
 * Pagination component for navigating through pages
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        « Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        Next »
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

