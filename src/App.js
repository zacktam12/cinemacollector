import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import useMovies from "./useMovies";
import useLocalStorageState from "./useLocalStorageState";
import useKey from "./useKey";

// API Key for OMDb API
const KEY = "6e0f586";

// Utility function to calculate the average of an array
const average = (arr) =>
  arr.reduce((sum, val) => sum + val, 0) / arr.length || 0;

// Main App component
export default function App() {
  const [selectedId, setSelectedId] = useState(null); // State for selected movie ID
  const [query, setQuery] = useState(""); // State for search query

  // Custom hooks for fetching movies and managing watched list
  const { movies, error, isLoading } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // Handle selecting/deselecting a movie
  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  // Close movie details view
  function handleCloseMovie() {
    setSelectedId(null);
  }

  // Add a movie to the watched list
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  // Remove a movie from the watched list
  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      {/* Navigation bar */}
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* Movie list or loader/error messages */}
        <Box>
          {isLoading && <Loader />}
          {!error && !isLoading && movies?.length > 0 && (
            <MovieList movies={movies} onSelectMovie={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* Movie details or watched list */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// Main container for the app's content
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// Navigation bar component
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

// Logo component
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

// Component to display the number of results found
function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// Search bar component
function Search({ query, setQuery }) {
  const inputEl = useRef(); // Ref to focus the input element

  // Use Enter key to reset the query and focus the input
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

// Reusable container with a toggle button
function Box({ children }) {
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

// List of movies
function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

// Single movie item in the list
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img
        src={movie.Poster || "default-poster.jpg"}
        alt={`${movie.Title} poster`}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

// Movie details view
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState(null); // State for movie details
  const [isLoading, setLoading] = useState(false); // Loading state
  const [userRating, setUserRating] = useState(""); // User's rating
  const countRef = useRef(0); // Count of user rating updates

  useEffect(() => {
    // Increment rating update count when userRating changes
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  // Destructure movie details for easier access
  const {
    Title: title,
    Year: year = "",
    Poster: poster = "",
    Runtime: runtime = "",
    imdbRating = "",
    Plot: plot = "",
    Released: released = "",
    Actors: actors = "",
    Director: director = "",
    Genre: genre = "",
  } = movie || {};

  useEffect(() => {
    // Fetch movie details when selectedId changes
    async function getMovieDetails() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    // Update document title with the movie title
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => (document.title = "usePopcorn");
  }, [title]);

  useKey("Escape", onCloseMovie); // Close movie details on Escape key

  if (isLoading) return <Loader />;
  if (!movie) return <div>No movie details available</div>;

  function handleAdd() {
    // Add the movie to the watched list
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]) || 0,
      userRating,
      ratingCountDicision: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {/* Header with movie overview */}
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      {/* Section with additional details and rating */}
      <section>
        {!isWatched ? (
          <div className="rating">
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>
            )}
          </div>
        ) : (
          <p>
            You rated this movie {watchedUserRating}
            <span>⭐</span>
          </p>
        )}
        <em>{plot}</em>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

// Loader component
function Loader() {
  return <div className="loader">Loading...</div>;
}

// Error message component
function ErrorMessage({ message }) {
  return (
    <div className="error">
      <span>🌋</span>
      {message}
    </div>
  );
}

// Summary of watched movies
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}

// List of watched movies
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

// Single movie in the watched list
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
