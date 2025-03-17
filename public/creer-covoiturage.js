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