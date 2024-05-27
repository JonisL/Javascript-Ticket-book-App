document.addEventListener('DOMContentLoaded', function() {
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
                <button onclick="reserveSeats('${movie.title}')">Reserve Seats</button>
            `;
        } else {
            movieElement.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p class="sold-out">Sold Out</p>
            `;
        }
        movieList.appendChild(movieElement);
    });
});

function reserveSeats(title) {
    window.location.href = `reserve.html?title=${title}`;
}
