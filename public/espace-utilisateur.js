document.addEventListener('DOMContentLoaded', () => {
    // Étape 1 : Vérifier si l'utilisateur est connecté
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = 'connexion.html';
      return;
    }
  
    // Étape 2 : Afficher le nom d'utilisateur
    const user = JSON.parse(userData);
    document.getElementById('username').textContent = user.username;
  
    // Étape 3 : Charger les statistiques
    loadUserStats(user.id);
  });
  
  // Fonction séparée pour charger les stats
  function loadUserStats(userId) {
    // Solution temporaire (mock) - À remplacer par un vrai fetch plus tard
    const mockStats = {
      trajets: 5,
      co2: 10,
      points: 150
    };
  
    // Afficher les données
    document.getElementById('trajets-effectues').textContent = mockStats.trajets;
    document.getElementById('co2-economise').textContent = mockStats.co2 + ' kg';
    document.getElementById('points-gagnes').textContent = mockStats.points;
  }

  // Configuration (à adapter)
const API_URL = "http://localhost:3000"; // ← Remplacez par votre URL

// Récupère l'utilisateur
const user = JSON.parse(localStorage.getItem('user'));
if (!user) window.location.href = 'connexion.html';

// Charge les stats depuis l'API
fetch(`${API_URL}/api/users/${user.id}/stats`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('username').textContent = user.username;
    document.getElementById('trajets-effectues').textContent = data.trajets || 0;
    document.getElementById('co2-economise').textContent = `${data.co2 || 0} kg`;
  })
  .catch(() => {
    // Fallback si l'API échoue
    document.getElementById('trajets-effectues').textContent = "N/A";
  });


  document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = 'connexion.html';
      return;
    }
  
    // Afficher les infos utilisateur
    document.getElementById('username').textContent = user.username;
  
    // Charger les stats
    fetch(`http://localhost:3000/api/users/${user.id}/stats`)
      .then(res => res.json())
      .then(data => {
        document.getElementById('trajets-effectues').textContent = data.trajets;
        document.getElementById('co2-economise').textContent = `${data.co2} kg`;
        document.getElementById('points-gagnes').textContent = data.points;
      })
      .catch(() => {
        document.getElementById('trajets-effectues').textContent = "Erreur";
      });
  });