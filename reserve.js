document.addEventListener('DOMContentLoaded', function() {
    const movieTitleElement = document.getElementById('movie-title');
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');
    movieTitleElement.textContent += movieTitle;

    const seatsStatusElement = document.getElementById('seats-status');
    const movies = getMovies();
    const movie = movies.find(m => m.title === movieTitle);

    if (movie) {
        if (movie.seatsAvailable === 0) {
            seatsStatusElement.innerHTML = `<p class="sold-out">Sold Out</p>`;
        } else {
            seatsStatusElement.innerHTML = `
                <p><span class="green">Green</span>: ${movie.seatsAvailable} seats left</p>
                <p><span class="red">Red</span>: ${movie.totalSeats - movie.seatsAvailable} seats taken</p>
            `;
            generateSeatMap(movie);
        }
    }
});

let selectedSeats = [];

function generateSeatMap(movie) {
    const seatsMapElement = document.getElementById('seats-map');
    seatsMapElement.innerHTML = '';

    for (let i = 0; i < movie.totalSeats; i++) {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.dataset.seatNumber = i + 1;
        seatElement.textContent = i + 1; // Display seat number

        if (movie.reservedSeats && movie.reservedSeats.includes(i + 1)) {
            seatElement.classList.add('reserved');
        } else {
            seatElement.classList.add('available');
        }

        seatElement.addEventListener('click', function() {
            if (!seatElement.classList.contains('reserved')) {
                seatElement.classList.toggle('selected');
                toggleSeatSelection(parseInt(seatElement.dataset.seatNumber));
            }
        });

        seatsMapElement.appendChild(seatElement);
    }
}

function toggleSeatSelection(seatNumber) {
    const index = selectedSeats.indexOf(seatNumber);
    if (index > -1) {
        selectedSeats.splice(index, 1);
    } else {
        selectedSeats.push(seatNumber);
    }
}

function confirmReservation() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('title');

    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
        return;
    }

    const movies = getMovies();
    const movieIndex = movies.findIndex(m => m.title === movieTitle);
    if (movieIndex !== -1) {
        const movie = movies[movieIndex];
        if (selectedSeats.length > movie.seatsAvailable) {
            alert('Not enough seats available.');
            return;
        }
        movie.seatsAvailable -= selectedSeats.length;
        if (!movie.reservedSeats) {
            movie.reservedSeats = [];
        }
        movie.reservedSeats = movie.reservedSeats.concat(selectedSeats);
        saveMovies(movies);
        alert('Reservation successful!');
        window.location.href = 'user.html';
    }
}
