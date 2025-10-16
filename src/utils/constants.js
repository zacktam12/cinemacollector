// API Configuration
export const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
export const OMDB_API_BASE_URL = "https://www.omdbapi.com/";
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

// Validate API keys
if (!OMDB_API_KEY) {
  console.warn('⚠️ OMDB API key is missing. Please add VITE_OMDB_API_KEY to .env.local');
}

// App Configuration
export const MIN_SEARCH_LENGTH = 3;
export const MAX_SEARCH_HISTORY = 10;
export const RESULTS_PER_PAGE = 10;

// Storage Keys
export const STORAGE_KEYS = {
  WATCHED: "watched",
  TO_WATCH: "toWatch",
  FAVORITES: "favorites",
  THEME: "theme",
  SEARCH_HISTORY: "searchHistory",
};

// Themes
export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
};

