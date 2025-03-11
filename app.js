const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le JSON  
app.use(express.json()); // Correction ici

// Route GET  
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Bonjour le monde!' });
});

// Route POST  
app.post('/api/echo', (req, res) => {
    res.json(req.body);
});

// Démarrer le serveur  
app.listen(port, () => {
    console.log(`API en cours d'exécution à http://localhost:${port}`);
});