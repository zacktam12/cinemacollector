import { useEffect } from "react";

/**
 * Custom hook to handle keyboard events
 * @param {string} key - Key to listen for
 * @param {Function} action - Callback function to execute
 */
export default function useKey(key, action) {
  useEffect(() => {
    function handleKeyPress(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    
    document.addEventListener("keydown", handleKeyPress);
    
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [action, key]);
}

