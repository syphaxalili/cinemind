# 🎬 CineMind - Système de Recommandation de Films Intelligent

Application MERN (MongoDB-less) avec IA de recommandation basée sur le contenu (Content-based filtering) utilisant l'API TMDB.

## 🎯 Objectif du Projet

Prototype fonctionnel pour TP Scrum - Sprint Review, démontrant:
- Intégration API externe (TMDB)
- Filtrage intelligent (IA simplifiée)
- Interface utilisateur moderne et réactive
- Architecture Full Stack MERN

## 🏗️ Architecture

### Backend (Node.js + Express)
- Route API `/api/recommendations/:movieTitle`
- Intégration TMDB API
- **Algorithme IA:** Content-based filtering
  - Filtre: `vote_average > 7`
  - Filtre: Genres communs avec le film recherché
  - Limite: 12 recommandations

### Frontend (React + Vite)
- Interface Clean UI
- Recherche de films
- Affichage en cartes (Titre, Note, Poster)
- États de chargement et erreurs

## 🚀 Installation Rapide

### 1. Backend

```bash
cd backend
npm install
```

Configurez votre clé API TMDB dans `backend/.env`:
```env
TMDB_API_KEY=votre_clé_api_ici
PORT=5000
```

Démarrez le serveur:
```bash
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📋 Obtenir une Clé API TMDB

1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org/)
2. Allez dans **Paramètres** → **API**
3. Demandez une clé API (gratuite)
4. Copiez la clé dans `backend/.env`

## 🎮 Utilisation

1. Entrez un titre de film (ex: "Inception", "Avatar", "Interstellar")
2. Cliquez sur "Recommander"
3. Visualisez le film recherché et ses recommandations intelligentes

## 🧠 Logique d'IA (Content-based Filtering)

L'algorithme analyse:
- **Similarité de genres:** Films partageant au moins un genre
- **Qualité:** Note moyenne > 7/10
- **Pertinence:** Recommandations TMDB comme base

## 🛠️ Stack Technique

- **Frontend:** React 19, Vite, CSS3
- **Backend:** Node.js, Express, Axios
- **API:** TMDB (The Movie Database)
- **Styling:** CSS moderne avec gradients et animations

## 📁 Structure du Projet

```
cinemind/
├── backend/
│   ├── server.js          # Serveur Express + Routes API
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Composant principal
│   │   └── App.css        # Styles
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎨 Fonctionnalités

✅ Recherche de films par titre  
✅ Recommandations intelligentes filtrées  
✅ Affichage des posters et notes  
✅ Interface responsive  
✅ États de chargement  
✅ Gestion des erreurs  
✅ Design moderne et épuré  

## 🔄 Workflow Scrum

Ce projet est conçu pour une démonstration Sprint Review:
- ✅ Backend fonctionnel avec API
- ✅ Frontend interactif
- ✅ Intégration complète
- ✅ Prêt pour démo en temps réel

## 📝 Notes Techniques

- Pas de base de données (utilisation directe de TMDB)
- Filtrage côté backend pour optimiser les performances
- CORS configuré pour développement local
- Images optimisées (format w500 de TMDB)

## 🚦 Prochaines Étapes (Backlog)

- [ ] Ajout de filtres avancés (année, genre spécifique)
- [ ] Système de favoris (localStorage)
- [ ] Historique de recherche
- [ ] Pagination des résultats
- [ ] Mode sombre/clair
- [ ] Intégration MongoDB pour profils utilisateurs

## 📄 Licence

Projet éducatif - TP Scrum
