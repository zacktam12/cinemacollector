import PropTypes from "prop-types";
import { useState } from "react";

/**
 * Movie recommendations panel
 */
export default function RecommendationsPanel({ watchedMovies, onSelectMovie }) {
  const [activeTab, setActiveTab] = useState("similar");

  // Generate recommendations based on watch history
  const getRecommendations = () => {
    if (!watchedMovies || watchedMovies.length === 0) {
      return {
        similar: [],
        trending: [],
        basedOnGenre: [],
      };
    }

    // Enhanced mock recommendations with proper poster URLs and more data
    const mockRecommendations = {
      similar: [
        { 
          imdbID: "tt0068646", 
          Title: "The Godfather", 
          Year: "1972", 
          Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", 
          genre: "Crime, Drama",
          imdbRating: "9.2",
          Plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
        },
        { 
          imdbID: "tt0110912", 
          Title: "Pulp Fiction", 
          Year: "1994", 
          Poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", 
          genre: "Crime, Drama",
          imdbRating: "8.9",
          Plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
        },
        { 
          imdbID: "tt0099685", 
          Title: "Goodfellas", 
          Year: "1990", 
          Poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtNzVkYy00ZGI3LWEwNzUtYjI2YjVjNGI2ZDAyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", 
          genre: "Crime, Drama",
          imdbRating: "8.7",
          Plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners."
        },
      ],
      trending: [
        { 
          imdbID: "tt15398776", 
          Title: "Oppenheimer", 
          Year: "2023", 
          Poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2ZTY@._V1_SX300.jpg", 
          genre: "Biography, Drama",
          imdbRating: "8.6",
          Plot: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
          Director: "Christopher Nolan",
          Runtime: "180 min",
          Released: "21 Jul 2023"
        },
        { 
          imdbID: "tt1517268", 
          Title: "Barbie", 
          Year: "2023", 
          Poster: "https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LWEzNzktY2JhYTQ1OGY5NDQ5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg", 
          genre: "Comedy, Adventure",
          imdbRating: "6.3",
          Plot: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
          Director: "Greta Gerwig",
          Runtime: "114 min",
          Released: "21 Jul 2023"
        },
        { 
          imdbID: "tt9362722", 
          Title: "Spider-Man: Across the Spider-Verse", 
          Year: "2023", 
          Poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_SX300.jpg", 
          genre: "Animation, Action",
          imdbRating: "8.7",
          Plot: "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
          Director: "Joaquim Dos Santos",
          Runtime: "140 min",
          Released: "02 Jun 2023"
        },
        { 
          imdbID: "tt10366206", 
          Title: "John Wick: Chapter 4", 
          Year: "2023", 
          Poster: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg", 
          genre: "Action, Crime",
          imdbRating: "8.0",
          Plot: "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
          Director: "Chad Stahelski",
          Runtime: "169 min",
          Released: "24 Mar 2023"
        },
        { 
          imdbID: "tt6710474", 
          Title: "Everything Everywhere All at Once", 
          Year: "2022", 
          Poster: "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmNjhkXkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg", 
          genre: "Action, Adventure",
          imdbRating: "8.1",
          Plot: "A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
          Director: "Daniel Kwan",
          Runtime: "139 min",
          Released: "25 Mar 2022"
        },
        { 
          imdbID: "tt10954984", 
          Title: "Nope", 
          Year: "2022", 
          Poster: "https://m.media-amazon.com/images/M/MV5BZjU0ZDU3MjItYzBmYi00YzBkLWJhNzctNzY3OWE1ZjJiZWI3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg", 
          genre: "Horror, Mystery",
          imdbRating: "6.8",
          Plot: "The residents of a lonely gulch in inland California bear witness to an uncanny, chilling discovery.",
          Director: "Jordan Peele",
          Runtime: "130 min",
          Released: "22 Jul 2022"
        },
      ],
      basedOnGenre: [
        { 
          imdbID: "tt1375666", 
          Title: "Inception", 
          Year: "2010", 
          Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", 
          genre: "Action, Sci-Fi",
          imdbRating: "8.8",
          Plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea."
        },
        { 
          imdbID: "tt0133093", 
          Title: "The Matrix", 
          Year: "1999", 
          Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", 
          genre: "Action, Sci-Fi",
          imdbRating: "8.7",
          Plot: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
        },
        { 
          imdbID: "tt1856101", 
          Title: "Blade Runner 2049", 
          Year: "2017", 
          Poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg", 
          genre: "Sci-Fi, Thriller",
          imdbRating: "8.0",
          Plot: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard."
        },
      ],
    };

    return mockRecommendations;
  };

  const recommendations = getRecommendations();

  const tabs = [
    { id: "similar", label: "Similar to Your Favorites", icon: "🎯" },
    { id: "trending", label: "Trending Now", icon: "🔥" },
    { id: "basedOnGenre", label: "Based on Your Genres", icon: "🎭" },
  ];

  return (
    <div className="recommendations-panel">
      <div className="recommendations-header">
        <h3>🎬 Recommendations</h3>
        <p>Discover your next favorite movie</p>
      </div>

      <div className="recommendations-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`recommendation-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="recommendations-content">
        <div className="recommendations-grid">
          {recommendations[activeTab]?.map((movie) => (
            <div
              key={movie.imdbID}
              className="recommendation-card"
              onClick={() => onSelectMovie(movie.imdbID)}
            >
              <div className="recommendation-poster">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Poster"}
                  alt={`${movie.Title} poster`}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x300?text=No+Poster";
                  }}
                />
                <div className="recommendation-overlay">
                  <span className="recommendation-year">{movie.Year}</span>
                  {movie.imdbRating && (
                    <span className="recommendation-rating">⭐ {movie.imdbRating}</span>
                  )}
                </div>
              </div>
              <div className="recommendation-info">
                <h4 className="recommendation-title">{movie.Title}</h4>
                <p className="recommendation-genre">{movie.genre}</p>
                {movie.Director && (
                  <p className="recommendation-director">📽️ {movie.Director}</p>
                )}
                <div className="recommendation-meta">
                  {movie.Runtime && (
                    <span className="recommendation-runtime">⏱️ {movie.Runtime}</span>
                  )}
                  {movie.Released && (
                    <span className="recommendation-released">📅 {movie.Released}</span>
                  )}
                </div>
                {movie.Plot && (
                  <p className="recommendation-plot">
                    {movie.Plot.length > 120 ? `${movie.Plot.substring(0, 120)}...` : movie.Plot}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {recommendations[activeTab]?.length === 0 && (
          <div className="no-recommendations">
            <p>Start watching movies to get personalized recommendations!</p>
          </div>
        )}
      </div>
    </div>
  );
}

RecommendationsPanel.propTypes = {
  watchedMovies: PropTypes.array.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
};
