const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/ecoride', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'votre_clé_secrète',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 heure
}));

// Modèle d'utilisateur
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Modèle de trajet
const tripSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  vehicleType: { type: String, required: true },
  co2Emissions: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  options: {
    nonSmoking: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false }
  }
});

const Trip = mongoose.model('Trip', tripSchema);

// Routes d'authentification
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email ou nom d\'utilisateur est déjà utilisé' });
    }
    
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Créer nouvel utilisateur
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    // Créer une session
    req.session.userId = user._id;
    req.session.username = user.username;
    
    res.status(200).json({ 
      message: 'Connexion réussie',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});

app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Déconnexion réussie' });
});

// Middleware d'authentification
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Veuillez vous connecter pour accéder à cette ressource' });
  }
};

// Routes pour les trajets
app.post('/api/trips', isAuthenticated, async (req, res) => {
  try {
    const { departure, arrival, date, time, seats, price, vehicleType, co2Emissions, options } = req.body;
    
    const newTrip = new Trip({
      departure,
      arrival,
      date,
      time,
      seats,
      price,
      vehicleType,
      co2Emissions,
      createdBy: req.session.userId,
      options
    });
    
    await newTrip.save();
    res.status(201).json({ message: 'Trajet créé avec succès', trip: newTrip });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du trajet', error: error.message });
  }
});

app.get('/api/trips', async (req, res) => {
  try {
    const { departure, arrival, date, passengers } = req.query;
    
    const query = {};
    if (departure) query.departure = new RegExp(departure, 'i');
    if (arrival) query.arrival = new RegExp(arrival, 'i');
    if (date) query.date = { $gte: new Date(date) };
    if (passengers) query.seats = { $gte: parseInt(passengers) };
    
    const trips = await Trip.find(query).populate('createdBy', 'username email');
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des trajets', error: error.message });
  }
});

// Route par défaut pour servir l'index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});