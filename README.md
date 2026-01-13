
# EcoRide 🌿🚗 | Plateforme de covoiturage écologique

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
git https://github.com/SOYA6A/EcoRide.git
cd EcoRide

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# ➡️ Remplir les variables MongoDB et SMTP

# 4. Lancer le serveur
node api.js
