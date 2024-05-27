document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    loadReservations();
});

function loadMovies() {
    const movieList = document.getElementById('movie-list');
    const movies = getMovies();
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        if (movie.seatsAvailable > 0) {
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Seats Available: ${movie.seatsAvailable}/${movie.totalSeats}</p>
                <button onclick="deleteMovie('${movie.title}')">Delete Movie</button>
            `;
        } else {
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p class="sold-out">Sold Out</p>
                <button onclick="deleteMovie('${movie.title}')">Delete Movie</button>
            `;
        }
        movieList.appendChild(movieElement);
    });
}

function createMovie() {
    const title = document.getElementById('movie-title').value;
    const image = document.getElementById('movie-image').value;
    const totalSeats = document.getElementById('seats-total').value;

    if (title && image && totalSeats) {
        const movies = getMovies();
        movies.push({ title, image, totalSeats, seatsAvailable: totalSeats });
        saveMovies(movies);
        loadMovies();
    } else {
        alert('Please fill in all fields');
    }
}

function deleteMovie(title) {
    const movies = getMovies().filter(movie => movie.title !== title);
    saveMovies(movies);
    loadMovies();
}

function loadReservations() {
    const reservationList = document.getElementById('reservation-list');
    const movies = getMovies();
    reservationList.innerHTML = '';
    movies.forEach(movie => {
        if (movie.totalSeats > movie.seatsAvailable) {
            const reservedSeats = movie.totalSeats - movie.seatsAvailable;
            const reservationElement = document.createElement('div');
            reservationElement.classList.add('reservation');
            reservationElement.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Reserved Seats: ${reservedSeats}</p>
                <button onclick="cancelReservation('${movie.title}')">Cancel Reservations</button>
            `;
            reservationList.appendChild(reservationElement);
        }
    });
}

function cancelReservation(title) {
    const movies = getMovies();
    const movieIndex = movies.findIndex(movie => movie.title === title);
    if (movieIndex !== -1) {
        const movie = movies[movieIndex];
        const reservedSeats = movie.totalSeats - movie.seatsAvailable;
        if (reservedSeats > 0) {
            movie.seatsAvailable += reservedSeats;
            saveMovies(movies);
            loadMovies();
            loadReservations();
            alert(`Cancelled ${reservedSeats} reservations for ${title}`);
        }
    }
}
