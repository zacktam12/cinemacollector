import { useState, useEffect } from "react";

/**
 * Custom hook to persist state in localStorage
 * @param {any} initialState - The initial state value.
 * @param {string} key - The localStorage key to store the state.
 * @returns {[any, Function]} - The current state value and the function to update it.
 */
export default function useLocalStorageState(initialState, key) {
  // Initialize state with either value from localStorage or the default value
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      // If there's stored data, parse it, otherwise return initialState
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      // If parsing fails (e.g., corrupted data), return the initialState
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialState;
    }
  });

  // Persist the state value to localStorage when it changes
  useEffect(() => {
    try {
      // Avoid updating localStorage if value is undefined or null
      if (value !== undefined && value !== null) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [value, key]);

  return [value, setValue];
}
