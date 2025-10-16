import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Reusable container with a toggle button
 */
export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node,
};

