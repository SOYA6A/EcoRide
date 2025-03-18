const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permet les requêtes depuis votre front-end
app.use(bodyParser.json());

// Base de données temporaire (en production, utilisez une vraie base de données)
let trajets = [];

// Route pour obtenir tous les trajets
app.get('/api/trajets', (req, res) => {
  res.json(trajets);
});

// Route pour créer un nouveau trajet
app.post('/api/trajets', (req, res) => {
  const nouveauTrajet = {
    id: Date.now().toString(),
    ...req.body,
    dateCreation: new Date()
  };
  
  trajets.push(nouveauTrajet);
  res.status(201).json(nouveauTrajet);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de covoiturage écologique. Utilisez /api/trajets pour accéder aux données.');
});


// Ajouter ceci à votre server.js
app.use(express.static('public')); 

