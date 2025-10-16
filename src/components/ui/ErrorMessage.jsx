import PropTypes from "prop-types";

/**
 * Error message component
 */
export default function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>🌋</span>
      {message}
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

