document.getElementById('registerForm').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    alert('Inscription réussie');
};

document.getElementById('loginForm').onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
        alert('Connexion réussie');
        localStorage.setItem('token', data.token);
    } else {
        alert('Identifiants incorrects');
    }
};

document.getElementById('tripForm').onsubmit = async (e) => {
    e.preventDefault();
    const driver = document.getElementById('tripDriver').value;
    const destination = document.getElementById('tripDestination').value;
    const date = document.getElementById('tripDate').value;
    const token = localStorage.getItem('token');

    await fetch('/trips', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ driver, destination, date }),
    });

    alert('Trajet créé');
    loadTrips();
};

async function loadTrips() {
    const response = await fetch('/trips');
    const trips = await response.json();
    const tripList = document.getElementById('tripList');
    tripList.innerHTML = '';
    trips.forEach(trip => {
        const li = document.createElement('li');
        li.textContent = `${trip.driver} - ${trip.destination} le ${trip.date}`;
        tripList.appendChild(li);
    });
}

loadTrips();