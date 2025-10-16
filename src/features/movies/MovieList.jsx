import PropTypes from "prop-types";
import Movie from "./Movie";

/**
 * List of movies from search results
 */
export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};

