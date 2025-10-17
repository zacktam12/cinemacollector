import { useEffect, useState } from "react";
import { useMovies, useLocalStorageState } from "@hooks";
import { STORAGE_KEYS, THEMES, RESULTS_PER_PAGE } from "@utils/constants";

// Feature Components
import { ThemeToggle } from "@features/theme";
import { NavBar, Logo, SearchBar, NumResults } from "@features/search";
import { MovieList, MovieDetails, TrendingMovies } from "@features/movies";
import {
  WatchedSummary,
  WatchedMoviesList,
  ToWatchList,
  FavoritesList,
} from "@features/lists";
import { RecommendationsPanel } from "@features/recommendations";
import { AnalyticsDashboard } from "@features/analytics";

// UI Components
import { Box, SkeletonLoader, ErrorMessage, EmptyState, Pagination, Tabs, useToast } from "@components/ui";

/**
 * Main App Component - Orchestrates all features
 */
export default function App() {
  // Toast notifications
  const toast = useToast();
  // Search State
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showHistory, setShowHistory] = useState(false);

  // Theme State
  const [theme, setTheme] = useLocalStorageState(THEMES.DARK, STORAGE_KEYS.THEME);
  
  // Tab State
  const [activeTab, setActiveTab] = useState("watched");

  // Search History
  const [searchHistory, setSearchHistory] = useLocalStorageState([], STORAGE_KEYS.SEARCH_HISTORY);

  // Movie Lists
  const { movies, error, isLoading, totalResults } = useMovies(query, null, page);
  const [watched, setWatched] = useLocalStorageState([], STORAGE_KEYS.WATCHED);
  const [toWatch, setToWatch] = useLocalStorageState([], STORAGE_KEYS.TO_WATCH);
  const [favorites, setFavorites] = useLocalStorageState([], STORAGE_KEYS.FAVORITES);

  // Apply theme to document
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // Handlers
  const handleSelectedId = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    if (watched.some((m) => m.imdbID === movie.imdbID)) {
      toast.warning("This movie is already in your watched list!");
      return;
    }
    setWatched((watched) => [...watched, movie]);
    toast.success("Movie added to watched list!");
  };

  const handleEditMovie = (id) => {
    setSelectedId(id);
  };

  const handleUpdateWatched = (updatedMovie) => {
    setWatched((watched) =>
      watched.map((m) => (m.imdbID === updatedMovie.imdbID ? updatedMovie : m))
    );
  };

  const handleDeleteMovie = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  const handleToggleFavorite = (movie) => {
    if (favorites.some((m) => m.imdbID === movie.imdbID)) {
      setFavorites((favorites) =>
        favorites.filter((m) => m.imdbID !== movie.imdbID)
      );
    } else {
      setFavorites((favorites) => [...favorites, movie]);
    }
  };

  const handleAddToWatch = (movie) => {
    if (toWatch.some((m) => m.imdbID === movie.imdbID)) {
      toast.warning("This movie is already in your To Watch list!");
      return;
    }
    setToWatch((toWatch) => [...toWatch, movie]);
    toast.success("Movie added to watch list!");
  };

  const handleDeleteToWatch = (id) => {
    setToWatch((toWatch) => toWatch.filter((movie) => movie.imdbID !== id));
  };

  const handleToggleTheme = () => {
    setTheme((theme) => (theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK));
  };

  const addToSearchHistory = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) return;
    setSearchHistory((history) => {
      const newHistory = [searchTerm, ...history.filter((h) => h !== searchTerm)];
      return newHistory.slice(0, 10);
    });
  };

  // Export/import functionality removed per request

  

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  return (
    <>
      <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />

      <NavBar>
        <Logo />
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={addToSearchHistory}
          searchHistory={searchHistory}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          onClearHistory={() => setSearchHistory([])}
          onSelectHistory={(term) => {
            setQuery(term);
            setShowHistory(false);
            setPage(1);
          }}
        />
        <NumResults movies={movies} totalResults={totalResults} />
      </NavBar>

      <main className="main">
        {/* Search Results Box */}
        <Box>
          {isLoading && <SkeletonLoader type="movie" count={10} />}
          {!error && !isLoading && movies?.length > 0 && (
            <>
              <MovieList movies={movies} onSelectMovie={handleSelectedId} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && movies?.length === 0 && query.length >= 3 && (
            <EmptyState
              message="No movies found"
              description="Try searching for something else"
            />
          )}
          {!isLoading && !error && query.length < 3 && (
            <TrendingMovies onSelectMovie={handleSelectedId} />
          )}
        </Box>

        {/* Lists/Details Box */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onUpdateWatched={handleUpdateWatched}
              watched={watched}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
              onAddToWatch={handleAddToWatch}
              toWatch={toWatch}
            />
          ) : (
            <>
              <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "watched" && (
                <>
                  {watched.length > 0 ? (
                    <>
                      <WatchedSummary watched={watched} />
                      <WatchedMoviesList
                        watched={watched}
                        onDeleteWatched={handleDeleteMovie}
                        onEditMovie={handleEditMovie}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </>
                  ) : (
                    <EmptyState
                      message="No watched movies yet"
                      description="Search for a movie and add it to your watched list"
                    />
                  )}
                </>
              )}

              {activeTab === "toWatch" && (
                <>
                  {toWatch.length > 0 ? (
                    <ToWatchList
                      toWatch={toWatch}
                      onDelete={handleDeleteToWatch}
                      onSelectMovie={handleSelectedId}
                    />
                  ) : (
                    <EmptyState
                      message="Your To Watch list is empty"
                      description="Add movies you want to watch later"
                    />
                  )}
                </>
              )}

              {activeTab === "favorites" && (
                <>
                  {favorites.length > 0 ? (
                    <FavoritesList
                      favorites={favorites}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectMovie={handleSelectedId}
                    />
                  ) : (
                    <EmptyState
                      message="No favorite movies yet"
                      description="Mark movies as favorites to see them here"
                    />
                  )}
                </>
              )}

              {activeTab === "analytics" && (
                <AnalyticsDashboard watchedMovies={watched} />
              )}

              {activeTab === "recommendations" && (
                <RecommendationsPanel 
                  watchedMovies={watched} 
                  onSelectMovie={handleSelectedId}
                />
              )}
            </>
          )}
        </Box>
      </main>
    </>
  );
}

