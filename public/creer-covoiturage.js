document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('covoiturageForm');

  form.addEventListener('submit', async function (e) {
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

      // Envoyer le covoiturage à l'API
      try {
          const response = await fetch('http://localhost:3000/api/trajets', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(covoiturage),
          });

          if (response.ok) {
              alert('Covoiturage créé avec succès !');
              form.reset(); // Réinitialiser le formulaire
              window.location.href = "index.html"; // Rediriger vers la page d'accueil
          } else {
              throw new Error('Erreur lors de la création du trajet');
          }
      } catch (error) {
          console.error('Erreur:', error);
          alert('Erreur lors de la création du trajet. Veuillez réessayer.');
      }
  });
});