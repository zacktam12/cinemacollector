import PropTypes from "prop-types";
import Movie from "./Movie";

/**
 * Trending movies component - shows popular/recent movies when no search query
 * Uses the same list format as search results
 */
export default function TrendingMovies({ onSelectMovie }) {
  // Popular recent movies data with verified poster URLs
  const trendingMovies = [
    {
      imdbID: "tt15398776",
      Title: "Oppenheimer",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt1517268",
      Title: "Barbie",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt9362722",
      Title: "Spider-Man: Across the Spider-Verse",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt10366206",
      Title: "John Wick: Chapter 4",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt6710474",
      Title: "Everything Everywhere All at Once",
      Year: "2022",
      Poster: "https://image.tmdb.org/t/p/w300/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt10954984",
      Title: "Nope",
      Year: "2022",
      Poster: "https://image.tmdb.org/t/p/w300/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt14230458",
      Title: "Teenage Mutant Ninja Turtles: Mutant Mayhem",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/ueuu9fCfBencukWG5LJPilVnqNE.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt5433140",
      Title: "Fast X",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt1745960",
      Title: "Top Gun: Maverick",
      Year: "2022",
      Poster: "https://image.tmdb.org/t/p/w300/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
      Type: "movie"
    },
    {
      imdbID: "tt8589698",
      Title: "Guardians of the Galaxy Vol. 3",
      Year: "2023",
      Poster: "https://image.tmdb.org/t/p/w300/5YZbUmjbMa3ClvSW1W7mGvP43iP.jpg",
      Type: "movie"
    }
  ];

  return (
    <>
      <div className="trending-header">
        <p className="trending-subtitle">🔥 Trending & Recently Released Movies</p>
      </div>
      <ul className="list list-movies">
        {trendingMovies.map((movie) => (
          <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
        ))}
      </ul>
    </>
  );
}

TrendingMovies.propTypes = {
  onSelectMovie: PropTypes.func.isRequired,
};
