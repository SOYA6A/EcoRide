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




function displayCovoiturages() {
    const covoiturages = JSON.parse(localStorage.getItem('covoiturages')) || [];
    const covoiturageList = document.getElementById('covoiturageList');

    if (covoiturages.length === 0) {
        covoiturageList.innerHTML = '<p>Aucun covoiturage disponible.</p>';
        return;
    }

    covoiturageList.innerHTML = covoiturages.map(covoiturage => `
        <div class="trajet-card">
            <div class="trajet-header">
                <h3>${covoiturage.depart} → ${covoiturage.arrivee}</h3>
                <span class="eco-badge">${covoiturage.vehicule}</span>
            </div>
            <div class="trajet-details">
                <p><strong>Date:</strong> ${covoiturage.date}</p>
                <p><strong>Heure:</strong> ${covoiturage.heure}</p>
                <p><strong>Places:</strong> ${covoiturage.places}</p>
                <p><strong>Véhicule:</strong> ${covoiturage.vehicule}</p>
            </div>
            <button class="btn-secondary">Réserver</button>
        </div>
    `).join('');
}


document.getElementById('toggle-filters').addEventListener('click', function () {
    const filtersContent = document.getElementById('advanced-filters-content');
    filtersContent.classList.toggle('hidden');
});