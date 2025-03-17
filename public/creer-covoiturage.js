document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('covoiturageForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les valeurs du formulaire
        const depart = document.getElementById('depart').value;
        const arrivee = document.getElementById('arrivee').value;
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

        // Afficher les données dans la console (pour l'instant)
        console.log('Covoiturage créé :', covoiturage);

        // Afficher un message de succès
        alert('Covoiturage créé avec succès !');

        // Réinitialiser le formulaire
        form.reset();
    });
});