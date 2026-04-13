import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

app.use(cors());
app.use(express.json());

app.get('/api/recommendations/:movieTitle', async (req, res) => {
  try {
    const { movieTitle } = req.params;

    if (!movieTitle) {
      return res.status(400).json({ error: 'Le titre du film est requis' });
    }

    const searchResponse = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: movieTitle,
        language: 'fr-FR'
      }
    });

    if (!searchResponse.data.results || searchResponse.data.results.length === 0) {
      return res.status(404).json({ error: 'Film non trouvé' });
    }

    const movie = searchResponse.data.results[0];
    const movieId = movie.id;
    const movieGenres = movie.genre_ids;

    const recommendationsResponse = await axios.get(
      `${TMDB_BASE_URL}/movie/${movieId}/recommendations`,
      {
        params: {
          api_key: TMDB_API_KEY,
          language: 'fr-FR'
        }
      }
    );

    const filteredRecommendations = recommendationsResponse.data.results.filter(
      (rec) => {
        const hasHighRating = rec.vote_average > 7;
        const hasCommonGenre = rec.genre_ids.some((genreId) =>
          movieGenres.includes(genreId)
        );
        return hasHighRating && hasCommonGenre;
      }
    );

    const recommendations = filteredRecommendations.slice(0, 12).map((rec) => ({
      id: rec.id,
      title: rec.title,
      vote_average: rec.vote_average,
      poster_path: rec.poster_path
        ? `https://image.tmdb.org/t/p/w500${rec.poster_path}`
        : null,
      overview: rec.overview,
      release_date: rec.release_date
    }));

    res.json({
      originalMovie: {
        id: movie.id,
        title: movie.title,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null
      },
      recommendations
    });
  } catch (error) {
    console.error('Erreur API:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de la récupération des recommandations',
      details: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API Cinemind opérationnelle' });
});

app.listen(PORT, () => {
  console.log(`🎬 Serveur démarré sur le port ${PORT}`);
  console.log(`🔑 TMDB API Key configurée: ${TMDB_API_KEY ? 'Oui' : 'Non'}`);
});
