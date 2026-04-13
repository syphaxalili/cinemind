import { useState } from "react";
import "./App.css";

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalMovie, setOriginalMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!movieTitle.trim()) {
      setError("Veuillez entrer un titre de film");
      return;
    }

    setLoading(true);
    setError("");
    setOriginalMovie(null);
    setRecommendations([]);

    try {
      const response = await fetch(
        `http://localhost:5000/api/recommendations/${encodeURIComponent(movieTitle)}`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la recherche");
      }

      const data = await response.json();
      setOriginalMovie(data.originalMovie);
      setRecommendations(data.recommendations);

      if (data.recommendations.length === 0) {
        setError(
          "Aucune recommandation trouvée avec les critères de filtrage (note > 7 et genres communs)",
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 CineMind</h1>
        <p className="subtitle">Système de Recommandation Intelligent</p>
      </header>

      <main className="main">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Entrez un titre de film..."
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            className="search-input"
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Recherche..." : "Recommander"}
          </button>
        </form>

        {error && <div className="error-message">⚠️ {error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyse en cours...</p>
          </div>
        )}

        {originalMovie && (
          <div className="original-movie">
            <h2>Film recherché</h2>
            <div className="movie-card featured">
              {originalMovie.poster_path && (
                <img
                  src={originalMovie.poster_path}
                  alt={originalMovie.title}
                />
              )}
              <div className="movie-info">
                <h3>{originalMovie.title}</h3>
                <div className="rating">
                  ⭐ {originalMovie.vote_average.toFixed(1)}
                </div>
                {originalMovie.genres && originalMovie.genres.length > 0 && (
                  <div className="genres">
                    {originalMovie.genres.map((genre, index) => (
                      <span key={index} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="recommendations">
            <h2>Recommandations (Note {">"} 7 + Genres communs)</h2>
            <div className="movies-grid">
              {recommendations.map((movie) => (
                <div key={movie.id} className="movie-card">
                  {movie.poster_path ? (
                    <img src={movie.poster_path} alt={movie.title} />
                  ) : (
                    <div className="no-poster">🎬</div>
                  )}
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <div className="rating">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                    {movie.release_date && (
                      <p className="release-date">
                        {new Date(movie.release_date).getFullYear()}
                      </p>
                    )}
                    {movie.genres && movie.genres.length > 0 && (
                      <div className="genres">
                        {movie.genres.map((genre, index) => (
                          <span key={index} className="genre-tag">
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
