document.addEventListener('DOMContentLoaded', function () {
  // Variables globales
  let allTrajets = []; // Stocker tous les trajets récupérés

  // Fonction pour afficher un message à l'utilisateur
  function showMessage(type, message) {
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.textContent = message;
      messageContainer.className = `message ${type}`;
      messageContainer.style.display = 'block';

      setTimeout(() => {
        messageContainer.style.display = 'none';
      }, 5000);
    }
  }

  // Gestion de la connexion
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Erreur de connexion');
        }

        const data = await response.json();
        showMessage('success', 'Connexion réussie! Redirection...');
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      } catch (error) {
        showMessage('error', error.message || 'Erreur de communication avec le serveur');
        console.error('Erreur:', error);
      }
    });
  }

  // Gestion de l'inscription
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        showMessage('error', 'Les mots de passe ne correspondent pas');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'inscription');
        }

        const data = await response.json();
        showMessage('success', 'Inscription réussie! Vous pouvez maintenant vous connecter.');

        setTimeout(() => {
          window.location.href = 'connexion.html#login';
        }, 2000);
      } catch (error) {
        showMessage('error', error.message || 'Erreur de communication avec le serveur');
        console.error('Erreur:', error);
      }
    });
  }

  // Redirection vers la page de création de covoiturage
  const btnCreerCovoiturage = document.getElementById('creer-covoiturage');
  if (btnCreerCovoiturage) {
    btnCreerCovoiturage.addEventListener('click', function () {
      window.location.href = 'creer-covoiturage.html';
    });
  }

  // Gestion de la création de covoiturage
  const covoiturageForm = document.getElementById('covoiturageForm');
  if (covoiturageForm) {
    covoiturageForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Récupérer les valeurs du formulaire
      const depart = document.getElementById('depart').value.trim();
      const arrivee = document.getElementById('arrivee').value.trim();
      const date = document.getElementById('date').value;
      const heure = document.getElementById('heure').value;
      const places = document.getElementById('places').value;
      const vehicule = document.getElementById('vehicule').value;

      // Créer un objet covoiturage
      const covoiturage = {
        depart,
        arrivee,
        date,
        heure,
        places: parseInt(places),
        vehicule,
      };

      // Sauvegarder le covoiturage
      saveCovoiturage(covoiturage);

      // Mettre à jour l'affichage
      displayCovoiturages();

      // Afficher un message de succès
      showMessage('success', 'Covoiturage créé avec succès !');

      // Réinitialiser le formulaire
      covoiturageForm.reset();
    });
  }

  // Fonction pour sauvegarder un covoiturage
  function saveCovoiturage(covoiturage) {
    let covoiturages = JSON.parse(localStorage.getItem('covoiturages')) || [];
    covoiturages.push(covoiturage);
    localStorage.setItem('covoiturages', JSON.stringify(covoiturages));
  }

  // Fonction pour afficher les covoiturages
  function displayCovoiturages() {
    const covoiturageList = document.getElementById('covoiturageList');
    const covoiturages = JSON.parse(localStorage.getItem('covoiturages')) || [];

    if (covoiturages.length === 0) {
      covoiturageList.innerHTML = '<p>Aucun covoiturage disponible.</p>';
      return;
    }

    covoiturageList.innerHTML = covoiturages.map(covoiturage => `
      <div class="covoiturage-item">
        <p><strong>Départ :</strong> ${covoiturage.depart}</p>
        <p><strong>Arrivée :</strong> ${covoiturage.arrivee}</p>
        <p><strong>Date :</strong> ${covoiturage.date} à ${covoiturage.heure}</p>
        <p><strong>Places disponibles :</strong> ${covoiturage.places}</p>
        <p><strong>Véhicule :</strong> ${covoiturage.vehicule}</p>
      </div>
    `).join('');
  }

  // Gestion de la recherche de trajets
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Récupérer les valeurs du formulaire
      const depart = document.getElementById('depart').value.trim();
      const arrivee = document.getElementById('arrivée').value.trim();
      const date = document.getElementById('date').value;

      // Filtrer les trajets
      const filteredTrajets = filterTrajets(depart, arrivee, date);

      // Afficher les trajets filtrés
      displayTrajets(filteredTrajets);
    });
  }

  // Fonction pour filtrer les trajets
  function filterTrajets(depart, arrivee, date) {
    return allTrajets.filter(trajet => {
      const matchesDepart = depart ? trajet.depart.toLowerCase().includes(depart.toLowerCase()) : true;
      const matchesArrivee = arrivee ? trajet.arrivee.toLowerCase().includes(arrivee.toLowerCase()) : true;
      const matchesDate = date ? trajet.date === date : true;
      return matchesDepart && matchesArrivee && matchesDate;
    });
  }

  // Fonction pour afficher les trajets
  function displayTrajets(trajets) {
    const trajetList = document.getElementById('trajet-list');
    if (!trajetList) {
      console.error('Element #trajet-list non trouvé dans le DOM');
      return;
    }

    if (trajets.length === 0) {
      trajetList.innerHTML = '<p>Aucun trajet disponible.</p>';
      return;
    }

    trajetList.innerHTML = trajets.map(trajet => `
      <div class="trajet-card">
        <div class="trajet-header">
          <h3>${trajet.depart} → ${trajet.arrivee}</h3>
          <span class="eco-badge">${trajet.vehicule}</span>
        </div>
        <div class="trajet-details">
          <p><strong>Date:</strong> ${trajet.date}</p>
          <p><strong>Heure:</strong> ${trajet.heure}</p>
          <p><strong>Places:</strong> ${trajet.places}</p>
          <p><strong>Véhicule:</strong> ${trajet.vehicule}</p>
        </div>
        <button class="btn-secondary">Réserver</button>
      </div>
    `).join('');
  }

  // Charger les trajets au démarrage
  async function fetchTrajets() {
    try {
      const response = await fetch('http://localhost:3000/api/trajets');
      allTrajets = await response.json();
      displayTrajets(allTrajets); // Afficher tous les trajets par défaut
    } catch (error) {
      console.error('Erreur lors de la récupération des trajets :', error);
    }
  }

  fetchTrajets();
});