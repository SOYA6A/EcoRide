const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Pour servir les fichiers frontend

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

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API mock running on http://localhost:${PORT}`);
});