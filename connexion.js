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
      }
    }
    
    checkAuthStatus();
  });

  app.use(express.static(path.join(__dirname, 'public')));