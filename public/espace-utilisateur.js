document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les informations de l'utilisateur depuis localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        // Afficher le nom d'utilisateur
        document.getElementById('username').textContent = user.username;

        // Exemple de statistiques (à remplacer par des données réelles)
        document.getElementById('trajets-effectues').textContent = '5';
        document.getElementById('co2-economise').textContent = '12 kg';
        document.getElementById('points-gagnes').textContent = '150';
    } else {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        window.location.href = 'connexion.html';
    }
});