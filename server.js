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



const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let rides = [];

app.get('/api/rides', (req, res) => {
  res.json(rides);
});

app.post('/api/rides', (req, res) => {
  const newRide = req.body;
  rides.push(newRide);
  res.status(201).json(newRide);
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Données temporaires (à remplacer par une base de données)
let trajets = [];

// Route pour récupérer tous les trajets
app.get('/api/trajets', (req, res) => {
    res.json(trajets);
});

// Route pour créer un nouveau trajet
app.post('/api/trajets', (req, res) => {
    const nouveauTrajet = req.body;
    trajets.push(nouveauTrajet);
    res.status(201).json(nouveauTrajet);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});