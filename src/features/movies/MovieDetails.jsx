import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useKey } from "@hooks";
import TrailerButton from "@features/trailers/TrailerButton";
import { getMovieDetails } from "@services/omdbApi";
import { getPosterUrl, parseRuntime } from "@utils/helpers";
import StarRating from "@components/StarRating";
import { Loader } from "@components/ui";

/**
 * Detailed movie information view
 */
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  onUpdateWatched,
  watched,
  onToggleFavorite,
  favorites,
  onAddToWatch,
  toWatch,
}) {
  const [movie, setMovie] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [notes, setNotes] = useState("");
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watchedMovie?.userRating;
  const isFavorite = favorites.some((m) => m.imdbID === selectedId);
  const isInToWatch = toWatch.some((m) => m.imdbID === selectedId);

  // Pre-fill rating and notes if editing
  useEffect(() => {
    if (watchedMovie) {
      setUserRating(watchedMovie.userRating);
      setNotes(watchedMovie.notes || "");
    }
  }, [watchedMovie]);

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
    async function fetchMovieDetails() {
      setLoading(true);
      try {
        const data = await getMovieDetails(selectedId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => (document.title = "usePopcorn");
  }, [title]);

  useKey("Escape", onCloseMovie);

  if (isLoading) return <Loader />;
  if (!movie) return <div>No movie details available</div>;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster: poster !== "N/A" ? poster : "",
      imdbRating: Number(imdbRating) || 0,
      runtime: parseRuntime(runtime),
      userRating,
      ratingCountDecision: countRef.current,
      notes,
      dateAdded: new Date().toISOString(),
      genre,
    };

    if (isWatched) {
      onUpdateWatched(newWatchedMovie);
    } else {
      onAddWatched(newWatchedMovie);
    }
    onCloseMovie();
  }

  function handleAddToWatchList() {
    const movieToAdd = {
      imdbID: selectedId,
      title,
      year,
      poster: poster !== "N/A" ? poster : "",
      genre,
    };
    onAddToWatch(movieToAdd);
  }

  const posterUrl = getPosterUrl(poster);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={posterUrl} alt={`Poster of ${title}`} />
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
      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            onSetRating={setUserRating}
            defaultRating={isWatched ? watchedUserRating : 0}
            key={selectedId}
          />
          {userRating > 0 && (
            <button className="btn-add" onClick={handleAdd}>
              {isWatched ? "✓ Update Rating" : "+ Add to Watched"}
            </button>
          )}
        </div>

        {isWatched && (
          <p>
            You rated this movie {watchedUserRating}
            <span>⭐</span>
          </p>
        )}

        <div className="movie-notes">
          <label htmlFor="notes">Personal Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your thoughts about this movie..."
          />
        </div>

        <div className="action-buttons">
          <button
            className="btn-add"
            onClick={() =>
              onToggleFavorite({ imdbID: selectedId, title, poster, year })
            }
            style={{
              backgroundColor: isFavorite
                ? "var(--color-red)"
                : "var(--color-primary)",
            }}
          >
            {isFavorite ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
          </button>
          {!isInToWatch && (
            <button className="btn-add" onClick={handleAddToWatchList}>
              📌 Add to Watch List
            </button>
          )}
          <TrailerButton movieTitle={title} movieYear={year} />
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

MovieDetails.propTypes = {
  selectedId: PropTypes.string.isRequired,
  onCloseMovie: PropTypes.func.isRequired,
  onAddWatched: PropTypes.func.isRequired,
  onUpdateWatched: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  onAddToWatch: PropTypes.func.isRequired,
  toWatch: PropTypes.array.isRequired,
};

