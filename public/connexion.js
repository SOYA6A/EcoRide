document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const messageContainer = document.getElementById('message-container');

  // Fonction pour afficher un message
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

  // Connexion
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
          throw new Error('Email ou mot de passe incorrect.');
        }

        const data = await response.json();
        showMessage('success', 'Connexion réussie! Redirection...');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = 'espace-utilisateur.html';
        }, 1000);
      } catch (error) {
        showMessage('error', error.message || 'Erreur de connexion.');
      }
    });
  }

  // Inscription
  if (registerForm) {
    registerForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        showMessage('error', 'Les mots de passe ne correspondent pas.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'inscription.');
        }

        const data = await response.json();
        showMessage('success', 'Inscription réussie! Vous pouvez maintenant vous connecter.');

        setTimeout(() => {
          window.location.href = 'connexion.html';
        }, 2000);
      } catch (error) {
        showMessage('error', error.message || 'Erreur lors de l\'inscription.');
      }
    });
  }
});