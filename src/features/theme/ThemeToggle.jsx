import PropTypes from "prop-types";

/**
 * Theme toggle button component
 */
export default function ThemeToggle({ theme, onToggleTheme }) {
  return (
    <button className="theme-toggle" onClick={onToggleTheme}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

ThemeToggle.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

