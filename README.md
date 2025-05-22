# EcoRide 🌿🚙🛣️


## Description du projet:


EcoRide est une plateforme qui permet aux utilisateur de créer et partager des trajets de manière ecologique, en proposant les transports partagé et en reduisant les emissions de CO2.


## Fonctionnalités principales:
- 🗺️ création de trajet avec formulaire détaillé.
- 📅 Système de réservation de covoiturage.
- 🚗 filtrage des vehicules par type (essence, hybride, électrique ect).
- 👩🏽‍💻  Creéation de profil.

## Capture d'écran 

<img width="1319" alt="Screenshot 2025-03-26 at 23 22 30" src="https://github.com/user-attachments/assets/f73c8567-d599-4c21-b614-3a71962f3675" />


## Utilisation:
- Cliquez sur le bouton "créer un covoiturage".
- Remplissez le formulaire avec vos information de trajet.
- Publiez votre covoiturage.

## Technologies utilisées:
- HTML
- CSS
- JavaScript
- mongodb


## Feuille de route:
- Ajouter un système d'authentification (done) 
- button connexion in progress 👩🏽‍💻⚠️ (manque le style)
- button connexion connecté a une api avec succes

  
   ✅ Affichage des trajets récents
  
   ✅ Formulaire de création de covoiturage

   ✅ Section contact avec les mentions l

   ✅ Section envoyez-nous un message
  
   ✅ button connexion connected a mon api
  

 ## Objectif: Ajouter des fonctionnalités essentielles
  
  ⬜️ Système d'authentification utilisateur:
  - Inscription okay
  - Profil utilisateur en cours
  - Connection en cours
 
  ⬜️ Système de réservation de trajet:
  - Confirmation de réservation (par mail en cours avec database)
  
# EcoRide 🌿🚗 | Plateforme de covoiturage écologique

![Statut du projet](https://img.shields.io/badge/Statut-En%20développement-orange) 
![GitHub last commit](https://img.shields.io/github/last-commit/votre-user/EcoRide)

## 📝 Description
**EcoRide** est une plateforme de covoiturage axée sur la réduction des émissions CO₂. Elle permet aux utilisateurs de :
- Proposer/rechercher des trajets écologiques
- Filtrez par type de véhicule (électrique, hybride, etc.)
- Gérer leurs réservations

## 🖥️ Capture d'écran
<img width="1319" alt="Interface EcoRide" src="https://github.com/user-attachments/assets/f73c8567-d599-4c21-b614-3a71962f3675">

## 🚀 Fonctionnalités
| Fonctionnalité               | Statut       |
|------------------------------|-------------|
| Création de trajets          | ✅           |
| Réservation                  | ✅           |
| Filtres écologiques          | ✅           |
| Authentification             | ⚠️ (en cours)|
| Gestion des crédits          | ❌           |

## 🛠️ Installation
```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-user/EcoRide.git
cd EcoRide

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# ➡️ Remplir les variables MongoDB et SMTP

# 4. Lancer le serveur
node api.js