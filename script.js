// script.js

// Attendre que le document soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const toggleButton = document.getElementById('toggle-filters');
    const filtersContent = document.getElementById('advanced-filters-content');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
  
    // Configuration de la date par défaut (jour actuel)
    const dateInput = document.getElementById('date');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    dateInput.value = formattedDate;
  
    // Fonction pour afficher/masquer les filtres avancés
    toggleButton.addEventListener('click', function() {
      // Si le contenu est masqué, l'afficher, et vice versa
      if (filtersContent.classList.contains('hidden')) {
        filtersContent.classList.remove('hidden');
        toggleButton.innerHTML = 'Filtres avancés ▲';
      } else {
        filtersContent.classList.add('hidden');
        toggleButton.innerHTML = 'Filtres avancés ▼';
      }
    });
  
    // Mise à jour de l'affichage du prix en temps réel
    priceRange.addEventListener('input', function() {
      priceValue.textContent = this.value + ' €';
    });
  
    // Gestion de la soumission du formulaire
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', function(event) {
      // Empêcher l'envoi du formulaire (pour démonstration)
      event.preventDefault();
  
      // Récupération des valeurs du formulaire
      const departure = document.getElementById('departure').value;
      const arrival = document.getElementById('arrival').value;
      const date = document.getElementById('date').value;
      const passengers = document.getElementById('passengers').value;
  
      // Affichage des valeurs dans la console (pour démonstration)
      console.log('Recherche de trajet:');
      console.log('- Départ:', departure);
      console.log('- Arrivée:', arrival);
      console.log('- Date:', date);
      console.log('- Passagers:', passengers);
  
      // On pourrait ajouter ici du code pour envoyer ces données à un serveur
      alert('Recherche de trajet effectuée !');
    });
  });


//faire en sorte de connecter ça a une api 





  // Données utilisateur (simulées - à remplacer par votre système d'authentification)
const utilisateurActuel = {
    id: 'user123',
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@example.com'
};

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les écouteurs d'événements
    initialiserEvenements();
    
    // Créer la structure du modal et l'ajouter au DOM
    creerModalStructure();
});

function initialiserEvenements() {
    // Ajouter un écouteur d'événement au bouton "Créer un covoiturage"
    const boutonCreer = document.getElementById('creer-covoiturage');
    if (boutonCreer) {
        boutonCreer.addEventListener('click', ouvrirModal);
    }
}

function creerModalStructure() {
    // Créer le conteneur du modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'modal-covoiturage';
    
    // Créer le contenu du modal
    modalOverlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>Créer un covoiturage écologique</h2>
                <button class="close-modal">&times;</button>
            </div>
            <form id="form-covoiturage">
                <div class="form-group">
                    <label for="depart">Lieu de départ</label>
                    <input type="text" id="depart" name="depart" required>
                </div>
                
                <div class="form-group">
                    <label for="arrivee">Lieu d'arrivée</label>
                    <input type="text" id="arrivee" name="arrivee" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="heure">Heure</label>
                        <input type="time" id="heure" name="heure" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="places">Nombre de places</label>
                        <input type="number" id="places" name="places" min="1" max="8" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="prix">Prix par passager (€)</label>
                        <input type="number" id="prix" name="prix" min="0" step="0.5" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="vehicule">Type de véhicule</label>
                    <select id="vehicule" name="vehicule" required>
                        <option value="">Sélectionnez votre véhicule</option>
                        <option value="electrique">Voiture électrique</option>
                        <option value="hybride">Voiture hybride</option>
                        <option value="essence">Voiture essence</option>
                        <option value="diesel">Voiture diesel</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="emissions">Émissions CO2 (g/km)</label>
                    <input type="number" id="emissions" name="emissions" min="0">
                </div>
                
                <div class="form-group">
                    <label for="commentaire">Commentaires</label>
                    <textarea id="commentaire" name="commentaire" rows="3"></textarea>
                </div>
                
                <button type="submit" class="submit-btn">Publier le covoiturage</button>
            </form>
        </div>
    `;
    
    // Ajouter le modal au body (ajouter le modal au html directement non ?)
    document.body.appendChild(modalOverlay);
    
    // Ajouter des écouteurs d'événements aux éléments du modal
    const boutonFermer = modalOverlay.querySelector('.close-modal');
    boutonFermer.addEventListener('click', fermerModal);
    
    // Fermer le modal en cliquant en dehors du contenu
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            fermerModal();
        }
    });
    
    // Ajouter un écouteur d'événement pour la soumission du formulaire
    const formulaire = document.getElementById('form-covoiturage');
    formulaire.addEventListener('submit', soumettreCovoiturage);
    
    // Ajouter un écouteur d'événement pour mettre à jour automatiquement les émissions CO2
    const selectVehicule = document.getElementById('vehicule');
    selectVehicule.addEventListener('change', function() {
        mettreAJourEmissionsCO2(this.value);
    });
}

function ouvrirModal() {
    const modal = document.getElementById('modal-covoiturage');
    modal.classList.add('active');
    
    // Définir la date minimale à aujourd'hui
    const inputDate = document.getElementById('date');
    const aujourdhui = new Date().toISOString().split('T')[0];
    inputDate.min = aujourdhui;
    inputDate.value = aujourdhui;
}

function fermerModal() {
    const modal = document.getElementById('modal-covoiturage');
    modal.classList.remove('active');
    
    // Réinitialiser le formulaire
    document.getElementById('form-covoiturage').reset();
}

function mettreAJourEmissionsCO2(typeVehicule) {
    const inputEmissions = document.getElementById('emissions');
    
    // Valeurs moyennes (à ajuster selon vos besoins)
    switch(typeVehicule) {
        case 'electrique':
            inputEmissions.value = 0;
            break;
        case 'hybride':
            inputEmissions.value = 70;
            break;
        case 'essence':
            inputEmissions.value = 130;
            break;
        case 'diesel':
            inputEmissions.value = 110;
            break;
        default:
            inputEmissions.value = '';
    }
}

function soumettreCovoiturage(event) {
    event.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(event.target);
    const covoiturageData = Object.fromEntries(formData.entries());
    
    // Ajouter des données supplémentaires
    covoiturageData.utilisateurId = utilisateurActuel.id;
    covoiturageData.dateCreation = new Date().toISOString();
    
    // Dans un environnement réel, nous enverrions ces données à un serveur
    // Mais pour cette démonstration, nous allons simplement simuler une réponse
    console.log('Données du covoiturage:', covoiturageData);
    
    // Simuler un envoi au serveur
    setTimeout(() => {
        afficherConfirmation(covoiturageData);
    }, 1000);
}

function afficherConfirmation(covoiturageData) {
    // Fermer le modal actuel
    fermerModal();
    
    // Créer un élément de confirmation
    const confirmation = document.createElement('div');
    confirmation.className = 'modal-overlay active';
    
    confirmation.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h2>Covoiturage créé avec succès!</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div style="text-align: center; padding: 20px;">
                <p style="font-size: 1.1rem; margin-bottom: 15px;">
                    Votre trajet de <strong>${covoiturageData.depart}</strong> à <strong>${covoiturageData.arrivee}</strong>
                    le <strong>${covoiturageData.date}</strong> à <strong>${covoiturageData.heure}</strong> a été publié.
                </p>
                <p>
                    Votre trajet sera visible par les autres utilisateurs qui recherchent un covoiturage sur cet itinéraire.
                </p>
                <button class="btn-primary" style="margin-top: 20px;">Voir mon trajet</button>
            </div>
        </div>
    `;
    
    // Ajouter la confirmation au body
    document.body.appendChild(confirmation);
    
    // Ajouter un écouteur d'événement pour fermer la confirmation
    const boutonFermer = confirmation.querySelector('.close-modal');
    boutonFermer.addEventListener('click', function() {
        document.body.removeChild(confirmation);
    });
    
    // Ajouter un écouteur d'événement pour le bouton "Voir mon trajet"
    const boutonVoir = confirmation.querySelector('.btn-primary');
    boutonVoir.addEventListener('click', function() {
        document.body.removeChild(confirmation);
        // Dans un environnement réel, on redirigerait vers la page du trajet
        alert('Redirection vers la page du trajet (simulation)');
    });
    
    // Créer une nouvelle carte de trajet et l'ajouter à la liste des trajets récents
    ajouterCarteTrajet(covoiturageData);
}

function ajouterCarteTrajet(covoiturageData) {
    // Créer une nouvelle carte de trajet
    const nouvelleCard = document.createElement('div');
    nouvelleCard.className = 'trajet-card';
    
    // Déterminer le type de badge en fonction du véhicule
    let badgeText = '';
    switch(covoiturageData.vehicule) {
        case 'electrique':
            badgeText = 'Véhicule électrique';
            break;
        case 'hybride':
            badgeText = 'Véhicule hybride';
            break;
        case 'essence':
            badgeText = 'Véhicule essence';
            break;
        case 'diesel':
            badgeText = 'Véhicule diesel';
            break;
    }
    
    // Remplir la carte avec les détails du trajet
    nouvelleCard.innerHTML = `
        <div class="trajet-header">
            <h3>${covoiturageData.depart} → ${covoiturageData.arrivee}</h3>
            <span class="eco-badge">${badgeText}</span>
        </div>
        <div class="trajet-details">
            <p><strong>Date:</strong> ${covoiturageData.date}</p>
            <p><strong>Heure:</strong> ${covoiturageData.heure}</p>
            <p><strong>Places:</strong> ${covoiturageData.places}</p>
            <p><strong>Prix:</strong> ${covoiturageData.prix}€ par personne</p>
            <p><strong>Émissions CO2:</strong> ${covoiturageData.emissions} g/km</p>
        </div>
        <button class="btn-secondary">Réserver</button>
    `;
    
    // Trouver la liste des trajets et ajouter la nouvelle carte
    const listeTrajets = document.querySelector('.liste-trajets');
    
    // Ajouter la carte au début de la liste
    if (listeTrajets) {
        listeTrajets.insertBefore(nouvelleCard, listeTrajets.firstChild);
    }
}