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