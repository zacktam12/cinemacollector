import { useState, useEffect } from "react";

/**
 * Custom hook for state management with localStorage persistence
 * @param {*} initialState - Initial state value
 * @param {string} key - localStorage key
 * @returns {Array} - [value, setValue] tuple like useState
 */
export default function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [value, key]);

  return [value, setValue];
}

