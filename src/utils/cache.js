/**
 * API Response Caching Utility
 * Caches API responses in sessionStorage with expiration
 */

const CACHE_PREFIX = "omdb_cache_";
const DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes

/**
 * Get cached data
 */
export const getCachedData = (key) => {
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!cached) return null;

    const { data, timestamp, ttl } = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is expired
    if (now - timestamp > ttl) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
};

/**
 * Set cached data
 */
export const setCachedData = (key, data, ttl = DEFAULT_TTL) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Cache write error:", error);
    // If storage is full, clear old cache
    if (error.name === "QuotaExceededError") {
      clearOldCache();
      // Try again
      try {
        const cacheData = {
          data,
          timestamp: Date.now(),
          ttl,
        };
        sessionStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheData));
      } catch (retryError) {
        console.error("Cache write retry failed:", retryError);
      }
    }
  }
};

/**
 * Clear all cache
 */
export const clearCache = () => {
  try {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error("Cache clear error:", error);
  }
};

/**
 * Clear old/expired cache entries
 */
export const clearOldCache = () => {
  try {
    const keys = Object.keys(sessionStorage);
    const now = Date.now();
    
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        try {
          const cached = sessionStorage.getItem(key);
          if (cached) {
            const { timestamp, ttl } = JSON.parse(cached);
            if (now - timestamp > ttl) {
              sessionStorage.removeItem(key);
            }
          }
        } catch {
          // If parsing fails, remove the item
          sessionStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error("Clear old cache error:", error);
  }
};

/**
 * Generate cache key from query parameters
 */
export const generateCacheKey = (...params) => {
  return params.filter(Boolean).join("_");
};

