const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permet les requêtes depuis votre front-end
app.use(bodyParser.json());

// Base de données temporaire (en production, utilisez une vraie base de données)
let users = []; // Stocker les utilisateurs
let trajets = []; // Stocker les trajets

// Clé secrète pour JWT (à remplacer par une clé sécurisée en production)
const JWT_SECRET = 'votre_secret_jwt';

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

// Route pour l'inscription
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = { id: Date.now().toString(), username, email, password: hashedPassword };
    users.push(user);

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription.', error: err.message });
  }
});

// Route pour la connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

// Route racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de covoiturage écologique. Utilisez /api/trajets pour accéder aux données.');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur http://localhost:${PORT}`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Mock database
let users = [
  { id: 1, username: 'test', email: 'test@example.com', password: 'test' }
];
let trajets = [];

// Routes API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      token: 'mock-token',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } else {
    res.status(401).json({ error: 'Identifiants invalides' });
  }
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password
  };
  users.push(newUser);
  res.json({ success: true });
});

app.get('/api/users/:id/stats', (req, res) => {
  res.json({
    trajets: 5,
    co2: 12,
    points: 150
  });
});

