const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('./models/User'); // Assurez-vous que le chemin est correct  
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Servez le dossier public

// Connexion à MongoDB (remplacez 'your_mongo_uri' par votre URI MongoDB)
mongoose.connect('your_mongo_uri', { useNewUrlParser: true, useUnifiedTopology: true });

// Route pour servir la page d'inscription  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Modifiez ce chemin si nécessaire  
});

// Route d'inscription  
app.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà  
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hacher le mot de passe  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Créer un nouvel utilisateur  
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Démarrage du serveur  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});