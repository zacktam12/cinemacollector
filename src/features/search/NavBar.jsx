import PropTypes from "prop-types";

/**
 * Navigation bar container component
 */
export default function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

