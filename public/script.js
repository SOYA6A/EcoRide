

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