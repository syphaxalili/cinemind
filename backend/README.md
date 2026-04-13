# CineMind Backend - API de Recommandation de Films

## 🎯 Description
API REST Node.js/Express pour système de recommandation de films intelligent utilisant l'API TMDB avec filtrage basé sur le contenu (Content-based filtering).

## 🚀 Installation

```bash
cd backend
npm install
```

## ⚙️ Configuration

1. Créez un compte sur [TMDB](https://www.themoviedb.org/)
2. Obtenez votre clé API dans les paramètres de votre compte
3. Copiez `.env.example` vers `.env`
4. Ajoutez votre clé API TMDB dans `.env`:

```env
TMDB_API_KEY=votre_clé_api_ici
PORT=5000
```

## 🏃 Démarrage

```bash
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 📡 Endpoints

### GET `/api/recommendations/:movieTitle`
Récupère des recommandations intelligentes pour un film donné.

**Logique d'IA (Content-based filtering):**
- Filtre les films avec `vote_average > 7`
- Ne garde que les films partageant au moins un genre commun avec le film recherché
- Limite à 12 résultats

**Exemple:**
```
GET http://localhost:5000/api/recommendations/Inception
```

**Réponse:**
```json
{
  "originalMovie": {
    "id": 27205,
    "title": "Inception",
    "vote_average": 8.4,
    "poster_path": "https://image.tmdb.org/t/p/w500/..."
  },
  "recommendations": [
    {
      "id": 155,
      "title": "The Dark Knight",
      "vote_average": 8.5,
      "poster_path": "https://image.tmdb.org/t/p/w500/...",
      "overview": "...",
      "release_date": "2008-07-16"
    }
  ]
}
```

### GET `/api/health`
Vérifie l'état de l'API.

## 🧠 Algorithme de Recommandation

L'API implémente un filtrage basé sur le contenu (Content-based filtering) simplifié:

1. **Recherche du film** via l'API TMDB
2. **Récupération des recommandations** TMDB
3. **Filtrage intelligent:**
   - Note moyenne > 7/10
   - Au moins un genre en commun avec le film original
4. **Limitation** à 12 résultats pour optimiser l'affichage

## 📦 Dépendances

- `express` - Framework web
- `cors` - Gestion CORS
- `dotenv` - Variables d'environnement
- `axios` - Client HTTP pour TMDB API

## 🔒 Sécurité

- Clé API stockée dans `.env` (non versionné)
- CORS activé pour le frontend
- Validation des paramètres d'entrée
