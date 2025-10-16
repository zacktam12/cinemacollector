import PropTypes from "prop-types";

/**
 * Empty state component with helpful message
 */
export default function EmptyState({ message, description }) {
  return (
    <div className="empty-state">
      <h3>{message}</h3>
      <p>{description}</p>
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

