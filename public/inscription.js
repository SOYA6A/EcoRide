document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas.');
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
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                window.location.href = 'connexion.html';
            } catch (error) {
                alert(error.message || 'Erreur lors de l\'inscription.');
            }
        });
    }
});