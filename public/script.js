

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const messageContainer = document.getElementById('message-container');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
  
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
  
        try {
          const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
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
  
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
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
            body: JSON.stringify({ username, email, password })
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
  
    function showMessage(type, message) {
      if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `message ${type}`;
        messageContainer.style.display = 'block';
  
        setTimeout(() => {
          messageContainer.style.display = 'none';
        }, 5000);
      }
    }
  });



//pour ajouter un évenement au bouton "créer un covoiturage"
document.addEventListener('DOMContentLoaded', function() {
  const btnCreerCovoiturage = document.getElementById('creer-covoiturage');
  
  if (btnCreerCovoiturage) {
      btnCreerCovoiturage.addEventListener('click', function() {
          window.location.href = 'creer-covoiturage.html';
      });
  }
});


// code test





document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('covoiturageForm');
  const covoiturageList = document.getElementById('covoiturageList');

  // Afficher les covoiturages au chargement de la page
  displayCovoiturages();

  form.addEventListener('submit', function (e) {
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
          vehicule
      };

      // Sauvegarder le covoiturage
      saveCovoiturage(covoiturage);

      // Mettre à jour l'affichage
      displayCovoiturages();

      // Afficher un message de succès
      alert('Covoiturage créé avec succès !');

      // Réinitialiser le formulaire
      form.reset();
  });

  function saveCovoiturage(covoiturage) {
      let covoiturages = JSON.parse(localStorage.getItem('covoiturages')) || [];
      covoiturages.push(covoiturage);
      localStorage.setItem('covoiturages', JSON.stringify(covoiturages));
  }

  function displayCovoiturages() {
      const covoiturages = JSON.parse(localStorage.getItem('covoiturages')) || [];
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
});





document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const depart = document.getElementById('depart').value;
  const arrivee = document.getElementById('arrivée').value;
  const date = document.getElementById('date').value;
  const passengers = document.getElementById('passengers').value;

  console.log('Recherche effectuée :', { depart, arrivee, date, passengers });
  // Ajoutez ici la logique pour filtrer les covoiturages
});