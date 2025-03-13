document.addEventListener('DOMContentLoaded', function() {
  // Gestion des onglets de connexion/inscription
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  // Vérifier si nous sommes sur la page de connexion
  if (tabs.length > 0) {
      // Activer l'onglet correspondant à l'URL hash
      const hash = window.location.hash || '#login';
      activateTab(hash);
      
      // Ajouter des écouteurs d'événements aux onglets
      tabs.forEach(tab => {
          tab.addEventListener('click', function(e) {
              e.preventDefault();
              activateTab(this.getAttribute('href'));
          });
      });
  }
  
  // Fonction pour activer un onglet
  function activateTab(tabId) {
      // Désactiver tous les onglets et formulaires
      tabs.forEach(tab => tab.classList.remove('active'));
      forms.forEach(form => form.classList.remove('active'));
      
      // Activer l'onglet et le formulaire sélectionnés
      document.querySelector(`a[href="${tabId}"]`)?.classList.add('active');
      document.querySelector(tabId)?.classList.add('active');
      
      // Mettre à jour le hash de l'URL
      window.location.hash = tabId;
  }
  
  // Récupérer les formulaires
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const messageContainer = document.getElementById('message-container');
  
  // Gestion du formulaire de connexion
  if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          
          try {
              const response = await fetch('/api/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email, password })
              });
              
              const data = await response.json();
              
              if (response.ok) {
                  // Afficher un message de succès
                  showMessage('success', 'Connexion réussie! Redirection...');
                  
                  // Stocker les informations d'utilisateur dans localStorage
                  localStorage.setItem('user', JSON.stringify(data.user));
                  
                  // Redirection vers la page d'accueil après 1 seconde
                  setTimeout(() => {
                      window.location.href = 'index.html';
                  }, 1000);
              } else {
                  // Afficher un message d'erreur
                  showMessage('error', data.message || 'Erreur de connexion');
              }
          } catch (error) {
              showMessage('error', 'Erreur de communication avec le serveur');
              console.error('Erreur:', error);
          }
      });
  }
  
  // Gestion du formulaire d'inscription
  if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const username = document.getElementById('register-username').value;
          const email = document.getElementById('register-email').value;
          const password = document.getElementById('register-password').value;
          const confirmPassword = document.getElementById('register-confirm-password').value;
          
          // Vérifier si les mots de passe correspondent
          if (password !== confirmPassword) {
              showMessage('error', 'Les mots de passe ne correspondent pas');
              return;
          }
          
          try {
              const response = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ username, email, password })
              });
              
              const data = await response.json();
              
              if (response.ok) {
                  // Afficher un message de succès
                  showMessage('success', 'Inscription réussie! Vous pouvez maintenant vous connecter.');
                  
                  // Redirection vers la page de connexion après 2 secondes
                  setTimeout(() => {
                      window.location.href = 'connexion.html#login';
                      activateTab('#login');
                  }, 2000);
              } else {
                  // Afficher un message d'erreur
                  showMessage('error', data.message || 'Erreur lors de l\'inscription');
              }
          } catch (error) {
              showMessage('error', 'Erreur de communication avec le serveur');
              console.error('Erreur:', error);
          }
      });
  }
  
  // Fonction pour afficher des messages à l'utilisateur
  function showMessage(type, message) {
      if (messageContainer) {
          messageContainer.textContent = message;
          messageContainer.className = `message ${type}`;
          messageContainer.style.display = 'block';
          
          // Faire disparaître le message après 5 secondes
          setTimeout(() => {
              messageContainer.style.display = 'none';
          }, 5000);
      }
  }
  
  // Vérifier si l'utilisateur est connecté au chargement de la page
  function checkAuthStatus() {
      const user = JSON.parse(localStorage.getItem('user'));
      const loginBtn = document.querySelector('.btn-connexion');
      
      if (user && loginBtn) {
          loginBtn.textContent = 'Mon compte';
          loginBtn.href = 'profile.html';
          
          // Ajouter un bouton de déconnexion au menu si l'utilisateur est connecté
          if (!document.querySelector('.btn-deconnexion')) {
              const logoutLi = document.createElement('li');
              const logoutBtn = document.createElement('a');
              logoutBtn.textContent = 'Déconnexion';
              logoutBtn.href = '#';
              logoutBtn.className = 'btn-deconnexion';
              logoutBtn.addEventListener('click', logout);
              logoutLi.appendChild(logoutBtn);
              
              document.querySelector('.menu').appendChild(logoutLi);
          }
      }
  }
  
  // Fonction de déconnexion
  async function logout(e) {
      e.preventDefault();
      
      try {
          const response = await fetch('/api/logout');
          
          // Supprimer les informations d'utilisateur du localStorage
          localStorage.removeItem('user');
          
          // Rediriger vers la page d'accueil
          window.location.href = 'index.html';
      } catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
      }
  }
  
  // Vérifier le statut d'authentification au chargement de la page
  checkAuthStatus();
  
  // Ajouter du CSS pour les messages
  const style = document.createElement('style');
  style.textContent = `
  .message {
      padding: 10px 15px;
      border-radius: 4px;
      margin-bottom: 20px;
      text-align: center;
  }
  .message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
  }
  .message.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
  }
  .auth-container {
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .auth-tabs {
      display: flex;
      margin-bottom: 20px;
      border-bottom: 1px solid #ddd;
  }
  .auth-tab {
      padding: 10px 15px;
      margin-right: 10px;
      cursor: pointer;
      color: #555;
      text-decoration: none;
  }
  .auth-tab.active {
      color: #4CAF50;
      border-bottom: 2px solid #4CAF50;
  }
  .auth-form {
      display: none;
  }
  .auth-form.active {
      display: block;
  }
  .form-group {
      margin-bottom: 15px;
  }
  .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
  }
  .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
  }
  .forgot-password {
      color: #777;
      text-decoration: none;
      font-size: 0.9em;
      display: inline-block;
      margin-top: 5px;
  }
  .forgot-password:hover {
      text-decoration: underline;
  }
  `;
  document.head.appendChild(style);
});