import PropTypes from "prop-types";

/**
 * Component to display the number of search results found
 */
export default function NumResults({ movies, totalResults }) {
  return (
    <p className="num-results">
      Found <strong>{totalResults || movies.length}</strong> results
    </p>
  );
}

NumResults.propTypes = {
  movies: PropTypes.array.isRequired,
  totalResults: PropTypes.number,
};

